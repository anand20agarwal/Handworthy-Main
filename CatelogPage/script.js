// Clear all filters (for the main Clear button next to Apply)
function clearAllFilters() {
    // Uncheck all checkboxes
    document.querySelectorAll('.checkbox').forEach(cb => cb.classList.remove('checked'));
    // Reset selectedFilters
    for (const key in selectedFilters) {
        delete selectedFilters[key];
    }
    // Update UI
    updateSelectedFilters();
    // Show all products
    renderProducts(productsData);
    // Optionally, reset search input
    const searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.value = '';
}
function applyFilters() {
    let filtered = productsData;
    // Search filter
    const searchInput = document.getElementById('searchInput');
    if (searchInput && searchInput.value.trim() !== '') {
        const q = searchInput.value.trim().toLowerCase();
        filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || (p.description && p.description.toLowerCase().includes(q)));
    }

    // Category filter (only one category at a time)
    if (selectedFilters['category']) {
        const cat = selectedFilters['category'].toLowerCase();
        filtered = filtered.filter(product => {
            // Show in headphone filter if name or category contains 'headphone'
            if (cat === 'headphone') {
                return (product.category && product.category.toLowerCase().includes('headphone')) || (product.name && product.name.toLowerCase().includes('headphone'));
            }
            // Show in smartwatch filter if name or category contains 'smartwatch'
            if (cat === 'smartwatch') {
                return (product.category && product.category.toLowerCase().includes('smartwatch')) || (product.name && product.name.toLowerCase().includes('smartwatch'));
            }
            // Show in cable filter if name or category contains 'cable'
            if (cat === 'cable') {
                return (product.category && product.category.toLowerCase().includes('cable')) || (product.name && product.name.toLowerCase().includes('cable'));
            }
            // Default: match category
            return product.category && product.category.toLowerCase().includes(cat);
        });
    }   

    // Subfilters (headphone, smartwatch, cable)
    filtered = filtered.filter(product => {
        // Headphone subfilters
        if ((product.category && product.category.toLowerCase().includes('headphone')) || (product.name && product.name.toLowerCase().includes('headphone'))) {
            if (selectedFilters['headphone-over-ear'] && !product.name.toLowerCase().includes('over')) return false;
            if (selectedFilters['headphone-in-ear'] && !product.name.toLowerCase().includes('in-ear')) return false;
            if (selectedFilters['headphone-on-ear'] && !product.name.toLowerCase().includes('on-ear')) return false;
            if (selectedFilters['headphone-black'] && !product.name.toLowerCase().includes('black')) return false;
            if (selectedFilters['headphone-white'] && !product.name.toLowerCase().includes('white')) return false;
            if (selectedFilters['headphone-blue'] && !product.name.toLowerCase().includes('blue')) return false;
        }
        // Smartwatch subfilters
        if ((product.category && product.category.toLowerCase().includes('smartwatch')) || (product.name && product.name.toLowerCase().includes('smartwatch'))) {
            if (selectedFilters['smartwatch-silicone'] && !product.description.toLowerCase().includes('silicone')) return false;
            if (selectedFilters['smartwatch-leather'] && !product.description.toLowerCase().includes('leather')) return false;
            if (selectedFilters['smartwatch-metal'] && !product.description.toLowerCase().includes('metal')) return false;
            if (selectedFilters['smartwatch-ios'] && !product.description.toLowerCase().includes('ios')) return false;
            if (selectedFilters['smartwatch-android'] && !product.description.toLowerCase().includes('android')) return false;
        }
        // Cable subfilters
        if ((product.category && product.category.toLowerCase().includes('cable')) || (product.name && product.name.toLowerCase().includes('cable'))) {
            if (selectedFilters['cable-usb-c'] && !product.name.toLowerCase().includes('usb-c')) return false;
            if (selectedFilters['cable-lightning'] && !product.name.toLowerCase().includes('lightning')) return false;
            if (selectedFilters['cable-micro-usb'] && !product.name.toLowerCase().includes('micro usb')) return false;
            if (selectedFilters['cable-1m'] && !product.description.toLowerCase().includes('1m')) return false;
            if (selectedFilters['cable-2m'] && !product.description.toLowerCase().includes('2m')) return false;
        }
        return true;
    });

    // Always update the main grid
    const grid = document.getElementById('productsGrid');
    if (grid) renderProducts(filtered);
}
let productsData = [];

function fetchProducts() {
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            productsData = data;
            renderProducts(productsData);
        })
        .catch(error => {
            console.error('Error loading products:', error);
        });
}

function renderProducts(data) {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    if (!data || data.length === 0) {
        grid.innerHTML = '<div style="color:#86868b;text-align:center;padding:30px;">No products found</div>';
        return;
    }
    grid.innerHTML = data.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <div class="product-title">${product.name}</div>
                <div class="product-description">${product.description}</div>
                <div class="product-features">${product.features ? product.features.join(', ') : ''}</div>
                <div class="product-price">₹${product.price} <span class="original-price">${product.originalPrice ? '₹' + product.originalPrice : ''}</span></div>
                <div class="product-rating">Rating: ${product.rating || '-'} ★</div>
                <div class="product-stock">${product.stock}</div>
            </div>
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', function() {
    fetchProducts();
});
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
        'sort-rating': 'Highest Rated',
        // Headphone
        'headphone-over-ear': 'Over-Ear',
        'headphone-in-ear': 'In-Ear',
        'headphone-on-ear': 'On-Ear',
        'headphone-black': 'Black',
        'headphone-white': 'White',
        'headphone-blue': 'Blue',
        // Smartwatch
        'smartwatch-silicone': 'Silicone',
        'smartwatch-leather': 'Leather',
        'smartwatch-metal': 'Metal',
        'smartwatch-ios': 'iOS',
        'smartwatch-android': 'Android',
        // Cable
        'cable-usb-c': 'USB-C',
        'cable-lightning': 'Lightning',
        'cable-micro-usb': 'Micro USB',
        'cable-1m': '1 Meter',
        'cable-2m': '2 Meter',
        // Category
        'category': 'Category',
    };
    return textMap[filterId] || filterId;
}

function clearCategory(category) {
    // Clear all checkboxes in the category (support for all filter types)
    let selector = '';
    if (category === 'category') {
        selector = '#dropdown-category .checkbox';
    } else if (category.startsWith('headphone')) {
        selector = '[id^="check-headphone-"]';
    } else if (category.startsWith('smartwatch')) {
        selector = '[id^="check-smartwatch-"]';
    } else if (category.startsWith('cable')) {
        selector = '[id^="check-cable-"]';
    } else {
        selector = `#dropdown-${category} .checkbox`;
    }
    document.querySelectorAll(selector).forEach(cb => {
        cb.classList.remove('checked');
    });

    // Remove from selectedFilters (all relevant keys)
    Object.keys(selectedFilters).forEach(key => {
        if (
            (category === 'category' && key === 'category') ||
            (category.startsWith('headphone') && key.startsWith('headphone-')) ||
            (category.startsWith('smartwatch') && key.startsWith('smartwatch-')) ||
            (category.startsWith('cable') && key.startsWith('cable-')) ||
            (category === 'iphone-models' && key.startsWith('iphone-'))
        ) {
            delete selectedFilters[key];
        }
    });

    updateSelectedFilters();
    applyFilters();
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

// Show/hide category-specific filters
function showCategoryFilters(category) {
    document.querySelectorAll('.category-filters').forEach(el => {
        el.style.display = 'none';
    });
    if (category) {
        const filterSection = document.getElementById(`filters-${category}`);
        if (filterSection) filterSection.style.display = '';
    }
}

// Handle category selection
function selectCategory(event, category) {
    event.stopPropagation();
    // Uncheck all category checkboxes
    document.querySelectorAll('#dropdown-category .checkbox').forEach(cb => cb.classList.remove('checked'));
    // Set selected
    const checkbox = document.getElementById(`check-category-${category}`);
    checkbox.classList.add('checked');
    window.selectedCategory = category;
    // Remove all category filters from selectedFilters
    Object.keys(selectedFilters).forEach(key => {
        if (key.startsWith('headphone-') || key.startsWith('smartwatch-') || key.startsWith('cable-')) {
            delete selectedFilters[key];
        }
    });
    // Add to selectedFilters
    selectedFilters['category'] = category.charAt(0).toUpperCase() + category.slice(1);
    showCategoryFilters(category);
    updateSelectedFilters();
}

// (Removed legacy accessory/cart code that may interfere with filtering)