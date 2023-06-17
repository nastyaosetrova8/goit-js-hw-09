const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body');

startBtn.addEventListener('click', handlerClickStart);
stopBtn.addEventListener('click', handlerClickStop);

let idInterval;
function handlerClickStart() {
  idInterval = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);

  startBtn.disabled = true;
  stopBtn.disabled = false;
}

function handlerClickStop() {
  stopBtn.disabled = true;
  startBtn.disabled = false;
  clearInterval(idInterval);
  idInterval = null;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
