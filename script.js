// ==========================================
// LOGIKA INTERAKTIF SAKLAR MODEREN
// ==========================================

// 1. Tangkap elemen checkbox (saklar) dan teks indikator dari HTML
const toggleSwitch = document.getElementById('mode-toggle');
const modeText = document.getElementById('mode-text');
const bodyElement = document.body;

// 2. Berikan fungsi pendengar ketika kondisi saklar berubah (di-geser)
toggleSwitch.addEventListener('change', () => {
    
    // ".checked" bernilai true jika saklar digeser ke kanan (aktif)
    if (toggleSwitch.checked) {
        
        // Aksi saat saklar AKTIF (Masuk ke Fun Mode)
        bodyElement.classList.remove('theme-maroon');
        bodyElement.classList.add('theme-blue');
        
        // Mengubah teks di sebelah saklar secara dinamis
        modeText.innerText = "Fun Mode 🎮";

        // [FITUR SELANJUTNYA]: Tempat memicu animasi/efek teks mode santai
        
    } else {
        
        // Aksi saat saklar NON-AKTIF (Kembali ke Profesional Mode)
        bodyElement.classList.remove('theme-blue');
        bodyElement.classList.add('theme-maroon');
        
        // Mengubah kembali teksnya
        modeText.innerText = "Profesional Mode 💼";

        // [FITUR SELANJUTNYA]: Tempat mengubah konten menjadi bahasa formal
    }
});