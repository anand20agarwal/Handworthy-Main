// Extended accessories data with detailed information
const detailedAccessoriesData = {
    'acc1': {
        id: 'acc1',
        name: 'AirPods Pro (2nd Gen)',
        category: 'earphones',
        description: 'AirPods Pro (2nd generation) deliver up to 2x more Active Noise Cancellation than the previous generation, along with Adaptive Transparency that lets you comfortably hear and interact with the world around you. Spatial Audio takes music and TV to new places. And a single charge delivers up to 6 hours of battery life.',
        price: 16600,
        originalPrice: 20750,
        discount: 20,
        images: [
            'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=500&h=500&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500&h=500&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=500&h=500&fit=crop&crop=center'
        ],
        features: [
            'Up to 2x more Active Noise Cancellation',
            'Adaptive Transparency',
            'Personalized Spatial Audio with dynamic head tracking',
            'Up to 6 hours of listening time with ANC enabled',
            'Up to 30 hours total listening time with case',
            'MagSafe Charging Case',
            'Sweat and water resistant (IPX4)',
            'Touch control for music and calls'
        ],
        specifications: {
            'Dimensions (Each)': '30.9 × 21.8 × 24.0 mm',
            'Weight (Each)': '5.3 grams',
            'Case Dimensions': '45.2 × 60.6 × 21.7 mm',
            'Case Weight': '50.8 grams',
            'Chip': 'Apple H2 headphone chip',
            'Battery Life': 'Up to 6 hours (ANC on)',
            'Charging Case': 'Up to 30 hours total',
            'Connectivity': 'Bluetooth 5.3',
            'Water Resistance': 'IPX4',
            'Compatibility': 'iPhone, iPad, Mac, Apple Watch, Apple TV'
        },
        rating: 4.8,
        reviews: 2456,
        stock: 'In Stock'
    },
    'acc2': {
        id: 'acc2',
        name: 'MagSafe Power Bank',
        category: 'powerbank',
        description: '10,000mAh wireless power bank with MagSafe compatibility. Snap it onto your iPhone 12 or later for convenient wireless charging on the go. Features fast wireless charging up to 15W and can charge multiple devices simultaneously.',
        price: 7470,
        originalPrice: 10770,
        discount: 31,
        images: [
            'https://www.notebookcheck.net/fileadmin/_processed_/b/4/csm_UGREEN_15W_Magsafe_Power_Bank_10000mAh_I_8_e6d5d5866c.jpg',
            'https://images.unsplash.com/photo-1609592847923-73e5b1e24b99?w=500&h=500&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=500&h=500&fit=crop&crop=center'
        ],
        features: [
            'MagSafe compatible for iPhone 12 and later',
            '10,000mAh high-capacity battery',
            '15W fast wireless charging',
            'Simultaneous charging of multiple devices',
            'Built-in LED power indicator',
            'Pass-through charging capability',
            'Foreign object detection for safety',
            'Compact and portable design'
        ],
        specifications: {
            'Capacity': '10,000mAh / 37Wh',
            'Wireless Output': '15W (Max)',
            'USB-C Input': '18W (Max)',
            'USB-C Output': '20W (Max)',
            'Dimensions': '105 × 67 × 20 mm',
            'Weight': '218 grams',
            'Charging Time': '3-4 hours (full charge)',
            'Compatibility': 'iPhone 12 series and later',
            'Safety Features': 'Overcurrent, overvoltage, temperature protection',
            'Certification': 'Qi-certified, FCC, CE'
        },
        rating: 4.6,
        reviews: 892,
        stock: 'In Stock'
    },
    'acc3': {
        id: 'acc3',
        name: 'iPhone 15 Pro Case',
        category: 'mobile',
        description: 'Premium leather case designed specifically for iPhone 15 Pro. Made from specially tanned and finished European leather for a luxurious look and feel. The case supports MagSafe charging and accessories.',
        price: 3820,
        originalPrice: 4980,
        discount: 23,
        images: [
            'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=500&h=500&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1601472182146-4df1b36f0770?w=500&h=500&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=500&h=500&fit=crop&crop=center'
        ],
        features: [
            'Premium European leather construction',
            'MagSafe compatible',
            'Precise cutouts for all ports and buttons',
            'Raised edges for camera and screen protection',
            'Easy snap-on design',
            'Ages beautifully with natural patina',
            'Wireless charging compatible',
            'Professional business look'
        ],
        specifications: {
            'Material': 'European leather with microfiber lining',
            'Compatibility': 'iPhone 15 Pro (6.1-inch)',
            'MagSafe': 'Fully compatible',
            'Protection Level': 'Everyday protection',
            'Button Coverage': 'All buttons covered',
            'Port Access': 'Lightning port accessible',
            'Screen Protection': 'Raised front lip',
            'Camera Protection': 'Raised camera ring',
            'Colors Available': 'Black, Brown, Midnight',
            'Thickness': '1.2mm added thickness'
        },
        rating: 4.7,
        reviews: 1234,
        stock: 'In Stock'
    },
    'acc4': {
        id: 'acc4',
        name: 'Bluetooth Speaker',
        category: 'bluetooth speaker',
        description: 'Portable wireless speaker with 360° sound technology. Delivers rich, room-filling sound with deep bass. Perfect for outdoor activities, home use, or travel. Features waterproof design and long-lasting battery.',
        price: 6640,
        originalPrice: 8300,
        discount: 20,
        images: [
            'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1589003077984-894e133dabab?w=500&h=500&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500&h=500&fit=crop&crop=center'
        ],
        features: [
            '360° omnidirectional sound',
            'Deep bass and crystal-clear highs',
            'IPX7 waterproof rating',
            '12-hour battery life',
            'Bluetooth 5.0 connectivity',
            'Built-in microphone for calls',
            'Voice assistant compatible',
            'Compact and portable design'
        ],
        specifications: {
            'Output Power': '20W RMS',
            'Frequency Response': '65Hz - 20kHz',
            'Bluetooth Version': '5.0',
            'Range': 'Up to 33 feet (10m)',
            'Battery Life': '12 hours at 50% volume',
            'Charging Time': '3 hours',
            'Water Rating': 'IPX7',
            'Dimensions': '95 × 95 × 175 mm',
            'Weight': '650 grams',
            'Supported Codecs': 'SBC, AAC'
        },
        rating: 4.5,
        reviews: 756,
        stock: 'Limited'
    },
    'acc5': {
        id: 'acc5',
        name: 'USB-C to Lightning Cable',
        category: 'cable',
        description: 'MFi Certified USB-C to Lightning cable for fast charging and data sync. Built with high-quality materials for durability and reliable performance. Perfect for charging your iPhone with USB-C power adapters.',
        price: 2075,
        originalPrice: 3320,
        discount: 37,
        images: [
            'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&h=500&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop&crop=center'
        ],
        features: [
            'MFi Certified by Apple',
            'Fast charging support up to 27W',
            'High-speed data transfer',
            'Durable braided design',
            'Tangle-free construction',
            '6 feet length for convenience',
            'Premium connector heads',
            'Universal USB-C compatibility'
        ],
        specifications: {
            'Length': '6 feet (1.8 meters)',
            'Connector A': 'USB-C',
            'Connector B': 'Lightning',
            'Data Transfer': 'USB 2.0 (480 Mbps)',
            'Power Delivery': 'Up to 27W',
            'Material': 'Braided nylon exterior',
            'Durability': '10,000+ bend test',
            'Certification': 'MFi Certified',
            'Compatibility': 'iPhone, iPad, AirPods',
            'Color': 'Space Gray'
        },
        rating: 4.4,
        reviews: 445,
        stock: 'In Stock'
    },
    'acc6': {
        id: 'acc6',
        name: '20W USB-C Adapter',
        category: 'adapter',
        description: 'Compact 20W USB-C power adapter provides fast, efficient charging at home, in the office, or on the go. Compatible with iPhone, iPad, and other USB-C devices. Features advanced safety protection.',
        price: 1660,
        originalPrice: 2490,
        discount: 33,
        images: [
            'https://tse2.mm.bing.net/th/id/OIP.xJRGwEDkO_NfgZdYb7rJEwAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
            'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&h=500&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop&crop=center'
        ],
        features: [
            '20W fast charging output',
            'Compact and lightweight design',
            'Universal USB-C compatibility',
            'Advanced safety protection',
            'Foldable prongs for portability',
            'Energy efficient design',
            'Overcurrent protection',
            'Temperature control'
        ],
        specifications: {
            'Output Power': '20W',
            'Input Voltage': '100-240V AC',
            'Output Voltage': '5V/3A, 9V/2.22A',
            'Connector': 'USB-C',
            'Dimensions': '32 × 32 × 32 mm',
            'Weight': '58 grams',
            'Safety Features': 'Over-voltage, over-current, short-circuit protection',
            'Certification': 'CE, FCC, UL',
            'Efficiency': '>90%',
            'Color': 'White'
        },
        rating: 4.6,
        reviews: 678,
        stock: 'In Stock'
    },
    'acc7': {
        id: 'acc7',
        name: 'Wireless Charger Pad',
        category: 'charger',
        description: '15W fast wireless charging pad with LED indicator. Features non-slip design and advanced safety features. Compatible with iPhone, AirPods, and other Qi-enabled devices.',
        price: 2900,
        originalPrice: 4150,
        discount: 30,
        images: [
            'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&h=500&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=500&h=500&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1609592847923-73e5b1e24b99?w=500&h=500&fit=crop&crop=center'
        ],
        features: [
            '15W fast wireless charging',
            'LED charging indicator',
            'Non-slip charging surface',
            'Case-friendly charging',
            'Foreign object detection',
            'Temperature control',
            'Sleep-friendly design',
            'Universal Qi compatibility'
        ],
        specifications: {
            'Max Output': '15W',
            'Input': '5V/2A, 9V/1.67A',
            'Charging Distance': 'Up to 6mm',
            'Indicator': 'LED light',
            'Dimensions': '100 × 100 × 7 mm',
            'Weight': '85 grams',
            'Material': 'Aluminum alloy + ABS',
            'Safety Features': 'FOD, temperature control',
            'Certification': 'Qi-certified, FCC, CE',
            'Color': 'Black/White available'
        },
        rating: 4.3,
        reviews: 523,
        stock: 'In Stock'
    },
    'acc8': {
        id: 'acc8',
        name: 'Bluetooth Headphones',
        category: 'bluetooth',
        description: 'Over-ear wireless headphones with premium sound quality and 30-hour battery life. Features comfortable padding, foldable design, and crystal-clear call quality.',
        price: 10800,
        originalPrice: 14940,
        discount: 28,
        images: [
            'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500&h=500&fit=crop&crop=center'
        ],
        features: [
            '30-hour battery life',
            'Premium 40mm drivers',
            'Foldable design for portability',
            'Comfortable over-ear padding',
            'Built-in microphone',
            'Noise isolation technology',
            'Quick charge feature',
            'Multi-device connectivity'
        ],
        specifications: {
            'Driver Size': '40mm dynamic drivers',
            'Frequency Response': '20Hz - 20kHz',
            'Impedance': '32 ohms',
            'Battery Life': '30 hours',
            'Charging Time': '2 hours',
            'Bluetooth Version': '5.0',
            'Range': 'Up to 33 feet (10m)',
            'Weight': '250 grams',
            'Foldable': 'Yes',
            'Microphone': 'Built-in with noise cancellation'
        },
        rating: 4.7,
        reviews: 892,
        stock: 'In Stock'
    }
};

// Function to generate star rating HTML
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let starsHTML = '';
    
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '★';
    }
    if (hasHalfStar) {
        starsHTML += '☆';
    }
    for (let i = fullStars + (hasHalfStar ? 1 : 0); i < 5; i++) {
        starsHTML += '☆';
    }
    
    return starsHTML;
}

// Function to change main product image
function changeMainImage(imageSrc, thumbnailElement) {
    document.getElementById('mainAccessoryImage').src = imageSrc;
    
    // Update active thumbnail
    document.querySelectorAll('.thumbnail-image').forEach(thumb => thumb.classList.remove('active'));
    thumbnailElement.classList.add('active');
}

// Function to load and display accessory details
function loadAccessoryDetails() {
    const accessoryId = sessionStorage.getItem('selectedAccessoryId');
    if (!accessoryId) {
        document.body.innerHTML = '<div style="text-align: center; padding: 50px; font-family: Arial;">Accessory not found</div>';
        return;
    }
    
    const accessory = detailedAccessoriesData[accessoryId];
    if (!accessory) {
        document.body.innerHTML = '<div style="text-align: center; padding: 50px; font-family: Arial;">Accessory not found</div>';
        return;
    }
    
    // Populate the page with accessory data
    document.getElementById('accessoryTitle').textContent = accessory.name;
    document.getElementById('accessorySubtitle').textContent = accessory.category.charAt(0).toUpperCase() + accessory.category.slice(1);
    document.getElementById('accessoryStars').innerHTML = generateStars(accessory.rating);
    document.getElementById('accessoryRating').textContent = `${accessory.rating}/5 (${accessory.reviews} reviews)`;
    document.getElementById('accessoryPrice').textContent = `₹${accessory.price.toLocaleString()}`;
    
    // Handle original price and discount
    if (accessory.originalPrice) {
        document.getElementById('accessoryOriginalPrice').textContent = `₹${accessory.originalPrice.toLocaleString()}`;
        document.getElementById('accessoryOriginalPrice').style.display = 'block';
        document.getElementById('accessoryDiscount').textContent = `${accessory.discount}% OFF`;
        document.getElementById('accessoryDiscount').style.display = 'block';
    } else {
        document.getElementById('accessoryOriginalPrice').style.display = 'none';
        document.getElementById('accessoryDiscount').style.display = 'none';
    }
    
    document.getElementById('accessoryStock').textContent = accessory.stock;
    document.getElementById('accessoryDescription').textContent = accessory.description;
    
    // Populate features
    const featuresContainer = document.getElementById('accessoryFeatures');
    featuresContainer.innerHTML = accessory.features.map(feature => `<li>${feature}</li>`).join('');
    
    // Populate specifications
    const specsContainer = document.getElementById('accessorySpecs');
    specsContainer.innerHTML = Object.entries(accessory.specifications).map(([key, value]) => `
        <div class="spec-item">
            <div class="spec-label">${key}:</div>
            <div class="spec-value">${value}</div>
        </div>
    `).join('');
    
    // Set main image
    document.getElementById('mainAccessoryImage').src = accessory.images[0];
    document.getElementById('mainAccessoryImage').alt = accessory.name;
    
    // Populate thumbnail images
    const thumbnailContainer = document.getElementById('thumbnailImages');
    thumbnailContainer.innerHTML = accessory.images.map((image, index) => `
        <img src="${image}" alt="${accessory.name}" class="thumbnail-image ${index === 0 ? 'active' : ''}" 
             onclick="changeMainImage('${image}', this)">
    `).join('');
    
    // Set up action buttons
    document.getElementById('addToCartBtn').onclick = function() {
        addAccessoryToCart(accessoryId);
    };
    
    document.getElementById('buyNowBtn').onclick = function() {
        buyAccessoryNow(accessoryId);
    };
    
    // Update button text with price
    document.getElementById('addToCartBtn').textContent = `Add to Cart - ₹${accessory.price.toLocaleString()}`;
}

// Function to add accessory to cart
function addAccessoryToCart(accessoryId) {
    const accessory = detailedAccessoriesData[accessoryId];
    if (accessory) {
        // Get current cart from localStorage
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        // Add product to cart
        cart.push(accessory);
        // Save updated cart
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${accessory.name} added to cart!`);
        console.log('Adding to cart:', accessory);
    }
}

// Function to handle buy now
function buyAccessoryNow(accessoryId) {
    const accessory = detailedAccessoriesData[accessoryId];
    if (accessory) {
        alert(`Proceeding to checkout for ${accessory.name}`);
        // Integrate with your existing checkout system here
        console.log('Buy now:', accessory);
    }
}

// Load accessory details when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadAccessoryDetails();
});