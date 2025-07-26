document.addEventListener('DOMContentLoaded', function() {
    // --- Countdown Timer ---
    const countdownElement = document.getElementById('countdown');
    const weddingDate = new Date('April 01, 2028 09:00:00').getTime(); // Ganti tanggal dan waktu pernikahan Anda

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        // Calculate days, hours, minutes, and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElement.innerHTML = `
            <div class="countdown-item">
                <span>${days}</span>
                <p>Hari</p>
            </div>
            <div class="countdown-item">
                <span>${hours}</span>
                <p>Jam</p>
            </div>
            <div class="countdown-item">
                <span>${minutes}</span>
                <p>Menit</p>
            </div>
            <div class="countdown-item">
                <span>${seconds}</span>
                <p>Detik</p>
            </div>
        `;

        // If the countdown is over, display a message
        if (distance < 0) {
            clearInterval(countdownInterval);
            countdownElement.innerHTML = "<p>Hari Bahagia Telah Tiba!</p>";
        }
    }

    // Update the countdown every 1 second
    const countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial call to display immediately


    // --- RSVP Form Handling ---
    const rsvpForm = document.getElementById('rsvpForm');
    const attendanceSelect = document.getElementById('attendance');
    const guestsAttendingGroup = document.getElementById('guestsAttendingGroup');
    const rsvpMessage = document.getElementById('rsvpMessage');

    // Show/hide guests attending input based on attendance
    attendanceSelect.addEventListener('change', function() {
        if (this.value === 'yes') {
            guestsAttendingGroup.style.display = 'block';
            document.getElementById('guestsAttending').setAttribute('required', 'required');
        } else {
            guestsAttendingGroup.style.display = 'none';
            document.getElementById('guestsAttending').removeAttribute('required');
        }
    });

    rsvpForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        const guestName = document.getElementById('guestName').value;
        const attendance = document.getElementById('attendance').value;
        const guestsAttending = document.getElementById('guestsAttending').value;
        const message = document.getElementById('message').value;

        let confirmationText = `Konfirmasi RSVP dari: ${guestName}\n`;
        if (attendance === 'yes') {
            confirmationText += `Akan Hadir: Ya, sejumlah ${guestsAttending} orang.\n`;
        } else if (attendance === 'no') {
            confirmationText += `Akan Hadir: Tidak bisa hadir.\n`;
        } else {
            rsvpMessage.textContent = "Mohon pilih status kehadiran Anda.";
            rsvpMessage.style.color = "red";
            return;
        }

        if (message) {
            confirmationText += `Pesan/Doa: ${message}\n`;
        }

        // --- Send data (simplified for front-end only) ---
        // In a real scenario, you would send this data to a backend server (e.g., using Fetch API, AJAX)
        // or integrate with a service like Google Forms, Formspree, or a custom serverless function.

        // For this example, we'll just log to console and show a success message.
        const whatsappMsg = encodeURIComponent(confirmationText);
        window.open(`https://wa.me/6289516792463?text=${whatsappMsg}`, '_blank');

        console.log("RSVP Submitted:", confirmationText);

        // Display success message
        rsvpMessage.textContent = "Terima kasih! Konfirmasi Anda telah terkirim.";
        rsvpMessage.style.color = "green";
        rsvpForm.reset(); // Clear the form
        guestsAttendingGroup.style.display = 'none'; // Hide guests field again
    });

    // --- Smooth Scrolling for Navigation Links ---
    document.querySelectorAll('.nav-links a, .hero-section .btn').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - document.querySelector('.header').offsetHeight, // Adjust for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Highlight active nav link on scroll ---
    const sections = document.querySelectorAll('section');
    const navLi = document.querySelectorAll('.nav-links li a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - document.querySelector('.header').offsetHeight;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLi.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    });

    // --- Simple alert for "Kirim Doa" button ---
    const doaButton = document.querySelector('.doa-form .btn');
    if (doaButton) {
        doaButton.addEventListener('click', function() {
            const doaMessage = document.getElementById('doaMessage').value;
            if (doaMessage.trim() !== "") {
                alert('Terima kasih atas doa tulus Anda! Pesan: "' + doaMessage + '"');
                document.getElementById('doaMessage').value = ""; // Clear textarea
            } else {
                alert('Mohon tulis doa Anda terlebih dahulu.');
            }
        });
    }

});