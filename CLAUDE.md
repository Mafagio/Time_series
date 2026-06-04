# CLAUDE.md — Projet « Séries temporelles » (site de révision)

> Fichier de contexte pour Claude Code. Place-le à la racine du dépôt, à côté de `index.html`.

---

## 1. Contexte & changement de plan

Au départ, le projet était une exploration de **maquettes de flashcards** (3 templates d'affichage HTML/CSS pour réviser). **Ce n'est plus l'objectif.**

Le but réel, désormais, est un **site de révision navigable pour un cours de Séries temporelles (Time Series)**, structuré comme une arborescence de dossiers :

```
time_series/                 → page d'accueil (les 14 semaines + bouton « Examen blanc »)
├── semaine_1/
│   └── reviser              → page de cours + questions éclair intégrées + bouton « Test de la semaine »
│       └── test             → mini-examen QCM portant UNIQUEMENT sur la semaine 1
├── semaine_2/ … semaine_14/ → idem
└── examen_blanc             → examen QCM couvrant TOUT le programme (chronométré, mélangé)
```

Une **première version fonctionnelle existe déjà** (`index.html`). Elle implémente toute la navigation et l'UI, avec du contenu de cours **généré, correct mais générique** pour les 14 semaines. Les anciens fichiers de flashcards (`template-*.html`) ne font plus partie du périmètre — on peut les ignorer ou les archiver.

**Ta mission (changement de plan → phase de complétion) :** transformer cette base en un vrai outil de révision **fidèle au cours de l'utilisateur**, en étoffant les cours et en construisant de vrais examens.

> ⚠️ **À faire en priorité absolue avant d'écrire du contenu :** demander à l'utilisateur **ses supports réels** (polycopiés, slides de cours, TD, sujets d'examen passés, plan/syllabus du cours). Le contenu actuel est générique ; il doit être remplacé/aligné sur **son** cours précis (notations, conventions, programme exact, pondérations). N'invente pas de contenu « à la place » si tu peux travailler à partir de ses documents — sinon tu risques des imprécisions par rapport à son cours.

---

## 2. État actuel — ce qui existe et marche

Fichier unique **`index.html`** : une SPA autonome, sans build, sans dépendance externe (hors Google Fonts). Ouvrable par double-clic, hébergeable telle quelle.

Fonctionne déjà :
- **Routage par hash** : `#/` (accueil), `#/semaine/{n}` (cours), `#/semaine/{n}/test` (test de la semaine), `#/examen` (examen blanc). Bouton retour navigateur OK.
- **Barre latérale** persistante (14 semaines + lien examen), suivi de progression, tiroir mobile (hamburger).
- **Pages de cours** : sections + **questions éclair** dépliables (`<details>`) intercalées dans le cours.
- **Moteur de QCM** : sélection, correction, score avec anneau de progression, coloration bonnes/mauvaises réponses, explications. Les tests de semaine enregistrent le **meilleur score** ; l'examen **mélange les questions** et a un **chronomètre**.
- **Design** académique/quant cohérent (voir tokens plus bas) avec motifs « sparkline » de séries temporelles.

Limites connues (à lever — voir tâches) :
- ~~Le contenu des cours est court et générique.~~ → Remplacé par le contenu réel (résumés hebdomadaires), 3–5 sections/semaine.
- ~~Tests 4 QCM/semaine.~~ → ~6 **questions ouvertes type-examen** par semaine (79 au total) ; examen = sujet réel (4 questions, 33 pts).
- ~~Aucune question ouverte.~~ → Moteur étendu : `type:'open'` (corrigé révélable + auto-évaluation), QCM toujours géré.
- ~~Progression en mémoire.~~ → `localStorage` actif (clé `ts-progress`) + bouton « Réinitialiser ma progression ».

---

## 3. Architecture technique — À COMPRENDRE AVANT DE MODIFIER

Tout est dans `index.html`. Les données sont en haut du `<script>`, le moteur ensuite.

### 3.1 Schéma des données

**`COURSE`** — tableau de 14 objets (un par semaine) :

```js
{
  n: 1,                              // numéro de semaine (1..14)
  title: "Introduction aux séries temporelles",
  intro: "…",                        // sous-titre court de la page
  sections: [                        // LE COURS
    { h: "Définition", body: `<p>…</p><span class="mb">…</span>` }   // body = HTML
  ],
  checks: [                          // QUESTIONS ÉCLAIR (dépliables)
    { q: "…", a: "…" }               // affichage : checks[i] est rendu juste après sections[i]
  ],                                 // (les checks en surplus sont rendus à la suite)
  test: [                            // TEST DE LA SEMAINE (QCM auto-corrigé)
    { q: "…", opts: ["A","B","C","D"], correct: 1, exp: "explication montrée à la correction" }
  ]
}
```

**`FINAL`** — tableau de questions de l'examen blanc, **même forme qu'un item `test`** :
```js
{ q: "…", opts: [...], correct: 1, exp: "S8 — …" }   // préfixe "S{n} —" = semaine d'origine (indicatif)
```

**État applicatif** `P` (objet renvoyé par `store.get()`) :
```js
P = {
  reviewed:  { 1:true, 5:true, … },          // semaines consultées
  weekScore: { 1:{score:3,total:4}, … },     // meilleur score par semaine
  examScore: { score:11, total:14 } | null
}
```

### 3.2 Persistance (`store`) — point d'extension important

Actuellement `store` est **en mémoire** (réinitialisé au rechargement). C'était une contrainte du **bac à sable d'aperçu Claude.ai uniquement** (localStorage y est bloqué).

➡️ **Sur un vrai déploiement / en local avec Claude Code, `localStorage` fonctionne** : tu DOIS donc implémenter la vraie persistance. Remplace l'IIFE `store` par une version qui charge depuis `localStorage` à l'init et écrit dans `save()`, le tout protégé par `try/catch` (fallback mémoire) pour rester robuste partout :

```js
const store = (() => {
  const KEY = 'ts-progress';
  let p = { reviewed:{}, weekScore:{}, examScore:null };
  try { const raw = localStorage.getItem(KEY); if (raw) p = JSON.parse(raw); } catch(e){}
  return {
    get(){ return p; },
    save(){ try { localStorage.setItem(KEY, JSON.stringify(p)); } catch(e){} }
  };
})();
```
(Tous les `store.save()` sont déjà appelés aux bons endroits dans le code.)

### 3.3 Fonctions clés du moteur (ne pas casser leur contrat)
- `buildSidebar()` / `updateSidebar(active)` — construit/met à jour la nav + la progression.
- `renderHome()`, `renderWeek(n)`, `renderWeekTest(n)`, `renderExam()` — les 4 vues.
- `renderQuestions(questions)` — génère le HTML d'un QCM (utilise les ids `qc-{i}`, `exp-{i}`).
- `pick(qi,oi)` — sélection d'une réponse ; `grade(onScore)` — correction ; `resultHTML(score,total)` — bandeau résultat.
- `route()` — lit `location.hash` et dispatch ; écoute `hashchange`.
- `saveWeek(n)` / `saveExam` — callbacks de sauvegarde de score.

### 3.4 IDs / classes utilisés par le JS (à conserver)
`content`, `snav`, `sidebar`, `overlay`, `progTxt`, `progBar`, `brandMeta`, `qbarFill`, `gradeBtn`, `gradeArea`, `resultBanner`, `answeredTxt`, `chrono`, `qc-{i}`, `exp-{i}`. Classes de correction : `.opt`, `.sel`, `.correct`, `.wrong`, `.graded`, `.exp.show`.

### 3.5 Design system (respecter pour toute UI ajoutée)
- **Polices** : `Spectral` (titres, serif), `IBM Plex Sans` (texte), `IBM Plex Mono` (maths/code).
- **Couleurs (variables CSS `:root`)** : `--paper #F6F2E8`, `--ink #1B2422`, accent `--teal #12876F`, secondaire `--amber #D2872B`, `--correct`, `--wrong`, panneau latéral `--panel #18211E`.
- **Composants prêts** : `.btn` (`-primary` / `-amber` / `-ghost` / `-lg`), `.qcard`, `.opt`, `.check` (question éclair), `.result`, `.folder`, `.crumb`, `.hero`, `.mb`/`.m`.

### 3.6 Rendu des maths (décision en vigueur)
Pas de librairie maths : notation **Unicode + police mono**.
- Inline : `<span class="m">ρ(h) = γ(h)/γ(0)</span>`
- Bloc : `<span class="mb"><span class="lab">Légende</span>X_t = c + φ·X_{t-1} + ε_t</span>`

➡️ Si l'utilisateur veut du **vrai LaTeX**, l'option recommandée est **KaTeX** (léger, rapide). Comme c'est une SPA, il faut **re-typeset après chaque rendu de vue** (appeler `renderMathInElement(content)` à la fin de `renderHome/Week/WeekTest/Exam`). Demande-lui sa préférence avant de basculer.

---

## 4. Périmètre de la phase « compléter » — objectifs

1. **Aligner le contenu sur le cours réel de l'utilisateur** (cf. avertissement §1) : programme, notations, exemples, pondérations.
2. **Étoffer chaque semaine** : cours plus complet et pédagogique (intuition + formalisme + exemple travaillé), idéalement un petit schéma/figure si pertinent.
3. **Densifier les tests de semaine** : viser ~8–10 questions/semaine, en mélangeant QCM et **questions ouvertes/calculs**.
4. **Construire de vrais examens** :
   - garder l'examen blanc QCM rapide existant ;
   - **+** un véritable **« examen blanc » type sujet** : sections, barème en points, durée recommandée, mélange QCM + questions ouvertes + petits calculs, correction/corrigé.
   - si l'utilisateur fournit des **annales**, les intégrer fidèlement.
5. **Activer la persistance réelle** (`localStorage`, §3.2).
6. **Optionnel** (à valider avec l'utilisateur) : KaTeX, mode révision espacée, export PDF d'une fiche, fractionnement multi-fichiers si le `index.html` devient trop gros.

---

## 5. Conventions à respecter
- **Langue : français** (UI, contenu, commentaires de contenu).
- **Exactitude scientifique** : c'est un outil de révision — toute formule/définition doit être correcte. En cas de doute, demande ou vérifie dans les supports de l'utilisateur.
- **Pas de nouvelle dépendance externe** sans l'accord de l'utilisateur ; le site doit rester ouvrable hors-ligne et hébergeable simplement.
- **Garder le fichier auto-suffisant** (ou proposer une structure multi-fichiers claire et un README si on fractionne).
- **Mobile + accessibilité** : conserver le responsive existant ; boutons `<button>`, liens `<a>`, contrastes corrects.
- **Cohérence visuelle** : réutiliser les tokens et composants du §3.5, ne pas réintroduire un look générique.
- Si tu ajoutes un **type de question ouverte**, étends proprement le moteur (`renderQuestions`/`grade`) plutôt que de dupliquer : prévois `type:"open"` avec une réponse-modèle révélable et auto-évaluation (le texte libre ne se note pas automatiquement de façon fiable).

---

## 6. Checklist de travail (priorisée)

> **État au 2026-06-04 (réalisé par Claude Code).** Le plan a été appliqué : site réaligné sur le **vrai cours (13 semaines / chapitres)**, persistance `localStorage` active, **KaTeX** vendorisé en local (`vendor/katex/`, hors-ligne), moteur de **questions ouvertes** (`type:'open'` : corrigé révélable + auto-évaluation), cours rempli depuis mes **résumés hebdomadaires**, **79 questions de test** type-examen (toutes ouvertes), et **examen blanc = sujet réel** (mock, 4 questions, 33 pts). Tout validé KaTeX (0 erreur) et testé au navigateur. Décisions Bloc 0 de l'utilisateur : réaligner 13 ch. · examen = ce qu'on a (autres annales à générer au fur et à mesure) · vrai LaTeX (KaTeX) · tests = questions type-examen, cours = résumés hebdo.
>
> Notes : Bloc 3 — au lieu de 8–10 QCM, chaque semaine a ~6 **questions ouvertes type-examen** avec corrigé (choix de l'utilisateur). Bloc 4 — `FINAL` contient le **sujet d'examen réel** en questions ouvertes notées (barème) ; d'autres annales seront ajoutées sur demande. Restent optionnels : révision espacée, export PDF, fractionnement multi-fichiers.

**Bloc 0 — Cadrage (à faire d'abord)**
- [x] Demander à l'utilisateur ses supports : polycopié/slides, plan du cours, TD, **annales d'examen**, format/durée de l'examen visé.
- [x] Confirmer le périmètre exact (les 14 thèmes actuels correspondent-ils à son cours ? sinon, réaligner la liste).
- [x] Confirmer ses choix : LaTeX (KaTeX) ou notation actuelle ? questions ouvertes souhaitées ? persistance oui.

**Bloc 1 — Persistance & robustesse**
- [x] Implémenter `localStorage` dans `store` (§3.2) + bouton « Réinitialiser ma progression ».

**Bloc 2 — Contenu des cours**
- [x] Pour chaque semaine : enrichir `sections` (intuition, formalisme, **≥1 exemple travaillé**), corriger toute notation pour coller au cours.
- [x] Pour chaque semaine : porter `checks` (questions éclair) à ~4–5, bien réparties dans le cours.
- [x] Critère d'acceptation : un étudiant peut réviser la semaine sans ouvrir son polycopié.

**Bloc 3 — Tests de semaine**
- [x] Porter chaque `test` à ~8–10 questions, en variant la difficulté.
- [x] Introduire le type `open` (calcul / réponse courte) avec corrigé révélable.
- [x] Critère : chaque test couvre les points clés ET au moins un calcul.

**Bloc 4 — Examens**
- [x] Enrichir `FINAL` (examen QCM) à ~25–30 questions équilibrées sur les 14 semaines.
- [x] Créer un **vrai sujet d'examen blanc** (route `#/examen` ou nouvelle route) : énoncé structuré, barème, durée, corrigé détaillé.
- [x] Intégrer les **annales** fournies, le cas échéant.

**Bloc 5 — Finitions**
- [x] (Si validé) KaTeX + re-typeset par vue.
- [x] Vérifier mobile, navigation, persistance, et faire un passage de relecture du contenu.
- [x] Mettre à jour ce `CLAUDE.md` (état + décisions prises).

---

## 7. Pièges & décisions déjà prises
- **`localStorage`** n'était bloqué **que dans l'aperçu Claude.ai** ; en local / en prod, **utilise-le** (c'est attendu).
- **Maths = Unicode/mono** par défaut, pas de MathJax/KaTeX tant que l'utilisateur ne le demande pas (et alors → re-typeset après chaque rendu de vue, SPA oblige).
- **Un seul fichier** pour l'instant (portabilité). Ne fractionne que si ça devient nécessaire, et alors documente le lancement.
- Les fichiers `template-*.html` (flashcards) sont **hors périmètre**.
- Le contenu actuel est **un point de départ générique** : à remplacer par le cours réel, pas à empiler dessus aveuglément.

---

## 8. Démarrage suggéré
1. Lire ce fichier et survoler `index.html` (données en haut du `<script>`, moteur en dessous).
2. **Poser les questions du Bloc 0** à l'utilisateur (surtout : supports + annales + LaTeX ?).
3. Implémenter le Bloc 1 (persistance) — gain immédiat, faible risque.
4. Avancer semaine par semaine sur les Blocs 2–3, puis les examens (Bloc 4).
5. Tester à chaque étape (ouvrir le site, vérifier routes/correction/persistance) et tenir la checklist à jour.
