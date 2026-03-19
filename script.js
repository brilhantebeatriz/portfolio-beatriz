/* ========== INTRO SCREEN ========== */
(function () {
    var intro = document.getElementById('intro-screen');
    var canvas = document.getElementById('intro-particles');
    var ctx = canvas.getContext('2d');
    var particles = [];
    var W, H;

    function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
    resize();
    window.addEventListener('resize', resize);

    for (var i = 0; i < 80; i++) {
        particles.push({ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight, r: Math.random() * 2.5 + 0.5, dx: (Math.random() - 0.5) * 0.6, dy: (Math.random() - 0.5) * 0.6, alpha: Math.random() * 0.6 + 0.2 });
    }

    function drawIntroParticles() {
        ctx.clearRect(0, 0, W, H);
        particles.forEach(function (p) {
            ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255,45,120,' + p.alpha + ')'; ctx.fill();
            p.x += p.dx; p.y += p.dy;
            if (p.x < 0 || p.x > W) p.dx *= -1;
            if (p.y < 0 || p.y > H) p.dy *= -1;
        });
        if (!intro.classList.contains('hidden')) requestAnimationFrame(drawIntroParticles);
    }
    drawIntroParticles();

    document.body.style.overflow = 'hidden';
    setTimeout(function () {
        intro.classList.add('hidden');
        document.body.style.overflow = '';
    }, 4000);
})();

/* ========== PARTICLES BACKGROUND ========== */
(function () {
    var canvas = document.getElementById('particles-canvas');
    var ctx = canvas.getContext('2d');
    var pts = [];
    var W, H;

    function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
    resize();
    window.addEventListener('resize', resize);

    for (var i = 0; i < 50; i++) {
        pts.push({ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight, r: Math.random() * 1.6 + 0.4, dx: (Math.random() - 0.5) * 0.3, dy: (Math.random() - 0.5) * 0.3, alpha: Math.random() * 0.25 + 0.06 });
    }

    function drawBg() {
        ctx.clearRect(0, 0, W, H);
        for (var i = 0; i < pts.length; i++) {
            for (var j = i + 1; j < pts.length; j++) {
                var dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
                var dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 130) {
                    ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y);
                    ctx.strokeStyle = 'rgba(255,45,120,' + (0.07 * (1 - dist / 130)) + ')';
                    ctx.lineWidth = 0.7; ctx.stroke();
                }
            }
        }
        pts.forEach(function (p) {
            ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255,45,120,' + p.alpha + ')'; ctx.fill();
            p.x += p.dx; p.y += p.dy;
            if (p.x < 0 || p.x > W) p.dx *= -1;
            if (p.y < 0 || p.y > H) p.dy *= -1;
        });
        requestAnimationFrame(drawBg);
    }
    drawBg();
})();

/* ========== PARALLAX — ícones flutuantes no scroll ========== */
(function () {
    var icons = document.querySelectorAll('.float-icon');

    function onScroll() {
        var scrollY = window.scrollY;
        icons.forEach(function (el) {
            var speed = parseFloat(el.getAttribute('data-speed')) || 0.08;
            var baseTranslate = scrollY * speed;
            // Mantém a animação CSS de drift mas adiciona translação de scroll
            el.style.marginTop = baseTranslate + 'px';
        });

        // Parallax na foto de perfil
        var wrapper = document.querySelector('.foto-perfil-wrapper');
        if (wrapper) wrapper.style.transform = 'translateY(' + (scrollY * 0.10) + 'px)';
    }

    window.addEventListener('scroll', onScroll, { passive: true });
})();

/* ========== THEME TOGGLE ========== */
var toggleBtn = document.getElementById('theme-toggle');
var icon = document.getElementById('theme-icon');
toggleBtn.addEventListener('click', function () {
    var root = document.documentElement;
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    icon.className = next === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
});

/* ========== BACK TO TOP ========== */
var backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', function () {
    backToTop.classList.toggle('show', window.scrollY > 400);
});

/* ========== LIGHTBOX ========== */
var CERTS = {
    atend:   { imgs: ["atendimento.png"],                                alts: ["Atendimento ao Cliente"] },
    postura: { imgs: ["postura.png"],                                    alts: ["Postura Profissional"] },
    poo:     { imgs: ["POO.png"],                                        alts: ["Programação Orientada a Objetos"] },
    fu:      { imgs: ["fundamentos.png"],                                alts: ["Fundamentos de TI: Hardware e Software"] },
    huawei:  { imgs: ["huawei1.png"],                                    alts: ["Certificação Huawei"] },
    site:    { imgs: ["sitesimples.png"],                                alts: ["Desenvolvimento de Sites"] },
    ufc:     { imgs: ["certificado-frente.png", "certificado-verso.png"], alts: ["UFC — Frente", "UFC — Verso"] }
};
var lightbox = document.getElementById('lightbox');
var lbImg = document.getElementById('lightbox-img');
var lbClose = document.getElementById('lightbox-close');
var lbPrev = document.getElementById('lb-prev');
var lbNext = document.getElementById('lb-next');
var lbCounter = document.getElementById('lb-counter');
var lbImages = [], lbAlts = [], lbIndex = 0;

function showSlide(i) {
    lbIndex = i;
    lbImg.style.animation = 'none'; void lbImg.offsetHeight;
    lbImg.style.animation = 'lb-pop 0.25s cubic-bezier(.34,1.56,.64,1)';
    lbImg.src = lbImages[i]; lbImg.alt = lbAlts[i];
    var total = lbImages.length;
    lbPrev.classList.toggle('hidden', i === 0 || total === 1);
    lbNext.classList.toggle('hidden', i === total - 1 || total === 1);
    lbCounter.style.display = total > 1 ? 'block' : 'none';
    lbCounter.textContent = (i + 1) + ' / ' + total;
}
document.querySelectorAll('.card-cert').forEach(function (card) {
    card.addEventListener('click', function () {
        var cert = CERTS[card.getAttribute('data-key')];
        lbImages = cert.imgs; lbAlts = cert.alts;
        showSlide(0); lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});
lbPrev.addEventListener('click', function (e) { e.stopPropagation(); if (lbIndex > 0) showSlide(lbIndex - 1); });
lbNext.addEventListener('click', function (e) { e.stopPropagation(); if (lbIndex < lbImages.length - 1) showSlide(lbIndex + 1); });
function closeLightbox() {
    lightbox.classList.remove('active'); document.body.style.overflow = '';
    lbImg.src = ''; lbImages = []; lbAlts = []; lbIndex = 0;
}
lbClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight' && lbImages.length > 1) lbNext.click();
    if (e.key === 'ArrowLeft' && lbImages.length > 1) lbPrev.click();
});

/* ========== REVEAL ON SCROLL ========== */
var revealEls = document.querySelectorAll('.reveal');
function checkReveal() {
    var wh = window.innerHeight;
    revealEls.forEach(function (el) {
        if (el.getBoundingClientRect().top < wh - 80) el.classList.add('visible');
    });
}
window.addEventListener('load', function () { setTimeout(checkReveal, 150); });
window.addEventListener('scroll', checkReveal);