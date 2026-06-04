# Séries Temporelles (MATH-342, EPFL) — dossier de révision

Organisation du dossier :

## 1_Sources_du_cours/
Le matériel de cours original : notes de cours (`lecture_notes-13 (1).pdf`),
séries d'exercices 1–13 (énoncés + corrigés), examen blanc + corrigé.
Sous-dossier `texte_extrait/` : le texte brut extrait des PDF (intermédiaire).

## 2_Resume_examen/
Le document de révision complet, compilé en LaTeX :
- **`Time_Series_Final_Exam_Preparation.pdf`** — version exhaustive (définitions,
  théorèmes avec idée de preuve + « pourquoi », techniques clés, exercices
  corrigés, stratégie d'examen, pièges).
- **`Time_Series_Essentials_Condensed.pdf`** — version courte (seulement
  définitions / théorèmes / propositions / lemmes / formules).
- `latex_src/` — les sources éditables. Recompiler :
  `cd 2_Resume_examen/latex_src && pdflatex main && pdflatex main`
  (et `pdflatex main_short` pour la version condensée).

## courses_latex/
Un PDF court (3–4 pages) par semaine de cours, **en anglais**, centré sur les
intuitions (`Week_01_Stationarity` … `Week_13_LTI-filters`), même style de boîtes.
Sources `.tex` + `weekpreamble.tex` à côté. Recompiler une semaine :
`cd courses_latex && pdflatex Week_07_Spectral-density.tex`.

## Examens_par_semaine/
Examens blancs **au format d'un vrai examen EPFL** (page de garde : en-tête cours/EPFL/prof,
champs Nom/SCIPER, tableau de points ; puis « Problem N (X points) » avec espace de réponse),
un par semaine, **en anglais**, **un exercice par page** (énoncé seul sur sa page + une page
blanche de réponse, comme un vrai sujet). Pour chaque semaine : `Exam_Week_0N.pdf` (sujet) +
`Exam_Week_0N_Solutions.pdf` (corrigé). ~60 min, 4 problèmes / 20 pts ; dès la semaine 2
l'examen révise aussi la semaine précédente. Disponible : **semaines 1 à 9** (les suivantes
sur demande). Les **PDF** sont dans ce dossier (vue nette) ; toutes les **sources `.tex`**
(+ `examstyle.tex`) sont dans le sous-dossier **`sources_tex/`**. Recompiler une semaine :
`cd Examens_par_semaine/sources_tex && pdflatex -output-directory=.. Exam_Week_06.tex`.

## index.html  (site de révision)
À la racine. SPA autonome qui **affiche directement tes PDF** : pour chaque semaine,
le **cours** = le PDF de `courses_latex/`, l'**examen** = le PDF de `Examens_par_semaine/`
(rendus proprement **via PDF.js** vendorisé dans `vendor/pdfjs/` — pages dessinées dans la
page, sans barre d'outils ni cadre). Sur la page d'examen : **dépose ta copie scannée** (enregistrée
localement), **« Voir le corrigé »** n'apparaît qu'à la fin, et tu enregistres une **note /6**.
Un **examen blanc** global ouvre le vrai `mock-exam.pdf`. Progression + notes /6 en
`localStorage`. À ouvrir de préférence via un petit serveur local ou GitHub Pages (les
iframes PDF en `file://` peuvent être bloquées selon le navigateur) :
`cd "Time Series Only" && python3 -m http.server` puis `http://localhost:8000/index.html`.
Pour une **correction IA d'une copie**, envoie le scan à Claude dans le chat.

## 4_Fiches_de_revision/
L'application de fiches (flashcards) autonome :
- **`fiches-revision.html`** — à ouvrir dans un navigateur (modes « Apprendre »
  et « Tester », rendu LaTeX via KaTeX, progression sauvegardée en localStorage).
- `deck-series-temporelles.js` — les 799 fiches (chargées par le HTML).
- `validate-deck.js` — vérification KaTeX. Lancer :
  `cd 4_Fiches_de_revision && node validate-deck.js deck-series-temporelles.js`.
- `COVERAGE.md` — l'audit de couverture (inventaire → fiches, 0 lacune).
- `deckparts/` — provenance (inventaire + fragments par chapitre + règles).
- `node_modules/`, `package*.json` — dépendance KaTeX pour la validation.
