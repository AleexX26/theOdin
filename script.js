// Crear estrellas
function createStars() {
  const container = document.body;
  for (let i = 0; i < 100; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    star.style.width = `${Math.random() * 5 + 2}px`;
    star.style.height = star.style.width;
    star.style.top = `${Math.random() * 100}%`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 3}s`;
    container.appendChild(star);
  }
}

// Crear flores
function createFlowerGroup(id, x, y) {
  const flowerGroup = document.getElementById(id);
  if (!flowerGroup) return;

  // Limpiar contenido previo
  flowerGroup.innerHTML = '';

  // Pétalos
  for (let i = 0; i < 12; i++) {
    const petal = document.createElement('div');
    petal.className = 'petal';
    petal.style.transform = `rotate(${i * 30}deg)`;
    petal.style.background = `linear-gradient(to bottom, #ff8c00, #ffd700)`;
    flowerGroup.appendChild(petal);
  }

  // Centro
  const center = document.createElement('div');
  center.className = 'center';
  flowerGroup.appendChild(center);

  // Tallo
  const stem = document.createElement('div');
  stem.className = 'stem';
  stem.style.height = `${Math.random() * 100 + 100}px`;
  flowerGroup.appendChild(stem);

  // Hojas
  for (let j = 0; j < 3; j++) {
    const leaf = document.createElement('div');
    leaf.className = 'leaf';
    leaf.style.top = `${Math.random() * 80}px`;
    leaf.style.left = `${Math.random() * 40}px`;
    leaf.style.transform = `rotate(${Math.random() * 90 - 45}deg)`;
    flowerGroup.appendChild(leaf);
  }
}

// Crear ramo en forma de corazón
function createBouquet(centerX, centerY, numFlowers = 18, size = 100) {
  for (let i = 0; i < numFlowers; i++) {
    // Ecuación paramétrica de un corazón, t de 0 a 2π
    const t = (i / (numFlowers - 1)) * 2 * Math.PI;
    const x = centerX + size * 16 * Math.pow(Math.sin(t), 3) / 16;
    const y = centerY - size * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) / 16;
    const flowerId = `flor${i+1}`;
    createFlowerGroup(flowerId, x, y);
    const flower = document.getElementById(flowerId);
    if (flower) {
      flower.style.left = `${x}px`;
      flower.style.top = `${y}px`;
      flower.style.transform = `rotate(${(t * 180 / Math.PI) + 90}deg)`;
    }
  }
}

// Capturar pantalla y compartir
async function captureAndShare() {
  try {
    const container = document.querySelector('.container');
    const canvas = await html2canvas(container, { scale: 2 });
    const dataUrl = canvas.toDataURL('image/png');

    // Abrir WhatsApp con texto y imagen
    const url = `https://wa.me/?text=Te amo ❤️%0A%0A![Flores](https://example.com/flores.png)`; // Cambia por tu URL real
    window.open(url, '_blank');
  } catch (err) {
    alert('Error al capturar. Intenta nuevamente.');
  }
}

// Inicializar todo al cargar
document.addEventListener('DOMContentLoaded', () => {
  createStars();

  // Crear muchas flores para un corazón más lleno
  createBouquet(180, 250, 18, 100);

  // Botón compartir
  const shareBtn = document.getElementById('shareBtn');
  if (shareBtn) {
    shareBtn.addEventListener('click', () => {
      captureAndShare();
    });
  }
});