// Файл: js/header.js
// Отримуємо елементи
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
const mobileMenuClose = document.getElementById('mobileMenuClose');
const navLinks = document.querySelectorAll('.mobile-menu-nav ul li a');
const desktopNavLinks = document.querySelectorAll('nav ul li a');

// Функція: оновити активне посилання
function setActiveLink(targetId) {
    // Знімаємо active з усіх
    [...navLinks, ...desktopNavLinks].forEach(link => {
        link.classList.remove('active');
    });

    // Додаємо active до відповідних
    const activeLinks = document.querySelectorAll(`a[href="${targetId}"]`);
    activeLinks.forEach(link => {
        link.classList.add('active');
    });
}

// Відкрити меню
mobileMenuBtn.addEventListener('click', () => {
    mobileMenuOverlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
});

// Закрити меню
mobileMenuClose.addEventListener('click', () => {
    mobileMenuOverlay.style.display = 'none';
    document.body.style.overflow = '';
});

// Закрити меню при кліку на посилання + встановити active
navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId.startsWith('#')) {
            e.preventDefault();

            // Закрити меню
            mobileMenuOverlay.style.display = 'none';
            document.body.style.overflow = '';

            // Оновити active
            setActiveLink(targetId);

            // Плавно прокрутити до секції
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - document.querySelector('header').offsetHeight,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Закрити меню при кліку поза вмістом
mobileMenuOverlay.addEventListener('click', (e) => {
    if (e.target === mobileMenuOverlay) {
        mobileMenuOverlay.style.display = 'none';
        document.body.style.overflow = '';
    }
});

// --- Додатково: Оновлювати active при скролі ---

function updateActiveLinkOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100; // +100 — компенсація шапки

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const id = section.getAttribute('id');
        const targetHref = `#${id}`;

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            setActiveLink(targetHref);
        }
    });
}

window.addEventListener('scroll', updateActiveLinkOnScroll);
window.addEventListener('load', updateActiveLinkOnScroll);