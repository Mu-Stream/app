const SIZE = 5;
const MOVING_BG_COUNT = 5;
const DEFAULT_BG_COLORS = ['#BDB8E3', '#e2bbf2'];
const MOVE_DURATION_MS = 6000;

let bg_colors = DEFAULT_BG_COLORS;

function randomMovingBGSize() {
  return Array.from({ length: MOVING_BG_COUNT }, () => Math.floor(Math.max(Math.random() * 800, 400)));
}

function randomBGNewPos(width, height) {
  const slice = MOVING_BG_COUNT / 2;
  return Array.from({ length: MOVING_BG_COUNT }, (_, idx) =>
      idx < slice
          ? [Math.floor((Math.random() * width) / 2), Math.floor((Math.random() * height) / 2)]
          : [Math.floor(Math.random() * width), Math.floor(Math.random() * height)]
  );
}

function randomMoivingColors() {
  return Array.from({ length: MOVING_BG_COUNT }, () => bg_colors[Math.floor(Math.random() * bg_colors.length)]);
}

function randomStaticBGColors() {
  return Array.from({ length: SIZE }, () => {
    return Array.from({ length: SIZE }, () => bg_colors[Math.floor(Math.random() * bg_colors.length)]);
  });
}

let random_moving_bg_size = randomMovingBGSize();
let moving_colors = randomMoivingColors();
let positions = randomStaticBGColors();
let moving_positions = [];

function createStaticBG() {
  const staticBg = document.getElementById('static-bg');
  positions.forEach(row => {
    row.forEach(color => {
      const div = document.createElement('div');
      div.style.backgroundColor = color;
      staticBg.appendChild(div);
    });
  });
}

function createDynamicBubbles() {
  const dynamicBubbles = document.getElementById('dynamic-bubbles');
  moving_positions = randomBGNewPos(window.innerWidth, window.innerHeight);
  random_moving_bg_size = randomMovingBGSize();
  moving_colors = randomMoivingColors();

  moving_positions.forEach(([x, y], idx) => {
    const bubble = document.createElement('div');
    bubble.style.backgroundColor = moving_colors[idx];
    bubble.style.transform = `translate(${x}px, ${y}px)`;
    bubble.style.width = `${random_moving_bg_size[idx]}px`;
    bubble.style.height = `${random_moving_bg_size[idx]}px`;
    bubble.style.transition = `transform ${MOVE_DURATION_MS}ms ease-in-out, background-color 300ms ease-in-out`;
    bubble.classList.add('bubble');
    dynamicBubbles.appendChild(bubble);
  });
}

function updateBubblePositions() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  moving_positions = randomBGNewPos(width, height);
  const bubbles = document.querySelectorAll('.bubble');
  bubbles.forEach((bubble, idx) => {
    const [x, y] = moving_positions[idx];
    bubble.style.transform = `translate(${x}px, ${y}px)`;
  });
}

window.onload = () => {
  createStaticBG();
  createDynamicBubbles();
  setInterval(updateBubblePositions, MOVE_DURATION_MS - 1000);
};
