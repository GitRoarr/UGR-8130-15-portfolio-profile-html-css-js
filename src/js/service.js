function toggleMenu() {
    const nav = document.querySelector('.nav-list');
    const body = document.body;
    const hamburger = document.querySelector('.hamburger');
    const closeMenu = document.querySelector('.close-menu');

    nav.classList.toggle('active');
    body.classList.toggle('menu-open');

    const isOpen = nav.classList.contains('active');
    hamburger.setAttribute('aria-expanded', isOpen);

    if (isOpen) {
        hamburger.style.display = 'none';
        closeMenu.style.display = 'block';
        trapFocus(nav);
    } else {
        hamburger.style.display = 'block';
        closeMenu.style.display = 'none';
    }
}

document.querySelector('.hamburger').addEventListener('click', toggleMenu);
document.querySelector('.close-menu').addEventListener('click', toggleMenu);
document.querySelectorAll('.nav-list a').forEach(link => {
    link.addEventListener('click', toggleMenu);
});

function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select'
    );
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            toggleMenu();
            return;
        }

        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                }
            }
        }
    });

    firstFocusableElement.focus();
}

// Progress bar
window.onscroll = function() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById("progressBar").style.width = scrolled + "%";
};
window.addEventListener('resize', function() {
    if (window.innerWidth >= 768) {
        const nav = document.querySelector('.nav-list');
        const body = document.body;
        nav.classList.remove('active');
        body.classList.remove('menu-open');
    }
});