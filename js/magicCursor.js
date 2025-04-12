// // cursor-effects.js (exportable version)

const start = new Date().getTime();
const originPosition = { x: 0, y: 0 };

const last = {
  starTimestamp: start,
  starPosition: originPosition,
  mousePosition: originPosition
};

const config = {
  starAnimationDuration: 1500,
  minimumTimeBetweenStars: 250,
  minimumDistanceBetweenStars: 75,
  glowDuration: 75,
  maximumGlowPointSpacing: 10,
  colors: ["94 59 238"],
  sizes: ["1.4rem", "1rem", "0.6rem"],
  animations: ["fall-1", "fall-2", "fall-3"]
};

let count = 0;
let animationActive = true;

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const selectRandom = items => items[rand(0, items.length - 1)];

const withUnit = (value, unit) => `${value}${unit}`;
const px = value => withUnit(value, "px");
const ms = value => withUnit(value, "ms");

const calcDistance = (a, b) => Math.hypot(b.x - a.x, b.y - a.y);
const calcElapsedTime = (start, end) => end - start;

const appendElement = el => document.body.appendChild(el);
const removeElement = (el, delay) => setTimeout(() => document.body.removeChild(el), delay);

const createStar = position => {
  if (!animationActive) return;

  const star = document.createElement("span");
  const color = selectRandom(config.colors);

  star.className = "star fa-solid fa-star";
  star.style.left = px(position.x);
  star.style.top = px(position.y);
  star.style.fontSize = selectRandom(config.sizes);
  star.style.color = `rgb(${color})`;
  star.style.textShadow = `0px 0px 1.5rem rgb(${color} / 0.5)`;
  star.style.animationName = config.animations[count++ % config.animations.length];
  star.style.animationDuration = ms(config.starAnimationDuration);
  star.style.position = "absolute";
  star.style.pointerEvents = "none";
  star.style.zIndex = "9999";

  appendElement(star);
  removeElement(star, config.starAnimationDuration);
};

const createGlowPoint = position => {
  if (!animationActive) return;

  const glow = document.createElement("div");
  glow.className = "glow-point";
  glow.style.left = px(position.x);
  glow.style.top = px(position.y);
  appendElement(glow);
  removeElement(glow, config.glowDuration);
};

const determinePointQuantity = distance => Math.max(
  Math.floor(distance / config.maximumGlowPointSpacing),
  1
);

const createGlow = (last, current) => {
  const distance = calcDistance(last, current);
  const quantity = determinePointQuantity(distance);
  const dx = (current.x - last.x) / quantity;
  const dy = (current.y - last.y) / quantity;

  for (let i = 0; i < quantity; i++) {
    const x = last.x + dx * i;
    const y = last.y + dy * i;
    createGlowPoint({ x, y });
  }
};

const updateLastStar = position => {
  last.starTimestamp = new Date().getTime();
  last.starPosition = position;
};

const updateLastMousePosition = position => {
  last.mousePosition = position;
};

const adjustLastMousePosition = position => {
  if (last.mousePosition.x === 0 && last.mousePosition.y === 0) {
    last.mousePosition = position;
  }
};

const isInsideElement = (element, x, y) => {
  const rect = element.getBoundingClientRect();
  return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
};

const handleOnMove = e => {
  const scrollX = window.scrollX;
  const scrollY = window.scrollY;

  const mousePosition = {
    x: e.clientX + scrollX,
    y: e.clientY + scrollY
  };

  adjustLastMousePosition(mousePosition);

  const now = new Date().getTime();
  const hasMovedFarEnough = calcDistance(last.starPosition, mousePosition) >= config.minimumDistanceBetweenStars;
  const hasBeenLongEnough = calcElapsedTime(last.starTimestamp, now) > config.minimumTimeBetweenStars;

  // === Проверка: находится ли мышка над header или footer ===
  const header = document.querySelector("header");
  const footer = document.querySelector("footer");
  const isOverHeader = header && isInsideElement(header, e.clientX, e.clientY);
  const isOverFooter = footer && isInsideElement(footer, e.clientX, e.clientY);

  animationActive = !(isOverHeader || isOverFooter);

  if ((hasMovedFarEnough || hasBeenLongEnough) && animationActive) {
    createStar(mousePosition);
    updateLastStar(mousePosition);
  }

  createGlow(last.mousePosition, mousePosition);
  updateLastMousePosition(mousePosition);
};

export function initCursorEffects() {
  window.addEventListener("mousemove", handleOnMove);
  window.addEventListener("touchmove", e => handleOnMove(e.touches[0]));
  document.body.addEventListener("mouseleave", () => updateLastMousePosition(originPosition));
}


