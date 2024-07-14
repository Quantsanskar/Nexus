document.addEventListener('DOMContentLoaded', function () {





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