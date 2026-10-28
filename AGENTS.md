# video-gen

- Read STYLE.md before writing or changing a video. Narration rules matter more than visuals.
- Measured style values live in `src/theme.ts`. Change them only when you've checked the change against the reference frames in `samples/`.
- Workflow and commands: README.md. After editing a script, run `npm run voice -- <id>` again before rendering.
- Build videos from the shared blocks in `src/components` (README, "Building blocks"). A piece a second video could use belongs there, not in a video folder.
- Verify visually: render stills (`npm run stills -- <id> every 2`) and compare them side by side with the reference frames.
- `samples/` holds third-party recordings: keep it local and out of Git. Do not reuse the reference brand's name or logo.
