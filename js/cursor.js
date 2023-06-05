if (!typeof window.orientation !== "undefined" || navigator.userAgent.indexOf("IEMobile") !== -1){
const cursor = document.getElementById("custom-cursor");
const cursorLittle = document.getElementById("little-cursor");
const magnetElements = document.querySelectorAll(".magnet-element");
const links = document.querySelectorAll("a");

const springStrength = 0.003;
const springFriction = 0.1;
const springSpeed = 0.5;

const scaleTarget = 0.5;
const scaleSpeed = 0.05;
const scaleStrength = 0.15;
const scaleFriction = 0.5;

const cursorSize = 50;
const cursorLittleSize = 5;

let cursorX = 0;
let cursorY = 0;
let actualX = 0;
let actualY = 0;
let velocityX = 0;
let velocityY = 0;
let scale = 1;
let scaleVelocity = 0;
let scaleSpring = 0;
let isHoveringLink = false;
let elementPosX = 0;
let elementPosY = 0;

window.addEventListener("mousemove", updateCursorPosition);

function updateCursorPosition(event) {
  cursorX = event.clientX;
  cursorY = event.clientY;
}

magnetElements.forEach((magnetElement) => {
  magnetElement.addEventListener("mouseenter", () => (isHoveringLink = true));
  magnetElement.addEventListener("mouseleave", () => {
    isHoveringLink = false;
    magnetElement.style.transform = "";
  });

  magnetElement.addEventListener("mousemove", (e) => {
    const elementPos = magnetElement.getBoundingClientRect();
    elementPosX = e.clientX - elementPos.x - elementPos.width / 2;
    elementPosY = e.clientY - elementPos.y - elementPos.height / 2;
    magnetElement.style.transform = `translate(${elementPosX}px, ${elementPosY}px)`;
  });
});

links.forEach((link) => {
  link.addEventListener("mouseenter", () => (isHoveringLink = true));
  link.addEventListener("mouseleave", () => (isHoveringLink = false));
});

function animateCursor() {
  const dx = cursorX - cursorSize / 2 - actualX - 1;
  const dy = cursorY - cursorSize / 2 - actualY - 1;

  const forceX = dx * springStrength;
  const forceY = dy * springStrength;

  velocityX += (forceX - velocityX * springFriction) * springSpeed;
  velocityY += (forceY - velocityY * springFriction) * springSpeed;

  actualX += velocityX;
  actualY += velocityY;

  cursor.style.transform = `translate(${Math.round(actualX)}px, ${Math.round(actualY)}px) scale(${Math.round(scale * 100) / 100})`;

  if (isHoveringLink) {
    const scaleDistance = scaleTarget - scale;
    scaleVelocity = scaleDistance * scaleSpeed;
    scaleSpring += scaleVelocity * scaleStrength;
    cursor.style.backgroundColor = "white";
    cursor.style.mixBlendMode = "difference";
    cursorLittle.style.display = "none";
  } else {
    const scaleDistance = 1 - scale;
    scaleVelocity = scaleDistance * scaleSpeed;
    scaleSpring += scaleVelocity * scaleStrength;
    cursor.style.backgroundColor = "transparent";
    cursor.style.mixBlendMode = "none";
    cursorLittle.style.display = "";
  }

  scale += scaleVelocity + scaleSpring;
  scaleVelocity *= scaleFriction;

  requestAnimationFrame(animateCursor);
}

function animateCursorLittle() {
  const targetX = cursorX - cursorLittleSize / 2;
  const targetY = cursorY - cursorLittleSize / 2;

  const startX = parseFloat(cursorLittle.style.left) || targetX;
  const startY = parseFloat(cursorLittle.style.top) || targetY;

  const dx = targetX - startX;
  const dy = targetY - startY;

  const newX = startX + dx;
  const newY = startY + dy;

  cursorLittle.style.transform = `translate(${newX}px, ${newY}px)`;

  requestAnimationFrame(animateCursorLittle);
}

animateCursorLittle();
animateCursor();
}