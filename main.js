// // http://websamuraj.pl/examples/js/projekt11/

const btnTime = document.querySelector('.main');
const btnReset = document.querySelector('.reset');
const panel = document.querySelector('.timeplace');
const btnLap = document.querySelector('.lap');
const lapList = document.querySelector('.lapList');
const btnResetLap = document.querySelector('.resetLap');

let intervalId = null;
let startTimestamp = 0;
let elapsedMs = 0;

const formatTime = (ms) => {
    const centiseconds = Math.floor((ms % 1000) / 10);
    const totalSeconds = Math.floor(ms / 1000);
    const seconds = totalSeconds % 60;
    const minutes = Math.floor(totalSeconds / 60);

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(centiseconds).padStart(2, '0')}`;
};

const updateTimerDisplay = () => {
    const currentElapsed = elapsedMs + (Date.now() - startTimestamp);
    panel.textContent = formatTime(currentElapsed);
};

const start = () => {
    const isStopped = btnTime.classList.contains('main');

    if (isStopped) {
        btnTime.classList.remove('main');
        btnTime.classList.add('pause');
        btnTime.textContent = 'Pause';

        startTimestamp = Date.now();
        intervalId = setInterval(updateTimerDisplay, 10);
        return;
    }

    btnTime.classList.remove('pause');
    btnTime.classList.add('main');
    btnTime.textContent = 'Start';

    clearInterval(intervalId);
    intervalId = null;
    elapsedMs += Date.now() - startTimestamp;
};

const reset = () => {
    clearInterval(intervalId);
    intervalId = null;

    elapsedMs = 0;
    startTimestamp = 0;

    btnTime.classList.remove('pause');
    btnTime.classList.add('main');
    btnTime.textContent = 'Start';

    panel.textContent = '00:00.00';
    lapList.innerHTML = '';
};

const lapRound = () => {
    const isRunning = btnTime.classList.contains('pause');
    if (!isRunning) {
        return;
    }

    const li = document.createElement('li');
    const currentElapsed = elapsedMs + (Date.now() - startTimestamp);

    li.textContent = formatTime(currentElapsed);

    if (currentElapsed <= 2000) {
        li.classList.add('green');
    }

    lapList.appendChild(li);
};

const resetLap = () => {
    lapList.innerHTML = '';
};

panel.textContent = '00:00.00';

btnTime.addEventListener('click', start);
btnReset.addEventListener('click', reset);
btnLap.addEventListener('click', lapRound);
btnResetLap.addEventListener('click', resetLap);
