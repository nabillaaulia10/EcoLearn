// ─── DATA ───────────────────────────────────────────────────
const BINS = [
  { id: 'organik', label: 'Organik', icon: '🟤', color: '#388e3c' },
  { id: 'anorganik', label: 'Anorganik', icon: '🔵', color: '#1565c0' },
  { id: 'b3', label: 'B3 ☢️', icon: '🔴', color: '#c62828' },
  { id: 'daur-ulang', label: 'Daur Ulang', icon: '♻️', color: '#e65100' },
];

const ITEMS = [
  { emoji: '🍌', label: 'Kulit pisang', bin: 'organik' },
  { emoji: '🥬', label: 'Sisa sayuran', bin: 'organik' },
  { emoji: '🍃', label: 'Daun kering', bin: 'organik' },
  { emoji: '☕', label: 'Ampas kopi', bin: 'organik' },
  { emoji: '🍚', label: 'Nasi sisa', bin: 'organik' },
  { emoji: '🧴', label: 'Botol plastik', bin: 'anorganik' },
  { emoji: '👜', label: 'Kantong plastik', bin: 'anorganik' },
  { emoji: '🧩', label: 'Mainan plastik', bin: 'anorganik' },
  { emoji: '👟', label: 'Sepatu lama', bin: 'anorganik' },
  { emoji: '🔋', label: 'Baterai bekas', bin: 'b3' },
  { emoji: '💡', label: 'Lampu neon', bin: 'b3' },
  { emoji: '🧪', label: 'Botol kimia', bin: 'b3' },
  { emoji: '💊', label: 'Obat kedaluwarsa', bin: 'b3' },
  { emoji: '📄', label: 'Kertas koran', bin: 'daur-ulang' },
  { emoji: '📦', label: 'Kardus bekas', bin: 'daur-ulang' },
  { emoji: '🥫', label: 'Kaleng minuman', bin: 'daur-ulang' },
  { emoji: '🍾', label: 'Botol kaca', bin: 'daur-ulang' },
  { emoji: '🖨️', label: 'Kertas bekas', bin: 'daur-ulang' },
];

// ─── STATE ──────────────────────────────────────────────────
let skor = 0,
  benar = 0,
  salah = 0;
let totalItems = 0,
  dipilah = 0;
let draggedItem = null;
let feedbackTimer = null;
let hintTersisa = 9;
const binCounts = {};

const MOBILE_BREAKPOINT = 768;
function isMobileView() {
  return window.innerWidth <= MOBILE_BREAKPOINT;
}

let itemQueue = [];

// ─── INTRO MODAL ──────────────────────────────────────────
const introOverlay = document.getElementById('intro-overlay');
document.getElementById('btn-mulai-dd').addEventListener('click', () => {
  introOverlay.classList.remove('show');
});
window.addEventListener('load', () => {
  introOverlay.classList.add('show');
});

// ─── HINT LOGIC ───────────────────────────────────────────
function updateHintUI() {
  const btn = document.getElementById('btn-hint');
  document.getElementById('hint-count').textContent = hintTersisa;
  const itemsLeft = document.querySelectorAll('.trash-item').length;
  btn.disabled = hintTersisa <= 0 || itemsLeft === 0;
}

document.getElementById('btn-hint').addEventListener('click', () => {
  const itemsLeft = document.querySelectorAll('.trash-item');
  if (hintTersisa <= 0 || itemsLeft.length === 0) return;

  hintTersisa--;
  updateHintUI();

  const targetEl = itemsLeft[Math.floor(Math.random() * itemsLeft.length)];
  const correctBinId = targetEl.dataset.bin;
  const label = targetEl.dataset.label;
  const binLabel = BINS.find((b) => b.id === correctBinId)?.label;

  document
    .querySelectorAll('.trash-item')
    .forEach((el) => el.classList.remove('hint-target'));
  document
    .querySelectorAll('.trash-bin')
    .forEach((el) => el.classList.remove('hint-glow'));

  targetEl.classList.add('hint-target');
  const binEl = document.querySelector(
    `.trash-bin[data-bin="${correctBinId}"]`,
  );
  if (binEl) binEl.classList.add('hint-glow');

  const msgBox = document.getElementById('hint-message');
  msgBox.innerHTML = `💡 <strong>Petunjuk:</strong> "${label}" seharusnya masuk ke tong <strong>${binLabel}</strong> (lihat yang berkedip).`;
  msgBox.classList.add('show');

  setTimeout(() => {
    targetEl.classList.remove('hint-target');
    if (binEl) binEl.classList.remove('hint-glow');
  }, 4000);
});

// ─── BUILD UI ───────────────────────────────────────────────
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildBins() {
  const row = document.getElementById('bins-row');
  row.innerHTML = '';
  BINS.forEach((b) => {
    binCounts[b.id] = 0;
    const div = document.createElement('div');
    div.className = 'trash-bin';
    div.dataset.bin = b.id;
    div.innerHTML = `
          <div class="bin-count" id="count-${b.id}">0</div>
          <div class="bin-icon">${b.icon}</div>
          <div class="bin-label">${b.label}</div>`;

    // Desktop drag events
    div.addEventListener('dragover', (e) => {
      e.preventDefault();
      div.classList.add('dragover');
    });
    div.addEventListener('dragleave', () => div.classList.remove('dragover'));
    div.addEventListener('drop', (e) => {
      e.preventDefault();
      div.classList.remove('dragover');
      handleDrop(b.id);
    });

    // Mobile touch target
    div.addEventListener('touchend', (e) => {
      e.preventDefault();
      handleDrop(b.id);
    });

    row.appendChild(div);
  });
}

function buildItems() {
  const pool = document.getElementById('items-pool');
  pool.innerHTML = '';

  const shuffled = shuffle(ITEMS);
  totalItems = shuffled.length;
  dipilah = 0;
  updateProgress();

  if (isMobileView()) {
    // Mobile: render terbatas 4 slot, sisanya antri
    itemQueue = [...shuffled];
    for (let i = 0; i < MOBILE_SLOT && itemQueue.length > 0; i++) {
      renderNextItem(pool);
    }
  } else {
    // Desktop: render semua item sekaligus, tidak pakai antrian
    itemQueue = [];
    shuffled.forEach((item) => renderItemEl(pool, item));
  }

  updateHintUI();
}

const MOBILE_SLOT = 4;

function renderItemEl(pool, item) {
  const el = document.createElement('div');
  el.className = 'trash-item';
  el.draggable = true;
  el.dataset.bin = item.bin;
  el.dataset.label = item.label;
  el.innerHTML = `${item.emoji} ${item.label}`;

  el.addEventListener('dragstart', () => {
    draggedItem = el;
    setTimeout(() => el.classList.add('dragging'), 0);
  });
  el.addEventListener('dragend', () => {
    el.classList.remove('dragging');
    draggedItem = null;
  });

  el.addEventListener('touchstart', onTouchStart, { passive: true });
  el.addEventListener('touchmove', onTouchMove, { passive: false });
  el.addEventListener('touchend', onTouchEnd, { passive: false });

  pool.appendChild(el);
  return el;
}

function renderNextItem(pool) {
  if (itemQueue.length === 0) return;
  const item = itemQueue.shift();
  renderItemEl(pool, item);
}

// ─── TOUCH DRAG ─────────────────────────────────────────────
let touchClone = null,
  touchOrigin = null;

function onTouchStart(e) {
  const el = e.currentTarget;
  draggedItem = el;
  touchOrigin = { x: e.touches[0].clientX, y: e.touches[0].clientY };

  el.style.opacity = '0';
  el.style.pointerEvents = 'none';

  touchClone = el.cloneNode(true);
  touchClone.style.cssText = `
          position:fixed; z-index:9999; pointer-events:none;
          opacity:0.85; transform:scale(1.05);
          top:${e.touches[0].clientY - 70}px;
          left:${e.touches[0].clientX - 60}px;
          border:1.5px solid var(--green-400);
          background:var(--white); border-radius:8px; padding:9px 15px;
          font-size:0.875rem; font-weight:500;
          width:fit-content; white-space:nowrap;
        `;
  document.body.appendChild(touchClone);
}

function onTouchMove(e) {
  e.preventDefault();
  if (!touchClone) return;
  const t = e.touches[0];
  touchClone.style.top = `${t.clientY - 20}px`;
  touchClone.style.left = `${t.clientX - 60}px`;

  document
    .querySelectorAll('.trash-bin')
    .forEach((b) => b.classList.remove('dragover'));
  const under = document.elementFromPoint(t.clientX, t.clientY);
  const bin = under?.closest('.trash-bin');
  if (bin) bin.classList.add('dragover');
}

function onTouchEnd(e) {
  e.preventDefault();
  if (touchClone) {
    touchClone.remove();
    touchClone = null;
  }
  document
    .querySelectorAll('.trash-bin')
    .forEach((b) => b.classList.remove('dragover'));

  const t = e.changedTouches[0];
  const under = document.elementFromPoint(t.clientX, t.clientY);
  const bin = under?.closest('.trash-bin');

  if (bin && draggedItem) {
    handleDrop(bin.dataset.bin);
  } else {
    if (draggedItem) {
      draggedItem.style.opacity = '1';
      draggedItem.style.pointerEvents = 'auto';
    }
  }

  draggedItem = null;
}

// ─── DROP LOGIC ─────────────────────────────────────────────
function handleDrop(targetBinId) {
  if (!draggedItem) return;
  const correctBin = draggedItem.dataset.bin;
  const label = draggedItem.dataset.label;
  const isBenar = correctBin === targetBinId;
  const itemEl = draggedItem;

  if (isBenar) {
    skor += 10;
    benar += 1;
    binCounts[targetBinId]++;
    showFeedback(`✅ Benar! ${label} masuk ke tong yang tepat.`, 'benar');

    itemEl.style.transition = 'all 0.25s';
    itemEl.style.transform = 'scale(0.8)';
    itemEl.style.opacity = '0';

    setTimeout(() => {
      itemEl.remove();
      if (isMobileView() && itemQueue.length > 0) {
        const pool = document.getElementById('items-pool');
        renderNextItem(pool);
      }
      updateHintUI();
    }, 250);

    updateBinCount(targetBinId);

    dipilah++;
    updateScore();
    updateProgress();

    if (dipilah === totalItems) {
      setTimeout(showResult, 700);
    }
  } else {
    salah += 1;
    const correctLabel = BINS.find((b) => b.id === correctBin)?.label;
    showFeedback(
      `❌ Salah! ${label} seharusnya di tong ${correctLabel}.`,
      'salah',
    );

    itemEl.style.opacity = '1';
    itemEl.style.pointerEvents = 'auto';
    itemEl.style.animation = 'none';
    itemEl.classList.add('shake');
    setTimeout(() => itemEl?.classList.remove('shake'), 400);

    updateScore();
  }
}

// ─── UPDATE UI ──────────────────────────────────────────────
function updateScore() {
  document.getElementById('dd-skor').textContent = skor;
  document.getElementById('dd-benar').textContent = benar;
  document.getElementById('dd-salah').textContent = salah;
}

function updateProgress() {
  document.getElementById('dd-progress').textContent =
    `${dipilah} / ${totalItems} sampah dipilah`;
}

function updateBinCount(binId) {
  const el = document.getElementById(`count-${binId}`);
  el.textContent = binCounts[binId];
  el.classList.add('show');
}

// ─── FEEDBACK TOAST ─────────────────────────────────────────
function showFeedback(msg, type) {
  const el = document.getElementById('dd-feedback');
  if (feedbackTimer) clearTimeout(feedbackTimer);
  el.textContent = msg;
  el.className = `dd-feedback ${type} show`;
  feedbackTimer = setTimeout(() => el.classList.remove('show'), 2200);
}

// ─── RESULT ─────────────────────────────────────────────────
function showResult() {
  const persen = (benar / totalItems) * 100;
  const result = document.getElementById('dd-result');
  result.classList.add('show');
  result.scrollIntoView({ behavior: 'smooth', block: 'center' });

  document.getElementById('dd-final-score').textContent = `${skor} poin`;

  let emoji, title, desc;
  if (persen === 100) {
    emoji = '🏆';
    title = 'Sempurna!';
    desc =
      'Semua sampah masuk ke tong yang benar! Kamu ahli pilah sampah sejati.';
  } else if (persen >= 75) {
    emoji = '🌟';
    title = 'Bagus Sekali!';
    desc = `Kamu benar ${benar} dari ${totalItems} sampah. Hampir sempurna!`;
  } else if (persen >= 50) {
    emoji = '👍';
    title = 'Lumayan!';
    desc = `Kamu benar ${benar} dari ${totalItems} sampah. Pelajari lagi jenis-jenisnya ya!`;
  } else {
    emoji = '📚';
    title = 'Perlu Latihan Lagi';
    desc =
      'Jangan menyerah! Baca dulu materinya di halaman utama, lalu coba lagi.';
  }

  document.getElementById('dd-result-emoji').textContent = emoji;
  document.getElementById('dd-result-title').textContent = title;
  document.getElementById('dd-result-desc').textContent = desc;
}

// ─── RESTART ────────────────────────────────────────────────
function restart() {
  skor = 0;
  benar = 0;
  salah = 0;
  dipilah = 0;
  hintTersisa = 9;
  BINS.forEach((b) => (binCounts[b.id] = 0));
  updateScore();
  document.getElementById('hint-message').classList.remove('show');
  document.getElementById('dd-result').classList.remove('show');
  buildBins();
  buildItems();
}

document.getElementById('btn-restart').addEventListener('click', restart);

// ─── KONFIRMASI KEMBALI (SweetAlert2) ──────────────────────
document.getElementById('btn-kembali').addEventListener('click', (e) => {
  e.preventDefault();
  Swal.fire({
    title: 'Apakah Anda yakin ingin kembali?',
    html: '<small style="color:#888;">Skor akan direset</small>',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Ya, kembali',
    cancelButtonText: 'Batal',
    confirmButtonColor: '#388e3c',
    cancelButtonColor: '#9e9e9e',
    reverseButtons: true,
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = 'index.html';
    }
  });
});

// ─── KONFIRMASI BERANDA (SweetAlert2) ──────────────────────
document.getElementById('btn-beranda').addEventListener('click', (e) => {
  e.preventDefault();
  Swal.fire({
    title: 'Apakah Anda yakin ingin ke Beranda?',
    html: '<small style="color:#c62828;">Skor akan direset</small>',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Ya, ke Beranda',
    cancelButtonText: 'Batal',
    confirmButtonColor: '#388e3c',
    cancelButtonColor: '#9e9e9e',
    reverseButtons: true,
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = 'index.html';
    }
  });
});

// ─── SHAKE ANIMATION ─────────────────────────────────────────
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
      @keyframes shake {
        0%,100% { transform: translateX(0); }
        20%      { transform: translateX(-6px); }
        40%      { transform: translateX(6px); }
        60%      { transform: translateX(-4px); }
        80%      { transform: translateX(4px); }
      }
      .shake { animation: shake 0.4s ease !important; }
    `;
document.head.appendChild(shakeStyle);

// ─── INIT ───────────────────────────────────────────────────
buildBins();
buildItems();
// ─── THEME TOGGLE ────────────────────────────────────────────
(function () {
  const toggle = document.getElementById('theme-toggle');
  const root = document.documentElement;
  const saved = localStorage.getItem('eco-theme') || 'light';
  root.setAttribute('data-theme', saved);
  toggle.textContent = saved === 'dark' ? '☀️' : '🌙';
  toggle.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('eco-theme', next);
    toggle.textContent = next === 'dark' ? '☀️' : '🌙';
  });
})();

// ─── HAMBURGER ────────────────────────────────────────────────
(function () {
  const burger = document.getElementById('hamburger');
  const navList = document.getElementById('nav-links');

  burger.addEventListener('click', () => {
    const isOpen = navList.classList.toggle('open');
    burger.classList.toggle('active', isOpen);
    burger.setAttribute('aria-expanded', isOpen);
  });

  navList.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (link.id === 'btn-kembali') return;
      navList.classList.remove('open');
      burger.classList.remove('active');
      burger.setAttribute('aria-expanded', false);
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
      navList.classList.remove('open');
      burger.classList.remove('active');
      burger.setAttribute('aria-expanded', false);
    }
  });
})();
// ─── RESPONSIVE RESIZE GUARD ──────────────────────────────────
let lastIsMobile = isMobileView();
window.addEventListener('resize', () => {
  const nowMobile = isMobileView();
  if (nowMobile !== lastIsMobile) {
    lastIsMobile = nowMobile;
    rebuildRemainingItems();
  }
});

function rebuildRemainingItems() {
  const pool = document.getElementById('items-pool');
  const currentItems = Array.from(document.querySelectorAll('.trash-item')).map(
    (el) => ({
      emoji: el.innerHTML.trim().split(' ')[0],
      label: el.dataset.label,
      bin: el.dataset.bin,
    }),
  );
  const remaining = [...currentItems, ...itemQueue];

  pool.innerHTML = '';
  if (isMobileView()) {
    itemQueue = [...remaining];
    for (let i = 0; i < MOBILE_SLOT && itemQueue.length > 0; i++) {
      renderNextItem(pool);
    }
  } else {
    itemQueue = [];
    remaining.forEach((item) => renderItemEl(pool, item));
  }
  updateHintUI();
}

let gameActive = true;

document.getElementById('btn-kembali').addEventListener('click', () => {
  gameActive = false;
});
document.getElementById('btn-beranda').addEventListener('click', () => {
  gameActive = false;
});
const btnBerandaHasil = document.querySelector('.result-box .btn-secondary');
if (btnBerandaHasil) {
  btnBerandaHasil.addEventListener('click', () => {
    gameActive = false;
  });
}

window.addEventListener('beforeunload', (e) => {
  if (!gameActive) return;
  e.preventDefault();
  e.returnValue = '';
});

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden' && gameActive) {
    sessionStorage.setItem('eco-left-game', 'true');
  }

  if (document.visibilityState === 'visible') {
    const pernahKeluar = sessionStorage.getItem('eco-left-game');
    if (pernahKeluar && gameActive) {
      sessionStorage.removeItem('eco-left-game');
      Swal.fire({
        title: 'Kamu sempat keluar!',
        html: '<small style="color:#c62828;">Skor akan direset jika kamu meninggalkan permainan</small>',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Lanjut Bermain',
        cancelButtonText: 'Keluar & Reset',
        confirmButtonColor: '#388e3c',
        cancelButtonColor: '#9e9e9e',
        reverseButtons: true,
      }).then((result) => {
        if (!result.isConfirmed) {
          gameActive = false;
          window.location.href = 'index.html';
        }
      });
    }
  }
});

window.addEventListener('pageshow', (e) => {
  if (e.persisted && gameActive) {
    Swal.fire({
      title: 'Apakah Anda ingin melanjutkan?',
      html: '<small style="color:#c62828;">Skor akan direset jika keluar</small>',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Lanjut Bermain',
      cancelButtonText: 'Keluar & Reset',
      confirmButtonColor: '#388e3c',
      cancelButtonColor: '#9e9e9e',
      reverseButtons: true,
    }).then((result) => {
      if (!result.isConfirmed) {
        gameActive = false;
        window.location.href = 'index.html';
      }
    });
  }
});
