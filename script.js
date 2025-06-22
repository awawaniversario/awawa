document.addEventListener('DOMContentLoaded', () => {

    // Smooth scroll para enlaces de navegación y botón "comenzar"
    const navLinks = document.querySelectorAll('nav ul li a, .hero-content .btn');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                // Considerar altura del header fijo
                const headerOffset = document.querySelector('header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                // Cerrar menú móvil si está abierto después de hacer clic
                if (navUL.classList.contains('active')) {
                    navUL.classList.remove('active');
                }
            }
        });
    });

    // Menú hamburguesa para móvil
    const menuToggle = document.getElementById('menu-toggle');
    const navUL = document.querySelector('nav ul');
    if (menuToggle && navUL) {
        menuToggle.addEventListener('click', () => {
            navUL.classList.toggle('active');
        });
    }
    

    // Revelar Sorpresa
    const btnRevelar = document.getElementById('btn-revelar-sorpresa');
    const contenidoSorpresa = document.getElementById('contenido-sorpresa');
    if (btnRevelar && contenidoSorpresa) {
        btnRevelar.addEventListener('click', () => {
            contenidoSorpresa.classList.toggle('hidden');
            if (!contenidoSorpresa.classList.contains('hidden')) {
                btnRevelar.textContent = "Ocultar Sorpresa";
                // Si es un video, intentar reproducirlo
                const video = contenidoSorpresa.querySelector('video');
                if (video) video.play();
            } else {
                btnRevelar.textContent = "¡Descubre tu Sorpresa! ❤️";
                 const video = contenidoSorpresa.querySelector('video');
                if (video) video.pause();
            }
        });
    }

    // Cuenta Regresiva
    const countdownElement = document.getElementById('countdown');
    if (countdownElement) {
        const targetDateString = document.querySelector('.countdown-target').textContent.split(': ')[1];
        // Asumimos formato dd/mm/yyyy
        const parts = targetDateString.split('/');
        const targetDate = new Date(parts[2], parts[1] - 1, parts[0]).getTime(); // Mes es 0-indexado

        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                countdownElement.innerHTML = "<div>¡El día ha llegado!</div>";
                clearInterval(interval);
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById('days').innerText = String(days).padStart(2, '0');
            document.getElementById('hours').innerText = String(hours).padStart(2, '0');
            document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
            document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
        };
        
        const interval = setInterval(updateCountdown, 1000);
        updateCountdown(); // Llama una vez para evitar el delay inicial
    }

    // Reproductor de Música
    const music = document.getElementById('background-music');
    const playPauseBtn = document.getElementById('play-pause-music');
    if (music && playPauseBtn) {
        playPauseBtn.addEventListener('click', () => {
            if (music.paused) {
                music.play();
                playPauseBtn.textContent = 'Pausar Música';
            } else {
                music.pause();
                playPauseBtn.textContent = 'Reproducir Música';
            }
        });
    }

    // Animación de elementos al hacer scroll
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            } else {
                // Opcional: remover la clase si quieres que se anime cada vez que entra/sale
                // entry.target.classList.remove('is-visible'); 
            }
        });
    }, {
        threshold: 0.1 // Porcentaje del elemento visible para disparar la animación
    });

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Lightbox para la galería
    const galleryImages = document.querySelectorAll('.gallery-image');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const captionText = document.getElementById('caption');
    const closeLightbox = document.querySelector('.close-lightbox');

    if (galleryImages.length > 0 && lightbox && lightboxImg && captionText && closeLightbox) {
        galleryImages.forEach(image => {
            image.addEventListener('click', () => {
                lightbox.style.display = 'block';
                lightboxImg.src = image.src;
                captionText.innerHTML = image.alt;
            });
        });

        closeLightbox.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });

        // Cerrar al hacer clic fuera de la imagen (opcional)
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) { // Si el clic es en el fondo del lightbox
                lightbox.style.display = 'none';
            }
        });
    }
}); 