# Card authoring contract — Time Series flashcards (READ FULLY)

You are building flashcards for an autonomous HTML revision app (KaTeX-rendered).
The course is **MATH-342 Time Series (EPFL, Prof. S. Olhede)**, taught in English.

## Language
Write **recto/verso in French** (the student's language). Keep the course's
standard technical terms and, for the key concepts, give the English term once in
parentheses, e.g. "bruit blanc (white noise)", "densité spectrale (spectral
density)", "opérateur retard (backshift) $B$". Math is universal.

## Golden rule
NEVER invent a result that is not in the sources (the lecture notes + the
`part*.tex` summaries + the exercise sheets). A faithful card backed by a source
is the only acceptable card. If a source point is ambiguous, still make the card
but begin the verso with `⚠️ à vérifier — ` and keep the statement conservative.

## Card object format (exact)
Each card is a JS object literal, written on the fragment file like this (note the
trailing comma; do NOT wrap them in an array or any assignment):

```
{cat: "<CAT>", recto: String.raw`<question>`, verso: String.raw`<answer>`, src: "<inventory ID(s)>"},
```

- `cat`: the fixed topic label given to you for this unit (e.g. "ARMA"). Use it verbatim for every card in your unit.
- `recto`: the question / statement to recall. For a **theorem/proposition/lemma**, the recto MUST contain ALL hypotheses (an omitted hypothesis is an error). Phrase as a prompt: "Énoncer…", "Définir…", "Donner la formule de…", "Quand … est-il causal ?", "Comment calculer …".
- `verso`: the COMPLETE result + how to use it: a short intuition, when/how to apply it, and a mini-example or a proof-sketch ("idée de preuve : …") when relevant.
- `src`: the inventory ID(s) it covers (e.g. "U06-T2") — comma-separated if several.

## One concept per card
Split compound theorems into several cards. No two cards share the same `recto`
(no duplicates).

## Markdown & math syntax (the app's renderer)
- **Bold** via `**...**` (becomes `<strong>`). Newlines become `<br>` — fine to use to separate lines, but see the $$ rule.
- Inline math: `$ ... $`. Display math: `$$ ... $$` and it MUST be on a SINGLE line — NEVER put a newline (or `\\`) inside a `$$...$$`. For a multi-step display, use several separate `$$...$$` (each on its own line) or write steps inline.
- Use ONLY KaTeX-supported commands (no packages, no exotic `\text`). `\text{...}` itself is fine.

## FORBIDDEN sequences inside any String.raw field
- No backtick `` ` `` (it would end the template literal).
- No `${` (String.raw STILL performs `${}` interpolation). A `$` must never be
  immediately followed by `{`. If a math segment must start with a brace, write
  `$ {...}$` with a space, or use `\{` for a literal set-brace (`\{` is safe).
- Do not write a literal `\u` followed by 4 hex chars unless intended (it's a unicode escape even in String.raw? No — String.raw preserves it; but avoid accidental `\u` sequences in prose: there are none in French/LaTeX here).

## Custom-macro expansion (the part*.tex use these; KaTeX does NOT know them — expand!)
| in part*.tex | write instead (KaTeX) |
|---|---|
| `\E` | `\mathbb{E}` |
| `\Var` | `\operatorname{Var}` |
| `\Cov` | `\operatorname{Cov}` |
| `\Corr` | `\operatorname{Corr}` |
| `\MSE` | `\operatorname{MSE}` |
| `\trace` | `\operatorname{tr}` |
| `\Reals` | `\mathbb{R}` |
| `\Ints` | `\mathbb{Z}` |
| `\Comp` | `\mathbb{C}` |
| `\Nat` | `\mathbb{N}` |
| `\Prob` | `\mathbb{P}` |
| `\Tr` (transpose) | `^{\top}` |
| `\Herm` | `^{H}` |
| `\conj{x}` | `\overline{x}` |
| `\abs{x}` | `\lvert x\rvert` |
| `\norm{x}` | `\lVert x\rVert` |
| `\ind` | `\mathbf{1}` |
| `\eps` | `\varepsilon` |
| `\diff` | `\nabla` |
| `\acvs` | `\gamma` |
| `\acf` | `\rho` |
| `\pacf` | `\alpha` |
| `\sdf` | `S` |
| `\filt` | `\mathcal{L}` |
| `\Bsh` | `B` |
| `\ms` | `\overset{\mathrm{ms}}{=}` |
| `\iid` | `\overset{\mathrm{iid}}{\sim}` |
| `\indep` | `\overset{\mathrm{ind}}{\sim}` |
| `\toprob` | `\xrightarrow{P}` |
| `\todist` | `\xrightarrow{d}` |

KaTeX-safe staples you can rely on: `\sum_{...}^{...}`, `\prod`, `\int`, `\frac`,
`\sqrt`, `\phi \theta \sigma \mu \tau \lambda \Phi \Theta \Gamma \nabla \pi`,
`\langle \rangle`, `\lvert \rvert \lVert \rVert \|`, `\le \ge \ne \approx \sim \pm
\mp \cdot \cdots \dots \in \notin \subset \to \mapsto \Rightarrow \Leftrightarrow`,
`\overline \widehat \widetilde \hat \tilde \bar`, `\mathbb \mathbf \mathcal \mathrm
\operatorname \text`, `e^{-2\pi i f\tau}`, `\delta_{\tau,0}`, `\xrightarrow{...}`,
`\overset \underset \stackrel`, `\begin{cases}...\end{cases}` (cases CAN use `\\`
and `&` because it is NOT a `$$` single-line issue — but keep the whole `$$...$$`
on one physical line in the file; `\\` inside `cases` is allowed and is not a
newline in the file).

## Inventory ID scheme (Phase 1)
Prefix every ID with the unit tag `U<NN>-` and a type letter:
`D` definition, `T` theorem, `P` proposition, `L` lemma, `C` corollary,
`F` formula/identity, `M` method/technique/proof-recipe, `H` key hypothesis/condition,
`X` counterexample, `K` pitfall (piège), `E` exercise-type scheme.
Example: `U06-T2`, `U06-F3`, `U06-M1`, `U06-K1`.
Each inventory entry: `- [U<NN>-?] one-line description — source (notes p./§ or sheet exN or part<NN> <box>)`.
