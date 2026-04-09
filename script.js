const inputs = document.querySelectorAll('.pin-inputs input');
const openBtn = document.getElementById('openBtn');

// SIZNING SOZLAMALARINGIZ
const TO_GRI_PIN = "5487"; // O'zingiz xohlagan kodni yozing
// Fayl loyiha papkasida bo'lishi kerak
const PDF_URL = ".//pdf/c293-e2b0-3bea-4ce5-69c4-2991-b8a6-3489.pdf"; 

inputs.forEach((input, index) => {
    input.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
        if (e.target.value.length === 1 && index < inputs.length - 1) {
            inputs[index + 1].focus();
        }
        checkInputs();
    });

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

// PIN kiritilib tugma bosilganda PDF ochish
openBtn.addEventListener('click', () => {
    const enteredPin = Array.from(inputs).map(input => input.value).join('');
    
    if (enteredPin === TO_GRI_PIN) {
        // PDF-ni yuklamasdan brauzerda ochish
        const link = document.createElement('a');
        link.href = PDF_URL;
        link.target = '_blank';
        link.click();
    } else {
        // Xato bo'lsa tozalash (alert chiqmaydi)
        inputs.forEach(input => input.value = "");
        inputs[0].focus();
        checkInputs();
    }
});