/*************************************************************
 * BOW SPORTS EMPIRE — APP CONTROLLER
 * Wires engine + UI, handles full game flow
 * Flow: Intro → Choice → Outcome → Event → Questions → Results+Shop → Next
 *************************************************************/

(function () {
  "use strict";

  // ─── LOCAL STATE ───────────────────────────────────────
  let currentSeasonQuestions = null;
  let seasonQIndex = 0;
  let seasonScore = 0;
  let seasonCorrect = 0;
  let currentDifficulty = "medium";
  let currentEvent = null;

  let champBank = null;
  let champQIndex = 0;
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
    GameUI.showHeader(true);
    GameUI.updateHeader();
    GameUI.updateStatBars(false);

    if (s.championship && s.championship.done) {
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
    document.getElementById("btn-start").addEventListener("click", () => GameUI.showScreen("screen-name"));

    // Name
    const nameInput = document.getElementById("input-name");
    const nameBtn = document.getElementById("btn-name-submit");
    nameInput.addEventListener("input", () => { nameBtn.disabled = nameInput.value.trim().length === 0; });
    nameInput.addEventListener("keydown", (e) => { if (e.key === "Enter" && nameInput.value.trim().length > 0) submitName(); });
    nameBtn.addEventListener("click", submitName);

    // Season intro → Choice
    document.getElementById("btn-to-choice").addEventListener("click", () => {
      GameUI.renderStrategyChoice(GameEngine.state.currentSeason);
      GameUI.showScreen("screen-choice");
    });

    // Lock choice
    document.getElementById("btn-lock-choice").addEventListener("click", lockChoice);

    // After outcome → Event or Questions
    document.getElementById("btn-after-outcome").addEventListener("click", afterOutcome);

    // Event choices
    document.getElementById("event-btn-a").addEventListener("click", () => handleEventChoice("A"));
    document.getElementById("event-btn-b").addEventListener("click", () => handleEventChoice("B"));

    // After event → Questions
    document.getElementById("btn-after-event").addEventListener("click", startSeasonQuestions);

    // Next question
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

  // ─── NAME ──────────────────────────────────────────────
  function submitName() {
    const name = document.getElementById("input-name").value.trim();
    if (!name) return;

    GameEngine.state.playerName = name;
    GameEngine.state.startedAt = new Date().toISOString();
    GameEngine.state.phase = "intro";
    GameEngine.state.currentSeason = 1;

    // Init rival
    GameEngine.initRival();

    GameEngine.saveState();

    GameUI.showHeader(true);
    GameUI.updateHeader();
    GameUI.updateStatBars(false);
    showSeasonIntro(1);
  }

  // ─── SEASON FLOW ───────────────────────────────────────
  function showSeasonIntro(seasonNum) {
    GameEngine.state.currentSeason = seasonNum;
    GameEngine.state.phase = "intro";
    GameEngine.saveState();

    GameUI.updateStatBars(false);
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

    // Apply strategy stat changes
    const strategyStats = GAME_DATA.seasons[seasonNum].strategies[choice].stats;
    GameEngine.applyStats(strategyStats);

    // Simulate rival's season
    GameEngine.simulateRivalSeason(seasonNum);

    // Award coins for making a choice
    GameEngine.state.coins += 25;
    GameEngine.state.xp += 10;
    GameEngine.saveState();

    GameUI.renderOutcome(seasonNum, choice);
    GameUI.updateHeader();
    GameUI.updateStatBars(true);
    GameUI.showScreen("screen-outcome");
  }

  function afterOutcome() {
    // Show a random event (50% chance after season 1, always after season 2+)
    const seasonNum = GameEngine.state.currentSeason;
    const showEvent = seasonNum >= 2 || Math.random() > 0.5;

    if (showEvent) {
      currentEvent = GameEngine.getRandomEvent();
      if (currentEvent) {
        GameUI.renderEvent(currentEvent);
        GameUI.showScreen("screen-event");
        return;
      }
    }

    // No event — go straight to questions
    startSeasonQuestions();
  }

  // ─── RANDOM EVENTS ─────────────────────────────────────
  function handleEventChoice(choice) {
    if (!currentEvent) return;

    const option = choice === "A" ? currentEvent.optionA : currentEvent.optionB;

    // Apply stat effects
    GameEngine.applyStats(option.effect);

    // Award coins for engaging with the event
    GameEngine.state.coins += 15;
    GameEngine.state.xp += 5;
    GameEngine.saveState();

    GameUI.renderEventResult(option.result, option.effect);
    GameUI.updateHeader();
    GameUI.updateStatBars(true);
    GameUI.showScreen("screen-event-result");
  }

  // ─── QUESTIONS ─────────────────────────────────────────
  function startSeasonQuestions() {
    const seasonNum = GameEngine.state.currentSeason;
    const choice = GameEngine.state.seasons[seasonNum].choice;

    currentSeasonQuestions = GameEngine.prepareSeasonQuestions(seasonNum, choice);
    seasonQIndex = 0;
    seasonScore = 0;
    seasonCorrect = 0;
    currentDifficulty = "medium";

    GameEngine.state.phase = "questions";
    GameEngine.saveState();

    const q = currentSeasonQuestions[0];
    GameUI.renderQuestion(q, 0, 2, false);
    GameUI.showScreen("screen-question");
  }

  function nextSeasonQuestion() {
    const wasCorrect = GameUI._lastAnswerCorrect;
    const lastPoints = GameUI._lastPoints || 0;
    seasonScore += lastPoints;
    if (wasCorrect) seasonCorrect++;

    seasonQIndex++;

    if (seasonQIndex >= 2) {
      finishSeasonQuestions();
      return;
    }

    const nextDifficulty = GameEngine.getNextDifficulty(wasCorrect, currentDifficulty);
    currentDifficulty = nextDifficulty;

    const q2Data = currentSeasonQuestions[1];
    const q = (nextDifficulty === "hard" || nextDifficulty === "medium") ? q2Data.hard : q2Data.easy;

    GameUI.renderQuestion(q, 1, 2, false);
  }

  function finishSeasonQuestions() {
    const seasonNum = GameEngine.state.currentSeason;
    // Q2 result was already counted in nextSeasonQuestion.
    const newAchievements = GameEngine.completeSeason(seasonNum, seasonScore);

    if (seasonCorrect === 2) {
      const ach = GameEngine.unlockAchievement("perfectionist");
      if (ach) newAchievements.push(ach);
    }

    const moreAchievements = GameEngine.checkAchievements();
    const allNew = [...newAchievements, ...moreAchievements.filter(a => !newAchievements.find(n => n.id === a.id))];

    GameUI.renderSeasonResults(seasonNum, seasonScore, seasonCorrect, 2);
    GameUI.showScreen("screen-season-results");
    GameUI.updateHeader();
    GameUI.updateStatBars(true);

    if (seasonCorrect === 2) GameUI.showConfetti();
    if (allNew.length > 0) GameUI.showNewAchievements(allNew);
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
    let q, bank, usedList;

    if (champDifficulty === "easy") { bank = champBank.easyBank; usedList = champUsedEasy; }
    else if (champDifficulty === "hard") { bank = champBank.hardBank; usedList = champUsedHard; }
    else { bank = champBank.mediumBank; usedList = champUsedMedium; }

    const available = bank.filter((_, i) => !usedList.includes(i));
    if (available.length === 0) {
      q = bank[0]; usedList.push(0);
    } else {
      const idx = Math.floor(Math.random() * available.length);
      const originalIdx = bank.indexOf(available[idx]);
      q = available[idx];
      usedList.push(originalIdx);
    }

    const prepared = { ...q, difficulty: champDifficulty, shuffledOptions: GameEngine.shuffleOptions(q) };
    GameUI.renderQuestion(prepared, champQIndex, 5, true);
    GameUI.showScreen("screen-champ-question");
  }

  function nextChampQuestion() {
    const wasCorrect = GameUI._lastAnswerCorrect;
    const lastPoints = GameUI._lastPoints || 0;
    champScore += lastPoints;
    if (wasCorrect) champCorrect++;

    champQIndex++;

    if (champQIndex >= 5) {
      finishChampionship();
      return;
    }

    champDifficulty = GameEngine.getNextDifficulty(wasCorrect, champDifficulty);
    showChampQuestion();
  }

  function finishChampionship() {
    const newAchievements = GameEngine.completeChampionship(champScore);

    // Check low risk achievement
    if (GameEngine.state.stats.risk < 25) {
      const ach = GameEngine.unlockAchievement("low_risk");
      if (ach) newAchievements.push(ach);
    }

    GameUI.renderFinalResults();
    GameUI.showScreen("screen-final");
    GameUI.updateHeader();
    if (newAchievements.length > 0) GameUI.showNewAchievements(newAchievements);
  }

  function showFinalResults() {
    GameUI.renderFinalResults();
    GameUI.showScreen("screen-final");
    GameUI.updateHeader();
  }

})();
