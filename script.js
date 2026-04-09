const inputs = document.querySelectorAll('.pin-inputs input');
const openBtn = document.getElementById('openBtn');

// O'zingiz xohlagan kod va fayl nomini bu yerga yozing
const TO_GRI_PIN = "1234"; 
const PDF_URL = "hujjat.pdf"; 

inputs.forEach((input, index) => {
    // Raqam yozilganda keyingisiga o'tish
    input.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, ''); // Faqat raqam
        if (e.target.value.length === 1 && index < inputs.length - 1) {
            inputs[index + 1].focus();
        }
        checkInputs();
    });

    // Backspace bosilganda oldingisiga qaytish
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && !e.target.value && index > 0) {
            inputs[index - 1].focus();
        }
    });
});

function checkInputs() {
    const enteredPin = Array.from(inputs).map(input => input.value).join('');
    if (enteredPin.length === 4) {
        openBtn.classList.add('active');
        openBtn.disabled = false;
    } else {
        openBtn.classList.remove('active');
        openBtn.disabled = true;
    }
}

// Tugma bosilganda PDF ochish
openBtn.addEventListener('click', () => {
    const enteredPin = Array.from(inputs).map(input => input.value).join('');
    
    if (enteredPin === TO_GRI_PIN) {
        // PDF-ni yangi tabda ochish
        window.open(PDF_URL, '_blank');
    } else {
        // PIN xato bo'lsa inputlarni tozalash
        inputs.forEach(input => input.value = "");
        inputs[0].focus();
        checkInputs();
    }
});