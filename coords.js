
const coordinates = {
    // Europe
    "Andorra": { lat: 42.546245, lon: 1.601554 },
    "Albania": { lat: 41.153332, lon: 20.168331 },
    "Armenia": { lat: 40.069099, lon: 45.038189 },
    "Austria": { lat: 47.516231, lon: 14.550072 },
    "Azerbaijan": { lat: 40.143105, lon: 47.576927 },
    "Belgium": { lat: 50.503887, lon: 4.469936 },
    "Bosnia and Herzegovina": { lat: 43.915886, lon: 17.679076 },
    "Bulgaria": { lat: 42.733883, lon: 25.48583 },
    "Croatia": { lat: 45.1, lon: 15.2 },
    "Cyprus": { lat: 35.126413, lon: 33.429859 },
    "Czech Republic": { lat: 49.817492, lon: 15.472962 },
    "Denmark": { lat: 56.26392, lon: 9.501785 },
    "Estonia": { lat: 58.595272, lon: 25.013607 },
    "Finland": { lat: 61.92411, lon: 25.748151 },
    "France": { lat: 46.227638, lon: 2.213749 },
    "Georgia": { lat: 42.315407, lon: 43.356892 },
    "Germany": { lat: 51.165691, lon: 10.451526 },
    "Greece": { lat: 39.074208, lon: 21.824312 },
    "Hungary": { lat: 47.162494, lon: 19.503304 },
    "Iceland": { lat: 64.963051, lon: -19.020835 },
    "Ireland": { lat: 53.41291, lon: -8.24389 },
    "Italy": { lat: 41.87194, lon: 12.56738 },
    "Latvia": { lat: 56.879635, lon: 24.603189 },
    "Liechtenstein": { lat: 47.166, lon: 9.555373 },
    "Lithuania": { lat: 55.169438, lon: 23.881275 },
    "Luxembourg": { lat: 49.815273, lon: 6.129583 },
    "Malta": { lat: 35.937496, lon: 14.375416 },
    "Moldova": { lat: 47.411631, lon: 28.369885 },
    "Monaco": { lat: 43.750298, lon: 7.412841 },
    "Montenegro": { lat: 42.708678, lon: 19.37439 },
    "Netherlands": { lat: 52.132633, lon: 5.291266 },
    "North Macedonia": { lat: 41.608635, lon: 21.745275 },
    "Norway": { lat: 60.472024, lon: 8.468946 },
    "Poland": { lat: 51.919438, lon: 19.145136 },
    "Portugal": { lat: 39.399872, lon: -8.224454 },
    "Romania": { lat: 45.943161, lon: 24.96676 },
    "Russia": { lat: 61.52401, lon: 105.318756 },
    "Serbia": { lat: 44.016521, lon: 21.005859 },
    "Slovakia": { lat: 48.669026, lon: 19.699024 },
    "Slovenia": { lat: 46.151241, lon: 14.995463 },
    "Spain": { lat: 40.463667, lon: -3.74922 },
    "Sweden": { lat: 60.128161, lon: 18.643501 },
    "Switzerland": { lat: 46.818188, lon: 8.227512 },
    "Turkey": { lat: 38.963745, lon: 35.243322 },
    "Ukraine": { lat: 48.379433, lon: 31.16558 },
    "United Kingdom": { lat: 55.378051, lon: -3.435973 },

    // Asia
    "Afghanistan": { lat: 33.93911, lon: 67.709953 },
    "Armenia": { lat: 40.069099, lon: 45.038189 },
    "Azerbaijan": { lat: 40.143105, lon: 47.576927 },
    "Bahrain": { lat: 25.930414, lon: 50.637772 },
    "Bangladesh": { lat: 23.684994, lon: 90.356331 },
    "Bhutan": { lat: 27.514162, lon: 90.433601 },
    "Brunei": { lat: 4.535277, lon: 114.727669 },
    "Cambodia": { lat: 12.565679, lon: 104.990963 },
    "China": { lat: 35.86166, lon: 104.195397 },
    "Georgia": { lat: 42.315407, lon: 43.356892 },
    "India": { lat: 20.593684, lon: 78.96288 },
    "Indonesia": { lat: -0.789275, lon: 113.921327 },
    "Israel": { lat: 31.046051, lon: 34.851612 },
    "Japan": { lat: 36.204824, lon: 138.252924 },
    "Jordan": { lat: 30.585164, lon: 36.238414 },
    "Kazakhstan": { lat: 48.019573, lon: 66.923684 },
    "Kuwait": { lat: 29.31166, lon: 47.481766 },
    "Kyrgyzstan": { lat: 41.20438, lon: 74.766098 },
    "Laos": { lat: 19.85627, lon: 102.495496 },
    "Lebanon": { lat: 33.854721, lon: 35.862285 },
    "Malaysia": { lat: 4.210484, lon: 101.975766 },
    "Maldives": { lat: 3.202778, lon: 73.22068 },
    "Mongolia": { lat: 46.862496, lon: 103.846656 },
    "Myanmar": { lat: 21.913965, lon: 95.956223 },
    "Nepal": { lat: 28.394857, lon: 84.124008 },
    "North Korea": { lat: 40.339852, lon: 127.510093 },
    "Pakistan": { lat: 30.375321, lon: 69.345116 },
    "Palestinian Territories": { lat: 31.952162, lon: 35.233154 },
    "Philippines": { lat: 12.879721, lon: 121.774017 },
    "Qatar": { lat: 25.354826, lon: 51.183884 },
    "Saudi Arabia": { lat: 23.885942, lon: 45.079162 },
    "Singapore": { lat: 1.352083, lon: 103.819836 },
    "South Korea": { lat: 35.907757, lon: 127.766922 },
    "Sri Lanka": { lat: 7.873054, lon: 80.771797 },
    "Syria": { lat: 34.802075, lon: 38.996815 },
    "Tajikistan": { lat: 38.861034, lon: 71.276093 },
    "Thailand": { lat: 15.870032, lon: 100.992541 },
    "Timor-Leste": { lat: -8.874217, lon: 125.727539 },
    "Turkey": { lat: 38.963745, lon: 35.243322 },
    "Turkmenistan": { lat: 38.969719, lon: 59.556278 },
    "United Arab Emirates": { lat: 23.424076, lon: 53.847818 },
    "Uzbekistan": { lat: 41.377491, lon: 64.585262 },
    "Vietnam": { lat: 14.058324, lon: 108.277199 },

    // Africa
    "Algeria": { lat: 28.033886, lon: 1.659626 },
    "Angola": { lat: -11.202692, lon: 17.873887 },
    "Benin": { lat: 9.307499, lon: 2.315834 },
    "Botswana": { lat: -22.328474, lon: 24.684866 },
    "Burkina Faso": { lat: 12.238333, lon: -1.561593 },
    "Burundi": { lat: -3.373056, lon: 29.918886 },
    "Cabo Verde": { lat: 16.002082, lon: -24.013197 },
    "Cameroon": { lat: 3.848, lon: 11.5021 },
    "Central African Republic": { lat: 6.611111, lon: 20.939444 },
    "Chad": { lat: 15.454166, lon: 18.732207 },
    "Comoros": { lat: -11.875001, lon: 43.872219 },
    "Congo, Democratic Republic of the": { lat: -4.038333, lon: 21.758664 },
    "Congo, Republic of the": { lat: -0.228021, lon: 15.827014 },
    "Djibouti": { lat: 11.825138, lon: 42.590275 },
    "Egypt": { lat: 26.820553, lon: 30.802498 },
    "Equatorial Guinea": { lat: 1.650801, lon: 10.267895 },
    "Eritrea": { lat: 15.179384, lon: 39.782334 },
    "Eswatini": { lat: -26.522503, lon: 31.465866 },
    "Ethiopia": { lat: 9.145 },
    "Gabon": { lat: -0.803689, lon: 11.609444 },
    "Gambia": { lat: 13.443182, lon: -15.310139 },
    "Ghana": { lat: 7.946527, lon: -1.023194 },
    "Guinea": { lat: 9.945587, lon: -9.696645 },
    "Guinea-Bissau": { lat: 11.803749, lon: -15.180413 },
    "Ivory Coast": { lat: 7.539989, lon: -5.54708 },
    "Kenya": { lat: -1.2920659, lon: 36.8219462 },
    "Lesotho": { lat: -29.609988, lon: 28.233608 },
    "Liberia": { lat: 6.428055, lon: -9.429499 },
    "Libya": { lat: 26.3351, lon: 17.228331 },
    "Madagascar": { lat: -18.766947, lon: 46.869107 },
    "Malawi": { lat: -13.254308, lon: 34.301525 },
    "Mali": { lat: 17.570692, lon: -3.996166 },
    "Mauritania": { lat: 21.00789, lon: -10.940835 },
    "Mauritius": { lat: -20.348404, lon: 57.552152 },
    "Morocco": { lat: 31.7917, lon: -7.0926 },
    "Mozambique": { lat: -18.665695, lon: 35.529562 },
    "Namibia": { lat: -22.95764, lon: 18.49041 },
    "Niger": { lat: 17.607789, lon: 8.081666 },
    "Nigeria": { lat: 9.082, lon: 8.6753 },
    "Rwanda": { lat: -1.940278, lon: 29.873888 },
    "Sao Tome and Principe": { lat: 0.18636, lon: 6.613081 },
    "Senegal": { lat: 14.497401, lon: -14.452362 },
    "Seychelles": { lat: -4.679574, lon: 55.491977 },
    "Sierra Leone": { lat: 8.460555, lon: -11.779889 },
    "Somalia": { lat: 5.152149, lon: 46.199616 },
    "South Africa": { lat: -30.559482, lon: 22.937506 },
    "South Sudan": { lat: 6.8769, lon: 31.306978 },
    "Sudan": { lat: 12.862807, lon: 30.217636 },
    "Togo": { lat: 8.6195, lon: 0.8232 },
    "Uganda": { lat: 1.373333, lon: 32.290275 },
    "Zambia": { lat: -13.133897, lon: 27.849332 },
    "Zimbabwe": { lat: -19.015438, lon: 29.154857 },

    // North America
    "Canada": { lat: 56.130366, lon: -106.346771 },
    "United States": { lat: 37.09024, lon: -95.712891 },
    "Mexico": { lat: 23.634501, lon: -102.552784 },

    // South America
    "Argentina": { lat: -38.416097, lon: -63.616672 },
    "Brazil": { lat: -14.235004, lon: -51.92528 },
    "Chile": { lat: -35.675147, lon: -71.542969 },
    "Colombia": { lat: 4.570868, lon: -74.297333 },
    "Peru": { lat: -9.19, lon: -75.0152 },

    // Oceania
    "Australia": { lat: -25.274398, lon: 133.775136 },
    "New Zealand": { lat: -40.900557, lon: 174.885971 },
    "Fiji": { lat: -17.713371, lon: 178.06503 },
    "Papua New Guinea": { lat: -6.314993, lon: 143.95555 }
};

export default coordinates;
