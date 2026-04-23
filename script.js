const btn = document.getElementById("openBtn");
const intro = document.getElementById("intro");
const invitation = document.getElementById("invitation");
const music = document.getElementById("music");

btn.addEventListener("click", () => {
    intro.style.display = "none";
    invitation.classList.remove("hidden");

    music.play();

    for (let i = 0; i < 30; i++) {
        createHeart();
    }
});

/* القلوب */
function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart-float");
    heart.innerHTML = "❤️";

    heart.style.left = Math.random() * 100 + "vw";

    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 4000);
}

/* العد التنازلي */
const targetDate = new Date("2026-06-28T22:30:00").getTime();

setInterval(() => {
    const now = new Date().getTime();
    const diff = targetDate - now;

    document.getElementById("days").innerText = Math.floor(diff / (1000*60*60*24));
    document.getElementById("hours").innerText = Math.floor((diff / (1000*60*60)) % 24);
    document.getElementById("minutes").innerText = Math.floor((diff / (1000*60)) % 60);
    document.getElementById("seconds").innerText = Math.floor((diff / 1000) % 60);
}, 1000);
