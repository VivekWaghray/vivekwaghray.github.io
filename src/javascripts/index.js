/* eslint-disable no-restricted-globals */
/* eslint-disable max-len */
/* eslint-disable no-plusplus */
/* eslint-disable prefer-const */
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;
let particleArray;

class Particle {
  constructor(x, y, directionX, directionY, size, color) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
    this.speedX = this.directionX;
    this.speedY = this.directionY;
  }

  // method to create each particle
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);

    ctx.fillStyle = '#DB93B0';
    ctx.fill();
  }

  // update particle position
  update() {
    // check if particle is still within screen
    if (this.x > canvas.width || this.x < 0) {
      this.directionX = -this.directionX;
      this.speedX = this.directionX;
    }
    if (this.y + this.size > canvas.height || this.y - this.size < 0) {
      this.directionY = -this.directionY;
      this.speedY = this.directionY;
    }
    // remove collision detection
    // move particle
    this.x += this.directionX;
    this.y += this.directionY;
    // call draw method
    this.draw();
  }
}

// create particle array
function init() {
  particleArray = [];
  let numberOfParticles = (canvas.height * canvas.width) / 9000;
  for (let i = 0; i < numberOfParticles; i++) {
    let size = (Math.random() * 20) + 1;
    let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
    let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
    let directionX = (Math.random() * 2) - 1;
    let directionY = (Math.random() * 2) - 1;

    let color = 'black';
    particleArray.push(new Particle(x, y, directionX, directionY, size, color));
  }
}

// create animation loop
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < particleArray.length; i++) {
    particleArray[i].update();
  }
}
init();
animate();

// RESIZE SETTING - empty and refill particle array every time window changes size + change canvas size
window.addEventListener(
  'resize',
  () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
  },
);
