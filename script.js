// ELEMEN UTAMA
const toggleSwitch = document.getElementById('mode-toggle');
const modeText = document.getElementById('mode-text');
const bodyElement = document.body;

// ELEMEN TEKS HERO (DI TENGAH)
const heroTitle = document.getElementById('hero-title');
const heroSubtitle = document.getElementById('hero-subtitle');

// ELEMEN SOSMED
const btnSosmed = document.getElementById('btn-sosmed');
const sosmedMenu = document.getElementById('sosmed-menu');

// LOGIKA PERPINDAHAN MODE
toggleSwitch.addEventListener('change', () => {
    if (toggleSwitch.checked) {
        // --- MASUK KE FUN MODE (BIRU) ---
        bodyElement.classList.remove('theme-maroon');
        bodyElement.classList.add('theme-blue');
        
        // Ubah Teks Mode & Teks Tengah
        modeText.innerText = "Fun Mode 🎮";
        heroTitle.innerText = "welcome bhuwackzzz!!";
        heroSubtitle.innerText = "LET'S HANG OUT & VIBE TOGETHER";
        
    } else {
        // --- KEMBALI KE PROFESIONAL MODE (MERAH) ---
        bodyElement.classList.remove('theme-blue');
        bodyElement.classList.add('theme-maroon');
        
        // Ubah Teks Mode & Teks Tengah
        modeText.innerText = "Profesional Mode 💼";
        heroTitle.innerText = "Hallo Im ydsisnt";
        heroSubtitle.innerText = "INFORMATICS ENGINEERING STUDENT";
        
        // Sembunyikan menu sosmed jika balik ke profesional
        sosmedMenu.classList.add('hidden');
    }
});

// LOGIKA BUKA/TUTUP SOSMED MENU
btnSosmed.addEventListener('click', () => {
    sosmedMenu.classList.toggle('hidden');
});