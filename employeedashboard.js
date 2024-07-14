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

    const employee = JSON.parse(localStorage.getItem('currentEmployee'));
    if (!employee) {
        window.location.href = 'index.html';
        return;
    }

    document.getElementById('employee-name').textContent = employee.name;
    document.getElementById('employee-position').textContent = employee.position;
    document.getElementById('employee-department').textContent = employee.department;
    document.getElementById('employee-joined').textContent = employee.joined;

    const logoutBtn = document.getElementById('logout-btn');
    logoutBtn.addEventListener('click', function () {
        localStorage.removeItem('currentEmployee');
        window.location.href = 'index.html';
    });

    const uploadButton = document.getElementById('upload-button');
    uploadButton.addEventListener('click', function () {
        const fileInput = document.getElementById('resume-file');
        if (fileInput.files.length > 0) {
            document.getElementById('current-resume').textContent = `Current Resume: ${fileInput.files[0].name}`;
            alert('Resume uploaded successfully!');
            fileInput.value = '';
        } else {
            alert('Please select a file first.');
        }
    });

    const sendMessageButton = document.getElementById('send-message');
    sendMessageButton.addEventListener('click', function () {
        const messageContent = document.getElementById('message-content').value;
        if (messageContent.trim() !== '') {
            const messageList = document.getElementById('message-list');
            const messageElement = document.createElement('p');
            messageElement.textContent = `You: ${messageContent}`;
            messageList.appendChild(messageElement);
            document.getElementById('message-content').value = '';
        } else {
            alert('Please enter a message.');
        }
    });

    // Simulated job listings
    const jobListings = [
        { id: 1, title: 'Senior Software Engineer', company: 'TechCorp', location: 'San Francisco, CA', salary: '$120,000 - $150,000' },
        { id: 2, title: 'Digital Marketing Specialist', company: 'AdAgency', location: 'New York, NY', salary: '$70,000 - $90,000' },
        { id: 3, title: 'Data Scientist', company: 'DataCo', location: 'Seattle, WA', salary: '$100,000 - $130,000' },
        { id: 4, title: 'Project Manager', company: 'BuildIt Inc.', location: 'Chicago, IL', salary: '$80,000 - $110,000' },
        { id: 5, title: 'UX/UI Designer', company: 'DesignStudio', location: 'Los Angeles, CA', salary: '$90,000 - $120,000' }
    ];

    const jobList = document.getElementById('job-list');
    jobListings.forEach(job => {
        const li = document.createElement('li');
        li.textContent = `${job.title} - ${job.company}`;
        li.addEventListener('click', function () {
            localStorage.setItem('selectedJob', JSON.stringify(job));
            window.location.href = 'job-details.html';
        });
        jobList.appendChild(li);
    });
});