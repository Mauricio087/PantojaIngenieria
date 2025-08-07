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

console.log('Modal functions loaded successfully');