"""Shared script markup for generated and self-recorded narration."""

import re
import sys

CTA = {
    "text": 'Want to take SAT math prep *seriously?* {cta} Comment *"ultralearn".*',
    "say": "Want to take SAT math prep seriously? Comment, ultra learn.",  # two words so the voice says it cleanly
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



def script_lines(script):
    """Copy the script and append its shared channel CTA."""
    lines = [dict(line) for line in script["lines"]]
    if script.get("cta", True):
        lines[-1]["pause"] = max(lines[-1].get("pause", script.get("pause", 0.45)), CTA_GAP)
        lines.append(dict(CTA))
    return lines
