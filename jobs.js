document.addEventListener('DOMContentLoaded', function () {
    init();
});

const categories = [
    { name: "Marketing", vacancies: 123, icon: "📊" },
    { name: "Customer Service", vacancies: 123, icon: "🎧" },
    { name: "Human Resource", vacancies: 123, icon: "👥" },
    { name: "Project Management", vacancies: 123, icon: "📅" },
    { name: "Business Development", vacancies: 123, icon: "💼" },
    { name: "Sales & Communication", vacancies: 123, icon: "🤝" },
    { name: "Teaching & Education", vacancies: 123, icon: "🎓" },
    { name: "Design & Creative", vacancies: 123, icon: "🎨" },
];

const jobs = [
    {
        id: 1,
        title: "Software Engineer",
        company: "TechCom",
        location: "New York, USA",
        type: "Full Time",
        salary: "$123 - $456",
        date: "01 Jan, 2045"
    },
    {
        id: 2,
        title: "Marketing Manager",
        company: "International",
        location: "New York, USA",
        type: "Full Time",
        salary: "$123 - $456",
        date: "01 Jan, 2045"
    },
    {
        id: 3,
        title: "Product Designer",
        company: "DataChange",
        location: "New York, USA",
        type: "Full Time",
        salary: "$123 - $456",
        date: "01 Jan, 2045"
    },
    // Add more jobs...
];

function populateCategories() {
    const grid = document.getElementById('category-grid');
    if (grid) {
        grid.innerHTML = ''; // Clear existing content
        categories.forEach(category => {
            const card = document.createElement('div');
            card.className = 'category-card';
            card.innerHTML = `
                <div class="category-icon">${category.icon}</div>
                <h3>${category.name}</h3>
                <p>${category.vacancies} Vacancy</p>
            `;
            grid.appendChild(card);
        });
    }
}

function populateJobs(filter = 'all') {
    const list = document.getElementById('job-list');
    if (list) {
        list.innerHTML = ''; // Clear existing content
        const filteredJobs = filter === 'all' ? jobs : jobs.filter(job => job.type.toLowerCase() === filter);
        filteredJobs.forEach(job => {
            const card = document.createElement('div');
            card.className = 'job-card';
            card.innerHTML = `
                <h3>${job.title}</h3>
                <p>${job.company}</p>
                <div class="job-details">
                    <span><i>📍</i>${job.location}</span>
                    <span><i>🕒</i>${job.type}</span>
                    <span><i>💰</i>${job.salary}</span>
                </div>
                <button class="apply-btn" onclick="location.href='job-detail.html?id=${job.id}'">Apply Now</button>
            `;
            list.appendChild(card);
        });
    }
}

function setupJobFilters() {
    const filterButtons = document.querySelectorAll('#job-filters button');
    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            populateJobs(this.textContent.toLowerCase());
        });
    });
}

function populateJobDetail() {
    const detailSection = document.getElementById('job-detail');
    if (detailSection) {
        const urlParams = new URLSearchParams(window.location.search);
        const jobId = urlParams.get('id');
        const job = jobs.find(j => j.id === parseInt(jobId));
        if (job) {
            detailSection.innerHTML = `
                <h2>${job.title}</h2>
                <p>Company: ${job.company}</p>
                <p>Location: ${job.location}</p>
                <p>Type: ${job.type}</p>
                <p>Salary: ${job.salary}</p>
                <p>Posted: ${job.date}</p>
                <h3>Job Description</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <h3>Responsibilities</h3>
                <ul>
                    <li>Responsibility 1</li>
                    <li>Responsibility 2</li>
                    <li>Responsibility 3</li>
                </ul>
                <h3>Qualifications</h3>
                <ul>
                    <li>Qualification 1</li>
                    <li>Qualification 2</li>
                    <li>Qualification 3</li>
                </ul>
                <h3>Apply for this job</h3>
                <form id="application-form" class="application-form">
                    <div class="form-group">
                        <label for="name">Your Name</label>
                        <input type="text" id="name" name="name" required>
                    </div>
                    <div class="form-group">
                        <label for="email">Your Email</label>
                        <input type="email" id="email" name="email" required>
                    </div>
                    <div class="form-group">
                        <label for="portfolio">Portfolio Website</label>
                        <input type="url" id="portfolio" name="portfolio">
                    </div>
                    <div class="form-group">
                        <label for="coverletter">Cover Letter</label>
                        <textarea id="coverletter" name="coverletter" rows="5" required></textarea>
                    </div>
                    <button type="submit" class="apply-btn">Submit Application</button>
                </form>
            `;
            setupApplicationForm();
        } else {
            detailSection.innerHTML = '<p class="error-message">Job not found.</p>';
        }
    }
}

function setupApplicationForm() {
    const form = document.getElementById('application-form');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            // In a real application, you would send this data to a server
            alert('Application submitted successfully!');
            form.reset();
        });
    }
}

function init() {
    if (document.getElementById('category-grid')) {
        populateCategories();
    } else if (document.getElementById('job-list')) {
        populateJobs();
        setupJobFilters();
    } else if (document.getElementById('job-detail')) {
        populateJobDetail();
    }
}
