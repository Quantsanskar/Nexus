// Initialize Vanta.js for 3D background effect
VANTA.GLOBE({
    el: "#background",
    mouseControls: true,
    touchControls: true,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    color: 0x0a66c2,
    color2: 0x0a66c2,
    backgroundColor: 0x000000
});

// Initialize EmailJS
(function () {
    emailjs.init("B7kIw1Kek9l4WyJwa"); // Replace with your EmailJS user ID
})();
const contactForm = document.getElementById('contact-form');

// Handle form submission
contactForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const emailParams = {
        to_email: "sanskarsrdav@gmail.com",
        from_name: formData.get('name'),
        from_email: formData.get('email'),
        phone: formData.get('phone'),
        message: formData.get('message'),
    };

    try {
        // Send email using EmailJS
        const emailResponse = await emailjs.send('service_btwf50p', 'template_jfai29o', emailParams);

        if (emailResponse.status === 200) {
            alert('Application submitted successfully!');
            contactForm.reset(); // Reset form fields
        } else {
            throw new Error('Failed to submit application');
        }
    } catch (error) {
        console.error('Error submitting application:', error);
        alert('There was an error submitting your application. Please try again.');
    }
});