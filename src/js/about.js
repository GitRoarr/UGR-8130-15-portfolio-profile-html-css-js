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

hamburger.addEventListener('click', toggleMenu);
navLinks.forEach(link => link.addEventListener('click', closeMenu));

document.addEventListener('click', (e) => {
    if (navList.classList.contains('active') &&
        !navList.contains(e.target) &&
        !hamburger.contains(e.target)) {
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
    document.getElementById("progressBar ").style.width = scrolled + "% ";
};

function setActiveLink() {
    const currentPage = window.location.pathname.split("/ ").pop();
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

window.addEventListener('load', setActiveLink);

class Slider {
    constructor(container) {
        this.container = container;
        this.slider = container.querySelector('.slider');
        this.slides = container.querySelectorAll('.slide');
        this.prevBtn = container.querySelector('.prev-btn');
        this.nextBtn = container.querySelector('.next-btn');
        this.nav = container.querySelector('.slider-nav');
        this.currentSlide = 0;
        this.slideCount = this.slides.length;

        this.init();
    }

    init() {
        this.slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('slider-dot');
            dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
            dot.addEventListener('click', () => this.goToSlide(index));
            this.nav.appendChild(dot);
        });

        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());

        let touchStartX = 0;
        let touchEndX = 0;

        this.slider.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        });

        this.slider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].clientX;
            if (touchStartX - touchEndX > 50) {
                this.nextSlide();
            }
            if (touchStartX - touchEndX < -50) {
                this.prevSlide();
            }
        });

        // Initialize first slide
        this.updateSlider();
    }

    updateSlider() {
        this.slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === this.currentSlide);
        });

        const dots = this.nav.querySelectorAll('.slider-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });

        const slideWidth = this.slides[0].offsetWidth;
        this.slider.style.transform = `translateX(-${this.currentSlide * (slideWidth + 32)}px)`;
    }

    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.slideCount) % this.slideCount;
        this.updateSlider();
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.slideCount;
        this.updateSlider();
    }

    goToSlide(index) {
        this.currentSlide = index;
        this.updateSlider();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const sliders = document.querySelectorAll('.slider-container');
    sliders.forEach(container => new Slider(container));
});