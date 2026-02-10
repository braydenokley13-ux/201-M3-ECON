/*************************************************************
 * BOW SPORTS EMPIRE — UI RENDERER
 * DOM manipulation, screen transitions, animations
 * Now includes: stat bars, events, shop, building, rival
 *************************************************************/

const GameUI = {

  // ─── SCREEN MANAGEMENT ─────────────────────────────────
  showScreen(screenId) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    const target = document.getElementById(screenId);
    if (target) {
      target.classList.add("active");
      target.style.animation = "none";
      target.offsetHeight;
      target.style.animation = "";
      window.scrollTo(0, 0);
    }
  },

  showHeader(show) {
    document.getElementById("game-header").classList.toggle("hidden", !show);
    document.getElementById("stats-bar").classList.toggle("hidden", !show);
  },

  // ─── HEADER ────────────────────────────────────────────
  updateHeader() {
    const s = GameEngine.state;
    const level = GameEngine.getLevel();
    document.getElementById("header-level").textContent = level.icon + " " + level.title;
    document.getElementById("header-coins").textContent = s.coins;
    document.getElementById("xp-bar").style.width = (level.progress * 100) + "%";
    const streakEl = document.getElementById("header-streak");
    if (s.streak >= 2) {
      streakEl.classList.remove("hidden");
      document.getElementById("streak-count").textContent = s.streak + "x";
    } else {
      streakEl.classList.add("hidden");
    }
  },

  // ─── EMPIRE STATS BARS ─────────────────────────────────
  updateStatBars(animate) {
    const stats = GameEngine.state.stats;
    const names = ["revenue", "morale", "efficiency", "risk"];
    names.forEach(name => {
      const fill = document.getElementById("stat-" + name);
      const val = document.getElementById("stat-" + name + "-val");
      if (fill && val) {
        fill.style.width = Math.max(0, Math.min(100, stats[name])) + "%";
        val.textContent = Math.round(stats[name]);
      }
    });
  },

  // ─── STAT CHANGES DISPLAY ─────────────────────────────
  renderStatChanges(changes, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = "";
    const labels = { revenue: "Revenue", morale: "Morale", efficiency: "Efficiency", risk: "Risk" };
    let hasChanges = false;

    Object.entries(changes).forEach(([key, val]) => {
      if (val === 0 || !labels[key]) return;
      hasChanges = true;
      const div = document.createElement("div");
      div.className = "stat-change " + (key === "risk" ? (val > 0 ? "stat-down" : "stat-up") : (val > 0 ? "stat-up" : "stat-down"));
      const arrow = (key === "risk") ? (val > 0 ? "&#9650;" : "&#9660;") : (val > 0 ? "&#9650;" : "&#9660;");
      const colorClass = (key === "risk") ? (val > 0 ? "bad" : "good") : (val > 0 ? "good" : "bad");
      div.innerHTML = `<span class="sc-label">${labels[key]}</span><span class="sc-value ${colorClass}">${arrow} ${val > 0 ? "+" : ""}${val}</span>`;
      container.appendChild(div);
    });

    if (!hasChanges) container.innerHTML = '<div class="stat-change"><span class="sc-label text-muted">No stat changes</span></div>';
  },

  // ─── SEASON INTRO ──────────────────────────────────────
  renderSeasonIntro(seasonNum) {
    const data = GAME_DATA.seasons[seasonNum];
    document.getElementById("season-badge").textContent = "SEASON " + seasonNum;
    document.getElementById("season-title").textContent = data.icon + " " + data.title;
    document.getElementById("season-subtitle").textContent = data.subtitle;
    const narrativeEl = document.getElementById("season-narrative");
    narrativeEl.textContent = "";
    this.typewriter(narrativeEl, data.narrative, 12);
  },

  typewriter(el, text, speed) {
    let i = 0;
    el.textContent = "";
    const timer = setInterval(() => {
      if (i < text.length) { el.textContent += text[i]; i++; }
      else clearInterval(timer);
    }, speed);
    const skipHandler = () => { clearInterval(timer); el.textContent = text; el.removeEventListener("click", skipHandler); };
    el.addEventListener("click", skipHandler);
  },

  // ─── STRATEGY CHOICE ──────────────────────────────────
  renderStrategyChoice(seasonNum) {
    const strategies = GAME_DATA.seasons[seasonNum].strategies;
    const grid = document.getElementById("strategy-grid");
    grid.innerHTML = "";
    ["A", "B", "C"].forEach(letter => {
      const s = strategies[letter];
      const card = document.createElement("div");
      card.className = "strategy-card";
      card.dataset.choice = letter;
      card.setAttribute("tabindex", "0");
      card.setAttribute("role", "button");
      card.innerHTML = `<div class="strategy-letter">${letter}</div><h3>${s.title}</h3><p>${s.desc}</p>`;
      card.addEventListener("click", () => this.selectStrategy(letter));
      card.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); this.selectStrategy(letter); } });
      grid.appendChild(card);
    });
    document.getElementById("btn-lock-choice").classList.add("hidden");
    document.getElementById("btn-lock-choice").disabled = true;
  },

  selectStrategy(letter) {
    document.querySelectorAll(".strategy-card").forEach(c => c.classList.remove("selected"));
    const selected = document.querySelector(`.strategy-card[data-choice="${letter}"]`);
    if (selected) selected.classList.add("selected");
    GameEngine.state._pendingChoice = letter;
    const lockBtn = document.getElementById("btn-lock-choice");
    lockBtn.classList.remove("hidden");
    lockBtn.disabled = false;
  },

  // ─── OUTCOME ───────────────────────────────────────────
  renderOutcome(seasonNum, choice) {
    const data = GAME_DATA.seasons[seasonNum].strategies[choice];
    document.getElementById("outcome-choice-title").textContent = "You chose: " + data.title;
    document.getElementById("outcome-text").textContent = data.outcome;
    document.getElementById("outcome-insight").textContent = data.insight;
    this.renderStatChanges(data.stats, "stat-changes");
  },

  // ─── RANDOM EVENT ──────────────────────────────────────
  renderEvent(event) {
    document.getElementById("event-headline").textContent = event.headline;
    document.getElementById("event-desc").textContent = event.desc;
    document.getElementById("event-btn-a").textContent = event.optionA.label;
    document.getElementById("event-btn-b").textContent = event.optionB.label;
  },

  renderEventResult(resultText, statChanges) {
    document.getElementById("event-result-text").textContent = resultText;
    this.renderStatChanges(statChanges, "event-stat-changes");
  },

  // ─── QUESTIONS ─────────────────────────────────────────
  renderQuestion(questionData, index, total, isChampionship) {
    const prefix = isChampionship ? "cq" : "q";
    const badge = document.getElementById(prefix + "-badge");
    badge.textContent = questionData.difficulty.toUpperCase();
    badge.className = "q-difficulty-badge " + questionData.difficulty;
    if (isChampionship) badge.classList.add("champ-q-badge");

    document.getElementById(prefix + "-counter").textContent = (index + 1) + " / " + total;
    document.getElementById(prefix + "-text").textContent = questionData.q;

    const optionsContainer = document.getElementById(prefix + "-options");
    optionsContainer.innerHTML = "";
    const letters = ["A", "B", "C", "D"];
    const { options, correctIndex } = questionData.shuffledOptions;

    options.forEach((text, i) => {
      const btn = document.createElement("button");
      btn.className = "q-option-btn";
      btn.setAttribute("tabindex", "0");
      btn.innerHTML = `<span class="opt-letter">${letters[i]}</span><span>${text}</span>`;
      btn.addEventListener("click", () => {
        this.handleAnswer(i, correctIndex, questionData.difficulty, optionsContainer, prefix, isChampionship);
      });
      optionsContainer.appendChild(btn);
    });

    document.getElementById(prefix + "-feedback").classList.add("hidden");
    const nextBtnId = isChampionship ? "btn-next-cq" : "btn-next-q";
    document.getElementById(nextBtnId).classList.add("hidden");
  },

  handleAnswer(selectedIndex, correctIndex, difficulty, container, prefix, isChampionship) {
    const buttons = container.querySelectorAll(".q-option-btn");
    buttons.forEach(b => b.disabled = true);

    const result = GameEngine.processAnswer(selectedIndex, correctIndex, difficulty);

    if (result.isCorrect) {
      buttons[selectedIndex].classList.add("correct");
    } else {
      buttons[selectedIndex].classList.add("wrong");
      buttons[correctIndex].classList.add("reveal-correct");
    }

    const feedbackEl = document.getElementById(prefix + "-feedback");
    feedbackEl.classList.remove("hidden", "correct-feedback", "wrong-feedback");

    if (result.isCorrect) {
      feedbackEl.classList.add("correct-feedback");
      let msg = "Correct! +" + result.points + " points";
      if (result.streak >= 3) msg += " (streak x" + result.streak + "!)";
      feedbackEl.textContent = msg;
      this.showPointsPopup(container, "+" + result.points);
      if (difficulty === "hard") {
        const ach = GameEngine.unlockAchievement("sharp_mind");
        if (ach) setTimeout(() => this.showAchievementToast(ach), 600);
      }
    } else {
      feedbackEl.classList.add("wrong-feedback");
      feedbackEl.textContent = "Not quite — see the correct answer highlighted above.";
    }

    this.updateHeader();

    const nextBtnId = isChampionship ? "btn-next-cq" : "btn-next-q";
    document.getElementById(nextBtnId).classList.remove("hidden");
    document.getElementById(nextBtnId).focus();

    this._lastAnswerCorrect = result.isCorrect;
    this._lastDifficulty = difficulty;
    this._lastPoints = result.points;
  },

  // ─── EMPIRE BUILDING ───────────────────────────────────
  renderBuilding(containerId, stage) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const stageData = GAME_DATA.buildingStages[Math.min(stage, 5)];
    container.innerHTML = "";
    container.className = container.className.replace(/stage-\d/g, "").trim();
    container.classList.add("stage-" + Math.min(stage, 5));

    // Build the structure with divs
    const lights = document.createElement("div");
    lights.className = "building-lights";
    for (let i = 0; i < 5; i++) { lights.appendChild(document.createElement("span")); }

    const structure = document.createElement("div");
    structure.className = "building-structure";
    const body = document.createElement("div");
    body.className = "building-body";

    // Add windows for stages 2+
    if (stage >= 2) {
      const windowRow = document.createElement("div");
      windowRow.className = "building-windows";
      const numWindows = Math.min(stage, 4);
      for (let i = 0; i < numWindows; i++) {
        const w = document.createElement("div");
        w.className = "building-window";
        windowRow.appendChild(w);
      }
      body.appendChild(windowRow);
    }

    // Add flag for stage 5
    if (stage >= 5) {
      const flag = document.createElement("div");
      flag.className = "building-flag";
      body.appendChild(flag);
    }

    structure.appendChild(body);

    const ground = document.createElement("div");
    ground.className = "building-ground";

    const label = document.createElement("div");
    label.className = "building-label";
    label.textContent = stageData.name;

    container.appendChild(lights);
    container.appendChild(structure);
    container.appendChild(ground);
    container.appendChild(label);
  },

  // ─── RIVAL COMPARISON ─────────────────────────────────
  renderRivalComparison() {
    const compare = GameEngine.getRivalComparison();
    if (!compare) return;

    const container = document.getElementById("rival-compare");
    container.classList.remove("hidden");

    const stats = ["revenue", "morale", "efficiency", "risk"];
    const labels = { revenue: "Revenue", morale: "Morale", efficiency: "Efficiency", risk: "Risk" };

    let html = `<div class="rival-header">
      <span class="rival-you">You</span>
      <span class="vs-badge">VS</span>
      <span class="rival-them">${compare.rival.name}</span>
    </div>`;

    stats.forEach(stat => {
      const yours = Math.round(compare.player[stat]);
      const theirs = Math.round(compare.rival.stats[stat]);
      const youWin = stat === "risk" ? yours < theirs : yours > theirs;
      html += `<div class="rival-row">
        <span class="rival-val ${youWin ? 'winning' : ''}">${yours}</span>
        <span class="rival-stat-label">${labels[stat]}</span>
        <span class="rival-val ${!youWin ? 'winning' : ''}">${theirs}</span>
      </div>`;
    });

    container.innerHTML = html;
  },

  // ─── SHOP ──────────────────────────────────────────────
  renderShop() {
    const items = GameEngine.getAvailableShopItems();
    const grid = document.getElementById("shop-grid");
    grid.innerHTML = "";

    items.forEach(item => {
      const card = document.createElement("button");
      card.className = "shop-item";
      if (item.purchased) card.classList.add("purchased");
      if (!item.canAfford && !item.purchased) card.classList.add("too-expensive");
      card.disabled = item.purchased || !item.canAfford;

      // Build effect preview
      const effects = [];
      if (item.effect) {
        Object.entries(item.effect).forEach(([k, v]) => {
          if (v !== 0) {
            const label = k.charAt(0).toUpperCase() + k.slice(1);
            const isGood = k === "risk" ? v < 0 : v > 0;
            effects.push(`<span class="${isGood ? 'effect-good' : 'effect-bad'}">${v > 0 ? "+" : ""}${v} ${label}</span>`);
          }
        });
      }

      card.innerHTML = `
        <span class="shop-item-icon">${item.icon}</span>
        <span class="shop-item-name">${item.name}</span>
        <span class="shop-item-cost">${item.purchased ? 'OWNED' : item.cost + ' &#9733;'}</span>
        <span class="shop-item-effect">${effects.join(" ")}</span>
      `;

      if (!item.purchased && item.canAfford) {
        card.addEventListener("click", () => {
          GameEngine.buyItem(item.id);
          this.renderShop();
          this.updateHeader();
          this.updateStatBars(true);
          // Check shopper achievement
          if (GameEngine.state.shopPurchases.length >= 3) {
            const ach = GameEngine.unlockAchievement("shopper");
            if (ach) this.showAchievementToast(ach);
          }
        });
      }

      grid.appendChild(card);
    });
  },

  // ─── SEASON RESULTS ────────────────────────────────────
  renderSeasonResults(seasonNum, seasonScore, totalQCorrect, totalQs) {
    const s = GameEngine.state;
    document.getElementById("result-status").innerHTML = "&#127881;";
    document.getElementById("result-title").textContent = "Season " + seasonNum + " Complete!";

    // Building
    this.renderBuilding("result-building", seasonNum);

    // Rival
    this.renderRivalComparison();

    const stats = document.getElementById("result-stats");
    stats.innerHTML = `
      <div class="stat-row"><span class="stat-label">Knowledge Check</span><span class="stat-value good">${totalQCorrect} / ${totalQs} correct</span></div>
      <div class="stat-row"><span class="stat-label">Points Earned</span><span class="stat-value coins">+${seasonScore}</span></div>
      <div class="stat-row"><span class="stat-label">Total Coins</span><span class="stat-value coins">${s.coins}</span></div>
      <div class="stat-row"><span class="stat-label">Current Streak</span>
        <span class="stat-value" style="color:${s.streak >= 3 ? 'var(--orange)' : 'var(--text)'}">${s.streak > 0 ? s.streak + 'x' : '—'}</span>
      </div>
    `;

    // Shop
    this.renderShop();

    const nextBtn = document.getElementById("btn-next-season");
    nextBtn.textContent = seasonNum < 5 ? "CONTINUE TO SEASON " + (seasonNum + 1) : "ENTER THE CHAMPIONSHIP";
  },

  // ─── FINAL RESULTS ─────────────────────────────────────
  renderFinalResults() {
    const rating = GameEngine.getEmpireRating();
    const s = GameEngine.state;
    const level = GameEngine.getLevel();

    // Building
    this.renderBuilding("final-building", 5);

    const badge = document.getElementById("final-rating-badge");
    badge.textContent = rating.tier + "-TIER: " + rating.label;
    badge.style.color = rating.color;
    badge.style.borderColor = rating.color;

    document.getElementById("final-title").textContent = s.playerName + "'s Empire — Final Report";

    // Empire stats summary
    const empStatsEl = document.getElementById("final-empire-stats");
    const st = s.stats;
    empStatsEl.innerHTML = `
      <div class="final-stat-bars">
        <div class="final-stat"><span>Revenue</span><div class="fstat-track"><div class="fstat-fill revenue" style="width:${st.revenue}%"></div></div><span>${Math.round(st.revenue)}</span></div>
        <div class="final-stat"><span>Morale</span><div class="fstat-track"><div class="fstat-fill morale" style="width:${st.morale}%"></div></div><span>${Math.round(st.morale)}</span></div>
        <div class="final-stat"><span>Efficiency</span><div class="fstat-track"><div class="fstat-fill efficiency" style="width:${st.efficiency}%"></div></div><span>${Math.round(st.efficiency)}</span></div>
        <div class="final-stat"><span>Risk</span><div class="fstat-track"><div class="fstat-fill risk" style="width:${st.risk}%"></div></div><span>${Math.round(st.risk)}</span></div>
      </div>
    `;

    const statsEl = document.getElementById("final-stats");
    statsEl.innerHTML = `
      <div class="stat-row"><span class="stat-label">Empire Rating</span><span class="stat-value" style="color:${rating.color}">${rating.pct}%</span></div>
      <div class="stat-row"><span class="stat-label">Questions Correct</span><span class="stat-value good">${s.totalCorrect} / ${s.totalQuestions}</span></div>
      <div class="stat-row"><span class="stat-label">Best Streak</span><span class="stat-value" style="color:var(--orange)">${s.maxStreak}x</span></div>
      <div class="stat-row"><span class="stat-label">Total Coins</span><span class="stat-value coins">${s.coins}</span></div>
      <div class="stat-row"><span class="stat-label">Empire Level</span><span class="stat-value">${level.icon} ${level.title}</span></div>
    `;

    const claimEl = document.getElementById("final-claim");
    const code = GameEngine.getClaimCode();
    if (code) {
      claimEl.classList.remove("hidden");
      claimEl.innerHTML = `
        <div class="claim-label">YOUR MODULE 3 COMPLETION CODE</div>
        <div class="claim-code">${code}</div>
        <p style="margin-top:0.75rem;font-size:0.85rem;color:var(--muted)">Screenshot this or write it down!</p>
      `;
    } else {
      claimEl.classList.add("hidden");
    }

    if (rating.pct >= 80) this.showConfetti();
  },

  // ─── ACHIEVEMENT TOAST ─────────────────────────────────
  showAchievementToast(achievement) {
    const toast = document.getElementById("achievement-toast");
    document.getElementById("toast-icon").textContent = achievement.icon;
    document.getElementById("toast-title").textContent = achievement.name;
    document.getElementById("toast-desc").textContent = achievement.desc;
    toast.classList.remove("hidden", "hiding");
    setTimeout(() => {
      toast.classList.add("hiding");
      setTimeout(() => toast.classList.add("hidden"), 300);
    }, 3500);
  },

  showNewAchievements(achievements) {
    achievements.forEach((ach, i) => {
      setTimeout(() => this.showAchievementToast(ach), i * 1200);
    });
  },

  // ─── CONFETTI ──────────────────────────────────────────
  showConfetti() {
    const container = document.getElementById("confetti-container");
    container.classList.remove("hidden");
    container.innerHTML = "";
    const colors = ["#fbbf24", "#22c55e", "#3b82f6", "#ef4444", "#f97316", "#a855f7"];
    for (let i = 0; i < 60; i++) {
      const piece = document.createElement("div");
      piece.className = "confetti-piece";
      piece.style.left = Math.random() * 100 + "%";
      piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      piece.style.animationDuration = (2 + Math.random() * 2) + "s";
      piece.style.animationDelay = Math.random() * 1.5 + "s";
      piece.style.width = (6 + Math.random() * 8) + "px";
      piece.style.height = (6 + Math.random() * 8) + "px";
      piece.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
      container.appendChild(piece);
    }
    setTimeout(() => { container.classList.add("hidden"); container.innerHTML = ""; }, 5000);
  },

  // ─── POINTS POPUP ──────────────────────────────────────
  showPointsPopup(container, text) {
    const popup = document.createElement("div");
    popup.className = "points-popup";
    popup.textContent = text;
    popup.style.left = "50%";
    popup.style.top = "30%";
    popup.style.transform = "translateX(-50%)";
    container.style.position = "relative";
    container.appendChild(popup);
    setTimeout(() => popup.remove(), 1000);
  }
};
