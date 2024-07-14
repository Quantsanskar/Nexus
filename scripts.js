document.addEventListener('DOMContentLoaded', function () {
    const featuredJobs = [
        { title: "Senior Software Engineer", company: "Tech Giants Inc.", location: "San Francisco, CA", type: "Full-time", salary: "$120k - $160k" },
        { title: "Marketing Manager", company: "Brand Builders Co.", location: "New York, NY", type: "Full-time", salary: "$80k - $100k" },
        { title: "UX/UI Designer", company: "Creative Designs Ltd.", location: "London, UK", type: "Contract", salary: "£400 per day" },
        { title: "Data Scientist", company: "Data Insights Corp.", location: "Boston, MA", type: "Full-time", salary: "$100k - $130k" },
        { title: "Sales Representative", company: "Global Sales Pro", location: "Chicago, IL", type: "Full-time", salary: "$60k + commission" },
        { title: "Frontend Developer", company: "Web Wizards Inc.", location: "Austin, TX", type: "Remote", salary: "$90k - $120k" },
    ];

    const jobGrid = document.querySelector('.jobGrid');
    const modalOverlay = document.getElementById('applicationModal');
    const jobTitleElement = document.getElementById('jobTitle');
    const applicationForm = document.getElementById('applicationForm');

    function generateJobCards() {
        jobGrid.innerHTML = '';

        featuredJobs.forEach((job) => {
            const jobCard = document.createElement('div');
            jobCard.classList.add('jobCard');

            jobCard.innerHTML = `
                <h3>${job.title}</h3>
                <p class="company">${job.company}</p>
                <p class="location">${job.location}</p>
                <div class="jobDetails">
                    <span class="jobType">${job.type}</span>
                    <span class="salary">${job.salary}</span>
                </div>
                <button class="applyButton">Apply Now</button>
            `;
            const applyButton = jobCard.querySelector('.applyButton');
            applyButton.addEventListener('click', () => openModal(job));

            jobGrid.appendChild(jobCard);
        });
    }

    generateJobCards();

    function openModal(job) {
        jobTitleElement.textContent = job.title;
        modalOverlay.style.display = 'flex';
    }

    function closeModal() {
        modalOverlay.style.display = 'none';
        applicationForm.reset();
    }

    window.closeModal = closeModal; // Make closeModal accessible globally

    applicationForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const formData = new FormData(applicationForm);
        const emailParams = {
            to_email: "sanskarsrdav@gmail.com",
            from_name: formData.get('name'),
            from_email: formData.get('email'),
            job_title: jobTitleElement.textContent,
            phone: formData.get('phone'),
            message: formData.get('coverLetter'),
        };

        try {
            // Initialize EmailJS with your user ID
            emailjs.init("B7kIw1Kek9l4WyJwa"); // Replace with your actual EmailJS user ID

            // Send email using EmailJS
            const emailResponse = await emailjs.send('service_btwf50p', 'template_jfai29o', emailParams);

            if (emailResponse.status === 200) {
                alert('Application submitted successfully!');
                closeModal();
            } else {
                throw new Error('Failed to submit application');
            }
        } catch (error) {
            console.error('Error submitting application:', error);
            alert('There was an error submitting your application. Please try again.');
        }
    });

    const loadMoreButton = document.querySelector('.loadMoreButton');
    loadMoreButton.addEventListener('click', () => {
        console.log('Load more jobs clicked');
        // Implement logic to load more jobs here
    });

    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav');
    const body = document.body;
    const contentOverlay = document.createElement('div');
    contentOverlay.classList.add('content-overlay');
    body.appendChild(contentOverlay);

    hamburger.addEventListener('click', () => {
        nav.classList.toggle('active');
        body.classList.toggle('menu-open');
    });

    contentOverlay.addEventListener('click', () => {
        nav.classList.remove('active');
        body.classList.remove('menu-open');
    });
});