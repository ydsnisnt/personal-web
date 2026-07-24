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
// FITUR TAMBAHAN 3: SALJU JATUH (KHUSUS FUN MODE)
// ============================================================
// Ambil elemen wadah salju yang sudah disiapkan di index.html.
// "?" di belakang nggak dipakai di sini karena kita mau JS ini
// tetap aman dijalankan meskipun elemennya belum tentu ada
// (makanya nanti kita bungkus pemanggilannya pakai "if").
const snowContainer = document.getElementById('snow-container');

// Kumpulan karakter salju -- dicampur beberapa biar variatif,
// nggak monoton cuma satu bentuk keping salju terus.
const SNOWFLAKE_CHARS = ['❄', '❅', '❆'];

// Total keping salju yang mau dibuat. Nggak usah kebanyakan,
// soalnya makin banyak elemen DOM = makin berat buat browser.
const TOTAL_SNOWFLAKES = 45;

// ------------------------------------------------------------
// spawnSnow(container, total)
// Fungsi ini bikin sejumlah <span class="snowflake"> lalu
// menaruhnya ke dalam elemen wadah (container). Posisi mendatar,
// ukuran huruf, kecepatan jatuh, dan jeda animasi masing-masing
// keping dibuat ACAK (Math.random) biar keliatan natural --
// nggak semua salju jatuh bareng & lurus kayak barisan tentara.
// ------------------------------------------------------------
function spawnSnow(container, total) {
  // kalau container-nya nggak ketemu di halaman ini (misal script
  // ini kepasang di halaman yang nggak punya #snow-container),
  // langsung berhenti -- daripada nanti error null.appendChild()
  if (!container) return;

  for (let i = 0; i < total; i++) {
    // bikin satu elemen <span> kosong buat 1 keping salju
    const flake = document.createElement('span');
    flake.className = 'snowflake';

    // isi teksnya salah satu karakter salju secara acak
    flake.textContent = SNOWFLAKE_CHARS[Math.floor(Math.random() * SNOWFLAKE_CHARS.length)];

    // posisi horizontal (kiri-kanan) acak dari 0% sampai 100% lebar layar
    flake.style.left = `${Math.random() * 100}vw`;

    // ukuran huruf salju acak antara 10px - 24px, biar ada yang
    // "dekat" (gede) dan ada yang "jauh" (kecil), kesan kedalaman
    flake.style.fontSize = `${10 + Math.random() * 14}px`;

    // kecepatan jatuh acak antara 6 - 14 detik per satu putaran animasi
    flake.style.animationDuration = `${6 + Math.random() * 8}s`;

    // delay NEGATIF supaya pas animasi baru "running", posisi tiap
    // salju langsung beda-beda (seolah animasinya sudah berjalan
    // dari tadi) -- bukan malah semua salju mulai bareng dari atas
    flake.style.animationDelay = `-${Math.random() * 10}s`;

    // transparansi acak, biar sebagian salju keliatan "di kejauhan"
    flake.style.opacity = `${0.4 + Math.random() * 0.6}`;

    // terakhir, masukkan keping salju ini ke dalam wadahnya di HTML
    container.appendChild(flake);
  }
}

// Salju langsung dibuat sekali aja pas halaman pertama kali dibuka.
// Kita nggak perlu bikin ulang tiap kali toggle mode di-klik, karena
// tampil/nggaknya salju sudah otomatis diatur lewat CSS (opacity +
// animation-play-state yang nempel ke class "body.theme-blue" --
// lihat style.css bagian 16). Jadi JS di sini cukup "menyiapkan
// barang"-nya sekali di awal, sisanya CSS yang atur kapan kelihatan.
spawnSnow(snowContainer, TOTAL_SNOWFLAKES);


// ============================================================
// FITUR TAMBAHAN 4: EFEK INTERAKTIF 3D TILT
// ============================================================
// Elemen apa pun yang dikasih class "tilt-card" di HTML (misalnya
// kartu hero & widget Spotify) akan "dimiringkan" mengikuti posisi
// kursor mouse, seolah-olah kartunya punya kedalaman 3 dimensi.
//
// Caranya: setiap kali mouse bergerak DI ATAS kartu, kita hitung
// seberapa jauh posisi kursor dari titik TENGAH kartu (baik secara
// horizontal maupun vertikal), lalu ubah jarak itu jadi derajat
// rotasi lewat CSS custom property --rx (rotate sumbu X) dan
// --ry (rotate sumbu Y) yang sudah disiapkan di style.css.
function initTiltEffect() {
  // ambil SEMUA elemen yang punya class "tilt-card" di halaman ini
  const tiltCards = document.querySelectorAll('.tilt-card');

  // sudut kemiringan maksimum (dalam derajat). Semakin besar angka
  // ini, semakin "ekstrem" efek miringnya pas mouse di pinggir kartu.
  const MAX_TILT_DEGREES = 10;

  tiltCards.forEach((card) => {
    // EVENT: mouse bergerak di atas kartu
    card.addEventListener('mousemove', (event) => {
      // getBoundingClientRect() ngasih tau posisi & ukuran kartu
      // ini relatif terhadap layar (viewport) saat ini
      const rect = card.getBoundingClientRect();

      // posisi kursor mouse relatif terhadap SISI KIRI-ATAS kartu
      // (bukan relatif ke layar), makanya dikurangi rect.left/top
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      // titik tengah kartu secara horizontal & vertikal
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // seberapa jauh mouse dari titik tengah, dinormalisasi jadi
      // rentang angka -1 (paling kiri/atas) sampai 1 (paling kanan/bawah)
      const percentX = (mouseX - centerX) / centerX;
      const percentY = (mouseY - centerY) / centerY;

      // ubah persentase jarak itu jadi derajat rotasi.
      // - gerak mouse ke KANAN-KIRI -> memutar kartu pada sumbu Y
      // - gerak mouse ke ATAS-BAWAH -> memutar kartu pada sumbu X
      //   (dikasih tanda minus di rotateX supaya arah miringnya
      //   terasa "natural", seolah kartu mengikuti ujung kursor)
      const rotateY = percentX * MAX_TILT_DEGREES;
      const rotateX = percentY * -MAX_TILT_DEGREES;

      // pasang nilai derajat ini ke custom property --rx / --ry.
      // Custom property inilah yang langsung "dibaca" oleh CSS
      // (lihat .tilt-card di style.css: transform: ... rotateX(var(--rx)) ...)
      card.style.setProperty('--rx', `${rotateX}deg`);
      card.style.setProperty('--ry', `${rotateY}deg`);
    });

    // EVENT: mouse keluar dari area kartu -> balikin ke posisi normal (0deg)
    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
    });
  });
}

// langsung jalankan fungsinya sekali begitu script ini dimuat
initTiltEffect();


// ============================================================
// IDE FITUR LAIN buat kamu kembangkan sendiri (belum diimplementasi):
// - Web Share API: tombol "Share" yang buka share sheet HP
//   (navigator.share) buat nge-share link web ini langsung dari HP
// - Efek "typing" di hero title pakai setInterval, ketik huruf satu-satu
// - Konami code / easter egg tersembunyi buat fun mode
// - Ganti tema otomatis sesuai jam (pagi = terang, malam = gelap)
// ============================================================