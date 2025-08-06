// Pantoja Ingeniería - JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Pantoja Ingeniería - Inicializando aplicación...');
    
    // ===== MENÚ HAMBURGUESA MEJORADO =====
    
    // Elementos del DOM
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('.header');
    
    // Verificar que los elementos existen
    if (!mobileMenuToggle || !navMenu || !mobileMenuOverlay) {
        console.error('❌ Error: No se encontraron los elementos del menú hamburguesa');
        return;
    }
    
    console.log('✅ Menú hamburguesa inicializado correctamente');
    
    // Función para abrir el menú
    function openMenu() {
        mobileMenuToggle.classList.add('active');
        navMenu.classList.add('active');
        mobileMenuOverlay.classList.add('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden'; // Prevenir scroll del body
        console.log('📱 Menú abierto');
    }
    
    // Función para cerrar el menú
    function closeMenu() {
        mobileMenuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = ''; // Restaurar scroll del body
        console.log('❌ Menú cerrado');
    }
    
    // Toggle menú móvil
    mobileMenuToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        console.log('🔄 Click en botón hamburguesa detectado');
        
        if (navMenu.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });
    
    // Cerrar menú al hacer click en el overlay
    mobileMenuOverlay.addEventListener('click', function() {
        console.log('🔄 Click en overlay detectado');
        closeMenu();
    });
    
    // Cerrar menú al hacer click en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('🔗 Click en enlace detectado:', this.textContent);
            closeMenu();
            
            // Agregar clase active al enlace clickeado
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Cerrar menú con la tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            console.log('⌨️ Tecla Escape presionada');
            closeMenu();
        }
    });
    
    // Cerrar menú al redimensionar la ventana (si se cambia a desktop)
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            console.log('📏 Ventana redimensionada a desktop');
            closeMenu();
        }
    });
    
    // Prevenir que el click en el menú cierre el menú
    navMenu.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    // ===== SCROLL SUAVE PARA ENLACES INTERNOS =====
    
    // Scroll suave para enlaces internos
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ===== HEADER SCROLL EFFECT =====
    
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });
    
    // ===== ANIMACIONES AL HACER SCROLL =====
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observar elementos para animaciones
    const animatedElements = document.querySelectorAll('.service-card, .value-item, .testimonial, .about-text, .contact-info, .contact-form');
    animatedElements.forEach(el => observer.observe(el));
    
    // ===== FORMULARIO DE CONTACTO =====
    
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener datos del formulario
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const message = formData.get('message');
            
            // Crear mensaje para WhatsApp
            const whatsappMessage = `Hola, soy ${name}. 
Email: ${email}
Teléfono: ${phone}
Mensaje: ${message}`;
            
            // Codificar mensaje para URL
            const encodedMessage = encodeURIComponent(whatsappMessage);
            const whatsappURL = `https://wa.me/56933981137?text=${encodedMessage}`;
            
            // Abrir WhatsApp
            window.open(whatsappURL, '_blank');
            
            // Limpiar formulario
            this.reset();
            
            // Mostrar mensaje de confirmación
            showNotification('Mensaje enviado. Te redirigimos a WhatsApp.', 'success');
        });
    }
    
    // ===== FUNCIÓN PARA MOSTRAR NOTIFICACIONES =====
    
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Estilos de la notificación
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#28a745' : '#007bff'};
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            z-index: 10000;
            font-weight: 500;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Mostrar notificación
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Ocultar notificación después de 3 segundos
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
    
    // ===== SMOOTH SCROLL PARA BOTONES CTA =====
    
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ===== FUNCIÓN PARA SCROLL DOWN DESDE EL HERO =====
    
    window.scrollToNextSection = function() {
        const nextSection = document.querySelector('.why-us');
        if (nextSection) {
            const headerHeight = header.offsetHeight;
            const targetPosition = nextSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    };
    
    // ===== DETECTAR DISPOSITIVO MÓVIL =====
    
    function isMobile() {
        return window.innerWidth <= 768;
    }
    
    // Ajustar comportamiento según dispositivo
    function adjustForDevice() {
        if (isMobile()) {
            document.body.classList.add('mobile');
        } else {
            document.body.classList.remove('mobile');
        }
    }
    
    // Ejecutar al cargar y redimensionar
    adjustForDevice();
    window.addEventListener('resize', adjustForDevice);
    
    console.log('✅ Aplicación inicializada correctamente');
});

// ===== FUNCIONES UTILITARIAS GLOBALES =====

window.PantojaUtils = {
    // Abrir WhatsApp con mensaje personalizado
    openWhatsApp: function(message, phone = '56933981137') {
        const encodedMessage = encodeURIComponent(message);
        const url = `https://wa.me/${phone}?text=${encodedMessage}`;
        window.open(url, '_blank');
    },
    
    // Copiar texto al portapapeles
    copyToClipboard: function(text) {
        navigator.clipboard.writeText(text).then(() => {
            console.log('Texto copiado al portapapeles');
        }).catch(err => {
            console.error('Error al copiar texto: ', err);
        });
    },
    
    // Validar email
    validateEmail: function(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },
    
    // Formatear teléfono chileno
    formatChileanPhone: function(phone) {
        const cleaned = phone.replace(/\D/g, '');
        if (cleaned.length === 9) {
            return `+56 9 ${cleaned.substring(0, 4)} ${cleaned.substring(4)}`;
        }
        return phone;
    }
};

console.log('🎯 Pantoja Ingeniería - JavaScript cargado completamente');