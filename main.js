// // http://websamuraj.pl/examples/js/projekt11/

const btnTime = document.querySelector('.main')
const btnReset = document.querySelector('.reset')
const panel = document.querySelector('.time div')
const btnLap = document.querySelector('.lap')
const lapList = document.querySelector(".lapList");
const btnResetLap = document.querySelector(".resetLap");

let stop;
let seconds = 0;

const startTimer = () => {
    seconds++;
    panel.textContent = (seconds / 100).toFixed(2);
}

const start = () => {
    let classesTime = btnTime.classList;
    let result = classesTime.contains('main');

    if (result) {
        btnTime.classList.remove('main');
        btnTime.classList.add('pause');
        btnTime.textContent = "Pause";
        stop = setInterval(startTimer, 10)

    } else {
        btnTime.classList.remove('pause');
        btnTime.classList.add('main');
        btnTime.textContent = "Start";
        clearInterval(stop)

    }
}

const reset = () => {


    if (btnReset.className === 'reset') {
        btnTime.classList.add('main');
        btnTime.textContent = "Start";
        panel.textContent = "---"
        clearInterval(stop);
        seconds = 0;
    }
}

const lapRound = () => {

    const li = document.createElement('li');
    li.textContent = seconds / 100;
    lapList.appendChild(li);
    seconds = 0;

    if (panel.textContent <= 2) {
        li.classList.add('green');
        li.textContent = `${panel.textContent}`
    }
}



const resetLap = () => {
    const liOne = document.querySelector('li');
    liOne.remove();


}

btnTime.addEventListener('click', start);
btnReset.addEventListener('click', reset);
btnLap.addEventListener('click', lapRound);
btnResetLap.addEventListener('click', resetLap);