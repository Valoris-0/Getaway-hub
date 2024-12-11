document.addEventListener('DOMContentLoaded', () => {
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

function validateForm() {
    // Add form validation logic
    return true;
}

async function submitBooking() {
    // Simulate API call with delay
    return new Promise(resolve => setTimeout(resolve, 1000));
}

function showConfirmation() {
    alert('Booking confirmed! Check your email for confirmation details.');
}

function showError(message) {
    alert(message);
}
