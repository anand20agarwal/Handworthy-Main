// Change Main Product Image
function changeImage(thumbnail) {
    const mainImage = document.getElementById('mainImage');
    mainImage.src = thumbnail.src;

    // Remove 'active' class from all thumbnails
    document.querySelectorAll('.thumbnail').forEach(img => {
        img.classList.remove('active');
    });

    // Add 'active' class to clicked thumbnail
    thumbnail.classList.add('active');
}

// Change Quantity
function changeQuantity(amount) {
    const input = document.getElementById('quantity');
    let value = parseInt(input.value);

    if (isNaN(value)) value = 1;

    value += amount;
    if (value < 1) value = 1;
    if (value > 10) value = 10;

    input.value = value;
}

// Add to Cart with Notification
function addToCart() {
    const notification = document.getElementById('cartNotification');
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000); // hide after 3 seconds
}

// Add to Wishlist (optional visual feedback)
function addToWishlist() {
    alert("Added to wishlist ♥");
}

// Tab Switch
function showTab(tabId) {
    // Remove active class from all buttons and contents
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));

    // Activate selected tab and button
    document.querySelector(`.tab-btn[onclick="showTab('${tabId}')"]`).classList.add('active');
    document.getElementById(tabId).classList.add('active');
}

// Option Selection (Size & Color)
document.addEventListener('DOMContentLoaded', () => {
    // Size option selection
    document.querySelectorAll('.size-option').forEach(option => {
        option.addEventListener('click', () => {
            document.querySelectorAll('.size-option').forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
        });
    });

    // Color option selection
    document.querySelectorAll('.color-option').forEach(option => {
        option.addEventListener('click', () => {
            document.querySelectorAll('.color-option').forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
        });
    });
});
