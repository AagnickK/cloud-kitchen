// Menu Data
const menuItems = [
    {
        id: 1,
        name: "Machher Jhol",
        description: "Traditional Bengali fish curry with potatoes",
        price: 120,
        image: "https://via.placeholder.com/300x200/E74C3C/FFFFFF?text=Fish+Curry",
        category: ["bengali", "non-veg"],
        type: "non-veg"
    },
    {
        id: 2,
        name: "Aloo Posto",
        description: "Potatoes cooked in poppy seed paste",
        price: 80,
        image: "https://via.placeholder.com/300x200/27AE60/FFFFFF?text=Aloo+Posto",
        category: ["bengali", "veg"],
        type: "veg"
    },
    {
        id: 3,
        name: "Kolkata Biryani",
        description: "Aromatic rice with tender mutton and potato",
        price: 180,
        image: "https://via.placeholder.com/300x200/F39C12/FFFFFF?text=Biryani",
        category: ["bengali", "non-veg"],
        type: "non-veg"
    },
    {
        id: 4,
        name: "Chingri Malai Curry",
        description: "Prawns in coconut milk curry",
        price: 200,
        image: "https://via.placeholder.com/300x200/FF6B35/FFFFFF?text=Prawn+Curry",
        category: ["bengali", "non-veg"],
        type: "non-veg"
    },
    {
        id: 5,
        name: "Butter Chicken",
        description: "Creamy tomato-based chicken curry",
        price: 160,
        image: "https://via.placeholder.com/300x200/E74C3C/FFFFFF?text=Butter+Chicken",
        category: ["north-indian", "non-veg"],
        type: "non-veg"
    },
    {
        id: 6,
        name: "Paneer Butter Masala",
        description: "Cottage cheese in rich tomato gravy",
        price: 140,
        image: "https://via.placeholder.com/300x200/F39C12/FFFFFF?text=Paneer+Masala",
        category: ["north-indian", "veg"],
        type: "veg"
    },
    {
        id: 7,
        name: "Masala Dosa",
        description: "Crispy crepe with spiced potato filling",
        price: 90,
        image: "https://via.placeholder.com/300x200/27AE60/FFFFFF?text=Masala+Dosa",
        category: ["south-indian", "veg"],
        type: "veg"
    },
    {
        id: 8,
        name: "Sambar Rice",
        description: "Rice with lentil curry and vegetables",
        price: 100,
        image: "https://via.placeholder.com/300x200/FF6B35/FFFFFF?text=Sambar+Rice",
        category: ["south-indian", "veg"],
        type: "veg"
    },
    {
        id: 9,
        name: "Chicken Manchurian",
        description: "Indo-Chinese chicken in tangy sauce",
        price: 150,
        image: "https://via.placeholder.com/300x200/E74C3C/FFFFFF?text=Chicken+Manchurian",
        category: ["chinese", "non-veg"],
        type: "non-veg"
    },
    {
        id: 10,
        name: "Veg Hakka Noodles",
        description: "Stir-fried noodles with vegetables",
        price: 110,
        image: "https://via.placeholder.com/300x200/27AE60/FFFFFF?text=Hakka+Noodles",
        category: ["chinese", "veg"],
        type: "veg"
    },
    {
        id: 11,
        name: "Roshogolla",
        description: "Traditional Bengali sweet in sugar syrup",
        price: 60,
        image: "https://via.placeholder.com/300x200/8E44AD/FFFFFF?text=Roshogolla",
        category: ["bengali", "veg"],
        type: "veg"
    },
    {
        id: 12,
        name: "Mishti Doi",
        description: "Sweet yogurt dessert",
        price: 50,
        image: "https://via.placeholder.com/300x200/F39C12/FFFFFF?text=Mishti+Doi",
        category: ["bengali", "veg"],
        type: "veg"
    }
];

// Cart functionality
let cart = [];
let currentReviewIndex = 0;

// DOM Elements
const menuGrid = document.getElementById('menuGrid');
const cartModal = document.getElementById('cartModal');
const checkoutModal = document.getElementById('checkoutModal');
const cartCount = document.getElementById('cartCount');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const promoBanner = document.querySelector('.promo-banner');
const closeBanner = document.querySelector('.close-banner');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    renderMenu('all');
    setupEventListeners();
    startReviewSlider();
});

// Event Listeners
function setupEventListeners() {
    // Menu filters
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            renderMenu(this.dataset.filter);
        });
    });

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.classList.toggle('active');
    });

    // Close mobile menu when clicking on links
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Modal close buttons
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });

    // Close modals when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });

    // Close promo banner
    closeBanner.addEventListener('click', function() {
        promoBanner.style.display = 'none';
    });

    // Contact form
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! We\'ll get back to you soon.');
        this.reset();
    });

    // Newsletter form
    document.querySelector('.newsletter-form').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for subscribing to our newsletter!');
        this.reset();
    });

    // Checkout form
    document.getElementById('checkoutForm').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Order placed successfully! We\'ll call you to confirm.');
        cart = [];
        updateCartUI();
        checkoutModal.style.display = 'none';
        this.reset();
    });
}

// Render Menu Items
function renderMenu(filter) {
    let filteredItems = menuItems;
    
    if (filter !== 'all') {
        filteredItems = menuItems.filter(item => 
            item.category.includes(filter) || item.type === filter
        );
    }
    
    menuGrid.innerHTML = filteredItems.map(item => `
        <div class="menu-item" data-category="${item.category.join(' ')}" data-type="${item.type}">
            <img src="${item.image}" alt="${item.name}">
            <div class="menu-item-content">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <div class="menu-item-footer">
                    <span class="price">₹${item.price}</span>
                    <button class="add-to-cart" onclick="addToCart(${item.id})">Add to Cart</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Cart Functions
function addToCart(itemId) {
    const item = menuItems.find(item => item.id === itemId);
    const existingItem = cart.find(cartItem => cartItem.id === itemId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({...item, quantity: 1});
    }
    
    updateCartUI();
    showNotification('Item added to cart!');
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCartUI();
}

function updateQuantity(itemId, change) {
    const item = cart.find(item => item.id === itemId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(itemId);
        } else {
            updateCartUI();
        }
    }
}

function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    cartCount.textContent = totalItems;
    cartTotal.textContent = totalPrice;
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div>
                <h4>${item.name}</h4>
                <p>₹${item.price} x ${item.quantity}</p>
            </div>
            <div>
                <button onclick="updateQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateQuantity(${item.id}, 1)">+</button>
                <button onclick="removeFromCart(${item.id})" style="margin-left: 10px; background: #e74c3c;">Remove</button>
            </div>
        </div>
    `).join('');
}

// Modal Functions
function openCart() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!');
        return;
    }
    cartModal.style.display = 'block';
}

function openCheckout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!');
        return;
    }
    cartModal.style.display = 'none';
    checkoutModal.style.display = 'block';
}

// Review Slider
function startReviewSlider() {
    setInterval(() => {
        currentReviewIndex = (currentReviewIndex + 1) % 3;
        currentReview(currentReviewIndex + 1);
    }, 5000);
}

function currentReview(n) {
    const reviews = document.querySelectorAll('.review-card');
    const dots = document.querySelectorAll('.dot');
    
    reviews.forEach(review => review.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    reviews[n - 1].classList.add('active');
    dots[n - 1].classList.add('active');
    
    currentReviewIndex = n - 1;
}

// Utility Functions
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth'
    });
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #27AE60;
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        z-index: 2000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add CSS animation for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll effect to header
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'white';
        header.style.backdropFilter = 'none';
    }
});

// Gallery image click effect
document.querySelectorAll('.gallery-grid img').forEach(img => {
    img.addEventListener('click', function() {
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 2000;
            cursor: pointer;
        `;
        
        const enlargedImg = document.createElement('img');
        enlargedImg.src = this.src;
        enlargedImg.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        `;
        
        overlay.appendChild(enlargedImg);
        document.body.appendChild(overlay);
        
        overlay.addEventListener('click', function() {
            document.body.removeChild(overlay);
        });
    });
});

// Add loading animation for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function() {
        this.style.opacity = '1';
    });
    
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease';
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.querySelectorAll('.menu-item, .special-card, .review-card, .gallery-grid img').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});