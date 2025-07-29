// Файл: js/gallery.js
document.addEventListener('DOMContentLoaded', function () {
    const mainImage = document.getElementById('main-gallery-image');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const currentSpan = document.getElementById('current');
    const totalSpan = document.getElementById('total');

    if (mainImage && thumbnails.length > 0 && currentSpan && totalSpan) {
        // Встановлюємо загальну кількість зображень
        totalSpan.textContent = thumbnails.length;

        // Поточний індекс активного зображення
        let currentIndex = 0;

        // Функція оновлення активного зображення
        function updateGallery(index) {
            const thumbnail = thumbnails[index];
            if (!thumbnail) return; // Перевірка наявності елемента

            // Оновлюємо основне зображення
            const newSrc = thumbnail.dataset.src;
            const newAlt = thumbnail.dataset.alt || 'Екскурсія Львів';

            // Плавна зміна зображення (можна використовувати opacity)
            mainImage.style.opacity = '0';
            setTimeout(() => {
                mainImage.src = newSrc;
                mainImage.alt = newAlt;
                mainImage.style.opacity = '1';
            }, 250); // Тривалість має бути меншою або дорівнювати transition в CSS

            // Оновлюємо активний клас на мініатюрах
            thumbnails.forEach(thumb => thumb.classList.remove('active'));
            thumbnail.classList.add('active');

            // Оновлюємо лічильник
            currentSpan.textContent = index + 1;
            currentIndex = index;
        }

        // Обробники кліків по мініатюрам
        thumbnails.forEach((thumbnail, index) => {
            thumbnail.addEventListener('click', () => {
                updateGallery(index);
            });
        });

        // Кнопка "Попереднє"
        const prevBtn = document.getElementById('prevBtn');
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                let newIndex = currentIndex - 1;
                if (newIndex < 0) {
                    newIndex = thumbnails.length - 1;
                }
                updateGallery(newIndex);
            });
        }

        // Кнопка "Наступне"
        const nextBtn = document.getElementById('nextBtn');
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                let newIndex = currentIndex + 1;
                if (newIndex >= thumbnails.length) {
                    newIndex = 0;
                }
                updateGallery(newIndex);
            });
        }

        // Клавіатурна навігація
        document.addEventListener('keydown', (e) => {
            // Перевіряємо, чи фокус не в полі вводу форми
            if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
                return; // Не перемикаємо слайди, якщо користувач вводить текст
            }

            if (e.key === 'ArrowLeft') {
                let newIndex = currentIndex - 1;
                if (newIndex < 0) {
                    newIndex = thumbnails.length - 1;
                }
                updateGallery(newIndex);
            } else if (e.key === 'ArrowRight') {
                let newIndex = currentIndex + 1;
                if (newIndex >= thumbnails.length) {
                    newIndex = 0;
                }
                updateGallery(newIndex);
            }
        });

        // Автоматична зміна зображень кожні 5 секунд
        let autoSlide = setInterval(() => {
            let newIndex = currentIndex + 1;
            if (newIndex >= thumbnails.length) {
                newIndex = 0;
            }
            updateGallery(newIndex);
        }, 5000);

        // Зупиняємо автоматичну зміну при наведенні миші на галерею
        const galleryWrapper = document.querySelector('.gallery-wrapper');
        if (galleryWrapper) {
            galleryWrapper.addEventListener('mouseenter', () => {
                clearInterval(autoSlide);
            });

            galleryWrapper.addEventListener('mouseleave', () => {
                autoSlide = setInterval(() => {
                    let newIndex = currentIndex + 1;
                    if (newIndex >= thumbnails.length) {
                        newIndex = 0;
                    }
                    updateGallery(newIndex);
                }, 5000);
            });
        }
    }
});