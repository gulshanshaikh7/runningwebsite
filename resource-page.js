// Add scroll progress indicator
document.addEventListener('DOMContentLoaded', function() {
    

    

    
// Add search functionality for FAQs
const searchBox = document.createElement('input');
searchBox.type = 'text';
searchBox.placeholder = 'Search FAQs...';
searchBox.className = 'form-control mb-4';
    
const faqSection = document.querySelector('#faqAccordion');
faqSection.parentNode.insertBefore(searchBox, faqSection);
searchBox.addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const faqItems = document.querySelectorAll('.accordion-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.accordion-button').textContent.toLowerCase();
        const answer = item.querySelector('.accordion-body').textContent.toLowerCase();
            
        if (question.includes(searchTerm) || answer.includes(searchTerm)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
});

});


// Get all card images
const cardImages = document.querySelectorAll('.card-img-top');

// Create modal once for all images
const modal = document.createElement('div');
modal.className = 'image-modal';
Object.assign(modal.style, {
    display: 'none',
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    zIndex: '1000',
    cursor: 'pointer'
});

// Create enlarged image element
const enlargedImg = document.createElement('img');
Object.assign(enlargedImg.style, {
    maxWidth: '90%',
    maxHeight: '90%',
    margin: 'auto',
    display: 'block',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '5px',
    transition: 'transform 0.3s ease'
});

// Add close button
const closeButton = document.createElement('button');
closeButton.innerHTML = '×';
Object.assign(closeButton.style, {
    position: 'absolute',
    top: '15px',
    right: '15px',
    background: 'none',
    border: 'none',
    color: 'white',
    fontSize: '30px',
    cursor: 'pointer'
});

// Add elements to modal
modal.appendChild(enlargedImg);
modal.appendChild(closeButton);
document.body.appendChild(modal);

// Add interaction to each image
cardImages.forEach(img => {
    // Simple hover effect
    img.style.transition = 'transform 0.3s ease';
    
    img.addEventListener('mouseenter', () => {
        img.style.transform = 'scale(1.05)';
    });

    img.addEventListener('mouseleave', () => {
        img.style.transform = 'scale(1)';
    });

    // Click to open modal
    img.addEventListener('click', () => {
        enlargedImg.src = img.src;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
        
        // Simple entrance animation
        enlargedImg.style.transform = 'translate(-50%, -50%) scale(0.9)';
        setTimeout(() => {
            enlargedImg.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 50);
    });
});

// Close modal events
const closeModal = () => {
    modal.style.display = 'none';
    document.body.style.overflow = ''; // Restore scrolling
};

closeButton.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Add keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        closeModal();
    }
});

// Simple touch support
let touchstartX = 0;
let touchendX = 0;

modal.addEventListener('touchstart', e => {
    touchstartX = e.changedTouches[0].screenX;
});

modal.addEventListener('touchend', e => {
    touchendX = e.changedTouches[0].screenX;
    if (Math.abs(touchstartX - touchendX) > 50) {
        closeModal();
    }
});