# Recurring digital SAT math question patterns

Researched 2026-10-27 for planning one video per pattern. The strongest evidence comes from College Board's public SAT Suite Question Bank: all 1,925 SAT Math items were pulled and sorted into patterns by keyword matching on the question text and the official explanations, with samples of each pattern checked by hand. Treat the counts as relative, about ±30%.

**Per-test estimate:** a pattern with n bank items shows up about n/44 times per 44-question test, if the bank mirrors the live pool. The bank leans slightly away from the official weights:

| Domain | Bank share | Official share |
|---|---|---|
| Algebra | 32% | 35% |
| Advanced Math | 28% | 35% |
| Problem-Solving and Data Analysis | 22% | 15% |
| Geometry and Trigonometry | 18% | 15% |

**Frequency labels:**
- **Very high:** n≥40, or in Mathchops' top 10.
- **High:** n 20-39, or Mathchops 11-30.
- **Medium:** n 10-19, or Mathchops 31-60.
- **Low:** under 10.

**Evidence grades:**
- **[A]** College Board data or specification.
- **[B]** Mathchops' tagging of the six official adaptive Bluebook tests. "MC#k" is the rank in its Top 60 list.
- **[C]** A single prep source, or inference.

"Hardest band" means the bank's top score band, band 7, with 316 items.

## Official structure

**Format:**
- 2 adaptive modules, each 22 questions (20 scored + 2 unscored pretest) in 35 minutes. Section total: 44 questions in 70 minutes.
- About 75% multiple choice and 25% student-produced response.
- About 30% of questions are set in context.
- Desmos is built in for the whole section.

**Adaptive routing:**
- Module 2 is easier or harder depending on Module 1.
- Each module covers all four domains, ordered easiest to hardest.
- Scoring uses item response theory, so the same raw score can give different results.
- The routing cutoff isn't published.

| Domain | Questions | Skills |
|---|---|---|
| Algebra | about 35%, 13-15 | Linear equations in one variable; Linear functions; Linear equations in two variables; Systems of two linear equations in two variables; Linear inequalities in one or two variables |
| Advanced Math | about 35%, 13-15 | Equivalent expressions; Nonlinear equations in one variable and systems of equations in two variables; Nonlinear functions |
| Problem-Solving and Data Analysis | about 15%, 5-7 | Ratios, rates, proportional relationships, and units; Percentages; One-variable data; Two-variable data; Probability and conditional probability; Inference from sample statistics and margin of error; Evaluating statistical claims |
| Geometry and Trigonometry | about 15%, 5-7 | Area and volume; Lines, angles, and triangles; Right triangles and trigonometry; Circles |

**Reference sheet:**
- Circle area and circumference
- Rectangle and triangle area
- Pythagorean theorem
- 30-60-90 (x, x√3, 2x) and 45-45-90 (s, s, s√2)
- Box, cylinder, sphere, cone and pyramid volumes
- 360° = 2π radians
- Triangle angles sum to 180

**Effectively absent:** complex numbers, matrices, logarithms, sequences, function composition, the remainder theorem. Do not prioritize these.

**Question bank by skill** (total, then Easy / Medium / Hard, then the share that is Hard):

| Skill | Total | E / M / H | Hard |
|---|---|---|---|
| Linear equations in one variable | 112 | 64 / 28 / 20 | 18% |
| Linear functions | 170 | 82 / 56 / 32 | 19% |
| Linear equations in two variables | 130 | 56 / 41 / 33 | 25% |
| Systems of two linear equations | 126 | 38 / 46 / 42 | 33% |
| Linear inequalities | 78 | 29 / 29 / 20 | 26% |
| Equivalent expressions | 116 | 43 / 39 / 34 | 29% |
| Nonlinear equations and systems | 165 | 43 / 60 / 62 | 38% |
| Nonlinear functions | 259 | 65 / 92 / 102 | 39% |
| Ratios, rates, units | 93 | 42 / 32 / 19 | 20% |
| Percentages | 84 | 28 / 22 / 34 | 40% |
| One-variable data | 84 | 37 / 21 / 26 | 31% |
| Two-variable data | 71 | 34 / 26 / 11 | 15% |
| Probability | 49 | 24 / 14 / 11 | 22% |
| Inference and margin of error | 28 | 10 / 13 / 5 | 18% |
| Evaluating statistical claims | 12 | 2 / 3 / 7 | 58% |
| Area and volume | 110 | 36 / 38 / 36 | 33% |
| Lines, angles, triangles | 102 | 40 / 29 / 33 | 32% |
| Right triangles and trig | 69 | 8 / 19 / 42 | 61% |
| Circles | 67 | 4 / 22 / 41 | 61% |

## Pattern map

Each line reads: pattern | how often (basis) | difficulty | trap | key insight | Desmos?

### Algebra: linear equations in one variable
- A1. Solve with distribution, fractions or decimals | Very high (about 49; MC#27, #28) | Easy | distributing a negative to only one term | multiply every term by the common denominator | yes
- A2. Equation given, the question asks for an expression (2x, x+3) | High (78 bank-wide; MC#17) | Easy-Med | entering x | look for the asked expression already grouped inside | partly
- A3. No solution or infinitely many: find the constant | Medium (17, 52% hard) | Med-Hard | swapping the two conditions | ax+b=cx+d. No solution: a=c, b≠d. Infinitely many: a=c, b=d | partly
- A4. Constants cancel (answer: exactly one solution, x=0) | Low-Med [C] | Med-Hard | calling it "no solution" | different x-coefficients always give exactly one solution | yes
- A5. Write an equation from a fee-plus-rate story | Medium (13) | Easy-Med | fee on the rate term | total = fixed + rate × count | no
- A6. One-variable word problem | High (about 20) | Easy | rounding the wrong way for context | solve, then check the result against the story | yes

### Algebra: linear functions
- A7. Interpret the slope in context | High (MC#2, #14) | Easy-Med | calling it the starting amount | change in output per 1 unit of input | no
- A8. Interpret the y-intercept | Very high (MC#1) | Easy | treating it as a rate | output when the input is 0 | no
- A9. Linear function from a table or two points | High (29) | Easy-Med | Δx/Δy | m = Δy/Δx, then one point gives b | yes
- A10. Match a linear function to its graph | High (32) | Easy | axis scale | intercept, then rise over run | yes
- A11. Evaluate f(a), or solve f(x)=k | High (29; MC#4, #24) | Easy | mixing up f(k) and f(x)=k | substitute for f(k); solve for f(x)=k | yes
- A12. Build a model: initial value plus rate | High (27) | Easy-Hard | swapping rate and start | start = constant, rate = coefficient | partly
- A13. "First unit A, each additional B" | Medium (12, 6 hardest band) | Hard | A + Bx | A + B(x-1) | partly
- A14. Change in y when x increases by k | High (about 36) | Easy-Med | giving the per-1 change | slope × k | yes
- A15. Graph of f(x)+k shown, or sign conditions on constants | Low-Med | Hard | wrong shift direction | subtract k; match the signs | partly

### Algebra: linear equations in two variables
- A16. Slope of Ax+By=C | High (MC#8) | Easy-Med | A/B | -A/B | yes
- A17. Intercepts | High (MC#9) | Easy-Med | swapping them | set the other variable to 0 | yes
- A18. Perpendicular line through a point | Medium (20, 12 hard) | Med-Hard | flipping only the sign or only the reciprocal | -1/m | yes
- A19. Parallel lines: find a constant | Medium (9) | Easy-Med | matching intercepts | equal slopes | yes
- A20. Ax+By=C from a two-item total | High (24) | Easy | wrong price-count pairing | coefficient = per-item value | no
- A21. Interpret a term in Ax+By=C | Medium (12) | Easy-Med | C as a per-item value | C is the total | no
- A22. A point lies on the line: find the missing value | Very high (48; MC#15) | Easy-Hard | wrong variable | plug in both coordinates | yes
- A23. Graph shown, which equation or table | High (43) | Easy-Hard | scale | test two clear points | yes

### Algebra: systems
- A24. Solve a 2x2 system | Very high (about 52; MC#3, #13) | Easy-Med | answering x when y was asked | eliminate or substitute | yes
- A25. Asks for x+y or 2x+3y | Medium (14) | Medium | solving everything | add or subtract the equations to produce the target | partly
- A26. No solution: find k | High (25, 72% hard, 12 hardest band; MC#35) | Hard | the k that gives identical lines | same coefficient ratio, different constant ratio | partly
- A27. Infinitely many: find a constant or ratio | Medium | Hard | matching slopes only | a/d = b/e = c/f | partly
- A28. Which system has exactly one or no solution | Low-Med | Med-Hard | comparing intercepts | different slopes mean exactly one | yes
- A29. Read the solution off graphs | High (20) | Easy | reading an intercept | the intersection is the answer | yes
- A30. System from context (tickets, coins, mixtures) | High (34 incl. context) | Easy-Med | mixing count and value | one counts items, one totals value | no
- A31. Dependent system: which point lies on both for each r | Low | Hard | expecting one solution | the equations are multiples | yes

### Algebra: inequalities
- A32. Max or min whole-number count from a constraint | High (39; MC#39) | Easy-Hard | rounding the wrong way | solve as an equation, then take the largest valid integer | yes
- A33. Translate at least / at most | Medium (13) | Easy-Med | reversed | at least ≥, at most ≤ | no
- A34. Which point satisfies a system; shaded region | Medium (13) | Easy-Med | checking only one inequality | test all of them; dashed means strict | yes
- A35. Solve or interpret an inequality | Medium (13) | Medium | no flip for a negative | flip when multiplying or dividing by a negative | yes
- A36. Two-constraint word problem | Medium | Med-Hard | using one constraint | to maximize one variable, minimize the other | yes

### Advanced Math: equivalent expressions
- B1. Expand or combine polynomials | Very high (about 63; MC#11) | Easy | not distributing the minus sign | distribute to every term | partly
- B2. Factor or identify a factor | Med-High (MC#10) | Easy-Med | sign errors | a zero at r means (x-r) | yes
- B3. Difference of squares (x⁴-81) | Low-Med | Medium | (x-9)² | (a-b)(a+b), sometimes twice | partly
- B4. Factor by grouping | Low-Med (hard path) | Med-Hard | bad grouping | GCF of each pair, then the shared binomial | partly
- B5. Identity "equivalent for all x": find constants | Med-High (20, 60% hard; MC#31, #34) | Med-Hard | dropping a cross term | match the coefficients | partly
- B6. Rational expressions, partial fractions | Medium (13, 69% hard) | Hard | adding denominators | common denominator; cancel factors only | partly
- B7. Quotient plus remainder/(x-c) | Low | Hard | dividing only the leading term | numerator = (x-c)·q + r | yes
- B8. Exponent rules, rational exponents | Medium (about 15; MC#50-52) | Med-Hard | flipping m/n | root index = denominator; same base adds exponents | partly
- B9. Exponent that makes expressions equivalent | Low | Hard | mixed bases | common base, equate exponents | partly
- B10. Which must be an integer (factored form) | Low | Hard | assumptions | expand and match | no

### Advanced Math: nonlinear equations and systems
- B11. Solve a formula for a variable | High (45) | Easy-Med | dividing only one term | undo in reverse order | partly
- B12. Solve a quadratic; positive or greater root | High (about 33) | Easy-Med | the negative root | standard form, then factor or the formula | yes
- B13. Discriminant: number of solutions, or c for exactly one | High (28, 78% hard, 17 hardest band; MC#22) | Hard | not rearranging first | b²-4ac: positive 2, zero 1, negative 0 | partly
- B14. Line y=c touches a parabola once | Medium (all hardest band) | Hard | the vertex's x | c = the vertex's y; slanted line: discriminant = 0 | yes
- B15. Sum or product of solutions | Medium (21, 81% hard) | Hard | forgetting to divide by a | sum = -b/a, product = c/a | yes
- B16. Line and parabola system | High (39; MC#30) | Medium | missing the second intersection | substitute the line in | yes
- B17. Absolute value equation | Low-Med (MC#32) | Easy-Med | dropping the negative case | A = ±k | yes
- B18. Radical equation, extraneous root | Low-Med (8, 75% hard) | Hard | keeping the fake root | check each root in the original | yes
- B19. Rational equation | Low (9) | Med-Hard | a root that zeroes a denominator | discard excluded values | yes
- B20. Structure: from 3x²-18x-15=0 find x²-6x | Low | Hard | the quadratic formula | divide by 3 | partly
- B21. Factored polynomial zeros | Medium (MC#49) | Easy-Med | root signs | zero-product property | yes
- B22. Exponential equation, common base | Low | Medium | mismatched bases | rewrite as the same base | yes

### Advanced Math: nonlinear functions
- B23. Interpret 1.05 or 500 in 500(1.05)^t | Medium (MC#5) | Easy-Med | 1.05 read as 105% | b = 1+r; a = value at t=0 | no
- B24. 0.85 means a 15% decrease | Med-High (MC#16) | Medium | answering 85% | rate = \|1-b\| | no
- B25. Exponential model from % per period | High (about 21) | Medium | base 1+5 or 0.05 | a(1±r)^t | no
- B26. Doubling or half-life over a period | Medium (20) | Med-Hard | 2^(4t) | 2^(t/period) | partly
- B27. Change time units in an exponential | Low-Med (57% hard) | Hard | inconsistent changes | substitute t = q/4 | partly
- B28. "4% every n months": find n | Low | Hard | mixing years and months | match base and exponent | partly
- B29. Exponential from a table or two points | Medium (10) | Med-Hard | looking for constant differences | constant ratio; f(0)=a | yes
- B30. Linear vs exponential | Medium (14) | Easy-Med | "+3% a year" read as linear | differences vs ratios | no
- B31. Compare equivalent exponential forms | Low-Med | Hard | shifts read as coefficients | b^(x+3) = b³·b^x | partly
- B32. Exponential y-intercept | Med-High (MC#25, nearly every test) | Easy-Med | answering a | plug in x=0 | yes
- B33. Vertex, maximum or minimum of a quadratic | High (31, 80% hard; MC#21) | Med-Hard | sign of h | x = -b/2a | yes
- B34. Axis of symmetry from zeros or equal outputs | Medium | Medium | one zero as the vertex | the average of the two inputs | yes
- B35. Which form shows a feature | Low-Med | Med-Hard | factored form for the vertex | vertex form shows the extreme, factored the zeros, standard the y-intercept | partly
- B36. Projectile or height model | Medium | Med-Hard | negative time | landing at h=0; maximum at the vertex | yes
- B37. Quadratic from vertex plus a point | Medium | Hard | forgetting a | a(x-h)²+k, then solve for a | yes
- B38. Revenue or area quadratic | Low-Med | Hard | changing one factor | price × quantity | yes
- B39. Interpret f(1.4)=1.64 | Low-Med (8) | Medium | swapping input and output | input and output, with units | no
- B40. Zeros and factors | Medium (18; MC#9) | Easy-Med | (x+4) vs (x-4) | f(r)=0 means (x-r) | yes
- B41. Initial value of a nonlinear function | Medium (18) | Easy | a coefficient | f(0) | yes
- B42. Coefficients from symmetry | Medium | Hard | ignoring symmetry | midpoint of the zeros | partly
- B43. Multiplicity and end behavior | Low-Med (MC#49) | Hard | ignoring multiplicity | even touches, odd crosses | yes
- B44. Transformations f(x-3)+2 | Medium (18, 61% hard; MC#12) | Med-Hard | horizontal direction | inside moves opposite | yes
- B45. Evaluate or invert a nonlinear function | High (36) | Easy-Med | substitution errors | parentheses | yes
- B46. Graph or table: which equation | High (about 44) | Easy-Hard | scale | test two or three points | yes
- B47. Shifted-input zeros g(c-w)=0 | Low | Hard | solving for x | set the inner expression equal to each zero | partly

### Problem-Solving and Data Analysis

Ratios, rates and units:
- C1. Unit rate, or rate × time | High (31) | Easy | dividing in the wrong order | cancel units like fractions | no
- C2. Multi-step unit conversion | High (23; MC#38) | Easy-Med | multiplying instead of dividing | chain the factors | no
- C3. Squared or cubic unit conversion | Med-High (21, 52% hard) | Hard | applying the factor once | square or cube it | no
- C4. Density, derived units | Low-Med (14) | Med-Hard | not on the reference sheet | mass/volume | no
- C5. Part:part vs part:whole | Medium (17; MC#29) | Easy-Med | treating part:part as part:whole | whole = sum of the parts | no
- C6. Scale drawings and maps | Low | Med-Hard | scaling area by k | area by k² | no
- C7. Rate with variables | Low | Hard | mixing units | (87/m)·12k | no
- C8. Ratio algebra with two ratios | Low | Hard | solving each variable | divide one equation by the other | no

Percentages:
- C9. Percent of a quantity, including from a table | Very high (about 46; MC#7) | Easy | wrong whole | part/whole | no
- C10. Percent change; "p% greater than" | High (20, 65% hard) | Med-Hard | new value as the base | change/original | no
- C11. Percents of 100% or more | Medium (18, 16 hardest band) | Hard | "increase by 400%" read as ×4 | ×(1+p/100) | no
- C12. Successive changes | Low-Med (87% hard) | Hard | adding the percents | multiply the factors | no
- C13. Chained percents | Low-Med | Hard | setup errors | chain the multipliers | no
- C14. Reverse percent | Low-Med | Medium | the percent of the sale price | final/(1-r) | no
- C15. Percent as a multiplier with variables | Low (7) | Med-Hard | b = 0.31 | 1 ± r | no
- C16. Discount, tax, tip | Low (9) | Medium | wrong base | multipliers in order | no

One-variable data:
- C17. Mean from a list, table or dot plot | High (24; MC#23) | Easy-Med | ignoring frequencies | Σ(value × frequency)/n | partly
- C18. Missing value; combined mean | Medium (hard path) | Med-Hard | averaging averages | total = mean × count | no
- C19. Median from a frequency table | Medium (15; MC#46) | Easy-Med | the middle row | position (n+1)/2 | partly
- C20. Removing an outlier: mean vs median | Medium (16, 56% hard) | Med-Hard | assuming the median never moves | the mean moves a lot; the median moves at most one position | no
- C21. Compare standard deviations | Low (6) | Medium | SD read as range | spread from the center; shifting changes nothing | no
- C22. Range, box plots | Low | Easy-Med | median read as mean | a box plot shows the median and quartiles | no
- C23. Compare two distributions | Medium | Medium | the tallest bar | center and spread separately | no

Two-variable data:
- C24. Line of best fit: predict | High (36; MC#54) | Easy-Med | using a data point | use the line | partly
- C25. Interpret the best-fit slope or intercept | Medium | Easy-Med | "actual" | it is predicted | no
- C26. Actual vs predicted | Medium (20) | Easy-Med | sign | residual = actual - predicted | no
- C27. Choose the model type | Medium (14) | Easy | ignoring curvature | curve shape decides | partly

Probability:
- C28. Conditional probability from a two-way table | High (31; MC#43) | Easy-Hard | grand total as the denominator | the "given" group total | no
- C29. Simple probability | Medium (18) | Easy | wrong total | favorable/total | no
- C30. Find a count from a probability | Low | Medium | inverting | p × total | no

Inference and statistical claims:
- C31. Interpret the margin of error | Medium (18; MC#56) | Medium | applied to individuals | plausible values for the population parameter | no
- C32. Sample size and margin of error | Low | Easy-Med | bigger sample means bigger margin | bigger random sample usually means a smaller margin | no
- C33. Population estimate from a sample | Medium (10) | Easy-Med | multiplying by the sample size | proportion × population | no
- C34. Whom results generalize to | Low-Med | Med-Hard | overgeneralizing | only the randomly sampled population | no
- C35. Causation needs random assignment | Low | Med-Hard | observational study | assignment supports cause; selection supports generalization | no

### Geometry and Trigonometry

Area and volume:
- D1. Area or perimeter, composite figures | High (47; MC#20, #58) | Easy | a slanted side as height | the height is perpendicular | no
- D2. Area from coordinates | Low | Hard | side lengths | enclose in a rectangle and subtract | partly
- D3. Prism or cube volume and surface area | Medium (15; MC#37) | Med-Hard | SA vs V | SA = 2(lw+lh+wh) | no
- D4. Cylinder, cone, sphere, pyramid | High (23) | Medium | diameter vs radius; the 1/3 | reference sheet | no
- D5. Slant height vs height | Low | Hard | using slant height as height | right triangle | no
- D6. Scale factor k, k², k³ | High (25, 56% hard) | Med-Hard | scaling volume by k | area k², volume k³ | no
- D7. Similar figures: perimeter vs area ratio | Low | Hard | same ratio for both | k vs k² | no
- D8. Surface area in general | Low-Med (10 of 11 hard) | Hard | missing faces | list every face | no

Lines, angles and triangles:
- D9. Parallel lines and a transversal, with algebra | High (42; MC#36) | Easy-Hard | supplementary angles set equal | only a and 180-a | no
- D10. Which could NOT be the sum of two of the eight angles | Low | Hard | too few cases | sums 2a, 180, 360-2a | no
- D11. Angle sum, exterior angle, isosceles | High (34) | Easy-Med | wrong exterior angle | exterior = sum of the two remote interior angles | no
- D12. Similar triangles, parallel segment inside | High (about 33; MC#19) | Med-Hard | segment vs whole side | match the vertices | no
- D13. Which fact proves congruence or similarity | Medium (13) | Med-Hard | SSA | SSS, SAS, ASA, AAS; AA | no
- D14. Angle at a bend between parallel lines | Low | Hard | guessing | draw a parallel line through the vertex | no
- D15. Polygon interior angle sum | Low | Medium | 180n | (n-2)·180 | no

Right triangles and trigonometry:
- D16. Pythagorean theorem and triples | High (MC#18, #26) | Easy-Med | adding the legs | 3-4-5, 5-12-13, 8-15-17 | no
- D17. Trig ratio from sides | High (27; MC#42) | Med-Hard | opposite vs adjacent | label from the named angle | no
- D18. Given a trig ratio, find a side or perimeter | Medium (14) | Hard | ratio numbers as lengths | sides = k × the ratio terms | no
- D19. Similar triangles share trig ratios | Low-Med (7) | Med-Hard | recomputing | equal angles give equal ratios | no
- D20. sin x = cos y means x+y=90 | Low-Med (75% hard) | Hard | setting the angles equal | sin θ = cos(90-θ) | partly
- D21. Special right triangles from area or perimeter | Medium (14, 85% hard) | Hard | swapping x√3 and 2x | reference sheet ratios | no

Circles:
- D22. Center and radius from the equation | Med-High (29; MC#47) | Medium | center sign; r² as the radius | (x-h)²+(y-k)²=r² | yes
- D23. Equation from center and radius or a diameter | Medium | Med-Hard | diameter as the radius | the midpoint is the center | yes
- D24. Complete the square for a circle | Low-Med (87% hard; MC#55) | Hard | only x completed; one side only | add (b/2)² to both x and y, on both sides | partly
- D25. Inside, outside or on; tangent to an axis | Medium (16) | Med-Hard | distance compared with r² | squared distance vs r²; \|h\| = r | yes
- D26. Translate or rescale a circle | Low | Hard | changing r on a shift | a shift moves only the center | yes
- D27. Tangent line to a circle | Low (all hard) | Hard | the radius's slope | perpendicular to the radius | yes
- D28. Arc length, sector area | Low-Med | Med-Hard | using the diameter | arc/circumference = angle/360 | no
- D29. Radians, s = rθ | Low-Med (MC#59) | Medium | wrong mode | π = 180° | no
- D30. Inscribed angles, semicircle | Low | Hard | inscribed treated as central | inscribed = ½ central | no

## The 25 hardest and most-missed (hard Module 2)

1. Discriminant or tangency with a parameter
2. Systems with no or infinitely many solutions, fractional coefficients
3. Percents of 100% or more, chained percents
4. Parallel-line angle chasing, "could NOT"
5. Exponential percent with time-unit changes
6. Scale factors k² and k³
7. Quadratic extremum with unknown constants
8. Special right triangles from area or perimeter
9. Trig ratio given, find the sides
10. Squared or cubic unit conversion
11. Completing the square for a circle with a parameter
12. f(x)+k graph, "each additional" models
13. Nonlinear transformations
14. Identity coefficient matching, partial fractions
15. Multi-layer two-way tables
16. Sum of solutions or all possible values
17. Extraneous roots
18. Combined or missing mean
19. sin x = cos y with algebraic angles
20. Surface area and slant height
21. Tangent to a circle and perpendicular lines
22. Polynomial multiplicity
23. Area from coordinates
24. Structure shortcuts
25. Generalization vs causation

**Signals of a hard item:**
- **Constraint wording:** "positive constant" (23 of 28 hard), "exactly one" (14 of 15), "minimum or greatest possible value" (11 of 12).
- **Answer-format wording:** "could be the value" and "NOT".

## Traps that repeat across many questions

1. Answering the wrong quantity (x instead of 2x, x instead of y, the negative root).
2. Percent base errors: new value as the base, "increase by p%" read as ×p, adding successive percents, mixing up 1.05 and 5%.
3. Mixing up "no solution" and "infinitely many."
4. Keeping extraneous roots.
5. Sign errors: distributing a negative, (x-h) meaning +h, horizontal shifts.
6. r vs r², diameter vs radius.
7. Linear scaling of area or volume, and of squared or cubic units.
8. Data point vs model prediction; residual sign.
9. Wrong denominator in conditional probability.
10. Inequality direction, and rounding whole-number counts.
11. Off-by-one with "each additional."
12. Exponent period (2^(4t) vs 2^(t/4)).
13. Trig sides labeled from the wrong angle; complementary vs supplementary.
14. Averaging averages.
15. Overreaching statistical conclusions.
16. Ignoring stated constraints (positive, integer).
17. Student-response entry errors (length, mixed numbers, % or $ signs).
18. Desmos errors (= instead of ~ in a regression, degree vs radian mode, unzoomed readings).
19. Over-solving when one combined step answers directly.
20. Ignoring that figures are drawn to scale unless stated, so estimation is a legitimate check.

## Sources

**College Board:**
- [Assessment Framework for the Digital SAT Suite v4.0](https://satsuite.collegeboard.org/media/pdf/assessment-framework-for-digital-sat-suite.pdf)
- [Math overview](https://satsuite.collegeboard.org/sat/whats-on-the-test/math/overview)
- [Math alignment](https://satsuite.collegeboard.org/k12-educators/about/alignment/math)
- [Scoring](https://satsuite.collegeboard.org/sat/scores/understanding-scores/how-scores-are-calculated)
- [Practice Test 4](https://satsuite.collegeboard.org/media/pdf/sat-practice-test-4-digital.pdf)
- [SAT Suite Question Bank](https://satsuitequestionbank.collegeboard.org/)

**Prep analyses:**
- [Mathchops Top 60](https://mathchops.substack.com/p/the-top-60-dsat-math-questions)
- [Mathchops scouting report](https://mathchops.substack.com/p/dsat-math-scouting-report)
- [Mathchops top 20 hard and easy](https://mathchops.substack.com/p/the-top-20-hard-and-easy-dsat-math)
- [Larry Learns: hardest questions](https://www.larrylearns.com/blog/hardest-sat-math-questions)
- [StrategicTestPrep](https://strategictestprep.com/post/700s-sat-math-club-part-5-10-of-the-hardest-sat-math-problems-high-scorers-still-miss)
- [LearnQ Desmos guide](https://blogs.learnq.ai/?p=4053)
- [OnePrep Desmos tips](https://www.oneprep.com/blog/sat-math-tips-desmos-2025-12-fast-tricks)
- [Open Exam Prep routing](https://open-exam-prep.com/study-guides/sat-math/introduction/exam-structure-routing)

**Gaps:** counts come from keyword classification, not College Board labels, and the bank is not the live test. Mathchops' frequency charts are images, so only its ranks were used.
