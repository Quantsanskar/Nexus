document.addEventListener('DOMContentLoaded', function () {
    // Initialize Vanta.js background
    VANTA.NET({
        el: "#background",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0x3fa9f5,
        backgroundColor: 0xf0f0f0,
        points: 20.00,
        maxDistance: 30.00,
        spacing: 15.00
    });

    const job = JSON.parse(localStorage.getItem('selectedJob'));
    if (!job) {
        window.location.href = 'employeedashboard.html';
        return;
    }

    document.getElementById('job-title').textContent = job.title;
    document.getElementById('company').textContent = `Company: ${job.company}`;
    document.getElementById('location').textContent = `Location: ${job.location}`;
    document.getElementById('salary').textContent = `Salary Range: ${job.salary}`;
    document.getElementById('description').textContent = `This is a fantastic opportunity for a ${job.title} to join ${job.company} in ${job.location}. We're looking for a motivated individual to contribute to our growing team.`;

    const applicationForm = document.getElementById('job-application');
    applicationForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const fullName = document.getElementById('full-name').value;
        const email = document.getElementById('email').value;
        const coverLetter = document.getElementById('cover-letter').value;

        if (fullName && email && coverLetter) {
            alert('Application submitted successfully!');
            applicationForm.reset();
        } else {
            alert('Please fill out all fields before submitting.');
        }
    });

    const sendToRecruiterBtn = document.getElementById('send-to-recruiter');
    sendToRecruiterBtn.addEventListener('click', function () {
        const message = document.getElementById('recruiter-message').value;
        if (message.trim() !== '') {
            alert('Message sent to recruiter!');
            document.getElementById('recruiter-message').value = '';
        } else {
            alert('Please enter a message before sending.');
        }
    });
});