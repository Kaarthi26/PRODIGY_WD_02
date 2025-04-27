let startTime;
let elapsedTime = 0;
let timerInterval;
const timeDisplay = document.getElementById("time");
const startStopBtn = document.getElementById("startStopBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const lapsContainer = document.getElementById("laps");

function formatTime(ms) {
  const date = new Date(ms);
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  const milliseconds = String(Math.floor(date.getUTCMilliseconds() / 10)).padStart(2, '0');
  return `${minutes}:${seconds}:${milliseconds}`;
}

function startTimer() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    timeDisplay.textContent = formatTime(elapsedTime);
  }, 10);
  startStopBtn.textContent = "Pause";
}

function pauseTimer() {
  clearInterval(timerInterval);
  startStopBtn.textContent = "Start";
}

function resetTimer() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  timeDisplay.textContent = "00:00:00";
  startStopBtn.textContent = "Start";
  lapsContainer.innerHTML = "";
}

function recordLap() {
  if (elapsedTime > 0) {
    const lapItem = document.createElement("li");
    lapItem.textContent = formatTime(elapsedTime);
    lapsContainer.appendChild(lapItem);
  }
}

startStopBtn.addEventListener("click", () => {
  if (startStopBtn.textContent === "Start") {
    startTimer();
  } else {
    pauseTimer();
  }
});

resetBtn.addEventListener("click", resetTimer);
lapBtn.addEventListener("click", recordLap);
