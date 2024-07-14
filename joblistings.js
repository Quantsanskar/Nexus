// Sample job data
const jobs = [
    {
        id: 1,
        title: "Senior Software Engineer",
        company: "Tech Giants Inc.",
        location: "San Francisco, CA",
        description: "We're seeking an experienced software engineer to lead development of our cloud-based services...",
        salary: "$150,000 - $200,000",
        type: "fulltime",
        experience: "senior",
        industry: "tech",
        remote: "hybrid",
        postedDate: "2024-07-10",
        contactEmail: "hiring@techgiants.com"
    },
    {
        id: 2,
        title: "Marketing Manager",
        company: "Global Brands Co.",
        location: "New York, NY",
        description: "Join our dynamic marketing team to develop and execute marketing strategies for our global product lines...",
        salary: "$90,000 - $120,000",
        type: "fulltime",
        experience: "mid",
        industry: "retail",
        remote: "onsite",
        postedDate: "2024-07-09",
        contactEmail: "careers@globalbrands.com"
    },
    {
        id: 3,
        title: "Data Scientist",
        company: "AI Innovations Ltd.",
        location: "London, UK",
        description: "We're looking for a talented data scientist to work on cutting-edge AI projects...",
        salary: "£70,000 - £90,000",
        type: "contract",
        experience: "mid",
        industry: "tech",
        remote: "remote",
        postedDate: "2024-07-08",
        contactEmail: "jobs@aiinnovations.co.uk"
    },
    // Add more job objects as needed
];

let currentPage = 1;
const jobsPerPage = 10;

function displayJobs(jobsToShow = jobs) {
    const jobListings = document.getElementById('jobListings');
    jobListings.innerHTML = '';

    const startIndex = (currentPage - 1) * jobsPerPage;
    const endIndex = startIndex + jobsPerPage;
    const paginatedJobs = jobsToShow.slice(startIndex, endIndex);

    paginatedJobs.forEach(job => {
        const jobCard = document.createElement('div');
        jobCard.className = 'job-card';
        jobCard.innerHTML = `
            <h3>${job.title}</h3>
            <p><strong>${job.company}</strong> - ${job.location}</p>
            <p>Salary: ${job.salary}</p>
            <p>Job Type: ${job.type}</p>
            <p>Experience: ${job.experience}</p>
            <p>Remote: ${job.remote}</p>
            <p>Posted: ${formatDate(job.postedDate)}</p>
            <button onclick="showJobDetails(${job.id})">View Details</button>
        `;
        jobListings.appendChild(jobCard);
    });

    updatePagination(jobsToShow.length);
}

function updatePagination(totalJobs) {
    const totalPages = Math.ceil(totalJobs / jobsPerPage);
    document.getElementById('currentPage').textContent = `Page ${currentPage} of ${totalPages}`;
    document.getElementById('prevPage').disabled = currentPage === 1;
    document.getElementById('nextPage').disabled = currentPage === totalPages;
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

function searchJobs() {
    const keyword = document.getElementById('keyword').value.toLowerCase();
    const location = document.getElementById('location').value.toLowerCase();
    const industry = document.getElementById('industry').value;
    const jobType = document.getElementById('jobType').value;
    const experienceLevel = document.getElementById('experienceLevel').value;
    const salary = document.getElementById('salary').value;
    const remote = document.getElementById('remote').value;
    const postedDate = document.getElementById('postedDate').value;

    const filteredJobs = jobs.filter(job => {
        const matchKeyword = job.title.toLowerCase().includes(keyword) ||
            job.company.toLowerCase().includes(keyword) ||
            job.description.toLowerCase().includes(keyword);
        const matchLocation = job.location.toLowerCase().includes(location);
        const matchIndustry = !industry || job.industry === industry;
        const matchJobType = !jobType || job.type === jobType;
        const matchExperience = !experienceLevel || job.experience === experienceLevel;
        const matchRemote = !remote || job.remote === remote;

        // Salary filtering logic (simplified)
        const matchSalary = !salary || (
            salary === '0-50000' && parseInt(job.salary) < 50000 ||
            salary === '50000-100000' && parseInt(job.salary) >= 50000 && parseInt(job.salary) < 100000 ||
            salary === '100000-150000' && parseInt(job.salary) >= 100000 && parseInt(job.salary) < 150000 ||
            salary === '150000+' && parseInt(job.salary) >= 150000
        );

        // Posted date filtering logic
        const matchPostedDate = !postedDate || (
            postedDate === '24h' && new Date(job.postedDate) >= new Date(Date.now() - 24 * 60 * 60 * 1000) ||
            postedDate === '7d' && new Date(job.postedDate) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) ||
            postedDate === '30d' && new Date(job.postedDate) >= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        );

        return matchKeyword && matchLocation && matchIndustry && matchJobType &&
            matchExperience && matchSalary && matchRemote && matchPostedDate;
    });

    currentPage = 1;
    displayJobs(filteredJobs);
}

function showJobDetails(jobId) {
    window.location.href = `mainjobdet.html?id=${jobId}`;
}




function applyForJob(jobId) {
    const job = jobs.find(j => j.id === jobId);
    if (job) {
        // Here you would typically open a modal with an application form
        // For this example, we'll just show an alert
        alert(`To apply for "${job.title}" at ${job.company}, please send your resume to ${job.contactEmail}`);
    }
}

function changePage(direction) {
    if (direction === 'next' && currentPage < Math.ceil(jobs.length / jobsPerPage)) {
        currentPage++;
    } else if (direction === 'prev' && currentPage > 1) {
        currentPage--;
    }
    displayJobs();
}

// Event listeners
document.getElementById('prevPage').addEventListener('click', () => changePage('prev'));
document.getElementById('nextPage').addEventListener('click', () => changePage('next'));

// Initialize the page
displayJobs();

// Additional functions for sorting, etc. can be added here