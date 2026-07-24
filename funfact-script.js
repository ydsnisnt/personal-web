// ============================================================
// FITUR: COPY-TO-CLIPBOARD UNTUK ID/UID GAME
// ============================================================
// 1. Ambil SEMUA tombol yang punya class "btn-copy" sekaligus.
//    querySelectorAll mengembalikan sebuah NodeList (mirip array)
//    berisi semua elemen yang cocok dengan selector-nya.
const copyButtons = document.querySelectorAll('.btn-copy');

// 2. Ambil elemen toast (notifikasi kecil di bawah layar)
const toast = document.getElementById('toast');

// variabel buat nyimpen "jadwal" penyembunyian toast, supaya kalau
// user klik tombol copy berkali-kali dengan cepat, timer lama
// dibatalkan dulu sebelum bikin timer baru (biar toast-nya nggak
// kedip-kedip aneh)
let hideTimeoutId = null;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');

  // batalkan timer sebelumnya kalau ada
  if (hideTimeoutId) {
    clearTimeout(hideTimeoutId);
  }

  // sembunyikan lagi otomatis setelah 2 detik
  hideTimeoutId = setTimeout(() => {
    toast.classList.remove('show');
  }, 2000);
}

// 3. Pasang event listener ke SETIAP tombol copy satu per satu
//    pakai forEach, karena querySelectorAll bukan satu elemen
//    tunggal, melainkan kumpulan elemen.
copyButtons.forEach((button) => {
  button.addEventListener('click', async () => {
    // teks yang mau di-copy diambil dari atribut data-copy
    // yang sudah kita tulis manual di HTML (lihat funfact.html)
    const textToCopy = button.dataset.copy;

    try {
      // navigator.clipboard.writeText() adalah cara modern buat
      // nyalin teks ke clipboard. Fungsi ini ASYNC (butuh waktu),
      // makanya kita pakai "await" dan function-nya ditandai "async".
      await navigator.clipboard.writeText(textToCopy);
      showToast('ID tersalin! 📋');

      // sedikit feedback visual di tombolnya sendiri
      const originalText = button.textContent;
      button.textContent = 'Tersalin ✓';
      setTimeout(() => {
        button.textContent = originalText;
      }, 1200);

    } catch (err) {
      // navigator.clipboard butuh HTTPS atau localhost, dan butuh
      // izin browser. Kalau gagal (misal dibuka dari file:// lokal
      // tanpa izin), kasih tau lewat toast juga -- jangan silent fail.
      showToast('Gagal menyalin, coba manual ya');
      console.error('Clipboard error:', err);
    }
  });
});


// ============================================================
// FITUR TAMBAHAN: SALJU JATUH
// ============================================================
// Halaman Fun Facts ini SELALU bertema Fun Mode (nggak ada saklar
// toggle di sini), jadi salju di halaman ini otomatis "hidup" terus
// begitu halamannya kebuka -- beda sama index.html yang salju-nya
// cuma nyala/mati ngikutin mode yang lagi aktif.
const snowContainer = document.getElementById('snow-container');
const SNOWFLAKE_CHARS = ['❄', '❅', '❆'];
const TOTAL_SNOWFLAKES = 40;

function spawnSnow(container, total) {
  // kalau elemen wadahnya nggak ada di HTML, hentikan supaya nggak error
  if (!container) return;

  for (let i = 0; i < total; i++) {
    const flake = document.createElement('span');
    flake.className = 'snowflake';

    // pilih salah satu bentuk salju secara acak
    flake.textContent = SNOWFLAKE_CHARS[Math.floor(Math.random() * SNOWFLAKE_CHARS.length)];

    // posisi mendatar acak (0% - 100% lebar layar)
    flake.style.left = `${Math.random() * 100}vw`;

    // ukuran & kecepatan jatuh acak biar terkesan alami, bukan seragam
    flake.style.fontSize = `${10 + Math.random() * 14}px`;
    flake.style.animationDuration = `${6 + Math.random() * 8}s`;

    // delay negatif = seolah animasinya sudah jalan dari tadi,
    // jadi begitu halaman dibuka salju langsung "berserakan" di
    // berbagai ketinggian, bukan numpuk semua di atas layar
    flake.style.animationDelay = `-${Math.random() * 10}s`;

    flake.style.opacity = `${0.4 + Math.random() * 0.6}`;

    container.appendChild(flake);
  }
}

// langsung buat saljunya begitu halaman ini dimuat
spawnSnow(snowContainer, TOTAL_SNOWFLAKES);


// ============================================================
// FITUR TAMBAHAN: TAB PEMILIH LAGU DI WIDGET SPOTIFY
// ============================================================
// Sama persis logikanya kayak di script.js (halaman utama): tombol
// ber-class "spotify-tab" pas diklik bakal ganti "src" punya iframe
// #spotify-player ke lagu yang dipilih, tanpa reload halaman.
function initSpotifyTabs() {
  const player = document.getElementById('spotify-player');
  if (!player) return; // kalau iframe-nya nggak ada, berhenti -- jangan error

  const tabs = document.querySelectorAll('.spotify-tab');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const trackId = tab.dataset.track;
      player.src = `https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`;

      // pindahin class "active" dari tombol lama ke tombol yang baru diklik
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });
}

initSpotifyTabs();