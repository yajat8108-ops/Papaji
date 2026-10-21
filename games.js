// Papa's Birthday Mini-Games Logic (Quiz, Catch Game, Memory Match, Wheel)

// Sound Effects Synthesizer (Zero External Dependencies)
const soundFx = {
  ctx: null,
  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
  },
  playTone(freq, type = 'sine', duration = 0.15, gainVal = 0.1) {
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch(e) {}
  },
  correct() {
    this.playTone(523.25, 'triangle', 0.12, 0.15);
    setTimeout(() => this.playTone(659.25, 'triangle', 0.15, 0.15), 100);
    setTimeout(() => this.playTone(783.99, 'triangle', 0.25, 0.2), 200);
  },
  wrong() {
    this.playTone(250, 'sawtooth', 0.2, 0.15);
    setTimeout(() => this.playTone(200, 'sawtooth', 0.3, 0.15), 150);
  },
  pop() {
    this.playTone(600 + Math.random() * 400, 'sine', 0.08, 0.18);
  },
  cheer() {
    [400, 500, 600, 750, 900].forEach((freq, idx) => {
      setTimeout(() => this.playTone(freq, 'triangle', 0.2, 0.12), idx * 80);
    });
  },
  tick() {
    this.playTone(900, 'square', 0.03, 0.05);
  }
};

/* ==========================================
   GAME 1: PAPAJI'S WISDOM & BANTER TRIVIA
   ========================================== */
const quizData = [
  {
    q: "Papaji ki sabse legendary aur immortal line konsi hai?",
    options: [
      "Padegi sir pai toh hagega ghar pai! 😂",
      "Paisa ped pe ugta hai kya?",
      "Kamre ki battiyan kisne khuli chhodi?",
      "Subah 5 baje utho sab theek ho jayega"
    ],
    correct: 0,
    remark: "SAHI JAWAB! Papaji ka universal gyaan: 'Padegi sir pai toh hagega ghar pai!' Iska koi tod nahi hai! 🏆"
  },
  {
    q: "Aaj ke din Papaji ka sabse accurate official title kya hai?",
    options: [
      "Sirf ek aam insaan",
      "Humaare pyare Motalle Papa jo aaj ek saal aur budde ho gaye! 🎂😂",
      "World's strictest principal",
      "Olympic champion in sleeping"
    ],
    correct: 1,
    remark: "BINGO! Motalle Papa ek saal aur budde ho gaye par swag wahi 18 saal wala hai! 💥"
  },
  {
    q: "Pichhle 19 saal se Papaji ne humare liye sabse badi sacrifice kya ki?",
    options: [
      "Apni neend, aaram aur khwahishen bina bole humpe nichhawar kardi ❤️",
      "Apna TV remote hume de diya",
      "Apni chai thandi hone di",
      "Car ki aage wali seat hume di"
    ],
    correct: 0,
    remark: "DIL SE JAWAB: 19 saal me unke har sacrifice, hard work aur unconditional love ki wajah se hi hum yahan hain! Love you Papaji! ❤️"
  },
  {
    q: "Sunday ko Papaji ka most iconic aur relax avatar konsa hota hai?",
    options: [
      "Three-piece formal suit me",
      "Gym wear me 20km jog",
      "Candid 'Papa in chaddi' sofa pe relax mode! 🩳🛋️",
      "Subah se shaam kitchen me chef"
    ],
    correct: 2,
    remark: "Hahaha 100% TRUE! Chaddi me relax karte Papaji se zyada sukoon duniya me kahi nahi! 🛋️✨"
  },
  {
    q: "Goa trip ki photo me King, Queen aur Prince kon the?",
    options: [
      "Random tourist log",
      "Papaji (The King), Mummy (The Queen) & Me (The Prince)! 👑",
      "Goa ke locals",
      "Hotel ke staff"
    ],
    correct: 1,
    remark: "PERFECT! The Royal Family: King Papaji, Queen Mummy and the Prince on Goa tour! 🏖️👑"
  }
];

let currentQuizIdx = 0;
let quizScore = 0;

function initQuiz() {
  currentQuizIdx = 0;
  quizScore = 0;
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const container = document.getElementById('quiz-box');
  if (!container) return;

  if (currentQuizIdx >= quizData.length) {
    // Quiz finished
    soundFx.cheer();
    if (window.confetti) {
      window.confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
    container.innerHTML = `
      <div class="text-center py-6">
        <div class="text-6xl mb-4">🏆</div>
        <h3 class="text-3xl font-black text-sky-950 dark:text-amber-400 mb-2">Quiz Champion!</h3>
        <p class="text-xl text-sky-900 dark:text-slate-200 mb-4 font-bold">Score: <span class="font-extrabold text-amber-600 dark:text-amber-400">${quizScore} / ${quizData.length}</span></p>
        <div class="bg-amber-50 dark:bg-amber-500/10 border-2 border-amber-300 dark:border-amber-500/30 rounded-2xl p-5 mb-6 text-sky-950 dark:text-slate-200 max-w-lg mx-auto font-medium">
          ${quizScore === 5 ? 
            "🔥 <strong>Outstanding!</strong> Aap Papaji ke certified No.1 fan ho! Papaji ke har dialogue aur ada ka full gyaan hai aapko!" : 
            "✨ <strong>Kamaal kar diya!</strong> Papaji ki sabhi baatein aur 19 saal ka pyaar hamesha dil me taza hai!"}
        </div>
        <button onclick="initQuiz()" class="px-8 py-3.5 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-400 text-white font-extrabold rounded-xl transition shadow-lg shadow-sky-500/30">
          Play Again 🔄
        </button>
      </div>
    `;
    return;
  }

  const qObj = quizData[currentQuizIdx];
  container.innerHTML = `
    <div class="mb-4 flex items-center justify-between text-sm text-sky-800 dark:text-slate-400 border-b border-sky-200 dark:border-slate-700/60 pb-3">
      <span class="font-extrabold text-amber-600 dark:text-amber-400">Question ${currentQuizIdx + 1} of ${quizData.length}</span>
      <span class="bg-sky-100 dark:bg-slate-800 border border-sky-300 dark:border-slate-700 px-3 py-1 rounded-full text-sky-950 dark:text-slate-200 font-bold">Score: ${quizScore}</span>
    </div>
    <h3 class="text-xl md:text-2xl font-black text-sky-950 dark:text-white mb-6 leading-snug">${qObj.q}</h3>
    <div class="space-y-3 mb-6" id="quiz-options-group">
      ${qObj.options.map((opt, i) => `
        <button onclick="handleQuizAnswer(${i})" class="quiz-btn w-full text-left p-4 rounded-xl bg-white dark:bg-slate-800/90 hover:bg-sky-50 dark:hover:bg-slate-700/80 border-2 border-sky-200 dark:border-slate-700 hover:border-amber-400 text-sky-950 dark:text-slate-100 font-semibold transition flex items-center gap-3.5 shadow-sm">
          <span class="w-8 h-8 rounded-full bg-sky-100 dark:bg-slate-700 text-sky-900 dark:text-amber-400 font-black flex items-center justify-center text-sm shrink-0 border border-sky-300 dark:border-slate-600">${String.fromCharCode(65 + i)}</span>
          <span class="leading-snug">${opt}</span>
        </button>
      `).join('')}
    </div>
    <div id="quiz-feedback" class="hidden rounded-xl p-4 text-sm font-medium"></div>
  `;
}

function handleQuizAnswer(selectedIdx) {
  const qObj = quizData[currentQuizIdx];
  const buttons = document.querySelectorAll('#quiz-options-group button');
  const feedback = document.getElementById('quiz-feedback');
  buttons.forEach(btn => btn.disabled = true);

  if (selectedIdx === qObj.correct) {
    quizScore++;
    soundFx.correct();
    buttons[selectedIdx].classList.remove('bg-white', 'dark:bg-slate-800/90', 'border-sky-200', 'dark:border-slate-700');
    buttons[selectedIdx].classList.add('bg-emerald-100', 'dark:bg-emerald-600/30', 'border-emerald-500', 'text-emerald-950', 'dark:text-emerald-300');
    feedback.className = 'rounded-xl p-4 text-sm font-bold bg-emerald-100 dark:bg-emerald-500/20 text-emerald-950 dark:text-emerald-300 border-2 border-emerald-400 dark:border-emerald-500/40 mb-4';
    feedback.innerHTML = `✅ ${qObj.remark}`;
  } else {
    soundFx.wrong();
    buttons[selectedIdx].classList.remove('bg-white', 'dark:bg-slate-800/90', 'border-sky-200', 'dark:border-slate-700');
    buttons[selectedIdx].classList.add('bg-rose-100', 'dark:bg-rose-600/30', 'border-rose-500', 'text-rose-950', 'dark:text-rose-300');
    buttons[qObj.correct].classList.remove('bg-white', 'dark:bg-slate-800/90', 'border-sky-200', 'dark:border-slate-700');
    buttons[qObj.correct].classList.add('bg-emerald-100', 'dark:bg-emerald-600/30', 'border-emerald-500', 'text-emerald-950', 'dark:text-emerald-300');
    feedback.className = 'rounded-xl p-4 text-sm font-bold bg-amber-100 dark:bg-amber-500/20 text-amber-950 dark:text-amber-300 border-2 border-amber-400 dark:border-amber-500/40 mb-4';
    feedback.innerHTML = `💡 Sahi jawab: <strong>${qObj.options[qObj.correct]}</strong><br>${qObj.remark}`;
  }
  feedback.classList.remove('hidden');

  setTimeout(() => {
    currentQuizIdx++;
    renderQuizQuestion();
  }, 2200);
}


/* ==========================================
   GAME 2: CATCH PAPAJI'S FAVORITES (ARCADE)
   ========================================== */
class CatchGame {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.isRunning = false;
    this.score = 0;
    this.lives = 3;
    this.items = [];
    this.spawnTimer = 0;
    this.basket = {
      x: 180,
      y: 350,
      width: 80,
      height: 36,
      speed: 7
    };
    this.keys = { left: false, right: false };

    this.goodTypes = [
      { char: '☕', name: 'Chai', points: 10 },
      { char: '📺', name: 'Remote', points: 15 },
      { char: '🥨', name: 'Jalebi', points: 10 },
      { char: '🚗', name: 'Car Keys', points: 20 },
      { char: '❤️', name: 'Pyar', points: 25 }
    ];

    this.badTypes = [
      { char: '⏰', name: 'Early Alarm', points: -1, damage: true },
      { char: '📞', name: 'Boss Call', points: -1, damage: true },
      { char: '🍩', name: 'Extra Belly Fat', points: -1, damage: true }
    ];

    this.initEvents();
  }

  initEvents() {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') this.keys.left = true;
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') this.keys.right = true;
    });
    window.addEventListener('keyup', (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') this.keys.left = false;
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') this.keys.right = false;
    });

    // Touch & Mouse Movement on Canvas
    const handleMove = (clientX) => {
      const rect = this.canvas.getBoundingClientRect();
      const scaleX = this.canvas.width / rect.width;
      const targetX = (clientX - rect.left) * scaleX - (this.basket.width / 2);
      this.basket.x = Math.max(0, Math.min(this.canvas.width - this.basket.width, targetX));
    };

    this.canvas.addEventListener('mousemove', (e) => {
      if (this.isRunning) handleMove(e.clientX);
    });

    this.canvas.addEventListener('touchstart', (e) => {
      if (this.isRunning && e.touches.length > 0) {
        handleMove(e.touches[0].clientX);
      }
    }, { passive: true });

    this.canvas.addEventListener('touchmove', (e) => {
      if (this.isRunning && e.touches.length > 0) {
        e.preventDefault();
        handleMove(e.touches[0].clientX);
      }
    }, { passive: false });

    // Mobile On-Screen Direction Buttons
    const btnLeft = document.getElementById('btn-touch-left');
    const btnRight = document.getElementById('btn-touch-right');
    if (btnLeft) {
      btnLeft.addEventListener('touchstart', (e) => { e.preventDefault(); this.keys.left = true; }, { passive: false });
      btnLeft.addEventListener('touchend', (e) => { e.preventDefault(); this.keys.left = false; }, { passive: false });
      btnLeft.addEventListener('mousedown', () => { this.keys.left = true; });
      btnLeft.addEventListener('mouseup', () => { this.keys.left = false; });
      btnLeft.addEventListener('mouseleave', () => { this.keys.left = false; });
    }
    if (btnRight) {
      btnRight.addEventListener('touchstart', (e) => { e.preventDefault(); this.keys.right = true; }, { passive: false });
      btnRight.addEventListener('touchend', (e) => { e.preventDefault(); this.keys.right = false; }, { passive: false });
      btnRight.addEventListener('mousedown', () => { this.keys.right = true; });
      btnRight.addEventListener('mouseup', () => { this.keys.right = false; });
      btnRight.addEventListener('mouseleave', () => { this.keys.right = false; });
    }
  }

  start() {
    this.score = 0;
    this.lives = 3;
    this.items = [];
    this.isRunning = true;
    this.basket.x = (this.canvas.width - this.basket.width) / 2;
    this.basket.y = this.canvas.height - 45;
    document.getElementById('catch-game-overlay')?.classList.add('hidden');
    this.updateHUD();
    soundFx.pop();
    this.loop();
  }

  stop() {
    this.isRunning = false;
    soundFx.wrong();
    const overlay = document.getElementById('catch-game-overlay');
    if (overlay) {
      overlay.innerHTML = `
        <div class="text-center p-6 bg-slate-900/95 border border-amber-500/40 rounded-2xl max-w-sm mx-auto shadow-2xl">
          <div class="text-5xl mb-3">🎮</div>
          <h4 class="text-2xl font-black text-amber-400 mb-1">Game Over!</h4>
          <p class="text-slate-300 mb-2">Papaji's Score: <span class="text-2xl font-bold text-amber-400">${this.score}</span></p>
          <p class="text-xs text-slate-400 mb-5">"Alarm clock aur boss se bachte raho, chai peete raho!" ☕</p>
          <button onclick="window.arcadeGame.start()" class="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl transition shadow-lg shadow-amber-500/30">
            Play Again 🔄
          </button>
        </div>
      `;
      overlay.classList.remove('hidden');
    }
  }

  updateHUD() {
    const scoreEl = document.getElementById('catch-score');
    const livesEl = document.getElementById('catch-lives');
    if (scoreEl) scoreEl.textContent = this.score;
    if (livesEl) livesEl.textContent = '❤️'.repeat(Math.max(0, this.lives));
  }

  spawnItem() {
    const isBad = Math.random() < 0.3;
    const pool = isBad ? this.badTypes : this.goodTypes;
    const type = pool[Math.floor(Math.random() * pool.length)];
    this.items.push({
      x: Math.random() * (this.canvas.width - 40) + 15,
      y: -20,
      speed: 2.2 + Math.random() * 2.2 + (this.score / 150),
      ...type
    });
  }

  loop() {
    if (!this.isRunning) return;

    // Movement
    if (this.keys.left) this.basket.x = Math.max(0, this.basket.x - this.basket.speed);
    if (this.keys.right) this.basket.x = Math.min(this.canvas.width - this.basket.width, this.basket.x + this.basket.speed);

    // Spawning
    this.spawnTimer++;
    if (this.spawnTimer > 40) {
      this.spawnItem();
      this.spawnTimer = 0;
    }

    // Clear Canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw Basket (Papaji's Sofa Cushion / Hand Tray)
    this.ctx.fillStyle = '#f59e0b';
    this.ctx.shadowColor = '#f59e0b';
    this.ctx.shadowBlur = 10;
    this.ctx.beginPath();
    this.ctx.roundRect(this.basket.x, this.basket.y, this.basket.width, this.basket.height, 10);
    this.ctx.fill();
    this.ctx.shadowBlur = 0;

    // Basket Label
    this.ctx.fillStyle = '#0f172a';
    this.ctx.font = 'bold 12px Outfit, sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.fillText("PAPAJI 👑", this.basket.x + (this.basket.width / 2), this.basket.y + 22);

    // Update & Draw Items
    this.ctx.font = '24px sans-serif';
    this.ctx.textAlign = 'center';

    for (let i = this.items.length - 1; i >= 0; i--) {
      const it = this.items[i];
      it.y += it.speed;

      this.ctx.fillText(it.char, it.x, it.y);

      // Collision Check
      if (
        it.y >= this.basket.y - 10 &&
        it.y <= this.basket.y + this.basket.height &&
        it.x >= this.basket.x - 10 &&
        it.x <= this.basket.x + this.basket.width + 10
      ) {
        if (it.damage) {
          soundFx.wrong();
          this.lives--;
          this.updateHUD();
          if (this.lives <= 0) {
            this.stop();
            return;
          }
        } else {
          soundFx.pop();
          this.score += it.points;
          this.updateHUD();
        }
        this.items.splice(i, 1);
        continue;
      }

      // Fell through bottom
      if (it.y > this.canvas.height + 30) {
        this.items.splice(i, 1);
      }
    }

    requestAnimationFrame(() => this.loop());
  }
}


/* ==========================================
   GAME 3: PAPAJI'S MEMORY MATCH CARDS
   ========================================== */
const memoryCardsList = [
  { id: 1, img: 'College.jpeg', title: 'College Days' },
  { id: 2, img: 'dadiyal papa.jpeg', title: 'Bearded Papa' },
  { id: 3, img: 'GOAA prince,king nd queen.jpeg', title: 'Goa Kings' },
  { id: 4, img: 'us in ajanta elora caver.jpeg', title: 'Ajanta Ellora' },
  { id: 5, img: 'jalian walan bag.jpeg', title: 'Jallianwala' },
  { id: 6, img: 'redission ki photo in my birthday.jpeg', title: 'Radisson Party' }
];

let memoryCards = [];
let flippedCards = [];
let matchedCount = 0;
let isLockBoard = false;
let memoryMoves = 0;

function initMemoryGame() {
  const grid = document.getElementById('memory-grid');
  if (!grid) return;

  // Duplicate cards for pairs and shuffle
  memoryCards = [...memoryCardsList, ...memoryCardsList].map((card, idx) => ({
    ...card,
    uid: idx
  }));

  // Fisher-Yates shuffle
  for (let i = memoryCards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [memoryCards[i], memoryCards[j]] = [memoryCards[j], memoryCards[i]];
  }

  flippedCards = [];
  matchedCount = 0;
  isLockBoard = false;
  memoryMoves = 0;

  const movesEl = document.getElementById('memory-moves');
  if (movesEl) movesEl.textContent = '0';

  grid.innerHTML = memoryCards.map((card, index) => `
    <div class="memory-card" data-index="${index}" onclick="handleCardClick(${index})">
      <div class="memory-card-inner">
        <div class="memory-card-back">
          <span>👑</span>
        </div>
        <div class="memory-card-front">
          <img src="${encodeURI(card.img)}" alt="${card.title}">
        </div>
      </div>
    </div>
  `).join('');
}

function handleCardClick(index) {
  if (isLockBoard) return;
  const cardEl = document.querySelector(`.memory-card[data-index="${index}"]`);
  if (!cardEl || cardEl.classList.contains('flipped') || cardEl.classList.contains('matched')) return;

  soundFx.pop();
  cardEl.classList.add('flipped');
  flippedCards.push({ index, data: memoryCards[index], el: cardEl });

  if (flippedCards.length === 2) {
    memoryMoves++;
    const movesEl = document.getElementById('memory-moves');
    if (movesEl) movesEl.textContent = memoryMoves;

    isLockBoard = true;
    const [c1, c2] = flippedCards;

    if (c1.data.id === c2.data.id) {
      soundFx.correct();
      c1.el.classList.add('matched');
      c2.el.classList.add('matched');
      matchedCount++;
      flippedCards = [];
      isLockBoard = false;

      if (matchedCount === memoryCardsList.length) {
        setTimeout(() => {
          soundFx.cheer();
          if (window.confetti) {
            window.confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 } });
          }
          alert(`🎉 Congratulations Papaji! Aapne saari yaadein sirf ${memoryMoves} moves me match kardi! Ekdum sharp dimag!`);
        }, 500);
      }
    } else {
      setTimeout(() => {
        c1.el.classList.remove('flipped');
        c2.el.classList.remove('flipped');
        flippedCards = [];
        isLockBoard = false;
      }, 900);
    }
  }
}


/* ==========================================
   GAME 4: SPIN THE WHEEL OF PRIVILEGES
   ========================================== */
const wheelSlices = [
  { icon: "📺", title: "TV Remote", sub: "24-Hr Power", color: "#f59e0b" },
  { icon: "☕", title: "VIP Chai", sub: "Served In Bed", color: "#ef4444" },
  { icon: "👑", title: "Zero Scolding", sub: "Full Freedom", color: "#8b5cf6" },
  { icon: "💆", title: "Head Champi", sub: "30-Min Champi", color: "#10b981" },
  { icon: "🍽️", title: "Dream Feast", sub: "Son Cooks Dinner", color: "#06b6d4" },
  { icon: "🧹", title: "Room Clean", sub: "Without Asking", color: "#ec4899" }
];

let wheelAngle = 0;
let isSpinningWheel = false;

function drawWheel() {
  const canvas = document.getElementById('wheel-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const numSlices = wheelSlices.length;
  const arc = (2 * Math.PI) / numSlices;
  const radius = canvas.width / 2;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw Segments
  wheelSlices.forEach((slice, i) => {
    const angle = i * arc;
    ctx.beginPath();
    ctx.fillStyle = slice.color;
    ctx.moveTo(radius, radius);
    ctx.arc(radius, radius, radius - 6, angle, angle + arc);
    ctx.lineTo(radius, radius);
    ctx.fill();

    // Segment divider line
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Text & Icon on slice (positioned safely outside center hub)
    ctx.save();
    ctx.translate(radius, radius);
    ctx.rotate(angle + arc / 2);

    // Emoji icon near outer edge
    ctx.font = '22px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(slice.icon, radius - 30, 8);

    // Title text
    ctx.font = 'bold 13px Outfit, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = 'rgba(0,0,0,0.85)';
    ctx.shadowBlur = 5;
    ctx.fillText(slice.title, radius - 75, 2);

    // Subtitle text
    ctx.font = '600 10px Outfit, sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.92)';
    ctx.fillText(slice.sub, radius - 75, 17);

    ctx.restore();
  });

  // Center Golden Hub (prevents any center collision)
  ctx.save();
  ctx.beginPath();
  ctx.arc(radius, radius, 48, 0, 2 * Math.PI);
  const hubGrad = ctx.createRadialGradient(radius - 10, radius - 10, 5, radius, radius, 48);
  hubGrad.addColorStop(0, '#fef08a');
  hubGrad.addColorStop(0.5, '#f59e0b');
  hubGrad.addColorStop(1, '#78350f');
  ctx.fillStyle = hubGrad;
  ctx.shadowColor = 'rgba(0,0,0,0.6)';
  ctx.shadowBlur = 12;
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#fff';
  ctx.stroke();

  // Center Text
  ctx.font = 'bold 13px Outfit, sans-serif';
  ctx.fillStyle = '#1e1b4b';
  ctx.textAlign = 'center';
  ctx.shadowColor = 'transparent';
  ctx.fillText("👑 PAPAJI", radius, radius - 4);
  ctx.font = '800 10px Outfit, sans-serif';
  ctx.fillStyle = '#78350f';
  ctx.fillText("SPIN", radius, radius + 11);
  ctx.restore();
}

function spinWheel() {
  if (isSpinningWheel) return;
  isSpinningWheel = true;
  soundFx.pop();

  const extraSpins = 5 + Math.floor(Math.random() * 4);
  const randomSlice = Math.floor(Math.random() * wheelSlices.length);
  const sliceArc = 360 / wheelSlices.length;
  // Calculate destination angle matching the top pointer
  const targetDeg = (extraSpins * 360) + (360 - (randomSlice * sliceArc) - (sliceArc / 2));
  wheelAngle += targetDeg;

  const canvas = document.getElementById('wheel-canvas');
  if (canvas) {
    canvas.style.transform = `rotate(${wheelAngle}deg)`;
  }

  // Ticking sound during spin
  let tickInterval = setInterval(() => soundFx.tick(), 150);

  setTimeout(() => {
    clearInterval(tickInterval);
    isSpinningWheel = false;
    soundFx.cheer();
    if (window.confetti) {
      window.confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
    }

    const wonSlice = wheelSlices[randomSlice];
    const resultBox = document.getElementById('wheel-result');
    if (resultBox) {
      resultBox.innerHTML = `
        <div class="p-4 bg-amber-100 dark:bg-amber-500/20 border-2 border-amber-400 dark:border-amber-500/50 rounded-2xl text-center shadow-lg">
          <span class="text-xs uppercase tracking-wider text-amber-800 dark:text-amber-300 font-extrabold block mb-1">Papaji Won Coupon:</span>
          <p class="text-2xl font-black text-sky-950 dark:text-white">${wonSlice.icon} ${wonSlice.title}</p>
          <p class="text-xs text-amber-900 dark:text-amber-200 mt-1 font-bold">${wonSlice.sub}</p>
          <p class="text-[11px] text-sky-800 dark:text-slate-300 mt-2 font-semibold">🎉 Valid starting right now! Son is on duty!</p>
        </div>
      `;
    }
  }, 4500);
}

// Global Initialization
window.addEventListener('DOMContentLoaded', () => {
  initQuiz();
  initMemoryGame();
  drawWheel();
  window.arcadeGame = new CatchGame('catch-canvas');
});
