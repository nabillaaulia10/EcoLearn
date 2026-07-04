const soalBank = [
  {
    pertanyaan:
      'Sampah sisa makanan, daun gugur, dan kulit buah termasuk jenis sampah apa?',
    pilihan: [
      'Sampah Anorganik',
      'Sampah Organik',
      'Sampah B3',
      'Sampah Daur Ulang',
    ],
    jawaban: 1,
    penjelasan:
      'Sisa makanan, daun, dan kulit buah termasuk sampah organik karena berasal dari makhluk hidup dan dapat terurai secara alami.',
    hint: 'Pikirkan: sampah ini berasal dari makhluk hidup dan bisa membusuk secara alami.',
  },
  {
    pertanyaan:
      'Gas apakah yang dihasilkan oleh sampah organik di tempat pembuangan akhir (TPA) dan berkontribusi pada pemanasan global?',
    pilihan: [
      'Karbon Dioksida (CO₂)',
      'Oksigen (O₂)',
      'Metana (CH₄)',
      'Nitrogen (N₂)',
    ],
    jawaban: 2,
    penjelasan:
      'Sampah organik di TPA menghasilkan gas metana (CH₄) yang 25 kali lebih kuat dari CO₂ dalam menyebabkan efek rumah kaca.',
    hint: 'Gas ini juga ditemukan pada kentut sapi dan rawa-rawa, simbolnya CH₄.',
  },
  {
    pertanyaan: "Dalam prinsip 3R, 'Reduce' berarti?",
    pilihan: [
      'Mendaur ulang sampah',
      'Menggunakan kembali barang',
      'Mengurangi penggunaan barang',
      'Membuang sampah pada tempatnya',
    ],
    jawaban: 2,
    penjelasan:
      'Reduce berarti mengurangi penggunaan barang yang berpotensi menjadi sampah, misalnya menghindari plastik sekali pakai.',
    hint: 'Dalam bahasa Inggris, "reduce" artinya mengurangi sesuatu sejak awal.',
  },
  {
    pertanyaan:
      'Baterai bekas, lampu neon, dan oli bekas termasuk kategori sampah apa?',
    pilihan: [
      'Sampah Organik',
      'Sampah Anorganik',
      'Sampah Daur Ulang',
      'Sampah B3 (Bahan Berbahaya dan Beracun)',
    ],
    jawaban: 3,
    penjelasan:
      'Baterai, lampu neon, dan oli termasuk sampah B3 karena mengandung zat berbahaya yang dapat mencemari lingkungan dan merusak kesehatan.',
    hint: 'Kategori ini punya singkatan tiga huruf yang berarti "berbahaya dan beracun".',
  },
  {
    pertanyaan:
      'Berapa lama waktu yang dibutuhkan botol plastik untuk terurai secara alami di alam?',
    pilihan: [
      '10–20 tahun',
      '50–100 tahun',
      '200–500 tahun',
      'Tidak pernah terurai',
    ],
    jawaban: 2,
    penjelasan:
      'Botol plastik membutuhkan waktu antara 200 hingga 500 tahun untuk terurai di alam, tergantung jenis plastik dan kondisi lingkungan.',
    hint: 'Waktunya lebih lama dari rentang hidup manusia, bisa mencapai berabad-abad.',
  },
  {
    pertanyaan: "Apa yang dimaksud dengan 'kompos' dalam pengelolaan sampah?",
    pilihan: [
      'Sampah plastik yang dilelehkan',
      'Pupuk alami dari penguraian sampah organik',
      'Tempat pembuangan sampah akhir',
      'Proses pembakaran sampah',
    ],
    jawaban: 1,
    penjelasan:
      'Kompos adalah pupuk alami yang dihasilkan dari proses penguraian sampah organik seperti sisa makanan dan daun oleh mikroorganisme.',
    hint: 'Hasil akhirnya sering dipakai untuk menyuburkan tanaman di kebun.',
  },
  {
    pertanyaan: 'Mengapa sampah tidak boleh dibuang ke sungai atau laut?',
    pilihan: [
      'Karena membuat air terlihat kotor saja',
      'Karena mencemari air, membunuh ekosistem, dan mengancam sumber air bersih',
      'Karena melanggar aturan estetika kota',
      'Karena membuat bau tidak sedap',
    ],
    jawaban: 1,
    penjelasan:
      'Sampah di perairan mencemari sumber air bersih, merusak ekosistem akuatik, dan plastik laut mematikan satwa seperti penyu dan ikan.',
    hint: 'Pikirkan dampaknya pada hewan laut dan sumber air minum manusia, bukan hanya soal tampilan.',
  },
  {
    pertanyaan: "Manakah contoh penerapan prinsip 'Reuse' yang benar?",
    pilihan: [
      'Membuang botol plastik ke tempat sampah',
      'Mendaur ulang kertas bekas menjadi kertas baru',
      'Menggunakan kembali botol kaca sebagai wadah penyimpanan',
      'Mengurangi penggunaan kantong plastik',
    ],
    jawaban: 2,
    penjelasan:
      'Reuse berarti menggunakan kembali barang yang masih layak, seperti memakai ulang botol kaca sebagai wadah tanpa mengubah bentuknya.',
    hint: 'Reuse beda dengan recycle — barangnya dipakai ulang tanpa diubah bentuknya.',
  },
  {
    pertanyaan: 'Apa kepanjangan dari B3 dalam istilah pengelolaan limbah?',
    pilihan: [
      'Barang Bekas Berserakan',
      'Bahan Berbahaya dan Beracun',
      'Buang Barang Besar',
      'Bersih Bersama Bertanggung jawab',
    ],
    jawaban: 1,
    penjelasan:
      'B3 adalah singkatan dari Bahan Berbahaya dan Beracun, yaitu limbah yang memiliki sifat berbahaya bagi kesehatan dan lingkungan hidup.',
    hint: 'Dua kata kunci di sini berhubungan dengan keselamatan dan racun.',
  },
  {
    pertanyaan:
      'Manakah yang BUKAN merupakan dampak negatif dari penumpukan sampah?',
    pilihan: [
      'Penyebaran penyakit melalui vektor seperti nyamuk dan tikus',
      'Peningkatan kualitas tanah di sekitarnya',
      'Pencemaran air tanah dan sumber air bersih',
      'Penyumbatan saluran drainase yang menyebabkan banjir',
    ],
    jawaban: 1,
    penjelasan:
      'Sampah yang menumpuk justru merusak kualitas tanah. Peningkatan kualitas tanah bukanlah dampak dari penumpukan sampah sembarangan.',
    hint: 'Cari opsi yang terdengar seperti hal positif — padahal soal minta yang BUKAN dampak negatif.',
  },
];

let currentSoal = 0;
let skor = 0;
let dijawab = false;
let hintTersisa = 3;
let hintDipakaiSoalIni = false;

// ─── INTRO MODAL ──────────────────────────────────────────
const introOverlay = document.getElementById('intro-overlay');
document.getElementById('btn-mulai-kuis').addEventListener('click', () => {
  introOverlay.classList.remove('show');
});
window.addEventListener('load', () => {
  introOverlay.classList.add('show');
});

// ─── HINT LOGIC ───────────────────────────────────────────
function updateHintUI() {
  const btn = document.getElementById('btn-hint');
  document.getElementById('hint-count').textContent = hintTersisa;
  btn.disabled = hintTersisa <= 0 || hintDipakaiSoalIni || dijawab;
}

document.getElementById('btn-hint').addEventListener('click', () => {
  if (hintTersisa <= 0 || hintDipakaiSoalIni || dijawab) return;

  hintTersisa--;
  hintDipakaiSoalIni = true;
  updateHintUI();

  const soal = soalBank[currentSoal];
  const msgBox = document.getElementById('hint-message');
  msgBox.innerHTML = `💡 <strong>Petunjuk:</strong> ${soal.hint}`;
  msgBox.classList.add('show');

  // Hilangkan 1 opsi salah secara acak (efek 50:50 ringan)
  const options = document.querySelectorAll('.kuis-option');
  const salahIndexes = [];
  options.forEach((opt, i) => {
    if (i !== soal.jawaban) salahIndexes.push(i);
  });
  const randomWrong =
    salahIndexes[Math.floor(Math.random() * salahIndexes.length)];
  options[randomWrong].classList.add('hint-removed');
});

function tampilSoal() {
  const soal = soalBank[currentSoal];
  dijawab = false;
  hintDipakaiSoalIni = false;

  document.getElementById('pertanyaan-text').textContent = soal.pertanyaan;
  document.getElementById('soal-counter').textContent =
    `Soal ${currentSoal + 1} dari ${soalBank.length}`;
  document.getElementById('progress-fill').style.width =
    `${((currentSoal + 1) / soalBank.length) * 100}%`;
  document.getElementById('btn-next').disabled = true;

  const feedback = document.getElementById('kuis-feedback');
  feedback.className = 'kuis-feedback';
  feedback.textContent = '';

  const hintMsg = document.getElementById('hint-message');
  hintMsg.classList.remove('show');
  hintMsg.innerHTML = '';

  updateHintUI();

  const opsiContainer = document.getElementById('options-container');
  opsiContainer.innerHTML = '';
  const huruf = ['A', 'B', 'C', 'D'];

  soal.pilihan.forEach((pilihan, i) => {
    const btn = document.createElement('button');
    btn.className = 'kuis-option';
    btn.innerHTML = `<span class="option-letter">${huruf[i]}</span>${pilihan}`;
    btn.addEventListener('click', () =>
      pilihJawaban(i, soal.jawaban, soal.penjelasan),
    );
    opsiContainer.appendChild(btn);
  });
}

function pilihJawaban(dipilih, benar, penjelasan) {
  if (dijawab) return;
  dijawab = true;
  updateHintUI();

  const options = document.querySelectorAll('.kuis-option');
  options.forEach((opt, i) => {
    opt.classList.add('disabled');
    opt.classList.remove('hint-removed');
    if (i === benar) opt.classList.add('correct');
    if (i === dipilih && dipilih !== benar) opt.classList.add('wrong');
  });

  const feedback = document.getElementById('kuis-feedback');
  if (dipilih === benar) {
    skor += 10;
    document.getElementById('skor-live').textContent = skor;
    feedback.className = 'kuis-feedback benar show';
    feedback.innerHTML = `✅ <strong>Benar!</strong> ${penjelasan}`;
  } else {
    feedback.className = 'kuis-feedback salah show';
    feedback.innerHTML = `❌ <strong>Kurang tepat.</strong> ${penjelasan}`;
  }

  document.getElementById('btn-next').disabled = false;
}

document.getElementById('btn-next').addEventListener('click', () => {
  currentSoal++;
  if (currentSoal < soalBank.length) {
    tampilSoal();
  } else {
    tampilHasil();
  }
});

function tampilHasil() {
  document.getElementById('kuis-main').style.display = 'none';
  const result = document.getElementById('result-box');
  result.classList.add('show');

  const persen = (skor / (soalBank.length * 10)) * 100;
  document.getElementById('result-score').textContent =
    `${skor} / ${soalBank.length * 10}`;

  let emoji, title, desc;
  if (persen === 100) {
    emoji = '🏆';
    title = 'Sempurna!';
    desc =
      'Luar biasa! Kamu benar-benar paham tentang pengelolaan sampah. Terus jaga lingkungan ya!';
  } else if (persen >= 70) {
    emoji = '🌟';
    title = 'Bagus Sekali!';
    desc =
      'Pemahaman kamu sudah baik! Sedikit lagi untuk mencapai nilai sempurna.';
  } else if (persen >= 50) {
    emoji = '👍';
    title = 'Lumayan!';
    desc =
      'Cukup baik, tapi masih ada yang perlu dipelajari lagi. Baca materi di halaman utama ya!';
  } else {
    emoji = '📚';
    title = 'Perlu Belajar Lagi';
    desc =
      'Jangan menyerah! Kembali ke halaman utama dan pelajari materinya, lalu coba lagi.';
  }

  document.getElementById('result-emoji').textContent = emoji;
  document.getElementById('result-title').textContent = title;
  document.getElementById('result-desc').textContent = desc;
}

function restartKuis() {
  currentSoal = 0;
  skor = 0;
  hintTersisa = 3;
  document.getElementById('skor-live').textContent = 0;
  document.getElementById('result-box').classList.remove('show');
  document.getElementById('kuis-main').style.display = 'block';
  tampilSoal();
}

// Start
tampilSoal();

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
    link.addEventListener('click', (e) => {
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

// ─── GUARD: KELUAR VIA TOMBOL NATIVE BROWSER/MOBILE ────────────
let gameActive = true; // set false saat pemain selesai atau navigasi via tombol resmi

// Tandai game tidak aktif saat pemain memilih keluar lewat tombol resmi
document.getElementById('btn-kembali').addEventListener('click', () => {
  gameActive = false;
});
document.getElementById('btn-beranda').addEventListener('click', () => {
  gameActive = false;
});
// Untuk kuis: tombol "Beranda" di halaman hasil juga tidak perlu konfirmasi
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
