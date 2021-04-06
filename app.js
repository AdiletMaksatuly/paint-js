const canvas = document.querySelector('#jsCanvas');
const ctx = canvas.getContext('2d');
const colors = document.querySelector('.controls__colors');
const range = document.querySelector('#jsRange');
const modeButton = document.querySelector('#jsMode');

canvas.width = 700;
canvas.height = 500;

ctx.lineWidth = 2.5;
ctx.strokeStyle = '#2c2c2c';

let isPainting = false;
let isFillMode = false;


const stopPainting = () => {
  isPainting = false;
}

const startPainting = () => {
  isPainting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;

  if (!isPainting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function onMouseDown(event) {
  startPainting();
}

function onMouseUp(event) {
  stopPainting();
}



if (canvas) {
  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('mousedown', onMouseDown);
  canvas.addEventListener('mouseup', stopPainting);
  canvas.addEventListener('mouseleave', stopPainting);
}

colors.addEventListener('click', event => {
  const color = event.target.style.backgroundColor;

  if (color && event.target.classList.contains('controls__color')) {
    ctx.strokeStyle = color;
  }
})

range.addEventListener('change', () => {
  ctx.lineWidth = range.value;
})

modeButton.addEventListener('click', () => {
  if (isFillMode) {
    isFillMode = false;
    modeButton.textContent = 'Заливка';
  } else {
    isFillMode = true;
    modeButton.textContent = 'Рисование';
  }
})