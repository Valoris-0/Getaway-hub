document.addEventListener('DOMContentLoaded', () => {
    // Initialize the map
    initializeMap();
    
    // Setup carbon calculator
    const calculator = document.getElementById('carbon-calculator');
    if (calculator) {
        calculator.addEventListener('submit', handleCalculatorSubmit);
    }

    // Load accommodations
    loadAccommodations();

    // Load travel tips
    loadTravelTips();

    // Newsletter subscription
    const newsletter = document.getElementById('newsletter');
    newsletter.addEventListener('submit', (e) => {
        e.preventDefault();
        handleNewsletter();
    });

    // Initialize image optimization
    optimizeImages();

    // Load placeholder images
    loadPlaceholderImages();

    // Setup booking form handler
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleBookingSubmit);
    }
    
    // Load confirmation if on confirmation page
    if (window.location.pathname.includes('confirmation.html')) {
        loadBookingConfirmation();
    }

    setupMapFilters();
});

function initializeMap() {
    // Placeholder for map initialization
    const map = document.getElementById('interactive-map');
    // Add map implementation here
}

// Add this function after initializeMap()
function setupMapFilters() {
    const mapImages = document.querySelector('.map-images');
    const filterButtons = document.querySelectorAll('.map-filters button');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Get images array from data attribute
            const images = JSON.parse(button.dataset.images);
            
            // Clear current images
            mapImages.innerHTML = '';
            
            // Create and add new images
            images.forEach(imgSrc => {
                const img = document.createElement('img');
                img.src = imgSrc;
                img.alt = `${button.textContent} destination`;
                img.loading = "lazy";
                mapImages.appendChild(img);
                
                // Force reflow and add visible class
                setTimeout(() => {
                    img.classList.add('visible');
                }, 10);
            });
        });
    });

    // Trigger click on first button to show initial images
    filterButtons[0].click();
}

function handleCalculatorSubmit(e) {
    e.preventDefault();
    calculateCarbon();
}

async function calculateCarbon() {
    const origin = document.querySelector('#carbon-calculator input[placeholder="Origin"]').value.toLowerCase().trim();
    const destination = document.querySelector('#carbon-calculator input[placeholder="Destination"]').value.toLowerCase().trim();
    const transportMode = document.getElementById('transport-mode').value;
    
    const emissionFactors = {
        train: 0.041,
        car: 0.171,
        bus: 0.089,
        boat: 0.190,
        plane: 0.255
    };

    try {
        // Show loading state
        const result = document.getElementById('calculation-result');
        result.innerHTML = '<div class="loading">Calculating...</div>';

        const distance = getDistance(origin, destination);
        if (!distance) {
            throw new Error('Route not found');
        }

        const carbonFootprint = Math.round(distance * emissionFactors[transportMode]);

        result.innerHTML = `
            <div style="background: #f8f9fa; padding: 2rem; border-radius: 10px; margin-top: 2rem;">
                <h3>Estimated Carbon Footprint</h3>
                <p>From: ${origin.charAt(0).toUpperCase() + origin.slice(1)}</p>
                <p>To: ${destination.charAt(0).toUpperCase() + destination.slice(1)}</p>
                <p>Total Distance: ${Math.round(distance)} km</p>
                <p>Transport Mode: ${transportMode.charAt(0).toUpperCase() + transportMode.slice(1)}</p>
                <p><strong>Total CO2 Emissions: ${carbonFootprint} kg CO2</strong></p>
                ${getSustainabilityTip(transportMode, carbonFootprint)}
                <p class="comparison">This is equivalent to ${(carbonFootprint / 0.0115).toFixed(1)} trees needed to absorb this CO2 in one year.</p>
            </div>
        `;
    } catch (error) {
        const result = document.getElementById('calculation-result');
        result.innerHTML = `
            <div style="background: #fee; padding: 2rem; border-radius: 10px; margin-top: 2rem;">
                <p style="color: #c00;">Sorry, couldn't find a route between ${origin} and ${destination}. Please check your input and try again.</p>
            </div>
        `;
    }
}

const distances = {
    'spain-portugal': 503,
    'france-italy': 1421,
    'germany-italy': 1183,
    'france-uk': 343,
    'usa-canada': 2260,
    'usa-mexico': 3038,
    'china-japan': 2098,
    'china-russia': 5800,
    'australia-newzealand': 2326,
    'brazil-argentina': 2392,
    'poland-germany': 520,
    'poland-ukraine': 690,
    'poland-czech': 517,
    'netherlands-poland': 892,
    'poland-china': 6940,
    'japan-korea': 1158,
    'vietnam-thailand': 1000,
    'thailand-malaysia': 1343,
    'sweden-norway': 522,
    'sweden-finland': 397,
    'spain-morocco': 1000,
    'china-canada': 10230,
    'usa-brazil': 8100,
    'india-uk': 6800,
    'germany-portugal': 1510,
    'china-thailand': 3800,
    'india-southafrica': 11500,
    'uk-newzealand': 18500,
    'germany-uk': 775,
    'france-brazil': 9700,
    'japan-australia': 7700,
    'australia-brazil': 13700,
    'southafrica-australia': 10500,
    'india-china': 3500,
    'usa-germany': 7800,
    'portugal-italy': 1700,
    'sweden-denmark': 540,
    'australia-indonesia': 4400,
    'usa-france': 7750,
    'greece-uk': 3000,
    'canada-france': 6800,
    'japan-vietnam': 4000,
    'southkorea-china': 850,
    'portugal-uk': 1640,
    'thailand-singapore': 1400,
    'southkorea-japan': 1150,
    'italy-greece': 850,
    'germany-switzerland': 570,
    'brazil-peru': 2200,
    'spain-italy': 1300,
    'canada-uk': 5450,
    'germany-hungary': 850,
    'france-belgium': 309,
    'uk-ireland': 510,
    'poland-uk': 1500,
    'southafrica-namibia': 2300,
    'usa-southkorea': 10400,
    'germany-spain': 1902,
    'china-singapore': 5800,
    'germany-czech': 350,
    'italy-turkey': 1500,
    'china-philippines': 4200,
    'southafrica-kenya': 3900,
    'japan-taiwan': 213,
    'denmark-germany': 300,
    'china-taiwan': 1100,
    'germany-austria': 577,
    'southkorea-china': 850,
    'france-portugal': 1210,
    'brazil-argentina': 2392,
    'japan-malaysia': 4000,
    'australia-fiji': 3400,
    'india-nepal': 1000,
    'france-switzerland': 250,
    'italy-albania': 450,
    'india-sri-lanka': 2700,
    'netherlands-uk': 350,
    'southafrica-uganda': 3500,
    'germany-belgium': 202,
    'thailand-malaysia': 1343,
    'australia-usa': 12800,
    'japan-hongkong': 3200,
    'taiwan-china': 800,
    'china-australia': 7800,
    'southafrica-zimbabwe': 1300,
    'mexico-guatemala': 500,
    'brazil-chile': 3000,
    'chile-argentina': 1500,
    'uk-mexico': 8600,
    'australia-singapore': 6300,
    'singapore-indonesia': 700,
    'norway-russia': 1000,
    'canada-brazil': 7300,
    'china-usa': 11200,
    'india-indonesia': 5000,
    'belgium-luxembourg': 220,
    'china-thailand': 3800,
    'poland-italy': 1000,
    'germany-italy': 1183,
    'india-russia': 4000,
    'argentina-uruguay': 200,
    'venezuela-colombia': 500,
    'france-austria': 1100,
    'spain-uk': 1250,
    'china-kazakhstan': 2500,
    'canada-uk': 5450,
    'germany-swiss': 570,
    'southafrica-namibia': 2300,
    'usa-spain': 7750,
    'canada-southkorea': 9800,
    'india-thailand': 3500,
    'germany-netherlands': 577,
    'australia-germany': 16000,
    'china-pakistan': 3800,
    'brazil-colombia': 3000,
    'france-morocco': 2500,
    'china-cambodia': 4700,
    'japan-indonesia': 5000,
    'india-bangladesh': 700,
    'germany-denmark': 550,
    'poland-belgium': 310,
    'spain-germany': 1902,
    'portugal-spain': 503,
    'mexico-canada': 4300,
    'france-sweden': 1500,
    'china-uk': 9800,
    'uk-pakistan': 6500,
    'germany-bulgaria': 800,
    'china-vietnam': 6000,
    'argentina-chile': 1200,
    'usa-uk': 5600,
    'brazil-paraguay': 1200,
    'germany-poland': 520,
    'southafrica-tanzania': 2400,
    'brazil-ecuador': 2500,
    'china-mongolia': 2800,
    'germany-usa': 7800,
    'netherlands-france': 498,
    'spain-russia': 3500,
    'china-saudiarabia': 6800,
    'france-germany': 1054,
    'india-malaysia': 4000,
    'russia-kazakhstan': 5000,
    'mexico-peru': 2700,
    'brazil-bolivia': 1500,
    'uk-saudiarabia': 5000,
    'france-japan': 12000,
    'germany-china': 8500,
    'southkorea-usa': 10400,
    'china-egypt': 7700,
    'greece-turkey': 500,
    'canada-argentina': 11000,
    'france-turkey': 2000,
    'australia-southafrica': 10500,
    'spain-indonesia': 13000,
    'southkorea-uk': 11000,
    'argentina-italy': 9500,
    'spain-bulgaria': 2000,
    'southkorea-china': 850,
    'japan-philippines': 4200,
    'canada-italy': 9000,
    'france-southafrica': 10000,
    'usa-vietnam': 9300,
    'germany-argentina': 11000,
    'spain-japan': 13000,
    'brazil-usa': 8100,
    'china-belgium': 9800,
    'usa-italy': 7700,
    'germany-mexico': 4300,
    'poland-sweden': 800,
    'sweden-canada': 7000,
    'australia-canada': 17000,
    'spain-turkey': 3000
};


// A function to retrieve the distance, regardless of direction
function getDistance(from, to) {
    // Normalize and format inputs
    from = formatCountryName(from);
    to = formatCountryName(to);
    
    // Try all possible combinations
    const combinations = [
        `${from}-${to}`,
        `${to}-${from}`,
        `${standardizeCountryName(from)}-${standardizeCountryName(to)}`,
        `${standardizeCountryName(to)}-${standardizeCountryName(from)}`
    ];

    // Log for debugging
    console.log('Trying combinations:', combinations);
    
    // Check each combination
    for (const route of combinations) {
        if (distances[route]) {
            console.log('Found route:', route, 'distance:', distances[route]);
            return distances[route];
        }
    }
    
    console.log('No route found for:', from, to);
    return null;
}

function formatCountryName(country) {
    return country
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '')
        .replace(/[^a-z]/g, '');
}

// Add this helper function to standardize country names
function standardizeCountryName(country) {
    const standardNames = {
        'germany': 'germany',
        'deutschland': 'germany',
        'france': 'france',
        'nederland': 'netherlands',
        'netherlands': 'netherlands',
        'holland': 'netherlands',
        'uk': 'uk',
        'unitedkingdom': 'uk',
        'greatbritain': 'uk',
        'england': 'uk',
        'usa': 'usa',
        'unitedstates': 'usa',
        'america': 'usa',
        'us': 'usa',
        'southkorea': 'southkorea',
        'korea': 'southkorea',
        'newzealand': 'newzealand',
        'southafrica': 'southafrica',
        'spain': 'spain',
        'espana': 'spain',
        'portugal': 'portugal',
        'italia': 'italy',
        'italy': 'italy',
        'brasil': 'brazil',
        'brazil': 'brazil',
        'india': 'india',
        'china': 'china',
        'japan': 'japan',
        'australia': 'australia',
        'canada': 'canada',
        'mexico': 'mexico',
        'russia': 'russia'
    };
    
    const normalized = country.toLowerCase().replace(/\s+/g, '');
    return standardNames[normalized] || normalized;
}

function getSustainabilityTip(transportMode, carbonFootprint) {
    const tips = {
        train: `Great choice! Train travel is one of the most eco-friendly options. You're saving ${(0.255 - 0.041) * carbonFootprint / 0.041} kg CO2 compared to flying.`,
        car: `Consider carpooling or switching to electric vehicles. A full car can reduce per-person emissions by up to 75%.`,
        bus: `Public transportation is a sustainable choice! You're saving ${(0.171 - 0.089) * carbonFootprint / 0.089} kg CO2 compared to driving alone.`,
        boat: `While boats can be efficient for freight, consider faster low-carbon alternatives for passenger travel.`,
        airplane: `Air travel has a high impact. Consider offsetting your emissions or choosing ground transportation for shorter distances.`
    };
    
    return `<p class="tip" style="color: #2ecc71; margin-top: 1rem;">${tips[transportMode]}</p>`;
}

async function getGoogleMapsDistance(origin, destination, mode) {
    return new Promise((resolve, reject) => {
        const distanceService = new google.maps.DistanceMatrixService();
        const travelMode = mode === 'airplane' ? 'DRIVING' : mode.toUpperCase();

        distanceService.getDistanceMatrix(
            {
                origins: [origin],
                destinations: [destination],
                travelMode: google.maps.TravelMode[travelMode],
                unitSystem: google.maps.UnitSystem.METRIC,
            },
            (response, status) => {
                if (status === 'OK') {
                    const route = response.rows[0].elements[0];
                    if (route.status === 'OK') {
                        // Convert meters to kilometers
                        let distance = route.distance.value / 1000;
                        
                        // For air travel, calculate great circle distance
                        if (mode === 'airplane') {
                            distance = calculateAirDistance(origin, destination);
                        }
                        
                        resolve(distance);
                    } else {
                        reject(new Error('Route not found'));
                    }
                } else {
                    reject(new Error('Distance Matrix failed'));
                }
            }
        );
    });
}

// Add to your HTML head section:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places"></script>

function calculateRoughDistance(origin, destination) {
    // This is a simplified distance calculation for demonstration
    // In a real app, you would use a mapping API (like Google Maps API)
    
    // Convert locations to lowercase for comparison
    origin = origin.toLowerCase();
    destination = destination.toLowerCase();
    
    // Sample distances between major cities (km)
    const distances = {
        'london-paris': 344,
        'paris-berlin': 1054,
        'berlin-rome': 1181,
        'rome-madrid': 1362,
        'madrid-london': 1264
    };
    
    // Check if we have the route in our database
    const route = `${origin}-${destination}`;
    const reverseRoute = `${destination}-${origin}`;
    
    if (distances[route]) {
        return distances[route];
    } else if (distances[reverseRoute]) {
        return distances[reverseRoute];
    }
    
    // If route not found, generate a reasonable random distance
    // between 200 and 2000 km
    return Math.floor(Math.random() * 1800 + 200);
}

function loadAccommodations() {
    const grid = document.querySelector('.accommodation-grid');
    const accommodations = [
        { 
            name: 'Eco Resort Costa Rica', 
            location: 'Guanacaste, Costa Rica', 
            rating: 5,
            image: 'https://images.unsplash.com/photo-1665986428487-fd10823de57e'
        },
        { 
            name: 'Green Hotel', 
            location: 'Manuel Antonio, Costa Rica', 
            rating: 4,
            image: 'https://images.unsplash.com/photo-1669070888597-c3ccea5f0490'
        },
        { 
            name: 'Rainforest Lodge', 
            location: 'Monteverde, Costa Rica', 
            rating: 5,
            image: 'https://images.unsplash.com/photo-1648824583079-882553ad78b8'
        },
        { 
            name: 'Beach Eco Resort', 
            location: 'Tamarindo, Costa Rica', 
            rating: 4,
            image: 'https://images.unsplash.com/photo-1659511167968-01108951f78b'
        }
    ];
    
    accommodations.forEach(acc => {
        const card = createAccommodationCard(acc);
        grid.appendChild(card);
    });
}

function loadTravelTips() {
    const grid = document.querySelector('.tips-grid');
    const tips = [
        'Pack reusable items',
        'Choose eco-friendly transport',
        'Support local businesses'
        // Add more tips
    ];
    
    tips.forEach(tip => {
        const card = createTipCard(tip);
        grid.appendChild(card);
    });
}

function handleNewsletter() {
    // Add newsletter subscription logic here
    alert('Thank you for subscribing!');
}

function createAccommodationCard(acc) {
    const div = document.createElement('div');
    div.className = 'accommodation-card';
    div.innerHTML = `
        <img 
            src="${acc.image}" 
            alt="${acc.name}" 
            loading="lazy" 
            style="opacity: 1; min-height: 200px;"
        >
        <h3>${acc.name}</h3>
        <p>${acc.location}</p>
        <div class="rating">${'★'.repeat(acc.rating)}</div>
    `;
    return div;
}

function createTipCard(tip) {
    const div = document.createElement('div');
    div.className = 'tip-card';
    div.innerHTML = `
        <i class="tip-icon">💡</i>
        <p>${tip}</p>
    `;
    return div;
}

// Add smooth scroll behavior for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Remove or comment out the scroll event listener
/*
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.nav-menu');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll) {
        nav.style.transform = 'translateY(-100%)';
    } else {
        nav.style.transform = 'translateY(0)';
    }
    lastScroll = currentScroll;
});
*/

// Image loading optimization
function optimizeImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.addEventListener('load', () => {
                    img.classList.add('loaded');
                });
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Update image loading
function loadPlaceholderImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (!img.src || img.src === '') {
            img.src = 'public/assets/placeholder.png';
        }
    });
}

// Add this function to handle booking form submission
function handleBookingSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const bookingData = {
        destination: document.querySelector('#booking-destination').value,
        checkIn: document.querySelector('#check-in').value,
        checkOut: document.querySelector('#check-out').value,
        guests: document.querySelector('#guests').value,
        roomType: document.querySelector('#room-type').value,
        name: document.querySelector('#guest-name').value,
        email: document.querySelector('#guest-email').value,
        phone: document.querySelector('#guest-phone').value,
        preferences: {
            vegetarian: document.querySelector('#vegetarian')?.checked || false,
            earlyCheckIn: document.querySelector('#early-check-in')?.checked || false,
            airportTransfer: document.querySelector('#airport-transfer')?.checked || false
        }
    };
    
    // Store booking data in localStorage
    localStorage.setItem('bookingData', JSON.stringify(bookingData));
    
    // Redirect to confirmation page
    window.location.href = 'confirmation.html';
}

// Add this function to load booking confirmation
function loadBookingConfirmation() {
    const confirmationDetails = document.querySelector('.booking-details');
    
    // Get stored booking data
    const bookingData = JSON.parse(localStorage.getItem('bookingData')) || {
        destination: 'Default Resort',
        checkIn: '2024-01-01',
        checkOut: '2024-01-08',
        guests: '2',
        roomType: 'standard',
        name: 'Guest',
        email: 'guest@example.com',
        phone: '',
        preferences: {
            vegetarian: false,
            earlyCheckIn: false,
            airportTransfer: false
        }
    };
    
    if (confirmationDetails) {
        confirmationDetails.innerHTML = `
            <div class="detail-item">
                <span>Destination:</span>
                <strong>${bookingData.destination}</strong>
            </div>
            <div class="detail-item">
                <span>Room Type:</span>
                <strong>${bookingData.roomType.charAt(0).toUpperCase() + bookingData.roomType.slice(1)}</strong>
            </div>
            <div class="detail-item">
                <span>Check-in:</span>
                <strong>${new Date(bookingData.checkIn).toLocaleDateString()}</strong>
            </div>
            <div class="detail-item">
                <span>Check-out:</span>
                <strong>${new Date(bookingData.checkOut).toLocaleDateString()}</strong>
            </div>
            <div class="detail-item">
                <span>Guests:</span>
                <strong>${bookingData.guests}</strong>
            </div>
            <div class="detail-item">
                <span>Guest Name:</span>
                <strong>${bookingData.name}</strong>
            </div>
            <div class="detail-item">
                <span>Contact:</span>
                <strong>${bookingData.email}<br>${bookingData.phone}</strong>
            </div>
            ${getPreferencesHTML(bookingData.preferences)}
        `;
    }
}

function getPreferencesHTML(preferences) {
    const selectedPreferences = Object.entries(preferences)
        .filter(([_, value]) => value)
        .map(([key, _]) => {
            const label = key
                .split(/(?=[A-Z])/)
                .join(' ')
                .toLowerCase()
                .replace(/^\w/, c => c.toUpperCase());
            return `<li>${label}</li>`;
        });
    
    return selectedPreferences.length ? `
        <div class="detail-item">
            <span>Preferences:</span>
            <ul class="preferences-list">
                ${selectedPreferences.join('')}
            </ul>
        </div>
    ` : '';
}
