const btn = document.getElementById("openBtn");
const intro = document.getElementById("intro");
const invitation = document.getElementById("invitation");

btn.addEventListener("click", () => {

    // إخفاء البداية
    intro.style.display = "none";

    // إظهار الدعوة
    invitation.classList.remove("hidden");

    // قلوب متطايرة
    for (let i = 0; i < 30; i++) {
        createHeart();
    }
});

function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart-float");
    heart.innerHTML = "💛";

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = Math.random() * 20 + 15 + "px";

    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 4000);
}
