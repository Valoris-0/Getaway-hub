document.addEventListener('DOMContentLoaded', async () => {
    await loadDistances();
    // Initialize the map
    initializeMap();
    
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

    // Load confirmation if on confirmation page
    if (window.location.pathname.includes('confirmation.html')) {
        loadBookingConfirmation();
    }

    setupMapFilters();

    // Add direct event listener for calculator button
    const calculateBtn = document.getElementById('calculate-btn');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', function() {
            const origin = document.getElementById('origin').value.trim();
            const destination = document.getElementById('destination').value.trim();
            const transportMode = document.getElementById('transport-mode').value;

            console.log('Calculate clicked:', { origin, destination, transportMode }); // Debug log

            if (!origin || !destination) {
                showCalculationError('Please enter both origin and destination');
                return;
            }

            handleCalculation(origin, destination, transportMode);
        });
    }

    initializeDestinationPage();
});

// Add new helper function for error display
function showCalculationError(message) {
    const result = document.getElementById('calculation-result');
    result.innerHTML = `
        <div class="calculation-error">
            <p>⚠️ ${message}</p>
        </div>
    `;
}

// Add new function to handle the calculation
function handleCalculation(origin, destination, transportMode) {
    console.log('Starting calculation...'); // Debug log
    console.log('Available distances:', Object.keys(distances).length); // Debug log

    const emissionFactors = {
        train: 0.041,
        car: 0.171,
        bus: 0.089,
        boat: 0.190,
        plane: 0.255
    };

    try {
        const result = document.getElementById('calculation-result');
        result.innerHTML = '<div class="loading-spinner">Calculating...</div>';

        const distance = getDistance(origin, destination);
        console.log('Found distance:', distance); // Debug log

        if (!distance) {
            throw new Error(`No route found between ${origin} and ${destination}`);
        }

        const carbonFootprint = Math.round(distance * emissionFactors[transportMode]);

        result.innerHTML = `
            <div class="calculation-result">
                <div class="result-header">
                    <h3>📊 Carbon Footprint Result</h3>
                </div>
                <div class="result-details">
                    <div class="result-row">
                        <span>From:</span>
                        <strong>${origin.charAt(0).toUpperCase() + origin.slice(1)}</strong>
                    </div>
                    <div class="result-row">
                        <span>To:</span>
                        <strong>${destination.charAt(0).toUpperCase() + destination.slice(1)}</strong>
                    </div>
                    <div class="result-row">
                        <span>Distance:</span>
                        <strong>${Math.round(distance)} km</strong>
                    </div>
                    <div class="result-row">
                        <span>Transport:</span>
                        <strong>${transportMode.charAt(0).toUpperCase() + transportMode.slice(1)}</strong>
                    </div>
                    <div class="result-total">
                        <span>Total CO2:</span>
                        <strong>${carbonFootprint} kg CO2</strong>
                    </div>
                </div>
                ${getSustainabilityTip(transportMode, carbonFootprint)}
                <div class="result-comparison">
                    <p>🌳 This is equivalent to ${(carbonFootprint / 0.0115).toFixed(1)} trees needed for a year to absorb this CO2.</p>
                </div>
            </div>
        `;
    } catch (error) {
        console.error('Calculation error:', error); // Debug log
        showCalculationError(error.message);
    }
}

let distances = {};

// Update loadDistances to properly import routes
async function loadDistances() {
    try {
        // Get routes directly from the routes.js file that's already included in the HTML
        distances = window.distances || {};
        console.log('Distances loaded:', Object.keys(distances).length);
        return distances;
    } catch (error) {
        console.error('Error loading distances:', error);
        return {};
    }
}

// A function to retrieve the distance, regardless of direction
function getDistance(from, to) {
    from = formatCountryName(from);
    to = formatCountryName(to);
    
    // Try all possible combinations
    const combinations = [
        `${from}-${to}`,
        `${to}-${from}`,
        `${standardizeCountryName(from)}-${standardizeCountryName(to)}`,
        `${standardizeCountryName(to)}-${standardizeCountryName(from)}`
    ];

    console.log('Trying combinations:', combinations); // Debug log
    
    for (const route of combinations) {
        if (distances[route]) {
            console.log('Found route:', route, 'distance:', distances[route]); // Debug log
            return distances[route];
        }
    }
    
    // If no direct route found, try to find similar routes
    const allRoutes = Object.keys(distances);
    for (const route of allRoutes) {
        const [start, end] = route.split('-');
        if ((start.includes(from) || from.includes(start)) && 
            (end.includes(to) || to.includes(end))) {
            console.log('Found similar route:', route, 'distance:', distances[route]); // Debug log
            return distances[route];
        }
    }
    
    console.log('No route found for:', from, to); // Debug log
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

// Update loadAccommodations with high-quality image URLs
function loadAccommodations() {
    const grid = document.querySelector('.accommodation-grid');
    const accommodations = [
        { 
            name: 'Eco Resort Costa Rica', 
            location: 'Guanacaste, Costa Rica', 
            rating: 5,
            image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2070',
            description: 'Luxury eco-resort nestled in the heart of Costa Rica\'s pristine rainforest.'
        },
        { 
            name: 'Green Hotel', 
            location: 'Manuel Antonio, Costa Rica', 
            rating: 4,
            image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2070',
            description: 'Sustainable boutique hotel with panoramic ocean views.'
        },
        { 
            name: 'Rainforest Lodge', 
            location: 'Monteverde, Costa Rica', 
            rating: 5,
            image: 'https://images.unsplash.com/photo-1470165301023-58dab8118cc9?q=80&w=2070',
            description: 'Immersive rainforest experience with private hiking trails.'
        },
        { 
            name: 'Beach Eco Resort', 
            location: 'Tamarindo, Costa Rica', 
            rating: 4,
            image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=2070',
            description: 'Beachfront eco-resort with world-class sustainability practices.'
        },
        { 
            name: 'Sustainable Mountain Lodge',
            location: 'Swiss Alps',
            rating: 5,
            image: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562'
        },
        {
            name: 'Solar Powered Resort',
            location: 'Maldives',
            rating: 5,
            image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000'
        },
        {
            name: 'Treehouse Eco Resort',
            location: 'Amazon, Brazil',
            rating: 4,
            image: 'https://images.unsplash.com/photo-1488462237308-ecaa28b729d7'
        },
        {
            name: 'Zero-Waste Hotel',
            location: 'Copenhagen, Denmark',
            rating: 5,
            image: 'https://images.unsplash.com/photo-1601918774946-25832a4be0d6'
        },
        {
            name: 'Organic Farm Stay',
            location: 'Tuscany, Italy',
            rating: 4,
            image: 'https://images.unsplash.com/photo-1594498653385-d5172c532c00'
        },
        {
            name: 'Wind-Powered Lodge',
            location: 'Scotland Highlands',
            rating: 4,
            image: 'https://images.unsplash.com/photo-1585543805890-6051f7829f98?q=100&w=1920&auto=format&fit=crop'
        },
        {
            name: 'Desert Eco Lodge',
            location: 'Dubai, UAE',
            rating: 5,
            image: 'https://images.unsplash.com/photo-1542401886-65d6c61db217?q=100&w=1920&auto=format&fit=crop',
            description: 'Solar-powered desert oasis with sustainable water management'
        },
        {
            name: 'Arctic Ice Hotel',
            location: 'Rovaniemi, Finland',
            rating: 5,
            image: 'https://images.unsplash.com/photo-1626268220143-33e731d4aa1c?q=80&w=2070',
            description: 'Seasonal eco-lodge built with renewable materials and powered by renewable energy.'
        },
        {
            name: 'Forest Canopy Resort',
            location: 'British Columbia, Canada',
            rating: 4,
            image: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?q=100&w=1920&auto=format&fit=crop',
            description: 'Minimal impact treetop lodging in old growth forest'
        }
    ];
    
    grid.innerHTML = ''; // Clear existing content
    accommodations.forEach(acc => {
        const card = createEnhancedAccommodationCard(acc);
        grid.appendChild(card);
    });
}

function createEnhancedAccommodationCard(acc) {
    const div = document.createElement('div');
    div.className = 'accommodation-card';
    
    // Add amenities and details to the accommodation object
    acc.amenities = acc.amenities || [
        { icon: '🌱', name: 'Sustainable Practices' },
        { icon: '♻️', name: 'Waste Recycling' },
        { icon: '💧', name: 'Water Conservation' },
        { icon: '🔋', name: 'Renewable Energy' },
        { icon: '🌿', name: 'Organic Garden' },
        { icon: '🏃', name: 'Eco-Activities' }
    ];
    
    acc.details = acc.details || {
        sustainability: 'This eco-friendly accommodation implements various sustainable practices to minimize environmental impact.',
        location: 'Situated in a pristine natural environment, carefully chosen to preserve local ecosystems.',
        activities: 'Offers various eco-friendly activities and educational programs about sustainable living.'
    };

    div.innerHTML = `
        <div class="card-image-container">
            <img src="${acc.image}" alt="${acc.name}" loading="lazy">
            <div class="eco-badge">♻️ Eco-Certified</div>
        </div>
        <div class="card-content">
            <h3>${acc.name}</h3>
            <p class="location">📍 ${acc.location}</p>
            <div class="rating">${'★'.repeat(acc.rating)}${'☆'.repeat(5-acc.rating)}</div>
            <button class="learn-more-btn" data-id="${acc.name.replace(/\s+/g, '-').toLowerCase()}">Learn More</button>
        </div>
    `;

    const learnMoreBtn = div.querySelector('.learn-more-btn');
    learnMoreBtn.addEventListener('click', () => showAccommodationDetails(acc));

    return div;
}

function showAccommodationDetails(acc) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close">×</button>
            <img src="${acc.image}" alt="${acc.name}" style="width:100%; height:300px; object-fit:cover; border-radius:15px;">
            <h2 style="margin:1rem 0">${acc.name}</h2>
            <p class="location">📍 ${acc.location}</p>
            <div class="rating" style="margin:1rem 0">${'★'.repeat(acc.rating)}${'☆'.repeat(5-acc.rating)}</div>
            
            <div class="details-section">
                <h3>Sustainability Features</h3>
                <div class="amenities-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(150px, 1fr)); gap:1rem; margin:1rem 0;">
                    ${acc.amenities.map(amenity => `
                        <div class="amenity-item" style="display:flex; align-items:center; gap:0.5rem;">
                            <span>${amenity.icon}</span>
                            <span>${amenity.name}</span>
                        </div>
                    `).join('')}
                </div>
                
                <h3>About This Location</h3>
                <p>${acc.details.sustainability}</p>
                <p>${acc.details.location}</p>
                
                <h3>Activities & Programs</h3>
                <p>${acc.details.activities}</p>
                
                <button class="book-now-btn" style="width:100%; padding:1rem; background:var(--primary-color); color:white; border:none; border-radius:8px; margin-top:1rem; cursor:pointer;">
                    Book Your Eco-Stay
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('active'), 10);

    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 300);
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        }
    });

    const bookBtn = modal.querySelector('.book-now-btn');
    bookBtn.addEventListener('click', () => {
        window.location.href = 'booking.html';
    });
}

// Update loadTravelTips with more sustainable tips
function loadTravelTips() {
    const grid = document.querySelector('.tips-grid');
    const tips = [
        {
            icon: '🌱',
            title: 'Zero Waste Travel',
            description: 'Pack reusable items like water bottles, bags, and utensils to minimize waste during your journey.',
            category: 'Environment'
        },
        {
            icon: '🚲',
            title: 'Local Transport',
            description: 'Use public transportation, bike rentals, or walk to reduce your carbon footprint while exploring.',
            category: 'Transport'
        },
        {
            icon: '🏘️',
            title: 'Community Support',
            description: 'Choose locally-owned accommodations and restaurants to support the local economy.',
            category: 'Community'
        },
        // Add more detailed tips
    ];
    
    grid.innerHTML = ''; // Clear existing content
    tips.forEach(tip => {
        const card = createEnhancedTipCard(tip);
        grid.appendChild(card);
    });
}

function createEnhancedTipCard(tip) {
    const div = document.createElement('div');
    div.className = 'tip-card';
    div.innerHTML = `
        <div class="tip-content">
            <div class="tip-icon">${tip.icon}</div>
            <h3>${tip.title}</h3>
            <p>${tip.description}</p>
            <div class="tip-actions">
                <button class="tip-button">Learn More</button>
                <span class="tip-category">${tip.category || 'General'}</span>
            </div>
        </div>
    `;
    return div;
}

function handleNewsletter() {
    // Add newsletter subscription logic here
    alert('Thank you for subscribing!');
}

// Add image quality optimization to createAccommodationCard
function createAccommodationCard(acc) {
    const div = document.createElement('div');
    div.className = 'accommodation-card';
    div.innerHTML = `
        <img 
            src="${acc.image}" 
            alt="${acc.name}" 
            loading="lazy" 
            style="opacity: 1; min-height: 200px;"
            fetchpriority="high"
            decoding="async"
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

// Update optimizeImages function
function optimizeImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                // Add high quality parameters to data-src URLs
                const highQualityUrl = img.dataset.src.includes('?') 
                    ? `${img.dataset.src}&q=100&w=1920` 
                    : `${img.dataset.src}?q=100&w=1920`;
                img.src = highQualityUrl;
                img.setAttribute('fetchpriority', 'high');
                img.setAttribute('decoding', 'async');
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
            ${getPreferencesHTML(bookingData.preferences)}
        </div>
    ` : '';
}

function setupMapFilters() {
    const mapFilters = document.querySelectorAll('.map-filters button');
    const mapImages = document.querySelector('.map-images');

    mapFilters.forEach(filter => {
        filter.addEventListener('click', () => {
            const images = JSON.parse(filter.dataset.images);
            mapImages.innerHTML = images.map(src => `
                <img src="${src}" alt="Destination" class="map-image" />
            `).join('');
        });
    });
}

function initializeMap() {
    // This can be empty if you're not using an actual map
    console.log('Map initialized');
}
