// Form Data Store in Database & Redirect to WhatsApp
document.getElementById('repairContactForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Page refresh hone se rokta hai

    // Form data collect karna
    const name = document.getElementById('fullName').value;
    const phone = document.getElementById('phoneNumber').value;
    const city = document.getElementById('serviceCity').value;
    const service = document.getElementById('applianceType').value;
    const issue = document.getElementById('issueDetails').value;

    // AJAX / Fetch API ke zariye data 'insert.php' ko bhejna (Database mein save karne ke liye)
    const formData = new FormData();
    formData.append('fullname', name);
    formData.append('phone', phone);
    formData.append('city', city);
    formData.append('service', service);
    formData.append('issue', issue);

    const alertBox = document.getElementById('formSuccessMessage');
    alertBox.style.display = 'block';
    alertBox.style.backgroundColor = '#d1ecf1';
    alertBox.style.color = '#0c5460';
    alertBox.innerHTML = "<i class='fa-solid fa-spinner fa-spin'></i> Saving booking securely & opening WhatsApp...";

    fetch('insert.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if(data.status === 'success') {
            // WhatsApp Message Format Setup
            const whatsappNumber = "971547372355";
            const message = `*NEW BOOKING LOGGED & SAVED* \n\n` +
                            `👤 *Name:* ${name}\n` +
                            `📞 *Phone:* ${phone}\n` +
                            `📍 *City:* ${city}\n` +
                            `🛠️ *Service:* ${service}\n` +
                            `📝 *Issue:* ${issue}`;

            const encodedMessage = encodeURIComponent(message);
            const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

            // Form reset karna
            document.getElementById('repairContactForm').reset();

            // 1.5 seconds ke baad WhatsApp open karna
            setTimeout(() => {
                window.open(whatsappURL, '_blank');
                alertBox.style.backgroundColor = '#d4edda';
                alertBox.style.color = '#155724';
                alertBox.innerHTML = "<i class='fa-solid fa-circle-check'></i> Booking saved in database and sent to WhatsApp!";
            }, 1500);
        } else {
            alertBox.style.backgroundColor = '#f8d7da';
            alertBox.style.color = '#721c24';
            alertBox.innerHTML = "Error saving data. Please contact via direct WhatsApp.";
        }
    })
    .catch(error => {
        console.error('Error:', error);
        // Agar database down bhi ho, tab bhi client ko direct WhatsApp par bhej diya jaye
        window.open(`https://wa.me/971547372355?text=${encodeURIComponent(name + ' - ' + service)}`, '_blank');
    });
});
document.querySelectorAll(".faq-question").forEach(button => {
    button.addEventListener("click", () => {
        const item = button.parentElement;

        // close others (optional nice UX)
        document.querySelectorAll(".faq-item").forEach(faq => {
            if (faq !== item) faq.classList.remove("active");
        });

        item.classList.toggle("active");
    });
});
