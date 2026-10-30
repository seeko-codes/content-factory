# /// script
# requires-python = ">=3.10"
# dependencies = []
# ///
"""Bind observed compliance to exact exports, then gate publishing and learning.

This validates review completeness and provenance, not the truth of a reviewer's
judgment. Actual playback and observations are required; nothing auto-passes.
"""

import argparse
import hashlib
import json
import math
import re
import shutil
import subprocess
import sys
import uuid
from datetime import datetime, timezone
from pathlib import Path
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parent.parent
STORE = ROOT / 'out/campaign'
DEFAULT_STANDARDS = ('QUALITY.md', 'STYLE.md', 'research/instagram-strategy.md')


def now():
    return datetime.now(timezone.utc).isoformat()


def digest(path):
    with Path(path).open('rb') as stream:
        return hashlib.file_digest(stream, 'sha256').hexdigest() if hasattr(hashlib, 'file_digest') else hash_stream(stream)


def hash_stream(stream):
    value = hashlib.sha256()
    for chunk in iter(lambda: stream.read(1024 * 1024), b''):
        value.update(chunk)
    return value.hexdigest()


def object_hash(value):
    return hashlib.sha256(json.dumps(value, sort_keys=True, separators=(',', ':')).encode()).hexdigest()


def read(path):
    return json.loads(Path(path).read_text())


def write(path, value):
    path = Path(path)
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = path.with_name(path.name + '.' + uuid.uuid4().hex + '.tmp')
    temporary.write_text(json.dumps(value, indent=2, allow_nan=False) + '\n')
    temporary.replace(path)


def instant(value):
    result = datetime.fromisoformat(value.replace('Z', '+00:00'))
    if result.tzinfo is None:
        raise ValueError('Timestamps need an explicit offset or Z.')
    return result


def run_json(args):
    result = subprocess.run([str(a) for a in args], text=True, capture_output=True)
    if result.returncode:
        # Provider errors can contain private account objects. Keep details local.
        raise ValueError(f'{args[0]} {args[1]} failed; no automatic retry. Inspect provider status before retrying.')
    return json.loads(result.stdout)


def requirements(text, source):
    """Every Markdown section is accounted for, including newly added sections.

    Sections are review units, not an alternate definition of the standards.
    The nine output dimensions get separate checks rather than one aggregate pass.
    """
    result = []
    chunks = re.split(r'(?m)^(#{1,6} .+)$', text)
    heading, body = 'Preamble', chunks[0]
    sections = [(heading, body)] + list(zip(chunks[1::2], chunks[2::2]))
    for index, (heading, body) in enumerate(sections):
        if not body.strip():
            continue
        title = heading.lstrip('# ').strip()
        rows = re.findall(r'^\| \*\*(.+?)\*\* \| (.+) \|$', body, re.M)
        if title == 'What an excellent finished video delivers' and rows:
            for row, (dimension, conditions) in enumerate(rows):
                result.append({'id': f'{source}:{index}:dimension:{row}', 'title': dimension,
                               'standard': conditions, 'required': True})
            body = re.sub(r'^\|.*\|\s*$', '', body, flags=re.M)
        blocks = re.split(r'(?m)(?=^(?:\*\*|\- \*\*|\d+\. \*\*))', body)
        for block_index, block in enumerate(blocks):
            if not block.strip():
                continue
            label = re.match(r'^(?:- |\d+\. )?\*\*(.+?)\*\*', block.strip())
            result.append({'id': f'{source}:{index}:{block_index}',
                           'title': label[1].rstrip('.') if label else title,
                           'standard': block.strip(), 'required': False})
    if not result:
        raise ValueError(f'Empty standards document: {source}')
    return result


def prepare(args):
    if not re.fullmatch(r'[a-zA-Z0-9_-]+', args.video):
        raise ValueError('Use a video ID, not a path.')
    original = Path(args.export).resolve()
    probe = run_json(['ffprobe', '-v', 'error', '-show_format', '-show_streams', '-of', 'json', original])
    duration = float(probe['format']['duration'])
    if not math.isfinite(duration) or duration <= 0 or not any(s['codec_type'] == 'video' for s in probe['streams']):
        raise ValueError('Expected a playable video with a finite positive duration.')
    packet = Path(args.output).resolve() if args.output else ROOT / 'out/reviews' / args.video / uuid.uuid4().hex[:12]
    packet.mkdir(parents=True, exist_ok=False)
    artifact = packet / ('export' + original.suffix)
    shutil.copyfile(original, artifact)
    sources, checks = [], []
    shared = [*(ROOT / p for p in DEFAULT_STANDARDS), *(Path(p).resolve() for p in args.standard)]
    paths = [*shared, Path(args.brief).resolve(), Path(args.reference).resolve()]
    script = ROOT / 'src/videos' / args.video / 'script.json'
    for index, path in enumerate(dict.fromkeys([*paths, script])):
        raw = path.read_bytes()
        is_standard = path != script
        snapshot = f'sources/{index}-{path.name}'
        target = packet / snapshot
        target.parent.mkdir(exist_ok=True)
        target.write_bytes(raw)
        source = {'path': str(path), 'snapshot': snapshot, 'sha256': digest(target),
                  'standard': is_standard, 'shared': path in shared}
        sources.append(source)
        if is_standard:
            checks.extend(requirements(raw.decode(), snapshot))
    shared_versions = [(str(Path(s['path']).relative_to(ROOT)) if Path(s['path']).is_relative_to(ROOT)
                        else Path(s['path']).name, s['sha256']) for s in sources if s['shared']]
    manifest = {'version': 1, 'video_id': args.video, 'created_at': now(),
                'original_export': str(original), 'artifact': artifact.name,
                'export_sha256': digest(artifact), 'duration': duration,
                'has_audio': any(s['codec_type'] == 'audio' for s in probe['streams']),
                'sources': sources, 'requirements': checks,
                'reference_sha256': digest(Path(args.reference).resolve()),
                'standards_version': object_hash(sorted(shared_versions))}
    write(packet / 'manifest.json', manifest)
    write(packet / 'review.json', {'reviewer': '', 'reviewed_at': '',
                                 'playback': {'visual': [], 'audio': [], 'phone_size': False},
                                 'checks': [{'id': c['id'], 'title': c['title'], 'verdict': 'unverified',
                                             'observations': [], 'exclusion_reason': ''} for c in checks]})
    print(json.dumps({'packet': str(packet), 'checks': len(checks), 'duration': duration,
                      'next': 'Inspect export and all manifest requirements; complete review.json, then seal.'}))


def intervals_cover(intervals, duration):
    end = 0
    for start, stop in sorted(intervals):
        if not all(isinstance(x, (int, float)) and not isinstance(x, bool) and math.isfinite(x) for x in (start, stop)):
            return False
        if start < 0 or stop <= start or stop > duration + .05 or start > end + .05:
            return False
        end = max(end, stop)
    return end >= duration - .05


def evaluate(packet, current=True):
    manifest, review = read(packet / 'manifest.json'), read(packet / 'review.json')
    issues, failed, evidence = [], False, []
    if manifest['version'] != 1:
        raise ValueError('Unsupported review version.')
    if digest(packet / manifest['artifact']) != manifest['export_sha256']:
        issues.append('Reviewed export changed.')
    if current and digest(manifest['original_export']) != manifest['export_sha256']:
        issues.append('Original export changed; prepare a fresh review.')
    derived = []
    for source in manifest['sources']:
        snapshot = packet / source['snapshot']
        if digest(snapshot) != source['sha256']:
            issues.append(f'Standards snapshot changed: {source["snapshot"]}')
        if current and digest(source['path']) != source['sha256']:
            issues.append(f'Source or standard changed: {source["path"]}; prepare a fresh review.')
        if source['standard']:
            derived.extend(requirements(snapshot.read_bytes().decode(), source['snapshot']))
    if manifest['requirements'] != derived or not derived:
        issues.append('Requirements differ from the standards snapshots.')
    if not review.get('reviewer', '').strip():
        issues.append('Reviewer identity is missing.')
    try:
        if instant(review['reviewed_at']) < instant(manifest['created_at']):
            issues.append('Review predates this export packet.')
        if instant(review['reviewed_at']) > datetime.now(timezone.utc):
            issues.append('Review timestamp is in the future.')
    except (KeyError, ValueError):
        issues.append('Review timestamp is missing or invalid.')
    playback = review.get('playback', {})
    for medium in ['visual'] + (['audio'] if manifest['has_audio'] else []):
        if not intervals_cover(playback.get(medium, []), manifest['duration']):
            issues.append(f'Full {medium} playback is unverified.')
    if playback.get('phone_size') is not True:
        issues.append('Phone-size inspection is unverified.')
    checks = review.get('checks', [])
    if len(checks) != len(derived) or {c['id'] for c in checks} != {c['id'] for c in derived}:
        issues.append('Missing, duplicate or unknown requirement checks.')
    lookup = {c['id']: c for c in checks}
    passed = 0
    for requirement in derived:
        check = lookup.get(requirement['id'], {})
        verdict = check.get('verdict')
        if verdict == 'excluded':
            if requirement['required'] or not check.get('exclusion_reason', '').strip():
                issues.append(f'Invalid exclusion: {requirement["title"]}')
            continue
        failed |= verdict == 'fail'
        passed += verdict == 'pass'
        if verdict not in ('pass', 'fail'):
            issues.append(f'Unverified requirement: {requirement["title"]}')
            continue
        observations = check.get('observations', [])
        if not observations:
            issues.append(f'No output evidence: {requirement["title"]}')
        for observation in observations:
            start, end = observation.get('start'), observation.get('end')
            if not (isinstance(start, (float, int)) and isinstance(end, (float, int))
                    and math.isfinite(start) and math.isfinite(end) and 0 <= start <= end <= manifest['duration'] + .05
                    and observation.get('note', '').strip()):
                issues.append(f'Invalid timestamped observation: {requirement["title"]}')
            if observation.get('file'):
                asset = (packet / observation['file']).resolve()
                if not asset.is_relative_to(packet.resolve()):
                    raise ValueError('Evidence files must be inside the review packet.')
                evidence.append({'path': str(asset.relative_to(packet)), 'sha256': digest(asset)})
    if passed == 0 and not failed:
        issues.append('No requirement passed.')
    verdict = 'noncompliant' if failed else 'unverified' if issues else 'compliant'
    return {'verdict': verdict, 'issues': issues, 'evidence': evidence,
            'manifest_sha256': digest(packet / 'manifest.json'), 'review_sha256': digest(packet / 'review.json')}


def seal(args):
    packet = Path(args.packet).resolve()
    if (packet / 'seal.json').exists():
        raise ValueError('Review already sealed. Prepare a new packet for another review; preserve the old one.')
    result = evaluate(packet)
    write(packet / 'seal.json', {**result, 'sealed_at': now()})
    print(json.dumps(result))
    return 0 if result['verdict'] == 'compliant' and not result['issues'] else 2


def verified(packet, current=True):
    sealed = read(packet / 'seal.json')
    result = evaluate(packet, current=False)
    for key in ('verdict', 'issues', 'evidence', 'manifest_sha256', 'review_sha256'):
        if result[key] != sealed[key]:
            raise ValueError('Sealed review integrity failed.')
    return evaluate(packet, current=True) if current else result


def check(args):
    result = verified(Path(args.packet).resolve())
    print(json.dumps(result))
    return 0 if result['verdict'] == 'compliant' and not result['issues'] else 2


def account_id():
    return read(Path.home() / '.config/video-gen/zernio.json')['account_id']


def publish(args):
    packet = Path(args.packet).resolve()
    result = verified(packet)
    if result['verdict'] != 'compliant' or result['issues']:
        raise ValueError('Publishing blocked: review failed, is incomplete, or is stale.')
    if args.schedule and instant(args.schedule) <= datetime.now(timezone.utc):
        raise ValueError('Schedule must be in the future.')
    account = args.account_id or account_id()
    if not args.draft:
        credential = read(Path.home() / '.zernio/config.json')['apiKey']
        request = Request(f'https://zernio.com/api/v1/accounts/{account}/instagram/publishing-limit',
                          headers={'Authorization': 'Bearer ' + credential})
        with urlopen(request, timeout=30) as response:
            quota = json.load(response)
        if quota['quotaUsage'] >= quota['quotaTotal']:
            raise ValueError('Instagram publishing quota exhausted.')
        write(packet / 'publishing-quota.json', {'fetched_at': now(), 'data': quota})
    # An exclusive journal also blocks concurrent sends and ambiguous retries.
    attempt = packet / 'publishing.json'
    with attempt.open('x') as stream:
        json.dump({'status': 'uploading', 'started_at': now(), 'account_id': account}, stream)
    manifest = read(packet / 'manifest.json')
    upload = run_json(['zernio', 'media:upload', packet / manifest['artifact']])
    write(packet / 'upload.json', upload)
    latest = verified(packet)
    if latest['verdict'] != 'compliant' or latest['issues']:
        raise ValueError('Review changed during upload. Publishing blocked.')
    metadata = {'campaign': 'sat', 'videoId': manifest['video_id'],
                'exportSha256': manifest['export_sha256'], 'reviewSha256': result['review_sha256'],
                'standardsVersion': manifest['standards_version']}
    write(attempt, {'status': 'creating_or_uncertain', 'started_at': now(), 'account_id': account,
                    'metadata': metadata})
    command = ['zernio', 'posts:create', '--accounts', account, '--text', args.caption,
               '--media-json', json.dumps([{'type': 'video', 'url': upload['url']}]),
               '--metadata', json.dumps(metadata)]
    if args.draft:
        command.append('--draft')
    elif args.schedule:
        command.extend(['--scheduledAt', args.schedule])
    response = run_json(command)
    write(packet / 'provider-response.json', response)
    post = response['post']
    write(attempt, {'status': post['status'], 'provider_id': post['_id'], 'account_id': account,
                    'metadata': metadata, 'recorded_at': now()})
    print(json.dumps({'provider_id': post['_id'], 'status': post['status'],
                      'next': 'Read provider status, then link the confirmed Instagram media ID and publication time.'}))


def link(args):
    """Also accepts failed/unverified historical posts, explicitly for diagnosis."""
    packet = Path(args.packet).resolve()
    manifest = read(packet / 'manifest.json')
    instant(args.published_at)
    if instant(args.published_at) > datetime.now(timezone.utc):
        raise ValueError('Only link an actually published post, not a scheduled post.')
    account = args.account_id or account_id()
    if args.historical_note is not None and not args.historical_note.strip():
        raise ValueError('Historical creative identity needs explicit evidence.')
    identity = {'kind': 'manual', 'evidence': args.historical_note}
    if args.provider_id:
        post = run_json(['zernio', 'posts:get', args.provider_id])['post']
        matches = []
        for platform in post.get('platforms', []):
            platform_account = platform.get('accountId')
            if isinstance(platform_account, dict):
                platform_account = platform_account.get('_id')
            if (platform.get('platform') == 'instagram' and platform_account == account
                    and platform.get('platformPostId') == args.instagram_id and platform.get('status') == 'published'):
                matches.append(platform)
        expected = {'exportSha256': manifest['export_sha256'],
                    'reviewSha256': digest(packet / 'review.json'), 'standardsVersion': manifest['standards_version']}
        if post.get('_id') != args.provider_id or post.get('status') != 'published' or not matches:
            raise ValueError('Provider has not confirmed this Instagram publication/account.')
        if any(post.get('metadata', {}).get(k) != v for k, v in expected.items()):
            raise ValueError('Provider creative/review metadata does not match this packet.')
        if post.get('publishedAt') and instant(post['publishedAt']) != instant(args.published_at):
            raise ValueError('Publication timestamp differs from the provider.')
        identity = {'kind': 'provider', 'provider_id': args.provider_id, 'verified_at': now(),
                    'metadata': expected}
        write(packet / 'confirmed-provider-post.json', post)
    record = {'packet': str(packet), 'account_id': account, 'instagram_id': args.instagram_id,
              'provider_id': args.provider_id, 'published_at': args.published_at,
              'recipe': args.recipe, 'variant': args.variant, 'mode': args.mode,
              'hypothesis': args.hypothesis, 'video_id': manifest['video_id'],
              'export_sha256': manifest['export_sha256'], 'standards_version': manifest['standards_version'],
              'reference_sha256': manifest['reference_sha256'],
              'identity_verification': identity,
              'seal_sha256': digest(packet / 'seal.json') if (packet / 'seal.json').exists() else None}
    target = STORE / 'publications' / (object_hash([account, args.instagram_id]) + '.json')
    target.parent.mkdir(parents=True, exist_ok=True)
    with target.open('x') as stream:
        json.dump(record, stream, indent=2)
    print(json.dumps({'linked': str(target)}))


def observe(args):
    snapshot = read(args.snapshot)
    if not isinstance(snapshot.get('posts'), list):
        raise ValueError('Expected a raw Zernio analytics:posts response.')
    instant(args.at)
    destination = STORE / 'observations' / (uuid.uuid4().hex + '.json')
    write(destination, {'observed_at': args.at, 'raw': snapshot})
    print(json.dumps({'saved': str(destination), 'posts': len(snapshot['posts'])}))


def eligibility(record):
    if record is None:
        return 'no_linked_review'
    packet = Path(record['packet'])
    try:
        if record['seal_sha256'] is None:
            return 'unverified'
        if digest(packet / 'seal.json') != record['seal_sha256']:
            return 'review_integrity_failed'
        result = verified(packet, current=False)
        manifest = read(packet / 'manifest.json')
        if any(record[k] != manifest[k] for k in ('video_id', 'export_sha256', 'standards_version')):
            return 'review_integrity_failed'
        if result['verdict'] == 'noncompliant':
            return 'noncompliant'
        return None if result['verdict'] == 'compliant' and not result['issues'] else 'unverified'
    except (OSError, ValueError, KeyError, TypeError):
        return 'review_integrity_failed'


def learning(args):
    records = [read(p) for p in (STORE / 'publications').glob('*.json')]
    lookup = {(r['account_id'], r['instagram_id']): r for r in records}
    output = {'eligible': [], 'excluded': [],
              'comparison_axes': ['standards_version', 'recipe', 'reference_sha256', 'mode', 'age_hours'],
              'note': 'Snapshots are cumulative, not independent samples. Match age and recipe; organic results are observational.'}
    for path in sorted((STORE / 'observations').glob('*.json')):
        snapshot = read(path)
        for post in snapshot['raw']['posts']:
            platforms = [p for p in post.get('platforms', []) if p.get('platform') == 'instagram']
            if not platforms:
                output['excluded'].append({'reason': 'missing_instagram_identity', 'post': post,
                                            'observed_at': snapshot['observed_at']})
            for platform in platforms:
                account = platform.get('accountId')
                if isinstance(account, dict):
                    account = account.get('_id')
                record = lookup.get((account, platform.get('platformPostId')))
                reason = eligibility(record)
                if post.get('status') != 'published' or platform.get('status') != 'published':
                    reason = 'not_published'
                row = {'post': post, 'publication': record, 'observed_at': snapshot['observed_at'],
                       'observation_file': str(path)}
                if record:
                    row.update({k: record[k] for k in ('standards_version', 'recipe', 'reference_sha256', 'mode', 'variant')})
                    row['age_hours'] = (instant(snapshot['observed_at']) - instant(record['published_at'])).total_seconds() / 3600
                    if row['age_hours'] < 0:
                        reason = 'observation_precedes_publication'
                if args.standards_version and row.get('standards_version') != args.standards_version:
                    reason = 'different_standards_version'
                if reason:
                    output['excluded'].append({**row, 'reason': reason})
                else:
                    output['eligible'].append(row)
    print(json.dumps(output, indent=2, allow_nan=False))


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    commands = parser.add_subparsers(dest='command', required=True)
    prepare_parser = commands.add_parser('prepare', help='Freeze export and current standards; create unverified review')
    prepare_parser.add_argument('video')
    prepare_parser.add_argument('export')
    prepare_parser.add_argument('--brief', required=True)
    prepare_parser.add_argument('--reference', required=True)
    prepare_parser.add_argument('--standard', action='append', default=[])
    prepare_parser.add_argument('--output')
    prepare_parser.set_defaults(func=prepare)
    for name, function in [('seal', seal), ('check', check)]:
        sub = commands.add_parser(name)
        sub.add_argument('packet')
        sub.set_defaults(func=function)
    sub = commands.add_parser('publish', help='Gate reviewed upload and create through the official Zernio CLI')
    sub.add_argument('packet')
    sub.add_argument('--caption', required=True)
    sub.add_argument('--account-id', help='Defaults to the configured @ultralearns connection')
    modes = sub.add_mutually_exclusive_group(required=True)
    modes.add_argument('--draft', action='store_true')
    modes.add_argument('--schedule')
    modes.add_argument('--now', action='store_true')
    sub.set_defaults(func=publish)
    sub = commands.add_parser('link', help='Record a confirmed Instagram publication, including noncompliant historical posts')
    sub.add_argument('packet')
    sub.add_argument('--instagram-id', required=True)
    sub.add_argument('--account-id', help='Defaults to the configured @ultralearns connection')
    identity = sub.add_mutually_exclusive_group(required=True)
    identity.add_argument('--provider-id', help='Read published status and verify creative metadata through Zernio')
    identity.add_argument('--historical-note', help='Explicit manual evidence that a historical post is this exact export')
    sub.add_argument('--published-at', required=True)
    sub.add_argument('--recipe', required=True)
    sub.add_argument('--variant', required=True)
    sub.add_argument('--mode', choices=['normal', 'trial'], default='normal')
    sub.add_argument('--hypothesis', default='')
    sub.set_defaults(func=link)
    sub = commands.add_parser('observe', help='Preserve raw analytics without inventing missing values')
    sub.add_argument('snapshot')
    sub.add_argument('--at', required=True, help='Actual fetch time, not ingestion time')
    sub.set_defaults(func=observe)
    sub = commands.add_parser('learning', help='Export eligible creative evidence separately from execution failures')
    sub.add_argument('--standards-version')
    sub.set_defaults(func=learning)
    args = parser.parse_args()
    try:
        return args.func(args) or 0
    except (OSError, ValueError, KeyError, TypeError) as error:
        print(f'Blocked: {error}', file=sys.stderr)
        return 2


if __name__ == '__main__':
    sys.exit(main())
