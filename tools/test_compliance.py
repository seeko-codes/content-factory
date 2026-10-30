"""CLI acceptance tests: real media, isolated workspace, no external publishing."""

import hashlib
import json
import os
import shutil
import subprocess
import sys
import tempfile
import unittest
from datetime import datetime, timezone
from pathlib import Path

HERE = Path(__file__).resolve().parent


@unittest.skipUnless(shutil.which('ffmpeg') and shutil.which('ffprobe'), 'ffmpeg required')
class ComplianceTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.media = tempfile.TemporaryDirectory()
        cls.fixture = Path(cls.media.name) / 'fixture.mp4'
        subprocess.run(['ffmpeg', '-v', 'error', '-f', 'lavfi', '-i',
                        'color=c=white:s=160x240:d=1:r=10', '-f', 'lavfi', '-i',
                        'sine=frequency=440:duration=1', '-c:v', 'libx264', '-pix_fmt',
                        'yuv420p', '-c:a', 'aac', '-shortest', str(cls.fixture)], check=True)

    @classmethod
    def tearDownClass(cls):
        cls.media.cleanup()

    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        (self.root / 'tools').mkdir()
        shutil.copyfile(HERE / 'compliance.py', self.root / 'tools/compliance.py')
        (self.root / 'src/videos/demo').mkdir(parents=True)
        (self.root / 'src/videos/demo/script.json').write_text('{"cta":false,"lines":[]}')
        (self.root / 'QUALITY.md').write_text('# Quality\n\n## Focus\nClear stale labels.\n')
        (self.root / 'STYLE.md').write_text('# Style\n\n## Motion\nNo broken transitions.\n')
        (self.root / 'research').mkdir()
        (self.root / 'research/instagram-strategy.md').write_text('# Campaign\n\n## Audience\nSAT students.\n')
        (self.root / 'brief.md').write_text('# Brief\n\n## Payoff\nExplain the square.\n')
        (self.root / 'reference.md').write_text('# Recipe\n\n## Sequence\nSplit in place.\n')
        shutil.copyfile(self.fixture, self.root / 'final.mp4')
        self.bin = self.root / 'bin'
        self.bin.mkdir()
        fake = self.bin / 'zernio'
        fake.write_text('''#!/usr/bin/env python3
import json, os, sys
from pathlib import Path
with Path(os.environ['CALLS']).open('a') as log: log.write(json.dumps(sys.argv[1:])+'\\n')
if sys.argv[1] == 'posts:get': print(Path(os.environ['PROVIDER_POST']).read_text())
elif sys.argv[1] == 'media:upload': print(json.dumps({'url':'https://media.test/asset?signature=x'}))
elif os.environ.get('CREATE_FAIL'): sys.exit(1)
else: print(json.dumps({'post':{'_id':'provider-1','status':'draft'}}))
''')
        fake.chmod(0o755)
        self.env = {**os.environ, 'CALLS': str(self.root / 'calls'),
                    'PATH': str(self.bin) + os.pathsep + os.environ['PATH']}

    def cli(self, *args, ok=True, env=None):
        if args[0] in ('publish', 'link'):
            args = (*args, '--account-id', 'account')
        result = subprocess.run([sys.executable, self.root / 'tools/compliance.py', *map(str, args)],
                                cwd=self.root, env={**self.env, **(env or {})}, capture_output=True, text=True)
        if ok:
            self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        else:
            self.assertNotEqual(result.returncode, 0, result.stdout + result.stderr)
        return result

    def prepare(self):
        self.cli('prepare', 'demo', 'final.mp4', '--brief', 'brief.md', '--reference', 'reference.md',
                 '--output', 'packet')
        return self.root / 'packet'

    def fill(self, verdict='pass'):
        path = self.root / 'packet/review.json'
        review = json.loads(path.read_text())
        review['reviewer'] = 'Test reviewer (fixture only)'
        review['reviewed_at'] = datetime.now(timezone.utc).isoformat()
        review['playback'] = {'visual': [[0, 1]], 'audio': [[0, 1]], 'phone_size': True}
        for row in review['checks']:
            row['verdict'] = verdict
            row['observations'] = [{'start': 0, 'end': 1, 'note': 'Fixture observation for CLI testing only.'}]
        path.write_text(json.dumps(review))
        return review

    def link(self, media_id='ig-1'):
        self.cli('link', 'packet', '--instagram-id', media_id, '--published-at',
                 '2026-10-01T00:00:00Z', '--recipe', 'split-square-v1', '--variant', 'baseline',
                 '--historical-note', 'Fixture identity attestation; no real Instagram post.')

    def snapshot(self, media_id='ig-1'):
        data = {'posts': [{'_id': 'analytics-row', 'status': 'published',
                         'platforms': [{'platform': 'instagram', 'platformPostId': media_id,
                                        'accountId': 'account', 'status': 'published'}],
                         'analytics': {'views': 0, 'follows': None}}]}
        (self.root / 'metrics.json').write_text(json.dumps(data))
        self.cli('observe', 'metrics.json', '--at', '2026-10-02T00:00:00Z')
        return json.loads(self.cli('learning').stdout)

    def test_unreviewed_export_cannot_reach_provider(self):
        self.prepare()
        self.cli('publish', 'packet', '--caption', 'Lesson', '--draft', ok=False)
        self.assertFalse((self.root / 'calls').exists())

    def test_export_and_standard_changes_invalidate_release(self):
        self.prepare()
        self.fill()
        self.cli('seal', 'packet')
        with (self.root / 'final.mp4').open('ab') as stream:
            stream.write(b'changed export')
        self.cli('check', 'packet', ok=False)
        shutil.copyfile(self.fixture, self.root / 'final.mp4')
        (self.root / 'QUALITY.md').write_text('## Focus\nClear stale labels AND all obsolete counters.\n')
        self.cli('publish', 'packet', '--caption', 'Lesson', '--draft', ok=False)
        self.assertFalse((self.root / 'calls').exists())

    def test_full_audio_playback_needs_evidence(self):
        self.prepare()
        review = self.fill()
        review['playback']['audio'] = [[0, .5]]
        (self.root / 'packet/review.json').write_text(json.dumps(review))
        self.cli('seal', 'packet', ok=False)

    def test_each_requirement_needs_timestamped_observations(self):
        self.prepare()
        review = self.fill()
        review['checks'][0]['observations'] = []
        (self.root / 'packet/review.json').write_text(json.dumps(review))
        self.cli('seal', 'packet', ok=False)

    def test_new_feedback_becomes_a_fresh_unverified_requirement(self):
        self.prepare()
        self.fill()
        self.cli('seal', 'packet')
        with (self.root / 'QUALITY.md').open('a') as stream:
            stream.write('\n## New feedback\nRemove the completed-step counter.\n')
        self.cli('prepare', 'demo', 'final.mp4', '--brief', 'brief.md', '--reference', 'reference.md',
                 '--output', 'new-packet')
        review = json.loads((self.root / 'new-packet/review.json').read_text())
        self.assertTrue(any(c['title'] == 'New feedback' and c['verdict'] == 'unverified' for c in review['checks']))
        self.cli('publish', 'new-packet', '--caption', 'Lesson', '--draft', ok=False)

    def test_unverified_review_preserves_results_and_cannot_be_resealed(self):
        self.prepare()
        self.cli('seal', 'packet', ok=False)
        self.cli('seal', 'packet', ok=False)
        self.link()
        result = self.snapshot()
        self.assertEqual(result['eligible'], [])
        self.assertEqual(result['excluded'][0]['reason'], 'unverified')

    def test_partial_phone_or_visual_review_is_blocked(self):
        self.prepare()
        review = self.fill()
        review['playback']['visual'] = [[0, .25], [.5, 1]]
        review['playback']['phone_size'] = False
        (self.root / 'packet/review.json').write_text(json.dumps(review))
        self.cli('seal', 'packet', ok=False)

    def test_failure_keeps_raw_data_out_of_creative_comparisons(self):
        self.prepare()
        self.fill('fail')
        self.cli('seal', 'packet', ok=False)
        self.cli('publish', 'packet', '--caption', 'Lesson', '--draft', ok=False)
        self.assertFalse((self.root / 'calls').exists())
        self.link()
        result = self.snapshot()
        self.assertEqual(result['eligible'], [])
        self.assertEqual(len(result['excluded']), 1)
        self.assertEqual(result['excluded'][0]['reason'], 'noncompliant')
        self.assertEqual(result['excluded'][0]['post']['analytics']['views'], 0)
        self.assertIsNone(result['excluded'][0]['post']['analytics']['follows'])

    def test_historical_review_keeps_its_rule_version_and_missing_posts_stay_excluded(self):
        self.prepare()
        self.fill()
        self.cli('seal', 'packet')
        self.link()
        (self.root / 'QUALITY.md').write_text('## New rule\nAnother requirement.\n')
        result = self.snapshot()
        self.assertEqual(len(result['eligible']), 1)
        self.assertEqual(result['eligible'][0]['age_hours'], 24)
        self.assertTrue(result['eligible'][0]['standards_version'])
        result = self.snapshot('untracked-ig')
        self.assertEqual(len(result['eligible']), 1)  # Prior raw snapshot remains available.
        self.assertEqual(result['excluded'][0]['reason'], 'no_linked_review')

    def test_editing_sealed_review_removes_learning_eligibility(self):
        self.prepare()
        self.fill()
        self.cli('seal', 'packet')
        self.link()
        (self.root / 'packet/review.json').write_text('{}')
        result = self.snapshot()
        self.assertEqual(result['eligible'], [])
        self.assertEqual(result['excluded'][0]['reason'], 'review_integrity_failed')

    def test_changed_evidence_file_invalidates_learning_and_release(self):
        self.prepare()
        review = self.fill()
        (self.root / 'packet/frame.png').write_bytes(b'fixture evidence')
        review['checks'][0]['observations'][0]['file'] = 'frame.png'
        (self.root / 'packet/review.json').write_text(json.dumps(review))
        self.cli('seal', 'packet')
        self.link()
        (self.root / 'packet/frame.png').write_bytes(b'different evidence')
        self.cli('check', 'packet', ok=False)
        self.assertEqual(self.snapshot()['eligible'], [])

    def test_video_specific_briefs_do_not_fragment_shared_rule_cohorts(self):
        self.prepare()
        old = json.loads((self.root / 'packet/manifest.json').read_text())
        (self.root / 'brief.md').write_text('## Another example\nExplain another square.\n')
        self.cli('prepare', 'demo', 'final.mp4', '--brief', 'brief.md', '--reference', 'reference.md',
                 '--output', 'another-packet')
        new = json.loads((self.root / 'another-packet/manifest.json').read_text())
        self.assertEqual(old['standards_version'], new['standards_version'])
        self.assertNotEqual(old['requirements'], new['requirements'])

    def test_gated_upload_uses_exact_video_and_binds_provider_metadata(self):
        self.prepare()
        self.fill()
        self.cli('seal', 'packet')
        self.cli('publish', 'packet', '--caption', 'Lesson', '--draft')
        calls = [json.loads(line) for line in (self.root / 'calls').read_text().splitlines()]
        self.assertEqual(calls[0][0], 'media:upload')
        self.assertEqual(Path(calls[0][1]).read_bytes(), self.fixture.read_bytes())
        create = calls[1]
        self.assertIn('--draft', create)
        self.assertEqual(json.loads(create[create.index('--media-json') + 1])[0]['type'], 'video')
        metadata = json.loads(create[create.index('--metadata') + 1])
        self.assertTrue(metadata['exportSha256'])
        self.assertTrue(metadata['reviewSha256'])
        self.cli('publish', 'packet', '--caption', 'Lesson', '--draft', ok=False)
        self.assertEqual(len((self.root / 'calls').read_text().splitlines()), 2)

    def test_uncertain_provider_result_is_not_retried(self):
        self.prepare()
        self.fill()
        self.cli('seal', 'packet')
        self.cli('publish', 'packet', '--caption', 'Lesson', '--draft', ok=False, env={'CREATE_FAIL': '1'})
        self.cli('publish', 'packet', '--caption', 'Lesson', '--draft', ok=False)
        self.assertEqual(len((self.root / 'calls').read_text().splitlines()), 2)

    def test_provider_identity_and_creative_metadata_are_verified(self):
        self.prepare()
        self.fill()
        self.cli('seal', 'packet')
        manifest = json.loads((self.root / 'packet/manifest.json').read_text())
        provider = {'post': {'_id': 'provider-1', 'status': 'published',
                            'publishedAt': '2026-10-01T00:00:00Z',
                            'platforms': [{'platform': 'instagram', 'accountId': {'_id': 'account'},
                                           'platformPostId': 'ig-1', 'status': 'published'}],
                            'metadata': {'exportSha256': manifest['export_sha256'],
                                         'standardsVersion': manifest['standards_version'],
                                         'reviewSha256': hashlib.sha256((self.root / 'packet/review.json').read_bytes()).hexdigest()}}}
        path = self.root / 'provider.json'
        path.write_text(json.dumps(provider))
        args = ['link', 'packet', '--provider-id', 'provider-1', '--instagram-id', 'ig-1',
                '--published-at', '2026-10-01T00:00:00Z', '--recipe', 'split-square-v1', '--variant', 'baseline']
        self.cli(*args, env={'PROVIDER_POST': str(path)})
        self.assertEqual(len(self.snapshot()['eligible']), 1)
        provider['post']['metadata']['exportSha256'] = 'another-export'
        path.write_text(json.dumps(provider))
        result = self.cli(*args, env={'PROVIDER_POST': str(path)}, ok=False)
        self.assertIn('metadata does not match', result.stderr)


if __name__ == '__main__':
    unittest.main()
