// Initialize Vanta.js background
VANTA.WAVES({
    el: "#vanta-background",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    color: 0x0077be,
    shininess: 60.00,
    waveHeight: 20.00,
    waveSpeed: 1.00,
    zoom: 0.65
});

// Lazy loading for video placeholders
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.video-placeholder').forEach(placeholder => {
    observer.observe(placeholder);
});

// Add more interactivity as needed