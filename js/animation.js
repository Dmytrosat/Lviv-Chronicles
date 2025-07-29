// Файл: js/animations.js
document.addEventListener('DOMContentLoaded', function () {
    // Анімація при скролі
    const animateOnScroll = function () {
        const elements = document.querySelectorAll('.place-card, .review-card, .guide-profile, .contact-item');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;

            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Встановлюємо початкові стилі для анімації
    const animatedElements = document.querySelectorAll('.place-card, .review-card, .guide-profile, .contact-item');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(1.875rem)'; /* 30px */
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Запускаємо анімацію при завантаженні та скролі
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll); // Запускаємо один раз при завантаженні
});