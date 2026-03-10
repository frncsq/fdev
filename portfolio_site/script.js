// Custom Cursor
const cursor = document.querySelector('.custom-cursor');
const cursorFollower = document.querySelector('.custom-cursor-follower');

// Keep track of cursor position
let cursorX = 0;
let cursorY = 0;
let followerX = 0;
let followerY = 0;

// Window On Load - Preloader and Hero Stagger
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        if (preloader) preloader.classList.add('fade-out');
        setTimeout(() => {
            // Trigger Hero staggering cinematic entrance
            const heroItems = document.querySelectorAll('.hero-anim');
            heroItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('visible');
                }, index * 180 + 200);
            });
        }, 600);
    }, 1200); // Enforced wait time to visually display loader
});

document.addEventListener('mousemove', (e) => {
    cursorX = e.clientX;
    cursorY = e.clientY;

    // Immediate for inner cursor
    cursor.style.transform = `translate3d(${cursorX - 4}px, ${cursorY - 4}px, 0)`;
});

// Follower loop for smooth delay
function animateCursor() {
    // Easing for follower
    followerX += (cursorX - followerX) * 0.15;
    followerY += (cursorY - followerY) * 0.15;

    cursorFollower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Hover effect for links and buttons
const interactables = document.querySelectorAll('a, button, .project-card, .tech-card, .service-glass-card, .achievement-glass-card');
interactables.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
        cursorFollower.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
        cursorFollower.classList.remove('hover');
    });
});

// Magnetic Buttons
const magneticBtns = document.querySelectorAll('.magnetic-btn');
magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', function (e) {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    btn.addEventListener('mouseleave', function () {
        btn.style.transform = `translate(0px, 0px)`;
    });
});

// 3D Tilt Cards
const tiltCards = document.querySelectorAll('.tilt-card');
tiltCards.forEach(card => {
    card.addEventListener('mousemove', function (e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -12; // Adjust tilt sensitivity
        const rotateY = ((x - centerX) / centerX) * 12;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    card.addEventListener('mouseleave', function () {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
});

// Sticky Navigation
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const sections = document.querySelectorAll('.section');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.innerHTML = navLinks.classList.contains('active') ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Close menu when link clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Ambient Floating Tech Stack 3D Wrappers
const techCardsNodes = document.querySelectorAll('.tech-card');
techCardsNodes.forEach((card, index) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'tech-card-wrapper';
    // Organic staggering logic: mixed delays and slightly varying durations
    wrapper.style.animationDelay = `${index * -0.4}s`;
    wrapper.style.animationDuration = `${6 + (index % 3)}s`;
    card.parentNode.insertBefore(wrapper, card);
    wrapper.appendChild(card);
});

// Scroll Animations (Fade In)
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Check if it's stats section to trigger counters
            if (entry.target.querySelector('.stat-number')) {
                animateCounters();
            }

            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
});

// Animated Counters
let countersAnimated = false;
function animateCounters() {
    if (countersAnimated) return;
    countersAnimated = true;

    const counters = document.querySelectorAll('.stat-number');
    const speed = 200; // The lower the slower

    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const updateCount = () => {
            const count = +counter.innerText;
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 15);
            } else {
                counter.innerText = target;
                if (target > 100 && target < 200) counter.innerText = target + '+';
                if (target >= 200) counter.innerText = target + '+';
            }
        };
        updateCount();
    });
}

// Active Nav Link Update on Scroll
window.addEventListener('scroll', () => {
    let current = '';
    const scrollSections = document.querySelectorAll('section');

    scrollSections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href') === `#${current}`) {
            a.classList.add('active');
        }
    });
});

// Background Canvas Particles
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
const numberOfParticles = (canvas.width * canvas.height) / 10000;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2;
        this.speedX = (Math.random() * 1) - 0.5;
        this.speedY = (Math.random() * 1) - 0.5;
        this.color = 'rgba(56, 189, 248, 0.4)';
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.size > 0.2) this.size -= 0.1;

        // Bounce from edges
        if (this.x < 0 || this.x > canvas.width) this.speedX = -this.speedX;
        if (this.y < 0 || this.y > canvas.height) this.speedY = -this.speedY;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function init() {
    particlesArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function connect() {
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x))
                + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));

            if (distance < (canvas.width / 10) * (canvas.height / 10)) {
                opacityValue = 1 - (distance / 20000);
                if (opacityValue < 0) opacityValue = 0;

                let linkColor = `rgba(56, 189, 248, ${opacityValue * 0.2})`;
                let distToCursor = ((particlesArray[a].x - cursorX) * (particlesArray[a].x - cursorX))
                    + ((particlesArray[a].y - cursorY) * (particlesArray[a].y - cursorY));

                if (distToCursor < 15000) {
                    linkColor = `rgba(56, 189, 248, ${opacityValue * 0.8})`;
                    ctx.shadowBlur = 10;
                    ctx.shadowColor = 'rgba(56, 189, 248, 1)';
                } else {
                    ctx.shadowBlur = 0;
                }

                ctx.strokeStyle = linkColor;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

function animateParticles() {
    requestAnimationFrame(animateParticles);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    connect();
}

// Check window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    }, 200);
});

// Initialize canvas
init();
animateParticles();

// Form submission prevent default
const form = document.querySelector('.contact-form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('.submit-btn');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully';
            btn.style.background = '#10b981'; // green
            form.reset();

            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = ''; // reset to default
            }, 3000);
        }, 1500);
    });
}
