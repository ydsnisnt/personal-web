// ============================================================
// AMBIL SEMUA ELEMEN YANG DIBUTUHKAN DARI HTML
// (querying/mengambil elemen di awal itu best practice, biar
//  browser nggak perlu nyari ulang elemen yang sama berkali-kali)
// ============================================================
const toggleSwitch   = document.getElementById('mode-toggle');
const modeText        = document.getElementById('mode-text');
const bodyElement     = document.body;

// ELEMEN TEKS HERO
const heroTitle        = document.getElementById('hero-title');
const heroSubtitleTop   = document.getElementById('subtitle-top');
const heroSubtitleBottom = document.getElementById('subtitle-bottom');

// ELEMEN SOSMED
const btnSosmed  = document.getElementById('btn-sosmed');
const sosmedMenu = document.getElementById('sosmed-menu');

// KUNCI yang dipakai buat nyimpen pilihan mode di localStorage.
// localStorage itu semacam "memori kecil" milik browser yang nempel
// ke domain web ini -- datanya nggak hilang walau tab/browser ditutup.
const STORAGE_KEY = 'ydsisnt-mode';


// ============================================================
// KUMPULAN TEKS PER MODE
// Dikumpulkan jadi satu objek supaya gampang diubah nanti --
// kamu tinggal edit teks di sini, nggak perlu bongkar logika di bawah.
// ============================================================
const content = {
  maroon: {
    modeText: 'Profesional Mode 💼',
    subtitleTop: 'Welcome To My World',
    heroTitle: 'Hallo Im ydsisnt',
    subtitleBottom: 'Informatics Engineering Student',
  },
  blue: {
    modeText: 'Fun Mode 🎮',
    subtitleTop: 'Heyo 👋',
    heroTitle: 'welcome bhuwackzzz!!',
    subtitleBottom: "LET'S HANG OUT & VIBE TOGETHER",
  },
};


// ============================================================
// FUNGSI UTAMA: PINDAH MODE
// Dibikin jadi satu fungsi terpisah (bukan ditulis 2x di dalam
// event listener) supaya bisa dipanggil dari 2 tempat:
// 1. Pas halaman pertama kali dibuka (baca dari localStorage)
// 2. Pas toggle switch diklik user
// Prinsip ini disebut DRY -- Don't Repeat Yourself.
// ============================================================
function applyMode(mode, { save = true, animateConfetti = false } = {}) {
  const isFun = mode === 'blue';
  const data = isFun ? content.blue : content.maroon;

  // ganti class tema di <body> -- ini yang "menyalakan" semua warna
  // baru lewat CSS variable (--accent-color, --text-color, dst)
  bodyElement.classList.toggle('theme-blue', isFun);
  bodyElement.classList.toggle('theme-maroon', !isFun);

  // update semua teks sesuai mode
  modeText.innerText = data.modeText;
  heroSubtitleTop.innerText = data.subtitleTop;
  heroTitle.innerText = data.heroTitle;
  heroSubtitleBottom.innerText = data.subtitleBottom;

  // sinkronkan posisi switch (dipakai pas load dari localStorage,
  // supaya kalau kamu terakhir milih Fun Mode, switch-nya keliatan
  // "ON" tanpa perlu diklik ulang)
  toggleSwitch.checked = isFun;

  // sembunyikan menu sosmed tiap kali pindah mode, biar nggak
  // "nyangkut" kebuka pas balik ke professional
  sosmedMenu.classList.add('hidden');
  btnSosmed.setAttribute('aria-expanded', 'false');

  // simpan pilihan mode ke localStorage supaya diingat pas reload.
  // { save: false } dipakai waktu applyMode dipanggil saat halaman
  // BARU dibuka -- supaya kita nggak nulis ulang localStorage
  // dengan nilai yang sama persis yang baru aja kita baca.
  if (save) {
    localStorage.setItem(STORAGE_KEY, mode);
  }

  // efek confetti kecil cuma muncul pas USER SENGAJA klik ke Fun Mode
  // (bukan pas halaman baru dibuka), biar berasa "reward" pas nge-toggle
  if (animateConfetti && isFun) {
    spawnConfetti();
  }
}


// ============================================================
// EVENT: SWITCH DIKLIK USER
// ============================================================
toggleSwitch.addEventListener('change', () => {
  const nextMode = toggleSwitch.checked ? 'blue' : 'maroon';
  applyMode(nextMode, { save: true, animateConfetti: true });
});


// ============================================================
// LOGIKA BUKA/TUTUP MENU SOSMED
// ============================================================
btnSosmed.addEventListener('click', () => {
  const isHidden = sosmedMenu.classList.toggle('hidden');
  btnSosmed.setAttribute('aria-expanded', String(!isHidden));
});


// ============================================================
// FITUR TAMBAHAN 1: INGAT MODE TERAKHIR (localStorage)
// Begitu file JS ini pertama kali jalan, kita cek: apakah user
// pernah milih mode sebelumnya? Kalau iya, langsung terapkan --
// jadi kamu nggak perlu klik toggle ulang tiap buka web ini lagi.
// ============================================================
const savedMode = localStorage.getItem(STORAGE_KEY);
if (savedMode === 'blue' || savedMode === 'maroon') {
  applyMode(savedMode, { save: false });
}
// kalau belum pernah ada pilihan tersimpan, biarkan HTML pakai
// default "theme-maroon" yang sudah ditulis manual di index.html.


// ============================================================
// FITUR TAMBAHAN 2: CONFETTI EMOJI BURST
// Efek kecil: pas pindah ke Fun Mode, beberapa emoji "meletus"
// dari tengah layar lalu jatuh & memudar. Semua elemen dibuat
// lewat JavaScript (document.createElement), dianimasikan lewat
// CSS, lalu DIHAPUS lagi dari DOM setelah animasinya selesai --
// supaya nggak numpuk elemen tak terpakai tiap kali di-toggle.
// ============================================================
function spawnConfetti() {
  const emojis = ['🎉', '✨', '🎮', '🔥', '🎧'];
  const total = 12;

  for (let i = 0; i < total; i++) {
    const particle = document.createElement('span');
    particle.className = 'confetti-particle';
    particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];

    // posisi horizontal & durasi acak biar tiap particle beda
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.animationDuration = `${1.2 + Math.random() * 0.8}s`;
    particle.style.fontSize = `${16 + Math.random() * 14}px`;

    document.body.appendChild(particle);

    // bersihkan elemen dari DOM setelah animasinya kelar,
    // supaya nggak jadi "sampah" yang numpuk tiap kali toggle
    particle.addEventListener('animationend', () => particle.remove());
  }
}


// ============================================================
// IDE FITUR LAIN buat kamu kembangkan sendiri (belum diimplementasi):
// - Web Share API: tombol "Share" yang buka share sheet HP
//   (navigator.share) buat nge-share link web ini langsung dari HP
// - Efek "typing" di hero title pakai setInterval, ketik huruf satu-satu
// - Konami code / easter egg tersembunyi buat fun mode
// - Ganti tema otomatis sesuai jam (pagi = terang, malam = gelap)
// ============================================================