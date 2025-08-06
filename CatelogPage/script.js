function toggleMenu() {
    const menu = document.getElementById('menuPanel');
    menu.classList.toggle('show');
}

function toggleSortSelection(event, id) {
    // Remove selected class from all sort items
    const sortItems = document.querySelectorAll('#dropdown-sort .checklist-item');
    sortItems.forEach(item => item.classList.remove('selected'));
    
    // Add selected class to clicked item
    event.currentTarget.classList.add('selected');
    
    // You can add additional logic here to handle the sort functionality
    console.log('Selected sort option:', id);
}

// Dropdown Menu JavaScript
let selectedFilters = {};

function toggleDropdown(category) {
    const dropdown = document.getElementById(`dropdown-${category}`);
    const arrow = document.getElementById(`arrow-${category}`);
    
    // Close other dropdowns
    document.querySelectorAll('.dropdown-content').forEach(dd => {
        if (dd.id !== `dropdown-${category}`) {
            dd.classList.remove('open');
        }
    });
    
    document.querySelectorAll('.dropdown-arrow').forEach(arr => {
        if (arr.id !== `arrow-${category}`) {
            arr.classList.remove('open');
        }
    });
    
    // Toggle current dropdown
    dropdown.classList.toggle('open');
    arrow.classList.toggle('open');
}

function toggleCheck(event, filterId) {
    event.stopPropagation();
    
    const checkbox = document.getElementById(`check-${filterId}`);
    const isChecked = checkbox.classList.contains('checked');
    
    // For sorting, only allow one selection
    if (filterId.startsWith('sort-')) {
        // Clear other sort options
        document.querySelectorAll('[id^="check-sort-"]').forEach(cb => {
            cb.classList.remove('checked');
        });
        
        // Clear sort filters
        Object.keys(selectedFilters).forEach(key => {
            if (key.startsWith('sort-')) {
                delete selectedFilters[key];
            }
        });
    }
    
    if (isChecked) {
        checkbox.classList.remove('checked');
        delete selectedFilters[filterId];
    } else {
        checkbox.classList.add('checked');
        selectedFilters[filterId] = getFilterText(filterId);
    }
    
    updateSelectedFilters();
}

function getFilterText(filterId) {
    const textMap = {
        'iphone-15-pro-max': 'iPhone 15 Pro Max',
        'iphone-15-pro': 'iPhone 15 Pro',
        'iphone-15-plus': 'iPhone 15 Plus',
        'iphone-15': 'iPhone 15',
        'iphone-14-pro-max': 'iPhone 14 Pro Max',
        'iphone-14-pro': 'iPhone 14 Pro',
        'storage-128gb': '128GB',
        'storage-256gb': '256GB',
        'storage-512gb': '512GB',
        'storage-1tb': '1TB',
        'condition-new': 'Brand New',
        'condition-excellent': 'Excellent',
        'condition-good': 'Good',
        'condition-fair': 'Fair',
        'price-under-500': 'Under $500',
        'price-500-800': '$500 - $800',
        'price-800-1200': '$800 - $1200',
        'price-above-1200': 'Above $1200',
        'color-space-black': 'Space Black',
        'color-natural-titanium': 'Natural Titanium',
        'color-blue-titanium': 'Blue Titanium',
        'color-white-titanium': 'White Titanium',
        'color-pink': 'Pink',
        'color-yellow': 'Yellow',
        'sort-price-low': 'Price: Low to High',
        'sort-price-high': 'Price: High to Low',
        'sort-newest': 'Newest First',
        'sort-popular': 'Most Popular',
        'sort-rating': 'Highest Rated'
    };
    return textMap[filterId] || filterId;
}

function clearCategory(category) {
    // Clear all checkboxes in the category
    document.querySelectorAll(`#dropdown-${category} .checkbox`).forEach(cb => {
        cb.classList.remove('checked');
    });
    
    // Remove from selectedFilters
    Object.keys(selectedFilters).forEach(key => {
        if (key.includes(category) || 
            (category === 'iphone-models' && key.startsWith('iphone-'))) {
            delete selectedFilters[key];
        }
    });
    
    updateSelectedFilters();
}

function updateSelectedFilters() {
    const container = document.getElementById('selected-filters');
    
    // Check if the container exists (in case the results section is not included)
    if (!container) {
        return;
    }
    
    if (Object.keys(selectedFilters).length === 0) {
        container.innerHTML = '<div style="color: #6c757d; font-style: italic;">No filters selected</div>';
        return;
    }
    
    const filterTags = Object.entries(selectedFilters).map(([key, text]) => {
        return `<div class="filter-tag">
            ${text}
            <span class="remove" onclick="removeFilter('${key}')">×</span>
        </div>`;
    }).join('');
    
    container.innerHTML = filterTags;
}

function removeFilter(filterId) {
    const checkbox = document.getElementById(`check-${filterId}`);
    checkbox.classList.remove('checked');
    delete selectedFilters[filterId];
    updateSelectedFilters();
}

// Close dropdowns when clicking outside
document.addEventListener('click', function(event) {
    if (!event.target.closest('.menu-item')) {
        document.querySelectorAll('.dropdown-content').forEach(dd => {
            dd.classList.remove('open');
        });
        document.querySelectorAll('.dropdown-arrow').forEach(arr => {
            arr.classList.remove('open');
        });
    }
});

// Helper function to get all selected filters (for your filtering logic)
function getSelectedFilters() {
    return selectedFilters;
}

// Helper function to get selected filters by category
function getFiltersByCategory(category) {
    const categoryFilters = {};
    Object.keys(selectedFilters).forEach(key => {
        if (key.includes(category) || 
            (category === 'iphone-models' && key.startsWith('iphone-'))) {
            categoryFilters[key] = selectedFilters[key];
        }
    });
    return categoryFilters;
}

// Apply filters function
function applyFilters() {
    const filters = getSelectedFilters();
    
    // Close all dropdowns
    document.querySelectorAll('.dropdown-content').forEach(dd => {
        dd.classList.remove('open');
    });
    document.querySelectorAll('.dropdown-arrow').forEach(arr => {
        arr.classList.remove('open');
    });
    
    // You can customize this function to handle your filtering logic
    console.log('Applying filters:', filters);
    
    // Example: Call your existing filter functions
    // filterProducts(filters);
    
    // Show success message or update UI
    showApplyMessage();
}

function showApplyMessage() {
    const button = document.querySelector('.apply-button');
    const originalText = button.textContent;
    
    button.textContent = 'Applied ✓';
    button.style.background = '#28a745';
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
    }, 2000);
}


function clearAllFilters() {
    // Clear the selectedFilters object
    selectedFilters = {};
    
    // Clear all checkboxes (filter checkboxes)
    document.querySelectorAll('.checkbox').forEach(cb => {
        cb.classList.remove('checked');
    });
    
    // Clear all selected sort items
    document.querySelectorAll('.checklist-item').forEach(item => {
        item.classList.remove('selected');
    });
    
    // Update the selected filters display
    updateSelectedFilters();
    
    // Optional: Close all dropdowns
    document.querySelectorAll('.dropdown-content').forEach(dd => {
        dd.classList.remove('open');
    });
    document.querySelectorAll('.dropdown-arrow').forEach(arr => {
        arr.classList.remove('open');
    });
    
    console.log('All filters cleared');
}



// Dummy accessories data

const accessoriesData = [
    {
        id: 'acc1',
        name: 'AirPods Pro (2nd Gen)',
        description: 'Active Noise Cancellation',
        price: 16600,
        originalPrice: 20750,
        image: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=400&h=300&fit=crop&crop=center',
        category: 'earphones',
        features: ['Wireless'],
        stock: 'In Stock',
        rating: 4.8
    },
    {
        id: 'acc2',
        name: 'MagSafe Power Bank',
        description: '10,000mAh Wireless Charging',
        price: 7470,
        originalPrice: 10770,
        image: 'https://www.notebookcheck.net/fileadmin/_processed_/b/4/csm_UGREEN_15W_Magsafe_Power_Bank_10000mAh_I_8_e6d5d5866c.jpg',
        category: 'powerbank',
        features: ['MagSafe'],
        stock: 'In Stock',
        rating: 4.6
    },
    {
        id: 'acc3',
        name: 'iPhone 15 Pro Case',
        description: 'Premium Leather Case',
        price: 3820,
        originalPrice: 4980,
        image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=300&fit=crop&crop=center',
        category: 'mobile',
        features: ['Leather'],
        stock: 'In Stock',
        rating: 4.7
    },
    {
        id: 'acc4',
        name: 'Bluetooth Speaker',
        description: 'Portable Wireless Speaker',
        price: 6640,
        originalPrice: 8300,
        image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop&crop=center',
        category: 'bluetooth speaker',
        features: ['Waterproof'],
        stock: 'Limited',
        rating: 4.5
    },
    {
        id: 'acc5',
        name: 'USB-C to Lightning Cable',
        description: '6ft Fast Charging Cable',
        price: 2075,
        originalPrice: 3320,
        image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop&crop=center',
        category: 'cable',
        features: ['MFi Certified'],
        stock: 'In Stock',
        rating: 4.4
    },
    {
        id: 'acc6',
        name: '20W USB-C Adapter',
        description: 'Fast Charging Wall Adapter for iPhone',
        price: 1660,
        originalPrice: 2490,
        image: 'https://tse2.mm.bing.net/th/id/OIP.xJRGwEDkO_NfgZdYb7rJEwAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
        category: 'adapter',
        features: ['20W Output'],
        stock: 'In Stock',
        rating: 4.6
    },
    {
        id: 'acc7',
        name: 'Wireless Charger Pad',
        description: '15W Fast Wireless Charging Pad',
        price: 2900,
        originalPrice: 4150,
        image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop&crop=center',
        category: 'charger',
        features: ['15W Fast Charging'],
        stock: 'In Stock',
        rating: 4.3
    },
    {
        id: 'acc8',
        name: 'Bluetooth Headphones',
        description: 'Over-ear Wireless Headphones',
        price: 10800,
        originalPrice: 14940,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop&crop=center',
        category: 'bluetooth',
        features: ['30hr Battery'],
        stock: 'In Stock',
        rating: 4.7
    }
];


// Function to render accessories
function renderAccessories() {
    const accessoriesGrid = document.getElementById('accessoriesGrid');
    
    accessoriesGrid.innerHTML = accessoriesData.map(accessory => `
        <div class="accessory-card" onclick="viewAccessory('${accessory.id}')">
            <div class="stock-status ${accessory.stock === 'Limited' ? 'limited' : accessory.stock === 'Out of Stock' ? 'out' : ''}">${accessory.stock}</div>
            <img src="${accessory.image}" alt="${accessory.name}" class="accessory-image">
            <div class="accessory-info">
                <div class="accessory-name">${accessory.name}</div>
                <div class="accessory-description">${accessory.description}</div>
                <div class="accessory-features">
                    ${accessory.features.map(feature => `<span class="feature-badge">${feature}</span>`).join('')}
                </div>
                <div class="accessory-price">
                ₹${accessory.price} 
                ${accessory.originalPrice ? `<span style="text-decoration: line-through; color: #86868b; font-size: 16px; font-weight: 400;">₹${accessory.originalPrice}</span>` : ''}
                  </div>

                <button class="add-to-cart-btn" onclick="addAccessoryToCart(event, '${accessory.id}')">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

// Function to add accessory to cart
function addAccessoryToCart(event, accessoryId) {
    event.stopPropagation(); // Prevent card click
    const accessory = accessoriesData.find(acc => acc.id === accessoryId);
    if (!accessory) return;
    // Add to cart logic using localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(accessory);
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log('Adding to cart:', accessory);
    // Show notification
    showNotification(`${accessory.name} added to cart!`);
    // Update cart badge (integrate with your existing cart system)
    // updateCartBadge();
}

function viewAccessory(accessoryId) {
    // Store accessory ID in sessionStorage to retrieve on detail page
    sessionStorage.setItem('selectedAccessoryId', accessoryId);
    
    // Open the accessory detail page in a new window/tab
    window.open('accessory-detail.html', '_blank');
}

// Function to show notification (you might already have this)
function showNotification(message) {
    const notification = document.getElementById('notification');
    if (notification) {
        notification.textContent = message;
        notification.style.display = 'block';
        notification.style.opacity = '1';
        
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                notification.style.display = 'none';
            }, 300);
        }, 3000);
    }
}

// Initialize accessories when page loads
document.addEventListener('DOMContentLoaded', function() {
    renderAccessories();
});