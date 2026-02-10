/*************************************************************
 * BOW SPORTS EMPIRE — GAME ENGINE
 * State machine, adaptive question logic, scoring
 *************************************************************/

const GameEngine = {

  // ─── DEFAULT STATE ─────────────────────────────────────
  defaultState() {
    return {
      version: 1,
      playerName: "",
      currentSeason: 1,
      phase: "title",  // title | name | intro | choice | outcome | questions | results | champ-intro | champ-q | final

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
      currentDifficulty: "medium",  // easy | medium | hard
      currentQuestionIndex: 0,
      currentQuestionsPool: [],     // the prepared questions for the current section

      // Progression
      coins: 0,
      xp: 0,
      streak: 0,
      maxStreak: 0,
      totalCorrect: 0,
      totalQuestions: 0,

      // Achievements
      achievements: [],

      // Timestamps
      startedAt: null,
      finishedAt: null
    };
  },

  state: null,

  // ─── INIT ──────────────────────────────────────────────
  init() {
    const saved = this.loadState();
    if (saved && saved.version === 1) {
      this.state = saved;
    } else {
      this.state = this.defaultState();
    }
  },

  // ─── PERSISTENCE ───────────────────────────────────────
  saveState() {
    try {
      localStorage.setItem("bow-sports-empire", JSON.stringify(this.state));
    } catch (e) { /* localStorage unavailable */ }
  },

  loadState() {
    try {
      const raw = localStorage.getItem("bow-sports-empire");
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  },

  resetState() {
    this.state = this.defaultState();
    try { localStorage.removeItem("bow-sports-empire"); } catch (e) {}
  },

  // ─── SHUFFLE (Fisher-Yates) ────────────────────────────
  shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  },

  // ─── ADAPTIVE QUESTION PREPARATION ─────────────────────
  // Returns an array of {question, difficulty} where difficulty adapts
  prepareSeasonQuestions(seasonNum) {
    const pool = GAME_DATA.questions[seasonNum];
    const questions = [];

    // Q1 always starts at medium
    const mediumQ = this.pickRandom(pool.medium);
    questions.push({ ...mediumQ, difficulty: "medium", shuffledOptions: this.shuffleOptions(mediumQ) });

    // Q2 depends on Q1 result — but we prepare BOTH paths and pick at runtime
    const hardQ = this.pickRandom(pool.hard);
    const easyQ = this.pickRandom(pool.easy);

    questions.push({
      hard: { ...hardQ, difficulty: "hard", shuffledOptions: this.shuffleOptions(hardQ) },
      easy: { ...easyQ, difficulty: "easy", shuffledOptions: this.shuffleOptions(easyQ) }
    });

    return questions;
  },

  prepareChampionshipQuestions() {
    const pool = GAME_DATA.championship;
    const questions = [];
    let difficulty = "medium";

    // We prepare a bank from each tier, then the adaptive picker selects at runtime
    const easyBank = this.shuffle([...pool.easy]);
    const mediumBank = this.shuffle([...pool.medium]);
    const hardBank = this.shuffle([...pool.hard]);

    // Store all banks for runtime selection
    return { easyBank, mediumBank, hardBank };
  },

  // ─── QUESTION HELPERS ──────────────────────────────────
  pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  },

  shuffleOptions(q) {
    const indices = [0, 1, 2, 3];
    const shuffled = this.shuffle(indices);
    return {
      options: shuffled.map(i => q.o[i]),
      correctIndex: shuffled.indexOf(q.c)
    };
  },

  // ─── ANSWER PROCESSING ────────────────────────────────
  processAnswer(selectedIndex, correctIndex, difficulty) {
    const isCorrect = selectedIndex === correctIndex;
    const scoring = GAME_DATA.scoring;
    let points = 0;
    let xp = 0;

    if (isCorrect) {
      points = scoring.pointsPerDifficulty[difficulty];
      xp = scoring.xpPerDifficulty[difficulty];

      // Streak bonus
      this.state.streak++;
      if (this.state.streak > this.state.maxStreak) {
        this.state.maxStreak = this.state.streak;
      }
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

    return { isCorrect, points, xp, streak: this.state.streak };
  },

  // ─── NEXT ADAPTIVE DIFFICULTY ──────────────────────────
  getNextDifficulty(wasCorrect, currentDifficulty) {
    if (wasCorrect) {
      if (currentDifficulty === "easy") return "medium";
      if (currentDifficulty === "medium") return "hard";
      return "hard"; // stay at hard
    } else {
      if (currentDifficulty === "hard") return "medium";
      if (currentDifficulty === "medium") return "easy";
      return "easy"; // stay at easy
    }
  },

  // ─── SEASON COMPLETION ─────────────────────────────────
  completeSeason(seasonNum, score) {
    const s = this.state.seasons[seasonNum];
    s.score = score;
    s.questionsDone = true;

    // Bonus XP for completing a season
    this.state.xp += GAME_DATA.scoring.seasonBonusXP;
    this.state.coins += 50; // completion bonus

    this.saveState();
    return this.checkAchievements();
  },

  // ─── CHAMPIONSHIP COMPLETION ───────────────────────────
  completeChampionship(score) {
    this.state.championship.score = score;
    this.state.championship.done = true;
    this.state.finishedAt = new Date().toISOString();

    this.state.xp += GAME_DATA.scoring.championshipBonusXP;
    this.state.coins += 100;

    this.saveState();
    return this.checkAchievements();
  },

  // ─── LEVEL CALCULATIONS ────────────────────────────────
  getLevel() {
    const levels = GAME_DATA.levels;
    let current = levels[0];
    let nextLevel = levels[1] || null;

    for (let i = levels.length - 1; i >= 0; i--) {
      if (this.state.xp >= levels[i].minXP) {
        current = levels[i];
        nextLevel = levels[i + 1] || null;
        break;
      }
    }

    const xpInLevel = nextLevel ? this.state.xp - current.minXP : 0;
    const xpNeeded = nextLevel ? nextLevel.minXP - current.minXP : 1;
    const progress = nextLevel ? Math.min(xpInLevel / xpNeeded, 1) : 1;

    return { ...current, progress, nextLevel, levelIndex: GAME_DATA.levels.indexOf(current) };
  },

  // ─── EMPIRE RATING ─────────────────────────────────────
  getEmpireRating() {
    // Calculate total possible vs achieved
    // 5 seasons × 2 questions max 50pts each = 500 possible from seasons
    // Championship: 5 questions max 30pts each = 150 possible
    // Total possible: ~650

    let totalEarned = 0;
    for (let i = 1; i <= 5; i++) {
      totalEarned += this.state.seasons[i].score || 0;
    }
    totalEarned += this.state.championship.score || 0;

    // Max is generous — based on getting medium+hard each season (50pts) + 5 hard champ (150)
    const maxPossible = 5 * 50 + 150;
    const pct = Math.round((totalEarned / maxPossible) * 100);

    let rating = GAME_DATA.ratings[GAME_DATA.ratings.length - 1]; // default lowest
    for (const r of GAME_DATA.ratings) {
      if (pct >= r.minPct) {
        rating = r;
        break;
      }
    }

    return { ...rating, pct, totalEarned, maxPossible };
  },

  // ─── CLAIM CODE ────────────────────────────────────────
  getClaimCode() {
    const rating = this.getEmpireRating();
    if (rating.pct >= 55) { // C tier or above gets a code
      const codes = GAME_DATA.claimCodes;
      return codes[Math.floor(Math.random() * codes.length)];
    }
    return null;
  },

  // ─── ACHIEVEMENTS ──────────────────────────────────────
  checkAchievements() {
    const newAchievements = [];
    const s = this.state;
    const defs = GAME_DATA.achievements;

    const tryUnlock = (id) => {
      if (!s.achievements.includes(id)) {
        s.achievements.push(id);
        const def = defs.find(a => a.id === id);
        if (def) newAchievements.push(def);
      }
    };

    // First Steps
    if (s.seasons[1].questionsDone) tryUnlock("first_steps");

    // Economist - 3 seasons
    const completedSeasons = Object.values(s.seasons).filter(x => x.questionsDone).length;
    if (completedSeasons >= 3) tryUnlock("economist");

    // Empire Builder - all 5
    if (completedSeasons >= 5) tryUnlock("empire_builder");

    // Champion
    if (s.championship.done) tryUnlock("champion");

    // Streak achievements
    if (s.maxStreak >= 3) tryUnlock("streak_3");
    if (s.maxStreak >= 5) tryUnlock("streak_5");

    // Sharp Mind - answered a hard question correctly (checked elsewhere)
    // Perfectionist - all correct in a season (checked elsewhere)

    // Strategist - A or S tier
    if (s.championship.done) {
      const rating = this.getEmpireRating();
      if (rating.pct >= 80) tryUnlock("strategist");
    }

    // Legend level
    const level = this.getLevel();
    if (level.levelIndex >= 9) tryUnlock("legend");

    this.saveState();
    return newAchievements;
  },

  unlockAchievement(id) {
    if (!this.state.achievements.includes(id)) {
      this.state.achievements.push(id);
      const def = GAME_DATA.achievements.find(a => a.id === id);
      this.saveState();
      return def || null;
    }
    return null;
  }
};
