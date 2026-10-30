# /// script
# requires-python = ">=3.10,<3.13"
# dependencies = []
# ///
"""Read-aloud guide and local import of a human narration take."""

import argparse
import difflib
import hashlib
import json
import os
import re
import shutil
import subprocess
import tempfile
from datetime import datetime
from pathlib import Path

from video_script import script_lines, spoken, tokenize

ROOT = Path(__file__).resolve().parent.parent
ONES = 'zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen'.split()
TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety']
JOINED_NUMBERS = {tens + one: [tens, one] for tens in TENS[2:] for one in ONES[1:10]}


def number_words(value):
    n = int(value)
    if n < 20:
        return [ONES[n]]
    if n < 100:
        return [TENS[n // 10]] + ([ONES[n % 10]] if n % 10 else [])
    return [value]


def words(text):
    """Normalize ASR digits, punctuation and our brand's spoken spelling."""
    text = text.lower().replace('’', "'").replace("'", '').replace('%', ' percent')
    out = []
    for word in re.findall(r'[a-z]+|\d+', text):
        out.extend(number_words(word) if word.isdigit() else ['ultra', 'learn'] if word == 'ultralearn' else JOINED_NUMBERS.get(word, [word]))
    return out


def load_script(video_id):
    if not re.fullmatch(r'[a-zA-Z0-9_-]+', video_id):
        raise ValueError('Use a video ID, not a path.')
    path = ROOT / 'src/videos' / video_id / 'script.json'
    raw = path.read_bytes()
    return json.loads(raw), hashlib.sha256(raw).hexdigest()


def guide(video_id):
    script, digest = load_script(video_id)
    lines = script_lines(script)
    count = sum(len(words(spoken(line, tokenize(line['text'])[0]))) for line in lines)
    rows = [f'# Record {script["title"]}', '',
            'Read only the quoted lines, in order. Record on the local page (`npm run record`), or use Voice Memos or QuickTime. You do not need to follow the animation: it will follow your voice.', '',
            'Use your normal calm explaining voice. Leave about one second before the first line and after the last. The pauses below are breathing room, not a stopwatch. If you stumble, start a fresh take; repeated lines and ad-libs need editing before import.', '',
            f'The read is about {count} words. Speak naturally. The importer reports the finished duration and never speeds up your voice.', '',
            'Pronunciation: SAT = S-A-T; parabolas = puh-RAB-uh-luhz; exponentials = ek-spuh-NEN-shulz; ultralearn = ultra learn.', '']
    for i, line in enumerate(lines, 1):
        text = spoken(line, tokenize(line['text'])[0])
        pause = line.get('pause', script.get('pause', .45))
        rows += [f'**{i:02d}** "{text}"', '', f'*Pause about {pause:g} seconds.*', '']
    rows += ['## After recording', '', f'Export the take as M4A, WAV or MP3. Keep the raw recording local, for example in `out/{video_id}/your-take.m4a`.', '',
             'From this project folder:', '', '```bash', f'npm run import-voice -- {video_id} /absolute/path/to/your-take.m4a', f'npm run render -- {video_id} out/{video_id}/final.mp4', '```', '',
             'The import rebuilds word captions and animation cues from this take. Review the generated alignment report and watch the result before posting. A transcript mismatch stops the import; correct the recording or review the reported recognition error before using `--allow-mismatch`. Existing narration and timing are backed up locally before replacement.', '',
             f'Guide source: `script.json`, SHA-256 `{digest}`. Regenerate with `npm run recording -- {video_id}` after script edits.', '']
    path = ROOT / 'src/videos' / video_id / 'RECORDING.md'
    path.write_text('\n'.join(rows))
    print(path)


def run(args):
    result = subprocess.run([str(a) for a in args], capture_output=True, text=True)
    if result.returncode:
        raise ValueError(f'{args[0]} failed:\n{result.stderr[-4000:]}')
    return result.stdout


def recognized_words(data, duration):
    """Use DTW anchors, never the coarser segment timestamp estimates."""
    groups, current = [], None
    for segment in data['transcription']:
        for token in segment.get('tokens', []):
            text, anchor = token['text'], token.get('t_dtw', -1)
            if text.startswith('[_') or not re.search(r'[a-zA-Z0-9%]', text):
                continue
            if anchor < 0:
                raise ValueError('Whisper did not return DTW word anchors. Use a compatible model and disable flash attention.')
            if anchor / 100 > duration + .2:
                raise ValueError('Whisper returned a word anchor after the recording ends. Try another compatible model.')
            if text[:1].isspace() or current is None:
                current = {'text': text.strip(), 'start': min(duration, max(0, anchor / 100 - .06)), 'end': min(duration, anchor / 100 + .09)}
                groups.append(current)
            else:
                current['text'] += text
                current['end'] = min(duration, anchor / 100 + .09)
    out = []
    for group in groups:
        units = words(group['text'])
        for unit in units:
            out.append({**group, 'word': unit})
    if not out:
        raise ValueError('No words recognized. Check the input recording and microphone.')
    for prev, nxt in zip(out, out[1:]):
        if nxt['start'] < prev['start']:
            raise ValueError('Non-monotonic word anchors from Whisper; try a cleaner take or a larger compatible model.')
        prev['end'] = min(prev['end'], nxt['start']) if nxt['start'] > prev['start'] else prev['end']
    return out


def match_words(expected, actual):
    """Map script words to ASR words; surface every nonmatching passage."""
    mapped, changes = {}, []
    actual_text = [word['word'] for word in actual]
    for tag, a, b, c, d in difflib.SequenceMatcher(None, expected, actual_text, autojunk=False).get_opcodes():
        if tag != 'equal':
            changes.append({'expected': ' '.join(expected[a:b]), 'heard': ' '.join(actual_text[c:d]), 'script_word': a + 1, 'time': actual[c]['start'] if c < len(actual) else actual[-1]['end']})
        if tag in ('equal', 'replace') and d > c:
            for i in range(a, b):
                mapped[i] = actual[c + min(d - c - 1, (i - a) * (d - c) // (b - a))]
    # Only used after an explicit mismatch override; unrecognized words interpolate
    # between neighboring audio anchors rather than borrowing the old TTS timing.
    for i in range(len(expected)):
        if i in mapped:
            continue
        left = next((mapped[j]['end'] for j in range(i - 1, -1, -1) if j in mapped), 0)
        right = next((mapped[j]['start'] for j in range(i + 1, len(expected)) if j in mapped), actual[-1]['end'])
        mapped[i] = {'start': left, 'end': max(left, right), 'word': expected[i]}
    return mapped, changes


def build_timing(video_id, script, actual):
    lines = script_lines(script)
    expected, structures = [], []
    for line in lines:
        tokens, cues = tokenize(line['text'])
        read = words(spoken(line, tokens))
        structures.append((line, tokens, cues, len(expected), read))
        expected.extend(read)
    mapped, changes = match_words(expected, actual)
    entries, cues = [], {}
    for line, tokens, line_cues, offset, read in structures:
        display = []
        token_units = []
        for ti, token in enumerate(tokens):
            for unit in words(token['text']):
                display.append(unit)
                token_units.append(ti)
        # Spoken overrides can contain several words for one display token.
        relation, _ = match_words(display, [{'word': w, 'start': i, 'end': i + 1} for i, w in enumerate(read)])
        for ti, token in enumerate(tokens):
            units = [k for k, owner in enumerate(token_units) if owner == ti]
            if units:
                a = min(len(read) - 1, int(relation[units[0]]['start']))
                b = min(len(read) - 1, max(a, int(relation[units[-1]]['end']) - 1))
            else:
                a = b = min(len(read) - 1, ti * len(read) // len(tokens))
            token['start'] = round(mapped[offset + a]['start'], 3)
            token['end'] = round(max(token['start'], mapped[offset + b]['end']), 3)
        for name, idx in line_cues.items():
            if name in cues:
                raise ValueError(f'Duplicate cue: {name}')
            cues[name] = tokens[idx]['start'] if idx < len(tokens) else tokens[-1]['end']
        entry = {'start': tokens[0]['start'], 'end': tokens[-1]['end'], 'tokens': tokens}
        if line.get('caption') is False:
            entry['caption'] = False
        entries.append(entry)
    return {'id': video_id, 'lines': entries, 'cues': cues}, changes


def import_take(args):
    script, digest = load_script(args.video_id)
    if getattr(args, 'script_sha256', None) and args.script_sha256 != digest:
        raise ValueError('The script changed after this take was recorded. The raw take is preserved; record the updated script before importing.')
    source = Path(args.audio).expanduser().resolve()
    if not source.is_file():
        raise ValueError(f'Recording not found: {source}')
    model = Path(args.model).expanduser()
    if not model.is_file():
        raise ValueError(f'Whisper model not found: {model}. Set WHISPER_MODEL or pass --model with a local ggml model.')
    for tool in ('ffmpeg', 'ffprobe', 'whisper-cli'):
        if not shutil.which(tool):
            raise ValueError(f'{tool} is required for local audio import.')
    stem = re.sub(r'^ggml-', '', model.stem)
    dtw = args.dtw or stem.replace('-v', '.v').replace('-turbo', '.turbo')
    stamp = datetime.now().strftime('%Y%m%d-%H%M%S-%f')
    review = ROOT / 'out' / 'voice-import' / args.video_id / stamp
    review.mkdir(parents=True)
    with tempfile.TemporaryDirectory(prefix='video-narration-') as tmp:
        tmp = Path(tmp)
        audio = tmp / 'narration.wav'
        run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', '-i', source, '-vn', '-ac', '1', '-ar', '24000', audio])
        duration = float(run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'default=nw=1:nk=1', audio]))
        whisper_audio = tmp / 'whisper.wav'
        run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', '-i', audio, '-ar', '16000', whisper_audio])
        print('Aligning your take locally with whisper.cpp...', flush=True)
        run(['whisper-cli', '-m', model, '-f', whisper_audio, '-l', 'en', '-ojf', '-of', review / 'transcript', '-dtw', dtw, '-nfa', '-np'])
        actual = recognized_words(json.loads((review / 'transcript.json').read_text()), duration)
        timing, changes = build_timing(args.video_id, script, actual)
        timing['duration'] = round(duration, 3)
        final_duration = duration + 2.85
        report = {'input': str(source), 'script_sha256': digest, 'model': str(model), 'narration_duration': duration, 'finished_duration': round(final_duration, 3), 'mismatches': changes, 'mismatches_accepted': bool(changes and args.allow_mismatch), 'timing': 'whisper.cpp DTW token anchors; approximate, review by ear'}
        (review / 'alignment-review.json').write_text(json.dumps(report, indent=2))
        print(f'Review: {review / "alignment-review.json"}')
        if changes and not args.allow_mismatch:
            details = '\n'.join(f'  {c["time"]:.2f}s: expected "{c["expected"]}"; heard "{c["heard"]}"' for c in changes)
            raise ValueError(f'Transcript differs from the script:\n{details}\nExisting narration is untouched. Fix the take or review these passages by ear, then rerun with --allow-mismatch only for recognition errors.')
        if load_script(args.video_id)[1] != digest:
            raise ValueError('The script changed during alignment. The raw take is preserved and existing narration is untouched.')
        output = Path(args.output_dir).expanduser().resolve() if args.output_dir else ROOT / 'public/voice' / args.video_id
        output.mkdir(parents=True, exist_ok=True)
        for name in ('narration.wav', 'timing.json'):
            if (output / name).exists():
                shutil.copy2(output / name, review / f'previous-{name}')
        # Stage both files only after the full alignment has passed review.
        (tmp / 'timing.json').write_text(json.dumps(timing, indent=1))
        for name in ('narration.wav', 'timing.json'):
            target = output / f'.{name}.tmp'
            shutil.copyfile(tmp / name, target)
        os.replace(output / '.narration.wav.tmp', output / 'narration.wav')
        os.replace(output / '.timing.json.tmp', output / 'timing.json')
        print(f'Imported: {output}\nNarration {duration:.1f}s; finished video about {final_duration:.1f}s. No speed change.')
        if final_duration > 60:
            print('Duration note: this take produces a video longer than 60 seconds. Keep it, or record a tighter take if a 60-second cut is required.')
        print('DTW timing is approximate. Watch the render and listen to caption/diagram cues before publishing.')


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    sub = parser.add_subparsers(dest='command', required=True)
    p = sub.add_parser('guide', help='Write the clean recording guide beside script.json')
    p.add_argument('video_id')
    p = sub.add_parser('import', help='Import a clean take and rebuild captions and cue times')
    p.add_argument('video_id')
    p.add_argument('audio')
    p.add_argument('--model', default=os.environ.get('WHISPER_MODEL', str(Path.home() / '.local/share/whisper-cpp/ggml-base.en.bin')))
    p.add_argument('--dtw', help='Whisper DTW preset if the model filename does not identify it')
    p.add_argument('--allow-mismatch', action='store_true', help='Accept transcript mismatches after reviewing the report by ear')
    p.add_argument('--output-dir', help='Alternate output directory, useful for a rehearsal import')
    p.add_argument('--script-sha256', help='Reject a take if its script changed before or during import')
    args = parser.parse_args()
    try:
        guide(args.video_id) if args.command == 'guide' else import_take(args)
    except (ValueError, FileNotFoundError, KeyError) as error:
        parser.exit(1, f'{error}\n')


if __name__ == '__main__':
    main()
