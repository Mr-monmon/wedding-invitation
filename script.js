/* ============================================================
   script.js — Wedding Invitation M & M
   ============================================================ */

// ===== ELEMENTS =====
const btn        = document.getElementById("openBtn");
const intro      = document.getElementById("intro");
const invitation = document.getElementById("invitation");
const music      = document.getElementById("music");

// ===== OPEN INVITATION =====
btn.addEventListener("click", () => {
    // أخفِ شاشة البداية
    intro.style.opacity = "0";
    intro.style.transition = "opacity 0.6s ease";
    setTimeout(() => {
        intro.style.display = "none";
    }, 600);

    // أظهر الدعوة
    invitation.classList.remove("hidden");

    // شغّل الموسيقى (مع handle للخطأ في بعض المتصفحات)
    music.volume = 0.5;
    music.play().catch(() => {
        // بعض المتصفحات تمنع الأوتوبلاي — لا مشكلة
    });

    // ورود متساقطة
    launchFlowers(35);
});

// ===== FLOWERS =====
const FLOWERS = ["🌸", "🌺", "🌹", "🌷", "✿", "❀"];

function launchFlowers(count) {
    for (let i = 0; i < count; i++) {
        setTimeout(() => createFlower(), i * 80);
    }
}

function createFlower() {
    const flower = document.createElement("div");
    flower.classList.add("flower");
    flower.innerHTML = FLOWERS[Math.floor(Math.random() * FLOWERS.length)];
    flower.style.left     = Math.random() * 100 + "vw";
    flower.style.bottom   = "-40px";
    flower.style.animationDuration = (3 + Math.random() * 3) + "s";
    flower.style.animationDelay   = (Math.random() * 0.5) + "s";
    flower.style.fontSize = (14 + Math.random() * 14) + "px";
    flower.style.opacity  = (0.6 + Math.random() * 0.4).toString();
    document.body.appendChild(flower);
    setTimeout(() => flower.remove(), 6500);
}

// ===== COUNTDOWN =====
// التاريخ المستهدف: ٢٨ يونيو ٢٠٢٦ — الساعة ١٠:٣٠ مساءً بتوقيت الأردن (UTC+3)
const targetDate = new Date("2026-06-28T22:30:00+03:00").getTime();

function pad(n) {
    return String(Math.max(0, Math.floor(n))).padStart(2, "0");
}

function updateCountdown() {
    const now  = Date.now();
    const diff = targetDate - now;

    if (diff <= 0) {
        document.getElementById("days").innerText    = "00";
        document.getElementById("hours").innerText   = "00";
        document.getElementById("minutes").innerText = "00";
        document.getElementById("seconds").innerText = "00";
        return;
    }

    document.getElementById("days").innerText    = pad(diff / (1000 * 60 * 60 * 24));
    document.getElementById("hours").innerText   = pad((diff / (1000 * 60 * 60)) % 24);
    document.getElementById("minutes").innerText = pad((diff / (1000 * 60)) % 60);
    document.getElementById("seconds").innerText = pad((diff / 1000) % 60);
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ===== PARTICLES CANVAS =====
(function initParticles() {
    const canvas = document.getElementById("particles");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let W, H, particles;

    function resize() {
        W = canvas.width  = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }

    function Particle() {
        this.x = Math.random() * W;
        this.y = Math.random() * H;
        this.r = 1 + Math.random() * 2;
        this.dx = (Math.random() - 0.5) * 0.3;
        this.dy = -0.2 - Math.random() * 0.4;
        this.alpha = 0.15 + Math.random() * 0.25;
    }

    Particle.prototype.update = function () {
        this.x += this.dx;
        this.y += this.dy;
        if (this.y < -4) this.y = H + 4;
        if (this.x < -4) this.x = W + 4;
        if (this.x > W + 4) this.x = -4;
    };

    function init() {
        resize();
        particles = Array.from({ length: 60 }, () => new Particle());
    }

    function draw() {
        ctx.clearRect(0, 0, W, H);
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(201,168,76,${p.alpha})`;
            ctx.fill();
            p.update();
        });
        requestAnimationFrame(draw);
    }

    window.addEventListener("resize", resize);
    init();
    draw();
})();
