// Файл: js/modal.js
document.addEventListener('DOMContentLoaded', function () {
        const contactButton = document.querySelector('.contact-button');
        const modal = document.getElementById('contactModal');
        const closeBtn = document.querySelector('.close');
        const contactForm = document.getElementById('contactForm');

        // Діагностика
        if (!contactButton) console.error('Кнопка .contact-button не знайдена');
        if (!modal) console.error('Модальне вікно #contactModal не знайдено');
        if (!closeBtn) console.error('Кнопка .close не знайдена');
        if (!contactForm) console.error('Форма #contactForm не знайдена');

        if (contactButton && modal && closeBtn && contactForm) {
            contactButton.addEventListener('click', () => {
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            });

            closeBtn.addEventListener('click', () => {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            });

            window.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.style.display = 'none';
                    document.body.style.overflow = '';
                }
            });

            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('Повідомлення надіслано!');
                contactForm.reset();
                modal.style.display = 'none';
                document.body.style.overflow = '';
            });
        }
    });