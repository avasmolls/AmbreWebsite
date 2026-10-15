// All perfumes data

const PERFUMES = [
    // Golden Veil
    {
        "id": "golden-veil",
        "name": "Golden Veil",
        "family": "warm",
        "notes": ["Amber", "Vanilla", "Sandalwood"],
        "price": 78,
        "size": "50 ml",
        "rating": 5,
        "reviews": 120,
        "image": "images/golden-veil.jpg",
        "description": "Sun-warmed amber wrapped in vanilla and creamy sandalwood. Golden hour on stone terraces."
    },
    // Velvet Nuit
    {
        "id": "velvet-nuit",
        "name": "Velvet Nuit",
        "family": "dark",
        "notes": ["Dark Cherry", "Musk", "Oud"],
        "price": 78,
        "size": "50 ml",
        "rating": 5,
        "reviews": 98,
        "image": "images/velvet-nuit.jpg",
        "description": "Dark cherry and soft musk over deep oud. Made for candlelit rooms and long evenings."
    },
    // Ivory Bloom
    {
        "id": "ivory-bloom",
        "name": "Ivory Bloom",
        "family": "floral",
        "notes": ["Jasmine", "Rose", "Soft Amber"],
        "price": 78,
        "size": "50 ml",
        "rating": 5,
        "reviews": 86,
        "image": "images/ivory-bloom.jpg",
        "description": "White jasmine and rose resting on soft amber. Gentle, graceful and quietly romantic."
    },
    // Soleil d'Or
    {
        "id": "soleil-dor",
        "name": "Soleil D’Or",
        "family": "fresh",
        "notes": ["Citrus", "Neroli", "Vanilla"],
        "price": 78,
        "size": "50 ml",
        "rating": 5,
        "reviews": 102,
        "image": "images/soleil-dor.jpg",
        "description": "Sparkling citrus and neroli melting into warm vanilla. Sunshine on the water."
    },
    // Midnight Ember
    {
        "id": "midnight-ember",
        "name": "Midnight Ember",
        "family": ["warm", "dark"],
        "notes": ["Dark Cherry", "Musk", "Oud"],
        "price": 78,
        "size": "50 ml",
        "rating": 4.8,
        "reviews": 98,
        "image": "images/midnight-ember.jpg",
        "description": "Dark cherry and soft musk over deep oud. Made for candlelit rooms and long evenings."
    },
    // Rose Allure
    {
        "id": "rose-allure",
        "name": "Rose Allure",
        "family": "floral",
        "notes": ["Rose", "Jasmine", "Soft Amber"],
        "price": 78,
        "size": "50 ml",
        "rating": 4.9,
        "reviews": 86,
        "image": "images/rose-allure.jpg",
        "description": "White jasmine and rose resting on soft amber. Gentle, graceful and quietly romantic."
    }
];

// Shared search function for all perfumes
function searchPerfumes(query) {
    const norm = s => String(s).toLowerCase().replace(/[’'.\-]/g, '');
    const words = norm(query).split(/\s+/).filter(Boolean);
    const list = PERFUMES.filter(p => {
        const hay = norm([p.name, p.family, p.notes.join(' '), p.description].join(' '));
        return words.every(w => hay.includes(w));
    });
    return { words, list };
}