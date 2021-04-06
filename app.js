const canvas = document.querySelector('#jsCanvas');
const ctx = canvas.getContext('2d');
const colors = document.querySelector('.controls__colors');
const range = document.querySelector('#jsRange');
const modeButton = document.querySelector('#jsMode');
const saveButton = document.querySelector('#jsSave');

const INITIAL_COLOR = '#2c2c2c';
const CANVAS_WIDTH = 700;
const CANVAS_HEIGHT = 500;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

ctx.lineWidth = 2.5;
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;

let isPainting = false;
let isFillMode = false;

const stopPainting = () => {
  isPainting = false;
}

const startPainting = () => {
  isPainting = true;
}

function onMouseMove(event) {
  if (isFillMode) return;

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

function onMouseDown() {
  startPainting();
}

function onMouseUp() {
  stopPainting();
}

function fillCanvas() {
  if (isFillMode) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}

if (canvas) {
  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('mousedown', onMouseDown);
  canvas.addEventListener('mouseup', stopPainting);
  canvas.addEventListener('mouseleave', stopPainting);
  canvas.addEventListener('click', fillCanvas);
  canvas.oncontextmenu = () => false;
}

colors.addEventListener('click', event => {
  const color = event.target.style.backgroundColor;

  if (color && event.target.classList.contains('controls__color')) {
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
  }
});

range.addEventListener('change', () => {
  ctx.lineWidth = range.value;
})

modeButton.addEventListener('click', () => {
  if (isFillMode) {
    isFillMode = false;
    modeButton.textContent = 'Рисование';
  } else {
    isFillMode = true;
    modeButton.textContent = 'Заливка';
  }
})

saveButton.addEventListener('click', () => {
  const format = 'png';
  const image = canvas.toDataURL(`image/${format}`);
  const link = document.createElement('a');
  link.href = image;
  link.download = `PaintJS [Export].${format}`;
  link.click();
});