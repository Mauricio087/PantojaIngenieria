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
});