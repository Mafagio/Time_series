# COVERAGE.md — Audit de couverture des fiches de révision (Séries Temporelles)

Sources lues en entier : notes de cours (113 p., 13 ch.), séries 1–13 (énoncés+corrigés), examen blanc+corrigé. Source structurée intermédiaire : latex_src/part01–12.tex (vérifiés).

## Phase 3 — Tableau d audit : inventaire -> cartes

| Unité | Thème | Entrées d inventaire | Cartes | Couvertes | Lacunes |
|---|---|---|---|---|---|
| U01 | Stationnarité (Ch.1) | 72 | 67 | 72 | 0 |
| U02 | ARMA & PACF (Ch.2) | 81 | 69 | 81 | 0 |
| U03 | ARMA: racines & Wold (Ch.3) | 90 | 69 | 90 | 0 |
| U04 | Estimation YW/MCO (Ch.4) | 69 | 61 | 69 | 0 |
| U05 | SARIMA & différenciation (Ch.5) | 74 | 69 | 74 | 0 |
| U06 | Fourier & spectral (Ch.6-8) | 104 | 84 | 104 | 0 |
| U07 | Multivarié & VAR (Ch.9) | 78 | 70 | 78 | 0 |
| U08 | Prévision (Ch.10) | 70 | 53 | 70 | 0 |
| U09 | Diagnostics & longue mémoire (Ch.11) | 68 | 61 | 68 | 0 |
| U10 | ARCH/GARCH (Ch.12) | 66 | 55 | 66 | 0 |
| U11 | Filtres LTI (Ch.13) | 68 | 60 | 68 | 0 |
| U12 | Stratégie & pièges (synthèse + examen blanc) | 92 | 81 | 92 | 0 |
| **TOTAL** | — | **932** | **799** | **932** | **0** |

**Taux de couverture : 100.0%** (0 lacunes). Aucun `src` orphelin (toute carte renvoie à une entrée d inventaire existante). Validation KaTeX : 0 erreur, 0 carte vide, 0 doublon de recto sur 799 cartes.

## Cartes marquées ⚠️ à vérifier

- [U01-X4] (carte #50, Stationnarité) — recto : Donner l'exemple concret montrant que $\tilde\gamma_\tau$ peut produire une matrice de covariance **non p.s.d.
- [U03-X5] (carte #195, ARMA: racines & Wold) — recto : Décrire le contre-exemple **hypothétique d'un MA$(2)$ non inversible** (racine de modules $<1$).

> Ces cartes correspondent à des points de la source formulés de façon hypothétique/implicite ; le contenu est conservateur et signalé, jamais inventé.

## Passe de relecture « manque-t-il un résultat qu un bon examen exigerait ? »

Chaque unité a été inventoriée puis re-balayée par catégorie (définitions, théorèmes/propositions/lemmes/corollaires, formules nommées, méthodes/recettes de preuve, hypothèses cruciales, contre-exemples, pièges, schémas d exercices). Les résultats transverses (causalité/inversibilité par les racines, ACF/PACF, densité spectrale, prévision récursive) sont volontairement re-testés sous l angle « reconnaissance de question » dans l unité U12.

---

# Phase 1 — Inventaire détaillé par unité

## U01 — Stationnarité (Ch.1)

# U01 — Stationnarité — Coverage inventory

## Definitions (D)
- [U01-D1] Time series as both data recorded in time order and a stochastic process $\{X_t:t\in T\}$ on $(\Omega,\mathcal F,\mathbb P)$; index set $T$ a set of time points (default $T=\mathbb Z$, step $\Delta=1$) — notes p.5-6 §1.3 / part01 intro
- [U01-D2] Finite-dimensional distribution functions (f.d.d.) $F_{\mathbf t}(\mathbf x)=\Pr(X_{t_1}\le x_1,\dots,X_{t_n}\le x_n)$ — notes p.6 §1.3
- [U01-D3] Weak / second-order / covariance stationarity: 1st & 2nd joint moments exist, finite, shift-invariant — notes p.6 Def 1.1 / part01 Def wkstat
- [U01-D4] The three operational conditions of weak stationarity: (i) $\mathbb E[X_t]=\mu$, (ii) $\operatorname{Var}(X_t)=\sigma^2<\infty$, (iii) $\mathbb E[X_tX_{t+\tau}]=\mathbb E[X_sX_{s+\tau}]$ (covariance a function of lag $\tau$ only) — notes p.6-7 Def 1.1 / part01 Def wkstat
- [U01-D5] Strong / strict / complete stationarity: joint distribution of $(X_{t_1},\dots,X_{t_n})$ equals that of $(X_{t_1+\tau},\dots,X_{t_n+\tau})$ for all $n,\mathbf t,\tau$ — notes p.7 Def 1.2 / part01 Def ststat
- [U01-D6] Gaussian process: every finite collection $(X_{t_1},\dots,X_{t_n})$ is multivariate normal — notes p.7 Def 1.3 / part01 Def gauss:gp
- [U01-D7] Autocovariance sequence (ACVS): $\gamma_\tau=\operatorname{Cov}(X_0,X_\tau)=\operatorname{Cov}(X_t,X_{t+\tau})$, $\tau\in\mathbb Z$ — notes p.8 Def 1.4 / part01 Def acvs
- [U01-D8] Autocorrelation sequence / function (ACF): $\rho_\tau=\operatorname{Corr}(X_t,X_{t+\tau})=\gamma_\tau/\gamma_0$, with $\rho_0=1$, $\lvert\rho_\tau\rvert\le1$ — notes p.9 Def 1.6 / part01 Def acf
- [U01-D9] Moment-matching (unbiased) ACVS estimator $\tilde\gamma_\tau=\frac{1}{n-\lvert\tau\rvert}\sum_{t=1}^{n-\lvert\tau\rvert}(X_t-\bar X)(X_{t+\lvert\tau\rvert}-\bar X)$ — notes p.8 eq.(1.2) / part01 Def sampleacvs
- [U01-D10] Sample autocovariance (biased, p.s.d.) estimator $\hat\gamma_\tau=\frac{1}{n}\sum_{t=1}^{n-\lvert\tau\rvert}(X_t-\bar X)(X_{t+\lvert\tau\rvert}-\bar X)$ — notes p.8 Def 1.5 eq.(1.4) / part01 Def sampleacvs
- [U01-D11] Plug-in ACF estimator $\hat\rho_\tau=\hat\gamma_\tau/\hat\gamma_0$ — notes p.9 eq.(1.7) / part01 Def sampleacvs
- [U01-D12] Mean ergodicity: finite first two moments and $\bar X\xrightarrow{P}\mathbb E[X_t]$ as $n\to\infty$ — notes p.11 Def 1.7 / part01 Def ergodic
- [U01-D13] White noise: uncorrelated across $t$, mean zero, fixed variance $\sigma^2$ (ACVS $\gamma_\varepsilon(\tau)=\sigma^2\delta_\tau$) — sheet1 ex1.4 / notes (used in techniques)

## Theorems / Propositions / Lemmas / Corollaries (T/P/L/C)
- [U01-T1] Kolmogorov existence theorem: the f.d.d.'s define a stochastic process iff they are consistent ($\lim_{x_i\to\infty}F_{\mathbf t}(\mathbf x)=F_{\mathbf t(i)}(\mathbf x(i))$) — notes p.6 Thm 1.1 / part01 Thm kolmo
- [U01-P1] The ACVS is positive semi-definite: $\sum_{j=1}^n\sum_{k=1}^n a_ja_k\gamma_{j-k}\ge0$ — notes p.9 Thm 1.2 eq.(1.8) / part01 Prop psd
- [U01-P2] Immediate ACVS properties: $\gamma_0=\operatorname{Var}(X_t)\ge0$ and symmetry $\gamma_{-\tau}=\gamma_\tau$ — notes p.8 §1.4 / part01 Def acvs
- [U01-P3] Bias of the two estimators: $\mathbb E[\tilde\gamma_\tau]=\gamma_\tau$ (unbiased, known mean), $\mathbb E[\hat\gamma_\tau]=\frac{n-\lvert\tau\rvert}{n}\gamma_\tau$ (biased) — notes p.8 eqs.(1.3),(1.5) / part01 Def sampleacvs
- [U01-P4] Sample mean $\bar X$ is unbiased for $\mu$: $\mathbb E[\bar X]=\mu$ — notes p.10 / part01 Prop xbarvar
- [U01-P5] Variance of the sample mean: $\operatorname{Var}(\bar X)=\frac1{n^2}\sum_{i,j=1}^n\gamma_{j-i}=\frac1n\sum_{\tau=-(n-1)}^{n-1}(1-\tfrac{\lvert\tau\rvert}{n})\gamma_\tau$ — notes p.10-11 / part01 Prop xbarvar
- [U01-P6] Asymptotic limit $n\operatorname{Var}(\bar X)\to\sum_{\tau=-\infty}^{\infty}\gamma_\tau=C(\gamma)$ (via Cesàro) when $\sum_\tau\lvert\gamma_\tau\rvert<\infty$ — notes p.11 / part01 Prop xbarvar
- [U01-C1] Consistency of $\bar X$: if $\sum_\tau\lvert\gamma_\tau\rvert<\infty$ then $\operatorname{Var}(\bar X)\to0$, hence $\bar X\xrightarrow{P}\mu$ — notes p.11 / part01 Prop xbarvar
- [U01-L1] Cesàro summability theorem: if $\sum_{\tau}\gamma_\tau$ converges then $\sum_\tau\tfrac{n-\lvert\tau\rvert}{n}\gamma_\tau$ converges to the same limit — notes p.10 / part01 Prop xbarvar (proof idea)
- [U01-T2] For Gaussian processes, weak stationarity $\Leftrightarrow$ strict stationarity (characterised by first two moments) — notes p.7 §1.4 / part01 Def gauss:gp

## Formulas & Identities (F)
- [U01-F1] ACVS of a finite linear filter of white noise: $X_t=\sum_k\theta_k\varepsilon_{t-k}\Rightarrow\gamma_\tau=\sigma^2\sum_j\theta_j\theta_{j+\lvert\tau\rvert}$ — part01 keytech acvsfilter
- [U01-F2] White-noise ACVS: $\gamma_\varepsilon(\tau)=\sigma^2$ if $\tau=0$, else $0$ — sheet1 ex1.4
- [U01-F3] MA(1)/two-tap filter ACVS: $\gamma_0=(\theta_1^2+\theta_2^2)\sigma^2$, $\gamma_{\pm1}=\theta_1\theta_2\sigma^2$, else $0$ — part01 ex e8 / sheet1 ex1.5
- [U01-F4] Two-tap filter ACF and bound: $\rho_1=\dfrac{\theta_1\theta_2}{\theta_1^2+\theta_2^2}$, with $\lvert\rho_1\rvert\le\tfrac12$ (equality iff $\lvert\theta_1\rvert=\lvert\theta_2\rvert$) — part01 ex e8
- [U01-F5] Variance of $\hat\gamma_\tau$ (Gaussian white noise, $\tau\ne0$): $\operatorname{Var}(\hat\gamma_\tau)=\frac{n-\lvert\tau\rvert}{n^2}\sigma_X^4$ — sheet2 ex2.4 / part01 ex e6
- [U01-F6] Variance of $\tilde\gamma_\tau$ (Gaussian white noise, $\tau\ne0$): $\operatorname{Var}(\tilde\gamma_\tau)=\frac{1}{n-\lvert\tau\rvert}\sigma_X^4$ — sheet2 ex2.4 / part01 ex e6
- [U01-F7] General white-noise estimator-variance with $\tau=0$ doubling: $\operatorname{Var}(\hat\gamma_\tau)=\frac{1+\delta_\tau}{n^2}\sigma_X^4(n-\lvert\tau\rvert)$, $\operatorname{Var}(\tilde\gamma_\tau)=\frac{1+\delta_\tau}{n-\lvert\tau\rvert}\sigma_X^4$ — sheet2 ex2.4
- [U01-F8] Isserlis' theorem (4th Gaussian moment): $\mathbb E[X_1X_2X_3X_4]=\mathbb E[X_1X_2]\mathbb E[X_3X_4]+\mathbb E[X_1X_3]\mathbb E[X_2X_4]+\mathbb E[X_1X_4]\mathbb E[X_2X_3]$ — sheet2 ex2.4 hint
- [U01-F9] Relation $\hat\gamma_\tau=\frac{n-\lvert\tau\rvert}{n}\tilde\gamma_\tau$ between the two estimators — sheet2 ex2.5 / notes p.8
- [U01-F10] ACVS additivity for uncorrelated series: $\gamma^{X+Y}_\tau=\gamma^X_\tau+\gamma^Y_\tau$ — part01 ex e3 / sheet1 ex1.6
- [U01-F11] Signal-plus-independent-noise ACVS: $\gamma_Z(\tau)=\gamma_\tau+\sigma^2\mathbf 1_{\{\tau=0\}}$ (white-noise "nugget") — part01 ex e5 / sheet1 ex1.2
- [U01-F12] Cosine-pair process ACVS identity: $\gamma_\tau=\sigma_Y^2[\cos(ct)\cos(c(t+\tau))+\sin(ct)\sin(c(t+\tau))]=\sigma_Y^2\cos(c\tau)$ — part01 ex e2(3) / sheet1 ex1.3

## Methods / Techniques / Proof-recipes (M)
- [U01-M1] Recipe to prove/disprove weak stationarity: check (1) mean constant in $t$, (2) variance finite & $t$-free, (3) covariance shift-invariant; stop at first failure — part01 keytech checkstat
- [U01-M2] ACVS of a finite linear filter of white noise via bilinearity + $\operatorname{Cov}(\varepsilon_s,\varepsilon_u)=\sigma^2\mathbf 1_{\{s=u\}}$ (only coinciding noise indices survive) — part01 keytech acvsfilter
- [U01-M3] Variance-of-sample-mean recipe: expand double sum, collect by lag $\tau$, apply Cesàro summability — notes p.10-11 / part01 Prop xbarvar
- [U01-M4] Proof of p.s.d. ACVS via $W=\sum_j a_jX_j$ and $0\le\operatorname{Var}(W)=\sum_{j,k}a_ja_k\gamma_{j-k}$ — notes p.9-10 / part01 Prop psd
- [U01-M5] Using Isserlis' theorem to compute the variance/MSE of ACVS estimators (Gaussian case) — sheet2 ex2.4 / part01 ex e6
- [U01-M6] Convex-combination estimator $\bar\gamma_\tau^{(\alpha)}=\alpha\tilde\gamma_\tau+(1-\alpha)\hat\gamma_\tau$ and MSE-minimising choice $\alpha=C(\tau)/(C(\tau)-1)$, $C(\tau)=\frac{n-\lvert\tau\rvert}{n}$ — sheet2 ex2.5
- [U01-M7] Identifying the double lag-sum $\sum_{\lvert\tau\rvert<n}$ as a full $t_1,t_2$ square that factorises to $(\sum(x_t-\bar x))^2$ — part01 ex e7 / sheet2 ex2.6
- [U01-M8] Reading off candidate models from ACF/PACF shape (decay vs sharp cutoff) for WN / MA(q) / AR(p) / ARMA — sheet2 ex2.8

## Hypotheses / Conditions (H)
- [U01-H1] Summability $\sum_{\tau=-\infty}^{\infty}\lvert\gamma_\tau\rvert<\infty$ is the key condition for $\bar X$ consistency — notes p.10-11 / part01 Prop xbarvar
- [U01-H2] Consistency of f.d.d.'s is the necessary-and-sufficient hypothesis in Kolmogorov's theorem — notes p.6 Thm 1.1 / part01 Thm kolmo
- [U01-H3] $\hat\gamma_\tau$ is positive semi-definite while $\tilde\gamma_\tau$ need not be — that p.s.d. property is why $\hat\gamma_\tau$ is the default — notes p.8 / part01 Def sampleacvs
- [U01-H4] Finite first- and second-order moments are required even to define weak stationarity / ergodicity — notes p.6,11 / part01 Def wkstat, ergodic
- [U01-H5] Mutual uncorrelatedness/independence assumption that kills cross-covariances in sum-of-series results — sheet1 ex1.2,1.6,1.7 / part01 ex e3,e4,e5

## Counterexamples (X)
- [U01-X1] i.i.d. Student-$t$ (1 d.o.f. = Cauchy) is strictly stationary but NOT weakly stationary (no finite moments) — strict $\not\Rightarrow$ weak — notes p.7 / sheet1 ex1.1 / part01 ex e1, intuition
- [U01-X2] Weak $\not\Rightarrow$ strict in general (weak stationarity constrains only first two moments) — notes p.7 / part01 intuition
- [U01-X3] $X_t=Y_0\cos(ct)$ (single random coefficient): mean 0 but $\gamma_\tau=\sigma_Y^2\cos(ct)\cos(c(t+\tau))$ depends on $t$, so NOT stationary — notes p.7 sheet1 ex1.3(4) / part01 ex e2(4)
- [U01-X4] Concrete non-p.s.d. moment-matching estimator: $X_1=-1,X_2=0,X_3=-1$ gives a covariance matrix with a negative eigenvalue — notes p.8 footnote 1

## Pitfalls / Remarks (K)
- [U01-K1] Neither stationarity notion implies the other; the two coincide only for Gaussian processes — notes p.7 / part01 intuition
- [U01-K2] Ergodicity and stationarity are NOT equivalent — notes p.11 Def 1.7 / part01 Def ergodic
- [U01-K3] Unbiasedness is not the goal — low MSE is: biased $\hat\gamma_\tau$ beats unbiased $\tilde\gamma_\tau$ in MSE — part01 ex e6 / sheet2 ex2.4
- [U01-K4] A candidate sequence that is NOT positive semi-definite cannot be a valid ACVS (used to reject "fake" ACVS) — part01 Prop psd
- [U01-K5] Contrast (3) two random coefficients vs (4) one: a second random coefficient restores the stationarity that a single one destroys — part01 ex e2 / sheet1 ex1.3
- [U01-K6] No MA(1) can have $\lvert\rho_1\rvert>\tfrac12$ (sanity check on any claimed MA(1) ACF) — part01 ex e8
- [U01-K7] Strong positive correlation inflates $\operatorname{Var}(\bar X)$ (e.g. AR(1) with $\phi\to1$): dependence, not just $n$, controls estimation accuracy — notes p.11-12 / part01 Prop xbarvar
- [U01-K8] Adding white noise inflates only the variance ($\tau=0$ nugget), leaving every other lag unchanged — part01 ex e5 / sheet1 ex1.2
- [U01-K9] "There are many more ways to be dependent than to be independent": time series is built on second-order dependence structure — notes p.4-5 §1.2 / part01 intro
- [U01-K10] Practical reality: we observe finitely many points $S\subset T$ (usually $\{\Delta,\dots,n\Delta\}$) yet model an infinite-index process (justified by Kolmogorov) — notes p.5-6 §1.3

## Exercise-type schemes (E)
- [U01-E1] Classify a process as weakly/strongly stationary and give its mean & ACVS (e.g. $a+bY_t+cY_{t-1}$, $a+bY_0$, cosine pairs) — sheet1 ex1.3 / part01 ex e2
- [U01-E2] Decide weak stationarity of i.i.d. heavy-tailed (Cauchy) noise — sheet1 ex1.1 / part01 ex e1
- [U01-E3] ACVS of a sum/superposition of uncorrelated (orthogonal) stationary series — sheet1 ex1.6,1.7 / part01 ex e3,e4
- [U01-E4] ACVS of signal-plus-independent-noise $Z_t=X_t+\varepsilon_t$ — sheet1 ex1.2 / part01 ex e5
- [U01-E5] ACVS of a finite MA/two-tap white-noise filter and its ACF — sheet1 ex1.5 / part01 ex e8
- [U01-E6] Mean, variance and MSE of $\tilde\gamma_\tau$ vs $\hat\gamma_\tau$ (white noise & MA(1)) using Isserlis; decide which wins — sheet2 ex2.4 / part01 ex e6
- [U01-E7] Optimal $\alpha$ for the convex-combination estimator $\bar\gamma_\tau^{(\alpha)}$ and plot its MSE — sheet2 ex2.5
- [U01-E8] Prove $\sum_{\lvert\tau\rvert<n}\hat\gamma_\tau=0$ for any data — sheet2 ex2.6 / part01 ex e7
- [U01-E9] Identify candidate model (WN / MA(q) / AR(p) / ARMA / non-stationary) from time-series + ACF + PACF plots — sheet2 ex2.8
- [U01-E10] ACVS of a general two-sided linear filter sum $Y_t+Z_t$ with $Y_t=\sum_s g_{s-t}\varepsilon_s$, $Z_t=\sum_s h_{s-t}\varepsilon_s$ — sheet2 ex2.3

## U02 — ARMA & PACF (Ch.2)

# U02 — ARMA & PACF — Coverage Inventory

## Definitions (D)
- [U02-D1] White noise / purely random process: uncorrelated, mean-zero, finite-variance sequence; its ACVS and ACF — notes p.13 §2.1.1 Def 2.1, part02 def:p2-wn
- [U02-D2] White noise is automatically (weakly) stationary and is the building block of every ARMA model — notes p.13, part02 def:p2-wn
- [U02-D3] MA(q) process definition: $X_t=\mu-\sum_{j=0}^q\theta_j\eps_{t-j}$ with $\theta_0=-1$, $\theta_q\ne0$ — notes p.13 §2.1.2 Def 2.2, part02 def:p2-maq
- [U02-D4] MA(1) zero-mean one-sign convention $X_t=\eps_t-\theta\eps_{t-1}$ — notes p.14, part02 def:p2-maq
- [U02-D5] Moments of MA(q): mean $\mu$ and the cut-off ACVS formula (signature of $q$) — notes p.14 (2.2)-(2.3), part02 def:p2-mamom
- [U02-D6] AR(p) process definition: $X_t=\sum_{j=1}^p\phi_j X_{t-j}+\eps_t$, $\phi_p\ne0$ — notes p.14 §2.1.3 Def 2.3, part02 def:p2-arp
- [U02-D7] ARMA(p,q) process definition: $X_t=\sum\phi_j X_{t-j}-\sum\theta_k\eps_{t-k}$, $\theta_0=-1$ — notes p.16 §2.1.4 Def 2.4, part02 def:p2-arma
- [U02-D8] Backshift-operator form of ARMA: $\Phi(B)X_t=\Theta(B)\eps_t$ with $\Phi(z)=1-\sum\phi_j z^j$, $\Theta(z)=-\sum\theta_k z^k$ — part02 def:p2-arma
- [U02-D9] Causal ARMA(p,q): existence of $\{\psi_j\}$, $\sum|\psi_j|<\infty$, with $X_t=\sum_{j\ge0}\psi_j\eps_{t-j}$ ($\psi$-weights / MA($\infty$) rep) — notes p.17 Def 2.5, part02 def:p2-causal
- [U02-D10] A mean-zero MA(q) process is always causal — notes p.17, part02 def:p2-causal
- [U02-D11] Best linear predictor $P_{X_1,\dots,X_n}(Y)=\sum\beta_j X_j$ minimising MSE — notes p.18 Def 2.6, part02 def:p2-blp
- [U02-D12] Prediction (orthogonality) equations characterising the BLP: $\Cov(Y-P(Y),X_k)=0$ — part02 def:p2-blp
- [U02-D13] Partial correlation $\rho_{XY\bullet Z}=\Corr(X-P_Z(X),Y-P_Z(Y))$ — notes p.18 Def 2.7, part02 def:p2-partcorr
- [U02-D14] Gaussian case: $\rho_{XY\bullet Z}=\E[\Corr(X,Y\mid Z)]$ and a.s. equals $\Corr(X,Y\mid Z)$ — notes p.18, part02 def:p2-partcorr
- [U02-D15] PACF definition (residual-correlation form): $\alpha_\tau=\Corr(X_{t+\tau}-\hat X_{t+\tau},X_t-\hat X_t)$ with $\hat X$ predicted from intervening values — notes p.19 Def 2.8, part02 def:p2-pacf
- [U02-D16] PACF as last regression coefficient: $\alpha_\tau=\alpha_{\tau,\tau}$ in $P_{X_0,\dots,X_{\tau-1}}(X_\tau)=\sum\alpha_{\tau,j}X_{\tau-j}$; convention $\alpha_1=\rho_1$ — notes p.19 (2.11), part02 def:p2-pacf

## Theorems / Propositions / Lemmas / Corollaries (T/P/L/C)
- [U02-P1] Causal AR(1) expansion: $X_t=\sum_{k\ge0}\phi^k\eps_{t-k}$ ($\psi_k=\phi^k$, $\sum|\psi_k|=1/(1-|\phi|)$) for $|\phi|<1$ — notes p.15, part02 prop:p2-ar1
- [U02-P2] AR(1) moments: $\E[X_t]=0$, $\gamma_\tau=\sigma_\eps^2\phi^{|\tau|}/(1-\phi^2)$, $\rho_\tau=\phi^{|\tau|}$ — notes p.15 (2.5)-(2.6), part02 prop:p2-ar1
- [U02-P3] AR(1) ACF tails off (never exactly 0), motivating the PACF — notes p.17-18 §2.2.1, part02 prop:p2-ar1
- [U02-P4] ACF-PACF relation: for $k\le\tau$, $\rho_k=\sum_{j=1}^\tau\alpha_{\tau,j}\rho_{k-j}$ (Yule-Walker-type prediction equations) — notes p.19 (2.12), part02 prop:p2-acfpacf
- [U02-T1] Signature table — AR(p): ACF tails off, PACF cuts off after lag p — notes p.20 Table 2.1, part02 thm:p2-table
- [U02-T2] Signature table — MA(q): ACF cuts off after lag q, PACF tails off — notes p.20 Table 2.1, part02 thm:p2-table
- [U02-T3] Signature table — ARMA(p,q): both ACF and PACF tail off — notes p.20 Table 2.1, part02 thm:p2-table
- [U02-T4] Table valid only for causal AND invertible ARMA(p,q) — notes p.19-20, part02 thm:p2-table
- [U02-P5] PACF of an AR(p) vanishes beyond lag p: $\alpha_\tau=0$ for $\tau>p$ — notes p.21 Prop 2.1, part02 prop:p2-arpacf
- [U02-P6] Estimated PACF at lags $>p$ is asymptotically mean 0, variance $1/n$ (gives $\pm1.96/\sqrt n$ bands) — notes p.21 Prop 2.1, part02 prop:p2-arpacf
- [U02-P7] Non-identifiability of MA(1) from the ACVS: $X_t=\eps_t-\theta\eps_{t-1}$ and reciprocal twin $Y_t=\eta_t-\tfrac1\theta\eta_{t-1}$ share an ACVS — notes p.14, part02 prop:p2-maident

## Named formulas & identities (F)
- [U02-F1] White-noise second-order structure: $\gamma_\tau=\sigma^2\delta_{\tau,0}$, $\rho_\tau=\delta_{\tau,0}$ — notes p.13, part02 def:p2-wn
- [U02-F2] MA(q) ACVS: $\gamma_\tau=\sigma_\eps^2\sum_{j=0}^q\theta_j\theta_{j+|\tau|}$ for $|\tau|\le q$, else 0 — notes p.14 (2.3), part02 def:p2-mamom
- [U02-F3] MA(1) ACVS: $\gamma_0=\sigma_\eps^2(1+\theta^2)$, $\gamma_{\pm1}=-\sigma_\eps^2\theta$, else 0 — notes p.14, part02 def:p2-mamom
- [U02-F4] AR(1) ACVS / ACF closed form: $\gamma_\tau=\sigma_\eps^2\phi^{|\tau|}/(1-\phi^2)$, $\rho_\tau=\phi^{|\tau|}$ — notes p.15 (2.6), part02 prop:p2-ar1
- [U02-F5] AR(1) $\psi$-weights: $\psi_k=\phi^k$ via $\psi(z)=1/(1-\phi z)=\sum\phi^j z^j$ — notes p.15, part02 kt:p2-ktpsi
- [U02-F6] General ACVS from $\psi$-weights: $\gamma_\tau=\sigma_\eps^2\sum_{j\ge0}\psi_j\psi_{j+|\tau|}$ — part02 kt:p2-ktpsi
- [U02-F7] ARMA(1,1) $\psi$-weights: $\psi_0=1$, $\psi_j=(\phi+\vartheta)\phi^{j-1}$ for $j\ge1$ — part02 kt:p2-ktpsi
- [U02-F8] Durbin-Levinson recursion: $\alpha_{1,1}=\rho_1$; $\alpha_{\tau,\tau}=(\rho_\tau-\sum_{j=1}^{\tau-1}\alpha_{\tau-1,j}\rho_{\tau-j})/(1-\sum_{j=1}^{\tau-1}\alpha_{\tau-1,j}\rho_j)$ — notes p.20, part02 kt:p2-ktdl
- [U02-F9] Durbin-Levinson coefficient update: $\alpha_{\tau,j}=\alpha_{\tau-1,j}-\alpha_{\tau,\tau}\alpha_{\tau-1,\tau-j}$ — notes p.20, part02 kt:p2-ktdl
- [U02-F10] AR(2) Yule-Walker ACF: $\rho_1=\phi_1/(1-\phi_2)$, $\rho_2=\phi_1\rho_1+\phi_2$, recursion $\rho_\tau=\phi_1\rho_{\tau-1}+\phi_2\rho_{\tau-2}$ — part02 exo:p2-ar2yw
- [U02-F11] MA(2) ACVS: $\gamma_0=\sigma_\eps^2(1+\theta_1^2+\theta_2^2)$, $\gamma_{\pm1}=\sigma_\eps^2\theta_1(\theta_2-1)$, $\gamma_{\pm2}=-\sigma_\eps^2\theta_2$, else 0 — part02 exo:p2-ma2
- [U02-F12] Two ACVS estimators: $\tilde\gamma_\tau=\frac1{n-|\tau|}\sum(\cdot)$, $\hat\gamma_\tau=\frac1n\sum(\cdot)$ with $\hat\gamma_\tau=\frac{n-|\tau|}{n}\tilde\gamma_\tau$ — sheet ex2.4
- [U02-F13] AR($\infty$) representation of an invertible MA(1): $X_t=\eps_t-\sum_{j\ge1}\theta^j X_{t-j}$ — sheet ex2.2, part02 exo:p2-marewrite

## Methods / techniques / proof-recipes (M)
- [U02-M1] Computing the ACVS of an MA(q): bilinearity of Cov + $\Cov(\eps_s,\eps_u)=\sigma_\eps^2\mathbf 1_{s=u}$, keep matching indices ($k=j+\tau$) — notes p.14, part02 kt:p2-ktma
- [U02-M2] Checking causality/stationarity via roots of $\Phi(z)$ (all $|z|>1$); invertibility via roots of $\Theta(z)$ — part02 kt:p2-ktroots
- [U02-M3] AR(2) explicit stationarity-triangle conditions: $\phi_1+\phi_2<1$, $\phi_2-\phi_1<1$, $|\phi_2|<1$ — part02 kt:p2-ktroots, exo:p2-ar2yw
- [U02-M4] Deriving the MA($\infty$) $\psi$-weights by matching $\Phi(B)\psi(B)=\Theta(B)$ / expanding $\Theta(z)/\Phi(z)$ as a power series — part02 kt:p2-ktpsi
- [U02-M5] AR(1) "write as infinite MA then white-noise filter trick" to get ACVS (iterate recursion, remainder $\to0$ in m.s.) — notes p.15, part02 prop:p2-ar1
- [U02-M6] Durbin-Levinson recursion to extract the PACF $\alpha_{\tau,\tau}$ from the ACF (theoretical or sample) — notes p.20, part02 kt:p2-ktdl
- [U02-M7] Reading $(p,q)$ off ACF & PACF plots: confirm stationarity, then ACF-cut$\Rightarrow$MA(q), PACF-cut$\Rightarrow$AR(p), both tail$\Rightarrow$ARMA, neither significant$\Rightarrow$WN — notes p.21-23, part02 kt:p2-ktident
- [U02-M8] Proof recipe for PACF=0 beyond p: substitute AR(p) form into prediction equations, use $\Cov(\eps_\tau,X_k)=0$ by causality, invoke BLP uniqueness — sheet ex2.7, part02 prop:p2-arpacf
- [U02-M9] Proof recipe ACF-PACF relation: split $\gamma_k=\Cov(X_{\tau-k},\hat X_\tau)+\Cov(X_{\tau-k},X_\tau-\hat X_\tau)$, second term 0 by orthogonality — notes p.19, part02 prop:p2-acfpacf
- [U02-M10] One-step AR(1) forecast recipe: guess $\hat X_{n+1}=\phi X_n$, verify orthogonality via causality, MSE $=\sigma_\eps^2$ — part02 exo:p2-forecast
- [U02-M11] Isserlis' theorem for 4th Gaussian moments, used to compute variance of ACVS estimators — sheet ex2.4
- [U02-M12] Convex-combination ACVS estimator $\bar\gamma_\tau^{(\alpha)}=\alpha\tilde\gamma_\tau+(1-\alpha)\hat\gamma_\tau$ and MSE-minimising $\alpha=C(\tau)/(C(\tau)-1)$ — sheet ex2.5

## Crucial hypotheses / conditions (H)
- [U02-H1] MA stationarity needs only $|\theta_j|<\infty$ (no parameter constraint) — notes p.14, part02 def:p2-maq
- [U02-H2] AR/ARMA stationarity needs constraints on $\{\phi_j\}$: roots of $\Phi(z)$ outside the unit circle — notes p.15-16, part02 def:p2-arp, recallbox
- [U02-H3] AR(1) stationarity/causality $\iff |\phi|<1$ (root $z=1/\phi$ has $|z|>1$) — part02 recallbox
- [U02-H4] Invertibility condition: roots of $\Theta(z)$ outside the unit circle; picks the unique MA representation — notes p.14, part02 recallbox, prop:p2-maident
- [U02-H5] Causality used in proofs: $\Cov(X_t,\eps_s)=0$ for $t<s$ — sheet ex2.7, part02 exo:p2-arpacf-ex
- [U02-H6] Signature table requires causality AND invertibility — notes p.19-20, part02 thm:p2-table

## Counterexamples (X)
- [U02-X1] MA(1) and its reciprocal twin: distinct parametrisations with identical ACVS (non-identifiability) — notes p.14, part02 prop:p2-maident, exo:p2-maident-ex
- [U02-X2] AR(1) with $\rho_\tau=\phi^{|\tau|}\ne0$ shows correlation at lag 2 transmitted through $X_{t-1}$ even though direct dependence is only lag 1 (motivates PACF) — notes p.18 §2.2.1, part02 intuition
- [U02-X3] "Uncorrelated $\ne$ independent": white noise need not be i.i.d. nor Gaussian — part02 intuition (def:p2-wn)
- [U02-X4] Averaging consecutive values (MA) is not necessarily smoother than the original process — notes p.13

## Pitfalls / remarks (K)
- [U02-K1] Sign/convention trap: notes' MA/ARMA uses $-\sum\theta_j\eps_{t-j}$ with $\theta_0=-1$ vs simple examples $\eps_t-\theta\eps_{t-1}$; track convention before applying ACVS formula — part02 pitfall
- [U02-K2] "Roots outside the unit circle" is on $\Phi(z),\Theta(z)$ in $z$ (means $|\phi|<1$ for AR(1)); do NOT confuse with "roots inside" — part02 pitfall
- [U02-K3] Model identification from ACF/PACF is not unique; ACF/PACF are sanity checks, not proofs — give a defensible argument — notes p.22-23, sheet ex2.8, part02 kt:p2-ktident
- [U02-K4] Slowly/almost-linearly decaying ACF signals non-stationarity — difference first — part02 kt:p2-ktident, sheet ex2.8 (model 5)
- [U02-K5] $\alpha_{\tau,\tau}$ at the cut equals the AR coefficient (e.g. $\alpha_{2,2}=\phi_2$) — notes p.21, part02 exo:p2-dl
- [U02-K6] No closed-form ACVS for general AR/ARMA (computable but not "nice") — notes p.15-16, part02 def:p2-arp, def:p2-arma

## Exercise-type schemes (E)
- [U02-E1] Justify $\theta_0=-1$ via rescaling: show alternate parametrisation has same ACVS (identifiability) — sheet ex2.1, part02 exo:p2-theta0
- [U02-E2] Rewrite MA(1) recursively as $X_t=\eps_t-\sum_{j=1}^p\theta^j X_{t-j}-\theta^{p+1}\eps_{t-p-1}$ (toward AR($\infty$)) — sheet ex2.2, part02 exo:p2-marewrite
- [U02-E3] First/second moments of a sum of two finite-window filtered noises $X_t=Y_t+Z_t$ — sheet ex2.3, part02 exo:p2-sumfilter
- [U02-E4] Mean/variance/MSE of the two ACVS estimators $\hat\gamma,\tilde\gamma$ (WN and MA(1) cases) via Isserlis — sheet ex2.4
- [U02-E5] MSE of convex-combination estimator $\bar\gamma^{(\alpha)}$; find best $\alpha$ (numerical/plot for $n=10,\tau=1$) — sheet ex2.5
- [U02-E6] Show $\sum_{|\tau|<n}\hat\gamma_\tau=0$ for any series (sample ACVS sums to zero) — sheet ex2.6
- [U02-E7] Prove PACF of causal AR(p) is 0 for $\tau>p$ via prediction equations — sheet ex2.7, part02 exo:p2-arpacf-ex
- [U02-E8] Identify model (WN/MA/AR/ARMA) from 6 sample ACF & PACF plots with reasoning — sheet ex2.8, part02 exo:p2-ident
- [U02-E9] Durbin-Levinson worked example: given $\rho_1=2/5,\rho_2=-1/20,\rho_3=-1/8$ find $\alpha_1,\alpha_2,\alpha_3$, identify AR(2) — notes p.21, part02 exo:p2-dl
- [U02-E10] MA(1) reciprocal-twin: compute both ACVSs, show coincide, identify invertible one — part02 exo:p2-maident-ex
- [U02-E11] ACVS and ACF of an MA(2); verify cut-off for $|\tau|\ge3$ — part02 exo:p2-ma2
- [U02-E12] AR(2) causality region + ACF via Yule-Walker for $\phi_1=1/2,\phi_2=-1/4$; predict PACF pattern — part02 exo:p2-ar2yw
- [U02-E13] One-step recursive forecast for AR(1): BLP $=\phi X_n$, MSE $=\sigma_\eps^2$ — part02 exo:p2-forecast

## U03 — ARMA: racines & Wold (Ch.3)

# U03 — ARMA: racines & Wold — Coverage Inventory

## Definitions (D)
- [U03-D1] Backshift operator $B$: $B[\{X_t\}]=\{X_{t-1}\}$, informally $BX_t=X_{t-1}$, $B^kX_t=X_{t-k}$, $B^0=I$ — part03 def p3-backshift; notes p.24 Def 3.1
- [U03-D2] Linearity & commutativity of $B$: polynomials in $B$ multiply/reorder like ordinary polynomials — part03 def p3-backshift; notes p.24
- [U03-D3] ARMA polynomial notation: $\Phi(B)X_t=\Theta(B)\eps_t$ with $\Phi(z)=\sum_{j=0}^p\phi_jz^j$, $\Theta(z)=\sum_{k=0}^q\theta_kz^k$, $\phi_0=-1,\theta_0=-1$ — part03 def p3-armapoly; notes p.24-25 (3.6)-(3.8)
- [U03-D4] Pure-case operator forms: AR$(p)$ is $\Phi(B)X_t=\eps_t$; MA$(q)$ is $X_t=\Theta(B)\eps_t$ — part03 def p3-armapoly; notes p.25 (3.2)-(3.4)
- [U03-D5] Characteristic polynomial of the AR part = $\Phi(z)$; of the MA part = $\Theta(z)$ — part03 def p3-charpoly; notes p.28 Def 3.3
- [U03-D6] Two-sided linear process $X_t=\sum_{k=-\infty}^{\infty}g_k\eps_{t-k}$ with $\|g\|_2^2<\infty$ — part03 def p3-twosided; notes p.25 (3.9)
- [U03-D7] General (one-sided) linear process $X_t=\sum_{k=0}^{\infty}g_k\eps_{t-k}$, $\|g\|_2^2<\infty$; depends only on past/present (causal), $g_0=1$ — part03 def p3-genlin; notes p.26 Def 3.2 (3.13)
- [U03-D8] Operator form $X_t=G(B)\eps_t$ with $G(z)=\sum_{k\ge0}g_kz^k$ (transfer function) — part03 def p3-genlin/p3-transfer; notes p.26
- [U03-D9] Transfer function $G(z)$ as rational ratio $G_1(z)/G_2(z)$; zeros = roots of $G_1$, poles = roots of $G_2$ — part03 def p3-transfer; notes p.26
- [U03-D10] For ARMA: $G(z)=\Theta(z)/\Phi(z)$; roots of $\Phi$ = poles of $G$, roots of $\Theta$ = zeros of $G$ — part03 def p3-transfer; notes p.26-27
- [U03-D11] Innovations outlier: an $\eps_t$ that affects $X_t$ and all subsequent $X_{t+1},X_{t+2},\dots$ (forward propagation in MA$(\infty)$) — part03 def p3-innov; notes p.27
- [U03-D12] Causality (linear sense): $X_t$ depends only on past and present innovations $\eps_t,\eps_{t-1},\dots$ — part03 def p3-genlin; notes p.26
- [U03-D13] Invertibility: $X_t=G(B)\eps_t$ rewritable as AR$(\infty)$, $G^{-1}(B)X_t=\eps_t$ — part03 prop p3-invert; notes p.27

## Theorems / Propositions / Lemmas / Corollaries (T/P/L/C)
- [U03-T1] Wold decomposition theorem: any zero-mean second-order stationary $\{X_t\}$ = $U_t+V_t$, $U_t\perp V_t$ — part03 thm p3-wold; notes p.26 Thm 3.1
- [U03-T2] Wold — $U_t$ has one-sided MA$(\infty)$ rep $\sum_{k\ge0}g_k\eps_{t-k}$, $g_0=1$, $\|g\|_2^2<\infty$, $\eps_t$ WN with $\E[\eps_sV_t]=0$ — part03 thm p3-wold; notes p.26
- [U03-T3] Wold — the sequences $\{g_k\}$ and $\{\eps_t\}$ are uniquely determined — part03 thm p3-wold; notes p.26
- [U03-T4] Wold — $V_t$ is singular (deterministic): predictable from its own past with zero error — part03 thm p3-wold; notes p.26
- [U03-T5] Wold proof idea: project $X_t$ onto closed linear span of own past; residual innovations = $\eps_t$, $g_k$ = projection coeffs, $V_t$ = infinite-past intersection — part03 thm p3-wold
- [U03-P1] Laurent-expansion partial-fraction of $1/G_2(B)\eps_t$ splitting into "future" (inside roots) and "past+present" (outside roots) sums — part03 prop p3-laurent; notes p.26-27
- [U03-P2] Past/present criterion: all roots of $G_2(z)$ outside unit circle ($k=0$) $\Rightarrow$ only past/present appear, general linear process exists — part03 prop p3-laurent; notes p.27
- [U03-P3] Equivalent analytic statement: $|G(z)|<\infty$ for $|z|\le1$, i.e. $G$ analytic inside and on the unit circle — part03 prop p3-laurent; notes p.27
- [U03-P4] Stationarity of general linear process: $X_t=\sum_{k\ge0}g_k\eps_{t-k}$, $\|g\|_2^2<\infty$ is second-order stationary, $\E[X_t]=0$, $\gamma_\tau=\sigma^2\sum_k g_kg_{k+|\tau|}$ — part03 prop p3-glpstat; notes p.25-26 (3.10)-(3.12)
- [U03-P5] AR$(p)$ stationarity (causality): unique causal solution $X_t=\Phi^{-1}(B)\eps_t$; AR$(p)$ stationary $\iff$ all roots of $\Phi(z)$ have $|z|>1$ — part03 prop p3-arstat; notes p.27
- [U03-P6] AR$(p)$ is always invertible ($\eps_t$ = finite polynomial in $X$, $\Theta\equiv1$) — part03 prop p3-alwaysinv; notes p.27-28
- [U03-P7] MA$(q)$ is always stationary ($G(z)=\Theta(z)$ finite polynomial, bounded everywhere) — part03 prop p3-alwaysinv; notes p.27-28
- [U03-P8] Invertibility via $G^{-1}$: invertible $\iff$ $G^{-1}$ analytic on $|z|\le1$ $\iff$ all poles of $G^{-1}$ outside $\iff$ all zeros of $G$ inside unit circle — part03 prop p3-invert; notes p.27
- [U03-P9] MA$(q)$ root test: invertible $\iff$ all roots of $\Theta(z)$ have $|z|>1$ — part03 prop p3-invert; notes p.28
- [U03-C1] ARMA stationarity/invertibility summary table (AR/MA/ARMA, the two independent root tests) — part03 cor p3-summary; notes p.28
- [U03-P10] Causal AR$(p)$ has PACF $\alpha_\tau=0$ for all $\tau>p$ (cut-off after lag $p$) — part03 prop p3-pacfcut; Sheet 2 Ex 2.7
- [U03-P11] PACF cut-off proof: AR coeffs $\tilde\phi_j$ ($=\phi_j,j\le p$; $=0,j>p$) solve prediction equations since residual $=\eps_\tau$ and $\Cov(\eps_\tau,X_k)=0$ for $k<\tau$ — part03 prop p3-pacfcut; Sheet 2 Ex 2.7
- [U03-P12] Diagnostic mirror: PACF cuts off after lag $p$ for AR$(p)$, ACF cuts off after lag $q$ for MA$(q)$ — part03 prop p3-pacfcut; Sheet 2 Ex 2.8

## Named formulas & identities (F)
- [U03-F1] $\Phi(z)=\sum_{j=0}^p\phi_jz^j$ and $\Theta(z)=\sum_{k=0}^q\theta_kz^k$ — part03 def p3-armapoly; notes p.25 (3.5),(3.7),(3.8)
- [U03-F2] Two-sided linear process moments: $\E[X_t]=0$, $\Var(X_t)=\sigma^2\|g\|_2^2$, $\Cov(X_t,X_{t+\tau})=\sigma^2\sum_k g_kg_{k+\tau}$ — part03 def p3-twosided; notes p.25-26 (3.10)-(3.12)
- [U03-F3] ACVS of causal linear process: $\gamma_\tau=\sigma^2\sum_{k\ge0}\psi_k\psi_{k+|\tau|}$ — part03 prop p3-glpstat
- [U03-F4] Laurent split formula $\frac{1}{G_2(B)}\eps_t=\sum_{j=1}^k A_j\sum_l z_j^l\eps_{t+1+l}-\sum_{j=k+1}^p A_j\sum_l z_j^{-(l+1)}\eps_{t-l}$ — part03 prop p3-laurent; notes p.27
- [U03-F5] $\psi$-weight recurrence: $\psi_j=\theta_j^\star+\sum_{i=1}^p\phi_i\psi_{j-i}$, $\psi_0=1$, $\psi_j=0$ ($j<0$) from $\Phi(z)\sum\psi_jz^j=\Theta(z)$ — part03 keytech p3-recur
- [U03-F6] AR$(1)$ MA$(\infty)$: $X_t=\sum_{k\ge0}\phi^k\eps_{t-k}$ (causal, $|\phi|<1$) — part03 ex p3-e32; Sheet 3 Ex 3.2
- [U03-F7] AR$(2)$ MA$(\infty)$: $\psi_n=\sum_{k=0}^n g_1^k g_2^{n-k}=\frac{g_1^{n+1}-g_2^{n+1}}{g_1-g_2}$ ($g_1\ne g_2$) via Cauchy product — part03 ex p3-e32; Sheet 3 Ex 3.2
- [U03-F8] AR$(2)$ reciprocal roots: $g_{1,2}^{-1}=\frac{-\phi_1\mp\sqrt{\phi_1^2+4\phi_2}}{2\phi_2}$; repeated root $g$: $\psi_n=(n+1)g^n$ — part03 ex p3-e32; Sheet 3 Ex 3.2
- [U03-F9] ARMA$(1,1)$ closed-form $\psi$-weights: $\psi_0=1$, $\psi_j=(\phi+\theta)\phi^{j-1}$ for $j\ge1$ — part03 ex p3-newarma11
- [U03-F10] ARMA$(1,1)$ variance $\gamma_0=\sigma^2\frac{1+\theta^2-2\phi\theta}{1-\phi^2}$ — part03 ex p3-newsdf
- [U03-F11] ARMA spectral density $S(f)=\sigma^2\frac{|\Theta(e^{-2\pi if})|^2}{|\Phi(e^{-2\pi if})|^2}$, $-\tfrac12\le f\le\tfrac12$ — part03 keytech p3-sdf; ex p3-newsdf
- [U03-F12] MA$(1)$ spectral density $S(f)=\sigma^2(1+\theta^2-2\theta\cos(2\pi f))$ with $\gamma_0=\sigma^2(1+\theta^2)$, $\gamma_1=-\theta\sigma^2$ — part03 keytech p3-sdf
- [U03-F13] AR$(2)$ stationarity triangle: $|\phi_2|<1$, $\phi_2+\phi_1<1$, $\phi_2-\phi_1<1$ — part03 keytech p3-roottest
- [U03-F14] Reciprocal-root relation: root $z=1/\phi$ of $1-\phi z$; "roots $|z|>1$" $\iff$ reciprocal roots $|g|<1$ $\iff$ AR$(1)$ $|\phi|<1$ — part03 pitfall; keytech p3-roottest
- [U03-F15] ACVS inversion check $\int_{-1/2}^{1/2}S(f)e^{2\pi if\tau}df=\gamma_\tau$ (and $\gamma_0=\int S$) — part03 keytech p3-sdf

## Methods / techniques / proof-recipes (M)
- [U03-M1] Root test for stationarity/invertibility: write $\Phi,\Theta$ in $z$, solve $=0$, check every root $|z|>1$ (AR/ARMA stat.; MA/ARMA invert.) — part03 keytech p3-roottest
- [U03-M2] Quadratic root + modulus: $z=\frac{-b\pm\sqrt{b^2-4ac}}{2a}$, $|z|=\sqrt{(\mathrm{Re}\,z)^2+(\mathrm{Im}\,z)^2}$ — part03 keytech p3-roottest; Sheet 3 Ex 3.3-3.4
- [U03-M3] $\psi$-weights by coefficient matching / recurrence: equate $\Phi(z)\sum\psi_jz^j=\Theta(z)$, match powers, solve forward — part03 keytech p3-recur
- [U03-M4] $\psi$-weights by partial fractions: factor $\Phi$, partial-fraction $\Theta/\Phi$, expand each $\frac{A_i}{z-r_i}$ as geometric series (valid $|z|<|r_i|$), collect $z^j$ — part03 keytech p3-partialfrac; Sheet 3 Ex 3.1
- [U03-M5] Closed form of $\psi_j$ from AR roots: $\sum_i(\text{poly in }j)r_i^{-j}$; repeated root gives $(c_0+c_1j)r^{-j}$ — part03 keytech p3-recur
- [U03-M6] ACVS of causal ARMA via difference equation: multiply by $X_{t-\tau}$, take $\E$; $\tau>q$ gives homogeneous recurrence (char. eq. $\Phi$); $\tau=0,\dots,q$ give initial conditions via $\E[\eps_{t-k}X_{t-\tau}]=\sigma^2\psi_{k-\tau}$ — part03 keytech p3-acvsdiff; notes p.28
- [U03-M7] Fit general homogeneous solution $\gamma_\tau=\sum_i(\text{poly})r_i^{-\tau}$ to initial conditions (double root $\Rightarrow(\beta_0+\beta_1\tau)2^{-\tau}$) — part03 keytech p3-acvsdiff; ex p3-arma22ex; notes p.28
- [U03-M8] Spectral density of ARMA from polynomials: plug $z=e^{-2\pi if}$ into $\sigma^2|\Theta|^2/|\Phi|^2$ — part03 keytech p3-sdf
- [U03-M9] Cauchy product to combine double geometric series into single MA$(\infty)$ ($n=k_1+k_2$) — part03 ex p3-e32; Sheet 3 Ex 3.2
- [U03-M10] Inverting a non-invertible MA using future values: $\eps_t=-\sum_{j\ge1}(0.4)^jX_{t+j}$ (future-noise branch of Laurent) — part03 ex p3-e35; Sheet 3 Ex 3.5(c)
- [U03-M11] Cross-check $\psi$-weight closed form against the forward recurrence numerically — part03 ex p3-e31, p3-arma22ex

## Crucial hypotheses / conditions (H)
- [U03-H1] Square-summability $\|g\|_2^2=\sum g_k^2<\infty$ makes moments finite $\Rightarrow$ (second-order) stationarity — part03 def p3-twosided/p3-genlin; notes p.25-26
- [U03-H2] $\{\eps_t\}$ mean-zero white noise, $\Var(\eps_t)=\sigma^2$, $\Cov(\eps_s,\eps_u)=\sigma^2\mathbf{1}_{\{s=u\}}$ — part03 intro/prop p3-glpstat
- [U03-H3] Roots of $\Phi$ outside unit circle $\iff$ causal/stationary AR/ARMA — part03 prop p3-arstat, cor p3-summary; notes p.28
- [U03-H4] Roots of $\Theta$ outside unit circle $\iff$ invertible MA/ARMA — part03 prop p3-invert, cor p3-summary; notes p.28
- [U03-H5] Causality fact for PACF proof: $\Cov(X_t,\eps_s)=0$ when $t<s$ — part03 prop p3-pacfcut; Sheet 2 Ex 2.7 hint
- [U03-H6] Prediction (orthogonality) equations: $\Cov(Y-P_{X_1,\dots,X_n}(Y),X_k)=0$ for all $k$ — part03 prop p3-pacfcut; Sheet 2 Ex 2.7 hint
- [U03-H7] Convention $\theta_0=-1$ ($\phi_0=-1$) for identifiability (MA non-uniqueness without it) — notes p.24; Sheet 2 Ex 2.1
- [U03-H8] Spectral formula requires causal AND invertible ARMA — part03 keytech p3-sdf
- [U03-H9] Geometric-series expansion of $A_i/(z-r_i)$ valid because $|r_i|>1$ (converges on/inside unit disk, decaying $\psi_j$) — part03 keytech p3-partialfrac

## Counterexamples (X)
- [U03-X1] Non-invertible MA: $W_t=(1-2.5B)U_t$ has root $z=0.4$ inside circle — non-invertible though stationary — part03 ex p3-e35; Sheet 3 Ex 3.5
- [U03-X2] Same-ACF pair: $X_t=(1-0.4B)U_t$ and $W_t=(1-2.5B)U_t$ share identical ACF (MA non-uniqueness; reciprocal roots $0.4$ vs $2.5$) — part03 ex p3-e35; Sheet 3 Ex 3.5(b)
- [U03-X3] ARMA$(2,1)$ stationary but NOT invertible: $\Theta(z)=1+z$ has root $z=-1$ on the circle — part03 ex p3-arma22ex; notes p.28
- [U03-X4] MA$(1)$ identifiability counterexample: rescaling $\theta_0\to c\theta_0$ gives a distinct parametrization with same autocorrelation — Sheet 2 Ex 2.1
- [U03-X5] Hypothetical non-invertible MA$(2)$: had a root with $|z|<1$, process non-invertible despite stationarity — part03 ex p3-newma2

## Pitfalls / remarks (K)
- [U03-K1] "Roots outside" means $|z|>1$ for roots of $\Phi(z)=\sum\phi_jz^j$; don't check inside; don't confuse with reciprocal-root convention $|g|<1$ — part03 pitfall
- [U03-K2] Never test an AR for invertibility nor an MA for stationarity — they are automatic — part03 prop p3-alwaysinv, intuition
- [U03-K3] Stationarity and invertibility are the SAME root test on TWO different polynomials ($\Phi$ vs $\Theta$) — part03 intuition p3-invert
- [U03-K4] A non-invertible representation can still be "inverted" using future data (future-noise branch) — part03 ex p3-e35(c); notes p.27
- [U03-K5] For the processes studied $V_t=0$, leaving pure MA$(\infty)$ $X_t=G(B)\eps_t$; only new info at $t$ is innovation $\eps_t$ — part03 intuition p3-wold
- [U03-K6] $B$ as algebraic symbol $z$ is what enables factoring/inverting/expanding model equations — part03 intuition p3-backshift
- [U03-K7] AR$(p)$ has $\Phi$ finite but $\Phi^{-1}$ infinite order; MA $\Theta^{-1}$ infinite order — that asymmetry drives the always-stat/always-invert facts — notes p.27
- [U03-K8] Model selection from ACF/PACF shapes is not trivial; multiple models can fit (sanity-check tool only) — Sheet 2 Ex 2.8

## Exercise-type schemes (E)
- [U03-E1] Find $\psi_j$ ($j\ge0$) of an ARMA via partial fractions, e.g. $(1-0.5B+0.04B^2)X_t=(1+0.25B)\eps_t$ — part03 ex p3-e31; Sheet 3 Ex 3.1
- [U03-E2] Derive MA$(\infty)$ representation of a stationary causal AR$(1)$ and AR$(2)$ — part03 ex p3-e32; Sheet 3 Ex 3.2
- [U03-E3] Write characteristic AR polynomial of an AR$(2)$ and test stationarity/invertibility via roots — part03 ex p3-e33; Sheet 3 Ex 3.3
- [U03-E4] Test an ARMA$(2,1)$ for stationarity AND invertibility (both root tests) — part03 ex p3-e34; Sheet 3 Ex 3.4
- [U03-E5] Show two MA filters give the same ACF and invert a non-invertible MA via future values — part03 ex p3-e35; Sheet 3 Ex 3.5
- [U03-E6] Compute ACVS $\gamma_\tau$ of a causal ARMA$(2,1)$ via the difference-equation recurrence (worked lecture example) — part03 ex p3-arma22ex; notes p.28
- [U03-E7] Prove PACF cut-off $\alpha_\tau=0$ for $\tau>p$ for a causal AR$(p)$ using prediction equations — part03 ex p3-pacfex; Sheet 2 Ex 2.7
- [U03-E8] Full ARMA$(1,1)$ workup: stationarity, invertibility, $\psi$-weights, $\gamma_0,\gamma_1$ — part03 ex p3-newarma11
- [U03-E9] MA$(2)$ invertibility via quadratic roots + reciprocal-root cross-check — part03 ex p3-newma2
- [U03-E10] Spectral density of an ARMA$(1,1)$ and using it to confirm $\gamma_0$ — part03 ex p3-newsdf
- [U03-E11] Identify candidate models (WN / MA$(q)$ / AR$(p)$ / ARMA$(p,q)$) from ACF/PACF shapes — Sheet 2 Ex 2.8

## U04 — Estimation YW/MCO (Ch.4)

# U04 — Estimation (YW, MCO) — Coverage Inventory

## Definitions (D)
- [U04-D1] Yule–Walker estimators for AR(p): $\hat{\boldsymbol\phi}_p=\hat\Gamma_p^{-1}\hat{\boldsymbol\gamma}_p$ and $\hat\sigma_\varepsilon^2=\hat\gamma_0-\sum_j\hat\phi_j\hat\gamma_j$ (method-of-moments) — part04 def p4-yw; notes p.31 Def 4.1
- [U04-D2] Sample ACVS estimator (mean-zero, divide-by-$n$): $\hat\gamma_\tau=\frac1n\sum_{t=1}^{n-|\tau|}X_tX_{t+|\tau|}$ — part04 def p4-yw; notes p.31
- [U04-D3] Symmetric Toeplitz matrix $\hat\Gamma_p=(\hat\gamma_{i-j})_{i,j=1}^p$ and vector $\hat{\boldsymbol\gamma}_p=(\hat\gamma_1,\dots,\hat\gamma_p)^\top$ of the YW system — part04 def p4-yw; notes p.31
- [U04-D4] Forward least-squares estimator (AR(p)): linear model $\mathbf X_F=F\boldsymbol\phi+\boldsymbol\varepsilon$, design $F$ with rows of past lags, minimiser of $SS_F$ — part04 def p4-fls; notes p.32 Def 4.2
- [U04-D5] Forward LS design matrix $F$ and response $\mathbf X_F=(X_{p+1},\dots,X_n)^\top$ (first $p$ obs discarded as conditioning values) — part04 def p4-fls; notes p.32–33
- [U04-D6] Backward least-squares estimator (AR(p)): regress first $n-p$ values on future lags, $\mathbf X_B=B\boldsymbol\phi+\boldsymbol\nu$, minimiser of $SS_B$ — part04 def p4-bls; notes p.33–34 Def 4.3
- [U04-D7] Backward LS design matrix $B$ and response $\mathbf X_B=(X_1,\dots,X_{n-p})^\top$ — part04 def p4-bls; notes p.34
- [U04-D8] Forward–backward least-squares estimator $\hat{\boldsymbol\phi}_{FB}$: minimiser of combined criterion $SS_F(\boldsymbol\phi)+SS_B(\boldsymbol\phi)$ — part04 def p4-fbls; notes p.35 Def 4.4
- [U04-D9] Least squares for general ARMA via residual reconstruction: minimise $S(\boldsymbol\phi,\boldsymbol\theta)=\sum_t\hat\varepsilon_t^2$ with innovations rebuilt recursively, pre-sample innovations set to zero — part04 def p4-lsarma; notes p.36–37

## Theorems / Propositions / Lemmas / Corollaries (T/P/L/C)
- [U04-P1] Yule–Walker equations: for a mean-zero causal AR(p), $\gamma_k=\sum_{j=1}^p\phi_j\gamma_{k-j}$ for every $k\ge1$ — part04 prop p4-yweq; notes p.31 eq (4.1)
- [U04-P2] Matrix form of YW equations: $\boldsymbol\gamma=\Gamma\boldsymbol\phi$ with $\boldsymbol\gamma=(\gamma_1,\dots,\gamma_p)^\top$, $\Gamma=(\gamma_{i-j})$ — part04 prop p4-yweq; notes p.31 eq (4.2)
- [U04-P3] Variance identity: $\gamma_0=\sum_{j=1}^p\phi_j\gamma_j+\sigma_\varepsilon^2$ (multiply AR eq by $X_t$) — part04 prop p4-yweq; notes p.31
- [U04-P4] Minimising one-step prediction MSE $\mathbb E[(Y_t-\sum_i\phi_iY_{t-i})^2]$ yields the Yule–Walker equations (best linear predictor) — part04 prop p4-mse; sheet ex4.2
- [U04-P5] Forward / backward LS minimisers are the OLS solutions: $\hat{\boldsymbol\phi}_F=(F^\top F)^{-1}F^\top\mathbf X_F$, $\hat{\boldsymbol\phi}_B=(B^\top B)^{-1}B^\top\mathbf X_B$ — part04 prop p4-ols; notes p.33,34
- [U04-P6] Time reversibility of a stationary Gaussian AR(p): reversed process $Y_t=X_{-t}$ is AR(p) with same coefficients and innovation variance — part04 prop p4-timerev; notes p.33 eq (4.8)
- [U04-P7] Levinson–Durbin solves the YW Toeplitz system in $O(p^2)$ (vs $O(p^3)$), exploiting symmetric-Toeplitz structure — part04 prop p4-ld; notes p.32
- [U04-P8] Levinson–Durbin by-product: produces partial autocorrelations $\hat\alpha_k=\hat\phi_{k,k}$ (reflection coefficients) and prediction-error variances at every order — part04 prop p4-ld
- [U04-P9] LS fits (forward/backward/FB) need not be stationary: implied $\hat\Phi(z)$ may have roots inside unit circle; YW always yields a stationary fit — part04 prop p4-nonstat; notes p.35
- [U04-P10] Asymptotic agreement YW ≈ LS for AR: for large $n$, $\hat\mu\approx\bar Y$ and $\hat\phi\approx\hat\rho_1$ (LS score equations reduce to method-of-moments) — part04 intuition (YW vs LS); notes p.35–36

## Named Formulas & Identities (F)
- [U04-F1] YW coefficient formula $\hat{\boldsymbol\phi}_p=\hat\Gamma_p^{-1}\hat{\boldsymbol\gamma}_p$ (4.3) — part04 def p4-yw; notes p.31 (4.3)
- [U04-F2] YW innovation-variance formula $\hat\sigma_\varepsilon^2=\hat\gamma_0-\sum_{j=1}^p\hat\phi_j\hat\gamma_j$ (4.4) — part04 def p4-yw; notes p.31 (4.4)
- [U04-F3] Forward LS coefficient $\hat{\boldsymbol\phi}_F=(F^\top F)^{-1}F^\top\mathbf X_F$ (4.6) — notes p.33 (4.6); part04 def p4-fls
- [U04-F4] Forward LS residual-variance $\hat\sigma_F^2=\lVert\mathbf X_F-F\hat{\boldsymbol\phi}_F\rVert^2/(n-2p)$ (4.7) — notes p.33 (4.7); part04 def p4-fls
- [U04-F5] Backward LS coefficient $\hat{\boldsymbol\phi}_B=(B^\top B)^{-1}B^\top\mathbf X_B$ (4.10) and $\hat\sigma_B^2=\lVert\mathbf X_B-B\hat{\boldsymbol\phi}_B\rVert^2/(n-2p)$ (4.11) — notes p.34 (4.10–4.11); part04 def p4-bls
- [U04-F6] Forward SS objective $SS_F(\boldsymbol\phi)=\lVert\mathbf X_F-F\boldsymbol\phi\rVert^2=\sum_{t=p+1}^n(X_t-\sum_k\phi_kX_{t-k})^2=\sum\varepsilon_t^2$ — part04 def p4-fls; notes p.33
- [U04-F7] Backward SS objective $SS_B(\boldsymbol\phi)=\lVert\mathbf X_B-B\boldsymbol\phi\rVert^2=\sum_{t=1}^{n-p}(X_t-\sum_k\phi_kX_{t+k})^2$ — part04 def p4-bls; notes p.34
- [U04-F8] FB objective $SS_F(\boldsymbol\phi)+SS_B(\boldsymbol\phi)$ (4.12) — notes p.35 (4.12); part04 def p4-fbls
- [U04-F9] ACF-shortcut YW solve: $\hat{\boldsymbol\phi}_p=\bar\Gamma_p^{-1}\hat{\boldsymbol\rho}_p$ with $\bar\Gamma_p=(\hat\rho_{i-j})$ ($\hat\gamma_0$ cancels) — part04 keytech p4-ktyw; sheet ex4.4
- [U04-F10] Variance from ACF: $\hat\sigma_\varepsilon^2=\hat\gamma_0(1-\sum_j\hat\phi_j\hat\rho_j)$ — part04 keytech p4-ktyw
- [U04-F11] AR(1) special case: $\hat\phi=\hat\gamma_1/\hat\gamma_0=\hat\rho_1$ (YW = lag-1 sample autocorrelation) — part04 ex p4-e46
- [U04-F12] AR(1) population consistency identity $\gamma_0=\sigma_\varepsilon^2/(1-\phi^2)$, equivalently $\hat\sigma_\varepsilon^2=\hat\gamma_0(1-\hat\phi^2)$ — part04 ex p4-e46
- [U04-F13] Levinson–Durbin reflection-coefficient update $\hat\phi_{k,k}=(\hat\gamma_k-\sum_{j=1}^{k-1}\hat\phi_{k-1,j}\hat\gamma_{k-j})/v_{k-1}$ — part04 prop p4-ld
- [U04-F14] Levinson–Durbin coefficient update $\hat\phi_{k,j}=\hat\phi_{k-1,j}-\hat\phi_{k,k}\hat\phi_{k-1,k-j}$ — part04 prop p4-ld
- [U04-F15] MA(1) residual recursion $\varepsilon_t=X_t+\theta\varepsilon_{t-1}$ (solve model eq for current innovation) — part04 keytech p4-ktrec; notes p.36
- [U04-F16] ARMA(1,1) residual recursion $\varepsilon_t=X_t-\phi X_{t-1}+\theta\varepsilon_{t-1}$ — part04 keytech p4-ktrec; notes p.37
- [U04-F17] Unrolled MA(1) residual $\hat\varepsilon_t=\sum_{k=0}^{t-1}\theta^k X_{t-k}$ (polynomial of degree $t-1$ in $\theta$) — part04 ex p4-e48
- [U04-F18] AR(1)-with-mean LS score-equation solution: closed forms for $\hat\mu$ and $\hat\phi$ — notes p.35–36

## Methods / Techniques / Proof-recipes (M)
- [U04-M1] YW fit recipe: estimate ACVS → build Toeplitz $\hat\Gamma_p$ and $\hat{\boldsymbol\gamma}_p$ → solve $\hat\Gamma_p^{-1}\hat{\boldsymbol\gamma}_p$ → compute $\hat\sigma_\varepsilon^2$ — part04 keytech p4-ktyw
- [U04-M2] YW derivation recipe: multiply AR eq by $X_{t-k}$ (and by $X_t$), take expectations, use causality $\mathbb E[\varepsilon_tX_{t-k}]=0$ — part04 prop p4-yweq; notes p.30–31
- [U04-M3] ACF shortcut: divide YW system by $\hat\gamma_0$ to solve with correlation matrix/vector, $V=\hat\gamma_0^{-1}I$ — part04 keytech p4-ktyw; sheet ex4.4
- [U04-M4] Recursive innovation reconstruction for MA/ARMA LS: solve for $\varepsilon_t$, set $q$ pre-sample innovations (and pre-sample data) to zero, recurse forward, form and minimise $S$ — part04 keytech p4-ktrec; notes p.36–37
- [U04-M5] Forward vs backward design-matrix construction (AR(2) template): build lagged columns, $\hat{\boldsymbol\phi}=(A^\top A)^{-1}A^\top\mathbf X$ with $A=F$ or $B$ — part04 keytech p4-ktfb; sheet ex4.5
- [U04-M6] Proof recipe for prediction-MSE → YW: write objective as positive quadratic in $\boldsymbol\phi$, differentiate $\partial/\partial\phi_i=0$ — part04 prop p4-mse; sheet ex4.2
- [U04-M7] $2\times2$ symmetric matrix inversion trick for AR(2) YW: $(a,b;b,a)^{-1}=\frac1{a^2-b^2}(a,-b;-b,a)$ — part04 ex p4-e41; sheet ex4.1
- [U04-M8] Stationarity/causality check of a fit: compute roots of $\hat\Phi(z)$, verify modulus $>1$ — part04 ex p4-e41, p4-e46
- [U04-M9] AR(1)-with-mean LS via score equations: minimise $S(\mu,\phi)=\sum(Y_t-\mu-\phi(Y_{t-1}-\mu))^2$, set partials to zero, solve — notes p.35–36

## Crucial Hypotheses / Conditions (H)
- [U04-H1] Causality of the AR part (roots of $\Phi(z)$ outside unit circle) ⇒ $\mathbb E[\varepsilon_tX_{t-k}]=0$ for $k>0$ — the single fact making the YW derivation work — part04 intro/intuition; notes p.30
- [U04-H2] Mean-zero assumption: $\mathbb E[X_{t-j}X_{t-k}]=\gamma_{k-j}$; mean-correct the series first if mean is significantly non-zero — part04 def p4-yw, keytech p4-ktfb; notes p.30; sheet ex4.5
- [U04-H3] Gaussian innovations $\varepsilon_t\overset{iid}\sim\mathcal N(0,\sigma_\varepsilon^2)$ (Gaussian white noise) — required for time-reversibility / backward LS — part04 intro, prop p4-timerev; notes p.30,33
- [U04-H4] Initialisation of recursion: set the $q$ pre-sample innovations (and any pre-sample data) to zero before recursing in MA/ARMA LS — part04 keytech p4-ktrec, pitfall; notes p.37
- [U04-H5] Invertibility of $A^\top A$ (resp. $\hat\Gamma_p$) for existence/uniqueness of OLS (resp. YW) solution — part04 prop p4-ols

## Counterexamples / Special cases (X)
- [U04-X1] LS estimate can fall outside the stationary region: sunspot AR(2) LS $\hat\phi\approx(1.40,-0.71)$ differs from YW $(1.32,-0.63)$; LS not constrained causal — part04 prop p4-nonstat, ex p4-e45; sheet ex4.5
- [U04-X2] AR(1)-with-mean LS score equations admit the inadmissible solution $\phi=1$ (non-stationary) which must be rejected — notes p.35–36
- [U04-X3] MA(1) toy problem ($X_1=0$) gives a clean quadratic $S(\theta)$ only as an artefact; generic data gives a degree-$2(n-1)$ surface needing numerical optimisation — part04 ex p4-e48

## Pitfalls / Remarks (K)
- [U04-K1] Toeplitz indexing: $\Gamma_p$ has $\gamma_0$ on the diagonal and RHS vector is $(\gamma_1,\dots,\gamma_p)$ — do NOT put $\gamma_0$ in the vector — part04 pitfall
- [U04-K2] Degrees of freedom: LS variance divides by $n-2p$ ($n-p$ residuals, $p$ coefficients), not by $n$ — part04 pitfall; notes p.33
- [U04-K3] Forgetting to initialise the recursion ($q$ pre-sample innovations / pre-sample data to zero) leaves $\hat\varepsilon_1$ undefined — part04 pitfall; notes p.36
- [U04-K4] ARMA/MA LS is generally nonlinear (no closed form) due to $\theta\hat\varepsilon_{t-1}$ feedback; minimise numerically — part04 def p4-lsarma, ex p4-e47,e48; notes p.37
- [U04-K5] Non-stationary LS fits are a problem for prediction but acceptable for spectral estimation (still a valid spectral density) — part04 prop p4-nonstat; notes p.35
- [U04-K6] Series length $n$ does not enter YW point estimates from a given ACF; only the ACF values determine $\hat{\boldsymbol\phi}$ — part04 ex p4-e44; sheet ex4.4
- [U04-K7] Backward LS estimates the SAME $\phi$-parameters as forward (because $Y_t=X_{-t}$ is the same AR), not negated/reversed ones — part04 def p4-bls, prop p4-timerev; notes p.33

## Exercise-type schemes (E)
- [U04-E1] Fit AR(2) by Yule–Walker from given sample ACVS (sunspot): solve $2\times2$ Toeplitz, compute $\hat\sigma_\varepsilon^2$, causality check — part04 ex p4-e41; sheet ex4.1
- [U04-E2] Derive the YW equations by minimising the prediction MSE for a mean-zero stationary process — part04 ex p4-e42; sheet ex4.2
- [U04-E3] Estimate MA(1) $\theta$ by recursive least squares from a few data points ($\varepsilon_0=0$) — part04 ex p4-e43; sheet ex4.3
- [U04-E4] AR(3) Yule–Walker from a given sample ACF (ACF shortcut, $3\times3$ solve) — part04 ex p4-e44; sheet ex4.4
- [U04-E5] Compute and interpret forward & backward LS AR(2) fits (sunspot), illustrating time reversibility — part04 ex p4-e45; sheet ex4.5
- [U04-E6] AR(1) Yule–Walker by hand: $\hat\phi=\hat\gamma_1/\hat\gamma_0$, $\hat\sigma_\varepsilon^2$, stationarity check — part04 ex p4-e46
- [U04-E7] Write the ARMA(1,1) residual recursion $\hat\varepsilon_1,\dots,\hat\varepsilon_4$ as functions of $(\phi,\theta)$ and exhibit the LS objective — part04 ex p4-e47
- [U04-E8] Show MA(1) reconstructed residual is degree-$(t-1)$ polynomial in $\theta$; explain when LS is quadratic vs needs numerical optimisation — part04 ex p4-e48

## U05 — SARIMA & différenciation (Ch.5)

# U05 — SARIMA & différenciation — Coverage Inventory

## Definitions (D)
- [U05-D1] Modèle tendance-bruit (signal-plus-noise) $X_t=\mu_t+Y_t$, $\mu_t$ moyenne déterministe variable, $\{Y_t\}$ stationnaire de moyenne nulle — part05 def p5-trendmodel; notes p.38 §5.1
- [U05-D2] Tendance linéaire canonique $\mu_t=a+bt$ et tendance polynomiale de degré $q-1$ — part05 def p5-trendmodel; notes p.39
- [U05-D3] Tendance périodique (saisonnière) $\mu_t=s_t$ avec $s_{t+s}=s_t$, et le cas combiné $X_t=a+bt+s_t+Y_t$ — part05 def p5-trendmodel; notes p.40
- [U05-D4] Opérateur de différence $\diff=I-B$, $\diff X_t=X_t-X_{t-1}$, linéaire ($B$ = backshift) — part05 def p5-diff; notes p.39 §5.1
- [U05-D5] Puissance $\diff^d=(I-B)^d=\sum_{k=0}^d\binom{d}{k}(-1)^kB^k$ et exemple $\diff^2X_t=X_t-2X_{t-1}+X_{t-2}$ — part05 def p5-diff; notes p.39
- [U05-D6] Opérateur de différence saisonnière $\diff_{(s)}=I-B^s$, $\diff_{(s)}X_t=X_t-X_{t-s}$; $\diff=\diff_{(1)}$; composée $\diff\diff_{(s)}$ — part05 def p5-seasdiff; notes p.40
- [U05-D7] Moyenne mobile saisonnière $\mathrm{SMA}(Q)_s$: $X_t=\eps_t-\sum_{j=1}^Q\theta^{(s)}_j\eps_{t-js}=\Theta^{(s)}(B)\eps_t$, polynôme $\Theta^{(s)}(z)=1-\sum_j\theta^{(s)}_jz^{sj}$ — part05 def p5-sma; notes p.40 def 5.1
- [U05-D8] SMA(1) de base $X_t=\eps_t-\theta\eps_{t-s}$ — part05 def p5-sma; notes p.40 §5.2
- [U05-D9] Autorégression saisonnière $\mathrm{SAR}(P)_s$: $X_t=\eps_t+\sum_{j=1}^P\phi^{(s)}_jX_{t-js}$, $\Phi^{(s)}(B)X_t=\eps_t$, $\Phi^{(s)}(z)=1-\sum_j\phi^{(s)}_jz^{sj}$ — part05 def p5-sar; notes p.40 def 5.2
- [U05-D10] SARMA multiplicatif $(p,q)\times(P,Q)_s$: $\Phi(B)\Phi^{(s)}(B)X_t=\Theta(B)\Theta^{(s)}(B)\eps_t$, avec les quatre polynômes — part05 def p5-sarma; notes p.41 def 5.3
- [U05-D11] Cas particuliers: $\mathrm{SMA}(Q)_s=\mathrm{SARMA}(0,0)\times(0,Q)_s$ et $\mathrm{SAR}(P)_s=\mathrm{SARMA}(0,0)\times(P,0)_s$ — part05 def p5-sarma; notes p.41
- [U05-D12] Exemple $\mathrm{SARMA}(0,1)\times(0,1)_{12}$: $X_t=(1-\theta B)(1-\theta^{(12)}B^{12})\eps_t$ — part05 def p5-sarma; notes p.41
- [U05-D13] ARIMA$(p,d,q)$: $\{X_t\}$ tel que $\diff^d X_t$ est un ARMA$(p,q)$ causal-inversible, $\Phi(B)(1-B)^dX_t=\Theta(B)\eps_t$ — part05 def p5-arima; notes p.42 def 5.4
- [U05-D14] Forme différenciée de l'ARIMA: $Z_t=\diff^dX_t$, $Z_t=\sum_j\phi_jZ_{t-j}+\eps_t-\sum_j\theta_j\eps_{t-j}$; sens du "I" = intégré (somme inverse de $\diff$) — part05 def p5-arima; notes p.42
- [U05-D15] SARIMA$(p,d,q)\times(P,D,Q)_s$: $\Phi(B)\Phi^{(s)}(B)(1-B)^d(1-B^s)^D X_t=\Theta(B)\Theta^{(s)}(B)\eps_t$ (rôle de $d$, $D$) — part05 def p5-sarima
- [U05-D16] Marche aléatoire (random walk) $X_t=X_{t-1}+\eps_t$ = AR(1) à $\phi=1$ = ARIMA$(0,1,0)$, non stationnaire, $\diff X_t=\eps_t$ bruit blanc — part05 def p5-rw; notes p.42
- [U05-D17] Modèle IMA$(1,1)$ = ARIMA$(0,1,1)$: $Z_t=\diff Y_t=\eps_t-\theta\eps_{t-1}$, i.e. $Y_t=Y_{t-1}+\eps_t-\theta\eps_{t-1}$ (non stationnaire) — part05 def p5-rw; notes p.42
- [U05-D18] Modèle ARI$(1,1)$ = ARIMA$(1,1,0)$: $Z_t=\diff Y_t=\phi Z_{t-1}+\eps_t$, $|\phi|<1$, i.e. $Y_t-Y_{t-1}=\phi(Y_{t-1}-Y_{t-2})+\eps_t$ (non stationnaire) — part05 def p5-rw; notes p.42

## Theorems / Propositions / Lemmas / Corollaries (T/P/L/C)
- [U05-P1] $\diff$ enlève une tendance linéaire: $X_t=a+bt+Y_t\Rightarrow\diff X_t=b+\diff Y_t$ — part05 prop p5-lintrend; notes p.39
- [U05-P2] La différence première d'un processus stationnaire reste stationnaire ($\diff Y_t$ stationnaire) — part05 prop p5-lintrend; notes p.39
- [U05-P3] Deuxième différence enlève la constante: $\diff^2X_t=\diff^2Y_t=Y_t-2Y_{t-1}+Y_{t-2}$ — part05 prop p5-lintrend; notes p.39
- [U05-P4] $\diff^q$ annihile une tendance polynomiale de degré $q-1$: $\diff^q\mu_t\equiv0$ donc $\diff^qX_t=\diff^qY_t=\sum_{k=0}^q\binom{q}{k}(-1)^kY_{t-k}$ — part05 prop p5-polytrend; notes p.39
- [U05-T1] Tendance linéaire+saisonnière: $X_t=a+bt+s_t+Y_t$ ($s_{t+12}=s_t$) $\Rightarrow\diff\diff_{(12)}X_t=Y_t-Y_{t-1}-Y_{t-12}+Y_{t-13}$, faiblement stationnaire de moyenne 0 — part05 thm p5-combined; notes p.40 (5.1)
- [U05-T2] Covariance de $\diff\diff_{(12)}X_t$ = somme à 16 termes des $\acvs$ (tableau 4×4), fonction de $\tau$ seul — part05 thm p5-combined; notes p.40
- [U05-P5] Variante multiplicative: $X_t=(a+bt)s_t+Y_t\Rightarrow\diff_{(12)}X_t=12b\,s_{t-12}+Y_t-Y_{t-12}$ — part05 prop p5-multtrend; notes p.40
- [U05-P6] Variante multiplicative (suite): $\diff_{(12)}^2X_t=Y_t-2Y_{t-12}+Y_{t-24}$, stationnaire (moyenne 0, cov en $|\tau|$) — part05 prop p5-multtrend; notes p.40
- [U05-P7] ACVS de la SMA(1) $X_t=\eps_t-\theta\eps_{t-s}$: $\acvs_\tau=\sigma_\eps^2[(1+\theta^2)\delta_\tau-\theta(\delta_{\tau-s}+\delta_{\tau+s})]$ (3 cas) — part05 prop p5-smaacvs; notes p.40 §5.2
- [U05-P8] ACF de la SMA(1): $\acf_{\pm s}=-\theta/(1+\theta^2)$, nulle aux autres lags (signature: un seul pic au lag $s$) — part05 prop p5-smaacvs; notes p.40
- [U05-P9] Marche aléatoire non stationnaire: $X_t=\sum_{j=1}^t\eps_j$, $\E[X_t]=0$, $\Var(X_t)=t\sigma_\eps^2$, $\Cov(X_t,X_{t+\tau})=t\sigma_\eps^2$ ($\tau\ge0$) — part05 prop p5-rwprop; notes p.42
- [U05-P10] $\diff X_t=\eps_t$ est un bruit blanc pour la marche aléatoire (prototype de racine unité) — part05 prop p5-rwprop; notes p.42
- [U05-T3] Développement IMA$(1,1)$: $Y_0=0\Rightarrow Y_t=\eps_t+(1-\theta)\sum_{j=1}^{t-1}\eps_j-\theta\eps_0$ — part05 thm p5-imagrowth; notes p.43
- [U05-T4] Variance IMA$(1,1)$: $\Var(Y_t)=\sigma_\eps^2[1+(1-\theta)^2(t-1)+\theta^2]$ (croissance linéaire en $t$) — part05 thm p5-imagrowth; notes p.43
- [U05-T5] Covariance IMA$(1,1)$ ($\tau>0$): $\Cov(Y_t,Y_{t+\tau})=\sigma_\eps^2[1-\theta+(1-\theta)^2(t-1)+\theta^2]$, et $\Corr\to1$ quand $\tau/t\to0$ — part05 thm p5-imagrowth; notes p.43
- [U05-T6] Développement ARI$(1,1)$: $Y_t=\sum_{j=1}^t\sum_{i=0}^{t-j}\phi^i\eps_j=\sum_{j=1}^t\frac{1-\phi^{t-j+1}}{1-\phi}\eps_j$ — part05 thm p5-arigrowth; notes p.43
- [U05-T7] Variance ARI$(1,1)$: $\Var(Y_t)=\sigma_\eps^2\sum_{j=1}^t\big(\frac{1-\phi^{t-j+1}}{1-\phi}\big)^2$ — part05 thm p5-arigrowth; notes p.43
- [U05-T8] Covariance ARI$(1,1)$ ($\tau>0$): $\Cov(Y_t,Y_{t+\tau})=\sigma_\eps^2\sum_{j=1}^t\frac{1-\phi^{t-j+1}}{1-\phi}\cdot\frac{1-\phi^{t+\tau-j+1}}{1-\phi}$, corrélation proche de 1 — part05 thm p5-arigrowth; notes p.43

## Named formulas & identities (F)
- [U05-F1] $\diff^dX_t=\sum_{k=0}^d\binom{d}{k}(-1)^kX_{t-k}$ (différence d-ième via binôme) — part05 def p5-diff; notes p.39
- [U05-F2] $\diff_{(s)}s_t=s_t-s_{t-s}=0$ (la diff. saisonnière tue une saison de période $s$) et $\diff_{(s)}(bt)=bs$ — part05 def p5-seasdiff
- [U05-F3] $\diff_{(12)}X_t=12b+\diff_{(12)}Y_t$ (réduction d'une tendance linéaire à la constante $12b$) — part05 thm p5-combined; notes p.40
- [U05-F4] Règle du filtre bruit blanc: $\acvs_\tau=\sigma_\eps^2\sum_{j\ge0}a_ja_{j+\tau}$, $\acf_\tau=\acvs_\tau/\acvs_0$ — part05 keytech p5-acvsseasonal; notes p.43 (sol. 5.3)
- [U05-F5] Variance d'un filtre MA$(\infty)$: $\Var(X_t)=\acvs_0=\sigma_\eps^2\sum_j a_j^2$ — part05 keytech p5-acvsseasonal
- [U05-F6] Inversion AR(1) en série géométrique: $1/(1-\phi B)=\sum_{l\ge0}\phi^lB^l$ ($|\phi|<1$) — part05 keytech p5-psiweights; notes (sol. 5.2)
- [U05-F7] Récursion des poids $\psi$: $\psi_j=\theta^{(\text{num})}_j+\sum_{i=1}^p\phi_i\psi_{j-i}$, $\psi_0=1$; au-delà du num. $\psi_j=\sum_i\phi_i\psi_{j-i}$ — part05 keytech p5-psiweights

## Methods / techniques / proof-recipes (M)
- [U05-M1] Deux approches d'ajustement de tendance: (1) estimer $a,b$ par MCO puis analyser les résidus; (2) différencier — part05 intuition; notes p.38-39 §5.1
- [U05-M2] Choisir les ordres $d$ et $D$: $d=q$ pour polynôme degré $q-1$ (linéaire→$d=1$, quadratique→$d=2$); une diff. saisonnière $D=1$ (rarement $D=2$) — part05 keytech p5-choosed
- [U05-M3] Ordre d'application: $\diff_{(s)}$ d'abord (saison) puis $\diff^d$ (tendance); données mensuelles à dérive linéaire → $\diff\diff_{(12)}$ — part05 keytech p5-choosed
- [U05-M4] Critère d'arrêt: moyenne stable, variance constante, ACF à décroissance rapide; ne pas sur-différencier — part05 keytech p5-choosed
- [U05-M5] Développer un SARMA en forme explicite des lags: multiplier les 4 polynômes en $B$ formel, lire les lags survivants (saison = multiples de $s$, termes croisés = $s\pm1$), traduire en équation aux différences/récursion — part05 keytech p5-expandsarma
- [U05-M6] Dériver la MA$(\infty)$ ($\psi$-poids) d'un ARMA/SARMA: inverser l'AR en série géom., multiplier par le numérateur MA, identifier les puissances de $B$ — part05 keytech p5-psiweights
- [U05-M7] Astuce: repérer tôt la récursion pure $\psi_j=\phi\psi_{j-1}$ (au-delà du plus haut lag du numérateur) pour court-circuiter l'algèbre — part05 keytech p5-psiweights; sheet ex5.2
- [U05-M8] ACVS/ACF d'une MA$(\infty)$ saisonnière via lags pairs/impairs: si les taps impairs sont nuls, $\acvs$/$\acf$ nulles aux $\tau$ impairs; sommer la série géométrique en $\phi^2$ — part05 keytech p5-acvsseasonal; sheet ex5.3
- [U05-M9] Récurrence $\diff^kt^{k-1}=\mathbf0$ par induction (le binôme annule la puissance dominante) — part05 sol. p5-arimainvar; sheet sol.5.1

## Crucial hypotheses / conditions (H)
- [U05-H1] $\{Y_t\}$ doit être stationnaire de moyenne nulle pour que $X_t=\mu_t+Y_t$ se ramène à du stationnaire après différenciation — part05 def p5-trendmodel; notes p.38
- [U05-H2] $\{\eps_t\}$ bruit blanc de moyenne nulle, variance $\sigma_\eps^2$ (hyp. globale du chapitre) — part05 §intro; notes p.40
- [U05-H3] Stationnarité/causalité de l'AR (racines de $\Phi$ de module $>1$, hors cercle unité) requise pour inverser en MA$(\infty)$ — part05 sol. p5-seasarma; sheet sol.5.3
- [U05-H4] Inversibilité de la MA (racines de $\Theta$ hors cercle unité) requise pour la représentation AR$(\infty)$ — part05 sol. p5-seasarma; sheet sol.5.3
- [U05-H5] ARI$(1,1)$: condition $|\phi|<1$ sur les incréments (AR(1) stationnaire) bien que $\{Y_t\}$ ne soit pas stationnaire — part05 def p5-rw; notes p.42
- [U05-H6] ARIMA: la partie ARMA de $\diff^dX_t$ est supposée causale et inversible — part05 def p5-arima

## Counterexamples (X)
- [U05-X1] La marche aléatoire ($\phi=1$): exemple-type de processus à racine unité, non stationnaire (variance $\propto t$) mais à incrément bruit blanc — part05 prop p5-rwprop; notes p.42
- [U05-X2] IMA$(1,1)$ au bord $\theta=1$: $Y_t=\eps_t-\eps_0$ télescope, $\Var(Y_t)=2\sigma_\eps^2$ bornée, $\diff Y_t=\eps_t-\eps_{t-1}$ = MA(1) non inversible (racine unité), $\acf_1=-1/2$ — part05 sol. p5-newima; sheet/part05
- [U05-X3] IMA$(1,1)$ et ARI$(1,1)$: incréments bien stationnaires mais le niveau intégré recrée la croissance type marche aléatoire (corrélation $\to1$) — part05 thm p5-arigrowth; notes p.43

## Pitfalls / remarks (K)
- [U05-K1] $\diff_{(s)}=I-B^s$ n'est PAS $\diff^s=(I-B)^s$: la première (2 termes) tue une saison période $s$; la seconde (binôme à $s+1$ termes) tue un polynôme degré $s-1$ — part05 pitfall; notes p.40
- [U05-K2] Piège de la sur-différenciation: un $\diff$ de trop injecte une racine unité MA spurieuse ($\acf_1\to-1/2$) et gonfle la variance; voir $\acf_1\approx-1/2$ = différencier une fois de moins — part05 keytech p5-choosed; intuition; sol. p5-newima
- [U05-K3] "Régresser-et-soustraire" vs "différencier": la régression donne une tendance interprétable mais suppose la forme connue; différencier est robuste mais distord le bruit ($\diff Y_t$ remplace $Y_t$) — part05 intuition
- [U05-K4] Symptômes d'une racine unité restante: ACF empirique à décroissance lente et croissance quasi-linéaire de la variance — part05 keytech p5-choosed
- [U05-K5] Indétermination des conditions initiales: l'intégration d-fois d'un ARIMA laisse libre un polynôme de degré $d-1$ (les $A_j$) — part05 sol. p5-arimainvar; sheet ex5.1
- [U05-K6] Tendance×saison multiplicative (amplitude croissant avec le niveau): c'est $\diff_{(12)}^2$ (double diff. saisonnière) et non $\diff\diff_{(12)}$ qui aplatit — part05 prop p5-multtrend
- [U05-K7] Dans un SARMA seuls les lags multiples de $s$ entrent dans les facteurs saisonniers; les termes croisés produisent des lags $s\pm1$ (lobes latéraux) — part05 def p5-sma/p5-sar; sol. p5-newsarma

## Exercise-type schemes (E)
- [U05-E1] Invariance ARIMA par ajout d'un polynôme aléatoire $W_t=X_t+\sum A_jt^j$: montrer $(I-B)^dW_t=(I-B)^dX_t$ via $(I-B)^kt^{k-1}=0$ (induction) — sheet ex5.1; part05 exo p5-arimainvar
- [U05-E2] Calculer les $\psi$-poids d'un SARMA$(1,2)\times(0,1)_4$: écrire l'équation, inverser l'AR, collecter $B^j$, trouver $\psi_l=\phi\psi_{l-1}$ pour $l$ grand — sheet ex5.2; part05 exo p5-sarmapsi
- [U05-E3] Processus saisonnier $(1-0.7B^2)X_t=(1-0.3B^2)\eps_t$: (1) coefficients MA$(\infty)$ $a_j$ (pairs seulement, $a_j=\phi^{(j-2)/2}(\phi-\theta)$); (2) coefficients AR$(\infty)$ $b_j$ (par symétrie $\phi\leftrightarrow\theta$); (3) ACF en décroissance géométrique sur lags pairs — sheet ex5.3; part05 exo p5-seasarma
- [U05-E4] Calculer explicitement $\diff\diff_{(4)}X_t$ pour $X_t=a+bt+s_t+Y_t$ (saison trimestrielle): $=Y_t-Y_{t-1}-Y_{t-4}+Y_{t-5}$, vérifier moyenne nulle et stationnarité — part05 exo p5-newdiff
- [U05-E5] Développer et récurrence d'un SARMA$(0,1)\times(1,0)_{12}$: récursion $X_t=\phi^{(12)}X_{t-12}+\eps_t-\theta\eps_{t-1}$, $\psi$-poids, ACVS aux lags $0,1,11,12,13$ — part05 exo p5-newsarma
- [U05-E6] IMA$(1,1)$: (a) confirmer $\Var(Y_t)$ linéaire en $t$ ($\theta\ne1$); (b) cas $\theta=1$ = avertissement de sur-différenciation ($\acf_1=-1/2$) — part05 exo p5-newima

## U06 — Fourier & spectral (Ch.6-8)

# U06 — Fourier & spectral — coverage inventory

## Definitions (D)
- [U06-D1] Continuous-time Fourier transform $G(f)=\int g(t)e^{-2\pi i ft}dt$ for $g\in L^1$ (upper-case convention; Fourier pair $g\leftrightarrow G$) — part06 def:p6-ctft; notes p.43 Def 6.1
- [U06-D2] Continuous-time inverse Fourier transform $g(t)=\int G(f)e^{2\pi i ft}df$ (needs $g,G\in L^1$, recovers $g$ a.e.) — part06 def:p6-ctft; notes p.43 Thm 6.1
- [U06-D3] Continuous-time convolution $u=g*h$, $u(t)=\int g(t-u)h(u)du$ (weighted average) — part06 def:p6-ctconv; notes p.44 Def 6.2
- [U06-D4] Discrete-time Fourier transform $G(f)=\Delta\sum_t g_t e^{-2\pi i tf}$ for $\{g_t\}\in\ell^1$ — part06 def:p6-dtft; notes p.45 Def 6.3
- [U06-D5] Discrete-time inverse transform $g_t=\int_{-1/(2\Delta)}^{1/(2\Delta)}G(f)e^{2\pi i tf}df$ (Fourier series, domains swapped) — part06 def:p6-dtft; notes p.45 Thm 6.4
- [U06-D6] Discrete-time convolution $u=g*h$, $u_t=\Delta\sum_u g_{t-u}h_u$ — part06 def:p6-dtconv; notes p.45 Def 6.4
- [U06-D7] Periodic convolution (convolution in frequency) $U=G*H$, $U(f)=\int_{-1/(2\Delta)}^{1/(2\Delta)}G(f-f')H(f')df'$ — part06 def:p6-dtconv; notes p.46 Def 6.5
- [U06-D8] Finite-data Fourier transform $G_n(f)=\sum_{t\in T}g_t e^{-2\pi i tf}$, $T=\{0,\dots,(n-1)\Delta\}$ — part06 def:p6-fdft; notes p.47 Def 6.6
- [U06-D9] Dirichlet kernel $\mathcal{D}_T(f)=\sum_{t\in T}e^{-2\pi i ft}=\frac{\sin(n\pi f\Delta)}{\sin(\pi f\Delta)}e^{-\pi i(n-1)f\Delta}$ (transform of the rectangular indicator) — part06 def:p6-fdft; notes p.48 eq 6.17
- [U06-D10] Fourier frequencies $f_k=k/(\Delta n)$, $-n/2\le k\le (n-1)/2$ (equally spaced; periodogram ordinates approx. uncorrelated there) — part06 def:p6-fourierfreq; notes p.48
- [U06-D11] Spectral density function (discrete) $S(f)=\sum_\tau \gamma_\tau e^{-2\pi i f\tau}$ for $\{\gamma_\tau\}\in\ell^1$ ($\Delta=1$) — part06 def:p6-sdf; notes p.49 Def 7.1
- [U06-D12] Spectral density function (continuous) $S(f)=\int\gamma(\tau)e^{-2\pi i f\tau}d\tau$ for $\gamma\in L^1$ — part06 def:p6-sdf; notes p.49 Def 7.2
- [U06-D13] Harmonic (sinusoidal) process $X_t=A\cos(\nu t+\Theta)$, $A>0$, $\Theta\sim\mathrm{Unif}(-\pi,\pi)$ independent — part06 def:p6-harmonic; notes p.51 Def 7.3
- [U06-D14] Integrated spectrum / spectral distribution function $S^{(I)}$ via $\gamma_\tau=\int_{-1/2}^{1/2}e^{2\pi i\tau f}dS^{(I)}(f)$; right-cont., bounded, non-decreasing, $S^{(I)}(-1/2)=0$, $S^{(I)}(1/2)=\sigma^2$ — part06 def:p6-integspec; notes p.52
- [U06-D15] Periodogram $\hat S^{(p)}(f)=\sum_\tau\hat\gamma_\tau e^{-2\pi i f\tau}$ (plug-in via biased sample ACVS $\hat\gamma_\tau=\frac1n\sum_{t=1}^{n-|\tau|}(X_t-\bar X)(X_{t+|\tau|}-\bar X)$) — part06 def:p6-periodogram; notes p.54 Def 8.1
- [U06-D16] Data taper $\{h_t\}$ with $\|h\|_2^2=1$; tapered transform $J_h(f)=\sum_t h_t(X_t-\bar X)e^{-2\pi i tf}$ and tapered periodogram $\hat S^{(p)}_h(f)=|J_h(f)|^2$ — part06 def:p6-taper; notes p.57-58
- [U06-D17] Multitaper estimator $\hat S^{(mt)}(f)=\frac1K\sum_{k=1}^K\hat S^{(p)}_{h_k}(f)$ with $K$ orthonormal tapers; average kernel $\overline H(f)=\frac1K\sum_k|H_k(f)|^2$ — part06 def:p6-multitaper; notes p.58-59
- [U06-D18] Orthogonal-increment process $\{Z(f)\}$: $\E[dZ(f)]=0$, $\Var(dZ(f))=dS^{(I)}(f)$, $\Cov(dZ(f),dZ(f'))=0$ for $f\ne f'$ — part06 thm:p6-specrep; notes p.53 Thm 7.3

## Theorems / Propositions / Corollaries (T/P/C)
- [U06-T1] Fourier inversion, continuous time: $g,G\in L^1\Rightarrow g(t)=\int G(f)e^{2\pi i ft}df$ a.e. — part06 thm:p6-inversion; notes p.43 Thm 6.1
- [U06-T2] Fourier inversion, discrete time: $\{g_t\}\in\ell^1\Rightarrow g_t=\int_{-1/(2\Delta)}^{1/(2\Delta)}G(f)e^{2\pi i tf}df$ — part06 thm:p6-inversion; notes p.45 Thm 6.4
- [U06-T3] Convolution theorem (continuous): $u=g*h\Rightarrow U=G\cdot H$ — part06 thm:p6-convthm; notes p.44 Thm 6.2
- [U06-C1] Dual convolution corollary (continuous): if $G,H\in L^1$ and $v=g\cdot h$ then $V=G*H$ — part06 thm:p6-convthm; notes p.44 Cor 6.3
- [U06-T4] Convolution theorem (discrete), product↔convolution: $h*g\leftrightarrow H\cdot G$ — part06 thm:p6-dconvthm; notes p.46 Thm 6.5; sheet8 ex8.2(d)
- [U06-T5] Convolution theorem (discrete), product↔convolution: $h\cdot g\leftrightarrow H*G$ — part06 thm:p6-dconvthm; notes p.46 Thm 6.5; sheet8 ex8.2(c)
- [U06-T6] Aliasing theorem: $G(f)=\sum_k \mathcal{G}(f+k/\Delta)$ (sampling folds frequency content) — part06 thm:p6-aliasing; notes p.47 Thm 6.6
- [U06-T7] Aliasing for the SDF: $S(f)=\sum_k S(f+k)$ ($\Delta=1$); good/poor agreement vs Nyquist — part06 thm:p6-aliasing; notes p.50 eq 7.3
- [U06-P1] FFT complexity: finite transform at $n$ Fourier freqs in $O(n\log n)$ (vs $O(n^2)$) by divide-and-conquer — part06 prop:p6-fft; notes p.48
- [U06-T8] Herglotz's theorem: $\{g_t\}$ non-negative definite iff $g_t=\int_{-1/2}^{1/2}e^{2\pi i tf}dG^{(I)}(f)$ with $G^{(I)}$ right-cont., bounded, non-decreasing, $G^{(I)}(-1/2)=0$ — part06 thm:p6-herglotz; notes p.51 Thm 7.1
- [U06-C2] Integrated spectrum exists for every stationary process (Herglotz applied to non-negative-definite ACVS) — part06 cor:p6-integexists; notes p.52
- [U06-T9] Lebesgue decomposition of $S^{(I)}=S^{(I)}_1+S^{(I)}_2+S^{(I)}_3$ (abs. continuous + step + continuous singular), each non-negative non-decreasing with value 0 at $-1/2$ — part06 thm:p6-lebesgue; notes p.52 Thm 7.2
- [U06-T9a] Meaning of components: $S^{(I)}_1$ abs. continuous = SDF $\int_{-1/2}^f S$; $S^{(I)}_2$ step with jumps $p_\ell$ at sinusoid frequencies $f_\ell$ (line spectrum); $S^{(I)}_3$ continuous singular (pathological) — part06 thm:p6-lebesgue; notes p.52 (a)(b)(c)
- [U06-T10] Spectral representation theorem: real stationary $X_t=\mu+\int_{-1/2}^{1/2}e^{2\pi i ft}dZ(f)$ (mean-square equality) with orthogonal-increment $Z$ — part06 thm:p6-specrep; notes p.53 Thm 7.3
- [U06-P2] Periodogram as squared modulus: $\hat S^{(p)}(f)=|J(f)|^2$, $J(f)=\sqrt{1/n}\sum_t(X_t-\bar X)e^{-2\pi i tf}$ — part06 prop:p6-periogramJ; notes p.55 Prop 8.1; sheet8 ex8.1
- [U06-T11] Expectation of the periodogram = $\sum_\tau w_\tau\gamma_\tau e^{-2\pi i\tau f}$ with triangular weights $w_\tau=(1-|\tau|/n)\mathbf{1}_{[-n,n]}(\tau)$ — part06 thm:p6-periogexp; notes p.56
- [U06-T12] Expectation of periodogram as Fejér convolution: $\E[\hat S^{(p)}(f)]=\int S(f')\mathcal{F}_n(f-f')df'$; asymptotically unbiased as $n\to\infty$ — part06 thm:p6-periogexp; notes p.57 eq 8.4
- [U06-T13] Variance of the periodogram: $\Var(\hat S^{(p)}(f))\to S(f)^2>0$ (inconsistent); distinct Fourier ordinates asymptotically uncorrelated — part06 thm:p6-periogvar; notes p.57 eq 8.5
- [U06-T14] Expectation of the tapered periodogram: $\E[\hat S^{(p)}_h(f)]=\int S(f')|H(f-f')|^2 df'$, $H=$ transform of $h$ — part06 thm:p6-tapexp; notes p.58 eq 8.8; sheet8 ex8.3
- [U06-C3] Tapered periodogram unbiased for white noise (exactly, all $n$, all $f$) when $\|h\|_2^2=1$: $\E[\hat S^{(p)}_h]=\sigma^2$ — part06 cor:p6-tapunbias; sheet8 ex8.4
- [U06-T15] Variance reduction by multitapering: orthonormal tapers give $\Cov\to S(f)^2\delta_{k,k'}$, hence $\Var(\hat S^{(mt)}(f))\approx S(f)^2/K$ (restores consistency) — part06 thm:p6-mtvar; notes p.59
- [U06-P3] Closure lemmas (discrete): $g,h\in\ell^1\Rightarrow h\cdot g\in\ell^1$, $h*g\in\ell^1$, and $H\in L^1[-1/2,1/2]$ (with $\|h\cdot g\|_1,\|h*g\|_1\le\|h\|_1\|g\|_1$) — sheet8 ex8.2(a)(b)

## Named formulas & identities (F)
- [U06-F1] CT Fourier transform property table: $\overline{g(t)}\leftrightarrow\overline{G(-f)}$, $g(\alpha t)\leftrightarrow\frac1{|\alpha|}G(f/\alpha)$, $g(t+\tau)\leftrightarrow G(f)e^{2\pi i\tau f}$, linearity — part06 def:p6-ctprops; notes p.44; sheet6 ex6.1
- [U06-F2] DTFT periodicity: $G(f)=G(f+k/\Delta)$ for all $k\in\Ints$ — part06 def:p6-dtft; notes p.45 eq 6.8
- [U06-F3] DTFT property table (conjugation, scaling, shift $g_{t+\tau}\leftrightarrow G(f)e^{2\pi i\tau f}$, linearity) — notes p.45
- [U06-F4] Finite transform = blurred full transform: $G_n=\mathcal{D}_T*G$ (window blurs the spectrum), $d_t=\frac1\Delta\mathbf{1}_T(t)$ — part06 def:p6-fdft; notes p.48 eq 6.15-6.16
- [U06-F5] ACVS recovery / Fourier inversion of SDF: $\gamma_\tau=\int_{-1/2}^{1/2}S(f)e^{2\pi i f\tau}df$ — part06 def:p6-sdf; notes p.52
- [U06-F6] Parseval / variance from SDF: $\Var(X_t)=\gamma_0=\int_{-1/2}^{1/2}S(f)df$ (total power) — part06 def:p6-sdf, exo:p6-parseval; notes p.52
- [U06-F7] Valid-SDF properties: real, even ($S(-f)=S(f)$ since $\gamma_{-\tau}=\gamma_\tau$), non-negative, period 1 — part06 def:p6-sdf; notes p.49
- [U06-F8] Harmonic process moments: $\E[X_t]=0$, $\Cov(X_{t+\tau},X_t)=\frac12\E[A^2]\cos(\nu\tau)$; spectrum = lines at $\pm\nu/(2\pi)$ — part06 def:p6-harmonic; notes p.51
- [U06-F9] Nyquist frequency $=1/(2\Delta)$ ($=1/2$ when $\Delta=1$); content above it unrecoverable — part06 thm:p6-aliasing; notes p.50
- [U06-F10] Fejér kernel $\mathcal{F}_n(f)=\frac1n\frac{\sin^2(n\pi f)}{\sin^2(\pi f)}$ ($=n$ at $f=0$); $=|\mathcal{D}_T(f)|^2/n$ — part06 thm:p6-periogexp; notes p.57
- [U06-F11] SDF of a linear filter: $X_t=\sum_j\psi_j\eps_{t-j}\Rightarrow S(f)=\sigma^2|\sum_j\psi_j e^{-2\pi i jf}|^2$ — part06 keytech:p6-sdffromacvs
- [U06-F12] SDF of ARMA: $S(f)=\sigma^2\,|\Theta(e^{-2\pi i f})|^2/|\Phi(e^{-2\pi i f})|^2$ — part06 keytech:p6-sdffromacvs
- [U06-F13] Real-cosine form of the SDF: $S(f)=\gamma_0+2\sum_{\tau\ge1}\gamma_\tau\cos(2\pi f\tau)$ — part06 keytech:p6-sdffromacvs
- [U06-F14] Cosine inversion building blocks: $\int_0^{1/2}\cos(2\pi f\tau)df=\frac{\sin(\pi\tau)}{2\pi\tau}$; $\int_0^{1/2}f\cos(2\pi f\tau)df=\frac{\sin(\pi\tau)}{4\pi\tau}+\frac{\cos(\pi\tau)-1}{4\pi^2\tau^2}$ — part06 keytech:p6-acvsfromsdf; sheet7 ex7.3
- [U06-F15] SDF of white noise: $S(f)=\sigma_\eps^2$ (flat / "white") — part06 exo:p6-wnsdf; sheet7 ex7.1
- [U06-F16] SDF of MA(1): $S(f)=\sigma^2(1+\theta^2-2\theta\cos(2\pi f))$; min/max at $f=0$ or $1/2$ (high/low-pass) — part06 exo:p6-ma1sdf
- [U06-F17] SDF of AR(1): $S(f)=\sigma^2/(1-2\phi\cos(2\pi f)+\phi^2)$; red ($\phi>0$) vs blue ($\phi<0$) spectrum — part06 exo:p6-ar1sdf
- [U06-F18] SDF of MA(q): $S(f)=\sigma_\eps^2|\sum_{j=0}^q\theta_j e^{-2\pi i jf}|^2=\sigma_\eps^2|\Theta(e^{-2\pi i f})|^2$ — part06 exo:p6-maqsdf; sheet7 ex7.4
- [U06-F19] Complex-RV covariance $\Cov(Z_1,Z_2)=\E[(Z_1-\E Z_1)\overline{(Z_2-\E Z_2)}]$ vs complementary covariance / relation (no conjugate) — part06 recallbox; notes p.53
- [U06-F20] Orthogonality relation $\int_{-1/2}^{1/2}e^{-2\pi i\tau f}df=\mathbf{1}_{\{\tau=0\}}$ (collapses double sums; engine of inversion/Parseval) — sheet8 ex8.4; part06 cor:p6-tapunbias

## Methods / techniques (M)
- [U06-M1] Compute an SDF from an ACVS: write ACVS, pair $\pm\tau$ to cosines, or use the factored transfer-function form; sanity-check real/even/non-neg/integrates to $\gamma_0$ — part06 keytech:p6-sdffromacvs
- [U06-M2] Test whether a candidate $\gamma$ is a valid ACVS: check symmetry & $\gamma_0\ge|\gamma_\tau|$, compute $S(f)$, hunt a frequency with $S(f)<0$ (try $f=0,\tfrac12$); one negative value disqualifies — part06 keytech:p6-validacvs
- [U06-M3] Recover an ACVS from a given SDF: $\gamma_\tau=2\int_0^{1/2}S(f)\cos(2\pi f\tau)df$; integrate by parts for polynomial $S$, partial fractions/contour for rational $S$, treat $\tau=0$ separately — part06 keytech:p6-acvsfromsdf
- [U06-M4] Read off periodogram bias & variance: bias $=S*\mathcal{F}_n$ (leakage), $\Var\to S^2$ (inconsistent), fixes = taper (bias) + multitaper (variance) — part06 keytech:p6-readbias
- [U06-M5] Periodogram-as-$|J|^2$ derivation: re-index the lag double sum as a free double sum $s,t\in T$, factor into $J\overline{J}$ — part06 prop:p6-periogramJ; sheet8 ex8.1
- [U06-M6] Poisson-summation / period-block proof of aliasing: equate the two inversion formulas at $t\in\Delta\Ints$, split $\Reals$ into period blocks, shift by $k/\Delta$ (phase $=1$), swap sum/integral, match Fourier coefficients — part06 exo:p6-aliasproof; sheet6 ex6.3
- [U06-M7] Convolution-theorem proof (continuous): substitute convolution into $U$, apply Fubini ($\iint|g(x-y)h(y)|=\|g\|_1\|h\|_1<\infty$), substitute $s=x-y$ — part06 thm:p6-convthm, exo:p6-convproof; sheet6 ex6.2
- [U06-M8] Tapered-periodogram expectation via taper autocorrelation: $w_\tau=\sum_t h_t h_{t+\tau}=(\tilde h*\bar h)_\tau$, transform $\to|H|^2$ by the convolution theorem — part06 thm:p6-tapexp; sheet8 ex8.3
- [U06-M9] Two-way SDF check (ACVS vs transfer function) and locating spectral max/min via the range of $\cos(2\pi f)\in[-1,1]$ — part06 exo:p6-ma1sdf, exo:p6-ar1sdf

## Crucial hypotheses / conditions (H)
- [U06-H1] CT transform needs $g\in L^1$; inversion needs additionally $G\in L^1$ — part06 def:p6-ctft, thm:p6-inversion; notes p.43
- [U06-H2] DTFT / discrete inversion need $\{g_t\}\in\ell^1$ — part06 def:p6-dtft; notes p.45
- [U06-H3] SDF (as DTFT of ACVS) requires $\{\gamma_\tau\}\in\ell^1$ (absolute summability) — part06 def:p6-sdf; notes p.49
- [U06-H4] Aliasing theorem hypotheses: $g\in L^1$ continuous, $G\in L^1$, $\{g(t)\}\in\ell^1$, $\{G(f+k/\Delta)\}_k\in\ell^1$ — part06 thm:p6-aliasing; notes p.47; sheet6 ex6.3
- [U06-H5] ACVS is non-negative definite $\Leftrightarrow$ valid spectrum (Herglotz); equivalently $S(f)\ge0$ for all $f$ in the summable case — part06 keytech:p6-validacvs, thm:p6-herglotz
- [U06-H6] Taper normalisation $\|h\|_2^2=\sum_t h_t^2=1$ (keeps estimator unbiased for white noise) — part06 def:p6-taper, cor:p6-tapunbias; notes p.58
- [U06-H7] Multitaper tapers must be orthonormal $\sum_t h_{t,k}h_{t,k'}=\delta_{k,k'}$ (makes individual periodograms asymptotically uncorrelated) — part06 def:p6-multitaper, thm:p6-mtvar; notes p.59
- [U06-H8] Periodogram variance result holds for $f\ne0\bmod\frac12$ — part06 thm:p6-periogvar; notes p.57

## Counterexamples (X)
- [U06-X1] Harmonic process: stationary but $\{\gamma_\tau\}\notin\ell^1$ (ACVS does not decay), so no ordinary SDF — only an integrated spectrum (line spectrum) exists — part06 def:p6-harmonic; notes p.51
- [U06-X2] Truncated ACVS $\gamma_\tau=1$ for $|\tau|\le K$ else 0 is NOT a valid ACVS (its SDF is the Dirichlet kernel, goes negative; $S(1/2)=(-1)^K<0$ for odd $K$) — part06 exo:p6-truncacvs; sheet7 ex7.2
- [U06-X3] Endpoint test: $\gamma_0=1,\gamma_{\pm1}=\rho$, else 0 is a valid ACVS iff $|\rho|\le\frac12$ (MA(1) bound $|\rho_1|\le\frac12$) — part06 exo:p6-endpoint
- [U06-X4] Time-varying-amplitude harmonic $X_t=\eps_t\cos(\nu t+\Theta)$ with non-uniform $\Theta$: still stationary, in fact white noise with variance $\sigma^2/2$ ($2\Theta$-harmonics integrate out) — part06 exo:p6-tvharm; sheet7 ex7.5

## Pitfalls / remarks (K)
- [U06-K1] The periodogram is NOT consistent: doubling $n$ does not halve $\Var$ at fixed $f$ (stays $\approx S(f)^2$); finer resolution but same per-ordinate scatter — must average to reduce variance — part06 pitfall (after thm:p6-periogvar); notes p.57
- [U06-K2] Bias vs variance split: tapering attacks bias (sharper $|H|^2$ vs Fejér), multitapering attacks variance ($\approx S^2/K$) — part06 intuition; notes p.58-59
- [U06-K3] Why aliasing matters: high-freq sinusoid sampled too slowly mimics a low-freq one (wagon-wheel); cure = sample finely or low-pass before sampling — part06 intuition (after thm:p6-aliasing); notes p.46-47
- [U06-K4] Truncating a genuine ACVS to a finite window generally breaks non-negative-definiteness; the clean fix is to taper the spectrum, not chop the ACVS — part06 intuition (after exo:p6-truncacvs)
- [U06-K5] Convention: $\Delta=1$ from the spectral chapters on; use ordinary frequency $f$, not angular $\omega=2\pi f$ (avoids stray $2\pi$ factors) — part06 §intro; notes p.49, p.52
- [U06-K6] Reading the Lebesgue components: abs.-continuous $\Rightarrow\gamma_\tau\to0$ (e.g. ARMA); line spectrum $\Rightarrow$ ACVS persists (harmonic); mixed = signal + coloured noise — part06 intuition (after thm:p6-lebesgue); notes p.52-53
- [U06-K7] Fejér kernel has wide, slowly-decaying side lobes $\Rightarrow$ "blurring"/leakage; sharp spectral peaks are worst affected — part06 thm:p6-periogexp, keytech:p6-readbias; notes p.56-57
- [U06-K8] One can invert the periodogram by FFT to obtain the sample ACVS cheaply — part06 prop:p6-fft, prop:p6-periogramJ; notes p.55

## Exercise-type schemes (E)
- [U06-E1] Prove Fourier-transform property-table identities (conjugation, scaling, shift, linearity) — sheet6 ex6.1; part06 exo:p6-ft-props
- [U06-E2] Prove the continuous-time convolution theorem $U=G\cdot H$ via Fubini — sheet6 ex6.2; part06 exo:p6-convproof
- [U06-E3] Prove the aliasing relation $G(f)=\sum_k\mathcal{G}(f+k/\Delta)$ via period-block / Poisson summation — sheet6 ex6.3; part06 exo:p6-aliasproof
- [U06-E4] Find the SDF of white noise from its ACVS — sheet7 ex7.1; part06 exo:p6-wnsdf
- [U06-E5] Decide whether a (truncated/finite) candidate sequence is a valid ACVS via SDF non-negativity — sheet7 ex7.2; part06 exo:p6-truncacvs
- [U06-E6] Recover the ACVS from a given (triangular) SDF by cosine integration / by parts — sheet7 ex7.3; part06 exo:p6-triangsdf
- [U06-E7] Find the SDF of an MA(q) process (double-sum / transfer-function method) — sheet7 ex7.4; part06 exo:p6-maqsdf
- [U06-E8] Compute first two moments of a time-varying-amplitude harmonic process; test stationarity / $t$-independence — sheet7 ex7.5; part06 exo:p6-tvharm
- [U06-E9] Prove the periodogram identity $\hat S^{(p)}(f)=|J(f)|^2$ by double-sum re-indexing — sheet8 ex8.1; part06 exo:p6-perioJ
- [U06-E10] Prove discrete convolution-theorem package: $\ell^1$ closure of $h\cdot g$, $h*g$; $H\in L^1$; $v=h\cdot g\Rightarrow V=H*G$; $u=h*g\Rightarrow U=H\cdot G$ — sheet8 ex8.2
- [U06-E11] Prove the tapered-periodogram expectation $\E[\hat S^{(p)}_h(f)]=\int S(f')|H(f-f')|^2 df'$ — sheet8 ex8.3; part06 exo:p6-tapexp
- [U06-E12] Prove the tapered periodogram is exactly unbiased for white noise when $\|h\|_2^2=1$ (Parseval) — sheet8 ex8.4; part06 exo:p6-tunbias
- [U06-E13] Find the SDF of an MA(1) two ways (ACVS & transfer fn) and locate its max/min — part06 exo:p6-ma1sdf
- [U06-E14] Find the SDF of an AR(1) from the ACVS and confirm via transfer fn; describe red/blue shape — part06 exo:p6-ar1sdf
- [U06-E15] Endpoint test of a candidate ACVS as a function of $\rho$ (validity iff $|\rho|\le\frac12$) — part06 exo:p6-endpoint
- [U06-E16] Derive variance from the SDF (Parseval) and read off $\gamma_0$ for the AR(1) SDF via residues — part06 exo:p6-parseval

## U07 — Multivarié & VAR (Ch.9)

# U07 — Multivarié & VAR — Coverage inventory

## Definitions (D)
- [U07-D1] Multivariate time series: $\mathbb{R}^d$-valued discrete-time process with univariate marginals; $d=2$ = bivariate — part07 def p7-mvts / notes p.60 Def 9.1
- [U07-D2] Multivariate second-order (weak) stationarity: constant mean, shift-invariant $\operatorname{Cov}(X_{t+\tau},X_t)$, finite $\operatorname{tr}(\operatorname{Var}(X_t))$ — part07 def p7-mvstat / notes p.60-62 Def 9.1
- [U07-D3] Equivalent characterization of mv stationarity: each marginal 2nd-order stationary AND every pair has shift-invariant cross-covariance — part07 def p7-mvstat / notes p.62-63
- [U07-D4] $\operatorname{Cov}(U,V)$ of two random vectors = matrix with $(j,k)$ entry $\operatorname{Cov}(U^{(j)},V^{(k)})$ — part07 def p7-mvstat / notes p.63
- [U07-D5] Matrix autocovariance sequence $\Gamma_\tau=\operatorname{Cov}(X_{t+\tau},X_t)$, entries $\gamma_\tau^{(j,k)}$ — part07 def p7-acvs / notes p.62 Def 9.2
- [U07-D6] Cross-covariance sequence (CCS): off-diagonal $\gamma_\tau^{(j,k)}$, $j\ne k$ (diagonal = ordinary marginal ACVS) — part07 def p7-acvs / notes p.63 Def 9.2
- [U07-D7] Cross-correlation sequence $\rho_\tau^{(j,k)}=\gamma_\tau^{(j,k)}/\sqrt{\gamma_0^{(j,j)}\gamma_0^{(k,k)}}$ — part07 def p7-ccs / notes p.63 Def 9.3
- [U07-D8] Multivariate white noise $\mathrm{WN}(0,\Sigma)$: stationary, mean 0, $\Gamma_\tau^{(\varepsilon)}=\Sigma$ if $\tau=0$, else 0 — part07 def p7-wn / notes p.63 Def 9.4
- [U07-D9] Uncorrelated processes: cross-covariance $\gamma_\tau^{(1,2)}=0$ at every lag $\tau$ — part07 def p7-uncorr / notes p.63 Example 9.1
- [U07-D10] Spectral density matrix $S(f)=\sum_\tau \Gamma_\tau e^{-2\pi i\tau f}$ (needs $\{\gamma^{(j,k)}_\tau\}\in\ell^1$); entries $S_{j,k}(f)$ — part07 def p7-sdm / notes p.63-64 Def 9.5
- [U07-D11] Cross-spectral density: off-diagonal $S_{j,k}(f)$ ($j\ne k$), complex-valued in general (diagonal = real ordinary SDF) — part07 def p7-sdm / notes p.64 Def 9.5
- [U07-D12] Coherence $r_{j,k}(f)=S_{j,k}(f)/\sqrt{S_{j,j}(f)S_{k,k}(f)}\in\mathbb{C}$; report magnitude (squared) and phase — part07 def p7-coh / notes p.65 Def 9.6
- [U07-D13] Magnitude-squared coherence $|r_{j,k}(f)|^2\in[0,1]$ and phase $\arg r_{j,k}(f)$ (sign / lead-lag angle) — part07 def p7-coh / notes p.65
- [U07-D14] VAR($p$): $X_t=\Phi_1X_{t-1}+\cdots+\Phi_pX_{t-p}+\varepsilon_t$, $\Phi_j\in\mathbb{R}^{d\times d}$, $\Phi_p\ne0$, $\varepsilon_t\sim\mathrm{WN}(0,\Sigma)$ — part07 def p7-var / notes p.66 Def 9.7
- [U07-D15] VAR matrix-polynomial / backshift form $\Phi(z)=I_d-\sum_j\Phi_j z^j$, $\Phi(B)X_t=\varepsilon_t$ — part07 def p7-var / notes p.66 Def 9.7
- [U07-D16] Companion form: stack $Y_t=(X_t^\top,\dots,X_{t-p+1}^\top)^\top\in\mathbb{R}^{dp}$, companion matrix $F$, $U_t=(\varepsilon_t,0,\dots,0)^\top$ — part07 def p7-companion / notes p.66-67
- [U07-D17] Recovery map $X_t=GY_t$ with $G=(I_d\ 0\ \cdots\ 0)\in\mathbb{R}^{d\times dp}$ — part07 def p7-companion / notes p.68
- [U07-D18] Stability of a VAR($p$): all roots of $\det(I_d-\Phi_1 z-\cdots-\Phi_p z^p)=0$ lie strictly outside unit circle ($|z|>1$) — part07 def p7-stable / notes p.68
- [U07-D19] Stability (equivalent): companion matrix $F$ has all eigenvalues of modulus $<1$ — part07 def p7-stable / notes p.68

## Theorems / Propositions / Corollaries (T/P/C)
- [U07-T1] Multivariate spectral representation theorem: $X_t=\mu+\int e^{2\pi ift}dZ(f)$ with vector orthogonal-increment $Z(f)$ — part07 thm p7-spectral / notes p.65 Thm 9.1
- [U07-T2] Spectral representation increment properties: $\mathbb{E}[dZ(f)]=0$, $\operatorname{Var}(dZ(f))=S(f)df$, $\operatorname{Cov}(dZ(f),dZ(f'))=0$ for $f\ne f'$ — part07 thm p7-spectral / notes p.65 Thm 9.1
- [U07-T3] "Everything is a VAR(1)": every VAR($p$) = VAR(1) $Y_t=FY_{t-1}+U_t$ (companion reduction) — part07 thm p7-everyvar1 / notes p.66-67
- [U07-T4] Yule–Walker for VAR($p$), $\tau\ge0$: $\Gamma_\tau=\Phi_1\Gamma_{\tau-1}+\cdots+\Phi_p\Gamma_{\tau-p}+\delta_{\tau,0}\Sigma$ — part07 thm p7-yw / notes p.69
- [U07-T5] Yule–Walker for VAR(1): $\Gamma_\tau=\Phi_1\Gamma_{\tau-1}+\delta_{\tau,0}\Sigma$ — part07 thm p7-yw / notes p.69
- [U07-P1] Symmetry of the matrix ACVS: $\gamma_\tau^{(j,k)}=\gamma_{-\tau}^{(k,j)}\iff\Gamma_{-\tau}=\Gamma_\tau^\top$ — part07 prop p7-gammasym / notes p.63
- [U07-P2] Positive semi-definiteness of $\{\Gamma_\tau\}$: $\sum_{j,k}a_j^\top\Gamma_{k-j}a_k\ge0$ for all $a_i\in\mathbb{R}^d$ — part07 prop p7-psd / notes p.63
- [U07-P3] CCS index-flip symmetry $\rho_\tau^{(j,k)}=\rho_{-\tau}^{(k,j)}$; $\rho_0^{(j,j)}=1$ but $\rho_0^{(j,k)}\ne1$ in general — part07 def p7-ccs / notes p.63 Def 9.3
- [U07-P4] Contemporaneous correlation from shared noise: $Y_t=X_t+\phi_t\mathbf{1}\Rightarrow\Gamma_\tau^{(Y)}=\Gamma_\tau^{(X)}+\sigma_\phi^2\delta_{\tau,0}\mathbf{1}\mathbf{1}^\top$ — part07 prop p7-contemp / notes p.63 Example 9.2
- [U07-P5] Hermitian symmetry of spectral matrix: $S_{j,k}(f)=\overline{S_{k,j}(f)}$, $S_{j,k}(f)=\overline{S_{j,k}(-f)}$ — part07 prop p7-herm / notes p.64
- [U07-P6] Matrix form $S(f)=S(f)^H$ (Hermitian) and $S(f)=S(-f)^\top$ — part07 prop p7-herm / notes p.64
- [U07-P7] $S(f)$ is positive semi-definite for every $f$ — part07 prop p7-herm / notes p.64
- [U07-P8] Cross-spectrum of pure-delay process $X_t=(Y_t,Y_{t-\nu})^\top$: $S_{1,2}(f)=S_Y(f)e^{2\pi if\nu}$, coherence $r_{1,2}(f)=e^{2\pi if\nu}$ (magnitude 1, phase $2\pi\nu f$) — part07 prop p7-delayspec / notes p.65 Example 9.3
- [U07-P9] MA($\infty$) representation of a stable VAR(1): $X_t=\sum_{j\ge0}\Phi_1^j\varepsilon_{t-j}$ — part07 prop p7-mainf / notes p.68
- [U07-P10] Covariance of a stable VAR(1), $\tau\ge0$: $\Gamma_\tau=\sum_{k\ge0}\Phi_1^{k+\tau}\Sigma(\Phi_1^k)^\top$ — part07 prop p7-var1cov / notes p.69
- [U07-C1] Covariance of a VAR($p$) via companion: $\Gamma_\tau^{(X)}=G(\sum_k F^{k+\tau}\Sigma_U(F^k)^\top)G^\top$ — part07 cor p7-varpcov / notes p.69
- [U07-P11] Stability $\Rightarrow$ stationarity (converse false in general) — part07 def p7-stable / notes p.68

## Named formulas & identities (F)
- [U07-F1] $\Gamma_{-\tau}=\Gamma_\tau^\top$ (transpose symmetry of matrix ACVS) — part07 prop p7-gammasym / notes p.63
- [U07-F2] Inverse spectral relation $\Gamma_\tau=\int_{-1/2}^{1/2}S(f)e^{2\pi if\tau}df$ — part07 def p7-sdm / notes p.64
- [U07-F3] Stationary covariance $\Gamma_0=\sum_k\Phi_1^k\Sigma(\Phi_1^k)^\top$ — part07 prop p7-var1cov / notes p.69
- [U07-F4] Discrete Lyapunov equation $\Gamma_0=\Phi_1\Gamma_0\Phi_1^\top+\Sigma$ — part07 prop p7-var1cov / keytech p7-ktmainf
- [U07-F5] Vectorized Lyapunov solution $\operatorname{vec}\Gamma_0=(I-\Phi_1\otimes\Phi_1)^{-1}\operatorname{vec}\Sigma$ — part07 keytech p7-ktmainf
- [U07-F6] VAR(1) lag matrices via YW: $\Gamma_\tau=\Phi_1^\tau\Gamma_0$ for $\tau\ge1$ — part07 thm p7-yw / exercise p7-e7
- [U07-F7] Decoupled diagonal VAR(1): $\Gamma_0^{(j,j)}=\sigma_j^2/(1-\phi_j^2)$ ($d$ scalar AR(1)) — part07 keytech p7-ktmainf / exercise p7-e6
- [U07-F8] Delay-process cross-spectrum $S_{1,2}(f)=\alpha S_{2,2}(f)e^{-2\pi if\nu}$, amplitude $\alpha S_{2,2}(f)$, phase $-2\pi\nu f$ — part07 exercise p7-e2 / sheet ex9.2
- [U07-F9] Sanity check $\det M(0)=\det I_d=1$ (constant term of reverse char. poly = 1) — part07 keytech p7-ktstable / exercises p7-e4,e5

## Methods / techniques / proof-recipes (M)
- [U07-M1] Test VAR stability via reverse characteristic polynomial: form $M(z)$, compute/factor $\det M(z)$, check all roots $|z_i|>1$ — part07 keytech p7-ktstable / notes p.68
- [U07-M2] VAR(1) stability shortcut: $\det(I_d-\Phi_1 z)=0\iff z=1/\lambda_i(\Phi_1)$, so check spectral radius $\max|\lambda_i(\Phi_1)|<1$ — part07 keytech p7-ktstable / intuition box
- [U07-M3] Eigenvalues of a (block-)triangular $\Phi_1$ are its diagonal (block) entries; factor det along sparse row — part07 keytech p7-ktstable / exercise p7-e5
- [U07-M4] Compute a cross-spectrum from a cross-covariance: express $\gamma_\tau^{(j,k)}$ as a shift of a known ACVS, Fourier-transform, re-index to pull out $e^{\pm2\pi if\nu}$, read amplitude/phase — part07 keytech p7-ktcrossspec / notes p.65
- [U07-M5] Time-delay $\leftrightarrow$ linear-phase mnemonic: delay of $\nu$ samples $=$ phase $\mp2\pi\nu f$ — part07 keytech p7-ktcrossspec / exercise p7-e2
- [U07-M6] Derive VAR(1) MA($\infty$) by back-substitution and obtain $\Gamma_\tau$ by matching noise times ($j=k+\tau$) — part07 keytech p7-ktmainf / notes p.68-69
- [U07-M7] Solve VAR($p$) Yule–Walker: solve first $p+1$ equations for $\Gamma_0,\dots,\Gamma_p$, then recurse for $\tau>p$ — part07 keytech p7-ktyw / notes p.69
- [U07-M8] Companion-form reduction recipe: build $F$, $U_t$, apply VAR(1) results, project back with $G$ — part07 thm p7-everyvar1 / notes p.66-68
- [U07-M9] Proof recipe (YW): right-multiply VAR eqn by $X_t^\top$, take expectation; noise term contributes $\Sigma$ only at $\tau=0$ — part07 thm p7-yw intuition / notes p.69

## Crucial hypotheses / conditions (H)
- [U07-H1] Spectral density matrix exists only if all cross-covariances are absolutely summable, $\{\gamma_\tau^{(j,k)}\}\in\ell^1$ — part07 def p7-sdm / notes p.63
- [U07-H2] MA($\infty$), $\Gamma_\tau$ formula, and YW require the VAR to be stable — part07 props p7-mainf,p7-var1cov / notes p.68
- [U07-H3] VAR($p$) definition requires $\Phi_p\ne0$ (genuine order $p$) — part07 def p7-var / notes p.66
- [U07-H4] $\mathrm{WN}(0,\Sigma)$ allows lag-0 cross-component correlation ($\Sigma$ off-diagonal nonzero); diagonal $\Sigma$ is an extra assumption — part07 def p7-wn / notes p.63
- [U07-H5] Lag $\tau$ convention sits in the FIRST argument of $\operatorname{Cov}(X_{t+\tau},X_t)$ — fixes $\Gamma_{-\tau}=\Gamma_\tau^\top$ — part07 def p7-acvs / notes p.62

## Counterexamples / illustrative examples (X)
- [U07-X1] Common-shock example: $Y_t=X_t+\phi_t\mathbf{1}$ creates lag-0 correlation regardless of $X$'s structure — part07 prop p7-contemp / notes p.63 Example 9.2
- [U07-X2] Pure-delay process gives perfect coherence (magnitude 1) with phase linear in $f$ — part07 prop p7-delayspec / notes p.65 Example 9.3
- [U07-X3] Diagonal VAR(1): two independent AR(1)'s, all off-diagonal $\Gamma_\tau=0$, coherence $r_{1,2}(f)\equiv0$ — part07 exercise p7-e6
- [U07-X4] Bivariate VAR(2) of notes (Example 9.4) with roots $z_1=1.3$, $z_{2,3}=3.55\pm4.26i$: stable — notes p.69-70 Example 9.4 / exercise p7-e4
- [U07-X5] Triangular trivariate VAR(1) (Example 9.5), factored det $(1-0.5z)(1-0.4z-0.03z^2)$: stable — notes p.70 Example 9.5 / exercise p7-e5

## Pitfalls / remarks (K)
- [U07-K1] Multivariate ACVS is NOT even in $\tau$: off-diagonal satisfies only $\gamma_\tau^{(j,k)}=\gamma_{-\tau}^{(k,j)}$; must swap indices when flipping $\tau$ — part07 pitfall box / notes p.63
- [U07-K2] Transpose pitfall in YW: a term $\Phi_2\Gamma_{-1}$ means $\Phi_2\Gamma_1^\top$ — part07 keytech p7-ktyw
- [U07-K3] $\Gamma_{-1}\ne\Gamma_1$ in general because $\Phi_1$ not symmetric (mv ACVS not even) — part07 exercise p7-e7(c)
- [U07-K4] Cross-spectrum $S_{j,k}(f)$ is complex (only diagonal real); cross-correlation $\rho_0^{(j,k)}$ need not equal 1 — part07 defs p7-sdm,p7-ccs / notes p.63-64
- [U07-K5] Off-diagonal entries of $\Phi_j$ ARE the cross-component dynamics; zero off-diagonals = decoupled channels — part07 def p7-var / exercise p7-e6
- [U07-K6] Stability is sufficient but not necessary for stationarity — part07 def p7-stable / notes p.68

## Exercise-type schemes (E)
- [U07-E1] Common-noise cross-correlation: same scalar noise added to both channels, find $\rho_\tau^{(1,2)}$ at all lags (extra $\sigma_\varepsilon^2$ only at $\tau=0$) — part07 exercise p7-e1 / sheet ex9.1
- [U07-E2] Delay process: find cross-correlation (shifted, noise-shrunk ACF) and cross-spectrum amplitude/phase — part07 exercise p7-e2 / sheet ex9.2
- [U07-E3] Expectation & variance of the sample cross-covariance $\hat\gamma_\tau^{(1,2)}$ for iid Gaussian vectors (Isserlis/Wick fourth moment $\sigma_{11}\sigma_{22}+2\sigma_{12}^2$) — part07 exercise p7-e3 / sheet ex9.3
- [U07-E4] Stability of a bivariate VAR(2): build reverse char. polynomial, find roots, decide stability — part07 exercise p7-e4 / notes Example 9.4
- [U07-E5] Stability of a triangular trivariate VAR(1): factor reverse char. polynomial, decide stability — part07 exercise p7-e5 / notes Example 9.5
- [U07-E6] MA($\infty$) & covariance of a diagonal VAR(1): write MA form, compute $\Gamma_0,\Gamma_1$, find coherence (=0) — part07 exercise p7-e6
- [U07-E7] Read off a VAR(1) from its Yule–Walker recursion: verify stability, express $\Gamma_2=\Phi_1^2\Gamma_0$, give $\Gamma_{-1}=\Gamma_1^\top$ — part07 exercise p7-e7
- [U07-E8] Sample cross-covariance estimator definition $\hat\Gamma_\tau=\frac1N\sum_{t=1}^{N-|\tau|}Y_{t+\tau}Y_t^\top$ (biased, $1/N$ normalization) — sheet ex9.3 / part07 exercise p7-e3

## U08 — Prévision (Ch.10)

# U08 — Prévision (Forecasting) — Coverage inventory

## Definitions (D)
- [U08-D1] Prediction mean square error $P^{\,n}_{n+h}=\mathbb{E}[(X_{n+h}-g(X_1,\dots,X_n))^2]$; smaller = better forecast — part08 def p8-pmse; notes p.71 (eq 10.1)
- [U08-D2] Lead/horizon $h>0$ and origin $n$; forecast $X_{n+h}$ from $X_1,\dots,X_n$ — part08 §intro; notes p.71
- [U08-D3] Three-step forecasting recipe: (1) assume model form, (2) estimate parameters, (3) form predictions — part08 §intro; notes p.71
- [U08-D4] Best linear predictor $X^{\,n}_{n+h}=P_{X_1,\dots,X_n}(X_{n+h})=\sum_{j=1}^n\beta_jX_j$ minimising the prediction MSE among linear combinations; projection operator $P_{X_1,\dots,X_n}(\cdot)$ — part08 def p8-blp; notes p.72 (Def 10.1)
- [U08-D5] $h$-step ahead forecast error $e_n(h)=X_{n+h}-X^{\,n}_{n+h}$; unbiased $\mathbb{E}[e_n(h)]=0$ and $\operatorname{Var}(e_n(h))=P^{\,n}_{n+h}$ — part08 def p8-ferr; notes p.78
- [U08-D6] Three sources of prediction uncertainty: model, estimation, innovation uncertainty — part08 def p8-srcunc; notes p.78 (§10.4)
- [U08-D7] Gaussian $(1-\alpha)$ prediction interval $X^{\,n}_{n+h}\pm z_{1-\alpha/2}\sqrt{\operatorname{Var}(e_n(h))}$ — part08 def p8-pint; notes p.78–79
- [U08-D8] ARIMA$(p,d,q)$ / differenced series $Z_t=\nabla^d X_t$ being ARMA$(p,q)$ — part08 prop p8-arimapred; notes p.76

## Theorems / Propositions / Lemmas / Corollaries (T/P/L/C)
- [U08-L1] Lemma: the conditional expectation $\mathbb{E}[X_{n+h}\mid X_1,\dots,X_n]$ minimises the prediction MSE — part08 lemma p8-condexp; notes p.71 (Lemma 10.1)
- [U08-T1] Theorem (prediction equations, zero-mean stationary): orthogonality $\mathbb{E}[(X_{n+h}-X^{\,n}_{n+h})X_k]=0$, $k=1,\dots,n$, equivalently $\Gamma_n\beta=\gamma_{[h]}$ — part08 thm p8-predeq; notes p.73 (Thm 10.2, eq 10.2)
- [U08-C1] Corollary: matrix solution $X^{\,n}_{n+h}=\gamma_{[h]}^\top\Gamma_n^{-1}X$ and MSE $P^{\,n}_{n+h}=\gamma_0-\gamma_{[h]}^\top\Gamma_n^{-1}\gamma_{[h]}$ when $\Gamma_n$ invertible — part08 cor p8-matsol; notes p.74
- [U08-T2] Theorem (prediction equations with non-zero mean and intercept $\beta_0$): $\Gamma_n\beta=\gamma_{[h]}$, $\beta_0=\mu(1-\beta^\top\mathbf{1}_n)$, $X^{\,n}_{n+h}=\mu+\gamma_{[h]}^\top\Gamma_n^{-1}(X-\mu\mathbf{1}_n)$, same MSE — part08 thm p8-predeqmean; sheet ex10.2
- [U08-T3] Theorem (causal ARMA best linear predictor via $\psi$-weights): $X^{\,n}_{n+h}=\sum_{j=h}^\infty\psi_j\varepsilon_{n+h-j}$ with MSE $\sigma^2\sum_{j=0}^{h-1}\psi_j^2$ — part08 thm p8-armapred; notes p.74 (Thm 10.3)
- [U08-P1] Proposition (limiting behaviour of ARMA forecasts): $X^{\,n}_{n+h}\to\mu$ and $\operatorname{Var}(e_n(h))\to\gamma_0$ as $h\to\infty$ (exponential $\psi_j$ decay) — part08 prop p8-armalimit; notes p.75
- [U08-P2] Proposition (integrated/ARIMA forecasts): $\nabla^d X^{\,n}_{n+h}=Z^{\,n}_{n+h}$; for $d=1$, $X^{\,n}_{n+h}=X_n+\sum_{j=0}^{h-1}Z^{\,n}_{n+h-j}$; drift line $X_n+\alpha h$ if $\mathbb{E}[Z_t]=\alpha\ne0$ — part08 prop p8-arimapred; notes p.76
- [U08-C2] Corollary/result: for ARIMA the prediction MSE diverges, $P^{\,n}_{n+h}\to\infty$ as $h\to\infty$ (no mean reversion) — part08 prop p8-arimapred; notes p.76
- [U08-C3] Result: for SARIMA with $d=D=1$ and $\alpha=0$ the forecast is linear and seasonal in $h$ — part08 prop p8-arimapred; notes p.76

## Named formulas / identities (F)
- [U08-F1] MSE decomposition $\mathbb{E}[(Y-c)^2]=\operatorname{Var}(Y)+(\mu-c)^2$, minimised at $c=\mu$ (bias–variance for a constant) — part08 lemma p8-condexp proof; notes p.72
- [U08-F2] Prediction-equation matrix system $\Gamma_n\beta=\gamma_{[h]}$ with Toeplitz $\Gamma_n=[\gamma_{i-j}]$ and RHS $\gamma_{[h]}=(\gamma_{n+h-1},\dots,\gamma_h)^\top$ — part08 thm p8-predeq; notes p.73 (eq 10.2)
- [U08-F3] Closed-form predictor (zero mean) $X^{\,n}_{n+h}=\gamma_{[h]}^\top\Gamma_n^{-1}X$ — part08 cor p8-matsol; notes p.74
- [U08-F4] Closed-form MSE $P^{\,n}_{n+h}=\gamma_0-\gamma_{[h]}^\top\Gamma_n^{-1}\gamma_{[h]}$ — part08 cor p8-matsol; notes p.74
- [U08-F5] $\psi$-weight predictor $X^{\,n}_{n+h}=\sum_{j=h}^\infty\psi_j\varepsilon_{n+h-j}=\psi_h\varepsilon_n+\psi_{h+1}\varepsilon_{n-1}+\cdots$ — part08 thm p8-armapred; notes p.74
- [U08-F6] Forecast error in $\psi$-form $e_n(h)=\sum_{j=0}^{h-1}\psi_j\varepsilon_{n+h-j}$ — part08 def p8-ferr; notes p.78
- [U08-F7] Innovation forecast-error variance $\operatorname{Var}(e_n(h))=\sigma^2\sum_{j=0}^{h-1}\psi_j^2$ — part08 def p8-ferr / thm p8-armapred; notes p.74,78
- [U08-F8] Gaussian prediction interval formula $X^{\,n}_{n+h}\pm z_{1-\alpha/2}\sqrt{\operatorname{Var}(e_n(h))}$ ($z_{0.975}\approx1.96$) — part08 def p8-pint; notes p.78
- [U08-F9] AR(1) forecast $X^{\,n}_{n+h}=\phi^h X_n$ — part08 ex p8-ar1; notes p.72 (Ex 10.1)
- [U08-F10] AR(1) forecast-error variance $\operatorname{Var}(e_n(h))=\sigma^2\frac{1-\phi^{2h}}{1-\phi^2}\to\gamma_0=\sigma^2/(1-\phi^2)$ — part08 ex p8-ex6
- [U08-F11] MA(1) forecast: $X^{\,n}_{n+1}=\mu-\theta\hat\varepsilon_n$, $X^{\,n}_{n+h}=\mu$ for $h>1$ — part08 ex p8-ma1; notes p.73 (Ex 10.2)
- [U08-F12] Truncated recursive residual recursion $\hat\varepsilon_t=(\tilde X^{\,n}_t-\sum_{i=1}^p\phi_i\tilde X^{\,n}_{t-i})+\sum_{k=1}^q\theta_k\hat\varepsilon_{t-k}$ for $t=1,\dots,n$, else $0$ — part08 keytech p8-ktrec; notes p.75 (eq 10.3)
- [U08-F13] Truncated forecast recursion $\tilde X^{\,n}_{t+h}$ (cases: $t+h>n$ use AR+MA with future $\varepsilon=0$; $t+h\le n$ use $X_{t+h}$; $t+h\le0$ use $0$) — notes p.75 (eq 10.3)
- [U08-F14] ARIMA re-integration for $d=1$: $X^{\,n}_{n+1}=X_n+Z^{\,n}_{n+1}$, $X^{\,n}_{n+h}=X_n+\sum_{j=0}^{h-1}Z^{\,n}_{n+h-j}$ — part08 keytech p8-ktint; notes p.76
- [U08-F15] ARIMA(p,1,q) expanded recursion $X_t=(1+\phi_1)X_{t-1}-(\phi_1-\phi_2)X_{t-2}-(\phi_2-\phi_3)X_{t-3}-\phi_3 X_{t-4}+\varepsilon_t+\theta_1\varepsilon_{t-1}$ (AR$\times$difference expansion) — part08 ex p8-ex4; notes p.75–77
- [U08-F16] Random walk with drift forecast $X^{\,n}_{n+h}=X_n+\alpha h$, $\operatorname{Var}(e_n(h))=h\sigma^2$ — part08 ex p8-ex7
- [U08-F17] Intercept identity $\beta_0=\mu(1-\beta^\top\mathbf{1}_n)$ for non-zero-mean predictor — part08 thm p8-predeqmean; sheet ex10.2

## Methods / techniques / proof-recipes (M)
- [U08-M1] Solving the prediction equations: build Toeplitz $\Gamma_n$, build RHS $\gamma_{[h]}$, solve $\Gamma_n\beta=\gamma_{[h]}$, report MSE — part08 keytech p8-ktpredeq
- [U08-M2] Centring for non-zero mean: replace $X$ by $X-\mu\mathbf{1}_n$, add $\mu$ back; MSE unchanged — part08 keytech p8-ktpredeq / thm p8-predeqmean
- [U08-M3] Causal-ARMA forecast by zeroing future innovations: write $X_{n+h}=\sum\psi_j\varepsilon_{n+h-j}$, set $\varepsilon_{n+1},\dots,\varepsilon_{n+h}=0$, keep past $\hat\varepsilon_s$/observations, replace future obs by forecasts — part08 keytech p8-ktpsi; notes p.74
- [U08-M4] Recursive truncated forecasting recipe (3 steps: isolate $y_t$, shift $t\to n+h$, substitute), running $h=1,2,3,\dots$ — part08 keytech p8-ktrec; notes p.77 (§10.3.1)
- [U08-M5] Re-integrating ARIMA forecasts: difference $d$ times, forecast $Z$, undo differencing (or expand to single unit-root AR polynomial and apply recursive recipe) — part08 keytech p8-ktint; notes p.76–77
- [U08-M6] Building Gaussian prediction intervals: point forecast, get $\psi$-weights from $\Theta(B)/\Phi(B)$, error variance $\sigma^2\sum\psi_j^2$, interval with $z_{1-\alpha/2}$ — part08 keytech p8-ktpi
- [U08-M7] Obtaining $\psi$-weights by matching powers of $B$ in $\Theta(B)/\Phi(B)=\sum_j\psi_jB^j$ — part08 keytech p8-ktpsi/p8-ktpi
- [U08-M8] Proof recipe for prediction equations: orthogonal projection residual uncorrelated with each $X_k$; expand to get row $k$ of $\Gamma_n\beta=\gamma_{[h]}$ — part08 thm p8-predeq proof; sheet ex10.2(e)
- [U08-M9] Proof recipe for $\psi$-weight theorem: any linear predictor "starts at $\varepsilon_n$" $=\sum c_j\varepsilon_{n-j}$; minimise MSE by matching $c_j=\psi_{j+h}$ — part08 thm p8-armapred proof; sheet ex10.3
- [U08-M10] Lemma proof via tower property + conditional MSE minimisation pointwise — part08 lemma p8-condexp proof; notes p.72
- [U08-M11] Shortcut for AR$(p)$, $h=1$, $n\ge p$: $X^{\,n}_{n+1}=\sum_{i=1}^p\phi_iX_{n+1-i}$ (no matrix inversion) — part08 keytech p8-ktpredeq; sheet ex10.1
- [U08-M12] Projection-operator argument: differencing commutes with $P_{X_1,\dots,X_n}$, so $\nabla^d X^{\,n}_{n+h}=Z^{\,n}_{n+h}$; telescoping for $d=1$ — part08 prop p8-arimapred proof; notes p.76

## Key hypotheses / conditions (H)
- [U08-H1] Working assumption: model form and parameters are known / estimated without error (removes model + estimation uncertainty, leaves innovation uncertainty) — part08 def p8-srcunc; notes p.71,78
- [U08-H2] Causality of the ARMA process (roots of $\Phi$ outside unit circle) needed for $MA(\infty)$ representation and exponential $\psi_j$ decay — part08 thm p8-armapred / prop p8-armalimit; notes p.74–75
- [U08-H3] Gaussianity: conditional expectation is linear, so best linear predictor = best (overall) predictor; required for normal prediction intervals — part08 def p8-blp / def p8-pint; notes p.72
- [U08-H4] $\Gamma_n$ invertibility needed for the closed-form $\Gamma_n^{-1}$ solution (holds for invertible ARMA, not all cases); best predictor still unique even if $\Gamma_n$ singular — part08 cor p8-matsol; notes p.74
- [U08-H5] Stationarity (zero-mean / second-order) assumption underlying the prediction-equations theorem; valid for any stationary process — part08 thm p8-predeq; notes p.74
- [U08-H6] Best linear prediction depends only on second-order structure (ACVS $\{\gamma_\tau\}$) — part08 §intro / thm p8-predeq; notes p.73

## Counterexamples / contrasting examples (X)
- [U08-X1] Gaussian AR(1) mean reversion: $X^{\,n}_{n+h}=\phi^h X_n\to0$ (the mean) — general stationary-ARMA property — part08 ex p8-ar1; notes p.72 (Fig 10.1, $\phi=0.8,\sigma^2=1$)
- [U08-X2] MA(1) finite memory: forecast hits the mean immediately for $h>1$ — part08 ex p8-ma1; notes p.73
- [U08-X3] Integrated process (random walk with drift / ARIMA): no mean reversion, interval fans out without bound ($\operatorname{Var}=h\sigma^2$) — contrast with stationary saturation — part08 ex p8-ex7 / prop p8-arimapred; notes p.76

## Pitfalls / remarks (K)
- [U08-K1] Pitfall: an expanded ARIMA$(p,1,q)$ looks like ARMA$(p{+}1,0,q)$ but is NOT stationary (unit root, AR coefficients violate causality); use only as a forecasting recursion — part08 pitfall; notes p.77
- [U08-K2] Remark: width of interval grows with $h$; for stationary ARMA it saturates toward $z_{1-\alpha/2}\sqrt{\gamma_0}$, for ARIMA it grows without bound — part08 intuition (p8-pint) / keytech p8-ktpi; notes p.78
- [U08-K3] Pitfall: MA sign convention — worked example uses $\Theta(B)=1+\theta_1B$ (so forecast picks up $+\theta_1\hat\varepsilon$), whereas general theory uses $\Theta(B)=1-\theta_1B$; signs must match the convention — part08 ex p8-ex4 solution
- [U08-K4] Remark: $\Gamma_n^{-1}$ computation is inefficient for large $n$; Durbin–Levinson and innovations algorithms avoid inversion (Shumway & Stoffer §3.5) — part08 cor p8-matsol; notes p.74
- [U08-K5] Pitfall/remark: truncation (setting pre-sample terms to 0) makes $\tilde X^{\,n}_t$ an approximation; forecast error still estimated by $\sigma^2\sum_{j=0}^{h-1}\psi_j^2$ — part08 keytech p8-ktrec; notes p.75
- [U08-K6] Remark: the two ARMA forecasting views (prediction equations on $\operatorname{span}\{X_1,\dots,X_n\}$ vs $\psi$-weights on innovation span) coincide for invertible ARMA; innovation view easier to compute — part08 intuition (p8-armapred)
- [U08-K7] Remark: in general the conditional expectation is a nonlinear function of the data; restrict to linear predictors needing only the ACVS — part08 def p8-blp / lemma p8-condexp; notes p.72
- [U08-K8] Remark: the MSE of the non-zero-mean predictor is identical to the zero-mean case (mean shift does not affect forecast accuracy) — part08 thm p8-predeqmean; sheet ex10.2(2b)

## Exercise-type schemes (E)
- [U08-E1] One-step AR(2) predictors from 1 obs ($X^{\,1}_2=\rho_1 X_1$) and from 2 obs ($X^{\,2}_3=\phi_1X_2+\phi_2X_1$) using prediction equations / orthogonality — sheet ex10.1; part08 ex p8-ex1
- [U08-E2] Prove the non-zero-mean prediction-equations theorem (MSE in matrix form, solve $\beta_0$, reduce to zero mean, normal equations, equivalence to orthogonality, closed form + MSE) — sheet ex10.2; part08 ex p8-ex2
- [U08-E3] Prove the causal-ARMA $\psi$-weight predictor theorem and its MSE — sheet ex10.3; part08 ex p8-ex3
- [U08-E4] ARIMA(3,1,1) worked truncated forecast: derive 1-, 2-, general $h$-step forecasts and plug fitted values ($\hat\phi$'s, $\hat\theta_1$) for explicit $\hat y_{T+1|T}$, $\hat y_{T+2|T}$ — part08 ex p8-ex4; notes p.75–77
- [U08-E5] One/two/three-step MA(2) forecast with $\psi$-weights, forecast-error variances, and a $95\%$ interval for $X_{n+2}$ — part08 ex p8-ex5
- [U08-E6] Two-step AR(1) forecast, error variances, and verification $\operatorname{Var}(e_n(h))\to\gamma_0$ with interval $\phi^2X_n\pm1.96\,\sigma\sqrt{1+\phi^2}$ — part08 ex p8-ex6
- [U08-E7] Re-integrating a random walk with drift (ARIMA(0,1,0)): $X^{\,n}_{n+h}=X_n+\alpha h$, $\operatorname{Var}(e_n(h))=h\sigma^2$, show MSE diverges — part08 ex p8-ex7

## U09 — Diagnostics & longue mémoire (Ch.11)

# U09 — Diagnostics & longue mémoire — coverage inventory

## Definitions (D)
- [U09-D1] Résidus $e_t=X_t-\hat X_t$ et résidus standardisés $\tilde e_t=e_t/\sqrt{\operatorname{Var}(e_t)}$ — notes p.81 Def 11.1 / part09 def p9-resid
- [U09-D2] Les 4 questions du contrôle de modèle sur les résidus (moyenne nulle constante, variance constante/homoscédasticité, non-corrélation, gaussianité) — notes p.81 / part09 def p9-resid
- [U09-D3] Vérification visuelle de la moyenne : tracer $(t,\tilde e_t)$, pas de tendance, centré sur zéro — notes p.82 / part09 def p9-checks
- [U09-D4] Vérification visuelle de la variance (homoscédasticité) : tracer $(t,\tilde e_t)$, étalement constant (pas de fanning) — notes p.82 / part09 def p9-checks
- [U09-D5] Vérification de la gaussianité par Q-Q plot (quantiles résidus vs quantiles normaux), droite = gaussien ; ne teste que la gaussianité marginale — notes p.83 / part09 def p9-checks
- [U09-D6] Autocorrélation résiduelle d'échantillon $\hat r_\tau=\hat\rho^{(e)}_\tau$ (formule) — notes p.83 / part09 def p9-residacf
- [U09-D7] Corrélogramme des résidus et bande de confiance ponctuelle $(-1.96/\sqrt n,\,1.96/\sqrt n)$ sous l'hypothèse de bruit blanc, $\hat r_\tau\approx\mathcal N(0,1/n)$ — notes p.83 / part09 def p9-residacf
- [U09-D8] Statistique $R^2=1-s_e^2/s_y^2$ (fraction de variance expliquée) — notes p.84 / part09 def p9-r2
- [U09-D9] Critères d'information AIC, AICc, BIC (les trois formules) ; plus petit = meilleur — notes p.84/85 / part09 def p9-ic
- [U09-D10] Nombre de paramètres d'un ARMA$(p,q)$ : $k=p+q+1$ (AR, MA, plus $\sigma^2$) — notes p.84 / part09 def p9-ic
- [U09-D11] Longue mémoire — définition par les covariances : $\gamma_\tau\sim L_\gamma(\tau)\lvert\tau\rvert^{-\alpha}$, $0<\alpha<1$, $L_\gamma$ à variation lente — notes p.87 / part09 def p9-lmcov
- [U09-D12] Longue mémoire — définition spectrale : $S(f)\sim L_S(f)\lvert f\rvert^{\alpha-1}$ quand $f\to0$ ; pôle spectral en 0 — notes p.87 / part09 def p9-lmspec
- [U09-D13] Les trois régimes selon $\alpha\in(0,2)$ : longue mémoire ($0<\alpha<1$), dépendance courte ($\alpha=1$), anti-persistance ($1<\alpha<2$) — notes p.87 / part09 def p9-lmcov, def p9-lmspec
- [U09-D14] Opérateur de différenciation fractionnaire $(1-B)^d$ via développement binomial / fonctions Gamma — notes p.86/88 / part09 def p9-farima
- [U09-D15] Processus fractionnairement différencié (pur) $(1-B)^dX_t=\varepsilon_t$ comme processus de longue mémoire le plus simple — notes p.86 / part09 def p9-farima
- [U09-D16] Classe FARIMA : $(1-B)^d\phi(B)X_t=\psi(B)\varepsilon_t$, $d=(1-\alpha)/2\in(-0.5,0.5)$, racines de $\phi,\psi$ hors du cercle unité — notes p.88 / part09 def p9-farima
- [U09-D17] Auto-similarité : $Y_{ct}\overset{d}{=}c^H Y_t$ pour tout $c>0$ ; $H$ = exposant de Hurst — notes p.88 / part09 def p9-fbm
- [U09-D18] Mouvement brownien fractionnaire $B_H(t)$ : processus gaussien de covariance $(\star)$ ; seul processus gaussien auto-similaire — notes p.89 / part09 def p9-fbm
- [U09-D19] Bruit gaussien fractionnaire $X_t=B_H(t)-B_H(t-1)$ (processus d'incréments du fBm) — notes p.89 / part09 def p9-fbm
- [U09-D20] Dimension fractale (Hausdorff) du graphe de $B_H$ : $D=2-H$ ; propriété locale vs dépendance longue portée (globale) — notes p.88 / part09 def p9-fbm

## Theorems / Propositions / Lemmas / Corollaries (T/P/L/C)
- [U09-P1] Résidus d'un AR(1) correctement spécifié : $e_t=X_t-\phi X_{t-1}=\varepsilon_t$ (les résidus reproduisent le bruit) — notes p.81 Ex 11.1 / part09 prop p9-ar1res
- [U09-P2] Statistique de Box-Pierce $Q_m=n\sum_{\tau=1}^m\hat r_\tau^2$ ; sous $H_0$, $Q_m\approx\chi^2_{m-p-q}$ pour un ARMA$(p,q)$ — notes p.83 Prop 11.1 / part09 prop p9-boxpierce
- [U09-P3] Statistique de Ljung-Box $Q_m=n(n+2)\sum_{\tau=1}^m\hat r_\tau^2/(n-\tau)$ ; sous $H_0$, $\chi^2_{m-p-q}$ ; correction petit échantillon — notes p.84 Prop 11.2 / part09 prop p9-ljungbox
- [U09-P4] Danger du $R^2$ : pour un AR(1), $R^2=\phi^2$ (plafonné), via $s_y^2=\sigma^2/(1-\phi^2)$ et $s_e^2=\sigma^2$ — notes p.85 / part09 prop p9-r2danger
- [U09-P5] Écart AIC vs AICc : $\mathrm{AICc}-\mathrm{AIC}=2k(n/(n-k-1)-1)=2k(k+1)/(n-k-1)>0$ — part09 prop p9-aicgap / sheet ex11.1
- [U09-P6] Pénalité BIC > pénalité AIC ssi $\log n>2\iff n>e^2\approx7.39$ — notes p.84 / part09 prop p9-bicpen / sheet ex11.4
- [U09-P7] Inflation de $\operatorname{Var}(\bar X)$ en longue mémoire : $\operatorname{Var}(\bar X)\sim c/n^\alpha$ ($0<\alpha<1$), plus lent que $1/n$ — notes p.86 / part09 prop p9-varxbar
- [U09-P8] Cas spectre absolument continu : $\operatorname{Var}(\bar X)\sim S(0)/n$ avec $S(0)=\sum_\tau\gamma_\tau<\infty$ (taux classique $1/n$) — notes p.86 / part09 prop p9-varxbar
- [U09-T1] Densité spectrale d'un FARIMA : $S(f)=\sigma_\varepsilon^2\frac{\lvert\psi\rvert^2}{\lvert\phi\rvert^2}\lvert 1-e^{-2\pi i f}\rvert^{-2d}\sim c_f\lvert f\rvert^{-2d}$ près de 0, $c_f=\sigma_\varepsilon^2\lvert\psi(1)\rvert^2/\lvert\phi(1)\rvert^2$ — notes p.88 / part09 thm p9-farimaspec
- [U09-P9] Estimation de $d$ par le périodogramme (idée log-périodogramme/GPH) : $\log I(f_j)\approx\text{const}-2d\log\lvert f_j\rvert+\text{erreur}$ — notes p.89 / part09 prop p9-gph

## Named formulas & identities (F)
- [U09-F1] Covariance d'auto-similarité à incréments stationnaires : $\operatorname{Cov}(Y_t,Y_s)=\frac{\sigma^2}{2}(\lvert t\rvert^{2H}+\lvert s\rvert^{2H}-\lvert t-s\rvert^{2H})$ ($\star$) — notes p.88 (11.1) / part09 def p9-fbm
- [U09-F2] ACVS du bruit gaussien fractionnaire : $\gamma_X(\tau)=\frac{\sigma^2}{2}(\lvert\tau+1\rvert^{2H}-2\lvert\tau\rvert^{2H}+\lvert\tau-1\rvert^{2H})\sim H(2H-1)\lvert\tau\rvert^{2H-2}$ — notes p.88 / part09 def p9-fbm
- [U09-F3] Liens entre fonctions à variation lente : $L_S(f)=2\gamma(0)\Gamma(1-\alpha)\sin(\pi\alpha/2)$ et $L_\gamma(\tau)=2\Gamma(\alpha)\sin(\pi(1-\alpha)/2)$ — notes p.87 / part09 def p9-lmspec
- [U09-F4] Conversions des paramètres : $d=(1-\alpha)/2$, $H=d+\tfrac12=1-\alpha/2$ — part09 keytech p9-ktregime
- [U09-F5] Incrément AICc d'un paramètre supplémentaire : $\Delta_{\mathrm{AICc}}=2+\frac{2k(k+1)}{n-k-1}-\frac{2(k-1)k}{n-k}\,(>2)$ — part09 keytech p9-ktic
- [U09-F6] Variance et auto-covariance de l'AR(1) servant au $R^2$ : $s_y^2=\sigma^2/(1-\phi^2)$, $s_e^2=\sigma^2$ — notes p.85 / part09 prop p9-r2danger

## Methods / techniques / proof-recipes (M)
- [U09-M1] Exécuter un test de Ljung-Box (calculer $\hat r_\tau$, former $Q_m$, df$=m-p-q$, comparer à $\chi^2$ via qchisq, décision rejet/non-rejet) — part09 keytech p9-ktljung
- [U09-M2] Choisir entre AIC, AICc et BIC (AICc petit $n$/$k$ grand, BIC parcimonie/cohérence, AIC prédiction) — part09 keytech p9-ktic
- [U09-M3] Boucle Box-Jenkins : Identifier → Estimer → Diagnostiquer → Utiliser (itérative) — notes p.85 / part09 keytech p9-ktboxjenkins
- [U09-M4] Choisir $d$ : tracer les données, différencier si non-stationnaire, plus petit ordre de différenciation qui stabilise — notes p.86 / part09 keytech p9-ktboxjenkins
- [U09-M5] Identifier $p,q$ via coupures ACF/PACF (table : AR cut PACF / MA cut ACF / ARMA décroissent / non-stationnaire = décroissance très lente) — notes p.86 / part09 keytech p9-ktidentify
- [U09-M6] Lire le régime de longue mémoire depuis $\alpha$ (ou $d$ ou $H$) + signatures de $S(0)$ et $\sum\gamma_\tau$ — part09 keytech p9-ktregime
- [U09-M7] Estimer $d$ par régression log-log du périodogramme sur les basses fréquences (slope $=\alpha-1=-2d$) — notes p.89 / part09 prop p9-gph

## Crucial hypotheses / conditions (H)
- [U09-H1] Degrés de liberté du portmanteau = $m-p-q$ (soustraire les paramètres ARMA estimés, PAS $\sigma^2$) ; exiger $m>p+q$ — notes p.83/84 / part09 pitfall, prop p9-ljungbox
- [U09-H2] Conditions du FARIMA : $\varepsilon_t$ iid centrés, $\sigma_\varepsilon^2>0$, racines de $\phi,\psi$ hors du cercle unité, $d\in(-0.5,0.5)$ pour la stationnarité — notes p.88 / part09 def p9-farima
- [U09-H3] Hypothèse de variation lente de $L_\gamma$ et $L_S$, et plage $0<\alpha<1$ pour la longue mémoire — notes p.87 / part09 def p9-lmcov, def p9-lmspec
- [U09-H4] Signatures par régime : longue mémoire $\Rightarrow S(0)=\infty,\sum\gamma_\tau=\infty$ ; anti-persistance $\Rightarrow S(0)=0,\sum_k\gamma_k=0$ ; courte portée $\Rightarrow S(0)$ fini non nul (ARMA) — notes p.87/88 / part09 keytech p9-ktregime
- [U09-H5] Auto-similarité + incréments stationnaires force la structure de covariance $(\star)$ — notes p.88 / part09 def p9-fbm

## Counterexamples (X)
- [U09-X1] $B_{1/2}$ = mouvement brownien standard : $H=\tfrac12$, $d=0$, $\alpha=1$ ; incréments = bruit blanc non corrélé (frontière sans mémoire) — sheet ex11.8(c) / part09 ex p9-ex8
- [U09-X2] ARMA comme contre-exemple à la longue mémoire : covariances compactes ($\gamma_\tau=0$ si $\lvert\tau\rvert>q$) ou exponentielles ($\gamma_\tau\sim\lvert\phi\rvert^\tau$), $S(0)$ fini — notes p.86/87 / part09 def p9-lmcov
- [U09-X3] Dimension fractale (locale) et longue mémoire (globale) peuvent être rendues complètement indépendantes — notes p.88 / part09 def p9-fbm

## Pitfalls / remarks (K)
- [U09-K1] Q-Q plot ne contrôle que la gaussianité MARGINALE (pas conjointe) — notes p.83 / part09 def p9-checks
- [U09-K2] $R^2$ est un critère dangereux : plus de paramètres ⇒ $R^2$ augmente toujours ; même le vrai modèle a un $R^2$ borné ⇒ utiliser les critères d'information — notes p.84/85 / part09 def p9-r2, prop p9-r2danger
- [U09-K3] AIC surestime $p$ ; AICc (Hurvich-Tsai 1989) corrige le biais petit échantillon et $\to$ AIC quand $n\to\infty$ — notes p.84 / part09 def p9-ic
- [U09-K4] BIC pénalise plus (cohérent/parcimonieux), AIC plus permissif (sur-ajustement) ; choix selon objectif — notes p.84 / part09 prop p9-bicpen, keytech p9-ktic
- [U09-K5] Approximation $\chi^2$ de Box-Pierce médiocre aux tailles réalistes ⇒ préférer Ljung-Box en pratique (R: Box.test type Ljung-Box) — notes p.84 / part09 prop p9-ljungbox
- [U09-K6] Empreinte empirique de la longue mémoire (Smith 1938) : moyennes convergent plus lentement, erreurs-types naïves $\sqrt{S(0)/n}$ trop petites — notes p.86 / part09 prop p9-varxbar
- [U09-K7] En GPH, prendre le $\log$ AVANT l'espérance : $\mathbb E\log I\ne\log\mathbb E I$ ; le périodogramme est asymptotiquement non biaisé mais non consistant — notes p.89 / part09 prop p9-gph
- [U09-K8] Choix de $m$ : assez grand pour capter les lags d'intérêt mais pas trop (hauts lags estimés sur peu de paires = bruit) — notes p.84 / part09 pitfall
- [U09-K9] Intuition du pôle spectral : différenciation fractionnaire négative $(1-B)^{-|d|}$ crée un pôle léger en $f=0$ ; longue mémoire = « un peu non-stationnaire » mais stationnaire si $d<1/2$ — part09 intuition (p9-farimaspec)

## Exercise-type schemes (E)
- [U09-E1] Conditions d'équivalence AIC ≈ AICc ($k$ fixe et $n\to\infty$, ou $k_n^2/n\to0$) — sheet ex11.1 / part09 ex p9-ex1
- [U09-E2] Forme de l'AICc quand $m$ coefficients AR/MA sont fixés à zéro : $k=p+q+1-m$ — sheet ex11.2 / part09 ex p9-ex2
- [U09-E3] Calculer $Q_4$ (Ljung-Box) et tester $H_0$ à 5% (df, valeur critique via qchisq, conclusion ; effet du choix AR(1) vs ARMA(1,1)) — sheet ex11.3 / part09 ex p9-ex3
- [U09-E4] Comparaison des pénalités AIC vs BIC : montrer le seuil $n>e^2$ et déterminer quel critère choisit le plus grand modèle — sheet ex11.4 / part09 ex p9-ex4
- [U09-E5] Box-Pierce vs Ljung-Box sur les mêmes données : calculer $Q_4^{BP}=n\sum\hat r_\tau^2$ et comparer la décision — part09 ex p9-ex5 [Nouveau]
- [U09-E6] $R^2$ d'un AR(1) fitté ($R^2=\phi^2$) et juger une amélioration apparente via critères d'information — part09 ex p9-ex6 [Nouveau]
- [U09-E7] Classer un processus par son paramètre de longue mémoire (trouver $\alpha,d,H$ ; régime ; sommabilité de $\sum\gamma_\tau$ ; comportement de $S(f)$ en 0) — part09 ex p9-ex7 [Nouveau]
- [U09-E8] Variance de $B_H$ et scaling d'auto-similarité ($\operatorname{Var}(B_H(t))=\sigma^2\lvert t\rvert^{2H}$, vérification de $B_H(ct)\overset{d}{=}c^H B_H(t)$, cas $H=1/2$) — part09 ex p9-ex8 [Nouveau]

## U10 — ARCH/GARCH (Ch.12)

# U10 — ARCH / GARCH — Coverage Inventory

## Definitions (D)
- [U10-D1] Log-returns $r_t=\log(X_t/X_{t-1})=\log X_t-\log X_{t-1}$, measuring relative price changes — notes p.90 §12.1; part10 def p10-logret
- [U10-D2] Empirical stylised facts of log-returns: little linear dependence (ACF/PACF ≈ white noise), dependent squares (slow-decaying ACF/PACF of $r_t^2$), fat tails (kurtosis >3, QQ-plot vs N(0,1)) — notes p.90–91 §12.1; part10 def p10-logret
- [U10-D3] Volatility clustering: large changes followed by large, small by small (time-varying conditional variance) — notes p.91 §12.1; part10 def p10-logret
- [U10-D4] ARCH(1) model: $r_t=\sigma_t\eps_t$, $\sigma_t^2=\alpha_0+\alpha_1 r_{t-1}^2$, with $\eps_t$ WN(0,1) indep of $\mathcal F_{t-1}$, $\alpha_0>0,\alpha_1\ge0$, $\sigma_t$ $\mathcal F_{t-1}$-measurable — notes p.91 §12.2 Def 12.1; part10 def p10-arch1
- [U10-D5] ARCH(p) model: $\sigma_t^2=\alpha_0+\sum_{j=1}^p\alpha_j r_{t-j}^2$, $\alpha_0>0,\alpha_p>0,\alpha_j\ge0$ — notes p.97 §12.2 Def 12.2; part10 def p10-archp
- [U10-D6] GARCH(p,q) model: $\sigma_t^2=\alpha_0+\sum_{j=1}^p\alpha_j r_{t-j}^2+\sum_{j=1}^q\beta_j\sigma_{t-j}^2$, $\alpha_0,\alpha_p,\beta_q>0$, others $\ge0$; GARCH(p,0)=ARCH(p) — notes p.98 §12.2 Def 12.3; part10 def p10-garch
- [U10-D7] $\mathcal F_t$ = information available up to and including time $t$; $\sigma_t$ is $\mathcal F_{t-1}$-measurable (volatility known one step ahead) — notes p.92 §12.2; part10 def p10-arch1
- [U10-D8] Standardised residuals $\tilde e_t=r_t/\hat\sigma_t$ (diagnostics): if model correct, ACF/PACF of $\tilde e_t$ AND of $\tilde e_t^2$ ≈ WN, QQ-plot ≈ straight — notes p.100–102 §12.3; part10 def p10-resid
- [U10-D9] ARMA–GARCH model: $X_t=\sum_{j=1}^p\phi_j X_{t-j}-\sum_{k=0}^q\theta_k r_{t-k}$, $\theta_0=-1$, with $r_t$ a GARCH process serving as ARMA innovation — notes p.103 §12.3; part10 def p10-armagarch

## Theorems / Propositions / Lemmas / Corollaries (T/P/L/C)
- [U10-P1] Conditional mean of ARCH/GARCH: $\E[r_t\mid\mathcal F_{t-1}]=0$ — notes p.92 §12.2; part10 prop p10-archmoments
- [U10-P2] Conditional variance: $\Var(r_t\mid\mathcal F_{t-1})=\sigma_t^2$ (ARCH(1): $=\alpha_0+\alpha_1 r_{t-1}^2$); holds for ARCH(p) and GARCH too — notes p.92,97,98 §12.2; part10 prop p10-archmoments
- [U10-P3] Unconditional mean of ARCH(1): $\E[r_t]=0$ (iterated expectation) — notes p.92 §12.2; part10 prop p10-archmoments
- [U10-P4] Unconditional variance of ARCH(1): $\Var(r_t)=\alpha_0/(1-\alpha_1)$ under $\alpha_1<1$ — notes p.92 §12.2; part10 prop p10-archmoments
- [U10-P5] ARCH/GARCH is white noise: $\E[r_t]=0$ and $\Cov(r_{t+\tau},r_t)=\Corr(r_{t+\tau},r_t)=0$ for $\tau\ne0$ (uncorrelated despite dependent volatility) — notes p.92–93 §12.2; part10 prop p10-whitenoise
- [U10-T1] Isserlis' theorem (Wick formula): for zero-mean MVN with even $N$, $\E[X_1\cdots X_N]=\sum_{p\in P_N}\prod_{\{i,j\}\in p}\Cov(X_i,X_j)$ (sum over pairings) — notes p.93 §12.2 Thm 12.1; part10 thm p10-isserlis
- [U10-T2] Isserlis special case N=4: $\E[X_1X_2X_3X_4]=\E[X_1X_2]\E[X_3X_4]+\E[X_1X_3]\E[X_2X_4]+\E[X_1X_4]\E[X_2X_3]$ — notes p.93 §12.2; part10 thm p10-isserlis
- [U10-C1] Corollary of Isserlis for std Gaussian: $\E[\eps_t^4]=3(\E[\eps_t^2])^2=3$ — notes p.93 §12.2; part10 thm p10-isserlis
- [U10-P6] Fourth moment of ARCH(1) (Gaussian): finite iff $0\le\alpha_1^2<1/3$, with $\E[r_t^4]=\dfrac{3\alpha_0^2(1+\alpha_1)}{(1-\alpha_1)(1-3\alpha_1^2)}$ — notes p.93–94 §12.2; part10 prop p10-kurtosis
- [U10-P7] Kurtosis of ARCH(1) (Gaussian): $\kappa=\E[r_t^4]/\Var(r_t)^2=\dfrac{3(1-\alpha_1^2)}{1-3\alpha_1^2}>3$ for $\alpha_1>0$ — notes p.94 §12.2; part10 prop p10-kurtosis
- [U10-P8] ACF of squares of ARCH(1): $\Corr(r_{t+\tau}^2,r_t^2)=\alpha_1^{|\tau|}$ (geometric decay), under $0<\alpha_1<1/\sqrt3$ — notes p.94 §12.2; part10 prop p10-acfsq; sheet ex12.3
- [U10-P9] Stationarity of GARCH(p,q): weakly stationary solution iff $\sum_{j=1}^p\alpha_j+\sum_{j=1}^q\beta_j<1$ — notes p.98 §12.2 Prop 12.2; part10 prop p10-garchstat
- [U10-P10] Unconditional variance of GARCH(p,q): $\Var(r_t)=\dfrac{\alpha_0}{1-\sum_j\alpha_j-\sum_j\beta_j}$ — notes p.98 §12.2 Prop 12.2; part10 prop p10-garchstat
- [U10-P11] Strict vs weak stationarity for GARCH: $\sum\alpha+\sum\beta<1$ sufficient for strict stationarity; boundary $\sum\alpha+\sum\beta=1$ admits strictly (not weakly) stationary solution for some noise laws incl. Gaussian (IGARCH) — notes p.98–99 §12.2; part10 prop p10-garchstat
- [U10-P12] Fourth-moment condition for GARCH(1,1) (Gaussian): $\E[r_t^4]$ exists iff $3\alpha_1^2+2\alpha_1\beta_1+\beta_1^2<1$ — notes p.98 §12.2; part10 prop p10-garch4
- [U10-P13] MLE conditional likelihood factorisation: $L_c(\theta\mid r_1,\dots,r_n)=\prod_{t=2}^n f(r_t\mid r_{t-1},\dots,r_1;\theta)$ (condition on $r_1$) — notes p.94–95 §12.2; part10 prop p10-mle
- [U10-P14] Conditional normality under Gaussian innovations: $r_t\mid\mathcal F_{t-1}\sim\mathcal N(0,\sigma_t^2)$; ARCH(1): $\mathcal N(0,\alpha_0+\alpha_1 r_{t-1}^2)$ — notes p.95 §12.2; part10 prop p10-mle

## Named Formulas & Identities (F)
- [U10-F1] Log-return formula $r_t=\log(X_t/X_{t-1})$ — notes p.90; part10 def p10-logret
- [U10-F2] ARCH(1) variance recursion $\sigma_t^2=\alpha_0+\alpha_1 r_{t-1}^2$ — notes p.91; part10 def p10-arch1
- [U10-F3] ARCH(1) explicit likelihood $L_c=\prod_{t=2}^n\frac{1}{\sqrt{2\pi(\alpha_0+\alpha_1 r_{t-1}^2)}}\exp(-\frac{r_t^2}{2(\alpha_0+\alpha_1 r_{t-1}^2)})$ — notes p.95 §12.2; part10 prop p10-mle
- [U10-F4] (G)ARCH log-likelihood $\log L_c=-\tfrac12\sum_t[\log(2\pi\sigma_t^2)+r_t^2/\sigma_t^2]$ — part10 keytech p10-ktmle / intuition
- [U10-F5] GARCH(1,1) as ARCH(∞): $\sigma_t^2=\dfrac{\alpha_0}{1-\beta_1}+\alpha_1\sum_{k=0}^\infty\beta_1^k r_{t-1-k}^2$ (coeffs $\alpha_1\beta_1^k$, geometric decay), valid $0\le\beta_1<1$ — part10 exo p10-e7
- [U10-F6] In-sample predictive band under Gaussian innovations: $\pm1.96\,\hat\sigma_t$ on $r_t$ — notes p.100 §12.3; part10 def p10-resid
- [U10-F7] Special-case unconditional variances: ARCH(1) $\alpha_0/(1-\alpha_1)$; ARCH(p) $\alpha_0/(1-\sum_{j=1}^p\alpha_j)$; GARCH(1,1) $\alpha_0/(1-\alpha_1-\beta_1)$ — part10 keytech p10-ktvar
- [U10-F8] One-step conditional variance forecast ARCH(1): $\sigma_{t+1}^2=\alpha_0+\alpha_1 r_t^2$ — part10 exo p10-e6

## Methods / Techniques / Proof-recipes (M)
- [U10-M1] Unconditional variance & stationarity of any (G)ARCH: take unconditional expectation of $\sigma_t^2$ recursion, set $\E[r_{t-j}^2]=\E[\sigma_{t-j}^2]=\Var(r_t)=:v$, solve $v=\alpha_0+(\sum\alpha+\sum\beta)v$; positivity ⇔ $\sum\alpha+\sum\beta<1$ — part10 keytech p10-ktvar; notes p.92,98
- [U10-M2] Prove uncorrelatedness via $\mathcal F_{t-1}$-measurability: $\Cov(r_{t+\tau},r_t)=\E[r_{t+\tau}r_t]$, condition on $\mathcal F_{t+\tau-1}$, pull out measurable $r_t,\sigma_{t+\tau}$, use $\E[\eps_{t+\tau}\mid\cdot]=0$ — part10 keytech p10-ktwn; notes p.92–93; sheet ex12.2
- [U10-M3] Geometric recursion for ACF of squares: condition on $\mathcal F_{t+\tau-1}$ using $\E[\eps^2\mid\cdot]=1$, get $C_\tau=\alpha_1 C_{\tau-1}$ (constant terms cancel via $\E[r_t^2]=\alpha_0/(1-\alpha_1)$), iterate — part10 keytech p10-ktacfsq; sheet ex12.3
- [U10-M4] Fourth-moment computation via Isserlis: $\E[r_t^4\mid\mathcal F_{t-1}]=3\sigma_t^4=3(\alpha_0+\alpha_1 r_{t-1}^2)^2$, take expectation, substitute $\E[r_{t-1}^2]$ and $\E[r_{t-1}^4]=\E[r_t^4]$, solve linear equation — notes p.93–94; part10 prop p10-kurtosis
- [U10-M5] Set up conditional-Gaussian (G)ARCH MLE: use $r_t\mid\mathcal F_{t-1}\sim\mathcal N(0,\sigma_t^2)$, condition on initial values to seed recursion, maximise log-likelihood numerically subject to positivity and $\sum\alpha+\sum\beta<1$ — part10 keytech p10-ktmle; notes p.94–95
- [U10-M6] Diagnostic workflow for fitted (G)ARCH: check ACF/PACF of std residuals $\tilde e_t$ and of $\tilde e_t^2$ ≈ WN, QQ-plot vs innovation law, overlay $\pm1.96\hat\sigma_t$ bands — notes p.100–102 §12.3; part10 def p10-resid
- [U10-M7] Iterate GARCH(1,1) recursion to obtain ARCH(∞) representation (back-substitute $\sigma_{t-1}^2$ repeatedly, sum geometric series) — part10 exo p10-e7

## Crucial Hypotheses / Conditions (H)
- [U10-H1] $\{\eps_t\}$ white noise mean 0 variance 1, independent of $\mathcal F_{t-1}$; $\sigma_t$ $\mathcal F_{t-1}$-measurable — notes p.91–92; part10 def p10-arch1
- [U10-H2] Parameter positivity (non-negativity to avoid negative variance): $\alpha_0>0$, $\alpha_p>0$, $\beta_q>0$, all other $\alpha_j,\beta_j\ge0$ — notes p.97–98; sheet ex12.2; part10 defs
- [U10-H3] Variance-stationarity threshold: ARCH(1) needs $\alpha_1<1$ (necessary AND sufficient for ARCH(1)) — notes p.92; part10 prop p10-archmoments
- [U10-H4] Fourth-moment / finite-kurtosis threshold ARCH(1): $\alpha_1^2<1/3$ (i.e. $\alpha_1<1/\sqrt3\approx0.577$), strictly tighter than $\alpha_1<1$ — notes p.94; part10 prop p10-kurtosis / intuition
- [U10-H5] GARCH stationarity master condition $\sum_{j=1}^p\alpha_j+\sum_{j=1}^q\beta_j<1$ (must hold for fitted parameters) — notes p.98; part10 prop p10-garchstat
- [U10-H6] GARCH(1,1) fourth-moment condition $3\alpha_1^2+2\alpha_1\beta_1+\beta_1^2<1$ — notes p.98; part10 prop p10-garch4
- [U10-H7] Gaussian innovations needed to apply Isserlis ($\E[\eps^4]=3$) for the kurtosis/4th-moment formulas — notes p.93; part10 thm p10-isserlis

## Important Counterexamples / Special Cases (X)
- [U10-X1] ARCH(1) is uncorrelated but NOT independent: $\Corr(r_{t+\tau},r_t)=0$ yet $\Corr(r_{t+\tau}^2,r_t^2)=\alpha_1^{|\tau|}\ne0$ — notes p.92–94; part10 pitfall
- [U10-X2] ARCH(1) fitted to S&P 500 fails: simulated ACF/PACF of squares does not match data (motivates GARCH; ARCH(1) cannot sustain long high-volatility regimes) — notes p.95–97 §12.2
- [U10-X3] IGARCH boundary case $\sum\alpha+\sum\beta=1$: strictly stationary but NOT weakly stationary (Gaussian and some other noises) — notes p.99; part10 prop p10-garchstat

## Pitfalls / Remarks (K)
- [U10-K1] Do not confuse the two thresholds: $\alpha_1<1$ (finite variance) vs the stronger $\alpha_1^2<1/3$ / $3\alpha_1^2+2\alpha_1\beta_1+\beta_1^2<1$ (finite 4th moment) — part10 pitfall; notes p.94
- [U10-K2] "White noise" ≠ "no structure": ARCH/GARCH leave linear correlation flat but create strong nonlinear dependence in squares — part10 pitfall/prop p10-whitenoise
- [U10-K3] As $\alpha_1\uparrow1/\sqrt3$ kurtosis $\to\infty$ (more ARCH effect ⇒ heavier tails); $\kappa\to3$ as $\alpha_1\to0$ — notes p.94; part10 intuition / exo p10-e5
- [U10-K4] GARCH(1,1) fits often have $\alpha_1+\beta_1$ close to 1 = highly persistent volatility (long memory) but still geometric decay — notes p.98,100; part10 intuition / exo p10-e4
- [U10-K5] ARMA–GARCH: cannot assume iid Gaussian errors any more — careful with the likelihood — notes p.103; part10 def p10-armagarch
- [U10-K6] Limitations (cons): positive/negative shocks affect volatility symmetrically (no leverage effect); volatility dependence decays only geometrically (often too fast for real markets); extensions EGARCH/GJR-GARCH out of scope — notes p.102; part10 intuition (pros & cons)
- [U10-K7] Why feed back $\sigma_{t-1}^2$: ARCH(1) collapses $\sigma_t^2$ to $\alpha_0$ after one quiet day; GARCH's $\beta_1\sigma_{t-1}^2$ makes volatility sticky/persistent parsimoniously — notes p.97–98; part10 intuition
- [U10-K8] Reading the (G)ARCH likelihood: trade-off between $\log\sigma_t^2$ penalty (don't inflate variance) and $r_t^2/\sigma_t^2$ term (explain big returns with big variance) = volatility tracking — part10 intuition (reading the likelihood)

## Exercise-type Schemes (E)
- [U10-E1] ARCH(2): compute $\E[r_t]$ (iterated expectation), marginal $\Var(r_t)=\beta_0/(1-\beta_1-\beta_2)$ via law of total variance, necessary stationarity conditions $\beta_0>0,\beta_1+\beta_2<1$ — sheet ex12.1; part10 exo p10-e1
- [U10-E2] Prove GARCH(m,r) is zero-mean and uncorrelated ($\Corr(r_{t+\tau},r_t)=0$) via $\mathcal F$-measurability — sheet ex12.2; part10 exo p10-e2
- [U10-E3] Prove ARCH(1) ACF of squares $\Corr(r_{t+\tau}^2,r_t^2)=\alpha_1^{|\tau|}$ (full recursion with cancellation of constant terms) — sheet ex12.3; part10 exo p10-e3
- [U10-E4] GARCH(1,1) numeric check: verify stationarity ($\alpha_1+\beta_1<1$), compute unconditional variance & daily volatility, check 4th-moment condition, comment on persistence (S&P 500 fit $\alpha_0=3.686\times10^{-6},\alpha_1=0.1713,\beta_1=0.7897$) — part10 exo p10-e4
- [U10-E5] Recover ARCH(1) $\alpha_1$ from given kurtosis (invert $\kappa=3(1-\alpha_1^2)/(1-3\alpha_1^2)$, e.g. $\kappa=9\Rightarrow\alpha_1=1/2$); no finite upper bound on attainable kurtosis — part10 exo p10-e5
- [U10-E6] ARCH(1) one-step variance forecast $\sigma_{t+1}^2=\alpha_0+\alpha_1 r_t^2$, 95% predictive band $\pm1.96\sigma_{t+1}$, compare to unconditional band, check 4th-moment & compute kurtosis — part10 exo p10-e6
- [U10-E7] Explain (qualitatively + recursion algebra) why GARCH(1,1) mimics ARCH(∞) with geometric coeffs and is more parsimonious than ARCH(p) — part10 exo p10-e7

## U11 — Filtres LTI (Ch.13)

# U11 — Filtres LTI — Coverage inventory

## Definitions (D)
- [U11-D1] Complex-valued time series $X_t=U_t+iV_t$ with real $\{U_t\},\{V_t\}$ and mean $\E[X_t]=\E[U_t]+i\E[V_t]$ — notes p.103 §13.1; part11 def p11-complex
- [U11-D2] Autocovariance of a complex time series with conjugate on the SECOND factor: $\gamma^{(X)}_\tau=\Cov(X_{t+\tau},X_t)=\E[(X_{t+\tau}-\mu)\overline{(X_t-\mu)}]$ (reduces to usual ACVS when real) — notes p.103 §13.1; part11 def p11-complex
- [U11-D3] Digital filter: a map turning input sequence $\{X_t\}$ into output $\{Y_t\}=\filt[\{X_t\}]$ over index set $\Ints$ ("filter" = digital filter in this course) — notes p.103 §13.1; part11 def p11-filter
- [U11-D4] Output-entry notation: time index written AFTER the bracket, $Y_u=\filt[\{X_t\}]_u$; the $t$ in $\{X_t\}$ is a dummy, the $u$ has meaning — notes p.103 §13.1; part11 def p11-filter
- [U11-D5] Linear time-invariant (LTI) filter: (1) linearity $\filt[\{\alpha X_t+Y_t\}]=\alpha\filt[\{X_t\}]+\filt[\{Y_t\}]$, (2) time invariance $\filt[\Bsh[\{X_t\}]]=\Bsh[\filt[\{X_t\}]]$ — notes p.104 Def 13.1; part11 def p11-lti
- [U11-D6] Impulse sequence $\{\delta_{t,m}\}$: $\delta_{t,m}=1$ if $t=m$, else $0$ — notes p.105 §13.2.1; part11 def p11-impulse
- [U11-D7] Impulse response sequence $\{h_m\}$ of an LTI filter: $h_m=\filt[\{\delta_{t,-m}\}]_0$ (the $0$ is the output time index) — notes p.105 Def 13.2; part11 def p11-impulse
- [U11-D8] Complex wave test sequence $\{\xi_{t,f}\}$ with $\xi_{t,f}=e^{2\pi i f t}$, $f\in\Reals$ — notes p.107 §13.2.2; part11 def p11-transfer
- [U11-D9] Transfer function of an LTI filter: $H(f)=\filt[\{\xi_{t,f}\}]_0$, $f\in\Reals$ (encodes frequency-domain re-weighting of amplitude/phase) — notes p.107 Def 13.3; part11 def p11-transfer
- [U11-D10] Cascaded (composed) filter: $\filt=\filt_1\filt_2$ with $\filt[\{X_t\}]=\filt_1[\filt_2[\{X_t\}]]$ — notes p.105 Prop 13.2; part11 prop p11-cascade

## Theorems / Propositions / Lemmas / Corollaries (T/P/L)
- [U11-P1] Linear combination of LTI filters is LTI: $\filt=\alpha\filt_1+\filt_2$ is LTI ($\alpha\in\Comp$) — notes p.105 Prop 13.1; part11 prop p11-lincomb
- [U11-P2] Cascade of two LTI filters $\filt=\filt_1\filt_2$ is LTI — notes p.105 Prop 13.2; part11 prop p11-cascade
- [U11-T1] LTI filter $\Leftrightarrow$ convolution with impulse response: $\filt[\{X_t\}]_u \ms \sum_{m\in\Ints} h_{u-m}X_m$; conversely any such convolution filter is LTI — notes p.106 Thm 13.3; part11 thm p11-conv
- [U11-T2] Complex waves are eigensequences of any applicable LTI filter, with eigenvalue $H(f)$: $\filt[\{\xi_{t,f}\}]=H(f)\{\xi_{t,f}\}$ (preserves frequency, rescales amplitude/phase) — notes p.107 Thm 13.4; part11 thm p11-eigen
- [U11-T3] Transfer function = (discrete) Fourier transform of the impulse response: $H(f)=\sum_{m\in\Ints} h_m e^{-2\pi i f m}$ (assuming $h\in\ell^1$) — notes p.108 Thm 13.5; part11 thm p11-Hfourier
- [U11-T4] Filtering preserves stationarity: $\{X_t\}$ stationary + LTI filter with $h\in\ell^1$ $\Rightarrow$ $\{Y_t\}=\filt[\{X_t\}]$ stationary — notes p.108 Thm 13.6; part11 thm p11-statpres
- [U11-T5] Output spectrum: $\{X_t\}$ stationary with $\gamma^{(X)}\in\ell^1$, LTI filter $h\in\ell^1$ $\Rightarrow$ $S_Y(f)=|H(f)|^2 S_X(f)$ — notes p.108-110 Thm 13.7; part11 thm p11-outspec
- [U11-L1] Transfer function of a polynomial filter: $\Phi(\Bsh)$ for degree-$p$ polynomial $\Phi$ is LTI with $H(f)=\Phi(e^{-2\pi i f})$; impulse response $h_m=\phi_m$ ($0\le m\le p$), else $0$ — notes p.110 Lemma 13.8; part11 lemma p11-polyfilter
- [U11-T6] ARMA spectral density: stationary ARMA$(p,q)$ $\Phi(\Bsh)X_t=\Theta(\Bsh)\eps_t$ with WN variance $\sigma^2$ has $S_X(f)=\sigma^2\,|\Theta(e^{-2\pi i f})|^2/|\Phi(e^{-2\pi i f})|^2$ — notes p.110-111 Thm 13.9; part11 thm p11-arma

## Named formulas & identities (F)
- [U11-F1] Backshift definition $\Bsh[\{X_t\}]_u=X_{u-1}$ and iterated shift $\Bsh^u[\{X_t\}]_s=X_{s-u}$ (for $u<0$, apply $\Bsh^{-1}$ $-u$ times) — notes p.104 (13.3),(13.6); part11 recallbox backshift
- [U11-F2] General time-invariance for arbitrary shift: $\filt[\Bsh^u\{X_t\}]=\Bsh^u\filt[\{X_t\}]$ for all $u\in\Ints$ (implied by the one-step condition) — notes p.104 (13.7); part11 def p11-lti
- [U11-F3] Convolution representation $\filt[\{X_t\}]_u\ms\sum_{m\in\Ints}h_{u-m}X_m=\sum_k h_k X_{u-k}$ (coefficient of $X_{u-k}$ is $h_k$) — notes p.106 (13.11); part11 keytech p11-kth
- [U11-F4] $H(f)=\sum_{m\in\Ints} h_m e^{-2\pi i f m}$ (forward $h\to H$) — notes p.108 (13.15); part11 keytech p11-kth
- [U11-F5] Inverse transform (backward $H\to h$): $h_m=\int_{-1/2}^{1/2} H(f)e^{2\pi i f m}\,df$ (weights are Fourier coefficients of $H$) — part11 keytech p11-kth
- [U11-F6] Output spectrum identity $S_Y(f)=|H(f)|^2 S_X(f)$ (the workhorse gain formula) — notes p.109 (13.16); part11 thm p11-outspec
- [U11-F7] Output ACVS formula $\gamma^{(Y)}_\tau=\sum_{m,s} h_m\overline{h_s}\,\gamma^{(X)}_{\tau-m+s}=\sum_u w_u\gamma^{(X)}_{\tau-u}$ with $w_u=\sum_s h_{u+s}\overline{h_s}$, $w=h*\tilde h\in\ell^1$, $\tilde h_t=\overline{h_{-t}}$ — notes p.110 (proof Thm 13.7); part11 thm p11-outspec
- [U11-F8] Output mean $\E[Y_t]=\mu_X\sum_{m\in\Ints} h_m$ (i.e. $\mu_Y=\mu_X H(0)$) — notes p.109 (proof Thm 13.6); part11 thm p11-statpres
- [U11-F9] Polynomial-filter transfer function $H(f)=\Phi(e^{-2\pi i f})=\sum_{j=0}^p\phi_j e^{-2\pi i f j}$ — notes p.110 (Lemma 13.8); part11 lemma p11-polyfilter
- [U11-F10] ARMA spectral density formula $S_X(f)=\sigma^2|\Theta(e^{-2\pi i f})|^2/|\Phi(e^{-2\pi i f})|^2$ — notes p.111 (Thm 13.9); part11 thm p11-arma
- [U11-F11] Differencing gain identity $|1-e^{-2\pi i f}|^2=2-2\cos(2\pi f)=4\sin^2(\pi f)$ — sheet ex13.5; part11 keytech p11-ktspec, exercise p11-e5
- [U11-F12] AR(1) / MA(1) gain expansion $|1-\phi e^{-2\pi i f}|^2=1+\phi^2-2\phi\cos(2\pi f)$ — part11 exercises p11-n1, p11-n3
- [U11-F13] Cascade transfer / squared gain: $H(f)=H_1(f)H_2(f)$, $|H(f)|^2=|H_1(f)|^2|H_2(f)|^2$; convolution in time $\leftrightarrow$ product in frequency $h^{(1)}*h^{(2)}\leftrightarrow H_1H_2$ — part11 keytech p11-ktcascade
- [U11-F14] Mean-square equality $U\ms V$ means $\E[|U-V|^2]=0$ ($U,V\in L^2$) — notes p.106 §13.2.1; part11 recallbox mean-square
- [U11-F15] Two representations of a series: $X_t=\sum_m X_m\delta_{m,t}$ (sum of impulses) and $X_t\ms\mu+\int_{-1/2}^{1/2}e^{2\pi i f t}dZ(f)$ (sum of waves) — notes p.108; part11 intuition (after p11-conv)
- [U11-F16] Filter action on the two building blocks: $\filt[\{X_t\}]_u\ms\sum_m X_m\filt[\{\delta_{m,t}\}]_u$ and $\filt[\{X_t\}]_u\ms\mu H(0)+\int_{-1/2}^{1/2}H(f)e^{2\pi i f u}dZ(f)$ — notes p.108; part11 intuition (after p11-conv)
- [U11-F17] Shift identity for waves $\Bsh^{-u}[\{\xi_{t,f}\}]=e^{2\pi i u f}\{\xi_{t,f}\}$ (key step of eigensequence proof) — notes p.107 (13.14); part11 thm p11-eigen

## Methods / techniques / proof-recipes (M)
- [U11-M1] Compute the spectral density of a filtered process: (1) find impulse response $h$ or write $\filt=\Phi(\Bsh)$, (2) form $H(f)=\sum_m h_m e^{-2\pi i f m}$ (or $\Phi(e^{-2\pi i f})$), (3) multiply $S_Y=|H|^2 S_X$ — part11 keytech p11-ktspec
- [U11-M2] Transfer function from impulse response and back (forward = sum Fourier series; backward = Fourier coefficients $h_m=\int H e^{2\pi i f m}df$; read $h_k$ as coefficient of $X_{u-k}$) — part11 keytech p11-kth
- [U11-M3] Compose filters in the frequency domain: cascade gains multiply, $|H|^2=|H_1|^2|H_2|^2$; ARMA = "MA on top, AR on bottom" — part11 keytech p11-ktcascade
- [U11-M4] Prove a filter is LTI: (1) expand $\filt[\{\alpha X_t+Y_t\}]_u$ and match; (2) show $\filt[\Bsh\{X_t\}]_u=\filt[\{X_t\}]_{u-1}$ via re-indexing ($m'=m-1$); shortcut: lin. comb / cascade / $h\in\ell^1$ convolution are auto-LTI — part11 keytech p11-ktlti
- [U11-M5] Proof recipe for the convolution theorem: truncate $X^{(N)}=\sum_{|m|\le N}X_m\delta_{\cdot,m}$, use $\ell^1$-continuity, linearity on finite sums, time invariance $\filt[\{\delta_{t,m}\}]_u=\filt[\{\delta_{t,m-u}\}]_0=h_{u-m}$, then absolute convergence passes to the full series — notes p.106; sheet ex13.3; part11 thm p11-conv / exercise p11-e3
- [U11-M6] Proof recipe for the eigensequence theorem: use shift identity (13.14), time invariance, linearity, and definition of $H$ to get $\filt[\{\xi_{t,f}\}]_u=\xi_{u,f}H(f)$ — notes p.107; part11 thm p11-eigen
- [U11-M7] Proof recipe for $S_Y=|H|^2S_X$: write $\gamma^{(Y)}_\tau=\sum_u w_u\gamma^{(X)}_{\tau-u}$ with $w=h*\tilde h$, apply convolution theorem, use $\widetilde H(f)=\overline{H(f)}$ so $W=H\overline H=|H|^2$ — notes p.109-110; part11 thm p11-outspec
- [U11-M8] Derive ARMA spectrum: write $\Phi(\Bsh)\{X_t\}=\Theta(\Bsh)\{\eps_t\}$, apply output-spectrum theorem to both sides + polynomial-filter lemma, divide by $|\Phi(e^{-2\pi i f})|^2\ne0$ — notes p.111; part11 thm p11-arma

## Key hypotheses / conditions (H)
- [U11-H1] Convergence condition $h\in\ell^1$ (common sufficient condition; gives $\|h\|_\infty\le\|h\|_1<\infty$, finite filters have no convergence issue) — notes p.106; part11 def p11-impulse, thm p11-conv
- [U11-H2] One-step time-invariance ($\filt\Bsh=\Bsh\filt$) suffices; the weaker (13.5) implies the full $\Bsh^u$ version (13.7) — notes p.104; part11 def p11-lti
- [U11-H3] Stationarity of a complex series requires real & imaginary parts to be JOINTLY (second-order) stationary — notes p.103 footnote; part11 def p11-complex
- [U11-H4] Output-spectrum theorem needs $\gamma^{(X)}\in\ell^1$ AND $h\in\ell^1$ (so $w\in\ell^1$, convolution theorem applies) — notes p.108-110; part11 thm p11-outspec
- [U11-H5] ARMA stationarity condition: $\Phi(z)$ has no zeros on the unit circle, so $\Phi(e^{-2\pi i f})\ne0$, making the division legal — notes p.111; part11 thm p11-arma
- [U11-H6] $\ell^1$-continuity hypothesis: $\{X_t\}\mapsto\filt[\{X_t\}]_u$ continuous in $\ell^1$ norm (needed for the deterministic convolution equivalence) — sheet ex13.3; part11 exercise p11-e3
- [U11-H7] Filter must be applicable to complex waves (for convolution filters with $h\in\ell^1$ this is guaranteed by absolute convergence) — notes p.107; part11 def p11-transfer, thm p11-eigen

## Pitfalls / remarks (K)
- [U11-K1] The conjugate sits on the SECOND factor of the complex ACVS; forgetting it breaks Hermitian symmetry — part11 pitfall
- [U11-K2] The spectral gain multiplier is $|H(f)|^2$ (squared modulus, real $\ge 0$), NOT $H(f)$ nor $H(f)^2$ — part11 pitfall
- [U11-K3] Filters generally do NOT commute: $\filt_1\filt_2\ne\filt_2\filt_1$ in general, but polynomials in $\Bsh$ do commute — sheet ex13.2; part11 solution p11-e2
- [U11-K4] In $h_m=\filt[\{\delta_{t,-m}\}]_0$ the subscript $0$ is the output TIME index (not a constant) — notes p.105; part11 def p11-impulse
- [U11-K5] ARMA has NO nice closed-form ACVS but DOES have a clean closed-form spectral density — notes p.111; part11 thm p11-arma
- [U11-K6] LTI filters form a vector space over $\Comp$ and are closed under composition; hence any polynomial/power series in $\Bsh$ is LTI — notes p.105; part11 props p11-lincomb, p11-cascade
- [U11-K7] Differencing $(I-\Bsh)$ kills $f=0$ ($H(0)=0$) and amplifies high frequencies = high-pass; symmetric averages are zero-phase ($H$ real) low-pass smoothers — sheet ex13.5; part11 exercises p11-e5, p11-n2

## Exercise-type schemes (E)
- [U11-E1] Show a linear combination $\alpha\filt_1+\filt_2$ of LTI filters is LTI (check both axioms via linearity & commuting with $\Bsh$) — sheet ex13.1; part11 exercise p11-e1
- [U11-E2] Show a cascade $\filt_1\filt_2$ of LTI filters is LTI (push $\Bsh$ through both filters) — sheet ex13.2; part11 exercise p11-e2
- [U11-E3] Prove LTI on $\ell^1$ $\Leftrightarrow$ convolution $\filt[\{X_t\}]_u=\sum_m h_{u-m}X_m$, justifying all limit/sum interchanges (truncation + continuity) — sheet ex13.3; part11 exercise p11-e3
- [U11-E4] Tapered DFT as convolution with $dZ$: show $J_h(f)=\sum_{t=1}^n h_t X_t e^{-2\pi i f t}=\int_{-1/2}^{1/2}H(f-f')dZ(f')$ via spectral representation + interchange — sheet ex13.4; part11 exercise p11-e4
- [U11-E5] Spectral density of the differenced process $Y_t=(I-\Bsh)X_t=X_t-X_{t-1}$: $S_Y=|1-e^{-2\pi i f}|^2 S_X=4\sin^2(\pi f)S_X$ — sheet ex13.5; part11 exercise p11-e5
- [U11-E6] Time reversibility of AR$(p)$: $Y_t=X_{-t}$ is AR$(p)$ with same parameters & noise distribution (via $\gamma^{(Y)}_\tau=\gamma^{(X)}_\tau$, $S_Y=S_X$, then $S_{\tilde\nu}=|\Phi|^2 S_X=\sigma_\eps^2$) — sheet ex13.6; part11 exercise p11-e6
- [U11-E7] Spectral density of MA(1) $X_t=\eps_t-\theta\eps_{t-1}$ via the filter, cross-checked against direct ACVS: $S_X=\sigma^2(1+\theta^2-2\theta\cos 2\pi f)$ — part11 exercise p11-n1
- [U11-E8] Transfer function, gain and frequency action of a centred 3-point moving average $\frac13(X_{u-1}+X_u+X_{u+1})$: $H(f)=\frac13(1+2\cos 2\pi f)$, null at $f=1/3$, passes $f=0$ — part11 exercise p11-n2
- [U11-E9] Spectral density of AR(1) $X_t=\phi X_{t-1}+\eps_t$ via polynomial-filter lemma: $S_X=\sigma^2/(1+\phi^2-2\phi\cos 2\pi f)$, peak at $f=0$ for $\phi>0$, at $f=1/2$ for $\phi<0$ — part11 exercise p11-n3
- [U11-E10] Cascade gain "difference then 3-point smooth": $S_Y=4\sin^2(\pi f)\cdot\frac19(1+2\cos 2\pi f)^2 S_X$ (product of squared gains, band-suppressing) — part11 exercise p11-n4

## U12 — Stratégie & pièges (synthèse + examen blanc)

# U12 — Stratégie & pièges (Time Series) — Coverage inventory

## Methods / techniques / proof-recipes (M) — from the Cue→Tool decision table & key-techniques

- [U12-M1] Cue→Tool decision table: map an exam question cue to the tool to deploy (closed-book, no-calculator strategy) — part12 §Exam Strategy Checklist, decision table
- [U12-M2] "State (weak/strict) stationarity" → give the 3 moment conditions / equality of all finite-dim. distributions under shift — part12 decision table
- [U12-M3] "Is {X_t} weakly stationary?" → check the 3 conditions IN ORDER, stop at first failure; watch for undefined moments and residual t-dependence in the covariance — part12 decision table
- [U12-M4] Compute ACVS/ACF of an MA(q) via $\gamma_\tau=\sigma^2\sum_j\theta_j\theta_{j+|\tau|}$ for $|\tau|\le q$ (0 otherwise); ACF cuts off after lag q — part12 decision table
- [U12-M5] Compute ACVS of AR/ARMA: multiply defining eqn by $X_{t-\tau}$, take expectations → difference equation $\gamma_\tau=\sum\phi_j\gamma_{\tau-j}$; solve with initial conditions (small $\tau$ separately) — part12 decision table; keytech p12-six(2)
- [U12-M6] Find $\psi_j$ in $X_t=\sum\psi_j\eps_{t-j}$: write $X_t=\Theta(B)/\Phi(B)\eps_t$, expand by partial fractions / $1/(1-gB)=\sum g^kB^k$, or match coefficients in $\Phi(B)\sum\psi_jB^j=\Theta(B)$ — part12 decision table; keytech p12-six(4)
- [U12-M7] Causal/stationary ⇔ roots of $\Phi(z)$ outside unit circle; invertible ⇔ roots of $\Theta(z)$ outside (root test) — part12 decision table; keytech p12-six(3)
- [U12-M8] Find the PACF via Durbin–Levinson recursion on the ACF; for AR(p), PACF cuts off after p — part12 decision table
- [U12-M9] Identify a model from ACF/PACF plots: ACF cut@q & PACF tail ⇒ MA(q); PACF cut@p & ACF tail ⇒ AR(p); both tail ⇒ ARMA; slow ACF decay ⇒ difference — part12 decision table
- [U12-M10] Estimate AR parameters by Yule–Walker $\hat\phi=\hat\Gamma^{-1}\hat\gamma$, $\hat\sigma^2=\hat\gamma_0-\sum\hat\phi_j\hat\gamma_j$ (or forward/backward LS) — part12 decision table
- [U12-M11] Estimate MA/ARMA by LS: reconstruct innovations recursively ($\eps_0=0$), minimise $\sum\hat\eps_t^2$ — part12 decision table
- [U12-M12] Remove trend / make stationary by differencing: $\nabla^q$ kills degree-$(q-1)$ polynomial trend; $\nabla_{(s)}$ removes period-$s$ seasonality — part12 decision table
- [U12-M13] Forecast $X_{n+h}$ (causal ARMA): $X^n_{n+h}=\sum_{j\ge h}\psi_j\eps_{n+h-j}$ (future $\eps\equiv0$); or recursive truncated recipe — part12 decision table; keytech p12-six(5)
- [U12-M14] Forecast an ARIMA: forecast the differenced ARMA $Z=\nabla^dX$, then un-difference (cumulate); error variance →∞ — part12 decision table
- [U12-M15] Find spectral density from ACVS $S(f)=\sum_\tau\gamma_\tau e^{-2\pi i f\tau}$, or for ARMA $S(f)=\sigma^2|\Theta|^2/|\Phi|^2$ — part12 decision table; keytech p12-six(6)
- [U12-M16] Spectrum of a filtered series $Y=\mathcal{L}X$: $S_Y(f)=|H(f)|^2 S_X(f)$ with $H(f)=\sum_m h_m e^{-2\pi i f m}$ — part12 decision table
- [U12-M17] "Is this $\gamma_\tau$ a valid ACVS?" → compute its SDF; valid iff $S(f)\ge0$ for all f (⇔ $\gamma$ positive semi-definite) — part12 decision table
- [U12-M18] Cross-spectrum/coherence of a delay → read amplitude $|c|S_{2,2}$ and phase $-2\pi f d$ from $S_{1,2}(f)=c\,e^{-2\pi i f d}S_{2,2}(f)$ — part12 decision table
- [U12-M19] Check VAR stability: roots of $\det(I-\Phi_1 z-\cdots-\Phi_p z^p)$ outside unit circle (companion eigenvalues inside) — part12 decision table
- [U12-M20] Compare models with AIC/AICc/BIC ($k=p+q+1$); smaller is better; BIC penalises complexity more — part12 decision table
- [U12-M21] Exam hygiene: name the theorem/definition invoked (causality $\E[\eps_tX_{t-k}]=0$, Herglotz, prediction equations, Isserlis) — part12 keytech p12-hygiene
- [U12-M22] No-calculator factoring: quadratic formula $z=(-b\pm\sqrt{b^2-4ac})/2a$ by hand, report $|z|$ vs 1 — part12 keytech p12-hygiene
- [U12-M23] For "$|z|>1$?" with complex roots compare $|z|^2=(\Re z)^2+(\Im z)^2$ to 1 (no square root needed) — part12 keytech p12-hygiene
- [U12-M24] Sanity-checks toolkit: $\gamma_0\ge0$, $|\rho_\tau|\le1$, MA(1) has $|\rho_1|\le\tfrac12$, SDF $\ge0$ & real, spectral matrix Hermitian — part12 keytech p12-hygiene
- [U12-M25] White-noise filter trick for ACVS: in $X_t=\sum\psi_j\eps_{t-j}$ only equal noise indices survive the expectation — part12 keytech p12-six(2); mock ex1(c), ex3(c)
- [U12-M26] Recursive innovation reconstruction for forecasting ARMA: invert defining eqn to $\eps_t=aX_t-\dots-\dots\eps_{t-1}$, start $X_0=\eps_0=0$ — mock ex2(c) solution

## Named formulas & identities (F)

- [U12-F1] MA(q) ACVS formula $\gamma_\tau=\sigma^2\sum_j\theta_j\theta_{j+|\tau|}$, $|\tau|\le q$ else 0 — part12 decision table
- [U12-F2] AR/ARMA ACVS difference equation $\gamma_\tau=\sum_j\phi_j\gamma_{\tau-j}$ — part12 decision table
- [U12-F3] Geometric expansion $1/(1-gB)=\sum_{k\ge0}g^kB^k$ (for $|g|<1$) — part12 decision table; mock ex2(a)
- [U12-F4] Linear-process ACVS $\gamma_\tau=\sigma^2\sum_{j\ge0}\psi_j\psi_{j+|\tau|}$ — mock ex2(b) solution
- [U12-F5] Yule–Walker equations $\hat\phi=\hat\Gamma^{-1}\hat\gamma$, $\hat\sigma^2=\hat\gamma_0-\sum\hat\phi_j\hat\gamma_j$ — part12 decision table
- [U12-F6] Causal-ARMA forecast $X^n_{n+h}=\sum_{j\ge h}\psi_j\eps_{n+h-j}$ and MSE $=\sigma^2\sum_{j=0}^{h-1}\psi_j^2$ — part12 decision table
- [U12-F7] Gaussian prediction interval $X^n_{n+h}\pm z_{1-\alpha/2}\sqrt{\Var(e_n(h))}$ — part12 decision table
- [U12-F8] SDF definition from ACVS $S(f)=\sum_\tau\gamma_\tau e^{-2\pi i f\tau}$ — part12 decision table; mock ex3(c)
- [U12-F9] ARMA spectral density $S(f)=\sigma^2|\Theta(e^{-2\pi i f})|^2/|\Phi(e^{-2\pi i f})|^2$ — part12 decision table
- [U12-F10] Filter output SDF $S_Y(f)=|H(f)|^2S_X(f)$, $H(f)=\sum_m h_m e^{-2\pi i f m}$ — part12 decision table
- [U12-F11] Periodogram expectation $\E[\hat S^{(p)}]=\mathcal{F}_n*S$ (Fejér-kernel convolution) — part12 decision table
- [U12-F12] Periodogram variance $\Var[\hat S^{(p)}]\to S(f)^2$ (does not vanish); multitaper $\approx S(f)^2/K$ — part12 decision table; pitfall
- [U12-F13] Delay cross-spectrum $S_{1,2}(f)=c\,e^{-2\pi i f d}S_{2,2}(f)$ — part12 decision table; mock ex4(c)
- [U12-F14] Ljung–Box statistic $Q_m=n(n+2)\sum_{\tau=1}^m\hat r_\tau^2/(n-\tau)\sim\chi^2_{m-p-q}$ — part12 decision table; pitfall
- [U12-F15] AIC/BIC parameter count $k=p+q+1$ — part12 decision table
- [U12-F16] ARCH(1) squared-return autocorrelation $\Corr(r^2_{t+\tau},r^2_t)=\alpha_1^{|\tau|}$ — part12 pitfall (ARCH/GARCH)
- [U12-F17] MA(1) SDF $S(f)=\sigma^2(1+\theta^2+2\theta\cos(2\pi f))$ — mock ex3(c) solution
- [U12-F18] Periodogram double-sum form $\hat S^{(p)}(f)=\frac1N\sum_{t_1,t_2}X_{t_1}X_{t_2}e^{-2\pi i f(t_1-t_2)}$ — mock ex3(a) solution
- [U12-F19] Identity $\int_{-1/2}^{1/2}\hat S^{(p)}(f)df=\hat\gamma^{(p)}_X(0)$ — mock ex3(b) solution
- [U12-F20] Multivariate cross-spectrum symmetry $S_{2,1}(f)=S_{1,2}(f)^*=c\,e^{2\pi i f d}S_{2,2}(f)$ — mock ex4(c) solution
- [U12-F21] Delay-process output SDF $S_{1,1}(f)=c^2S_{2,2}(f)+\sigma^2_\eps$ — mock ex4(c) solution

## Definitions (D)

- [U12-D1] Weak/second-order/covariance stationarity: 3 conditions (const mean, finite const variance, $\E[X_tX_{t+\tau}]$ shift-invariant) — mock ex1(a); part12 decision table
- [U12-D2] Strict/strong stationarity: all finite-dim. joint distributions invariant under time shift — mock ex1(a); part12 decision table
- [U12-D3] ARMA(p,q) defining equation $X_t=\sum\phi_iX_{t-i}+\eps_t-\sum\theta_j\eps_{t-j}$ — mock ex1(b)
- [U12-D4] AR(p) and MA(q) processes; AR(1)/MA(1) stationarity conditions — mock ex1(b)
- [U12-D5] Periodogram estimator $\hat S^{(p)}(f)=\frac1N|\sum_{t=1}^N X_t e^{-2\pi i f t}|^2$ — mock ex3
- [U12-D6] Joint second-order stationarity of a multivariate process (each component stationary + shift-invariant cross-covariance) — mock ex4(b)

## Key hypotheses / conditions (H)

- [U12-H1] Causality/stationarity condition: roots of $\Phi(z)$ outside unit circle, i.e. $\Phi(z)\ne0$ for $|z|\le1$ — part12 pitfall; decision table
- [U12-H2] Invertibility condition: roots of $\Theta(z)$ outside unit circle — part12 decision table
- [U12-H3] AR is always invertible; MA is always stationary — part12 decision table
- [U12-H4] VAR stability: companion eigenvalues inside unit circle (⇔ char. roots outside) — part12 decision table
- [U12-H5] ARCH/GARCH variance stationarity $\sum\alpha+\sum\beta<1$ — part12 decision table; pitfall
- [U12-H6] ARCH(1) moment conditions: $\alpha_1<1$ (finite variance), $\alpha_1^2<1/3$ (finite kurtosis, Gaussian noise) — part12 pitfall (ARCH/GARCH)
- [U12-H7] Valid-ACVS condition: $\gamma$ positive semi-definite ⇔ $S(f)\ge0$ everywhere — part12 pitfall; decision table
- [U12-H8] Absolute-summability $\sum_\tau|\gamma^{(2,2)}_\tau|<\infty$ needed for the SDF to exist — mock ex4(c)
- [U12-H9] Independence/uncorrelatedness assumption: $\eps_s$ independent of $X^{(2)}_t$ for all s,t (makes cross terms vanish in delay process) — mock ex4(a,b)

## Pitfalls / remarks (K)

- [U12-K1] Roots inside vs outside the unit circle — students flip it; char-root "$|z|>1$" = companion "$|\lambda|<1$", don't mix phrasings — part12 pitfall
- [U12-K2] Strict vs weak stationarity don't imply each other; i.i.d. Cauchy is strict-not-weak, matched-moments-non-Gaussian is weak-not-strict; coincide only for Gaussian — part12 pitfall
- [U12-K3] Lag goes in FIRST argument (multivariate): $\Gamma_{-\tau}=\Gamma_\tau^\top$ not $\Gamma_\tau$; $\gamma^{(j,k)}_\tau=\gamma^{(k,j)}_{-\tau}$ (invisible in univariate real case) — part12 pitfall
- [U12-K4] ACF cut-off (MA, q) vs PACF cut-off (AR, p), ARMA both tail — most common identification error — part12 pitfall
- [U12-K5] Identifiability of MA / sign of $\theta_0=-1$: without it scaling $(\theta_j,\sigma^2)\mapsto(c\theta_j,c^{-2}\sigma^2)$ gives same ACVS — part12 pitfall
- [U12-K6] Non-invertible MA and its invertible twin (root $g$ vs $1/g$) share the same ACF — pick the invertible one — part12 pitfall
- [U12-K7] "Biased is not bad": divide-by-$n$ ACVS $\hat\gamma_\tau$ is biased but PSD and lower-MSE than unbiased $\tilde\gamma_\tau$ — don't auto-correct — part12 pitfall
- [U12-K8] Periodogram is not consistent: $\Var\to S(f)^2$, more data = wigglier; taper for bias, smooth/multitaper for variance — part12 pitfall
- [U12-K9] Forecasts: stationary ARMA reverts to mean, error var saturates at $\gamma_0$; integrated (ARIMA $d\ge1$) does not revert, error var →∞ — part12 pitfall
- [U12-K10] Setting future innovations to zero ONLY: keep observed past innovations as residuals; in recursive recipe replace future obs by forecasts, future errors by 0, past errors by residuals — part12 pitfall
- [U12-K11] ARCH/GARCH uncorrelated but dependent: $\Corr(r_{t+\tau},r_t)=0$ yet $\Corr(r^2_{t+\tau},r^2_t)\ne0$ — part12 pitfall
- [U12-K12] Ljung–Box degrees of freedom $\chi^2_{m-p-q}$ (subtract fitted ARMA params), not $\chi^2_m$ — part12 pitfall
- [U12-K13] Angular vs ordinary frequency: course uses ordinary $f$ on $[-\tfrac12,\tfrac12]$ with $e^{-2\pi i f\tau}$; switching to $\omega=2\pi f$ scatters stray $2\pi$ — part12 pitfall
- [U12-K14] A valid ACVS must be PSD: $\gamma_\tau=1$ for $|\tau|\le K$ else 0 need not be a real ACVS (SDF can go negative) — always test $S(f)\ge0$ — part12 pitfall
- [U12-K15] Readiness criterion: do every exercise unaided, name every theorem's tool, avoid every pitfall — part12 closing box

## Counterexamples (X)

- [U12-X1] i.i.d. Cauchy: strictly stationary but NOT weakly stationary (no finite variance) — part12 pitfall (strict vs weak)
- [U12-X2] Matched-first-two-moments non-Gaussian process: weakly stationary but NOT strictly — part12 pitfall (strict vs weak)
- [U12-X3] Sequence $\gamma_\tau=1$ for $|\tau|\le K$, else 0: plausible but not a valid ACVS (SDF goes negative) — part12 pitfall (valid ACVS)

## Exercise-type schemes (E) — from the mock exam

- [U12-E1] State the definitions of (weak) stationary and strictly stationary processes on index set $\Z$ — mock ex1(a)
- [U12-E2] Define AR(p) and MA(q); give AR(1)/MA(1) stationarity conditions — mock ex1(b)
- [U12-E3] Compute the ACVS of a given MA(2), e.g. $X_t=\eps_t-0.2\eps_{t-1}+0.1\eps_{t-2}$ (cut-off after lag 2) — mock ex1(c)
- [U12-E4] Find the $\psi/\lambda$-weights of an ARMA(1,1) via geometric expansion of $\Theta(B)/\Phi(B)$ — mock ex2(a)
- [U12-E5] Compute the ACVS of an ARMA from its linear $\psi$-representation $\gamma_\tau=\sigma^2\sum\psi_j\psi_{j+|\tau|}$ — mock ex2(b)
- [U12-E6] Describe one-step prediction $\hat X_{n+1}$ given $X_1,\dots,X_n$ via recursive innovation reconstruction + truncated representation — mock ex2(c)
- [U12-E7] Define the periodogram and compute $\E[\hat S^{(p)}(f)]$ for white noise (= $\sigma^2$) — mock ex3(a)
- [U12-E8] Compute $\int_{-1/2}^{1/2}\hat S^{(p)}(f)df$ in terms of $\hat\gamma_X$, then take expectation (= $\sigma^2$) — mock ex3(b)
- [U12-E9] Determine the SDF of MA(1) $X_t=\eps_t+\theta\eps_{t-1}$: $\sigma^2(1+\theta^2+2\theta\cos2\pi f)$ — mock ex3(c)
- [U12-E10] Prove second-order stationarity of a delay process $X^{(1)}_t=cX^{(2)}_{t-d}+\eps_t$ (3-condition check) — mock ex4(a)
- [U12-E11] Prove JOINT second-order stationarity of $(X^{(1)}_t,X^{(2)}_t)^\top$ (shift-invariant cross-covariance) — mock ex4(b)
- [U12-E12] Derive the spectral & cross-spectral density functions $S_{1,1},S_{1,2},S_{2,1}$ of a delay process from $\gamma^{(2,2)}$ — mock ex4(c)

