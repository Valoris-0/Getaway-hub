/**
 * Form elements used across functions:
 * - bookingForm: Main form element (line 8)
 * - startDate: Check-in date input (line 9)
 * - endDate: Check-out date input (line 10)
 * Used in: 
 * - DOMContentLoaded event (line 7)
 * - validateForm (line 42)
 * - submitBooking (line 51)
 */
document.addEventListener('DOMContentLoaded', () => {
    // Get form elements
    const bookingForm = document.getElementById('booking-form');
    const startDate = document.getElementById('start-date');
    const endDate = document.getElementById('end-date');

    // Set minimum date to today for date inputs
    const today = new Date().toISOString().split('T')[0];
    startDate.min = today;
    endDate.min = today;

    // Update end date minimum when start date changes
    startDate.addEventListener('change', () => {
        endDate.min = startDate.value;
    });

    bookingForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            try {
                await submitBooking();
                window.location.href = 'confirmation.html';
            } catch (error) {
                showError('Booking submission failed. Please try again.');
            }
        }
    });
});

/**
 * Local variables in validateForm:
 * No specific variables, returns boolean
 * Called from: form submit handler (line 24)
 */
function validateForm() {
    // Add form validation logic
    return true;
}

/**
 * Local variables in submitBooking:
 * Returns: Promise<void>
 * Called from: form submit handler (line 25)
 */
async function submitBooking() {
    // Simulate API call with delay
    return new Promise(resolve => setTimeout(resolve, 1000));
}

/**
 * Displays booking confirmation message
 * Called from: successful form submission
 */
function showConfirmation() {
    alert('Booking confirmed! Check your email for confirmation details.');
}

/**
 * Error display function
 * @param {string} message - Error text to show
 * Called from: form submit handler (line 28)
 */
function showError(message) {
    alert(message);
}
