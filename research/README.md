# Research

| File | What it is |
|---|---|
| [sat-video-list.csv](sat-video-list.csv) | **The production list:** 568 SAT math video ideas, ranked, each assigned to Andres or Sharan. Start here. |
| [posting-calendar.md](posting-calendar.md) | Which `timing` slots go live on which day of the 2026-27 SAT season, and the daily mix of 20 videos. |
| [viral-sat-research.md](viral-sat-research.md) | What SAT videos go viral on Shorts and TikTok: 43 examples with view counts, plus formats, topics and hooks. |
| [sat-question-patterns.md](sat-question-patterns.md) | 148 recurring digital SAT math question patterns from College Board's question bank, with frequency, trap and key insight. |
| [sat-math-topics.md](sat-math-topics.md) | The first topic study: reference-channel performance and 60 big visual ideas. |

## The video list

Open `sat-video-list.csv` in Google Sheets or Numbers. Each row is one 60-second video in the house style (see `../STYLE.md`).

| Column | Meaning |
|---|---|
| rank | Overall priority, 1 first. It weights format strength from the viral research and the reference channel, how often the pattern appears on the SAT, and visual wow. |
| id | Stable id by domain: `ALG`, `ADV` (Advanced Math), `PSD` (Problem-Solving and Data), `GEO` (Geometry and Trig) and `SAT` (cross-domain). |
| owner | **Andres** or **Sharan**, each with 284 videos. |
| format | `trap`, `puzzle`, `why-true`, `course-60`, `hack`, `scary-symbol`, `prediction`, `desmos` or `true-story`. These are defined in the posting calendar and the viral research. |
| domain, skill | The official College Board domain and skill. |
| title | The post title. |
| hook | The first spoken line. For trap and puzzle videos it is the problem itself, read aloud in the first two seconds. |
| insight | The one idea that cracks it, with the actual answer. This is the core of the script. |
| visual | What is on screen, and the continuous transformation to animate. |
| payoff | Which SAT question type it unlocks. |
| frequency | How often the pattern appears on the digital SAT: `very high`, `high`, `medium` or `low`. `low` marks pure-reach number-sense puzzles. |
| wow | 1-3. Visual surprise that non-SAT viewers would share. |
| timing | When it lands best: `evergreen`, `countdown`, `test-week`, `test-day`, `score-day` or `post-test`. See the posting calendar. |
| urgent_hook | An alternate opener with test-date urgency. Fill in `{days}`, `{test}` and `{date}` on the posting day. |

**What's in it:**

| | Count |
|---|---|
| Domain | Advanced Math 151, Algebra 108, Geometry and Trig 107, Cross-domain 102, Data 100 |
| Format | trap 172, puzzle 119, hack 82, course-60 56, why-true 56, desmos 33, prediction 22, scary-symbol 20, true-story 8 |
| Timing | evergreen 326, countdown 141, test-week 47, post-test 23, test-day 16, score-day 15 |

**The owner split.** Videos are dealt snake-draft style (A, B, B, A ...) in rank order within each domain and timing group. Each person gets the same number of top-ranked videos, the same domain mix and the same calendar coverage. The two queues differ by at most a few rows in any category.

## From row to video

1. **Pick today's rows.** Filter `owner` to yourself and `timing` to the slots live today (from the posting calendar), then sort by `rank`. Take your 10 following the day's format mix.
2. **Write `src/videos/<id>/script.json`.** Open on `hook`, or on `urgent_hook` with its placeholders filled. Turn `insight` into 5-9 short lines following the narration rules in `STYLE.md`: show first, name last, close on one thesis line. Put `{cues}` where the `visual` should change.
3. **Voice, draw, render.** Follow `../README.md`.
4. **Re-render winners.** Once the first pass is done, re-render the best performers with new numbers. Trap and puzzle rows are templates.

**Checking answers.** The list writers recomputed every answer in code, and a sample of the merged list was rechecked by hand. Before a video ships, compute its answer once more, because a wrong answer in a math video costs more trust than any other mistake. Rows marked `true-story` cite real events. Re-read the row's facts before you publish it.
