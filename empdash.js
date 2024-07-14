// Sample data
const jobs = [
    { id: 1, title: 'Software Engineer', company: 'Tech Co', location: 'San Francisco', experience: 'Mid' },
    { id: 2, title: 'Data Analyst', company: 'Data Corp', location: 'New York', experience: 'Entry' },
    { id: 3, title: 'Product Manager', company: 'Innovate Inc', location: 'London', experience: 'Senior' },
    { id: 4, title: 'UX Designer', company: 'Design Studio', location: 'New York', experience: 'Mid' },
    { id: 5, title: 'Marketing Specialist', company: 'Brand Co', location: 'San Francisco', experience: 'Entry' },
];

const profiles = [
    { id: 1, name: 'John Doe', role: 'Recruiter', company: 'Tech Recruiter Inc', location: 'New York' },
    { id: 2, name: 'Jane Smith', role: 'HR Manager', company: 'Global Staffing', location: 'London' },
    { id: 3, name: 'Mike Johnson', role: 'Software Engineer', company: 'Tech Co', location: 'San Francisco' },
    { id: 4, name: 'Emily Brown', role: 'Data Scientist', company: 'Data Corp', location: 'New York' },
    { id: 5, name: 'Chris Lee', role: 'UX Designer', company: 'Design Studio', location: 'San Francisco' },
];

// DOM elements
const jobsBtn = document.getElementById('jobsBtn');
const profilesBtn = document.getElementById('profilesBtn');
const myProfileBtn = document.getElementById('myProfileBtn');
const jobsSection = document.getElementById('jobsSection');
const profilesSection = document.getElementById('profilesSection');
const myProfileSection = document.getElementById('myProfileSection');
const jobListings = document.getElementById('jobListings');
const profileList = document.getElementById('profileList');
const searchInput = document.getElementById('searchInput');
const locationFilter = document.getElementById('locationFilter');
const experienceFilter = document.getElementById('experienceFilter');
const applyFiltersBtn = document.getElementById('applyFilters');
const saveProfileBtn = document.getElementById('saveProfile');
const applicationModal = document.getElementById('applicationModal');
const profileModal = document.getElementById('profileModal');
const closeModals = document.getElementsByClassName('close');

// Navigation
function showSection(section) {
    [jobsSection, profilesSection, myProfileSection].forEach(s => s.classList.remove('active'));
    section.classList.add('active');
    [jobsBtn, profilesBtn, myProfileBtn].forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
}

jobsBtn.addEventListener('click', () => showSection(jobsSection));
profilesBtn.addEventListener('click', () => showSection(profilesSection));
myProfileBtn.addEventListener('click', () => showSection(myProfileSection));

// Job listings
function displayJobs(jobsToDisplay) {
    jobListings.innerHTML = '';
    jobsToDisplay.forEach(job => {
        const jobCard = document.createElement('div');
        jobCard.className = 'job-card';
        jobCard.innerHTML = `
            <h3>${job.title}</h3>
            <p>${job.company}</p>
            <p>Location: ${job.location}</p>
            <p>Experience: ${job.experience}</p>
            <button onclick="openApplicationModal(${job.id})">Apply</button>
        `;
        jobListings.appendChild(jobCard);
    });
}

function filterJobs() {
    const searchTerm = searchInput.value.toLowerCase();
    const locationValue = locationFilter.value;
    const experienceValue = experienceFilter.value;

    const filteredJobs = jobs.filter(job =>
        (job.title.toLowerCase().includes(searchTerm) || job.company.toLowerCase().includes(searchTerm)) &&
        (locationValue === '' || job.location === locationValue) &&
        (experienceValue === '' || job.experience === experienceValue)
    );

    displayJobs(filteredJobs);
}

applyFiltersBtn.addEventListener('click', filterJobs);

// Profiles
function displayProfiles() {
    profileList.innerHTML = '';
    profiles.forEach(profile => {
        const profileCard = document.createElement('div');
        profileCard.className = 'profile-card';
        profileCard.innerHTML = `
            <h3>${profile.name}</h3>
            <p>${profile.role}</p>
            <p>${profile.company}</p>
            <p>Location: ${profile.location}</p>
            <button onclick="openProfileModal(${profile.id})">View Profile</button>
        `;
        profileList.appendChild(profileCard);
    });
}

function openProfileModal(profileId) {
    const profile = profiles.find(p => p.id === profileId);
    const modalContent = document.getElementById('profileModalContent');
    modalContent.innerHTML = `
        <h2>${profile.name}</h2>
        <p><strong>Role:</strong> ${profile.role}</p>
        <p><strong>Company:</strong> ${profile.company}</p>
        <p><strong>Location:</strong> ${profile.location}</p>
    `;
    profileModal.style.display = 'block';
}

// My Profile
function loadMyProfile() {
    const profileFields = ['fullName', 'email', 'phone', 'location', 'experience', 'skills', 'bio'];
    profileFields.forEach(field => {
        const element = document.getElementById(field);
        element.value = localStorage.getItem(field) || '';
    });
}

function saveMyProfile() {
    const profileFields = ['fullName', 'email', 'phone', 'location', 'experience', 'skills', 'bio'];
    profileFields.forEach(field => {
        const element = document.getElementById(field);
        localStorage.setItem(field, element.value);
    });
    alert('Profile saved successfully!');
}

saveProfileBtn.addEventListener('click', saveMyProfile);

// Application modal
function openApplicationModal(jobId) {
    const job = jobs.find(j => j.id === jobId);
    document.getElementById('jobTitle').textContent = job.title;
    applicationModal.style.display = 'block';
}

// Close modals
Array.from(closeModals).forEach(close => {
    close.onclick = function () {
        applicationModal.style.display = 'none';
        profileModal.style.display = 'none';
    }
});

window.onclick = function (event) {
    if (event.target == applicationModal) {
        applicationModal.style.display = 'none';
    }
    if (event.target == profileModal) {
        profileModal.style.display = 'none';
    }
}

// Handle application form submission
document.getElementById('applicationForm').onsubmit = function (e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log('Application submitted:', Object.fromEntries(formData));
    alert('Application submitted successfully!');
    applicationModal.style.display = 'none';
    e.target.reset();
}

// Initialize
displayJobs(jobs);
displayProfiles();
loadMyProfile();

// Background animation
function createStar() {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDuration = `${Math.random() * 3 + 2}s`;
    document.getElementById('bg-animation').appendChild(star);

    setTimeout(() => {
        star.remove();
    }, 5000);
}

setInterval(createStar, 200);