const startBtn = document.getElementById('start-btn');

const startPage = document.getElementById('start-page');
const timerPage = document.getElementById('timer-page');
const breakPage = document.getElementById('break-page');
const decisionPage = document.getElementById('decision-page');
const thankyouPage = document.getElementById('thankyou-page');

const modeDisplay = document.getElementById('mode');
const timerDisplay = document.getElementById('timer');
const studyTip = document.getElementById('study-tip');

const breakText = document.getElementById('break-text');

const breakBtn = document.getElementById('break-btn');
const backBtn = document.getElementById('back-btn');
const pauseBtn = document.getElementById('pause-btn');
const startBreakBtn = document.getElementById('start-break-btn');
const startTimerBtn = document.getElementById('start-timer-btn');

const studyAgainBtn = document.getElementById('study-again-btn');
const anotherBreakBtn = document.getElementById('another-break-btn');
const endSessionBtn = document.getElementById('end-session-btn');
const restartBtn = document.getElementById('restart-btn');

const sessionCountDisplay = document.getElementById('session-count');

let studyTime = 60;
let breakTime = 60;
let timeLeft = studyTime;

let timerInterval = null;
let isStudy = true;
let isPaused = false;

let sessionsCompleted = 0;
let studyTimeRemaining = 0;



function showPage(page) {
  [startPage, timerPage, breakPage, decisionPage, thankyouPage]
    .forEach(p => p.classList.add('hidden'));

  page.classList.remove('hidden');
}


function resetUI() {
  clearInterval(timerInterval);
  timerInterval = null;

  isPaused = false;
  pauseBtn.textContent = "Pause";

  startTimerBtn.classList.add('hidden');
  breakBtn.disabled = false;
}



function updateTimer() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  timerDisplay.textContent =
    `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
  clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimer();

    if (timeLeft <= 0) {
      clearInterval(timerInterval);

      if (isStudy) {
        sessionsCompleted++;
        sessionCountDisplay.textContent = sessionsCompleted;

        showPage(breakPage);

        breakText.textContent =
          "Take a short rest before the next study session.";

      } else {
        showPage(decisionPage);
      }
    }
  }, 1000);
}

startBtn.addEventListener('click', () => {
  resetUI();

  isStudy = true;
  timeLeft = studyTime;

  updateTimer();

  modeDisplay.textContent = "Study";
  studyTip.textContent = "Focus!";

  showPage(timerPage);
  startTimer();
});


pauseBtn.addEventListener('click', () => {

  if (!isPaused) {

    clearInterval(timerInterval);
    isPaused = true;

    pauseBtn.textContent = "Resume";

  } else {

    isPaused = false;
    pauseBtn.textContent = "Pause";

    startTimer();
  }
});


breakBtn.addEventListener('click', () => {

  if (!isStudy) return;

  if (confirm("Start break early?")) {

    // Save where the study timer was paused
    studyTimeRemaining = timeLeft;

    isStudy = false;
    timeLeft = breakTime;

    updateTimer();

    modeDisplay.textContent = "Break";
    studyTip.textContent = "Enjoy your break pookie!";

    startTimer();
  }
});

//
startBreakBtn.addEventListener('click', () => {

  resetUI();

  isStudy = false;
  timeLeft = breakTime;

  updateTimer();

  modeDisplay.textContent = "Break";
  studyTip.textContent = "Enjoy your break pookie!";

  showPage(timerPage);

  startTimer();
});


backBtn.addEventListener('click', () => {

  resetUI();

  if (!isStudy && studyTimeRemaining > 0) {

    // Return to the study session where the user left off
    isStudy = true;
    timeLeft = studyTimeRemaining;

    updateTimer();

    modeDisplay.textContent = "Study";
    studyTip.textContent = "Focus!";

    showPage(timerPage);
    startTimer();

  } else {

    // Normal Back button behavior
    isStudy = true;
    timeLeft = studyTime;

    updateTimer();

    showPage(startPage);
  }
});


studyAgainBtn.addEventListener('click', () => {

  resetUI();

  isStudy = true;
  timeLeft = studyTime;

  updateTimer();

  modeDisplay.textContent = "Study";
  studyTip.textContent = "Focus!";

  showPage(timerPage);

  startTimer();
});


anotherBreakBtn.addEventListener('click', () => {

  resetUI();

  isStudy = false;
  timeLeft = breakTime;

  updateTimer();

  modeDisplay.textContent = "Break";
  studyTip.textContent = "Enjoy your break pookie!";

  showPage(timerPage);

  startTimer();
});

endSessionBtn.addEventListener('click', () => {

  resetUI();

  showPage(thankyouPage);
});


restartBtn.addEventListener('click', () => {

  resetUI();

  sessionsCompleted = 0;
  sessionCountDisplay.textContent = 0;

  isStudy = true;
  timeLeft = studyTime;

  updateTimer();

  showPage(startPage);
});