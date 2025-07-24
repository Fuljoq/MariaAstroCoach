// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80, // Adjust for fixed header
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// WhatsApp click handler for the contact button
document.querySelector('.contact-buttons .whatsapp-btn').addEventListener('click', function(e) {
    // Track WhatsApp button click
    console.log('WhatsApp contact button clicked');
});

// Mobile menu toggle
const mobileMenu = document.getElementById('mobile-menu');
const mainNav = document.getElementById('main-nav');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
function toggleMenu() {
    mobileMenu.classList.toggle('active');
    mainNav.classList.toggle('active');
    document.body.classList.toggle('menu-open');
}

// Close menu when a link is clicked
function closeMenu() {
    mobileMenu.classList.remove('active');
    mainNav.classList.remove('active');
    document.body.classList.remove('menu-open');
}

// Event listeners
mobileMenu.addEventListener('click', toggleMenu);

// Close menu when clicking on a nav link
navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});

// Close menu when clicking outside
window.addEventListener('click', (e) => {
    if (!e.target.closest('.main-nav') && !e.target.closest('.menu-toggle')) {
        closeMenu();
    }
});

// Add animation on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.service-card, .about-content, .contact-content');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Set initial styles for animation
document.addEventListener('DOMContentLoaded', () => {
    // Add animation classes
    document.querySelectorAll('.service-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease-out ${index * 0.2}s, transform 0.6s ease-out ${index * 0.2}s`;
    });
    
    document.querySelectorAll('.about-content, .contact-content').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });
    
    // Initial check for elements in viewport
    animateOnScroll();
});

// Check for elements in viewport on scroll
window.addEventListener('scroll', animateOnScroll);

// WhatsApp click tracking
document.querySelector('.whatsapp-float').addEventListener('click', function() {
    // Here you could add analytics tracking
    console.log('WhatsApp button clicked');
});

// Manejo de clics en los servicios circulares
document.addEventListener('DOMContentLoaded', function() {
    const serviceCircles = document.querySelectorAll('.service-circle');
    
    // Función para manejar el clic en un círculo
    function handleCircleClick(event) {
        // Si ya está activo, no hacer nada
        if (this.classList.contains('active')) return;
        
        // Quitar la clase active de todos los círculos
        serviceCircles.forEach(circle => {
            circle.classList.remove('active');
        });
        
        // Agregar la clase active al círculo clickeado
        this.classList.add('active');
        
        // Opcional: Hacer scroll suave para centrar el círculo en la vista
        this.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'center'
        });
    }
    
    // Agregar el event listener a cada círculo
    serviceCircles.forEach(circle => {
        circle.addEventListener('click', handleCircleClick);
        
        // Opcional: Agregar soporte para teclado (accesibilidad)
        circle.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleCircleClick.call(this, e);
            }
        });
        
        // Hacer los círculos enfocables para accesibilidad
        circle.setAttribute('tabindex', '0');
        circle.setAttribute('role', 'button');
        circle.setAttribute('aria-pressed', 'false');
    });
    
    // Actualizar el estado de accesibilidad cuando cambia la clase active
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.attributeName === 'class') {
                const isActive = mutation.target.classList.contains('active');
                mutation.target.setAttribute('aria-pressed', isActive);
                
                // Actualizar el texto alternativo para lectores de pantalla
                const serviceTitle = mutation.target.querySelector('h3')?.textContent || 'servicio';
                mutation.target.setAttribute('aria-label', `${serviceTitle} - ${isActive ? 'seleccionado' : 'no seleccionado'}`);
            }
        });
    });
    
    // Observar cambios en los atributos de los círculos
    serviceCircles.forEach(circle => {
        observer.observe(circle, { attributes: true });
    });
});
