// Файл: js/booking.js
document.addEventListener('DOMContentLoaded', function () {
    // Форма бронювання
    const bookingForm = document.querySelector('#booking form');
    const popup = document.getElementById('bookingPopup');
    const popupCloseButtons = document.querySelectorAll('.popup-close, .popup-button');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Отримуємо значення полів
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const date = document.getElementById('date').value;
            const people = document.getElementById('people').value;

            // Проста валідація
            if (name && email && date && people) {
                // Показуємо попап замість alert
                showBookingPopup(name, date, people);
                bookingForm.reset();
            } else {
                alert('Будь ласка, заповніть всі обов\'язкові поля!');
            }
        });
    }

    // Функція показу попапу
    function showBookingPopup(name, date, people) {
        // Заповнюємо дані у попапі
        document.getElementById('popupName').textContent = name;
        document.getElementById('popupDate').textContent = formatDate(date);
        document.getElementById('popupPeople').textContent = people;
        
        // Показуємо попап
        popup.classList.add('popup-show');
        
        // Запобігаємо скролу фону
        document.body.style.overflow = 'hidden';
    }

    // Функція форматування дати
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('uk-UA', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    }

    // Закриття попапу
    popupCloseButtons.forEach(button => {
        button.addEventListener('click', function () {
            popup.classList.remove('popup-show');
            document.body.style.overflow = 'auto';
        });
    });

    // Закриття попапу при кліку поза контентом
    popup.addEventListener('click', function (e) {
        if (e.target === popup) {
            popup.classList.remove('popup-show');
            document.body.style.overflow = 'auto';
        }
    });

    // Закриття попапу клавішею Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && popup.classList.contains('popup-show')) {
            popup.classList.remove('popup-show');
            document.body.style.overflow = 'auto';
        }
    });

    // Встановлюємо сьогоднішню дату як мінімальну для поля дати
    const today = new Date().toISOString().split('T')[0];
    const dateInput = document.getElementById('date');
    if (dateInput) {
        dateInput.setAttribute('min', today);
    }
});