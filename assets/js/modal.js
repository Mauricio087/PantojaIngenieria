// Experience Modal Functions
function openExperienceModal(type) {
    console.log('Opening experience modal...');
    const modal = document.getElementById('experienceModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        console.log('Modal opened successfully');
    } else {
        console.error('Modal not found!');
    }
}

function closeExperienceModal() {
    console.log('Closing experience modal...');
    const modal = document.getElementById('experienceModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        console.log('Modal closed successfully');
    }
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    const modal = document.getElementById('experienceModal');
    if (e.target === modal) {
        closeExperienceModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modal = document.getElementById('experienceModal');
        if (modal && modal.style.display === 'block') {
            closeExperienceModal();
        }
    }
});

console.log('Modal functions loaded successfully');// Whats
App Floating Button Functionality
document.addEventListener('DOMContentLoaded', function() {
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    
    if (whatsappBtn) {
        // Add click tracking
        whatsappBtn.addEventListener('click', function() {
            console.log('WhatsApp button clicked');
            
            // Optional: Add analytics tracking here
            // gtag('event', 'click', {
            //     event_category: 'WhatsApp',
            //     event_label: 'Floating Button'
            // });
        });
        
        // Show/hide button based on scroll position
        let lastScrollTop = 0;
        const whatsappFloat = document.querySelector('.whatsapp-float');
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Show button after scrolling down 200px
            if (scrollTop > 200) {
                whatsappFloat.style.opacity = '1';
                whatsappFloat.style.visibility = 'visible';
            } else {
                whatsappFloat.style.opacity = '0.8';
            }
            
            // Hide button when scrolling up quickly (optional)
            if (scrollTop > lastScrollTop && scrollTop > 500) {
                // Scrolling down
                whatsappFloat.style.transform = 'translateY(0)';
            } else {
                // Scrolling up
                whatsappFloat.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        });
        
        // Initial state
        if (window.pageYOffset < 200) {
            whatsappFloat.style.opacity = '0.8';
        }
    }
});/
/ Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
    const carousel = {
        track: document.getElementById('carouselTrack'),
        slides: document.querySelectorAll('.carousel-slide'),
        indicators: document.querySelectorAll('.indicator'),
        prevBtn: document.getElementById('prevBtn'),
        nextBtn: document.getElementById('nextBtn'),
        currentSlide: 0,
        totalSlides: document.querySelectorAll('.carousel-slide').length,
        autoPlayInterval: null,
        autoPlayDelay: 5000
    };

    // Initialize carousel
    function initCarousel() {
        if (!carousel.track || carousel.totalSlides === 0) return;
        
        updateCarousel();
        startAutoPlay();
        
        // Event listeners
        carousel.prevBtn?.addEventListener('click', prevSlide);
        carousel.nextBtn?.addEventListener('click', nextSlide);
        
        // Indicator clicks
        carousel.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => goToSlide(index));
        });
        
        // Pause autoplay on hover
        const carouselContainer = document.querySelector('.featured-clients-carousel');
        carouselContainer?.addEventListener('mouseenter', stopAutoPlay);
        carouselContainer?.addEventListener('mouseleave', startAutoPlay);
        
        // Touch/swipe support
        let startX = 0;
        let endX = 0;
        
        carousel.track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        carousel.track.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            handleSwipe();
        });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = startX - endX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
        }
    }

    function updateCarousel() {
        // Update slides
        carousel.slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === carousel.currentSlide);
        });
        
        // Update indicators
        carousel.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === carousel.currentSlide);
        });
        
        // Transform track
        const translateX = -carousel.currentSlide * 100;
        carousel.track.style.transform = `translateX(${translateX}%)`;
    }

    function nextSlide() {
        carousel.currentSlide = (carousel.currentSlide + 1) % carousel.totalSlides;
        updateCarousel();
        resetAutoPlay();
    }

    function prevSlide() {
        carousel.currentSlide = (carousel.currentSlide - 1 + carousel.totalSlides) % carousel.totalSlides;
        updateCarousel();
        resetAutoPlay();
    }

    function goToSlide(index) {
        carousel.currentSlide = index;
        updateCarousel();
        resetAutoPlay();
    }

    function startAutoPlay() {
        stopAutoPlay();
        carousel.autoPlayInterval = setInterval(nextSlide, carousel.autoPlayDelay);
    }

    function stopAutoPlay() {
        if (carousel.autoPlayInterval) {
            clearInterval(carousel.autoPlayInterval);
            carousel.autoPlayInterval = null;
        }
    }

    function resetAutoPlay() {
        stopAutoPlay();
        startAutoPlay();
    }

    // Initialize carousel
    initCarousel();
    
    console.log('Carousel initialized successfully');
});