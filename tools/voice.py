# /// script
# requires-python = ">=3.10,<3.13"
# dependencies = ["kokoro>=0.9.4", "soundfile"]
# ///
"""Narrate a video script with Kokoro (local TTS) and write word timings.

    npm run voice -- integral

Reads  src/videos/<id>/script.json
Writes public/voice/<id>/narration.wav and public/voice/<id>/timing.json

Script markup, per line of narration (one line = one caption screen):
  *word* or *several words*  emphasis: stays dark after it is read
  $tex$                      inline math in the caption (give the line a "say")
  {cue}                      named moment = start of the next spoken word

Every video ends with the channel's call to action (CTA below) unless the
script sets "cta": false.
"""

import json
import re
import sys
from pathlib import Path

import numpy as np
import soundfile as sf
from kokoro import KPipeline

ROOT = Path(__file__).resolve().parent.parent
SR = 24000
LEAD = 0.05  # seconds kept before the first word / after the last word of a line
CTA = {
    "text": 'Want to take SAT math prep *seriously?* {cta} Comment *"seeko".*',
    "say": "Want to take SAT math prep seriously? Comment, seeko.",
}
CTA_GAP = 0.8  # seconds of silence between the thesis line and the CTA


def tokenize(text):
    """Display tokens with emphasis/tex flags, and cue names keyed by token index."""
    tokens, cues, in_emph = [], {}, False
    for raw in re.findall(r"\{[\w-]+\}|[^\s$]*\$[^$]+\$[^\s$]*|\S+", text):
        if re.fullmatch(r"\{[\w-]+\}", raw):
            cues[raw[1:-1]] = len(tokens)
            continue
        opens = raw.startswith("*")
        closes = "*" in (raw[1:] if opens else raw)
        tokens.append({"text": raw.replace("*", ""), "emph": in_emph or opens, "tex": "$" in raw})
        in_emph = (in_emph or opens) and not closes
    return tokens, cues


def spoken(line, tokens):
    if "say" in line:
        return line["say"]
    if any(t["tex"] for t in tokens):
        sys.exit(f'Line has math, add a "say" with how it is read aloud: {line["text"]}')
    return " ".join(t["text"] for t in tokens)


def synth(pipeline, text, voice, speed):
    """Audio and [(start, end)] per spoken word, relative to the audio."""
    audio, words, offset = [], [], 0.0
    for result in pipeline(text, voice=voice, speed=speed):
        chunk = result.audio.numpy()
        for tok in result.tokens:
            if tok.start_ts is not None and any(c.isalnum() for c in tok.text):
                words.append((offset + tok.start_ts, offset + tok.end_ts))
        audio.append(chunk)
        offset += len(chunk) / SR
    return np.concatenate(audio), words


def align(n_display, words):
    """Map each display token onto spoken word timings (1:1 when counts match)."""
    n = len(words)
    out = []
    for k in range(n_display):
        a = min(n - 1, k * n // n_display)
        b = max(a, min(n - 1, (k + 1) * n // n_display - 1))
        out.append((words[a][0], words[b][1]))
    return out


def main(video_id):
    script = json.loads((ROOT / "src/videos" / video_id / "script.json").read_text())
    voice, speed = script.get("voice", "am_michael"), script.get("speed", 0.92)
    default_pause = script.get("pause", 0.45)
    pipeline = KPipeline(lang_code=voice[0], repo_id="hexgrad/Kokoro-82M")

    pieces, lines, cues, clock = [], [], {}, script.get("lead_in", 0.6)
    pieces.append(np.zeros(int(clock * SR), dtype=np.float32))
    script_lines = [dict(l) for l in script["lines"]]
    if script.get("cta", True):
        script_lines[-1]["pause"] = max(script_lines[-1].get("pause", default_pause), CTA_GAP)
        script_lines.append(CTA)
    for line in script_lines:
        tokens, line_cues = tokenize(line["text"])
        audio, words = synth(pipeline, spoken(line, tokens), voice, speed)
        if not words:
            sys.exit(f"No words synthesized for: {line['text']}")
        # Trim the model's own leading and trailing silence; pauses are ours.
        cut0 = max(0.0, words[0][0] - LEAD)
        cut1 = min(len(audio) / SR, words[-1][1] + LEAD)
        audio = audio[int(cut0 * SR) : int(cut1 * SR)]
        timed = align(len(tokens), [(s - cut0 + clock, e - cut0 + clock) for s, e in words])
        for tok, (s, e) in zip(tokens, timed):
            tok["start"], tok["end"] = round(s, 3), round(e, 3)
        for name, idx in line_cues.items():
            cues[name] = tokens[idx]["start"] if idx < len(tokens) else tokens[-1]["end"]
        lines.append({"start": tokens[0]["start"], "end": tokens[-1]["end"], "tokens": tokens})
        clock += len(audio) / SR
        pause = line.get("pause", default_pause)
        pieces += [audio.astype(np.float32), np.zeros(int(pause * SR), dtype=np.float32)]
        clock += pause

    out = ROOT / "public/voice" / video_id
    out.mkdir(parents=True, exist_ok=True)
    sf.write(out / "narration.wav", np.concatenate(pieces), SR)
    timing = {"id": video_id, "duration": round(clock, 3), "lines": lines, "cues": cues}
    (out / "timing.json").write_text(json.dumps(timing, indent=1))
    words = sum(len(l["tokens"]) for l in lines)
    print(f"{video_id}: {len(lines)} lines, {words} words, {clock:.1f}s, {words / clock * 60:.0f} wpm")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit("usage: npm run voice -- <video-id>")
    main(sys.argv[1])
