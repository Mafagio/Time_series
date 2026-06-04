# Contrat — construction d'une semaine du site de révision (LIRE EN ENTIER)

Tu produis l'objet JavaScript d'UNE semaine pour une SPA de révision (cours MATH-342
Séries temporelles, EPFL, Prof. Olhede). Les maths sont rendues par **KaTeX**
(auto-render : `$...$` inline, `$$...$$` display).

## Règle d'or
Fidélité totale aux sources. N'invente aucun résultat. Le **cours** vient de mon
résumé hebdomadaire LaTeX (déjà concis, avec intuitions) ; les **questions de test**
sont de style examen et s'appuient sur la série d'exercices de la semaine (dont tu as
les corrigés complets) et sur le style de l'examen blanc. Si une source est ambiguë,
reste conservateur (commence le corrigé par « ⚠️ à vérifier — »).

## Forme EXACTE du fragment à écrire (un seul objet, virgule finale, AUCUN wrapper)
Écris-le dans le fichier indiqué. Forme :

```
{
  n: NN,
  title: String.raw`Titre de la semaine`,
  intro: String.raw`Une phrase d'accroche (la grande idée de la semaine).`,
  sections: [
    {h: String.raw`Titre de section`, body: String.raw`<p>…HTML + maths $...$…</p>`},
    … (3 à 5 sections)
  ],
  checks: [
    {q: String.raw`Question éclair ?`, a: String.raw`Réponse courte (peut contenir $...$).`},
    … (4 à 5 questions éclair)
  ],
  test: [
    {type:'open', q: String.raw`Énoncé type examen (avec TOUTES les hypothèses).`,
     answer: String.raw`<div class="step">Étape 1…</div><div class="step">Étape 2…</div>`, pts: 3},
    … (4 à 6 questions ouvertes)
  ]
},
```

## INTERDICTIONS (sinon le String.raw casse)
- Jamais de backtick `` ` `` dans un champ.
- Jamais la séquence `$` immédiatement suivie de `{` (écris `$\{` pour une accolade, ou
  mets une espace `$ {`). N'écris jamais `${`.

## Maths (KaTeX, pas de macros perso)
- Inline `$...$`, display `$$...$$` (garde chaque `$$...$$` sur UNE seule ligne logique).
- Utilise UNIQUEMENT des commandes KaTeX standard. Les `part*.tex` utilisent des macros
  perso : **développe-les** → `\E`→`\mathbb{E}`, `\Var`→`\operatorname{Var}`,
  `\Cov`→`\operatorname{Cov}`, `\Corr`→`\operatorname{Corr}`, `\acvs`→`\gamma`,
  `\acf`→`\rho`, `\pacf`→`\alpha`, `\eps`→`\varepsilon`, `\sdf`→`S`, `\Bsh`→`B`,
  `\diff`→`\nabla`, `\filt`→`\mathcal{L}`, `\Tr`→`^{\top}`, `\ind`→`\mathbf{1}`,
  `\Reals`→`\mathbb{R}`, `\Ints`→`\mathbb{Z}`, `\Comp`→`\mathbb{C}`, `\norm{x}`→`\lVert x\rVert`,
  `\abs{x}`→`\lvert x\rvert`. Matrices : `\begin{pmatrix}…\end{pmatrix}` (PAS `psmallmatrix`).

## HTML autorisé dans body / answer / a
`<p>…</p>`, `<ul><li>…</li></ul>`, `<strong>…</strong>`, `<em>…</em>`,
`<div class="step">…</div>` (une étape de calcul/preuve). Le **gras** se fait avec
`<strong>` (PAS `**`). Pas de classes maison autres que `step`.

## Contenu attendu
- **sections (cours)** : adapte mon résumé hebdo (Semaine_NN_*.tex) — reprends ses
  Définitions, Résultats/formules clés et surtout ses **Intuitions**, en 3 à 5 sections
  claires. Un étudiant doit pouvoir réviser la semaine sans ouvrir son polycopié. Concis
  mais complet (intuition + formalisme + au moins un résultat-clé avec sa formule).
- **checks (questions éclair)** : 4–5 Q/R courtes réparties sur les points clés/intuitions.
- **test (questions type examen)** : 4–6 questions OUVERTES sur le sujet de la semaine,
  dans le style de l'examen (énoncer un théorème avec ses hypothèses ; calculer une ACVS ;
  vérifier causalité/inversibilité par les racines ; dériver une représentation/prévision/
  densité spectrale ; etc.). Inspire-toi des exercices de la série (corrigés fournis).
  Le `answer` est le **corrigé complet, correct, étape par étape** (en `<div class="step">`).
  `pts` = petit entier (barème indicatif).

## Langue
Français. Garde le terme technique anglais du cours entre parenthèses à la 1re occurrence
(ex. « bruit blanc (white noise) », « densité spectrale (spectral density) »).

## Sortie
Écris UNIQUEMENT le fragment objet dans le fichier demandé, puis renvoie une ligne :
nb de sections / checks / questions de test.
