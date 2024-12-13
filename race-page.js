// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
// 1. Event Card Registration System
// Event Card Registration System
const registerButtons = document.querySelectorAll('.btn-primary');
    
registerButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
            
        const card = button.closest('.card');
        const eventTitle = card.querySelector('.card-title').textContent;
        const eventDateText = card.querySelector('.card-text:nth-child(3)').textContent.replace('Date:', '').trim();
        const entryFee = card.querySelector('.card-text:nth-child(4)').textContent.replace('Entry Fee:', '').trim();
            
        // Parse the event date
        const eventDate = new Date(eventDateText);
        const currentDate = new Date();
            
        // Check if event has passed
        if (eventDate < currentDate) {
            // Create a modal for past event
            const pastEventModal = document.createElement('div');
            pastEventModal.innerHTML = `
                <div class="modal fade show" tabindex="-1" style="display: block; background-color: rgba(0,0,0,0.5);">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title text-danger">Event Registration Closed</h5>
                                <button type="button" class="btn-close close-modal"></button>
                            </div>
                            <div class="modal-body">
                                <p>Sorry, registration for the <strong>${eventTitle}</strong> is no longer available.</p>
                                <p>This event occurred on ${eventDateText}.</p>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary close-modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
                
            document.body.appendChild(pastEventModal);
                
            // Close modal events
            const closeButtons = pastEventModal.querySelectorAll('.close-modal');
            closeButtons.forEach(closeBtn => {
                closeBtn.addEventListener('click', () => {
                    document.body.removeChild(pastEventModal);
                });
            });
                
            // Disable the register button visually
            button.disabled = true;
            button.classList.remove('btn-primary');
            button.classList.add('btn-secondary');
            button.textContent = 'Closed';
                
            return; // Stop further execution
        }
            
        // Existing registration confirmation logic
        const confirmRegistration = () => {
            const confirmationDialog = document.createElement('div');
            confirmationDialog.innerHTML = `
                <div class="modal fade show" tabindex="-1" style="display: block; background-color: rgba(0,0,0,0.5);">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Confirm Registration</h5>
                                <button type="button" class="btn-close cancel-registration"></button>
                            </div>
                            <div class="modal-body">
                                <p>You are registering for:</p>
                                <h4>${eventTitle}</h4>
                                <p>Date: ${eventDateText}</p>
                                <p>Entry Fee: ${entryFee}</p>
                                <p>Would you like to proceed to payment?</p>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary cancel-registration">Cancel</button>
                                <button type="button" class="btn btn-primary proceed-to-payment">Proceed to Payment</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
                
            document.body.appendChild(confirmationDialog);
                
            // Close modal events
            const closeCancelButtons = confirmationDialog.querySelectorAll('.cancel-registration');
            closeCancelButtons.forEach(closeBtn => {
                closeBtn.addEventListener('click', () => {
                    document.body.removeChild(confirmationDialog);
                });
            });
                
            // Proceed to Payment button
            const proceedButton = confirmationDialog.querySelector('.proceed-to-payment');
            proceedButton.addEventListener('click', () => {
                // Store event details in session storage to pass to payment page
                sessionStorage.setItem('selectedEvent', JSON.stringify({
                    Title: eventTitle,
                    Date: eventDateText,
                    Fee: entryFee
                }));
                    
                // Redirect to payment page
                window.location.href = 'Payment.html';
            });
        };
            
        // Show confirmation dialog for future events
        confirmRegistration();
    });
});
});


// 2. Event Countdown Timer
const eventDates = document.querySelectorAll('.card-text');
eventDates.forEach(dateElement => {
    if (dateElement.textContent.includes('Date:')) {
        const eventDate = new Date(dateElement.textContent.replace('Date:', '').trim());
            
        // Create countdown element
        const countdown = document.createElement('p');
        countdown.className = 'text-muted mt-2';
        dateElement.parentElement.appendChild(countdown);
            
        // Update countdown
        const updateCountdown = () => {
            const now = new Date();
            const difference = eventDate - now;
                
            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                countdown.textContent = `${days} days until event`;
            } else {
                countdown.textContent = 'Event has passed';
            }
        };
            
        // Initial countdown
        updateCountdown();
        // Update countdown daily
        setInterval(updateCountdown, 1000 * 60 * 60 * 24);
    }
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

        

        
 