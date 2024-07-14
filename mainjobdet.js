document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const jobId = urlParams.get('id');

    if (jobId) {
        fetchJobDetails(jobId);
    } else {
        document.getElementById('jobDetails').innerHTML = '<p>Job not found.</p>';
    }

    document.getElementById('jobApplicationForm').addEventListener('submit', handleApplicationSubmit);
});

function fetchJobDetails(jobId) {
    // In a real application, you would fetch the job details from a server
    // For this example, we'll use the sample data from the main page
    const job = jobs.find(j => j.id === parseInt(jobId));

    if (job) {
        displayJobDetails(job);
    } else {
        document.getElementById('jobDetails').innerHTML = '<p>Job not found.</p>';
    }
}

function displayJobDetails(job) {
    const jobDetailsElement = document.getElementById('jobDetails');
    jobDetailsElement.innerHTML = `
        <h2>${job.title}</h2>
        <h3>${job.company}</h3>
        <p><strong>Location:</strong> ${job.location}</p>
        <p><strong>Salary:</strong> ${job.salary}</p>
        <p><strong>Job Type:</strong> ${job.type}</p>
        <p><strong>Experience Level:</strong> ${job.experience}</p>
        <p><strong>Industry:</strong> ${job.industry}</p>
        <p><strong>Remote Work:</strong> ${job.remote}</p>
        <p><strong>Posted Date:</strong> ${formatDate(job.postedDate)}</p>
        <h4>Job Description:</h4>
        <p>${job.description}</p>
    `;
}

function handleApplicationSubmit(event) {
    event.preventDefault();
    // Here you would typically send the form data to a server
    // For this example, we'll just log it to the console
    console.log('Application submitted:', new FormData(event.target));
    alert('Application submitted successfully!');
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

// Sample job data
const jobs = [
    {
        id: 1,
        title: "Senior Netrunner",
        company: "CyberTech Solutions",
        location: "Neo Tokyo",
        description: "We're seeking an experienced netrunner to lead our team in developing cutting-edge neural interfaces...",
        salary: "₿150,000 - ₿200,000",
        type: "Full Neural Link",
        experience: "Shadowrunner",
        industry: "Cybernetics",
        remote: "Virtual Link",
        postedDate: "2024-07-10",
        contactEmail: "hiring@cybertech.neo"
    },
    {
        id: 2,
        title: "AI Ethics Specialist",
        company: "Synth Corp",
        location: "New Shanghai",
        description: "Join our team to ensure ethical implementation of AI in augmented reality environments...",
        salary: "₿90,000 - ₿120,000",
        type: "Partial Link",
        experience: "Cyberpunk",
        industry: "AI Development",
        remote: "Hybrid Link",
        postedDate: "2024-07-09",
        contactEmail: "careers@synthcorp.net"
    },
    {
        id: 3,
        title: "Quantum Data Analyst",
        company: "QuantumMinds Ltd.",
        location: "Orbital Station Alpha",
        description: "We're looking for a talented quantum data analyst to work on groundbreaking projects in space...",
        salary: "₿120,000 - ₿180,000",
        type: "Full Neural Link",
        experience: "mid",
        industry: "tech",
        remote: "remote",
        postedDate: "2024-07-08",
        contactEmail: "jobs@aiinnovations.co.uk"
    },
    // Add more job objects as needed
];
