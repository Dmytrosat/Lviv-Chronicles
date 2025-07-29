// Файл: js/scroll-top.js
document.addEventListener('DOMContentLoaded', function () {    
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");

    if (scrollToTopBtn) {
        // Показуємо кнопку, коли користувач прокручує вниз
        window.addEventListener('scroll', function () {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                scrollToTopBtn.style.display = "block";
            } else {
                scrollToTopBtn.style.display = "none";
            }
        });

        // Прокрутка вгору при кліку на кнопку
        scrollToTopBtn.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }    
});