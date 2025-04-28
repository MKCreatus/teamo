// Pega o canvas e prepara o contexto
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Carrega as imagens
const esposaImg = new Image();
const voceImg = new Image();
esposaImg.src = 'img/foto da minha esposa.png';
voceImg.src = 'img/minha foto.png';

// Define os personagens
const esposa = { x: 100, y: 100, width: 80, height: 80, speed: 5 };
const voce = { x: 400, y: 400, width: 80, height: 80, speed: 5 };

// Controle de teclas pressionadas
const keys = {};

// Escuta eventos de teclado
window.addEventListener('keydown', (e) => {
  keys[e.key] = true;
});
window.addEventListener('keyup', (e) => {
  keys[e.key] = false;
});

// Movimento dos personagens
function movePlayers() {
  // Esposa - movimenta com W A S D
  if (keys['w']) esposa.y -= esposa.speed;
  if (keys['s']) esposa.y += esposa.speed;
  if (keys['a']) esposa.x -= esposa.speed;
  if (keys['d']) esposa.x += esposa.speed;

  // Você - movimenta com as setas
  if (keys['ArrowUp']) voce.y -= voce.speed;
  if (keys['ArrowDown']) voce.y += voce.speed;
  if (keys['ArrowLeft']) voce.x -= voce.speed;
  if (keys['ArrowRight']) voce.x += voce.speed;
}

// Detecta se houve colisão
function detectCollision() {
  return (
    esposa.x < voce.x + voce.width &&
    esposa.x + esposa.width > voce.x &&
    esposa.y < voce.y + voce.height &&
    esposa.y + esposa.height > voce.y
  );
}

// Mostra a mensagem de vitória
function showMessage() {
  const message = document.getElementById('message');
  message.classList.remove('hidden'); // Remove a classe que esconde
  message.style.display = 'flex';     // Força aparecer como flexbox
}

// Função principal do jogo
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  movePlayers();

  ctx.drawImage(esposaImg, esposa.x, esposa.y, esposa.width, esposa.height);
  ctx.drawImage(voceImg, voce.x, voce.y, voce.width, voce.height);

  if (detectCollision()) {
    showMessage();
    return; // Para o jogo
  }

  requestAnimationFrame(gameLoop); // Continua o jogo
}

// Espera carregar as duas imagens antes de começar
let imagensCarregadas = 0;

function checkImagesLoaded() {
  imagensCarregadas++;
  if (imagensCarregadas === 2) {
    gameLoop();
  }
}

esposaImg.onload = checkImagesLoaded;
voceImg.onload = checkImagesLoaded;
