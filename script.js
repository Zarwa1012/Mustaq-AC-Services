// Dynamic Header Navigation Active Link Tracker
window.addEventListener('scroll', () => {
    let sections = document.querySelectorAll('section');
    let navLinks = document.querySelectorAll('.navbar a');

    sections.forEach(section => {
        let top = window.scrollY;
        let offset = section.offsetTop - 160;
        let height = section.offsetHeight;
        let id = section.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + id) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Form Data Direct to WhatsApp Integration
document.getElementById('repairContactForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Page refresh hone se rokta hai

    // Form se customer ka data nikalna
    const name = document.getElementById('fullName').value;
    const phone = document.getElementById('phoneNumber').value;
    const city = document.getElementById('serviceCity').value;
    const service = document.getElementById('applianceType').value;
    const issue = document.getElementById('issueDetails').value;

    // Aapka WhatsApp Number (Country code ke saath, bina '+' ya spaces ke)
    const whatsappNumber = "971547372355";

    // Ek pyara aur professional message format taiyar karna
    const message = `*NEW BOOKING REQUEST - MUSHTAQ REPAIRING* \n\n` +
                    `👤 *Customer Name:* ${name}\n` +
                    `📞 *Phone Number:* ${phone}\n` +
                    `📍 *Location/City:* ${city}\n` +
                    `🛠️ *Service Required:* ${service}\n` +
                    `📝 *Issue Details:* ${issue}`;

    // Message ko URL format mein encode karna taaki WhatsApp samajh sake
    const encodedMessage = encodeURIComponent(message);

    // WhatsApp API ka link taiyar karna
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Screen par success message dikhana
    const alertBox = document.getElementById('formSuccessMessage');
    alertBox.style.display = 'block';
    alertBox.innerHTML = "Opening WhatsApp... Please send the pre-filled message to complete your booking.";

    // Form ko reset karna
    document.getElementById('repairContactForm').reset();

    // 1.5 seconds ke baad customer ko auto-redirect karna unke WhatsApp par
    setTimeout(() => {
        window.open(whatsappURL, '_blank');
    }, 1500);
});