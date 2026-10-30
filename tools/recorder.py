# /// script
# requires-python = ">=3.10,<3.13"
# dependencies = []
# ///
"""Local microphone recorder. Reuse recording.py for alignment and safe imports."""

import argparse
import json
import secrets
import subprocess
import sys
import threading
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit

from recording import ROOT, load_script, spoken, script_lines, tokenize, words

MAX_TAKE_BYTES = 64 * 1024 * 1024


def script_catalog():
    scripts = []
    for path in sorted((ROOT / 'src/videos').glob('*/script.json')):
        try:
            script, digest = load_script(path.parent.name)
            lines = [spoken(line, tokenize(line['text'])[0]) for line in script_lines(script)]
            scripts.append({'id': path.parent.name, 'title': script['title'], 'lines': lines,
                            'words': sum(len(words(line)) for line in lines), 'digest': digest})
        except (ValueError, KeyError, SystemExit) as error:
            print(f'Skipping {path}: {error}', file=sys.stderr)
    return sorted(scripts, key=lambda item: (not item['id'].startswith('sat-'), item['id']))


class RecorderServer(ThreadingHTTPServer):
    daemon_threads = True

    def __init__(self, port):
        super().__init__(('127.0.0.1', port), RecorderHandler)
        self.token = secrets.token_urlsafe(32)
        self.jobs = {}
        self.lock = threading.Lock()
        # Serialize imports so two accepted takes never race to replace a track.
        self.imports = ThreadPoolExecutor(max_workers=1)

    def align(self, job_id):
        with self.lock:
            job = dict(self.jobs[job_id])
            self.jobs[job_id]['status'] = 'aligning'
        try:
            result = subprocess.run([
                sys.executable, str(ROOT / 'tools/recording.py'), 'import', job['video_id'],
                job['path'], '--script-sha256', job['digest'],
            ], capture_output=True, text=True, timeout=600)
            status = 'ready' if result.returncode == 0 else 'needs-review'
            detail = (result.stdout + '\n' + result.stderr).strip()
        except (OSError, subprocess.TimeoutExpired) as error:
            status, detail = 'needs-review', str(error)
        with self.lock:
            self.jobs[job_id].update(status=status, detail=detail)
            Path(job['manifest']).write_text(json.dumps(self.jobs[job_id], indent=2))


class RecorderHandler(BaseHTTPRequestHandler):
    server_version = 'LocalRecorder/1'

    def log_message(self, fmt, *args):
        # Do not log request headers or recording bodies.
        if args and str(args[0]).startswith('POST'):
            super().log_message(fmt, *args)

    def respond(self, status, value, content_type='application/json'):
        body = value.encode() if isinstance(value, str) else json.dumps(value).encode()
        self.send_response(status)
        self.send_header('Content-Type', content_type)
        self.send_header('Content-Length', str(len(body)))
        self.send_header('Cache-Control', 'no-store')
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.send_header('Referrer-Policy', 'no-referrer')
        self.send_header('Permissions-Policy', 'microphone=(self)')
        self.end_headers()
        self.wfile.write(body)

    def valid_host(self):
        return self.headers.get('Host') == f'127.0.0.1:{self.server.server_port}'

    def do_GET(self):
        if not self.valid_host():
            return self.respond(403, {'error': 'Use the printed 127.0.0.1 address.'})
        route = urlsplit(self.path).path
        if route == '/':
            html = Path(__file__).with_name('recorder.html').read_text()
            return self.respond(200, html.replace('__SESSION_TOKEN__', self.server.token), 'text/html; charset=utf-8')
        if route == '/api/scripts':
            return self.respond(200, script_catalog())
        if route == '/api/jobs':
            with self.server.lock:
                jobs = [dict(job) for job in self.server.jobs.values()]
            return self.respond(200, jobs)
        return self.respond(404, {'error': 'Not found'})

    def do_POST(self):
        origin = f'http://127.0.0.1:{self.server.server_port}'
        if (not self.valid_host() or self.headers.get('Origin') != origin
                or self.headers.get('X-Recorder-Token') != self.server.token):
            return self.respond(403, {'error': 'Reload the recording page and try again.'})
        route = urlsplit(self.path).path
        if not route.startswith('/api/takes/'):
            return self.respond(404, {'error': 'Not found'})
        try:
            video_id = route.removeprefix('/api/takes/')
            _, digest = load_script(video_id)
            if self.headers.get('X-Script-Sha256') != digest:
                return self.respond(409, {'error': 'This script changed. Download your take, reload, then record the updated script.'})
            length = int(self.headers.get('Content-Length', '0'))
            if not 0 < length <= MAX_TAKE_BYTES:
                return self.respond(413, {'error': 'The recording is empty or larger than 64 MB.'})
            media_type = self.headers.get('Content-Type', '').split(';')[0]
            extensions = {'audio/webm': 'webm', 'audio/ogg': 'ogg', 'audio/mp4': 'm4a', 'audio/wav': 'wav'}
            if media_type not in extensions:
                return self.respond(415, {'error': 'Use a WebM, Ogg, M4A or WAV recording.'})
            take = self.rfile.read(length)
            if len(take) != length:
                return self.respond(400, {'error': 'The upload was interrupted. Your take is still available in the page.'})
            job_id = datetime.now().strftime('%Y%m%d-%H%M%S-%f')
            folder = ROOT / 'out/recordings' / video_id
            folder.mkdir(parents=True, exist_ok=True)
            path = folder / f'{job_id}.{extensions[media_type]}'
            path.write_bytes(take)
            job = {'id': job_id, 'video_id': video_id, 'digest': digest, 'path': str(path),
                   'manifest': str(folder / f'{job_id}.json'), 'status': 'queued', 'detail': ''}
            Path(job['manifest']).write_text(json.dumps(job, indent=2))
            with self.server.lock:
                self.server.jobs[job_id] = job
            self.server.imports.submit(self.server.align, job_id)
            return self.respond(202, {'id': job_id, 'status': 'queued'})
        except (ValueError, FileNotFoundError, KeyError) as error:
            return self.respond(400, {'error': str(error)})
        except OSError:
            return self.respond(500, {'error': 'Could not save the take locally. Download it from the page and check disk access.'})


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--port', type=int, default=8765)
    args = parser.parse_args()
    server = RecorderServer(args.port)
    print(f'Record your narration: http://127.0.0.1:{server.server_port}', flush=True)
    print('Open in Chrome. Audio stays on this Mac. Ctrl-C stops the recorder.', flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()
        server.imports.shutdown(wait=True)


if __name__ == '__main__':
    main()
