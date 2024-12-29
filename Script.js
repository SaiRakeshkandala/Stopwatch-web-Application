// Stopwatch variables
let timer;
let startTime;
let elapsedTime = 0;
let running = false;

// DOM elements
const timeDisplay = document.querySelector('.time-display');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const lapBtn = document.getElementById('lap-btn');
const lapsList = document.getElementById('laps');

// Format time into HH:MM:SS
function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

// Update time display
function updateTime() {
    elapsedTime = Date.now() - startTime;
    timeDisplay.textContent = formatTime(elapsedTime);
}

// Start stopwatch
startBtn.addEventListener('click', () => {
    if (!running) {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateTime, 1000);
        running = true;
        startBtn.textContent = 'Resume';
        pauseBtn.disabled = false;
        resetBtn.disabled = false;
        lapBtn.disabled = false;
    }
});

// Pause stopwatch
pauseBtn.addEventListener('click', () => {
    clearInterval(timer);
    running = false;
    pauseBtn.disabled = true;
});

// Reset stopwatch
resetBtn.addEventListener('click', () => {
    clearInterval(timer);
    elapsedTime = 0;
    timeDisplay.textContent = '00:00:00';
    running = false;
    startBtn.textContent = 'Start';
    pauseBtn.disabled = true;
    resetBtn.disabled = true;
    lapBtn.disabled = true;
    lapsList.innerHTML = '';
});

// Record lap
lapBtn.addEventListener('click', () => {
    const lapTime = document.createElement('li');
    lapTime.textContent = `Lap ${lapsList.children.length + 1}: ${formatTime(elapsedTime)}`;
    lapsList.appendChild(lapTime);
});
