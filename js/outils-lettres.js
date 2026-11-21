// Outils des jeux de lettres, de chiffres et de plateau.
// Le dictionnaire (dico.js) n'est chargé que lorsqu'un jeu de mots en a besoin.

let DICO = null, DICO_WAIT = null;
function withDico(cb) {
  if (DICO) return cb(DICO);
  if (DICO_WAIT) { DICO_WAIT.push(cb); return; }
  DICO_WAIT = [cb];
  const build = () => {
    DICO = new Set();
    Object.entries(DICO_PAR_LONGUEUR).forEach(([L, s]) => { L = +L; for (let i = 0; i < s.length; i += L) DICO.add(s.slice(i, i + L)); });
    const w = DICO_WAIT; DICO_WAIT = null; w.forEach(f => f(DICO));
  };
  if (typeof DICO_PAR_LONGUEUR !== "undefined") return build();
  const sc = document.createElement("script");
  sc.src = "js/dico.js";
  sc.onload = build;
  sc.onerror = () => { const w = DICO_WAIT; DICO_WAIT = null; w.forEach(f => f(null)); };
  document.head.appendChild(sc);
}
const normWord = s => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toUpperCase().replace(/[^A-Z]/g, "");
const rnd = a => a[Math.floor(Math.random() * a.length)];
const otherOf = n => state.players[0] === n ? state.players[1] : state.players[0];
function tool(parent, cls) { const b = el("div", "mini-tool " + cls); parent.appendChild(b); return b; }
function btn(text, cls) { return el("button", "secondary-btn mini-btn " + (cls || ""), text); }
function scoreLine(scores) { return state.players.map(p => `${p} ${scores[p] || 0}`).join(" · "); }

// ——— Échelle de mots ———
function addLadder(parent, first) {
  withDico(() => {});
  const box = tool(parent, "ladder");
  let pool = shuffle([...ECHELLES]);
  const start = () => {
    box.innerHTML = "";
    const path = pool.length ? pool.pop() : (pool = shuffle([...ECHELLES])).pop();
    const from = path[0], to = path[path.length - 1];
    const chain = [from];
    let player = first();
    const goal = el("div", "ladder-goal", `${from} → ${to}`);
    const sub = el("div", "answers-note", `Solution la plus courte : ${path.length - 1} changements.`);
    const list = el("div", "ladder-chain");
    const msg = el("div", "answers-note");
    const input = el("input"); input.maxLength = 4; input.autocomplete = "off"; input.autocapitalize = "characters";
    const row = el("div", "mini-step-actions");
    const ok = btn("Valider ✓"), pass = btn("Je bloque, je passe"), sol = btn("Voir une solution"), other = btn("🎲 Autre défi", "mini-dice");
    row.append(ok, pass, sol, other);
    box.append(goal, sub, list, msg, input, row);
    const paint = (m) => {
      list.innerHTML = "";
      chain.forEach((w, k) => { const c = el("span", "ladder-word" + (w === to ? " win" : ""), w); list.appendChild(c); if (k < chain.length - 1) list.appendChild(el("span", "ladder-arrow", "→")); });
      const done = chain[chain.length - 1] === to;
      input.style.display = ok.style.display = pass.style.display = done ? "none" : "";
      msg.textContent = m || (done ? `Arrivés à ${to} en ${chain.length - 1} changements !` : `À ${player} : change une seule lettre de ${chain[chain.length - 1]}.`);
    };
    const accept = w => { chain.push(w); input.value = ""; player = otherOf(player); paint(); if (w === to) toast("Bravo, vous y êtes !"); };
    let busy = false;
    ok.addEventListener("click", () => {
      if (busy) return;
      const w = normWord(input.value), last = chain[chain.length - 1];
      if (w.length !== 4) return paint("Le mot doit faire 4 lettres.");
      const diff = [...w].filter((c, k) => c !== last[k]).length;
      if (diff !== 1) return paint(`Il faut changer exactement une lettre de ${last}.`);
      if (chain.includes(w)) return paint(`${w} a déjà été utilisé.`);
      busy = true;
      withDico(d => {
        busy = false;
        if (!d || d.has(w)) return accept(w);
        msg.textContent = `« ${w} » n'est pas dans le dictionnaire de l'appli. ${otherOf(player)} l'accepte ?`;
        const yes = btn("Oui, on l'accepte");
        yes.addEventListener("click", () => { yes.remove(); accept(w); });
        msg.appendChild(el("br")); msg.appendChild(yes);
      });
    });
    input.addEventListener("keydown", e => { if (e.key === "Enter") ok.click(); });
    pass.addEventListener("click", () => { toast(`${player} passe la main : 1 point pour ${otherOf(player)}.`); player = otherOf(player); paint(); });
    sol.addEventListener("click", () => paint("Une solution : " + path.join(" → ")));
    other.addEventListener("click", start);
    paint();
  };
  start();
  return start;
}

// ——— Le mot le plus long ———
const VOYELLES = "AAAAEEEEEEIIIIOOOUUUY";
const CONSONNES = "BBCCCDDDFFGGHJLLLLLMMMNNNNNNPPPQRRRRRRSSSSSSTTTTTTVVXZ";
function addLongestWord(parent) {
  withDico(() => {});
  const box = tool(parent, "longest");
  const start = () => {
    box.innerHTML = "";
    let letters = [];
    const tiles = el("div", "letter-tiles"), note = el("div", "answers-note"), row = el("div", "mini-step-actions");
    const v = btn("Voyelle"), c = btn("Consonne"), auto = btn("🎲 Tirage automatique", "mini-dice");
    row.append(v, c, auto);
    const after = el("div");
    box.append(note, tiles, row, after);
    const paint = () => {
      tiles.innerHTML = "";
      for (let k = 0; k < 9; k++) tiles.appendChild(el("span", "letter-tile", letters[k] || ""));
      note.textContent = letters.length < 9 ? `Choisissez voyelle ou consonne : lettre ${letters.length + 1} / 9.` : "Tirage terminé : lancez le chrono et cherchez le mot le plus long !";
      row.style.display = letters.length < 9 ? "" : "none";
      if (letters.length === 9) writing();
    };
    const addL = s => { if (letters.length < 9) { letters.push(rnd(s)); paint(); } };
    v.addEventListener("click", () => addL(VOYELLES));
    c.addEventListener("click", () => addL(CONSONNES));
    auto.addEventListener("click", () => { letters = []; const nv = 3 + Math.floor(Math.random() * 2); for (let k = 0; k < 9; k++) letters.push(rnd(k < nv ? VOYELLES : CONSONNES)); letters = shuffle(letters); paint(); });
    const fits = w => { const pool = [...letters]; for (const ch of w) { const k = pool.indexOf(ch); if (k < 0) return false; pool.splice(k, 1); } return true; };
    const writing = () => {
      after.innerHTML = "";
      const answers = [];
      const step = k => {
        after.innerHTML = "";
        if (k >= 2) {
          const r = btn("Révéler et vérifier 👀");
          r.addEventListener("click", () => withDico(d => {
            after.innerHTML = "";
            const grid = el("div", "answers-grid");
            answers.forEach(a => {
              const w = normWord(a.text), ok = w.length > 0 && fits(w) && (!d || d.has(w));
              const card = el("div", "answers-card");
              card.appendChild(el("b", "", a.name));
              card.appendChild(el("p", "", w ? `${w} — ${ok ? w.length + " lettres ✓" : (fits(w) ? "pas dans le dictionnaire ✗" : "lettres non disponibles ✗")}` : "(rien)"));
              grid.appendChild(card);
            });
            after.appendChild(grid);
            if (d) {
              let best = "";
              d.forEach(w => { if (w.length > best.length && w.length <= 9 && fits(w)) best = w; });
              if (best) after.appendChild(el("div", "answers-note", `Le plus long possible : ${best} (${best.length} lettres).`));
            }
            const again = btn("🎲 Nouveau tirage", "mini-dice"); again.addEventListener("click", start); after.appendChild(again);
          }));
          after.appendChild(r);
          return;
        }
        const name = state.players[(state.turn + k) % 2];
        after.appendChild(el("div", "answers-note", `${name} écrit son mot en secret.`));
        const t = el("input"); t.autocomplete = "off";
        const h = btn(k === 0 ? "Cacher et passer ✓" : "Cacher ✓");
        h.addEventListener("click", () => { answers.push({ name, text: t.value }); step(k + 1); });
        after.append(t, h);
      };
      step(0);
    };
    paint();
  };
  start();
  return start;
}

// ——— Le compte est bon ———
function addCompte(parent) {
  const box = tool(parent, "compte");
  let pool = shuffle([...COMPTES]);
  const start = () => {
    box.innerHTML = "";
    const c = pool.length ? pool.pop() : (pool = shuffle([...COMPTES])).pop();
    box.appendChild(el("div", "compte-cible", String(c.cible)));
    const tiles = el("div", "letter-tiles");
    c.plaques.forEach(n => tiles.appendChild(el("span", "letter-tile wide", String(n))));
    box.appendChild(tiles);
    const row = el("div", "mini-step-actions"), sol = btn("Voir une solution"), other = btn("🎲 Autre tirage", "mini-dice");
    const out = el("div", "answers-note");
    sol.addEventListener("click", () => { out.textContent = c.solution.join("  ·  "); });
    other.addEventListener("click", start);
    row.append(sol, other);
    box.append(row, out);
  };
  start();
  return start;
}

// ——— Motus ———
function addMotus(parent, first) {
  withDico(() => {});
  const box = tool(parent, "motus");
  const tries = {};
  let player = first(), pool = shuffle([...MOTUS_MOTS]);
  const start = () => {
    box.innerHTML = "";
    const word = pool.length ? pool.pop() : (pool = shuffle([...MOTUS_MOTS])).pop();
    const head = el("div", "answers-note"), grid = el("div", "motus-grid"), msg = el("div", "answers-note");
    const input = el("input"); input.maxLength = 5; input.autocomplete = "off";
    const ok = btn("Proposer ✓"), next = btn("Mot suivant →");
    next.style.display = "none";
    const row = el("div", "mini-step-actions"); row.append(ok, next);
    box.append(head, grid, msg, input, row);
    const guesses = [];
    const paint = () => {
      head.textContent = `À ${player} de trouver · essais : ${guesses.length} / 6 · ${scoreLine(tries)} (total des essais, le plus petit gagne)`;
      grid.innerHTML = "";
      for (let r = 0; r < 6; r++) {
        const line = el("div", "motus-row"), g = guesses[r];
        let res = Array(5).fill("");
        if (g) {
          const rest = [...word];
          res = [...g].map((ch, k) => { if (ch === word[k]) { rest[k] = null; return "good"; } return ""; });
          [...g].forEach((ch, k) => { if (!res[k]) { const j = rest.indexOf(ch); if (j >= 0) { rest[j] = null; res[k] = "near"; } else res[k] = "bad"; } });
        }
        for (let k = 0; k < 5; k++) line.appendChild(el("span", "motus-cell " + (res[k] || ""), g ? g[k] : (r === guesses.length && k === 0 ? word[0] : "")));
        grid.appendChild(line);
      }
    };
    const end = (won) => {
      tries[player] = (tries[player] || 0) + (won ? guesses.length : 7);
      msg.textContent = won ? `Trouvé en ${guesses.length} essai(s) !` : `Perdu, le mot était ${word} (compte 7 essais).`;
      input.style.display = ok.style.display = "none";
      next.style.display = "";
      paint();
    };
    ok.addEventListener("click", () => {
      const g = normWord(input.value);
      if (g.length !== 5) { msg.textContent = "Le mot doit faire 5 lettres."; return; }
      if (g[0] !== word[0]) { msg.textContent = `Le mot doit commencer par ${word[0]}.`; return; }
      withDico(d => {
        if (d && !d.has(g)) { msg.textContent = `« ${g} » n'est pas dans le dictionnaire : essai non compté.`; return; }
        guesses.push(g); input.value = ""; msg.textContent = "";
        if (g === word) end(true); else if (guesses.length >= 6) end(false); else paint();
      });
    });
    input.addEventListener("keydown", e => { if (e.key === "Enter") ok.click(); });
    next.addEventListener("click", () => { player = otherOf(player); start(); });
    paint();
  };
  start();
  return () => { player = first(); start(); };
}

// ——— Mastermind ———
const MM_COLORS = ["🔴", "🟠", "🟡", "🟢", "🔵", "🟣"];
function addMastermind(parent, first) {
  const box = tool(parent, "mastermind");
  const tries = {};
  let player = first();
  const start = () => {
    box.innerHTML = "";
    const code = Array.from({ length: 4 }, () => rnd(MM_COLORS));
    const head = el("div", "answers-note"), board = el("div", "mm-board"), cur = el("div", "mm-current"), pal = el("div", "mm-palette"), msg = el("div", "answers-note");
    const row = el("div", "mini-step-actions"), ok = btn("Valider ✓"), undo = btn("Effacer ←"), next = btn("Joueur suivant →");
    next.style.display = "none";
    row.append(undo, ok, next);
    box.append(head, board, cur, pal, row, msg);
    let guess = []; const hist = [];
    MM_COLORS.forEach(c => { const b = el("button", "mm-color", c); b.addEventListener("click", () => { if (guess.length < 4) { guess.push(c); paint(); } }); pal.appendChild(b); });
    const paint = () => {
      head.textContent = `À ${player} de trouver le code secret · essai ${hist.length + 1} / 10 · ${scoreLine(tries)} (total des essais, le plus petit gagne)`;
      board.innerHTML = "";
      hist.forEach(h => board.appendChild(el("div", "mm-line", `${h.g.join(" ")}   ${"●".repeat(h.good)}${"○".repeat(h.near)}`)));
      cur.textContent = [0, 1, 2, 3].map(k => guess[k] || "⚪").join(" ");
    };
    undo.addEventListener("click", () => { guess.pop(); paint(); });
    ok.addEventListener("click", () => {
      if (guess.length < 4) { msg.textContent = "Choisis 4 couleurs."; return; }
      let good = 0; const rc = [], rg = [];
      guess.forEach((g, k) => { if (g === code[k]) good++; else { rc.push(code[k]); rg.push(g); } });
      let near = 0; rg.forEach(g => { const j = rc.indexOf(g); if (j >= 0) { near++; rc.splice(j, 1); } });
      hist.push({ g: guess, good, near }); guess = [];
      msg.textContent = "● = bonne couleur bien placée · ○ = bonne couleur mal placée";
      if (good === 4 || hist.length >= 10) {
        tries[player] = (tries[player] || 0) + (good === 4 ? hist.length : 11);
        msg.textContent = good === 4 ? `Code trouvé en ${hist.length} essai(s) !` : `Perdu ! Le code était ${code.join(" ")} (compte 11 essais).`;
        ok.style.display = undo.style.display = pal.style.display = "none"; next.style.display = "";
      }
      paint();
    });
    next.addEventListener("click", () => { player = otherOf(player); start(); });
    paint();
  };
  start();
  return () => { player = first(); start(); };
}

// ——— Puissance 4 ———
function addConnect4(parent, first) {
  const box = tool(parent, "c4");
  const wins = {};
  let starter = first();
  const start = (swap) => {
    if (swap) starter = otherOf(starter);
    box.innerHTML = "";
    const R = 6, C = 7, g = Array.from({ length: R }, () => Array(C).fill(0));
    let turn = 1, over = false;
    const name = t => t === 1 ? starter : otherOf(starter);
    const msg = el("div", "answers-note"), grid = el("div", "c4-grid"), again = btn("Nouvelle partie ↻");
    box.append(msg, grid, again);
    again.addEventListener("click", () => start(true));
    const four = (r, c) => [[0, 1], [1, 0], [1, 1], [1, -1]].some(([dr, dc]) => {
      let n = 1;
      for (const s of [1, -1]) { let rr = r + dr * s, cc = c + dc * s; while (rr >= 0 && rr < R && cc >= 0 && cc < C && g[rr][cc] === turn) { n++; rr += dr * s; cc += dc * s; } }
      return n >= 4;
    });
    const paint = m => {
      grid.innerHTML = "";
      for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) {
        const cell = el("button", "c4-cell", g[r][c] ? (g[r][c] === 1 ? "🔴" : "🟡") : "");
        cell.addEventListener("click", () => drop(c));
        grid.appendChild(cell);
      }
      msg.textContent = m || `${name(turn)} joue ${turn === 1 ? "🔴" : "🟡"} — touche une colonne · score : ${scoreLine(wins)}`;
    };
    const drop = c => {
      if (over) return;
      let r = R - 1; while (r >= 0 && g[r][c]) r--;
      if (r < 0) return;
      g[r][c] = turn;
      if (four(r, c)) { over = true; wins[name(turn)] = (wins[name(turn)] || 0) + 1; return paint(`${name(turn)} aligne 4 pions et gagne ! Score : ${scoreLine(wins)}`); }
      if (g.every(row => row.every(Boolean))) { over = true; return paint("Grille pleine : égalité !"); }
      turn = 3 - turn; paint();
    };
    paint();
  };
  start();
  return () => { starter = first(); start(); };
}

// ——— Memory ———
const MEMORY_EMOJIS = ["🍓", "🌙", "⭐", "🎵", "🌸", "🍕", "🐱", "🎁", "☕", "🌈", "🦋", "🍒"];
function addMemory(parent, first) {
  const box = tool(parent, "memory");
  const start = () => {
    box.innerHTML = "";
    const cards = shuffle([...shuffle([...MEMORY_EMOJIS]).slice(0, 8)].flatMap(e => [e, e]));
    const found = Array(16).fill(false), pairs = {};
    let open = [], player = first(), lock = false;
    const msg = el("div", "answers-note"), grid = el("div", "memory-grid"), again = btn("🎲 Nouvelle partie", "mini-dice");
    box.append(msg, grid, again);
    again.addEventListener("click", start);
    const paint = m => {
      grid.innerHTML = "";
      cards.forEach((e, k) => {
        const shown = found[k] || open.includes(k);
        const b = el("button", "memory-card" + (found[k] ? " found" : ""), shown ? e : "");
        b.addEventListener("click", () => flip(k));
        grid.appendChild(b);
      });
      msg.textContent = m || `À ${player} de retourner deux cartes · paires : ${scoreLine(pairs)}`;
    };
    const flip = k => {
      if (lock || found[k] || open.includes(k)) return;
      open.push(k); paint();
      if (open.length < 2) return;
      const [a, b] = open;
      if (cards[a] === cards[b]) {
        found[a] = found[b] = true; open = [];
        pairs[player] = (pairs[player] || 0) + 1;
        if (found.every(Boolean)) {
          const [p1, p2] = state.players, s1 = pairs[p1] || 0, s2 = pairs[p2] || 0;
          return paint(s1 === s2 ? `Égalité, ${s1} paires chacun !` : `${s1 > s2 ? p1 : p2} gagne avec ${Math.max(s1, s2)} paires !`);
        }
        paint(`Paire trouvée ! ${player} rejoue · ${scoreLine(pairs)}`);
      } else {
        lock = true;
        setTimeout(() => { open = []; lock = false; player = otherOf(player); paint(); }, 1000);
      }
    };
    paint();
  };
  start();
  return start;
}

// ——— Anagrammes ———
function addAnagram(parent) {
  const box = tool(parent, "anagram");
  let pool = shuffle([...ANAGRAMMES]), n = 0;
  const start = () => {
    box.innerHTML = "";
    if (!pool.length) pool = shuffle([...ANAGRAMMES]);
    const [mix, sols] = pool.pop(); n++;
    const head = el("div", "answers-note", `Mot ${n} : ${mix.length} lettres`);
    const tiles = el("div", "letter-tiles");
    [...mix].forEach(ch => tiles.appendChild(el("span", "letter-tile", ch)));
    const out = el("div", "answers-note");
    const row = el("div", "mini-step-actions"), see = btn("Voir la réponse"), next = btn("🎲 Mot suivant", "mini-dice");
    see.addEventListener("click", () => { out.textContent = "Réponse : " + sols.join(" ou "); });
    next.addEventListener("click", start);
    row.append(see, next);
    box.append(head, tiles, row, out);
  };
  start();
  return () => { n = 0; start(); };
}

// ——— Boggle ———
const BOGGLE_LETTERS = "EEEEEEEEEEAAAAAAIIIIIISSSSSSNNNNNRRRRRTTTTTUUUUOOOOLLLLDDDCCCMMMPPGBVHFQJXZ";
function addBoggle(parent) {
  withDico(() => {});
  const box = tool(parent, "boggle");
  const start = () => {
    box.innerHTML = "";
    let grid;
    do { grid = Array.from({ length: 16 }, () => rnd(BOGGLE_LETTERS)); } while (grid.filter(c => "AEIOUY".includes(c)).length < 5);
    const g = el("div", "boggle-grid");
    grid.forEach(ch => g.appendChild(el("span", "boggle-cell", ch)));
    const other = btn("🎲 Nouvelle grille", "mini-dice");
    other.addEventListener("click", start);
    const after = el("div");
    box.append(g, other, after);
    const adj = k => { const r = Math.floor(k / 4), c = k % 4, out = []; for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++) { const rr = r + dr, cc = c + dc; if ((dr || dc) && rr >= 0 && rr < 4 && cc >= 0 && cc < 4) out.push(rr * 4 + cc); } return out; };
    const onGrid = w => { const go = (k, i, used) => { if (grid[k] !== w[i]) return false; if (i === w.length - 1) return true; used.add(k); const ok = adj(k).some(n => !used.has(n) && go(n, i + 1, used)); used.delete(k); return ok; }; return grid.some((_, k) => go(k, 0, new Set())); };
    const pts = w => w.length <= 4 ? 1 : w.length === 5 ? 2 : w.length === 6 ? 3 : w.length === 7 ? 5 : 11;
    const answers = [];
    const step = k => {
      after.innerHTML = "";
      if (k >= 2) {
        const r = btn("Révéler et compter 👀");
        r.addEventListener("click", () => withDico(d => {
          after.innerHTML = "";
          const lists = answers.map(a => [...new Set(a.text.split(/[\s,;]+/).map(normWord).filter(w => w.length >= 3))]);
          const grid2 = el("div", "answers-grid");
          answers.forEach((a, i) => {
            const mine = lists[i], theirs = lists[1 - i];
            let total = 0;
            const lines = mine.map(w => {
              const valid = onGrid(w) && (!d || d.has(w));
              if (!valid) return `${w} ✗`;
              if (theirs.includes(w)) return `${w} = (trouvé par les deux)`;
              total += pts(w); return `${w} +${pts(w)}`;
            });
            const card = el("div", "answers-card");
            card.appendChild(el("b", "", `${a.name} · ${total} point(s)`));
            card.appendChild(el("p", "", lines.join("\n") || "(rien)"));
            grid2.appendChild(card);
          });
          after.appendChild(grid2);
          if (d) {
            const best = []; d.forEach(w => { if (w.length >= 6 && onGrid(w)) best.push(w); });
            best.sort((x, y) => y.length - x.length);
            if (best.length) after.appendChild(el("div", "answers-note", "Mots longs possibles : " + best.slice(0, 8).join(", ")));
          }
        }));
        after.appendChild(r);
        return;
      }
      const name = state.players[(state.turn + k) % 2];
      after.appendChild(el("div", "answers-note", `${name} écrit ses mots en secret (séparés par des espaces).`));
      const t = el("textarea"); t.rows = 4;
      const h = btn(k === 0 ? "Cacher et passer ✓" : "Cacher ✓");
      h.addEventListener("click", () => { answers.push({ name, text: t.value }); step(k + 1); });
      after.append(t, h);
    };
    step(0);
  };
  start();
  return start;
}

// ——— C'est plus, c'est moins ———
function addHigherLower(parent, first) {
  const box = tool(parent, "plusmoins");
  const tries = {};
  let chooser = first();
  const start = () => {
    box.innerHTML = "";
    const guesser = otherOf(chooser);
    box.appendChild(el("div", "answers-note", `${chooser} tape un nombre secret entre 1 et 100 (${guesser} ne regarde pas).`));
    const s = el("input"); s.type = "password"; s.inputMode = "numeric"; s.autocomplete = "off";
    const ok = btn("Cacher ✓");
    box.append(s, ok);
    ok.addEventListener("click", () => {
      const secret = parseInt(s.value, 10);
      if (!(secret >= 1 && secret <= 100)) { toast("Choisis un nombre entre 1 et 100."); return; }
      box.innerHTML = "";
      let n = 0;
      const msg = el("div", "answers-note", `À ${guesser} de deviner !`), big = el("div", "compte-cible", "?");
      const g = el("input"); g.inputMode = "numeric"; g.autocomplete = "off";
      const go = btn("Proposer ✓"), next = btn("On échange les rôles →");
      next.style.display = "none";
      const row = el("div", "mini-step-actions"); row.append(go, next);
      box.append(big, msg, g, row);
      go.addEventListener("click", () => {
        const v = parseInt(g.value, 10); if (!(v >= 1 && v <= 100)) return;
        n++; g.value = "";
        if (v === secret) {
          tries[guesser] = (tries[guesser] || 0) + n;
          big.textContent = secret; msg.textContent = `Trouvé en ${n} essai(s) ! Total des essais : ${scoreLine(tries)} (le plus petit gagne).`;
          g.style.display = go.style.display = "none"; next.style.display = "";
        } else { big.textContent = v < secret ? "C'est plus ⬆" : "C'est moins ⬇"; msg.textContent = `Essai ${n} : ${v}`; }
      });
      g.addEventListener("keydown", e => { if (e.key === "Enter") go.click(); });
      next.addEventListener("click", () => { chooser = otherOf(chooser); start(); });
    });
  };
  start();
  return () => { chooser = first(); start(); };
}

// ——— Le plus rapide (réflexes) ———
function addReflex(parent) {
  const box = tool(parent, "reflex");
  const wins = {};
  const msg = el("div", "answers-note", "Chacun garde un doigt au-dessus de son bouton. Touchez « Prêts ? » pour lancer une manche.");
  const go = btn("Prêts ?");
  const pads = el("div", "reflex-pads");
  const signal = el("div", "reflex-signal", "…");
  let phase = "idle", timer = null;
  const pad = state.players.map(p => { const b = el("button", "reflex-pad", p); b.addEventListener("click", () => hit(p)); pads.appendChild(b); return b; });
  box.append(msg, signal, go, pads);
  const finish = (winner, why) => { phase = "idle"; clearTimeout(timer); wins[winner] = (wins[winner] || 0) + 1; signal.className = "reflex-signal"; signal.textContent = `${winner} gagne la manche ${why}`; msg.textContent = `Score : ${scoreLine(wins)} · Premier à 3 manches.`; go.style.display = ""; };
  const hit = p => {
    if (phase === "wait") finish(otherOf(p), `(${p} a touché trop tôt !)`);
    else if (phase === "go") finish(p, "⚡");
  };
  go.addEventListener("click", () => {
    phase = "wait"; go.style.display = "none"; signal.className = "reflex-signal wait"; signal.textContent = "Attendez…";
    timer = setTimeout(() => { phase = "go"; signal.className = "reflex-signal go"; signal.textContent = "TOUCHEZ !"; if (navigator.vibrate) navigator.vibrate(80); }, 1500 + Math.random() * 3000);
  });
  return () => { clearTimeout(timer); };
}
