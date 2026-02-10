/*************************************************************
 * BOW SPORTS EMPIRE — UI RENDERER
 * All DOM manipulation, screen transitions, animations
 *************************************************************/

const GameUI = {

  // ─── SCREEN MANAGEMENT ─────────────────────────────────
  showScreen(screenId) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    const target = document.getElementById(screenId);
    if (target) {
      target.classList.add("active");
      // Re-trigger animation
      target.style.animation = "none";
      target.offsetHeight; // reflow
      target.style.animation = "";
    }
  },

  showHeader(show) {
    document.getElementById("game-header").classList.toggle("hidden", !show);
    document.getElementById("progress-rail").classList.toggle("hidden", !show);
  },

  // ─── HEADER UPDATES ───────────────────────────────────
  updateHeader() {
    const s = GameEngine.state;
    const level = GameEngine.getLevel();

    document.getElementById("header-level").textContent = level.icon + " " + level.title;
    document.getElementById("header-coins").textContent = s.coins;
    document.getElementById("xp-bar").style.width = (level.progress * 100) + "%";

    // Streak
    const streakEl = document.getElementById("header-streak");
    if (s.streak >= 2) {
      streakEl.classList.remove("hidden");
      document.getElementById("streak-count").textContent = s.streak + "x";
    } else {
      streakEl.classList.add("hidden");
    }
  },

  // ─── PROGRESS RAIL ─────────────────────────────────────
  updateRail(currentSeason) {
    const items = document.querySelectorAll(".rail-item");
    const connectors = document.querySelectorAll(".rail-connector");

    items.forEach(item => {
      const season = item.dataset.season;
      item.classList.remove("active", "completed");

      if (season === "final") {
        if (currentSeason > 5) item.classList.add("active");
      } else {
        const num = parseInt(season);
        if (num === currentSeason) item.classList.add("active");
        else if (num < currentSeason) item.classList.add("completed");
      }
    });

    connectors.forEach((conn, i) => {
      conn.classList.toggle("completed", i + 1 < currentSeason);
    });
  },

  // ─── SEASON INTRO ──────────────────────────────────────
  renderSeasonIntro(seasonNum) {
    const data = GAME_DATA.seasons[seasonNum];

    document.getElementById("season-badge").textContent = "SEASON " + seasonNum;
    document.getElementById("season-title").textContent = data.icon + " " + data.title;
    document.getElementById("season-subtitle").textContent = data.subtitle;

    // Typewriter effect for narrative
    const narrativeEl = document.getElementById("season-narrative");
    narrativeEl.textContent = "";
    this.typewriter(narrativeEl, data.narrative, 15);
  },

  typewriter(el, text, speed) {
    let i = 0;
    el.textContent = "";
    const timer = setInterval(() => {
      if (i < text.length) {
        el.textContent += text[i];
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);
    // Store timer so we can skip
    el._typewriterTimer = timer;
    el._fullText = text;

    // Click to skip
    const skipHandler = () => {
      clearInterval(timer);
      el.textContent = text;
      el.removeEventListener("click", skipHandler);
    };
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
      card.setAttribute("aria-label", s.title + ": " + s.desc);

      card.innerHTML = `
        <div class="strategy-letter">${letter}</div>
        <h3>${s.title}</h3>
        <p>${s.desc}</p>
      `;

      card.addEventListener("click", () => this.selectStrategy(letter));
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this.selectStrategy(letter);
        }
      });

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
  },

  // ─── QUESTIONS (Season) ────────────────────────────────
  renderQuestion(questionData, index, total, isChampionship) {
    const prefix = isChampionship ? "cq" : "q";
    const screenId = isChampionship ? "screen-champ-question" : "screen-question";

    // Badge
    const badge = document.getElementById(prefix + "-badge");
    badge.textContent = questionData.difficulty.toUpperCase();
    badge.className = "q-difficulty-badge " + questionData.difficulty;
    if (isChampionship) badge.classList.add("champ-q-badge");

    // Counter
    document.getElementById(prefix + "-counter").textContent = (index + 1) + " / " + total;

    // Question text
    document.getElementById(prefix + "-text").textContent = questionData.q;

    // Options
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

    // Hide feedback and next button
    document.getElementById(prefix + "-feedback").classList.add("hidden");
    const nextBtnId = isChampionship ? "btn-next-cq" : "btn-next-q";
    document.getElementById(nextBtnId).classList.add("hidden");
  },

  handleAnswer(selectedIndex, correctIndex, difficulty, container, prefix, isChampionship) {
    const buttons = container.querySelectorAll(".q-option-btn");

    // Disable all buttons
    buttons.forEach(b => b.disabled = true);

    // Process answer
    const result = GameEngine.processAnswer(selectedIndex, correctIndex, difficulty);

    // Mark correct/wrong
    if (result.isCorrect) {
      buttons[selectedIndex].classList.add("correct");
    } else {
      buttons[selectedIndex].classList.add("wrong");
      buttons[correctIndex].classList.add("reveal-correct");
    }

    // Feedback
    const feedbackEl = document.getElementById(prefix + "-feedback");
    feedbackEl.classList.remove("hidden", "correct-feedback", "wrong-feedback");

    if (result.isCorrect) {
      feedbackEl.classList.add("correct-feedback");
      let msg = "Correct! +" + result.points + " points";
      if (result.streak >= 3) msg += " (streak x" + result.streak + "!)";
      feedbackEl.textContent = msg;

      // Points popup
      this.showPointsPopup(container, "+" + result.points);

      // Check for hard question achievement
      if (difficulty === "hard") {
        const ach = GameEngine.unlockAchievement("sharp_mind");
        if (ach) setTimeout(() => this.showAchievementToast(ach), 600);
      }
    } else {
      feedbackEl.classList.add("wrong-feedback");
      feedbackEl.textContent = "Not quite — see the correct answer highlighted above.";
    }

    // Update header
    this.updateHeader();

    // Show next button
    const nextBtnId = isChampionship ? "btn-next-cq" : "btn-next-q";
    const nextBtn = document.getElementById(nextBtnId);
    nextBtn.classList.remove("hidden");
    nextBtn.focus();

    // Store result for the adaptive engine
    this._lastAnswerCorrect = result.isCorrect;
    this._lastDifficulty = difficulty;
    this._lastPoints = result.points;
  },

  // ─── SEASON RESULTS ───────────────────────────────────
  renderSeasonResults(seasonNum, seasonScore, totalQCorrect, totalQs) {
    const isGoodScore = totalQCorrect >= 1;

    document.getElementById("result-status").textContent = isGoodScore ? "&#127881;" : "&#128170;";
    document.getElementById("result-status").innerHTML = isGoodScore ? "&#127881;" : "&#128170;";
    document.getElementById("result-title").textContent = isGoodScore
      ? "Season " + seasonNum + " Complete!"
      : "Season " + seasonNum + " Complete";

    const stats = document.getElementById("result-stats");
    stats.innerHTML = `
      <div class="stat-row">
        <span class="stat-label">Knowledge Check</span>
        <span class="stat-value good">${totalQCorrect} / ${totalQs} correct</span>
      </div>
      <div class="stat-row">
        <span class="stat-label">Points Earned</span>
        <span class="stat-value coins">+${seasonScore}</span>
      </div>
      <div class="stat-row">
        <span class="stat-label">Total Coins</span>
        <span class="stat-value coins">${GameEngine.state.coins}</span>
      </div>
      <div class="stat-row">
        <span class="stat-label">Current Streak</span>
        <span class="stat-value" style="color: ${GameEngine.state.streak >= 3 ? 'var(--orange)' : 'var(--text)'}">
          ${GameEngine.state.streak > 0 ? GameEngine.state.streak + 'x' : '—'}
        </span>
      </div>
    `;

    const nextBtn = document.getElementById("btn-next-season");
    if (seasonNum < 5) {
      nextBtn.textContent = "CONTINUE TO SEASON " + (seasonNum + 1);
    } else {
      nextBtn.textContent = "ENTER THE CHAMPIONSHIP";
    }
  },

  // ─── FINAL RESULTS ─────────────────────────────────────
  renderFinalResults() {
    const rating = GameEngine.getEmpireRating();
    const s = GameEngine.state;
    const level = GameEngine.getLevel();

    // Rating badge
    const badge = document.getElementById("final-rating-badge");
    badge.textContent = rating.tier + "-TIER: " + rating.label;
    badge.style.color = rating.color;
    badge.style.borderColor = rating.color;

    // Title
    document.getElementById("final-title").textContent =
      s.playerName + "'s Empire — Final Report";

    // Stats
    const statsEl = document.getElementById("final-stats");
    statsEl.innerHTML = `
      <div class="stat-row">
        <span class="stat-label">Empire Rating</span>
        <span class="stat-value" style="color: ${rating.color}">${rating.pct}%</span>
      </div>
      <div class="stat-row">
        <span class="stat-label">Total Points</span>
        <span class="stat-value coins">${rating.totalEarned}</span>
      </div>
      <div class="stat-row">
        <span class="stat-label">Questions Correct</span>
        <span class="stat-value good">${s.totalCorrect} / ${s.totalQuestions}</span>
      </div>
      <div class="stat-row">
        <span class="stat-label">Best Streak</span>
        <span class="stat-value" style="color: var(--orange)">${s.maxStreak}x</span>
      </div>
      <div class="stat-row">
        <span class="stat-label">Total Coins</span>
        <span class="stat-value coins">${s.coins}</span>
      </div>
      <div class="stat-row">
        <span class="stat-label">Empire Level</span>
        <span class="stat-value">${level.icon} ${level.title}</span>
      </div>
    `;

    // Claim code
    const claimEl = document.getElementById("final-claim");
    const code = GameEngine.getClaimCode();
    if (code) {
      claimEl.classList.remove("hidden");
      claimEl.innerHTML = `
        <div class="claim-label">YOUR MODULE 3 COMPLETION CODE</div>
        <div class="claim-code">${code}</div>
        <p style="margin-top: 0.75rem; font-size: 0.85rem; color: var(--muted)">
          Screenshot this or write it down to claim credit!
        </p>
      `;
    } else {
      claimEl.classList.add("hidden");
    }

    // Confetti for A/S tier
    if (rating.pct >= 80) {
      this.showConfetti();
    }
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

    setTimeout(() => {
      container.classList.add("hidden");
      container.innerHTML = "";
    }, 5000);
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
