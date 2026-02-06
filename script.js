const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");
const ourSong = document.getElementById("ourSong");

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
  yesBtn.textContent = "Yay! Baby, I love you";
  yesBtn.classList.add("btn--yes-active");
  if (ourSong) {
    ourSong.play().catch(() => {});
  }
});

window.addEventListener("resize", () => {
  noBtn.style.position = "";
  noBtn.style.left = "";
  noBtn.style.top = "";
});

document.querySelectorAll(".timeline-photo").forEach((img) => {
  img.addEventListener("click", () => {
    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt;
    lightbox.classList.add("lightbox--open");
    lightbox.setAttribute("aria-hidden", "false");
  });
});

const closeLightbox = () => {
  lightbox.classList.remove("lightbox--open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
};

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeLightbox();
  }
});
