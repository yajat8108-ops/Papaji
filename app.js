// Main Application Logic for Papaji's Birthday Celebration

// Global State Variables
let isCandlesBlown = false;
let isCakeCut = false;
let isAudioPlaying = false;
let ytPlayer = null;
let currentDialogueAudio = null;

// Photo Gallery Data with personalized captions and themes
const galleryPhotos = [
  {
    src: "College.jpeg",
    title: "The OG College Hero",
    tag: "vintage",
    desc: "Papaji in his college days! Pure vintage Bollywood hero swag — the look that set the benchmark for the whole family!"
  },
  {
    src: "dadiyal papa.jpeg",
    title: "Dadiyal Papaji Swag",
    tag: "candid",
    desc: "The royal beard look! Nobody carries confidence, class and king-size personality like you do, Papaji."
  },
  {
    src: "GOAA prince,king nd queen.jpeg",
    title: "Goa: King, Queen & Prince",
    tag: "trips",
    desc: "The ultimate Goa vacation! King Papaji, Queen Mummy and the Prince taking over the beaches. Unforgettable memories!"
  },
  {
    src: "us in ajanta elora caver.jpeg",
    title: "Ajanta & Ellora Exploration",
    tag: "trips",
    desc: "Historic rock-cut caves with the most rock-solid man in our lives. Exploring wonder after wonder together."
  },
  {
    src: "jalian walan bag.jpeg",
    title: "Jallianwala Bagh Tribute",
    tag: "trips",
    desc: "A moment of history and pride. Papaji always making sure we understand our roots and value our history."
  },
  {
    src: "redission ki photo in my birthday.jpeg",
    title: "Radisson Birthday Celebration",
    tag: "family",
    desc: "Every single birthday of mine, Papaji went above and beyond to make me feel like royalty. Today is YOUR turn!"
  },
  {
    src: "us in car.jpeg",
    title: "Road Trips & Long Drives",
    tag: "trips",
    desc: "The best conversations, old songs on the stereo, and Papaji on the steering wheel. Safe, happy, and carefree."
  },
  {
    src: "papa in chaddi.jpeg",
    title: "Candid Sunday Comfort Mode",
    tag: "candid",
    desc: "The most iconic photo in existence! 🩳🛋️ No tension, no formalities — pure Sunday chilling at home!"
  },
  {
    src: "img 10.jpeg",
    title: "Pure Happiness & Smiles",
    tag: "family",
    desc: "That smile of yours lights up the whole house. May this year give you a million more reasons to smile!"
  },
  {
    src: "img 13.jpeg",
    title: "Family First, Always",
    tag: "family",
    desc: "Through thick and thin, Papaji has stood as an impenetrable shield and guiding light for all of us."
  },
  {
    src: "img 15.jpeg",
    title: "Priceless Moments",
    tag: "family",
    desc: "The warmth, the laughs, the little everyday blessings that we treasure more than anything in the world."
  },
  {
    src: "img 16.jpeg",
    title: "The Pillar of Strength",
    tag: "vintage",
    desc: "A quiet hero who sacrifices everything behind the scenes without asking for anything in return."
  },
  {
    src: "img 17.jpeg",
    title: "Cherished Times",
    tag: "family",
    desc: "Another snapshot of pure love. Every photograph tells a story of your boundless dedication."
  },
  {
    src: "img 8.jpeg",
    title: "Dignity & Grace",
    tag: "candid",
    desc: "Always calm, always wise, and always leading by example with integrity and a big generous heart."
  },
  {
    src: "img5.jpeg",
    title: "Forever Our Inspiration",
    tag: "family",
    desc: "Watching you work hard every single day is the biggest masterclass in perseverance anyone could ask for."
  },
  {
    src: "img7.jpeg",
    title: "Celebrating Papaji",
    tag: "vintage",
    desc: "To the man who gave us wings to fly and the ground to stand firm. We love you endlessly!"
  }
];

// Theme Switcher (Sky Blue Light Mode as Default, with Dark Mode Option)
function toggleTheme() {
  const body = document.body;
  const isDark = body.classList.toggle('dark');
  const btn = document.getElementById('theme-toggle-btn');
  if (btn) {
    btn.innerHTML = isDark ? "☀️ Sky Blue Mode" : "🌙 Night Sky";
  }
  if (window.soundFx) window.soundFx.pop();
}

// Cake Cutting & Slicing Feature
function cutCake() {
  const container = document.getElementById('cake-container') || document.querySelector('.cake-container');
  const knife = document.getElementById('cake-knife');
  const actionBtn = document.getElementById('cake-cut-btn');
  if (!knife || !container) return;

  // Toggle back if already cut
  if (isCakeCut) {
    container.classList.remove('cake-sliced');
    isCakeCut = false;
    if (window.soundFx) window.soundFx.pop();
    if (actionBtn) {
      actionBtn.innerHTML = "<span>🎂</span> Cut Birthday Cake!";
      actionBtn.classList.remove('bg-emerald-600', 'from-emerald-500', 'to-emerald-600');
    }
    return;
  }

  // Animate knife slicing down through both tiers
  knife.classList.remove('slicing');
  knife.offsetHeight; /* trigger reflow */
  knife.classList.add('slicing');
  if (window.soundFx) window.soundFx.correct();

  setTimeout(() => {
    knife.classList.remove('slicing');
    container.classList.add('cake-sliced');
    isCakeCut = true;

    if (window.soundFx) {
      window.soundFx.cheer();
    }
    if (window.confetti) {
      window.confetti({
        particleCount: 150,
        spread: 90,
        origin: { x: 0.65, y: 0.6 }
      });
      setTimeout(() => {
        window.confetti({ particleCount: 70, spread: 60, origin: { x: 0.7, y: 0.55 } });
      }, 250);
    }

    if (actionBtn) {
      actionBtn.innerHTML = "<span>🍰</span> Sliced for Papaji! (Click to Put Back)";
      actionBtn.classList.add('from-emerald-500', 'to-emerald-600');
    }

    // Auto blow candles if they are still burning!
    if (!isCandlesBlown) {
      blowCandles(false);
    }
  }, 650);
}

// Papaji's Soundboard Voice (High-Fidelity Indian Male Hindi AI Voice)
function playDialogue(index, dialogueText, authorTitle) {
  if (window.soundFx) window.soundFx.pop();

  const bubble = document.getElementById('soundboard-bubble');
  const bubbleText = document.getElementById('soundboard-quote');
  const bubbleTitle = document.getElementById('soundboard-title');

  if (bubble && bubbleText) {
    bubbleText.textContent = `"${dialogueText}"`;
    if (bubbleTitle) bubbleTitle.textContent = `— ${authorTitle}`;
    bubble.classList.remove('hidden');
    bubble.classList.add('animate-bounce');
    setTimeout(() => bubble.classList.remove('animate-bounce'), 1000);
  }

  // Play the authentic Indian Hindi male neural voice audio file
  try {
    if (currentDialogueAudio) {
      currentDialogueAudio.pause();
      currentDialogueAudio.currentTime = 0;
    }
    const audioSrc = `audio_dialogue_${index}.mp3`;
    currentDialogueAudio = new Audio(audioSrc);
    currentDialogueAudio.play().catch(() => {
      // Fallback to Web Speech API if audio playback blocked
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(dialogueText);
        utterance.rate = 0.95;
        const voices = window.speechSynthesis.getVoices();
        const maleVoice = voices.find(v => (v.lang.includes('hi') || v.lang.includes('IN')) && (v.name.includes('Male') || v.name.includes('Madhur') || v.name.includes('David') || v.name.includes('Ravi')));
        if (maleVoice) utterance.voice = maleVoice;
        window.speechSynthesis.speak(utterance);
      }
    });
  } catch(e) {}
}

// YouTube Audio Controller for "Happy Birthday To U Ji" - Krsna Solo / Mimi Teddy
function onYouTubeIframeAPIReady() {
  ytPlayer = new YT.Player('yt-audio-player', {
    height: '0',
    width: '0',
    videoId: 'K2aJTT29ZdU',
    playerVars: {
      autoplay: 0,
      loop: 1,
      playlist: 'K2aJTT29ZdU',
      playsinline: 1
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange
    }
  });
}

function onPlayerReady(event) {
  const toggleBtn = document.getElementById('audio-toggle-btn');
  if (toggleBtn) toggleBtn.disabled = false;
}

function onPlayerStateChange(event) {
  const bar = document.getElementById('audio-player-bar');
  if (event.data === YT.PlayerState.PLAYING) {
    isAudioPlaying = true;
    bar?.classList.remove('paused');
    updateAudioBtnIcon(true);
  } else {
    isAudioPlaying = false;
    bar?.classList.add('paused');
    updateAudioBtnIcon(false);
  }
}

function toggleAudio() {
  if (ytPlayer && ytPlayer.playVideo) {
    try {
      const state = ytPlayer.getPlayerState();
      if (state === YT.PlayerState.PLAYING) {
        ytPlayer.pauseVideo();
      } else {
        ytPlayer.playVideo();
      }
      return;
    } catch(e) {}
  }

  // Fallback Web Audio Happy Birthday Melody if YouTube unavailable
  toggleSynthMelody();
}

let synthTimer = null;
function toggleSynthMelody() {
  const bar = document.getElementById('audio-player-bar');
  if (isAudioPlaying) {
    isAudioPlaying = false;
    clearTimeout(synthTimer);
    bar?.classList.add('paused');
    updateAudioBtnIcon(false);
  } else {
    isAudioPlaying = true;
    bar?.classList.remove('paused');
    updateAudioBtnIcon(true);
    playSynthHappyBirthday();
  }
}

function updateAudioBtnIcon(isPlaying) {
  const text = document.getElementById('audio-status-text');
  const btn = document.getElementById('audio-toggle-btn');
  if (text) text.textContent = isPlaying ? "Happy Birthday To U Ji" : "Click to Play Song";
  if (btn) btn.innerHTML = isPlaying ? "⏸️" : "▶️";
}

// 8-bit Synth Melody Fallback
function playSynthHappyBirthday() {
  if (!isAudioPlaying) return;
  const notes = [
    { f: 261.63, d: 0.35 }, { f: 261.63, d: 0.15 }, { f: 293.66, d: 0.5 }, { f: 261.63, d: 0.5 }, { f: 349.23, d: 0.5 }, { f: 329.63, d: 1.0 },
    { f: 261.63, d: 0.35 }, { f: 261.63, d: 0.15 }, { f: 293.66, d: 0.5 }, { f: 261.63, d: 0.5 }, { f: 392.00, d: 0.5 }, { f: 349.23, d: 1.0 },
    { f: 261.63, d: 0.35 }, { f: 261.63, d: 0.15 }, { f: 523.25, d: 0.5 }, { f: 440.00, d: 0.5 }, { f: 349.23, d: 0.5 }, { f: 329.63, d: 0.5 }, { f: 293.66, d: 0.8 },
    { f: 466.16, d: 0.35 }, { f: 466.16, d: 0.15 }, { f: 440.00, d: 0.5 }, { f: 349.23, d: 0.5 }, { f: 392.00, d: 0.5 }, { f: 349.23, d: 1.2 }
  ];

  let curTime = 0;
  notes.forEach(n => {
    synthTimer = setTimeout(() => {
      if (isAudioPlaying && window.soundFx) {
        window.soundFx.playTone(n.f, 'triangle', n.d * 0.9, 0.12);
      }
    }, curTime * 1000);
    curTime += n.d;
  });

  synthTimer = setTimeout(() => {
    if (isAudioPlaying) playSynthHappyBirthday();
  }, (curTime + 0.5) * 1000);
}

// Cake Candle Blow & Relight Action
function blowCandles(allowToggle = true) {
  const cakeContainer = document.getElementById('cake-container') || document.querySelector('.cake-container');
  const actionBtn = document.getElementById('cake-action-btn');
  const flames = document.querySelectorAll('.flame');
  const smokes = document.querySelectorAll('.smoke');
  const numCandles = document.querySelectorAll('.num-candle');

  // If already blown and user clicks to relight
  if (isCandlesBlown && allowToggle) {
    flames.forEach(f => {
      f.classList.remove('extinguished');
      f.style.display = 'block';
      f.style.opacity = '1';
    });
    smokes.forEach(s => s.style.display = 'none');
    numCandles.forEach(c => c.classList.remove('candle-unlit'));
    isCandlesBlown = false;

    if (actionBtn) actionBtn.innerHTML = "<span>💨</span> Blow 43 Candles!";
    if (window.soundFx) window.soundFx.pop();
    return;
  }

  // Puff animation on the cake
  if (cakeContainer) {
    cakeContainer.classList.add('blowing');
    setTimeout(() => cakeContainer.classList.remove('blowing'), 600);
  }

  // Extinguish the flames smoothly
  flames.forEach(f => {
    f.classList.add('extinguished');
    f.style.opacity = '0';
  });

  // Darken candles & show charred wick ember
  numCandles.forEach(c => c.classList.add('candle-unlit'));

  // Trigger smoke wisps rising
  smokes.forEach(s => {
    s.style.display = 'block';
    s.style.animation = 'none';
    s.offsetHeight; /* trigger reflow */
    s.style.animation = 'smokeRise 1.5s forwards ease-out';
  });

  isCandlesBlown = true;
  if (actionBtn) actionBtn.innerHTML = "<span>✨</span> Relight 43 Candles";

  if (window.soundFx) {
    window.soundFx.cheer();
  }

  // Mega Confetti Burst
  if (window.confetti) {
    window.confetti({
      particleCount: 160,
      spread: 100,
      origin: { y: 0.6 }
    });
    setTimeout(() => {
      window.confetti({ particleCount: 80, angle: 60, spread: 60, origin: { x: 0 } });
      window.confetti({ particleCount: 80, angle: 120, spread: 60, origin: { x: 1 } });
    }, 400);
  }

  // Auto trigger song
  if (!isAudioPlaying) {
    toggleAudio();
  }
}

// Wax Seal Letter Opening
let isLetterOpened = false;
function openLetter() {
  const seal = document.getElementById('wax-seal');
  const envelopePreview = document.getElementById('envelope-cover');
  const letterBody = document.getElementById('letter-content');

  if (isLetterOpened) return;
  isLetterOpened = true;

  if (window.soundFx) window.soundFx.correct();

  seal.style.transform = "scale(0.7) rotate(45deg)";
  seal.style.opacity = "0";
  seal.style.transition = "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)";

  setTimeout(() => {
    envelopePreview.style.display = "none";
    letterBody.classList.remove('hidden');
    letterBody.style.opacity = "0";
    letterBody.style.transform = "translateY(20px)";
    setTimeout(() => {
      letterBody.style.transition = "all 0.7s ease-out";
      letterBody.style.opacity = "1";
      letterBody.style.transform = "translateY(0)";
    }, 50);

    if (window.confetti) {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
    }
  }, 400);
}

// Photo Gallery Rendering & Filtering
function renderGallery(filter = 'all') {
  const container = document.getElementById('gallery-grid');
  if (!container) return;

  const filtered = filter === 'all' 
    ? galleryPhotos 
    : galleryPhotos.filter(p => p.tag === filter);

  // Rotation angles for playful polaroid look
  const angles = [-3, 2.5, -2, 3, -1.5, 2, -2.5, 1.8];

  container.innerHTML = filtered.map((photo, i) => {
    const rot = angles[i % angles.length];
    const realIndex = galleryPhotos.indexOf(photo);
    return `
      <div class="polaroid-card" style="--rot: ${rot}deg;" onclick="openLightbox(${realIndex})">
        <div class="polaroid-tape"></div>
        <img class="polaroid-img" src="${encodeURI(photo.src)}" alt="${photo.title}" loading="lazy">
        <div class="polaroid-caption">${photo.title}</div>
        <p class="text-xs text-slate-500 text-center font-sans mt-1 line-clamp-1">${photo.desc}</p>
      </div>
    `;
  }).join('');
}

function filterGallery(tag, btnEl) {
  document.querySelectorAll('.gallery-tab-btn').forEach(btn => {
    btn.classList.remove('bg-amber-500', 'text-slate-950');
    btn.classList.add('bg-slate-800', 'text-slate-300');
  });
  btnEl.classList.remove('bg-slate-800', 'text-slate-300');
  btnEl.classList.add('bg-amber-500', 'text-slate-950');
  renderGallery(tag);
}

// Lightbox modal logic
function openLightbox(index) {
  currentLightboxIdx = index;
  const modal = document.getElementById('gallery-lightbox');
  const img = document.getElementById('lightbox-img');
  const title = document.getElementById('lightbox-title');
  const desc = document.getElementById('lightbox-desc');
  const count = document.getElementById('lightbox-counter');

  const photo = galleryPhotos[index];
  img.src = encodeURI(photo.src);
  title.textContent = photo.title;
  desc.textContent = photo.desc;
  count.textContent = `${index + 1} / ${galleryPhotos.length}`;

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('gallery-lightbox').classList.add('hidden');
  document.body.style.overflow = 'auto';
}

function navLightbox(direction) {
  let next = currentLightboxIdx + direction;
  if (next < 0) next = galleryPhotos.length - 1;
  if (next >= galleryPhotos.length) next = 0;
  openLightbox(next);
}

// Keyboard navigation for lightbox
window.addEventListener('keydown', (e) => {
  const modal = document.getElementById('gallery-lightbox');
  if (!modal || modal.classList.contains('hidden')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') navLightbox(-1);
  if (e.key === 'ArrowRight') navLightbox(1);
});

// Floating Poppable Balloons
function spawnBalloons() {
  const container = document.getElementById('balloon-container');
  if (!container) return;

  const colors = [
    '#f59e0b', '#ef4444', '#ec4899', '#8b5cf6', '#3b82f6', '#10b981', '#fbbf24'
  ];

  for (let i = 0; i < 9; i++) {
    const balloon = document.createElement('div');
    balloon.className = 'floating-balloon';
    balloon.style.left = `${5 + Math.random() * 90}%`;
    balloon.style.backgroundColor = colors[i % colors.length];
    balloon.style.animationDelay = `${Math.random() * 12}s`;
    balloon.style.animationDuration = `${12 + Math.random() * 8}s`;

    balloon.addEventListener('click', (e) => {
      e.stopPropagation();
      if (window.soundFx) window.soundFx.pop();
      if (window.confetti) {
        const rect = balloon.getBoundingClientRect();
        window.confetti({
          particleCount: 25,
          startVelocity: 15,
          origin: {
            x: (rect.left + rect.width / 2) / window.innerWidth,
            y: (rect.top + rect.height / 2) / window.innerHeight
          }
        });
      }
      balloon.remove();
      // Respawn after delay
      setTimeout(() => spawnBalloons(), 3000);
    });

    container.appendChild(balloon);
  }
}

// Certificate Printing
function printCertificate() {
  if (window.soundFx) window.soundFx.cheer();
  if (window.confetti) {
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
  }
  window.print();
}

// Switch Mini-Game Tab
function switchGameTab(tabName, btnEl) {
  document.querySelectorAll('.game-nav-btn').forEach(btn => {
    btn.classList.remove('bg-amber-500', 'text-slate-950');
    btn.classList.add('bg-slate-800', 'text-slate-300');
  });
  btnEl.classList.remove('bg-slate-800', 'text-slate-300');
  btnEl.classList.add('bg-amber-500', 'text-slate-950');

  ['quiz-pane', 'catch-pane', 'memory-pane', 'wheel-pane'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.add('hidden');
  });

  const activePane = document.getElementById(`${tabName}-pane`);
  if (activePane) activePane.classList.remove('hidden');

  if (tabName === 'catch' && window.arcadeGame && !window.arcadeGame.isRunning) {
    // Ready for start
  }
}

// Secret Easter Egg Trigger Logic (Typing "papa", "papaji", or "43")
let typedBuffer = "";
window.addEventListener('keydown', (e) => {
  // If typing in an input or textarea, ignore
  if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

  typedBuffer += e.key.toLowerCase();
  if (typedBuffer.length > 20) {
    typedBuffer = typedBuffer.slice(-20);
  }

  if (
    typedBuffer.endsWith("papa") || 
    typedBuffer.endsWith("papaji") || 
    typedBuffer.endsWith("43") ||
    typedBuffer.endsWith("amit")
  ) {
    typedBuffer = "";
    triggerPapaEasterEgg();
  }
});

function triggerPapaEasterEgg() {
  if (window.soundFx) {
    window.soundFx.cheer();
    setTimeout(() => window.soundFx.cheer(), 400);
  }

  // Mega continuous fireworks confetti
  if (window.confetti) {
    const end = Date.now() + 3500;
    const colors = ['#fbbf24', '#f59e0b', '#ef4444', '#10b981', '#3b82f6'];

    (function frame() {
      window.confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      window.confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  }

  // Display Easter Egg Modal
  const modal = document.getElementById('easter-egg-modal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }

  // Start music if not started
  if (!isAudioPlaying) {
    toggleAudio();
  }
}

function closeEasterEgg() {
  const modal = document.getElementById('easter-egg-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

// Grand Celebrate Banner Trigger (When clicking "Celebrate!" button)
function triggerGrandCelebrateBanner() {
  if (window.soundFx) {
    window.soundFx.cheer();
    setTimeout(() => window.soundFx.cheer(), 350);
  }

  // Mega celebratory confetti blast
  if (window.confetti) {
    window.confetti({ particleCount: 160, spread: 100, origin: { y: 0.5 } });
    setTimeout(() => {
      window.confetti({ particleCount: 100, spread: 70, origin: { x: 0.1, y: 0.6 } });
      window.confetti({ particleCount: 100, spread: 70, origin: { x: 0.9, y: 0.6 } });
    }, 300);
  }

  const modal = document.getElementById('grand-celebrate-modal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }

  // Start background song if not yet playing
  if (!isAudioPlaying) {
    toggleAudio();
  }
}

function closeGrandCelebrateBanner() {
  const modal = document.getElementById('grand-celebrate-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

// Endless Typewriter Engine (Type -> Pause -> Erase -> Next Phrase -> Repeat)
const typingPhrases = [
  { line1: "HAPPY 43rd BIRTHDAY", line2: "PAPAJI!", icon: "👑" },
  { line1: "THE WORLD'S BEST DAD", line2: "PAPAJI!", icon: "❤️" },
  { line1: "19 SAAL KA SACRIFICE & HERO", line2: "PAPAJI!", icon: "🎖️" },
  { line1: "LEVEL 43 UNLOCKED", line2: "MOTALLE PAPA!", icon: "🎂" }
];

let phraseIdx = 0;
let typingTimer = null;
let currentLoopId = 0;

function runEndlessTypewriter() {
  clearTimeout(typingTimer);
  currentLoopId++;
  const thisLoop = currentLoopId;

  const el1 = document.getElementById('typed-line-1');
  const el2 = document.getElementById('typed-line-2');
  const crown = document.getElementById('typed-crown');
  const cursor = document.getElementById('typing-cursor');

  if (!el1 || !el2) return;

  // Always reset content cleanly to prevent duplication
  el1.textContent = "";
  el2.textContent = "";

  const phrase = typingPhrases[phraseIdx % typingPhrases.length];
  const l1 = phrase.line1;
  const l2 = phrase.line2;
  const ico = phrase.icon;

  if (crown) {
    crown.textContent = ico;
    crown.style.transform = "scale(0)";
    crown.style.transition = "transform 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
  }
  if (cursor) cursor.style.display = "inline-block";

  // Phase 1: Type Line 1
  let i = 0;
  function typeL1() {
    if (thisLoop !== currentLoopId) return;
    if (i < l1.length) {
      el1.textContent = l1.slice(0, i + 1);
      i++;
      typingTimer = setTimeout(typeL1, 55);
    } else {
      typingTimer = setTimeout(startLine2, 180);
    }
  }

  // Phase 2: Type Line 2
  let j = 0;
  function startLine2() {
    if (thisLoop !== currentLoopId) return;
    function typeL2() {
      if (thisLoop !== currentLoopId) return;
      if (j < l2.length) {
        el2.textContent = l2.slice(0, j + 1);
        j++;
        typingTimer = setTimeout(typeL2, 75);
      } else {
        // Climax: Pop crown
        if (crown) crown.style.transform = "scale(1)";
        if (window.soundFx) window.soundFx.pop();
        // Pause to let Papaji enjoy the phrase before erasing
        typingTimer = setTimeout(eraseLine2, 2800);
      }
    }
    typeL2();
  }

  // Phase 3: Erase Line 2 Backwards
  function eraseLine2() {
    if (thisLoop !== currentLoopId) return;
    if (crown) crown.style.transform = "scale(0)";
    if (el2.textContent.length > 0) {
      el2.textContent = el2.textContent.slice(0, -1);
      typingTimer = setTimeout(eraseLine2, 35);
    } else {
      typingTimer = setTimeout(eraseLine1, 100);
    }
  }

  // Phase 4: Erase Line 1 Backwards
  function eraseLine1() {
    if (thisLoop !== currentLoopId) return;
    if (el1.textContent.length > 0) {
      el1.textContent = el1.textContent.slice(0, -1);
      typingTimer = setTimeout(eraseLine1, 30);
    } else {
      // Advance to next phrase and loop endlessly!
      phraseIdx++;
      typingTimer = setTimeout(runEndlessTypewriter, 350);
    }
  }

  typeL1();
}

function replayTyping() {
  clearTimeout(typingTimer);
  const el1 = document.getElementById('typed-line-1');
  const el2 = document.getElementById('typed-line-2');
  if (el1) el1.textContent = "";
  if (el2) el2.textContent = "";
  phraseIdx = 0;
  runEndlessTypewriter();
}

// Initialize on load
window.addEventListener('DOMContentLoaded', () => {
  renderGallery('all');
  spawnBalloons();
  runEndlessTypewriter();

  // Set today's date on certificate
  const certDate = document.getElementById('cert-today-date');
  if (certDate) {
    const today = new Date();
    certDate.textContent = today.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  // Load YouTube Iframe API Script
  const tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  const firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
});
