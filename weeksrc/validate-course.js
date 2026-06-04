// validate-course.js — vérifie structure + intégrité KaTeX de COURSE/FINAL.
// Usage : node weeksrc/validate-course.js weeksrc/_course_check.js
const katex = require('/Users/matteogiori/Desktop/Time Series Only/4_Fiches_de_revision/node_modules/katex');
require('./' + require('path').basename(process.argv[2]));
const COURSE = globalThis.COURSE || [], FINAL = globalThis.FINAL || [];
let errs = 0, struct = 0;
const tryR = (s, d, where) => {
  try { katex.renderToString(s, { displayMode: d, throwOnError: true }); }
  catch (e) { errs++; console.log(`KaTeX ERR [${where}] "${String(s).slice(0,70)}" -> ${e.message}`); }
};
const check = (tex, where) => {
  if (tex == null) return;
  String(tex).split(/(\$\$[\s\S]*?\$\$|\$[^$]+\$)/g).forEach(p => {
    let m;
    if (m = p.match(/^\$\$([\s\S]*)\$\$$/)) tryR(m[1], true, where);
    else if (m = p.match(/^\$([^$]+)\$$/)) tryR(m[1], false, where);
  });
};
function checkQ(q, where) {
  check(q.q, where + '.q');
  if (q.type === 'open') check(q.answer, where + '.answer');
  else { (q.opts || []).forEach((o, i) => check(o, where + '.opt' + i)); check(q.exp, where + '.exp'); }
}
COURSE.forEach((w, i) => {
  const W = `S${w.n || i + 1}`;
  if (!w.title || !w.intro || !(w.sections || []).length || !(w.checks || []).length || !(w.test || []).length) {
    struct++; console.log(`STRUCT ${W}: champ manquant (sections=${(w.sections||[]).length} checks=${(w.checks||[]).length} test=${(w.test||[]).length})`);
  }
  check(w.title, W + '.title'); check(w.intro, W + '.intro');
  (w.sections || []).forEach((s, j) => { check(s.h, `${W}.sec${j}.h`); check(s.body, `${W}.sec${j}.body`); });
  (w.checks || []).forEach((c, j) => { check(c.q, `${W}.chk${j}.q`); check(c.a, `${W}.chk${j}.a`); });
  (w.test || []).forEach((q, j) => checkQ(q, `${W}.test${j}`));
});
FINAL.forEach((q, j) => checkQ(q, `FINAL${j + 1}`));
const totalTest = COURSE.reduce((s, w) => s + (w.test || []).length, 0);
console.log(`\n${COURSE.length} semaines · ${totalTest} questions de test · ${FINAL.length} questions d'examen — ${struct} pb structure — ${errs} erreur(s) KaTeX`);
process.exit(errs + struct ? 1 : 0);
