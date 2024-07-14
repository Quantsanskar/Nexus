// Generate 100 sample job listings
const jobs = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    title: `Job Title ${i + 1}`,
    company: `Company ${i + 1}`,
    location: `City ${i + 1}, State`,
    description: `This is a description for Job ${i + 1}. It includes details about the role and responsibilities.`,
    requirements: `Requirements for Job ${i + 1} include relevant skills and experience.`,
    salary: `$${Math.floor(Math.random() * 50000) + 50000} - $${Math.floor(Math.random() * 50000) + 100000}`,
    type: ['Full-time', 'Part-time', 'Contract'][Math.floor(Math.random() * 3)],
    experienceLevel: ['Entry Level', 'Mid-Level', 'Senior Level'][Math.floor(Math.random() * 3)],
    datePosted: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
}));

function createJobCard(job) {
    const jobCard = document.createElement('div');
    jobCard.className = 'job-card';
    jobCard.innerHTML = `
        <h3>${job.title}</h3>
        <p><strong>${job.company}</strong> - ${job.location}</p>
        <p>${job.description.substring(0, 100)}...</p>
        <p><strong>Salary:</strong> ${job.salary}</p>
        <p><strong>Job Type:</strong> ${job.type}</p>
        <p><strong>Experience Level:</strong> ${job.experienceLevel}</p>
        <p><strong>Posted:</strong> ${job.datePosted}</p>
        <button onclick="showJobDetails(${job.id})">View Details</button>
    `;
    return jobCard;
}

function displayJobs() {
    const jobList = document.getElementById('job-list');
    jobList.innerHTML = '';
    jobs.forEach(job => {
        jobList.appendChild(createJobCard(job));
    });
}

function showJobDetails(jobId) {
    const job = jobs.find(j => j.id === jobId);
    if (job) {
        alert(`
            ${job.title} at ${job.company}
            Location: ${job.location}
            Description: ${job.description}
            Requirements: ${job.requirements}
            Salary: ${job.salary}
            Job Type: ${job.type}
            Experience Level: ${job.experienceLevel}
            Posted: ${job.datePosted}
        `);
    }
}

function initBackground() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('background').appendChild(renderer.domElement);

    const geometry = new THREE.PlaneGeometry(20, 20, 20, 20);
    const material = new THREE.MeshBasicMaterial({
        color: 0x0a66c2,
        wireframe: true
    });
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    camera.position.z = 5;

    function animate() {
        requestAnimationFrame(animate);
        plane.rotation.x += 0.001;
        plane.rotation.y += 0.001;
        renderer.render(scene, camera);
    }
    animate();
}

document.addEventListener('DOMContentLoaded', () => {
    displayJobs();
    initBackground();

    // Add event listeners for filters
    document.getElementById('date-posted').addEventListener('change', displayJobs);
    document.getElementById('experience-level').addEventListener('change', displayJobs);
    document.getElementById('job-type').addEventListener('change', displayJobs);

    // Add event listener for search button
    document.getElementById('search-button').addEventListener('click', () => {
        const keyword = document.getElementById('job-search').value.toLowerCase();
        const location = document.getElementById('location-search').value.toLowerCase();
        const filteredJobs = jobs.filter(job =>
            (job.title.toLowerCase().includes(keyword) ||
                job.company.toLowerCase().includes(keyword) ||
                job.description.toLowerCase().includes(keyword)) &&
            job.location.toLowerCase().includes(location)
        );
        displayFilteredJobs(filteredJobs);
    });
});

function displayFilteredJobs(filteredJobs) {
    const jobList = document.getElementById('job-list');
    jobList.innerHTML = '';
    filteredJobs.forEach(job => {
        jobList.appendChild(createJobCard(job));
    });
}