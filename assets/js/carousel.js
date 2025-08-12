// Simple Carousel Functionality - Fixed Version
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing carousel...');
    
    const track = document.getElementById('carouselTrack');
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    console.log('Found', totalSlides, 'slides');
    
    if (!track || totalSlides === 0) {
        console.error('Carousel elements not found');
        return;
    }

    function updateCarousel() {
        console.log('Updating carousel to slide', currentSlide);
        
        // Move track
        const translateX = -currentSlide * 25; // 25% per slide (100% / 4 slides)
        track.style.transform = `translateX(${translateX}%)`;
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
    }

    function nextSlide() {
        console.log('Next slide clicked');
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    }

    function prevSlide() {
        console.log('Previous slide clicked');
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }

    function goToSlide(index) {
        console.log('Going to slide', index);
        currentSlide = index;
        updateCarousel();
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
    
    // Auto-play
    let autoPlayInterval = setInterval(nextSlide, 5000);
    
    // Pause on hover
    const carouselContainer = document.querySelector('.featured-clients-carousel');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', () => {
            clearInterval(autoPlayInterval);
            console.log('Auto-play paused');
        });
        
        carouselContainer.addEventListener('mouseleave', () => {
            autoPlayInterval = setInterval(nextSlide, 5000);
            console.log('Auto-play resumed');
        });
    }
    
    // Initialize
    updateCarousel();
    console.log('Carousel initialized successfully');
});