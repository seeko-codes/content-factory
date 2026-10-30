# Local recording interface

The recording page is an Operate surface inside the existing video-gen visual identity. Inherit paper, ink and blue from src/theme.ts and the calm, readable typography described in STYLE.md. This is an extension of that world, not a new brand.

The script is the main workspace. A narrow script list supports moving through a batch. A persistent recording strip provides record/stop, elapsed time, playback, retake and save. A saved-take list exposes alignment progress and actionable errors. Controls remain available while the script scrolls. At narrow widths, the script picker precedes the reading area and the recording strip wraps.

Read only spoken words, with no cue markup or animation instructions. Space starts/stops, R retakes, and S saves when no editable control has focus. Autoscroll is optional and adjustable. No microphone capture starts without the owner's action. Save retains the raw take before running the existing importer. Never describe a saved raw take as an aligned track before the importer succeeds.
