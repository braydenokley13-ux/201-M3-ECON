/*************************************************************
 * BOW SPORTS EMPIRE — GAME ENGINE v2
 * State machine, empire stats, rival AI, events, shop,
 * adaptive question logic, scoring, achievements
 *************************************************************/

const GameEngine = {

  // ═══════════════════════════════════════════════════════════
  //  1. STATE MANAGEMENT
  // ═══════════════════════════════════════════════════════════

  defaultState() {
    return {
      version: 2,
      playerName: "",
      currentSeason: 1,
      phase: "title",
      // title | name | intro | choice | outcome | questions
      // results | champ-intro | champ-q | final

      // Empire stats — all clamped 0-100
      stats: { revenue: 20, morale: 50, efficiency: 30, risk: 20 },

      // Per-season data
      seasons: {
        1: { choice: null, questionsDone: false, answers: [], score: 0, questionsData: [] },
        2: { choice: null, questionsDone: false, answers: [], score: 0, questionsData: [] },
        3: { choice: null, questionsDone: false, answers: [], score: 0, questionsData: [] },
        4: { choice: null, questionsDone: false, answers: [], score: 0, questionsData: [] },
        5: { choice: null, questionsDone: false, answers: [], score: 0, questionsData: [] }
      },

      // Championship
      championship: { answers: [], score: 0, questionsData: [], done: false },

      // Adaptive tracking
      currentDifficulty: "medium",
      currentQuestionIndex: 0,
      currentQuestionsPool: [],

      // Progression
      coins: 0,
      xp: 0,
      streak: 0,
      maxStreak: 0,
      totalCorrect: 0,
      totalQuestions: 0,

      // Achievements
      achievements: [],

      // Rival
      rival: { name: "", style: "", stats: { revenue: 20, morale: 50, efficiency: 30, risk: 20 } },

      // Shop
      shopPurchases: [],

      // Events
      usedEvents: [],

      // Timestamps
      startedAt: null,
      finishedAt: null
    };
  },

  state: null,

  // ─── INIT ────────────────────────────────────────────────
  init() {
    const saved = this.loadState();
    if (saved && saved.version === 2) {
      this.state = saved;
    } else {
      this.state = this.defaultState();
    }
  },

  // ═══════════════════════════════════════════════════════════
  //  2. EMPIRE STATS SYSTEM
  // ═══════════════════════════════════════════════════════════

  /**
   * Apply a stat-change object to the player's empire stats.
   * Each key in `changes` maps to a stat name; value is the delta.
   * All stats are clamped to the 0-100 range afterward.
   *
   * @param {Object} changes  e.g. { revenue: 10, morale: -5 }
   */
  applyStats(changes) {
    if (!changes || typeof changes !== "object") return;
    const stats = this.state.stats;
    const keys = Object.keys(changes);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (stats.hasOwnProperty(key)) {
        stats[key] = Math.max(0, Math.min(100, stats[key] + changes[key]));
      }
    }
    this.saveState();
  },

  /**
   * Compute a composite "stat grade" from the current empire stats.
   * Formula: high revenue + high morale + high efficiency + LOW risk = good.
   * Returns a 0-100 percentage.
   */
  getStatGrade() {
    const s = this.state.stats;
    // Revenue, morale, efficiency count positively (0-100 each).
    // Risk counts inversely — lower risk is better.
    // Total raw range: 0 to 400 (best case 100+100+100+100).
    const raw = s.revenue + s.morale + s.efficiency + (100 - s.risk);
    return Math.round((raw / 400) * 100);
  },

  // ═══════════════════════════════════════════════════════════
  //  3. RIVAL SYSTEM
  // ═══════════════════════════════════════════════════════════

  /**
   * Pick a random rival from GAME_DATA.rivals and initialise their stats
   * to the same starting values as the player.
   */
  initRival() {
    const rivalDef = this.pickRandom(GAME_DATA.rivals);
    this.state.rival = {
      name: rivalDef.name,
      style: rivalDef.style,
      stats: { revenue: 20, morale: 50, efficiency: 30, risk: 20 }
    };
    this.saveState();
  },

  /**
   * Simulate the rival's strategy choice for the given season.
   * Looks up the rival's predetermined choice letter from
   * GAME_DATA.rivalChoices[style][season-1], then applies that
   * strategy's stat effects to the rival's stats.
   *
   * @param {number} seasonNum  1-5
   */
  simulateRivalSeason(seasonNum) {
    const rival = this.state.rival;
    if (!rival || !rival.style) return;

    const choiceLetters = GAME_DATA.rivalChoices[rival.style];
    if (!choiceLetters) return;

    const letter = choiceLetters[seasonNum - 1];
    if (!letter) return;

    const strategy = GAME_DATA.seasons[seasonNum].strategies[letter];
    if (!strategy || !strategy.stats) return;

    const effects = strategy.stats;
    const rs = rival.stats;
    const keys = Object.keys(effects);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (rs.hasOwnProperty(key)) {
        rs[key] = Math.max(0, Math.min(100, rs[key] + effects[key]));
      }
    }
    this.saveState();
  },

  /**
   * Return a comparison snapshot between the player and the rival.
   *
   * @returns {{ player: Object, rival: { name: string, stats: Object }, winning: boolean }}
   */
  getRivalComparison() {
    const playerGrade = this.getStatGrade();

    const rs = this.state.rival.stats;
    const rivalRaw = rs.revenue + rs.morale + rs.efficiency + (100 - rs.risk);
    const rivalGrade = Math.round((rivalRaw / 400) * 100);

    return {
      player: { ...this.state.stats },
      rival: {
        name: this.state.rival.name,
        stats: { ...rs }
      },
      winning: playerGrade >= rivalGrade
    };
  },

  // ═══════════════════════════════════════════════════════════
  //  4. EVENT SYSTEM
  // ═══════════════════════════════════════════════════════════

  /**
   * Pick a random unused event from GAME_DATA.events.
   * Marks its index as used so it will not be picked again.
   * Returns null if all events have already been used.
   *
   * @returns {Object|null}  The event object, or null if none remain.
   */
  getRandomEvent() {
    const allEvents = GAME_DATA.events;
    const used = this.state.usedEvents;

    const available = [];
    for (let i = 0; i < allEvents.length; i++) {
      if (!used.includes(i)) {
        available.push(i);
      }
    }

    if (available.length === 0) return null;

    const idx = available[Math.floor(Math.random() * available.length)];
    used.push(idx);
    this.saveState();

    return { ...allEvents[idx], _eventIndex: idx };
  },

  /**
   * Apply the chosen option of an event to the player's empire stats.
   *
   * @param {Object} event   The event object (from getRandomEvent)
   * @param {string} choice  "A" or "B"
   * @returns {Object}       The chosen option data (label, effect, result)
   */
  applyEventChoice(event, choice) {
    const option = choice === "A" ? event.optionA : event.optionB;
    if (option && option.effect) {
      this.applyStats(option.effect);
    }
    return option;
  },

  // ═══════════════════════════════════════════════════════════
  //  5. SHOP SYSTEM
  // ═══════════════════════════════════════════════════════════

  /**
   * Check whether the player can buy a shop item.
   * Requires enough coins AND item not already purchased this season.
   *
   * @param {string} itemId
   * @returns {boolean}
   */
  canBuy(itemId) {
    const item = GAME_DATA.shop.find(function (i) { return i.id === itemId; });
    if (!item) return false;

    // Not enough coins
    if (this.state.coins < item.cost) return false;

    // Already bought this season — key is "season:itemId"
    const seasonKey = this.state.currentSeason + ":" + itemId;
    if (this.state.shopPurchases.includes(seasonKey)) return false;

    return true;
  },

  /**
   * Purchase a shop item: deduct coins, apply stat effects, record purchase.
   *
   * @param {string} itemId
   * @returns {{ success: boolean, item: Object|null }}
   */
  buyItem(itemId) {
    if (!this.canBuy(itemId)) return { success: false, item: null };

    const item = GAME_DATA.shop.find(function (i) { return i.id === itemId; });

    this.state.coins -= item.cost;

    if (item.effect) {
      this.applyStats(item.effect);
    }

    const seasonKey = this.state.currentSeason + ":" + itemId;
    this.state.shopPurchases.push(seasonKey);
    this.saveState();

    return { success: true, item: item };
  },

  /**
   * Return the full shop catalog annotated with affordability and
   * whether each item has already been purchased this season.
   *
   * @returns {Array<Object>}
   */
  getAvailableShopItems() {
    const season = this.state.currentSeason;
    const coins = this.state.coins;
    const purchases = this.state.shopPurchases;

    return GAME_DATA.shop.map(function (item) {
      const seasonKey = season + ":" + item.id;
      return {
        id: item.id,
        name: item.name,
        cost: item.cost,
        icon: item.icon,
        desc: item.desc,
        effect: item.effect,
        canAfford: coins >= item.cost,
        purchased: purchases.includes(seasonKey)
      };
    });
  },

  // ═══════════════════════════════════════════════════════════
  //  6. ADAPTIVE QUESTION SYSTEM
  // ═══════════════════════════════════════════════════════════

  /**
   * Prepare the two adaptive questions for a season.
   * Q1 is always medium. Q2 branches to hard (if Q1 correct) or
   * easy (if Q1 wrong); both paths are prepared ahead of time.
   *
   * @param {number} seasonNum  1-5
   * @returns {Array}
   */
  prepareSeasonQuestions(seasonNum) {
    const pool = GAME_DATA.questions[seasonNum];
    const questions = [];

    // Q1 — always medium
    const mediumQ = this.pickRandom(pool.medium);
    questions.push({
      ...mediumQ,
      difficulty: "medium",
      shuffledOptions: this.shuffleOptions(mediumQ)
    });

    // Q2 — prepare both branches; runtime picks based on Q1 result
    const hardQ = this.pickRandom(pool.hard);
    const easyQ = this.pickRandom(pool.easy);

    questions.push({
      hard: { ...hardQ, difficulty: "hard", shuffledOptions: this.shuffleOptions(hardQ) },
      easy: { ...easyQ, difficulty: "easy", shuffledOptions: this.shuffleOptions(easyQ) }
    });

    return questions;
  },

  /**
   * Prepare the championship question banks for a 5-question adaptive
   * sequence. Returns shuffled banks so the runtime picker can draw
   * from the appropriate difficulty tier.
   *
   * @returns {{ easyBank: Array, mediumBank: Array, hardBank: Array }}
   */
  prepareChampionshipQuestions() {
    const pool = GAME_DATA.championship;
    return {
      easyBank: this.shuffle([...pool.easy]),
      mediumBank: this.shuffle([...pool.medium]),
      hardBank: this.shuffle([...pool.hard])
    };
  },

  // ─── QUESTION HELPERS ──────────────────────────────────────

  /**
   * Shuffle the four answer options for a question and track the
   * new index of the correct answer.
   *
   * @param {Object} q  A question object with .o (options) and .c (correct index)
   * @returns {{ options: Array<string>, correctIndex: number }}
   */
  shuffleOptions(q) {
    const indices = [0, 1, 2, 3];
    const shuffled = this.shuffle(indices);
    return {
      options: shuffled.map(function (i) { return q.o[i]; }),
      correctIndex: shuffled.indexOf(q.c)
    };
  },

  /**
   * Process a submitted answer: award points and XP if correct,
   * track streaks, update totals.
   *
   * @param {number} selectedIndex
   * @param {number} correctIndex
   * @param {string} difficulty  "easy" | "medium" | "hard"
   * @returns {{ isCorrect: boolean, points: number, xp: number, streak: number }}
   */
  processAnswer(selectedIndex, correctIndex, difficulty) {
    var isCorrect = selectedIndex === correctIndex;
    var scoring = GAME_DATA.scoring;
    var points = 0;
    var xp = 0;

    if (isCorrect) {
      points = scoring.pointsPerDifficulty[difficulty];
      xp = scoring.xpPerDifficulty[difficulty];

      // Streak tracking
      this.state.streak++;
      if (this.state.streak > this.state.maxStreak) {
        this.state.maxStreak = this.state.streak;
      }

      // Streak bonus
      if (this.state.streak >= scoring.streakBonusThreshold) {
        points = Math.round(points * scoring.streakBonusMultiplier);
      }

      this.state.coins += points;
      this.state.xp += xp;
      this.state.totalCorrect++;
    } else {
      this.state.streak = 0;
    }

    this.state.totalQuestions++;
    this.saveState();

    return { isCorrect: isCorrect, points: points, xp: xp, streak: this.state.streak };
  },

  /**
   * Determine the next difficulty based on whether the player got
   * the current question right.
   *
   * @param {boolean} wasCorrect
   * @param {string}  currentDifficulty  "easy" | "medium" | "hard"
   * @returns {string}
   */
  getNextDifficulty(wasCorrect, currentDifficulty) {
    if (wasCorrect) {
      if (currentDifficulty === "easy") return "medium";
      if (currentDifficulty === "medium") return "hard";
      return "hard";
    } else {
      if (currentDifficulty === "hard") return "medium";
      if (currentDifficulty === "medium") return "easy";
      return "easy";
    }
  },

  // ═══════════════════════════════════════════════════════════
  //  7. SCORING & RATING
  // ═══════════════════════════════════════════════════════════

  /**
   * Finalise a season: store score, grant bonus XP and coins,
   * then check for newly unlocked achievements.
   *
   * @param {number} seasonNum  1-5
   * @param {number} score      Points earned in the question phase
   * @returns {Array}           Newly unlocked achievements
   */
  completeSeason(seasonNum, score) {
    var s = this.state.seasons[seasonNum];
    s.score = score;
    s.questionsDone = true;

    this.state.xp += GAME_DATA.scoring.seasonBonusXP;
    this.state.coins += 50; // season completion bonus

    this.saveState();
    return this.checkAchievements();
  },

  /**
   * Finalise the championship round: store score, grant bonus XP
   * and coins, timestamp, then check achievements.
   *
   * @param {number} score
   * @returns {Array}  Newly unlocked achievements
   */
  completeChampionship(score) {
    this.state.championship.score = score;
    this.state.championship.done = true;
    this.state.finishedAt = new Date().toISOString();

    this.state.xp += GAME_DATA.scoring.championshipBonusXP;
    this.state.coins += 100;

    this.saveState();
    return this.checkAchievements();
  },

  /**
   * Compute the overall empire rating.
   *
   * The rating blends two signals equally:
   *   - Question score (50 %) — total earned vs. theoretical max
   *   - Stat grade   (50 %) — from getStatGrade()
   *
   * Returns the matching tier (S / A / B / C / D) from GAME_DATA.ratings.
   *
   * @returns {{ tier, label, color, pct, totalEarned, maxPossible, statGrade }}
   */
  getEmpireRating() {
    // Question score component
    var totalEarned = 0;
    for (var i = 1; i <= 5; i++) {
      totalEarned += this.state.seasons[i].score || 0;
    }
    totalEarned += this.state.championship.score || 0;

    // Theoretical max: 5 seasons * 50 (medium+hard) + 5 champ hard * 30
    var maxPossible = 5 * 50 + 150;
    var questionPct = Math.round((totalEarned / maxPossible) * 100);

    // Stat grade component
    var statGrade = this.getStatGrade();

    // Combined: 50 % questions + 50 % stats
    var pct = Math.round(questionPct * 0.5 + statGrade * 0.5);

    // Find matching tier (ratings are sorted high-to-low by minPct)
    var rating = GAME_DATA.ratings[GAME_DATA.ratings.length - 1];
    for (var r = 0; r < GAME_DATA.ratings.length; r++) {
      if (pct >= GAME_DATA.ratings[r].minPct) {
        rating = GAME_DATA.ratings[r];
        break;
      }
    }

    return {
      tier: rating.tier,
      label: rating.label,
      color: rating.color,
      minPct: rating.minPct,
      pct: pct,
      totalEarned: totalEarned,
      maxPossible: maxPossible,
      statGrade: statGrade,
      questionPct: questionPct
    };
  },

  /**
   * Determine the player's current level from XP thresholds
   * defined in GAME_DATA.levels.
   *
   * @returns {{ title, icon, minXP, progress, nextLevel, levelIndex }}
   */
  getLevel() {
    var levels = GAME_DATA.levels;
    var current = levels[0];
    var nextLevel = levels[1] || null;

    for (var i = levels.length - 1; i >= 0; i--) {
      if (this.state.xp >= levels[i].minXP) {
        current = levels[i];
        nextLevel = levels[i + 1] || null;
        break;
      }
    }

    var xpInLevel = nextLevel ? this.state.xp - current.minXP : 0;
    var xpNeeded = nextLevel ? nextLevel.minXP - current.minXP : 1;
    var progress = nextLevel ? Math.min(xpInLevel / xpNeeded, 1) : 1;

    return {
      title: current.title,
      icon: current.icon,
      minXP: current.minXP,
      progress: progress,
      nextLevel: nextLevel,
      levelIndex: levels.indexOf(current)
    };
  },

  /**
   * Return a claim code if the player reached C-tier or above
   * (pct >= 55). Otherwise returns null.
   *
   * @returns {string|null}
   */
  getClaimCode() {
    var rating = this.getEmpireRating();
    if (rating.pct >= 55) {
      var codes = GAME_DATA.claimCodes;
      return codes[Math.floor(Math.random() * codes.length)];
    }
    return null;
  },

  // ═══════════════════════════════════════════════════════════
  //  8. ACHIEVEMENTS
  // ═══════════════════════════════════════════════════════════

  /**
   * Run all achievement condition checks. Returns an array of
   * definitions for any achievements newly unlocked during this call.
   *
   * @returns {Array<Object>}
   */
  checkAchievements() {
    var newAchievements = [];
    var s = this.state;
    var defs = GAME_DATA.achievements;

    var self = this;

    function tryUnlock(id) {
      if (!s.achievements.includes(id)) {
        s.achievements.push(id);
        var def = defs.find(function (a) { return a.id === id; });
        if (def) newAchievements.push(def);
      }
    }

    // First Steps — complete Season 1
    if (s.seasons[1].questionsDone) tryUnlock("first_steps");

    // Economist — complete 3 seasons
    var completedSeasons = 0;
    for (var i = 1; i <= 5; i++) {
      if (s.seasons[i].questionsDone) completedSeasons++;
    }
    if (completedSeasons >= 3) tryUnlock("economist");

    // Empire Builder — all 5 seasons
    if (completedSeasons >= 5) tryUnlock("empire_builder");

    // Champion — complete championship
    if (s.championship.done) tryUnlock("champion");

    // Streak achievements
    if (s.maxStreak >= 3) tryUnlock("streak_3");
    if (s.maxStreak >= 5) tryUnlock("streak_5");

    // Strategist — A or S tier (pct >= 80)
    if (s.championship.done) {
      var rating = self.getEmpireRating();
      if (rating.pct >= 80) tryUnlock("strategist");
    }

    // Legend — reach Legend level (index 9)
    var level = self.getLevel();
    if (level.levelIndex >= 9) tryUnlock("legend");

    // Big Spender — buy 3 shop items (unique season:item keys)
    if (s.shopPurchases.length >= 3) tryUnlock("shopper");

    // Safe Hands — finish with risk below 25
    if (s.championship.done && s.stats.risk < 25) tryUnlock("low_risk");

    this.saveState();
    return newAchievements;
  },

  /**
   * Manually unlock a single achievement by id.
   *
   * @param {string} id
   * @returns {Object|null}  The achievement definition, or null if already held.
   */
  unlockAchievement(id) {
    if (!this.state.achievements.includes(id)) {
      this.state.achievements.push(id);
      var def = GAME_DATA.achievements.find(function (a) { return a.id === id; });
      this.saveState();
      return def || null;
    }
    return null;
  },

  // ═══════════════════════════════════════════════════════════
  //  9. UTILITIES
  // ═══════════════════════════════════════════════════════════

  /**
   * Fisher-Yates shuffle. Returns a new array; does not mutate input.
   *
   * @param {Array} array
   * @returns {Array}
   */
  shuffle(array) {
    var arr = array.slice();
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr;
  },

  /**
   * Return a random element from an array.
   *
   * @param {Array} arr
   * @returns {*}
   */
  pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  },

  // ─── PERSISTENCE ─────────────────────────────────────────

  /**
   * Save the current state to localStorage.
   */
  saveState() {
    try {
      localStorage.setItem("bow-sports-empire", JSON.stringify(this.state));
    } catch (e) { /* localStorage unavailable or quota exceeded */ }
  },

  /**
   * Load and parse state from localStorage.
   *
   * @returns {Object|null}
   */
  loadState() {
    try {
      var raw = localStorage.getItem("bow-sports-empire");
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  },

  /**
   * Reset state to defaults and clear localStorage entry.
   */
  resetState() {
    this.state = this.defaultState();
    try {
      localStorage.removeItem("bow-sports-empire");
    } catch (e) { /* ignore */ }
  }
};
