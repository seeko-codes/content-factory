# Posting calendar, 20 videos a day

This file says which videos from `sat-video-list.csv` go out on which day for the 2026-27 SAT season. Each row in the list has a `timing` slot and an `urgent_hook`. This calendar decides when each slot is live and what the 20-video mix looks like that day.

## Test dates

Official College Board dates, checked 2026-10-27. The June score date is projected from the usual 13-day gap, so confirm it on College Board's [score release page](https://satsuite.collegeboard.org/scores/score-release-dates) before relying on it.

| Test | Registration deadline | Late / changes deadline | Scores out |
|---|---|---|---|
| Sat Nov 7, 2026 | Oct 23 | Oct 27 | Fri Nov 20 |
| Sat Dec 5, 2026 | Nov 20 | Nov 24 | Fri Dec 18 |
| Sat Mar 6, 2027 | Feb 19 | Feb 23 | Fri Mar 19 |
| Sat May 1, 2027 | Apr 16 | Apr 20 | Fri May 14 |
| Sat Jun 5, 2027 | May 21 | May 25 | about Fri Jun 18 |

Other moments:
- **PSAT/NMSQT:** given in schools in October, the season's first wave of interest.
- **AP exams:** the first two weeks of May compete for students' attention.
- **SAT School Day:** spring weekday administrations add audience, but the dates vary by state.

Sources: [College Board dates and deadlines](https://satsuite.collegeboard.org/sat/dates-deadlines), [College Board score release dates](https://satsuite.collegeboard.org/scores/score-release-dates?excmpid=FB-ED-CB-1), [College Board calendar flyer](https://www.newton.k12.oh.us/Downloads/sat-suite-calendar-flyer.pdf), [Magoosh](https://magoosh.com/sat/sat-score-release/).

## Who makes what

The list is split evenly between **Andres** and **Sharan** (the `owner` column in `sat-video-list.csv`), 284 videos each. Each of you posts **10 videos a day** from your own rows. The two queues have the same quality, domain mix and calendar coverage, so the 20-video daily mix below splits in half: each person covers half of every format count, rounding alternately.

If one person runs out of rows in a live slot, take the other person's lowest-ranked unused rows in that slot, and record the swap in your posting tracker.

## Phases

Every day belongs to one phase, measured against the next test (T).

| Phase | When | Live `timing` slots |
|---|---|---|
| countdown | T-21 to T-4 | countdown, evergreen |
| test-week | T-3 to T-1 | test-week, countdown, evergreen |
| test-day | T | test-day |
| score-day | the score release date | score-day, evergreen |
| post-test | test day + 1 to 14 days after scores, unless a countdown has started | post-test, evergreen |
| evergreen | everything else | evergreen |

When two phases overlap, the later test's countdown wins. Example: Dec 5 countdown starts Nov 14, while Nov 7 scores land Nov 20. That day posts the score-day rows plus the countdown mix.

## The 20-video mix by phase

Format shares follow the research: trap and puzzle videos drive reach, surveys drive saves (and win on Instagram), and why-true is the reference channel's best single-concept format.

| Phase | trap + puzzle | course-60 | why-true | prediction | hack | desmos / scary-symbol / true-story | calendar slot rows |
|---|---|---|---|---|---|---|---|
| evergreen | 8 | 2 | 5 | 0 | 3 | 2 | 0 |
| countdown | 7 | 4 | 3 | 3 | 2 | 1 | (urgent hooks on 10 of 20) |
| test-week | 4 | 3 | 1 | 4 | 2 | 0 | 6 test-week rows |
| test-day | 2 | 1 | 0 | 0 | 0 | 0 | 6 test-day rows (fewer posts, calm tone) |
| score-day | 6 | 2 | 4 | 0 | 2 | 1 | 5 score-day rows |
| post-test | 7 | 2 | 5 | 0 | 2 | 1 | 3 post-test rows |

**Within each slot, use the list's `rank` order.** It already weights format strength, how often the pattern appears on the test, and wow. Within the countdown and test-week phases, pull `very high` and `high` frequency rows first, because those are the ones students will actually meet on test day.

## Urgency hooks

Use `urgent_hook` instead of `hook` on about half of the countdown posts and on all test-week posts. Fill in:
- `{days}`: calendar days until the next test, counted from the posting date. On Oct 28, the Nov 7 test is 10 days away.
- `{test}`: "the November SAT", "the December SAT" and so on.
- `{date}`: "November 7".

**Tone:** calm and confident, matching the narrator. Use "The SAT is in 6 days. You will see this." Never use "you're running out of time!!"

**Registration deadlines** are also natural hooks, with no extra videos needed: "Registration for {test} closes {date}". Put them on 2-3 evergreen posts the day before each deadline.

## Season at a glance

| Dates | Phase | Notes |
|---|---|---|
| Oct 28 - Nov 3 | countdown (Nov 7) | Starts mid-countdown: T-10. Open with the strongest very-high-frequency traps and the "All of SAT Math in 60 seconds" survey. |
| Nov 4 - Nov 6 | test-week | Reference sheet, answer-entry rules, top traps, predictions. |
| Nov 7 | test-day | Morning calm reminders, an evening recap of question types. |
| Nov 8 - Nov 13 | post-test | Retake framing pointed at Dec 5. |
| Nov 14 - Dec 1 | countdown (Dec 5) | Nov 20 is both Nov 7 score day and the Dec 5 registration deadline. Nov 24 is the late deadline. |
| Dec 2 - Dec 4 | test-week | |
| Dec 5 | test-day | |
| Dec 6 - Dec 17 | post-test | |
| Dec 18 | score-day | |
| Dec 19 - Feb 12 | evergreen | The longest stretch. Build the back catalog of evergreen why-true and trap videos, and remake proven winners with new numbers. Registration deadline Feb 19 for the March test. |
| Feb 13 - Mar 2 | countdown (Mar 6) | Late deadline Feb 23. |
| Mar 3 - Mar 5 | test-week | |
| Mar 6 | test-day | |
| Mar 7 - Mar 18 | post-test | |
| Mar 19 | score-day | |
| Mar 20 - Apr 9 | evergreen | |
| Apr 10 - Apr 27 | countdown (May 1) | Deadlines Apr 16 and 20. |
| Apr 28 - Apr 30 | test-week | |
| May 1 | test-day | AP exams start the following week. |
| May 2 - May 13 | post-test | |
| May 14 | score-day | It is also inside the Jun 5 countdown, which starts May 15. |
| May 15 - Jun 1 | countdown (Jun 5) | Deadlines May 21 and 25. |
| Jun 2 - Jun 4 | test-week | |
| Jun 5 | test-day | |
| about Jun 18 | score-day | Then summer evergreen until the August test. |

## Volume and reuse

From Oct 28 to Jun 18 is about 233 days, or about 4,700 posts at 20 a day. The list has about 550 unique ideas, so each idea will be posted several times in different ways:
- **New numbers.** Trap and puzzle rows are templates, so re-render the same insight with fresh values. Remaking proven problems is what the top SAT accounts do.
- **Two hooks.** The plain `hook` for evergreen days, the `urgent_hook` for countdown days.
- **Platform passes.** The same render goes to YouTube Shorts, TikTok and Instagram. In the research, YouTube Shorts gave SAT math the most reach.

## Measuring it

Expect a power law: most posts will land around 10-30K views, and a few will break out. Each week:
1. Rank posts by views and by save and share rate.
2. Make variants of the top 5% within days.
3. Drop formats that stay in the bottom quartile for two weeks.
4. Feed what wins back into `rank`.
