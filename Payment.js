document.addEventListener('DOMContentLoaded', function () {
    const paymentOptions = document.querySelectorAll('input[name="payment-method"]');
    const cardSection = document.getElementById('Card');
    const paypalSection = document.getElementById('paypal');
    const transferSection = document.getElementById('transfer');

    function toggleSections() {
        cardSection.style.display = 'none';
        paypalSection.style.display = 'none';
        transferSection.style.display = 'none';

        if (this.value === '1') cardSection.style.display = 'block';
        if (this.value === '2') paypalSection.style.display = 'block';
        if (this.value === '3') transferSection.style.display = 'block';
    }

    paymentOptions.forEach(option => option.addEventListener('change', toggleSections));
});

document.querySelector('form').addEventListener('submit', function (e) {
    const cardNumber = document.getElementById('card-number').value;
    const cvv = document.getElementById('cvv').value;
    const expiryDate = document.getElementById('expiry-date').value;

    const cardRegex = /^[0-9]{16}$/;
    const cvvRegex = /^[0-9]{3,4}$/;

    if (!cardNumber.match(cardRegex)) {
        alert('Please enter a valid 16-digit card number.');
        e.preventDefault();
        return;
    }

    if (!cvv.match(cvvRegex)) {
        alert('Please enter a valid CVV (3-4 digits).');
        e.preventDefault();
        return;
    }

    if (new Date(expiryDate) < new Date()) {
        alert('Card expiry date must be in the future.');
        e.preventDefault();
        return;
    }
});

const cardInput = document.getElementById('card-number');
cardInput.addEventListener('input', function () {
    let value = this.value.replace(/\D/g, '').slice(0, 16);
    this.value = value.replace(/(.{4})/g, '$1 ').trim();
});

document.querySelector('form').addEventListener('submit', function (e) {
    if (!confirm('Are you sure you want to submit the payment?')) {
        e.preventDefault();
    }
});

document.querySelector('#paypal button').addEventListener('click', function (e) {
    e.preventDefault();
    if (confirm('You will be redirected to PayPal to complete your payment. Continue?')) {
        window.location.href = 'https://www.paypal.com';
    }
});

document.addEventListener('DOMContentLoaded', function () {
    console.log("JavaScript loaded!");

    const cardInput = document.getElementById('card-number');
    const visaLogo = document.querySelector('img[alt="visa"]');
    const mastercardLogo = document.querySelector('img[alt="mastercard"]');
    const amexLogo = document.querySelector('img[alt="amex"]');

    if (!cardInput || !visaLogo || !mastercardLogo || !amexLogo) {
        console.error("Required elements not found. Check your HTML structure.");
        return;
    }

    // Function to detect card type
    function detectCardType(number) {
        const trimmedNumber = number.replace(/\s/g, ''); // Remove spaces
        console.log("Current card number:", trimmedNumber);
        if (/^4/.test(trimmedNumber)) return 'Visa';
        if (/^5[1-5]/.test(trimmedNumber)) return 'Mastercard';
        if (/^3[47]/.test(trimmedNumber)) return 'AmEx';
        return null;
    }

    // Function to update card logo display
    function updateCardLogo(cardType) {
        console.log("Detected card type:", cardType);
        visaLogo.style.opacity = cardType === 'Visa' ? 1 : 0.2;
        mastercardLogo.style.opacity = cardType === 'Mastercard' ? 1 : 0.2;
        amexLogo.style.opacity = cardType === 'AmEx' ? 1 : 0.2;
    }

    // Event listener for card input
    cardInput.addEventListener('input', function () {
        const cardType = detectCardType(this.value);
        updateCardLogo(cardType);
    });
});

