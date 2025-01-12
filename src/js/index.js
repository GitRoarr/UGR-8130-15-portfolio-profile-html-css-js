document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-list a');

    function toggleMenu() {
        hamburger.classList.toggle('active');
        navList.classList.toggle('active');
    }

    function closeMenu() {
        hamburger.classList.remove('active');
        navList.classList.remove('active');
    }

    if (hamburger && navList) {
        hamburger.addEventListener('click', toggleMenu);
    }

    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', (e) => {
        if (
            navList.classList.contains('active') &&
            !navList.contains(e.target) &&
            !hamburger.contains(e.target)
        ) {
            closeMenu();
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 767) {
            closeMenu();
        }
    });

    window.onscroll = function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;

        const progressBar = document.getElementById("progressBar");
        if (progressBar) {
            progressBar.style.width = scrolled + "%";
        }
    };

    function setActiveLink() {
        const currentPage = window.location.pathname.split("/").pop();
        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    window.addEventListener('load', setActiveLink);
});