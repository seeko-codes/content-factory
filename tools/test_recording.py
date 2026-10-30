"""CLI contract tests. Recognition is deterministic; ffmpeg handles real WAV input."""

import json
import os
import shutil
import subprocess
import sys
import tempfile
import unittest
import wave
from pathlib import Path

HERE = Path(__file__).resolve().parent


@unittest.skipUnless(shutil.which('ffmpeg') and shutil.which('ffprobe'), 'ffmpeg and ffprobe required')
class ImportRecordingTest(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        (self.root / 'tools').mkdir()
        for name in ('recording.py', 'video_script.py'):
            shutil.copyfile(HERE / name, self.root / 'tools' / name)
        folder = self.root / 'src/videos/demo'
        folder.mkdir(parents=True)
        (folder / 'script.json').write_text(json.dumps({'title': 'Demo', 'cta': False, 'lines': [
            {'text': '{start} Start at *3.*', 'say': 'Start at three.', 'caption': False},
            {'text': '{cta} Comment *"ultralearn".*', 'say': 'Comment, ultra learn.'}]}))
        self.source = self.root / 'take.wav'
        with wave.open(str(self.source), 'wb') as audio:
            audio.setnchannels(1)
            audio.setsampwidth(2)
            audio.setframerate(24000)
            audio.writeframes(b'\0\0' * 24000 * 3)
        self.model = self.root / 'ggml-base.en.bin'
        self.model.touch()
        self.output = self.root / 'public/voice/demo'
        self.output.mkdir(parents=True)
        (self.output / 'timing.json').write_text('original timing')
        (self.output / 'narration.wav').write_bytes(b'original audio')
        self.bin = self.root / 'bin'
        self.bin.mkdir()
        fake = self.bin / 'whisper-cli'
        fake.write_text('''#!/usr/bin/env python3
import json, os, sys
from pathlib import Path
words = [' Start',' at',' three',' Comment',' ultra',' learn']
if os.environ.get('OMIT_WORD'):
    words.remove(' three')
tokens = [{'text': word, 't_dtw': 30 + i * 35} for i, word in enumerate(words)]
Path(sys.argv[sys.argv.index('-of') + 1] + '.json').write_text(json.dumps({'transcription':[{'tokens':tokens}]}))
''')
        fake.chmod(0o755)

    def invoke(self, omit=False, allow=False, digest=None):
        env = {**os.environ, 'PATH': str(self.bin) + os.pathsep + os.environ['PATH']}
        if omit:
            env['OMIT_WORD'] = '1'
        return subprocess.run([sys.executable, self.root / 'tools/recording.py', 'import', 'demo', self.source,
                               '--model', self.model] + (['--allow-mismatch'] if allow else [])
                              + (['--script-sha256', digest] if digest else []),
                              env=env, text=True, capture_output=True)

    def test_import_rebuilds_numeric_and_brand_cues_and_backs_up(self):
        result = self.invoke()
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        timing = json.loads((self.output / 'timing.json').read_text())
        self.assertAlmostEqual(timing['duration'], 3)
        self.assertEqual(timing['cues'], {'start': .24, 'cta': 1.29})
        self.assertFalse(timing['lines'][0]['caption'])
        self.assertTrue(timing['lines'][0]['tokens'][-1]['emph'])
        self.assertEqual(timing['lines'][0]['tokens'][-1]['text'], '3.')
        self.assertAlmostEqual(timing['lines'][1]['tokens'][-1]['start'], 1.64)
        self.assertAlmostEqual(timing['lines'][1]['tokens'][-1]['end'], 2.14)
        backup = next((self.root / 'out/voice-import/demo').glob('*/previous-timing.json'))
        self.assertEqual(backup.read_text(), 'original timing')
        with wave.open(str(self.output / 'narration.wav')) as audio:
            self.assertEqual(audio.getframerate(), 24000)

    def test_omission_rejects_before_mutation(self):
        result = self.invoke(omit=True)
        self.assertNotEqual(result.returncode, 0)
        self.assertIn('expected "three"', result.stderr)
        self.assertEqual((self.output / 'timing.json').read_text(), 'original timing')
        self.assertEqual((self.output / 'narration.wav').read_bytes(), b'original audio')
        report = next((self.root / 'out/voice-import/demo').glob('*/alignment-review.json'))
        self.assertTrue(json.loads(report.read_text())['mismatches'])

    def test_take_for_an_old_script_is_rejected_before_mutation(self):
        result = self.invoke(digest='old-script-digest')
        self.assertNotEqual(result.returncode, 0)
        self.assertIn('script changed', result.stderr)
        self.assertEqual((self.output / 'timing.json').read_text(), 'original timing')
        self.assertEqual((self.output / 'narration.wav').read_bytes(), b'original audio')

    def test_reviewed_override_is_explicit_in_report(self):
        result = self.invoke(omit=True, allow=True)
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        report = next((self.root / 'out/voice-import/demo').glob('*/alignment-review.json'))
        self.assertTrue(json.loads(report.read_text())['mismatches_accepted'])
        timing = json.loads((self.output / 'timing.json').read_text())
        self.assertLessEqual(timing['lines'][0]['start'], timing['lines'][0]['end'])


if __name__ == '__main__':
    unittest.main()
