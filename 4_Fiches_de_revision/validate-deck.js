// validate-deck.js — KaTeX integrity + structural checks for a flashcard deck.
// Usage: node validate-deck.js deck-series-temporelles.js
const katex = require('katex');
require('./' + process.argv[2]);
const cards = globalThis.DECK || [];
let errs = 0, empty = 0, dups = 0; const seen = new Set();
const tryR = (src, disp, where) => {
  try { katex.renderToString(src, { displayMode: disp, throwOnError: true }); }
  catch (e) { errs++; console.log(`KaTeX ERR [${where}] "${src}" -> ${e.message}`); }
};
const check = (tex, where) =>
  tex.split(/(\$\$[\s\S]*?\$\$|\$[^$]+\$)/g).forEach(p => {
    let m;
    if (m = p.match(/^\$\$([\s\S]*)\$\$$/)) tryR(m[1], true, where);
    else if (m = p.match(/^\$([^$]+)\$$/)) tryR(m[1], false, where);
  });
cards.forEach((c, i) => {
  if (!c.cat || !c.recto || !c.verso) { empty++; console.log(`VIDE #${i + 1}`); }
  if (seen.has(c.recto)) { dups++; console.log(`DOUBLON #${i + 1}: ${String(c.recto).slice(0, 70)}`); }
  seen.add(c.recto);
  check(c.recto || '', `recto #${i + 1}`);
  check(c.verso || '', `verso #${i + 1}`);
});
console.log(`\n${cards.length} cartes — ${empty} vide(s) — ${dups} doublon(s) — ${errs} erreur(s) KaTeX`);
process.exit(errs + empty ? 1 : 0);
