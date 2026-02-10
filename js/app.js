/*************************************************************
 * BOW SPORTS EMPIRE — APP CONTROLLER
 * Wires engine + UI together, handles all user interactions
 *************************************************************/

(function () {
  "use strict";

  // ─── LOCAL TRACKING ────────────────────────────────────
  let currentSeasonQuestions = null; // prepared adaptive questions for current season
  let seasonQIndex = 0;             // which question we're on in the season (0 or 1)
  let seasonScore = 0;              // accumulated points this season
  let seasonCorrect = 0;            // correct count this season
  let currentDifficulty = "medium"; // current adaptive difficulty

  let champBank = null;             // championship question banks
  let champQIndex = 0;              // which champ question (0-4)
  let champScore = 0;
  let champCorrect = 0;
  let champDifficulty = "medium";
  let champUsedEasy = [];
  let champUsedMedium = [];
  let champUsedHard = [];

  // ─── INIT ──────────────────────────────────────────────
  document.addEventListener("DOMContentLoaded", () => {
    GameEngine.init();
    bindEvents();
    restoreState();
  });

  function restoreState() {
    const s = GameEngine.state;

    if (s.phase === "title" || !s.playerName) {
      GameUI.showScreen("screen-title");
      GameUI.showHeader(false);
      return;
    }

    // Has a saved game — restore to last position
    GameUI.showHeader(true);
    GameUI.updateHeader();
    GameUI.updateRail(s.currentSeason);

    // Simplified restore: just go to the season intro of wherever they were
    if (s.championship.done) {
      showFinalResults();
    } else if (s.currentSeason > 5) {
      showChampIntro();
    } else {
      showSeasonIntro(s.currentSeason);
    }
  }

  // ─── EVENT BINDING ─────────────────────────────────────
  function bindEvents() {
    // Title → Name
    document.getElementById("btn-start").addEventListener("click", () => {
      GameUI.showScreen("screen-name");
    });

    // Name input
    const nameInput = document.getElementById("input-name");
    const nameBtn = document.getElementById("btn-name-submit");

    nameInput.addEventListener("input", () => {
      nameBtn.disabled = nameInput.value.trim().length === 0;
    });

    nameInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && nameInput.value.trim().length > 0) {
        submitName();
      }
    });

    nameBtn.addEventListener("click", submitName);

    // Season intro → Choice
    document.getElementById("btn-to-choice").addEventListener("click", () => {
      GameUI.renderStrategyChoice(GameEngine.state.currentSeason);
      GameUI.showScreen("screen-choice");
    });

    // Lock choice
    document.getElementById("btn-lock-choice").addEventListener("click", lockChoice);

    // Outcome → Questions
    document.getElementById("btn-to-questions").addEventListener("click", startSeasonQuestions);

    // Next question (season)
    document.getElementById("btn-next-q").addEventListener("click", nextSeasonQuestion);

    // Next season
    document.getElementById("btn-next-season").addEventListener("click", goNextSeason);

    // Championship
    document.getElementById("btn-start-champ").addEventListener("click", startChampionship);
    document.getElementById("btn-next-cq").addEventListener("click", nextChampQuestion);

    // Play again
    document.getElementById("btn-play-again").addEventListener("click", () => {
      GameEngine.resetState();
      GameEngine.init();
      GameUI.showHeader(false);
      GameUI.showScreen("screen-title");
    });
  }

  // ─── NAME SUBMISSION ───────────────────────────────────
  function submitName() {
    const name = document.getElementById("input-name").value.trim();
    if (!name) return;

    GameEngine.state.playerName = name;
    GameEngine.state.startedAt = new Date().toISOString();
    GameEngine.state.phase = "intro";
    GameEngine.state.currentSeason = 1;
    GameEngine.saveState();

    GameUI.showHeader(true);
    GameUI.updateHeader();
    GameUI.updateRail(1);
    showSeasonIntro(1);
  }

  // ─── SEASON FLOW ───────────────────────────────────────
  function showSeasonIntro(seasonNum) {
    GameEngine.state.currentSeason = seasonNum;
    GameEngine.state.phase = "intro";
    GameEngine.saveState();

    GameUI.updateRail(seasonNum);
    GameUI.renderSeasonIntro(seasonNum);
    GameUI.showScreen("screen-season-intro");
  }

  function lockChoice() {
    const choice = GameEngine.state._pendingChoice;
    if (!choice) return;

    const seasonNum = GameEngine.state.currentSeason;
    GameEngine.state.seasons[seasonNum].choice = choice;
    GameEngine.state.phase = "outcome";
    delete GameEngine.state._pendingChoice;
    GameEngine.saveState();

    GameUI.renderOutcome(seasonNum, choice);
    GameUI.showScreen("screen-outcome");

    // Award small coins for making a choice
    GameEngine.state.coins += 25;
    GameEngine.state.xp += 10;
    GameUI.updateHeader();
    GameEngine.saveState();
  }

  function startSeasonQuestions() {
    const seasonNum = GameEngine.state.currentSeason;

    // Prepare adaptive questions
    currentSeasonQuestions = GameEngine.prepareSeasonQuestions(seasonNum);
    seasonQIndex = 0;
    seasonScore = 0;
    seasonCorrect = 0;
    currentDifficulty = "medium";

    GameEngine.state.phase = "questions";
    GameEngine.saveState();

    // Show first question (always medium)
    const q = currentSeasonQuestions[0];
    GameUI.renderQuestion(q, 0, 2, false);
    GameUI.showScreen("screen-question");
  }

  function nextSeasonQuestion() {
    // Record what happened
    const wasCorrect = GameUI._lastAnswerCorrect;
    const lastPoints = GameUI._lastPoints || 0;
    seasonScore += lastPoints;
    if (wasCorrect) seasonCorrect++;

    seasonQIndex++;

    if (seasonQIndex >= 2) {
      // Season questions done
      finishSeasonQuestions();
      return;
    }

    // Get adaptive Q2
    const nextDifficulty = GameEngine.getNextDifficulty(wasCorrect, currentDifficulty);
    currentDifficulty = nextDifficulty;

    const q2Data = currentSeasonQuestions[1]; // This has .hard and .easy
    const q = (nextDifficulty === "hard" || nextDifficulty === "medium")
      ? q2Data.hard
      : q2Data.easy;

    GameUI.renderQuestion(q, 1, 2, false);
  }

  function finishSeasonQuestions() {
    const seasonNum = GameEngine.state.currentSeason;
    // Q2 result was already counted in nextSeasonQuestion before calling this.
    // Complete the season
    const newAchievements = GameEngine.completeSeason(seasonNum, seasonScore);

    // Check perfectionist
    if (seasonCorrect === 2) {
      const ach = GameEngine.unlockAchievement("perfectionist");
      if (ach) newAchievements.push(ach);
    }

    // Also check general achievements
    const moreAchievements = GameEngine.checkAchievements();
    const allNew = [...newAchievements, ...moreAchievements.filter(a =>
      !newAchievements.find(n => n.id === a.id)
    )];

    GameUI.renderSeasonResults(seasonNum, seasonScore, seasonCorrect, 2);
    GameUI.showScreen("screen-season-results");
    GameUI.updateHeader();

    // Show confetti for perfect
    if (seasonCorrect === 2) GameUI.showConfetti();

    // Show achievements
    if (allNew.length > 0) {
      GameUI.showNewAchievements(allNew);
    }
  }

  function goNextSeason() {
    const nextSeason = GameEngine.state.currentSeason + 1;

    if (nextSeason > 5) {
      showChampIntro();
    } else {
      showSeasonIntro(nextSeason);
    }
  }

  // ─── CHAMPIONSHIP ─────────────────────────────────────
  function showChampIntro() {
    GameEngine.state.currentSeason = 6;
    GameEngine.state.phase = "champ-intro";
    GameEngine.saveState();
    GameUI.updateRail(6);
    GameUI.showScreen("screen-champ-intro");
  }

  function startChampionship() {
    champBank = GameEngine.prepareChampionshipQuestions();
    champQIndex = 0;
    champScore = 0;
    champCorrect = 0;
    champDifficulty = "medium";
    champUsedEasy = [];
    champUsedMedium = [];
    champUsedHard = [];

    GameEngine.state.phase = "champ-q";
    GameEngine.saveState();

    showChampQuestion();
  }

  function showChampQuestion() {
    let q;
    let bank;
    let usedList;

    if (champDifficulty === "easy") {
      bank = champBank.easyBank;
      usedList = champUsedEasy;
    } else if (champDifficulty === "hard") {
      bank = champBank.hardBank;
      usedList = champUsedHard;
    } else {
      bank = champBank.mediumBank;
      usedList = champUsedMedium;
    }

    // Pick an unused question from the bank
    const available = bank.filter((_, i) => !usedList.includes(i));
    if (available.length === 0) {
      // Fallback: reuse
      q = bank[0];
      usedList.push(0);
    } else {
      const idx = Math.floor(Math.random() * available.length);
      const originalIdx = bank.indexOf(available[idx]);
      q = available[idx];
      usedList.push(originalIdx);
    }

    const prepared = {
      ...q,
      difficulty: champDifficulty,
      shuffledOptions: GameEngine.shuffleOptions(q)
    };

    GameUI.renderQuestion(prepared, champQIndex, 5, true);
    GameUI.showScreen("screen-champ-question");
  }

  function nextChampQuestion() {
    // Record result
    const wasCorrect = GameUI._lastAnswerCorrect;
    const lastPoints = GameUI._lastPoints || 0;
    champScore += lastPoints;
    if (wasCorrect) champCorrect++;

    champQIndex++;

    if (champQIndex >= 5) {
      finishChampionship();
      return;
    }

    // Adapt difficulty
    champDifficulty = GameEngine.getNextDifficulty(wasCorrect, champDifficulty);
    showChampQuestion();
  }

  function finishChampionship() {
    const newAchievements = GameEngine.completeChampionship(champScore);

    GameUI.renderFinalResults();
    GameUI.showScreen("screen-final");
    GameUI.updateHeader();

    if (newAchievements.length > 0) {
      GameUI.showNewAchievements(newAchievements);
    }
  }

  // ─── FINAL RESULTS ────────────────────────────────────
  function showFinalResults() {
    GameUI.renderFinalResults();
    GameUI.showScreen("screen-final");
    GameUI.updateHeader();
  }

})();
