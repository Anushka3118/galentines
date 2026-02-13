// --------------------
// Floating hearts (background)
// --------------------
const heartsHost = document.querySelector(".hearts");

function spawnHeart(){
  const el = document.createElement("span");
  el.className = "heart";
  el.textContent = Math.random() < 0.5 ? "💗" : "✨";
  const left = Math.random() * 100;
  const size = 14 + Math.random() * 18;
  const dur = 6 + Math.random() * 7;
  const delay = Math.random() * 1.2;
  el.style.left = left + "vw";
  el.style.fontSize = size + "px";
  el.style.animationDuration = dur + "s";
  el.style.animationDelay = delay + "s";
  heartsHost.appendChild(el);
  setTimeout(() => el.remove(), (dur + delay) * 1000 + 200);
}

// inject animation CSS
const style = document.createElement("style");
style.textContent = `
.heart{
  position:absolute;
  bottom:-20px;
  opacity:.0;
  transform: translateY(0) scale(1);
  animation-name: floatUp;
  animation-timing-function: linear;
  animation-fill-mode: both;
  filter: drop-shadow(0 10px 20px rgba(0,0,0,.25));
}
@keyframes floatUp{
  0%{ opacity:0; transform: translateY(0) scale(.95); }
  10%{ opacity:.65; }
  100%{ opacity:0; transform: translateY(-120vh) scale(1.15); }
}
`;
document.head.appendChild(style);

setInterval(() => {
  if (document.visibilityState === "visible") spawnHeart();
}, 450);

// --------------------
// Messages + quotes
// --------------------
const msgs = [
  "Roommate officially upgraded to: soulmate bestie 💗",
  "You make this room feel like a whole safe universe 🫶",
  "Thanks for being my ‘ghar’ away from home 🎀",
  "If comfort had a face, it would be yours ✨",
  "We’re the kind of duo people secretly want 🌸"
];
const quotes = [
  "“You make this place feel like home.”",
  "“We didn’t just share a room, we shared a season of life.”",
  "“Best roommates become best memories.”",
  "“Soft hearts, strong friendship.”",
  "“You’re my favourite part of the day.”"
];

const surpriseBtn = document.getElementById("surpriseBtn");
const confettiBtn = document.getElementById("confettiBtn");
const bigConfetti = document.getElementById("bigConfetti");
const miniMsg = document.getElementById("miniMsg");
const quoteText = document.getElementById("quoteText");

function randomPick(arr){ return arr[Math.floor(Math.random() * arr.length)]; }

surpriseBtn.addEventListener("click", () => {
  miniMsg.textContent = randomPick(msgs);
  quoteText.textContent = randomPick(quotes);
  miniMsg.animate(
    [{transform:"translateY(0)", opacity: .7},{transform:"translateY(-2px)", opacity: 1}],
    {duration: 220}
  );
  popConfetti(160);
});

confettiBtn.addEventListener("click", () => popConfetti(240));
bigConfetti.addEventListener("click", () => popConfetti(420));

// --------------------
// NEW: Night Sky Mode toggle
// --------------------
const nightBtn = document.getElementById("nightBtn");
nightBtn.addEventListener("click", () => {
  document.body.classList.toggle("night");
  popConfetti(90);
});

// --------------------
// NEW: Voice Note (play/pause)
// --------------------
const voiceBtn = document.getElementById("voiceBtn");
const voiceAudio = document.getElementById("voiceAudio");
const voiceStatus = document.getElementById("voiceStatus");

function setVoiceUI(){
  if (!voiceAudio || !voiceBtn) return;
  if (voiceAudio.paused){
    voiceBtn.textContent = "Play Voice Note 🎤";
    voiceStatus.textContent = "";
  } else {
    voiceBtn.textContent = "Pause Voice Note ⏸";
    voiceStatus.textContent = "listening… (don’t cry, roomie) 🥹💗";
  }
}

voiceBtn.addEventListener("click", async () => {
  try{
    if (voiceAudio.paused){
      await voiceAudio.play();
      popConfetti(110);
    } else {
      voiceAudio.pause();
    }
    setVoiceUI();
  }catch(e){
    voiceStatus.textContent = "Voice note not found 😭 Add voice.mp3 in the same folder as index.html";
  }
});

voiceAudio.addEventListener("ended", setVoiceUI);
voiceAudio.addEventListener("pause", setVoiceUI);
voiceAudio.addEventListener("play", setVoiceUI);

// --------------------
// Footer date
// --------------------
const todayText = document.getElementById("todayText");
const d = new Date();
todayText.textContent = d.toLocaleDateString(undefined, {
  weekday:"long", year:"numeric", month:"long", day:"numeric"
});

// --------------------
// Lightbox (tap photo)
// --------------------
const lightbox = document.getElementById("lightbox");
const lbImg = document.getElementById("lbImg");
const lbCap = document.getElementById("lbCap");
const closeLb = document.getElementById("closeLb");

document.querySelectorAll(".ph").forEach(fig => {
  fig.addEventListener("click", () => {
    const img = fig.querySelector("img");
    const cap = fig.querySelector("figcaption");
    lbImg.src = img.src;
    lbCap.textContent = cap ? cap.textContent : "";
    lightbox.classList.add("show");
    lightbox.setAttribute("aria-hidden", "false");
  });
});

function closeLightbox(){
  lightbox.classList.remove("show");
  lightbox.setAttribute("aria-hidden", "true");
  lbImg.src = "";
}

closeLb.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => { if(e.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", (e) => { if(e.key === "Escape") closeLightbox(); });

// --------------------
// NEW: Quiz (multi-question)
// --------------------
const quiz = [
  {
    q: "Roommate signature activity kya hai? 😌",
    options: ["Late-night talks", "Random laughing fits", "Both, obviously"],
    correctIndex: 1,
    correctMsg: "Correct. Hum dono = comfort + chaos package 💗",
    wrongMsg: "Hehe nope. Correct answer is: Laughing fits 😭💗"
  },
  {
    q: "What’s our strongest skill together?",
    options: ["Cooking", "Overthinking", "Laughing at 2am"],
    correctIndex: 2,
    correctMsg: "YES. 2am laughter = our brand. ✨",
    wrongMsg: "Nice try… but the correct answer is 2am laughter 😭💗"
  },
  {
    q: "When one of us is stressed, what fixes it fastest?",
    options: ["A rant session", "Food", "Both (duh)"],
    correctIndex: 2,
    correctMsg: "Correct. Rant + food = therapy package 🫶",
    wrongMsg: "Wrong. It’s BOTH. Always both 😌"
  },
  {
    q: "Roommate status upgraded to…",
    options: ["Just roommates", "Besties", "Safe-place person 💗"],
    correctIndex: 2,
    correctMsg: "Aww. Yes. Safe-place person forever. 💗",
    wrongMsg: "Nope. She’s your safe-place person 💗"
  }
];

let qi = 0;
let answered = false;

const qText = document.getElementById("qText");
const qOptions = document.getElementById("qOptions");
const qResult = document.getElementById("qResult");
const nextQ = document.getElementById("nextQ");
const restartQ = document.getElementById("restartQ");
const quizProgress = document.getElementById("quizProgress");

function renderQuestion(){
  answered = false;
  const item = quiz[qi];
  quizProgress.textContent = `${qi + 1}/${quiz.length}`;
  qText.textContent = item.q;
  qResult.textContent = "";
  qOptions.innerHTML = "";

  item.options.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.className = "opt";
    btn.textContent = opt;
    btn.addEventListener("click", () => {
      if (answered) return;
      answered = true;

      const correct = idx === item.correctIndex;
      qResult.textContent = correct ? item.correctMsg : item.wrongMsg;

      popConfetti(correct ? 140 : 70);
    });
    qOptions.appendChild(btn);
  });
}

nextQ.addEventListener("click", () => {
  qi = (qi + 1) % quiz.length;
  renderQuestion();
});
restartQ.addEventListener("click", () => {
  qi = 0;
  renderQuestion();
  popConfetti(120);
});

renderQuestion();

// --------------------
// Confetti (canvas, no external libs)
// --------------------
const canvas = document.getElementById("confettiCanvas");
const ctx = canvas.getContext("2d");

function resize(){
  const dpr = Math.max(1, window.devicePixelRatio || 1);
  canvas.width = Math.floor(window.innerWidth * dpr);
  canvas.height = Math.floor(window.innerHeight * dpr);
  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";
  ctx.setTransform(dpr,0,0,dpr,0,0);
}
window.addEventListener("resize", resize);
resize();

let particles = [];
let raf = null;

function popConfetti(amount=200){
  const w = window.innerWidth;
  const h = window.innerHeight;

  const originX = w * (0.35 + Math.random() * 0.30);
  const originY = h * (0.18 + Math.random() * 0.10);

  for(let i=0;i<amount;i++){
    const p = {
      x: originX,
      y: originY,
      vx: (Math.random() - 0.5) * 10,
      vy: - (6 + Math.random() * 10),
      g: 0.18 + Math.random() * 0.12,
      r: 2 + Math.random() * 4,
      a: 1,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.25,
      life: 80 + Math.floor(Math.random() * 60),
      shape: Math.random() < 0.12 ? "heart" : "rect"
    };
    particles.push(p);
  }

  if(!raf) raf = requestAnimationFrame(tick);
}

function drawHeart(x,y,s){
  ctx.save();
  ctx.translate(x,y);
  ctx.scale(s,s);
  ctx.beginPath();
  ctx.moveTo(0, 0.3);
  ctx.bezierCurveTo(0, -0.2, -0.5, -0.2, -0.5, 0.2);
  ctx.bezierCurveTo(-0.5, 0.55, 0, 0.8, 0, 1.0);
  ctx.bezierCurveTo(0, 0.8, 0.5, 0.55, 0.5, 0.2);
  ctx.bezierCurveTo(0.5, -0.2, 0, -0.2, 0, 0.3);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function tick(){
  ctx.clearRect(0,0,window.innerWidth, window.innerHeight);

  particles = particles.filter(p => p.life > 0 && p.a > 0.02);

  for(const p of particles){
    p.life -= 1;
    p.x += p.vx;
    p.y += p.vy;
    p.vy += p.g;
    p.rot += p.vr;
    p.a *= 0.985;
    if(p.life < 25) p.a *= 0.96;

    ctx.globalAlpha = Math.min(1, p.a);

    const grad = ctx.createLinearGradient(p.x, p.y, p.x + 20, p.y + 20);
    grad.addColorStop(0, `rgba(255, 90, 165, ${ctx.globalAlpha})`);
    grad.addColorStop(1, `rgba(255, 209, 230, ${ctx.globalAlpha})`);
    ctx.fillStyle = grad;

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);

    if(p.shape === "heart"){
      drawHeart(0, 0, p.r * 0.55);
    }else{
      ctx.fillRect(-p.r, -p.r, p.r*2, p.r*2);
    }
    ctx.restore();
  }

  ctx.globalAlpha = 1;

  if(particles.length){
    raf = requestAnimationFrame(tick);
  }else{
    cancelAnimationFrame(raf);
    raf = null;
  }
}
