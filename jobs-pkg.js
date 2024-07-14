document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('registrationModal');
    const modalTitle = document.getElementById('modalTitle');
    const registrationForm = document.getElementById('registrationForm');

    // Initialize Vanta.js background
    VANTA.NET({
        el: "#vanta-bg",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0x4a90e2,
        backgroundColor: 0xffffff,
        points: 10.00,
        spacing: 15.00
    });

    const recruiterPackageButtons = document.querySelectorAll('.recruiterPackageButton');
    const employeePackageButtons = document.querySelectorAll('.employeePackageButton');

    recruiterPackageButtons.forEach(button => {
        button.addEventListener('click', function () {
            const packageType = this.getAttribute('data-package');
            openModal('recruiter', packageType);
        });
    });

    employeePackageButtons.forEach(button => {
        button.addEventListener('click', function () {
            const packageType = this.getAttribute('data-package');
            openModal('employee', packageType);
        });
    });

    function openModal(userType, packageType) {
        modal.style.display = 'flex';
        modalTitle.textContent = `Register as ${userType.charAt(0).toUpperCase() + userType.slice(1)} (${packageType} Package)`;
        registrationForm.innerHTML = `
            <div class="formGroup">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" required>
            </div>
            <div class="formGroup">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" required>
            </div>
            <div class="formActions">
                <button type="submit" class="submitButton">Submit</button>
            </div>
        `;
        registrationForm.onsubmit = function (event) {
            event.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // For simulation, you can store data in localStorage
            localStorage.setItem('user', JSON.stringify({ email, password, userType, packageType }));

            alert('Registration successful!');

            closeModal();
        };
    }

    function closeModal() {
        modal.style.display = 'none';
    }

    window.closeModal = closeModal;

    const loginLink = document.querySelector('#loginPrompt a');
    loginLink.addEventListener('click', function (event) {
        event.preventDefault();
        modalTitle.textContent = 'Login';
        registrationForm.innerHTML = `
            <div class="formGroup">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" required>
            </div>
            <div class="formGroup">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" required>
            </div>
            <div class="formActions">
                <button type="submit" class="submitButton">Login</button>
            </div>
        `;
        registrationForm.onsubmit = function (event) {
            event.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Retrieve user data from localStorage for simulation
            const storedUser = JSON.parse(localStorage.getItem('user'));

            if (storedUser && storedUser.email === email && storedUser.password === password) {
                alert('Login successful!');
                closeModal();
            } else {
                alert('Login failed. Please try again.');
            }
        };
    });
});
