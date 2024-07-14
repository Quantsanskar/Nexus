document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    const signinForm = document.getElementById('signinForm');
    const switchFormLinks = document.querySelectorAll('.switch-form');
    const togglePasswordBtns = document.querySelectorAll('.toggle-password');

    // Switch between sign up and sign in forms
    switchFormLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetForm = link.getAttribute('data-form');
            document.querySelector('.form-wrapper.signup').style.display = targetForm === 'signup' ? 'block' : 'none';
            document.querySelector('.form-wrapper.signin').style.display = targetForm === 'signin' ? 'block' : 'none';
        });
    });

    // Toggle password visibility
    togglePasswordBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const passwordInput = btn.previousElementSibling;
            passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
        });
    });

    // Handle sign up form submission
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const firstName = signupForm.querySelector('input[placeholder="First Name"]').value;
        const lastName = signupForm.querySelector('input[placeholder="Last Name"]').value;
        const email = signupForm.querySelector('input[type="email"]').value;
        const password = signupForm.querySelector('input[type="password"]').value;

        // Simple client-side storage (not secure for production)
        localStorage.setItem('user', JSON.stringify({ firstName, lastName, email, password }));
        alert('Account created successfully! Please sign in.');
        signupForm.reset();
    });

    // Handle sign in form submission
    signinForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = signinForm.querySelector('input[type="email"]').value;
        const password = signinForm.querySelector('input[type="password"]').value;

        // Simple client-side authentication (not secure for production)
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser && storedUser.email === email && storedUser.password === password) {
            alert('Signed in successfully!');
            signinForm.reset();
        } else {
            alert('Invalid email or password.');
        }
    });
});