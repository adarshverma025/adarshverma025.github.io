const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

const moveNoButton = () => {
  const offset = 24;
  const maxX = Math.max(
    offset,
    window.innerWidth - noBtn.offsetWidth - offset
  );
  const maxY = Math.max(
    offset,
    window.innerHeight - noBtn.offsetHeight - offset
  );
  const x = Math.floor(offset + Math.random() * (maxX - offset));
  const y = Math.floor(offset + Math.random() * (maxY - offset));

  noBtn.style.position = "fixed";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
};

noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("focus", moveNoButton);
noBtn.addEventListener("click", moveNoButton);
noBtn.addEventListener("touchstart", moveNoButton, { passive: true });

yesBtn.addEventListener("click", () => {
  yesBtn.textContent = "Yay! Ankita, I love you";
  yesBtn.classList.add("btn--yes-active");
});

window.addEventListener("resize", () => {
  noBtn.style.position = "";
  noBtn.style.left = "";
  noBtn.style.top = "";
});
