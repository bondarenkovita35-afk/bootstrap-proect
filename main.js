// year
document.getElementById("year").textContent = new Date().getFullYear();

// demo form handler
const form = document.getElementById("bookingForm");
const statusEl = document.getElementById("formStatus");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const fd = new FormData(form);
  const name = (fd.get("name") || "").toString().trim();
  statusEl.textContent = `Спасибо, ${name || "ваша заявка"}! (Демо) Мы свяжемся с вами скоро.`;
  form.reset();
});

// Stars canvas (lightweight)
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d", { alpha: true });

let w, h, dpr;
let stars = [];

function resize(){
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  w = canvas.width = Math.floor(window.innerWidth * dpr);
  h = canvas.height = Math.floor(window.innerHeight * dpr);
  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";

  // rebuild stars
  const count = Math.floor((window.innerWidth * window.innerHeight) / 14000);
  stars = Array.from({ length: Math.max(80, count) }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: (Math.random() * 1.4 + 0.2) * dpr,
    a: Math.random() * 0.6 + 0.25,
    vx: (Math.random() - 0.5) * 0.08 * dpr,
    vy: (Math.random() - 0.5) * 0.08 * dpr,
    tw: Math.random() * 0.015 + 0.003
  }));
}
window.addEventListener("resize", resize);
resize();

function draw(){
  ctx.clearRect(0,0,w,h);

  // subtle nebula haze
  const g = ctx.createRadialGradient(w*0.25, h*0.2, 0, w*0.25, h*0.2, Math.max(w,h)*0.55);
  g.addColorStop(0, "rgba(184,30,109,0.10)");
  g.addColorStop(0.5, "rgba(247,211,123,0.06)");
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0,0,w,h);

  for(const s of stars){
    s.x += s.vx; s.y += s.vy;
    if(s.x < -20) s.x = w + 20;
    if(s.x > w + 20) s.x = -20;
    if(s.y < -20) s.y = h + 20;
    if(s.y > h + 20) s.y = -20;

    s.a += Math.sin((s.x + s.y) * 0.002) * s.tw;

    ctx.beginPath();
    ctx.fillStyle = `rgba(255,255,255,${Math.max(0.08, Math.min(0.85, s.a))})`;
    ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
    ctx.fill();
  }

  requestAnimationFrame(draw);
}
draw();
