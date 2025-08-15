// Centered Carousel Functionality - Optimized Version
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing centered carousel...');
    
    const track = document.getElementById('carouselTrack');
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoPlayInterval;
    let isTransitioning = false;
    
    console.log('Found', totalSlides, 'slides');
    
    if (!track || totalSlides === 0) {
        console.error('Carousel elements not found');
        return;
    }

    function updateCarousel() {
        if (isTransitioning) return;
        
        console.log('Updating carousel to slide', currentSlide);
        isTransitioning = true;
        
        // Move track to center the current slide
        const translateX = -currentSlide * 100;
        track.style.transform = `translateX(${translateX}%)`;
        
        // Update slide states
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentSlide);
        });
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
        
        // Reset transition flag after animation completes
        setTimeout(() => {
            isTransitioning = false;
        }, 600); // Match CSS transition duration
    }

    function nextSlide() {
        if (isTransitioning) return;
        console.log('Next slide clicked');
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
        resetAutoPlay();
    }

    function prevSlide() {
        if (isTransitioning) return;
        console.log('Previous slide clicked');
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
        resetAutoPlay();
    }

    function goToSlide(index) {
        if (isTransitioning || index === currentSlide) return;
        console.log('Going to slide', index);
        currentSlide = index;
        updateCarousel();
        resetAutoPlay();
    }

    function startAutoPlay() {
        stopAutoPlay();
        autoPlayInterval = setInterval(nextSlide, 5000);
        console.log('Auto-play started');
    }

    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
            console.log('Auto-play stopped');
        }
    }

    function resetAutoPlay() {
        stopAutoPlay();
        startAutoPlay();
    }

    // Event listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
        console.log('Previous button listener added');
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
        console.log('Next button listener added');
    }
    
    // Indicator clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => goToSlide(index));
    });
    console.log('Indicator listeners added');
    
    // Pause on hover
    const carouselContainer = document.querySelector('.featured-clients-carousel');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', stopAutoPlay);
        carouselContainer.addEventListener('mouseleave', startAutoPlay);
    }

    // Touch/swipe support
    let startX = 0;
    let endX = 0;
    const minSwipeDistance = 50;

    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        stopAutoPlay();
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        const swipeDistance = startX - endX;
        
        if (Math.abs(swipeDistance) > minSwipeDistance) {
            if (swipeDistance > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        } else {
            startAutoPlay();
        }
    }, { passive: true });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });

    // Initialize carousel
    updateCarousel();
    startAutoPlay();
    
    console.log('Centered carousel initialized successfully');
});