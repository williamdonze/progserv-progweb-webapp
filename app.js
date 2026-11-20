"use strict";
/* =========================================================
   Révisions ProgWeb & ProgServ2 · application iPad hors ligne
   Données : CHAPTERS, EXERCISES (+ ORDER), PRACTICE, FILL, LESSONS (+ anims) dans data.js
   ========================================================= */

const COURSE = { pw: "ProgWeb", ps: "ProgServ2" };
const chapterById = Object.fromEntries(CHAPTERS.map(c => [c.id, c]));
PRACTICE.forEach(p => { p.type = "practice"; });
const ALL = [...EXERCISES, ...FILL, ...PRACTICE];
const exById = Object.fromEntries(ALL.map(e => [e.id, e]));
const courseOf = ex => chapterById[ex.ch].course;
const QUIZ_TYPES = ["qcm", "open", "order", "fill"];      // questions « rapides »
const WRITE_TYPES = ["paper", "practice"];                // écrire du code

/* ---------- État ---------- */
const KEY = "revipad-v1";
let state = { ex: {}, read: {}, xp: 0, xpBy: {}, bestCombo: 0, days: [], course: "both", device: "" };
try { const raw = localStorage.getItem(KEY); if (raw) state = Object.assign(state, JSON.parse(raw)); } catch (e) {}
if (!state.device) state.device = Math.random().toString(36).slice(2, 10);
state.xpBy = state.xpBy || {};
if (state.xp && !Object.keys(state.xpBy).length) state.xpBy[state.device] = state.xp;   // ancienne version
const totalXp = () => Object.values(state.xpBy).reduce((a, n) => a + n, 0);
state.xp = totalXp();
function save() { state.xp = totalXp(); try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} }

/* ---------- Synchronisation par code (AirDrop, Messages…) ---------- */
function exportCode() {
  const data = { v: 1, ex: state.ex, read: state.read, xpBy: state.xpBy, bestCombo: state.bestCombo, days: state.days };
  return "REVISIONS1:" + btoa(unescape(encodeURIComponent(JSON.stringify(data))));
}
function importCode(code) {
  const m = String(code).match(/REVISIONS1:([A-Za-z0-9+/=]+)/);
  if (!m) throw new Error("Code non reconnu");
  const d = JSON.parse(decodeURIComponent(escape(atob(m[1]))));
  let changed = 0;
  for (const [id, e] of Object.entries(d.ex || {})) {           // la réponse la plus récente gagne
    const mine = state.ex[id];
    const newer = !mine || (e.t || 0) > (mine.t || 0) || ((e.t || 0) === (mine.t || 0) && e.s === "ok" && mine.s !== "ok");
    if (newer && exById[id]) { state.ex[id] = e; changed++; }
  }
  for (const id of Object.keys(d.read || {})) state.read[id] = true;
  for (const [dev, xp] of Object.entries(d.xpBy || {})) state.xpBy[dev] = Math.max(state.xpBy[dev] || 0, xp);
  state.bestCombo = Math.max(state.bestCombo, d.bestCombo || 0);
  state.days = [...new Set([...state.days, ...(d.days || [])])].sort();
  save();
  return changed;
}
(function markToday() {
  const d = new Date();
  const t = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  if (!state.days.includes(t)) { state.days.push(t); save(); }
})();
function streak() {
  const set = new Set(state.days);
  let n = 0;
  const d = new Date();
  for (;;) {
    const t = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    if (!set.has(t)) break;
    n++; d.setDate(d.getDate() - 1);
  }
  return n;
}
const LEVELS = ["Débutant", "Apprenti", "Codeur", "Développeur", "Expert", "Maître du DOM", "Gourou PHP", "Légende"];
function levelInfo() {
  const lvl = Math.floor(state.xp / 150);
  return { n: lvl + 1, name: LEVELS[Math.min(lvl, LEVELS.length - 1)], into: state.xp % 150, need: 150 };
}

/* ---------- Utilitaires ---------- */
/* Comme replaceChildren, mais ignore null et false (sinon ils s'affichent en texte) */
function rc(el, ...kids) { el.replaceChildren(...kids.flat().filter(k => k != null && k !== false)); }
function h(tag, attrs, ...kids) {
  const el = document.createElement(tag);
  if (attrs) for (const [k, v] of Object.entries(attrs)) {
    if (v == null || v === false) continue;
    if (k === "class") el.className = v;
    else if (k.startsWith("on")) el.addEventListener(k.slice(2), v);
    else el.setAttribute(k, v === true ? "" : v);
  }
  for (const kid of kids.flat()) if (kid != null && kid !== false) el.append(kid instanceof Node ? kid : document.createTextNode(String(kid)));
  return el;
}
function rich(text) {
  const frag = document.createDocumentFragment();
  String(text).split("`").forEach((part, i) => {
    if (part === "") return;
    if (i % 2) { frag.append(h("code", null, part)); return; }
    part.split("**").forEach((t, j) => { if (t !== "") frag.append(j % 2 ? h("strong", null, t) : document.createTextNode(t)); });
  });
  return frag;
}
function seeded(seedStr) {
  let seed = [...seedStr].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
  return () => { seed = (seed * 1103515245 + 12345) >>> 0; return seed / 4294967296; };
}
function shuffle(arr, rnd = Math.random) {
  const t = [...arr];
  for (let i = t.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [t[i], t[j]] = [t[j], t[i]]; }
  return t;
}
const pick = (arr, n) => shuffle(arr).slice(0, n);
const app = document.getElementById("app");
const toastBox = document.getElementById("toast");
function toast(text) {
  toastBox.textContent = text;
  toastBox.classList.remove("show"); void toastBox.offsetWidth; toastBox.classList.add("show");
}

/* ---------- Points ---------- */
let combo = 0;
function award(ok, selfGraded) {
  if (ok) {
    combo++;
    const bonus = Math.min(combo - 1, 5) * 2;
    const gain = (selfGraded ? 5 : 10) + bonus;
    state.xpBy[state.device] = (state.xpBy[state.device] || 0) + gain;
    state.bestCombo = Math.max(state.bestCombo, combo);
    save();
    toast(combo >= 3 ? `+${gain} XP · série de ${combo}` : `+${gain} XP`);
    return gain;
  }
  combo = 0;
  return 0;
}

/* ---------- Sélection de questions ---------- */
function coursesSel() { return state.course === "both" ? ["pw", "ps"] : [state.course]; }
function pool(types, courses = coursesSel()) {
  return ALL.filter(e => types.includes(e.type) && courses.includes(courseOf(e)));
}
function weightedPick(list, n) {
  const ko = list.filter(e => state.ex[e.id]?.s === "ko");
  const fresh = list.filter(e => !state.ex[e.id]);
  const okd = list.filter(e => state.ex[e.id]?.s === "ok");
  return [...shuffle(ko), ...shuffle(fresh), ...shuffle(okd)].slice(0, n);
}
function stats(list) {
  const ok = list.filter(e => state.ex[e.id]?.s === "ok").length;
  return { ok, total: list.length, pct: list.length ? Math.round((ok / list.length) * 100) : 0 };
}

/* ---------- Écran d'accueil ---------- */
function home() {
  combo = 0;
  const L = levelInfo();
  const ko = ALL.filter(e => state.ex[e.id]?.s === "ko" && coursesSel().includes(courseOf(e))).length;
  const s = streak();
  const seg = (val, label) => h("button", { type: "button", class: "seg" + (state.course === val ? " on" : ""), "aria-pressed": state.course === val ? "true" : "false",
    onclick: () => { state.course = val; save(); home(); } }, label);
  const tile = (title, sub, onclick, cls = "") => h("button", { type: "button", class: "tile " + cls, onclick }, h("span", { class: "tile-t" }, title), h("span", { class: "tile-s" }, sub));

  rc(app, 
    h("header", { class: "hero" },
      h("div", { class: "hero-top" },
        h("div", null, h("div", { class: "eyebrow" }, "Examens du mardi 24"), h("h1", null, "Révisions")),
        h("div", { class: "badge-col" },
          h("div", { class: "lvl" }, `Niveau ${L.n}`),
          h("div", { class: "lvl-name" }, L.name))),
      h("div", { class: "xpbar", role: "progressbar", "aria-valuemin": "0", "aria-valuemax": String(L.need), "aria-valuenow": String(L.into) }, h("i", { style: `width:${(L.into / L.need) * 100}%` })),
      h("div", { class: "hero-stats" },
        h("span", null, h("b", null, state.xp), " XP"),
        h("span", null, h("b", null, s), s > 1 ? " jours de suite" : " jour"),
        h("span", null, "meilleure série ", h("b", null, state.bestCombo)))),
    h("div", { class: "segs", role: "group", "aria-label": "Cours" }, seg("both", "Les deux"), seg("pw", "ProgWeb"), seg("ps", "ProgServ2")),
    h("section", { class: "courses" }, ["pw", "ps"].filter(c => coursesSel().includes(c)).map(c => {
      const st = stats(ALL.filter(e => courseOf(e) === c && !WRITE_TYPES.includes(e.type)));
      return h("div", { class: "course-card " + c },
        h("div", { class: "cc-top" }, h("span", { class: "cc-name" }, COURSE[c]), h("span", { class: "cc-pct" }, st.pct + " %")),
        h("div", { class: "bar" }, h("i", { style: `width:${st.pct}%` })),
        h("div", { class: "cc-sub" }, `${st.ok} questions réussies sur ${st.total}`));
    })),
    h("div", { class: "tiles" },
      tile("Défi éclair", "10 questions mélangées · 5 min", () => run(eclair()), "big"),
      tile("Apprendre", "Théorie animée, puis questions", () => chapters()),
      tile("Remettre dans l'ordre", `${pool(["order"]).length} exercices`, () => run(byType("order", "Remettre dans l'ordre"))),
      tile("Compléter le code", `${pool(["fill"]).length} exercices`, () => run(byType("fill", "Compléter le code"))),
      tile("Examen blanc", "20 questions, avec une note", () => run(examBlanc())),
      tile("Mes erreurs", ko ? `${ko} à refaire` : "Rien à refaire", () => ko ? run(review()) : toast("Aucune erreur à refaire pour l'instant")),
      tile("Fiches résumé", "Tout un chapitre sur un écran", () => sheets()),
      tile("Écrire du code", "Exercices sur papier ou au clavier", () => run(byType(WRITE_TYPES, "Écrire du code")))),
    h("button", { type: "button", class: "row sync-row", onclick: () => syncScreen() },
      h("span", { class: "row-main" }, h("span", { class: "row-t" }, "Synchroniser iPhone et iPad"), h("span", { class: "row-s" }, "Envoyer ou recevoir la progression par AirDrop")), h("span", { class: "chev" }, "›")),
    h("p", { class: "foot" }, "Fonctionne hors ligne. Votre progression reste sur cet appareil.")
  );
  window.scrollTo(0, 0);
}

/* ---------- Sessions ---------- */
function eclair() { return { title: "Défi éclair", steps: weightedPick(pool(QUIZ_TYPES), 10).map(e => ({ q: e.id })) }; }
function byType(types, title) {
  types = [].concat(types);
  const list = pool(types);
  const sorted = [...list.filter(e => state.ex[e.id]?.s !== "ok"), ...list.filter(e => state.ex[e.id]?.s === "ok")];
  return { title, steps: sorted.map(e => ({ q: e.id })) };
}
function examBlanc() {
  const steps = [];
  for (const c of coursesSel()) {
    const n = coursesSel().length === 2 ? 0.5 : 1;
    steps.push(...pick(pool(["qcm"], [c]), Math.round(8 * n)), ...pick(pool(["open"], [c]), Math.round(3 * n)),
      ...pick(pool(["order"], [c]), Math.round(4 * n)), ...pick(pool(["fill"], [c]), Math.round(4 * n)), ...pick(pool(["paper"], [c]), Math.round(1 * n)));
  }
  return { title: "Examen blanc", exam: true, steps: steps.map(e => ({ q: e.id })) };
}
function review() {
  return { title: "Mes erreurs", fresh: true, steps: shuffle(ALL.filter(e => state.ex[e.id]?.s === "ko" && coursesSel().includes(courseOf(e)))).map(e => ({ q: e.id })) };
}
function learn(chId) {
  const ch = chapterById[chId];
  const lessons = LESSONS[chId] || [];
  const qs = ALL.filter(e => e.ch === chId && QUIZ_TYPES.includes(e.type));
  return { title: ch.title, sub: COURSE[ch.course], chapter: chId,
    steps: [...lessons.map(L => ({ lesson: L })), { summary: ch }, ...qs.map(e => ({ q: e.id }))] };
}

let session = null;
function run(s) {
  if (!s.steps.length) { toast("Rien à faire ici pour l'instant"); return; }
  session = Object.assign({ pos: 0, results: [], gained: 0, startCombo: combo }, s);
  combo = 0;
  step();
}
function step() {
  const s = session;
  if (s.pos >= s.steps.length) return finish();
  const st = s.steps[s.pos];
  const total = s.steps.length;
  const qTotal = s.steps.filter(x => x.q).length;
  const qIndex = s.steps.slice(0, s.pos + 1).filter(x => x.q).length;
  const label = st.lesson ? "Théorie" : st.summary ? "Résumé" : `Question ${qIndex} / ${qTotal}`;
  const next = () => { s.pos++; step(); window.scrollTo(0, 0); };
  const prev = s.pos > 0 ? () => { s.pos--; step(); window.scrollTo(0, 0); } : null;

  let body;
  if (st.lesson) body = lessonCard(st.lesson, next, prev);
  else if (st.summary) body = summaryCard(st.summary, () => { state.read[st.summary.id] = true; save(); next(); }, prev);
  else body = questionCard(exById[st.q], (ok, selfGraded) => {
    s.results.push({ id: st.q, ok });
    s.gained += award(ok, selfGraded);
    if (combo >= 3) comboChip.textContent = `Série ×${combo}`;
  }, next);

  const comboChip = h("span", { class: "combo" + (combo >= 2 ? " on" : "") }, combo >= 2 ? `Série ×${combo}` : "");
  rc(app, 
    h("div", { class: "topbar" },
      h("button", { type: "button", class: "back", onclick: () => confirmQuit() }, "‹ Accueil"),
      h("span", { class: "tb-mid" }, comboChip),
      h("span", { class: "tb-step" }, label)),
    h("div", { class: "progress" }, h("i", { style: `width:${(s.pos / total) * 100}%` })),
    h("div", { class: "s-head" }, h("div", { class: "eyebrow" }, s.sub || (session.exam ? "Conditions d'examen : sans théorie" : "Entraînement")), h("h2", null, s.title)),
    body);
}
function confirmQuit() {
  if (!session || session.results.length === 0) return home();
  const dlg = h("div", { class: "modal", role: "dialog", "aria-modal": "true" },
    h("div", { class: "modal-card" },
      h("p", null, "Quitter la séance ? Vos réponses déjà données sont enregistrées."),
      h("div", { class: "actions" },
        h("button", { type: "button", class: "btn main", onclick: () => { dlg.remove(); home(); } }, "Quitter"),
        h("button", { type: "button", class: "btn", onclick: () => dlg.remove() }, "Continuer"))));
  document.body.append(dlg);
}
function finish() {
  const s = session;
  const ok = s.results.filter(r => r.ok).length;
  const n = s.results.length;
  const note = n ? Math.round((1 + 5 * ok / n) * 10) / 10 : null;
  const msg = !n ? "Théorie terminée." : ok === n ? "Parfait." : ok / n >= 0.7 ? "Très bien joué." : ok / n >= 0.4 ? "Bon travail, continuez." : "Chaque erreur est une question de gagnée pour mardi.";
  rc(app, 
    h("div", { class: "end" },
      h("canvas", { id: "confetti", "aria-hidden": "true" }),
      h("div", { class: "eyebrow" }, s.title),
      h("h2", null, msg),
      n ? h("div", { class: "big-score" }, `${ok} / ${n}`) : null,
      h("div", { class: "end-stats" },
        n ? h("div", null, h("b", null, `+${s.gained}`), h("span", null, "XP")) : null,
        s.exam && note ? h("div", null, h("b", null, note.toFixed(1)), h("span", null, "note estimée")) : null,
        h("div", null, h("b", null, levelInfo().n), h("span", null, "niveau"))),
      n - ok > 0 ? h("p", { class: "muted" }, `${n - ok} question${n - ok > 1 ? "s" : ""} rejoignent « Mes erreurs ».`) : null,
      h("div", { class: "actions center" },
        h("button", { type: "button", class: "btn main", onclick: () => home() }, "Accueil"),
        s.chapter ? null : h("button", { type: "button", class: "btn", onclick: () => run(s.title === "Défi éclair" ? eclair() : s.exam ? examBlanc() : s.title === "Mes erreurs" ? review() : Object.assign({}, s, { pos: 0 })) }, "Recommencer"))));
  if (n && ok / n >= 0.7) confetti();
  window.scrollTo(0, 0);
}
function confetti() {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const c = document.getElementById("confetti"); if (!c) return;
  const ctx = c.getContext("2d");
  c.width = c.offsetWidth * devicePixelRatio; c.height = c.offsetHeight * devicePixelRatio;
  const colors = ["#2f6fdb", "#e8590c", "#7048e8", "#2f9e44", "#f2b705"];
  const parts = Array.from({ length: 90 }, () => ({ x: c.width / 2, y: c.height * 0.35, vx: (Math.random() - 0.5) * 16 * devicePixelRatio, vy: (Math.random() * -12 - 4) * devicePixelRatio, r: (3 + Math.random() * 4) * devicePixelRatio, col: colors[Math.floor(Math.random() * colors.length)], a: 1 }));
  let t = 0;
  (function frame() {
    ctx.clearRect(0, 0, c.width, c.height);
    parts.forEach(p => { p.x += p.vx; p.y += p.vy; p.vy += 0.45 * devicePixelRatio; p.a -= 0.012; ctx.globalAlpha = Math.max(p.a, 0); ctx.fillStyle = p.col; ctx.fillRect(p.x, p.y, p.r, p.r * 1.6); });
    if (++t < 90) requestAnimationFrame(frame); else ctx.clearRect(0, 0, c.width, c.height);
  })();
}

/* ---------- Écran de synchronisation ---------- */
function syncScreen(message) {
  const code = exportCode();
  const answered = Object.keys(state.ex).length;
  const ta = h("textarea", { id: "sync-in", "aria-label": "Code reçu", placeholder: "Touchez ici, puis Coller" });
  const status = h("p", { class: "muted", role: "status" });
  app.replaceChildren(
    h("div", { class: "topbar" }, h("button", { type: "button", class: "back", onclick: home }, "‹ Accueil"), h("span"), h("span")),
    h("div", { class: "s-head" }, h("div", { class: "eyebrow" }, "Synchroniser"), h("h2", null, "iPhone et iPad")),
    h("article", { class: "card" },
      h("h3", null, "1. Sur l'appareil qui envoie"),
      h("p", null, `Cette progression contient ${answered} réponses et ${state.xp} XP.`),
      h("div", { class: "actions" },
        h("button", { type: "button", class: "btn main", onclick: async () => {
          try {
            if (navigator.share) { await navigator.share({ title: "Ma progression de révisions", text: code }); return; }
            throw new Error("pas de partage");
          } catch (e) {
            if (e && e.name === "AbortError") return;
            try { await navigator.clipboard.writeText(code); status.textContent = "Code copié. Collez-le dans Messages ou Notes pour l'envoyer."; }
            catch (e2) { codeBox.hidden = false; status.textContent = "Sélectionnez le code ci-dessous et copiez-le."; }
          }
        } }, "Envoyer ma progression"),
        h("button", { type: "button", class: "btn", onclick: async () => {
          try { await navigator.clipboard.writeText(code); status.textContent = "Code copié."; }
          catch (e) { codeBox.hidden = false; status.textContent = "Sélectionnez le code ci-dessous et copiez-le."; }
        } }, "Copier le code")),
      status),
    h("article", { class: "card" },
      h("h3", null, "2. Sur l'appareil qui reçoit"),
      h("p", null, "Collez le code reçu par AirDrop ou Messages. Les deux progressions sont fusionnées : rien n'est perdu, et pour chaque question, c'est la réponse la plus récente qui compte."),
      ta,
      h("div", { class: "actions" }, h("button", { type: "button", class: "btn main", onclick: () => {
        try { const n = importCode(ta.value); syncScreen(`Fusion réussie : ${n} réponse${n > 1 ? "s" : ""} mise${n > 1 ? "s" : ""} à jour. Vous avez maintenant ${state.xp} XP.`); toast("Progression fusionnée"); }
        catch (e) { status2.textContent = "Ce code n'est pas reconnu. Vérifiez qu'il commence par REVISIONS1: et qu'il est complet."; }
      } }, "Fusionner"))),
    h("p", { class: "foot" }, "Astuce : faites l'échange dans les deux sens (iPhone vers iPad, puis iPad vers iPhone) pour avoir exactement la même progression sur les deux.")
  );
  const codeBox = h("textarea", { readonly: true, hidden: true, "aria-label": "Votre code" }, code);
  const status2 = h("p", { class: "muted", role: "status" }, message || "");
  app.children[2].append(codeBox);
  app.children[3].append(status2);
  window.scrollTo(0, 0);
}

/* ---------- Listes ---------- */
function chapters() {
  rc(app, 
    h("div", { class: "topbar" }, h("button", { type: "button", class: "back", onclick: home }, "‹ Accueil"), h("span"), h("span")),
    h("div", { class: "s-head" }, h("div", { class: "eyebrow" }, "Apprendre"), h("h2", null, "Choisissez un chapitre")),
    ...coursesSel().map(c => h("section", { class: "list-block" }, h("h3", null, COURSE[c]),
      h("div", { class: "rows" }, CHAPTERS.filter(ch => ch.course === c).map(ch => {
        const st = stats(ALL.filter(e => e.ch === ch.id && QUIZ_TYPES.includes(e.type)));
        return h("button", { type: "button", class: "row", onclick: () => run(learn(ch.id)) },
          h("span", { class: "row-main" }, h("span", { class: "row-t" }, ch.title), h("span", { class: "row-s" }, ch.tp)),
          h("span", { class: "ring", style: `--p:${st.pct}` }, h("span", null, st.pct + "%")));
      })))));
  window.scrollTo(0, 0);
}
function sheets() {
  rc(app, 
    h("div", { class: "topbar" }, h("button", { type: "button", class: "back", onclick: home }, "‹ Accueil"), h("span"), h("span")),
    h("div", { class: "s-head" }, h("div", { class: "eyebrow" }, "Fiches résumé"), h("h2", null, "Tout un chapitre sur un écran")),
    ...coursesSel().map(c => h("section", { class: "list-block" }, h("h3", null, COURSE[c]),
      h("div", { class: "rows" }, CHAPTERS.filter(ch => ch.course === c).map(ch =>
        h("button", { type: "button", class: "row", onclick: () => sheet(ch.id) }, h("span", { class: "row-main" }, h("span", { class: "row-t" }, ch.title), h("span", { class: "row-s" }, `${ch.points.length} points`)), h("span", { class: "chev" }, "›")))))));
  window.scrollTo(0, 0);
}
function sheet(chId) {
  const ch = chapterById[chId];
  rc(app, 
    h("div", { class: "topbar" }, h("button", { type: "button", class: "back", onclick: sheets }, "‹ Fiches"), h("span"), h("span")),
    h("div", { class: "s-head" }, h("div", { class: "eyebrow" }, COURSE[ch.course]), h("h2", null, ch.title)),
    summaryCard(ch, () => run(learn(chId)), null, "M'entraîner sur ce chapitre"));
  window.scrollTo(0, 0);
}

/* ---------- Théorie ---------- */
function callout(kind, title, text) { return h("div", { class: "callout " + kind }, h("div", { class: "callout-t" }, title), h("div", null, rich(text))); }
function lessonCard(L, next, prev) {
  const card = h("article", { class: "card lesson" }, h("h3", null, L.t));
  (L.p || []).forEach(p => card.append(h("p", null, rich(p))));
  if (L.flow) card.append(h("div", { class: "flow" }, L.flow.flatMap((x, i) => [i ? h("span", { class: "arrow", "aria-hidden": "true" }, "↓") : null, h("div", { class: "step-box" }, rich(x))])));
  if (L.table) card.append(h("div", { class: "tbl" }, h("table", null,
    h("thead", null, h("tr", null, L.table.head.map(x => h("th", null, rich(x))))),
    h("tbody", null, L.table.rows.map(r => h("tr", null, r.map(c => h("td", null, rich(c)))))))));
  if (L.p2) card.append(h("p", null, rich(L.p2)));
  if (L.code) card.append(h("pre", null, h("code", null, L.code)));
  (L.anims || []).forEach(A => card.append(animBox(A)));
  if (L.prof) card.append(callout("prof", "Dit en cours", L.prof));
  if (L.trap) card.append(callout("trap", "Le piège", L.trap));
  if (L.keep) card.append(callout("keep", "À retenir", L.keep));
  card.append(h("div", { class: "actions" },
    h("button", { type: "button", class: "btn main", onclick: next }, "Suivant"),
    prev ? h("button", { type: "button", class: "btn", onclick: prev }, "Précédent") : null));
  return card;
}
function summaryCard(ch, next, prev, label = "Passer aux questions") {
  return h("article", { class: "card" },
    h("h3", null, "Résumé à retenir"),
    h("ul", { class: "theory" }, ch.points.map(p => p.startsWith("!")
      ? h("li", { class: "prof" }, h("b", null, "Dit en cours. "), rich(p.slice(1)))
      : h("li", null, rich(p)))),
    ch.code ? h("pre", null, h("code", null, ch.code)) : null,
    h("div", { class: "actions" },
      h("button", { type: "button", class: "btn main", onclick: next }, label),
      prev ? h("button", { type: "button", class: "btn", onclick: prev }, "Précédent") : null));
}
function animBox(A) {
  const box = h("section", { class: "anim" });
  const lines = A.code.split("\n");
  let i = 0, timer = null;
  const stop = () => { if (timer) { clearInterval(timer); timer = null; } };
  function draw() {
    const st = A.steps[i];
    const hl = new Set([].concat(st.line ?? []));
    const state_ = h("div", { class: "anim-state" });
    if (st.vars) state_.append(h("div", { class: "vars" }, Object.entries(st.vars).map(([k, v]) => h("div", { class: "var" }, h("code", null, k), h("span", { class: "eq" }, "="), h("code", { class: "val" }, v)))));
    (st.groups || []).forEach(g => state_.append(h("div", { class: "grp" }, h("div", { class: "grp-l" }, g.label),
      h("div", { class: "chips" }, g.items.length ? g.items.map(it => typeof it === "string" ? h("span", { class: "chip" }, it) : h("span", { class: "chip " + (it.c || "") }, it.v)) : h("span", { class: "chip empty" }, "vide")))));
    if (st.out != null) state_.append(h("div", { class: "out" }, h("span", { class: "grp-l" }, "Résultat"), h("code", null, st.out)));
    const last = i === A.steps.length - 1;
    rc(box, 
      h("div", { class: "anim-head" }, h("span", { class: "anim-tag" }, "Exemple animé"), h("span", { class: "anim-count" }, `Étape ${i + 1} / ${A.steps.length}`)),
      h("div", { class: "anim-title" }, A.title),
      h("pre", { class: "anim-code" }, lines.map((t, n) => h("span", { class: "ln" + (hl.has(n + 1) ? " on" : "") }, h("span", { class: "no" }, String(n + 1)), t + "\n"))),
      h("p", { class: "anim-note" }, rich(st.note)),
      state_.childNodes.length ? state_ : null,
      h("div", { class: "actions" },
        last ? h("button", { type: "button", class: "btn main", onclick: () => { stop(); i = 0; draw(); } }, "Recommencer")
             : h("button", { type: "button", class: "btn main", onclick: () => { stop(); i++; draw(); } }, "Étape suivante"),
        i > 0 ? h("button", { type: "button", class: "btn", onclick: () => { stop(); i--; draw(); } }, "Précédente") : null,
        !last ? h("button", { type: "button", class: "btn quiet", onclick: () => { if (timer) { stop(); draw(); return; } timer = setInterval(() => { if (i < A.steps.length - 1) { i++; draw(); } else stop(); }, 2200); draw(); } }, timer ? "Pause" : "Lecture auto") : null));
  }
  draw();
  return box;
}

/* ---------- Questions ---------- */
const KICKER = { qcm: "Choisissez une réponse", open: "Répondez, puis regardez la correction", paper: "Sur papier, puis regardez la correction",
  practice: "Écrivez le code, puis regardez la correction", order: "Touchez les lignes dans le bon ordre", fill: "Touchez un trou, puis choisissez la bonne réponse" };

function questionCard(ex, onResult, next) {
  const card = h("article", { class: "card q-card" });
  const course = courseOf(ex);
  const done = (ok, selfGraded) => { state.ex[ex.id] = { s: ok ? "ok" : "ko", t: Date.now() }; save(); onResult(ok, selfGraded); };
  const nextBtn = () => h("div", { class: "actions" }, h("button", { type: "button", class: "btn main wide", onclick: next }, "Continuer"));
  const head = () => [
    h("div", { class: "q-top" }, h("span", { class: "pill " + course }, COURSE[course]), h("span", { class: "pill" }, chapterById[ex.ch].title)),
    h("div", { class: "kicker" }, KICKER[ex.type]),
    h("div", { class: "q" }, rich(ex.q)),
    ex.code && ex.type !== "fill" ? h("pre", null, h("code", null, ex.code)) : null].filter(Boolean);

  /* QCM */
  if (ex.type === "qcm") {
    let answered = false;
    const opts = h("div", { class: "opts" });
    const fb = h("div", { class: "stack" });
    ex.opts.forEach((o, i) => opts.append(h("button", { type: "button", class: "opt", onclick: e => {
      if (answered) return; answered = true;
      const ok = i === ex.a;
      [...opts.children].forEach((b, k) => { b.disabled = true; if (k === ex.a) b.classList.add("right"); else if (k === i) b.classList.add("wrong"); });
      done(ok);
      rc(fb, h("div", { class: "feedback " + (ok ? "ok" : "ko") }, h("b", null, ok ? "Juste. " : `Faux, c'était ${"ABCDEF"[ex.a]}. `), rich(ex.exp)), nextBtn());
    } }, h("span", { class: "k" }, "ABCDEF"[i]), h("span", null, rich(o)))));
    card.append(...head(), opts, fb);
    return card;
  }

  /* Remettre dans l'ordre : on touche les lignes dans l'ordre */
  if (ex.type === "order") {
    const rnd = seeded(ex.id);
    let poolIdx = shuffle(ex.lines.map((_, i) => i), rnd);
    if (poolIdx.every((v, i) => ex.lines[v] === ex.lines[i])) poolIdx.push(poolIdx.shift());
    let answer = [];
    let checked = false;
    const wrap = h("div", { class: "stack" });
    function draw() {
      const per = checked ? answer.map((li, pos) => ex.lines[li] === ex.lines[pos]) : null;
      rc(wrap, 
        h("div", { class: "ord-label" }, `Votre programme (${answer.length} / ${ex.lines.length})`),
        h("ol", { class: "ord-answer" }, answer.length ? answer.map((li, pos) => h("li", null,
          h("button", { type: "button", class: "ord-line" + (per ? (per[pos] ? " good" : " bad") : ""), disabled: checked, onclick: () => { answer.splice(pos, 1); poolIdx.push(li); draw(); } },
            h("span", { class: "ord-n" }, pos + 1), h("code", null, ex.lines[li])))) : h("li", { class: "ord-empty" }, "Touchez la première ligne du programme ci-dessous")),
        !checked ? h("div", { class: "ord-label" }, "Lignes disponibles") : null,
        !checked ? h("div", { class: "ord-pool" }, poolIdx.map((li, k) => h("button", { type: "button", class: "ord-line", onclick: () => { poolIdx.splice(k, 1); answer.push(li); draw(); } }, h("code", null, ex.lines[li])))) : null,
        !checked ? h("div", { class: "actions" },
          h("button", { type: "button", class: "btn main", disabled: poolIdx.length > 0, onclick: () => { checked = true; const ok = answer.every((li, pos) => ex.lines[li] === ex.lines[pos]); done(ok); draw(); } }, "Vérifier"),
          answer.length ? h("button", { type: "button", class: "btn", onclick: () => { poolIdx = [...poolIdx, ...answer]; answer = []; draw(); } }, "Tout reprendre") : null) : null,
        checked ? h("div", { class: "feedback " + (per.every(Boolean) ? "ok" : "ko") }, h("b", null, per.every(Boolean) ? "Juste, tout est dans l'ordre. " : "Pas tout à fait : les lignes en rouge ne sont pas à leur place. "), rich(ex.exp)) : null,
        checked && !per.every(Boolean) ? h("div", null, h("div", { class: "kicker" }, "Le bon ordre"), h("pre", null, h("code", null, ex.lines.join("\n")))) : null,
        checked ? nextBtn() : null);
    }
    card.append(...head(), wrap);
    draw();
    return card;
  }

  /* Compléter le code */
  if (ex.type === "fill") {
    const rnd = seeded(ex.id);
    const choices = ex.blanks.map(b => shuffle(b.opts, rnd));
    const filled = ex.blanks.map(() => null);
    let active = 0, checked = false;
    const wrap = h("div", { class: "stack" });
    const letter = i => "abcdefgh"[i];
    function draw() {
      const parts = ex.code.split(/\[\[(\d+)\]\]/);
      const pre = h("pre", { class: "fill-code" }, h("code", null, parts.map((p, k) => {
        if (k % 2 === 0) return p;
        const i = +p;
        const cls = "blank" + (i === active && !checked ? " active" : "") + (filled[i] ? " filled" : "") + (checked ? (filled[i] === ex.blanks[i].a ? " good" : " bad") : "");
        return h("button", { type: "button", class: cls, disabled: checked, onclick: () => { active = i; draw(); } }, filled[i] ?? `(${letter(i)})`);
      })));
      const allFilled = filled.every(v => v !== null);
      rc(wrap, pre,
        !checked ? h("div", { class: "fill-pick" },
          h("div", { class: "ord-label" }, `Trou (${letter(active)})`),
          h("div", { class: "fill-opts" }, choices[active].map(o => h("button", { type: "button", class: "fill-opt" + (filled[active] === o ? " on" : ""), onclick: () => {
            filled[active] = o;
            const nextEmpty = filled.findIndex(v => v === null);
            if (nextEmpty >= 0) active = nextEmpty;
            draw();
          } }, h("code", null, o))))) : null,
        !checked ? h("div", { class: "actions" }, h("button", { type: "button", class: "btn main", disabled: !allFilled, onclick: () => {
          checked = true; done(filled.every((v, i) => v === ex.blanks[i].a)); draw();
        } }, "Vérifier")) : null,
        checked ? (() => {
          const ok = filled.every((v, i) => v === ex.blanks[i].a);
          return h("div", null,
            h("div", { class: "feedback " + (ok ? "ok" : "ko") }, h("b", null, ok ? "Juste, tout est complet. " : "Pas tout à fait. "), rich(ex.exp)),
            ok ? null : h("ul", { class: "fill-sol" }, ex.blanks.map((b, i) => filled[i] === b.a ? null : h("li", null, `(${letter(i)}) `, h("code", null, b.a), "  au lieu de  ", h("code", null, filled[i])))),
            nextBtn());
        })() : null);
    }
    card.append(...head(), wrap);
    draw();
    return card;
  }

  /* Questions ouvertes, sur papier, exercices pratiques : auto-évaluation */
  let revealed = false, hints = 0;
  const wrap = h("div", { class: "stack" });
  function draw() {
    const items = [];
    if (!revealed) {
      if (ex.type === "open" || ex.type === "practice") items.push(h("textarea", { "aria-label": "Votre réponse", placeholder: ex.type === "practice" ? "Votre code…" : "Votre réponse…", class: ex.type === "practice" ? "big" : "" }));
      if (ex.type === "practice") (ex.hints || []).slice(0, hints).forEach((t, k) => items.push(callout("prof", `Indice ${k + 1}`, t)));
      items.push(h("div", { class: "actions" },
        h("button", { type: "button", class: "btn main", onclick: () => { revealed = true; draw(); } }, "Voir la correction"),
        ex.type === "practice" && hints < (ex.hints || []).length ? h("button", { type: "button", class: "btn", onclick: () => { hints++; draw(); } }, hints ? "Un autre indice" : "Un indice") : null));
    } else {
      items.push(h("div", { class: "kicker" }, "Correction"), h("pre", null, h("code", null, ex.sol)), h("p", { class: "exp" }, rich(ex.exp)));
      const graded = h("div", { class: "actions" },
        h("button", { type: "button", class: "btn good", onclick: () => { done(true, true); graded.replaceWith(nextBtn()); } }, "J'avais juste"),
        h("button", { type: "button", class: "btn bad", onclick: () => { done(false, true); graded.replaceWith(nextBtn()); } }, "À revoir"));
      items.push(graded);
    }
    rc(wrap, ...items);
  }
  card.append(...head(), wrap);
  draw();
  return card;
}

/* ---------- Démarrage ---------- */
home();
if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  navigator.serviceWorker.register("sw.js").catch(() => {});
}
