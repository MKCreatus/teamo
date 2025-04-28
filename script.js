const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const esposaImg = new Image();
const voceImg = new Image();
esposaImg.src = 'img/foto da minha esposa.png';
voceImg.src = 'img/minha foto.png';

const esposa = { x: 100, y: 100, width: 80, height: 80, speed: 5 };
const voce = { x: 400, y: 400, width: 80, height: 80, speed: 5 };

const keys = {};

window.addEventListener('keydown', (e) => {
  keys[e.key] = true;
});
window.addEventListener('keyup', (e) => {
  keys[e.key] = false;
});

function movePlayers() {
  // Esposa - WASD
  if (keys['w']) esposa.y -= esposa.speed;
  if (keys['s']) esposa.y += esposa.speed;
  if (keys['a']) esposa.x -= esposa.speed;
  if (keys['d']) esposa.x += esposa.speed;

  // Você - Setas
  if (keys['ArrowUp']) voce.y -= voce.speed;
  if (keys['ArrowDown']) voce.y += voce.speed;
  if (keys['ArrowLeft']) voce.x -= voce.speed;
  if (keys['ArrowRight']) voce.x += voce.speed;
}

function detectCollision() {
  return (
    esposa.x < voce.x + voce.width &&
    esposa.x + esposa.width > voce.x &&
    esposa.y < voce.y + voce.height &&
    esposa.y + esposa.height > voce.y
  );
}

function showMessage() {
  document.getElementById('message').classList.remove('hidden');
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  movePlayers();

  ctx.drawImage(esposaImg, esposa.x, esposa.y, esposa.width, esposa.height);
  ctx.drawImage(voceImg, voce.x, voce.y, voce.width, voce.height);

  if (detectCollision()) {
    showMessage();
    return;
  }

  requestAnimationFrame(gameLoop);
}

// 👉 Esperar as duas imagens carregarem antes de iniciar o jogo
let imagensCarregadas = 0;

function checkImagesLoaded() {
  imagensCarregadas++;
  if (imagensCarregadas === 2) {
    gameLoop();
  }
}

esposaImg.onload = checkImagesLoaded;
voceImg.onload = checkImagesLoaded;
