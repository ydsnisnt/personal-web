// ELEMEN SAKLAR & TEKS
const toggleSwitch = document.getElementById('mode-toggle');
const modeText = document.getElementById('mode-text');
const bodyElement = document.body;

// ELEMEN SOSMED
const btnSosmed = document.getElementById('btn-sosmed');
const sosmedMenu = document.getElementById('sosmed-menu');

// 1. Logika Saklar Mode
toggleSwitch.addEventListener('change', () => {
    if (toggleSwitch.checked) {
        bodyElement.classList.remove('theme-maroon');
        bodyElement.classList.add('theme-blue');
        modeText.innerText = "Fun Mode 🎮";
    } else {
        bodyElement.classList.remove('theme-blue');
        bodyElement.classList.add('theme-maroon');
        modeText.innerText = "Profesional Mode 💼";
        
        // Tutup menu sosmed jika user balik ke mode Profesional
        sosmedMenu.classList.add('hidden');
    }
});

// 2. Logika Buka/Tutup Menu Sosmed saat Tombol Diklik
btnSosmed.addEventListener('click', () => {
    // toggle() akan menambah class 'hidden' jika belum ada, atau mencabutnya jika sudah ada
    sosmedMenu.classList.toggle('hidden');
});