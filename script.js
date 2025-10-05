// script.js - остается без изменений, функциональность сохраняется
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.parallax-section');
    const contents = document.querySelectorAll('.content');
    const dots = document.querySelectorAll('.dot');
    
    // Показываем первую секцию
    if (contents[0]) {
        contents[0].classList.add('visible');
    }
    
    // Наблюдатель для анимации секций
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const content = entry.target.querySelector('.content');
                if (content) {
                    content.classList.add('visible');
                }
                
                const index = Array.from(sections).indexOf(entry.target);
                dots.forEach(dot => dot.classList.remove('active'));
                if (dots[index]) {
                    dots[index].classList.add('active');
                }
            }
        });
    }, { threshold: 0.3 });
    
    sections.forEach(section => {
        if (section) observer.observe(section);
    });
    
    // Навигация по точкам
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const sectionIndex = this.getAttribute('data-section');
            if (sections[sectionIndex]) {
                sections[sectionIndex].scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Таймер обратного отсчета
    function updateCountdown() {
        const eventDate = new Date('November 28, 2025 17:00:00').getTime();
        const now = new Date().getTime();
        const distance = eventDate - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        const daysElement = document.getElementById('days');
        const hoursElement = document.getElementById('hours');
        const minutesElement = document.getElementById('minutes');
        const secondsElement = document.getElementById('seconds');
        
        if (daysElement) daysElement.textContent = days.toString().padStart(2, '0');
        if (hoursElement) hoursElement.textContent = hours.toString().padStart(2, '0');
        if (minutesElement) minutesElement.textContent = minutes.toString().padStart(2, '0');
        if (secondsElement) secondsElement.textContent = seconds.toString().padStart(2, '0');
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // Управление музыкой
    const audioControl = document.getElementById('audioControl');
    const music = document.getElementById('bg-music');
    
    if (audioControl && music) {
        let isPlaying = false;
        
        audioControl.addEventListener('click', function() {
            if (isPlaying) {
                music.pause();
                audioControl.innerHTML = '<i class="fas fa-play"></i>';
            } else {
                music.play().catch(error => {
                    console.log('Не удалось запустить музыку');
                });
                audioControl.innerHTML = '<i class="fas fa-pause"></i>';
            }
            isPlaying = !isPlaying;
        });
    }
    
    // Обработка формы
    const form = document.getElementById('attendanceForm');
    const message = document.getElementById('message');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const attendance = document.querySelector('input[name="attendance"]:checked');
            
            if (!name || !attendance) {
                showMessage('Барлық өрістерді толтырыңыз', 'error');
                return;
            }
            
            showMessage('Сіздің жауабыңыз сәтті жіберілді!', 'success');
            form.reset();
        });
    }
    
    function showMessage(text, type) {
        if (message) {
            message.textContent = text;
            message.className = 'message ' + type;
            message.style.display = 'block';
            
            setTimeout(() => {
                message.style.display = 'none';
            }, 5000);
        }
    }
    
    // Параллакс эффект
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax-bg');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
});
