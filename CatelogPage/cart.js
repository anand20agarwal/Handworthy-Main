function formatPrice(price) {
  return `₹${price.toLocaleString()}`;
}

// Helper function to ensure each cart item has a unique ID
function ensureItemId(item, index) {
  if (!item.id) {
    // Generate ID from name, price, and index if no ID exists
    item.id = `item_${index}_${item.name?.replace(/[^a-zA-Z0-9]/g, '_')}_${item.price}`;
  }
  return item.id;
}

// Helper function to find item index by ID or other properties
function findItemIndex(cart, itemId) {
  // First try to find by ID
  let index = cart.findIndex(item => item.id == itemId);
  
  // If not found by ID, try to find by index (for backward compatibility)
  if (index === -1 && !isNaN(itemId)) {
    index = parseInt(itemId);
    if (index >= 0 && index < cart.length) {
      return index;
    }
  }
  
  return index;
}

function updateQuantity(itemId, change) {
  console.log('updateQuantity called with:', itemId, change);
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const itemIndex = findItemIndex(cart, itemId);
  
  if (itemIndex !== -1 && itemIndex < cart.length) {
    // Ensure quantity exists
    if (!cart[itemIndex].quantity) {
      cart[itemIndex].quantity = 1;
    }
    
    cart[itemIndex].quantity += change;
    
    if (cart[itemIndex].quantity <= 0) {
      cart.splice(itemIndex, 1);
      showNotification('Item removed from cart');
    } else {
      showNotification('Quantity updated');
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
  } else {
    showNotification('Error updating quantity');
  }
}

function addToWishlist(itemId) {
  console.log('addToWishlist called with:', itemId);
  let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  const itemIndex = findItemIndex(cart, itemId);
  
  if (itemIndex !== -1 && itemIndex < cart.length) {
    const item = cart[itemIndex];
    
    // Check if item is already in wishlist
    const existsInWishlist = wishlist.some(wishItem => 
      wishItem.id == item.id || 
      (wishItem.name === item.name && wishItem.price === item.price)
    );
    
    if (!existsInWishlist) {
      // Add to wishlist (remove quantity property for wishlist)
      const wishlistItem = { ...item };
      delete wishlistItem.quantity;
      wishlist.push(wishlistItem);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      showNotification('Added to wishlist! ❤️');
    } else {
      showNotification('Already in wishlist!');
    }
  } else {
    showNotification('Error adding to wishlist');
  }
}

function shareItem(itemId) {
  console.log('shareItem called with:', itemId);
  
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  console.log('Current cart:', cart);
  
  const itemIndex = findItemIndex(cart, itemId);
  console.log('Found item at index:', itemIndex);
  
  if (itemIndex !== -1 && itemIndex < cart.length) {
    const item = cart[itemIndex];
    console.log('Item to share:', item);
    
    // Check if Web Share API is available
    if (navigator.share) {
      console.log('Using Web Share API');
      navigator.share({
        title: `Check out this ${item.name}!`,
        text: `Found this amazing ${item.name} for ${formatPrice(item.price)}`,
        url: window.location.href
      }).then(() => {
        console.log('Share successful');
        showNotification('Shared successfully! 📤');
      }).catch((error) => {
        console.log('Share failed, falling back to clipboard:', error);
        copyToClipboard(item);
      });
    } else {
      console.log('Web Share API not available, using clipboard');
      copyToClipboard(item);
    }
  } else {
    console.log('Item not found for sharing');
    showNotification('Error sharing item - item not found');
  }
}

function copyToClipboard(item) {
  const shareText = `Check out this ${item.name} for ${formatPrice(item.price)}! ${window.location.href}`;
  console.log('Copying to clipboard:', shareText);
  
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(shareText).then(() => {
      console.log('Clipboard copy successful');
      showNotification('Link copied to clipboard! 📋');
    }).catch((error) => {
      console.log('Clipboard copy failed, using fallback:', error);
      fallbackCopyToClipboard(shareText);
    });
  } else {
    console.log('Clipboard API not available, using fallback');
    fallbackCopyToClipboard(shareText);
  }
}

function fallbackCopyToClipboard(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  textArea.style.top = '-999999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  
  try {
    const successful = document.execCommand('copy');
    console.log('Fallback copy result:', successful);
    if (successful) {
      showNotification('Link copied to clipboard! 📋');
    } else {
      showNotification('Unable to copy link - please copy manually');
    }
  } catch (err) {
    console.log('Fallback copy error:', err);
    showNotification('Unable to copy link - please copy manually');
  }
  
  document.body.removeChild(textArea);
}

function removeCartItem(itemId) {
  console.log('removeCartItem called with:', itemId);
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const itemIndex = findItemIndex(cart, itemId);
  
  if (itemIndex !== -1 && itemIndex < cart.length) {
    cart.splice(itemIndex, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    showNotification('Item removed from cart');
  } else {
    showNotification('Error removing item');
  }
}

function renderCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItemsDiv = document.getElementById('cartItems');
  const cartSummaryDiv = document.getElementById('cartSummary');
  const checkoutBtn = document.getElementById('checkoutBtn');

  // Check if elements exist
  if (!cartItemsDiv || !cartSummaryDiv || !checkoutBtn) {
    console.error('Required cart elements not found');
    return;
  }

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = '<div class="empty-cart">Your cart is empty<br><small>Add some items to get started!</small></div>';
    cartSummaryDiv.innerHTML = '';
    checkoutBtn.style.display = 'none';
    return;
  }

  let totalItems = 0;
  let totalPrice = 0;
  
  cartItemsDiv.innerHTML = cart.map((item, index) => {
    // Ensure item has required properties
    const itemId = ensureItemId(item, index);
    const itemName = item.name || item.title || 'Unknown Product';
    const itemPrice = parseFloat(item.price) || 0;
    const itemQuantity = parseInt(item.quantity) || 1;
    const itemCategory = item.category || 'Product';
    
    // Update quantity in cart if it was missing
    if (!item.quantity) {
      item.quantity = itemQuantity;
    }
    
    const itemTotal = itemPrice * itemQuantity;
    totalItems += itemQuantity;
    totalPrice += itemTotal;
    
    // Handle different image property names
    let itemImage = 'https://via.placeholder.com/100';
    if (item.images && Array.isArray(item.images) && item.images.length > 0) {
      itemImage = item.images[0];
    } else if (item.image) {
      itemImage = item.image;
    } else if (item.img) {
      itemImage = item.img;
    } else if (item.thumbnail) {
      itemImage = item.thumbnail;
    }
    
    return `
      <div class='cart-item' data-item-id='${itemId}'>
        <!-- Remove button in top right corner -->
        <button class='cart-item-remove' data-action='remove' data-item-id='${itemId}' title='Remove item'>×</button>
        
        <!-- Left side: Product details and quantity controls -->
        <div class='cart-item-left'>
          <!-- Product details -->
          <div class='cart-item-main'>
            <img src='${itemImage}' 
                 class='cart-item-image' alt='${itemName}'
                 onerror="this.src='https://via.placeholder.com/100'">
            <div class='cart-item-details'>
              <div class='cart-item-title'>${itemName}</div>
              <div class='cart-item-category'>${itemCategory.charAt(0).toUpperCase() + itemCategory.slice(1)}</div>
              <div>
                <span class='cart-item-price'>${formatPrice(itemPrice)}</span>
                ${item.originalPrice ? `<span class='cart-item-original'>${formatPrice(item.originalPrice)}</span>` : ''}
                ${item.discount ? `<span class='cart-item-discount'>${item.discount}% OFF</span>` : ''}
              </div>
            </div>
          </div>
          
          <!-- Quantity controls beneath product details -->
          <div class='quantity-controls'>
            <button class='quantity-btn' data-action='decrease' data-item-id='${itemId}'>−</button>
            <div class='quantity-display'>Qty: ${itemQuantity}</div>
            <button class='quantity-btn' data-action='increase' data-item-id='${itemId}'>+</button>
          </div>
        </div>

        <!-- Right side: Action buttons -->
        <div class='cart-item-right'>
          <div class='cart-item-actions'>
            <button class='action-btn wishlist-btn' data-action='wishlist' data-item-id='${itemId}'>
              ❤️ Move to Wishlist
            </button>
            <button class='action-btn share-btn' data-action='share' data-item-id='${itemId}'>
              📤 Share
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Update localStorage with any fixes
  localStorage.setItem('cart', JSON.stringify(cart));

  cartSummaryDiv.innerHTML = `
    <div>Items: ${totalItems}</div>
    <div style="font-size: 1.8rem; margin-top: 10px;">Total: ${formatPrice(totalPrice)}</div>
  `;
  checkoutBtn.style.display = 'block';
}

function showNotification(message) {
  // Remove any existing notifications
  const existingNotifications = document.querySelectorAll('.cart-notification');
  existingNotifications.forEach(notification => {
    if (document.body.contains(notification)) {
      document.body.removeChild(notification);
    }
  });

  const notification = document.createElement('div');
  notification.className = 'cart-notification';
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #34C759;
    color: white;
    padding: 15px 25px;
    border-radius: 25px;
    font-weight: 600;
    z-index: 2000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    box-shadow: 0 8px 25px rgba(52, 199, 89, 0.3);
    max-width: 300px;
    word-wrap: break-word;
  `;
  notification.textContent = message;
  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);

  // Animate out
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
  }, 3000);

  // Remove from DOM
  setTimeout(() => {
    if (document.body.contains(notification)) {
      document.body.removeChild(notification);
    }
  }, 3300);
}

// Event delegation for better reliability
function setupEventListeners() {
  const cartItemsDiv = document.getElementById('cartItems');
  
  if (cartItemsDiv) {
    // Remove any existing listeners
    cartItemsDiv.removeEventListener('click', handleCartActions);
    
    // Add event listener using delegation
    cartItemsDiv.addEventListener('click', handleCartActions);
  }
}

function handleCartActions(event) {
  const target = event.target;
  const action = target.getAttribute('data-action');
  const itemId = target.getAttribute('data-item-id');
  
  console.log('Button clicked:', action, itemId);
  
  if (!action || !itemId) return;
  
  event.preventDefault();
  event.stopPropagation();
  
  switch (action) {
    case 'remove':
      removeCartItem(itemId);
      break;
    case 'wishlist':
      addToWishlist(itemId);
      break;
    case 'share':
      shareItem(itemId);
      break;
    case 'increase':
      updateQuantity(itemId, 1);
      break;
    case 'decrease':
      updateQuantity(itemId, -1);
      break;
    default:
      console.log('Unknown action:', action);
  }
}

// Initialize cart functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, initializing cart...');
  
  // Setup event listeners
  setupEventListeners();
  
  // Checkout button functionality
  const checkoutBtn = document.getElementById('checkoutBtn');
  if (checkoutBtn) {
    checkoutBtn.onclick = function () {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      if (cart.length > 0) {
        showNotification('Proceeding to checkout...');
        // Uncomment the line below when you have a checkout page
        // window.location.href = 'checkout.html';
      } else {
        showNotification('Your cart is empty!');
      }
    };
  }

  // Render the cart on page load
  renderCart();
  
  // Re-setup event listeners after rendering
  setTimeout(setupEventListeners, 100);
});

// Keyboard support for accessibility
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    // Close any open notifications
    const notifications = document.querySelectorAll('.cart-notification');
    notifications.forEach(notification => {
      notification.style.transform = 'translateX(100%)';
    });
  }
});

// Debug functions
function addTestData() {
  const testCart = [
    {
      id: 1,
      name: "Premium Headphones",
      price: 2999,
      originalPrice: 3999,
      discount: 25,
      category: "electronics",
      quantity: 1,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop"
    },
    {
      id: 2,
      name: "Wireless Mouse",
      price: 1299,
      originalPrice: 1599,
      discount: 19,
      category: "accessories",
      quantity: 2,
      image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=100&h=100&fit=crop"
    }
  ];
  
  localStorage.setItem('cart', JSON.stringify(testCart));
  renderCart();
  setupEventListeners(); // Re-setup listeners after rendering
  showNotification('Test data added to cart!');
}

// Function to clear cart (for debugging)
function clearCart() {
  localStorage.removeItem('cart');
  renderCart();
  showNotification('Cart cleared!');
}

// Test share function for debugging
function testShare() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (cart.length > 0) {
    shareItem(cart[0].id || 0);
  } else {
    showNotification('Add some items to cart first');
  }
}

console.log('Cart JavaScript loaded successfully!');
console.log('Available debug functions: addTestData(), clearCart(), testShare()');
console.log('Current cart:', JSON.parse(localStorage.getItem('cart') || '[]'));