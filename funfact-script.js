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