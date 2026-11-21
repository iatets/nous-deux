// Outils intégrés aux mini-jeux : règles, compteurs, réponses secrètes,
// papier plié, morpion, pendu et jeu du 21. Aucun matériel nécessaire.

function el(tag, cls, text) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text !== undefined) e.textContent = text;
  return e;
}

// Encadré « Comment jouer » + « Points »
function addRules(parent, q) {
  if (!q.rules) return;
  const box = el("div", "mini-rules");
  box.appendChild(el("div", "mini-rules-head", "Comment jouer"));
  const ol = el("ol");
  q.rules.forEach(r => ol.appendChild(el("li", "", r)));
  box.appendChild(ol);
  if (q.points) {
    const p = el("div", "mini-rules-points");
    p.appendChild(el("b", "", "Points : "));
    p.appendChild(document.createTextNode(q.points));
    box.appendChild(p);
  }
  parent.appendChild(box);
}

// Compteur : { label, start, min, max, perPlayer }
function addTally(parent, cfg) {
  const box = el("div", "mini-tool mini-tally");
  const who = cfg.perPlayer ? state.players : [null];
  const rows = who.map(name => {
    const row = el("div", "tally-row");
    const lab = el("span", "tally-label", name ? `${cfg.label} · ${name}` : cfg.label);
    const minus = el("button", "secondary-btn mini-btn tally-btn", "−");
    const val = el("b", "tally-value");
    const plus = el("button", "secondary-btn mini-btn tally-btn", "+");
    let v = cfg.start || 0;
    const min = cfg.min ?? 0, max = cfg.max ?? Infinity;
    const paint = () => {
      val.textContent = cfg.max ? `${v} / ${cfg.max}` : String(v);
      val.classList.toggle("done", v >= max || (cfg.start && v <= min));
    };
    minus.addEventListener("click", () => { if (v > min) { v--; paint(); } });
    plus.addEventListener("click", () => { if (v < max) { v++; paint(); } });
    row.append(lab, minus, val, plus);
    box.appendChild(row);
    paint();
    return () => { v = cfg.start || 0; paint(); };
  });
  parent.appendChild(box);
  return () => rows.forEach(r => r());
}

// Réponses écrites en secret : { count: 1 ou 2, label, rows }
// who(i) renvoie le nom du i-ème joueur qui écrit.
function addAnswers(parent, cfg, who) {
  const box = el("div", "mini-tool mini-answers");
  parent.appendChild(box);
  const reset = () => {
    box.innerHTML = "";
    const answers = [];
    const n = cfg.count || 2;
    const step = i => {
      box.innerHTML = "";
      if (i >= n) {
        box.appendChild(el("div", "answers-note", "Toutes les réponses sont cachées."));
        const reveal = el("button", "secondary-btn mini-btn", "Révéler les réponses 👀");
        reveal.addEventListener("click", () => {
          box.innerHTML = "";
          const grid = el("div", "answers-grid");
          answers.forEach(a => {
            const card = el("div", "answers-card");
            card.appendChild(el("b", "", a.name));
            card.appendChild(el("p", "", a.text || "(rien écrit)"));
            grid.appendChild(card);
          });
          box.appendChild(grid);
        });
        box.appendChild(reveal);
        return;
      }
      const name = who(i);
      box.appendChild(el("div", "answers-note", `${name} écrit en secret — l'autre ne regarde pas !`));
      const t = el("textarea");
      t.rows = cfg.rows || 2;
      t.placeholder = cfg.label || "Ta réponse…";
      box.appendChild(t);
      const hide = el("button", "secondary-btn mini-btn", i < n - 1 ? "Cacher et passer le téléphone ✓" : "Cacher ✓");
      hide.addEventListener("click", () => { answers.push({ name, text: t.value.trim() }); step(i + 1); });
      box.appendChild(hide);
      t.focus({ preventScroll: true });
    };
    step(0);
  };
  reset();
  return reset;
}

// Papier plié (cadavre exquis) : parts = [{ label }], les joueurs alternent
function addFolded(parent, parts, who) {
  const box = el("div", "mini-tool mini-answers");
  parent.appendChild(box);
  const reset = () => {
    const written = [];
    const step = i => {
      box.innerHTML = "";
      if (i >= parts.length) {
        const unfold = el("button", "secondary-btn mini-btn", "Déplier la feuille 📜");
        unfold.addEventListener("click", () => {
          box.innerHTML = "";
          box.appendChild(el("div", "folded-result", written.join(" ")));
        });
        box.appendChild(el("div", "answers-note", "La feuille est pliée…"));
        box.appendChild(unfold);
        return;
      }
      box.appendChild(el("div", "answers-note", `${who(i)} : ${parts[i].label}`));
      const t = el("input");
      t.placeholder = parts[i].example || "";
      t.autocomplete = "off";
      box.appendChild(t);
      const fold = el("button", "secondary-btn mini-btn", "Plier et passer ✓");
      fold.addEventListener("click", () => { written.push(t.value.trim() || "…"); step(i + 1); });
      box.appendChild(fold);
    };
    step(0);
  };
  reset();
  return reset;
}

// Morpion interactif, avec le score de la partie
function addTicTacToe(parent, first) {
  const box = el("div", "mini-tool ttt-wrap");
  const status = el("div", "answers-note");
  const grid = el("div", "ttt");
  const again = el("button", "secondary-btn mini-btn", "Nouvelle manche ↻");
  box.append(status, grid, again);
  parent.appendChild(box);
  const wins = {};
  const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  let cells, turn, over, starter = first();
  const other = n => state.players[0] === n ? state.players[1] : state.players[0];
  const score = () => state.players.map(p => `${p} ${wins[p] || 0}`).join(" · ");
  const paint = msg => { status.textContent = msg || `${turn === "X" ? starter : other(starter)} joue (${turn}) — score : ${score()}`; };
  const play = i => {
    if (over || cells[i]) return;
    cells[i] = turn;
    grid.children[i].textContent = turn;
    const win = lines.find(l => l.every(k => cells[k] === turn));
    if (win) {
      over = true;
      const name = turn === "X" ? starter : other(starter);
      wins[name] = (wins[name] || 0) + 1;
      win.forEach(k => grid.children[k].classList.add("win"));
      paint(`${name} gagne la manche ! Score : ${score()}`);
    } else if (cells.every(Boolean)) {
      over = true;
      paint(`Égalité ! Score : ${score()}`);
    } else {
      turn = turn === "X" ? "O" : "X";
      paint();
    }
  };
  const reset = (swap) => {
    if (swap) starter = other(starter);
    cells = Array(9).fill(""); turn = "X"; over = false;
    grid.innerHTML = "";
    for (let i = 0; i < 9; i++) { const c = el("button", "ttt-cell"); c.addEventListener("click", () => play(i)); grid.appendChild(c); }
    paint();
  };
  again.addEventListener("click", () => reset(true));
  reset();
  return () => { starter = first(); reset(); };
}

// Pendu interactif : un joueur cache un mot, l'autre propose des lettres
function addHangman(parent, chooser) {
  const box = el("div", "mini-tool hang");
  parent.appendChild(box);
  const norm = s => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toUpperCase().replace(/[^A-Z]/g, "");
  const MAX = 8;
  const drawing = n => {
    const parts = [
      '<line x1="10" y1="110" x2="90" y2="110"/>', '<line x1="30" y1="110" x2="30" y2="10"/>',
      '<line x1="30" y1="10" x2="75" y2="10"/>', '<line x1="75" y1="10" x2="75" y2="25"/>',
      '<circle cx="75" cy="35" r="10"/>', '<line x1="75" y1="45" x2="75" y2="75"/>',
      '<line x1="75" y1="55" x2="60" y2="65"/><line x1="75" y1="55" x2="90" y2="65"/>',
      '<line x1="75" y1="75" x2="62" y2="95"/><line x1="75" y1="75" x2="88" y2="95"/>'
    ];
    return `<svg viewBox="0 0 100 120" class="hang-svg">${parts.slice(0, n).join("")}</svg>`;
  };
  const reset = () => {
    box.innerHTML = "";
    const name = chooser();
    box.appendChild(el("div", "answers-note", `${name} tape un mot en secret (l'autre ne regarde pas).`));
    const input = el("input");
    input.type = "password"; input.autocomplete = "off"; input.placeholder = "Le mot secret";
    const ok = el("button", "secondary-btn mini-btn", "Cacher le mot ✓");
    box.append(input, ok);
    ok.addEventListener("click", () => {
      const word = norm(input.value);
      if (word.length < 2) { toast("Choisis un mot d'au moins 2 lettres."); return; }
      const found = new Set(); let errors = 0;
      box.innerHTML = "";
      const pic = el("div", "hang-pic"), shown = el("div", "hang-word"), msg = el("div", "answers-note"), keys = el("div", "hang-keys");
      box.append(pic, shown, msg, keys);
      const paint = () => {
        pic.innerHTML = drawing(errors);
        shown.textContent = [...word].map(c => found.has(c) ? c : "_").join(" ");
        const won = [...word].every(c => found.has(c));
        if (won) { msg.textContent = "Mot trouvé ! 🎉"; keys.querySelectorAll("button").forEach(b => b.disabled = true); }
        else if (errors >= MAX) { msg.textContent = `Pendu ! Le mot était : ${word}`; keys.querySelectorAll("button").forEach(b => b.disabled = true); }
        else msg.textContent = `Erreurs : ${errors} / ${MAX}`;
      };
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach(L => {
        const b = el("button", "hang-key", L);
        b.addEventListener("click", () => { b.disabled = true; if (word.includes(L)) found.add(L); else errors++; paint(); });
        keys.appendChild(b);
      });
      paint();
    });
  };
  reset();
  return reset;
}

// Jeu du 21 : chacun dit 1, 2 ou 3 nombres, celui qui dit 21 perd
function addNim(parent, first) {
  const box = el("div", "mini-tool nim");
  parent.appendChild(box);
  const other = n => state.players[0] === n ? state.players[1] : state.players[0];
  const reset = (start) => {
    box.innerHTML = "";
    let total = 0, player = start || first();
    const big = el("div", "nim-total"), msg = el("div", "answers-note"), row = el("div", "mini-step-actions"), said = el("div", "nim-said");
    const again = el("button", "secondary-btn mini-btn", "Nouvelle manche ↻");
    again.style.display = "none";
    box.append(big, said, msg, row, again);
    const btns = [1, 2, 3].map(k => {
      const b = el("button", "secondary-btn mini-btn", `+${k}`);
      b.addEventListener("click", () => {
        const nums = [];
        for (let i = 0; i < k && total < 21; i++) nums.push(++total);
        said.textContent = `${player} dit : ${nums.join(", ")}`;
        if (total >= 21) {
          big.textContent = "21";
          msg.textContent = `${player} a dit 21 : perdu ! ${other(player)} gagne la manche.`;
          btns.forEach(x => x.style.display = "none");
          again.style.display = "";
          return;
        }
        player = other(player);
        paint();
      });
      row.appendChild(b);
      return b;
    });
    const paint = () => {
      big.textContent = total;
      msg.textContent = `À ${player} : dis 1, 2 ou 3 nombres.`;
      btns.forEach((b, i) => b.disabled = total + i + 1 > 21);
    };
    again.onclick = () => reset(other(start || first()));
    paint();
  };
  reset();
  return () => reset();
}
