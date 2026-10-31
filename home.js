
// =====================================
// 1. PRODUCT DATABASE
// =====================================

const products = [

    {
        id: 1,
        name: "Apple iPhone 16",
        category: "electronics",
        price: 69999,
        oldPrice: 79999,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500"
    },

    {
        id: 2,
        name: "Samsung Galaxy Smartphone",
        category: "electronics",
        price: 29999,
        oldPrice: 34999,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500"
    },

    {
        id: 3,
        name: "HP Laptop",
        category: "electronics",
        price: 54999,
        oldPrice: 64999,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500"
    },

    {
        id: 4,
        name: "Wireless Headphones",
        category: "electronics",
        price: 1999,
        oldPrice: 2999,
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
    },

    {
        id: 5,
        name: "Men Casual T-Shirt",
        category: "fashion",
        price: 599,
        oldPrice: 999,
        rating: 4.2,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500"
    },

    {
        id: 6,
        name: "Women's Fashion Bag",
        category: "fashion",
        price: 1499,
        oldPrice: 2499,
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500"
    },

    {
        id: 7,
        name: "Modern Table Lamp",
        category: "home",
        price: 899,
        oldPrice: 1299,
        rating: 4.1,
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500"
    },

    {
        id: 8,
        name: "Modern Sofa Chair",
        category: "home",
        price: 8999,
        oldPrice: 11999,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500"
    },

    {
        id: 9,
        name: "Smart Watch",
        category: "accessories",
        price: 2499,
        oldPrice: 3999,
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
    },

    {
        id: 10,
        name: "Classic Wrist Watch",
        category: "accessories",
        price: 1799,
        oldPrice: 2599,
        rating: 4.2,
        image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500"
    },

    {
        id: 11,
        name: "Running Shoes",
        category: "fashion",
        price: 2199,
        oldPrice: 3299,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
    },

    {
        id: 12,
        name: "Premium Sunglasses",
        category: "accessories",
        price: 999,
        oldPrice: 1599,
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500"
    }

];


// =====================================
// 2. CART DATABASE
// =====================================

let cart = JSON.parse(localStorage.getItem("amazonCart")) || [];

let currentProducts = [...products];


// =====================================
// 3. DISPLAY PRODUCTS
// =====================================

function displayProducts(items) {

    const container = document.getElementById("productContainer");

    const noProducts = document.getElementById("noProducts");

    container.innerHTML = "";

    if (items.length === 0) {

        noProducts.style.display = "block";

        return;

    }

    noProducts.style.display = "none";

    items.forEach(product => {

        container.innerHTML += `

            <div class="product-card">

                <img src="${product.image}"
                     alt="${product.name}"
                     loading="lazy">

                <p class="product-category">
                    ${product.category}
                </p>

                <h3>${product.name}</h3>

                <div class="rating">
                    ★★★★★
                    <span>(${product.rating})</span>
                </div>

                <p class="price">
                    ₹${product.price.toLocaleString("en-IN")}

                    <span class="old-price">
                        ₹${product.oldPrice.toLocaleString("en-IN")}
                    </span>
                </p>

                <button class="add-btn"
                    onclick="addToCart(${product.id})">

                    Add to Cart

                </button>

            </div>

        `;

    });

}


// =====================================
// 4. ADD TO CART
// =====================================

function addToCart(id) {

    const existingProduct = cart.find(item => item.id === id);

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({

            id: id,

            quantity: 1

        });

    }

    saveCart();

    alert("Product added successfully!");

}


// =====================================
// 5. SAVE CART
// =====================================

function saveCart() {

    localStorage.setItem("amazonCart", JSON.stringify(cart));

    updateCartCount();

    displayCart();

}


// =====================================
// 6. UPDATE CART COUNT
// =====================================

function updateCartCount() {

    const totalItems = cart.reduce(

        (total, item) => total + item.quantity,

        0

    );

    document.getElementById("cartCount").textContent = totalItems;

}


// =====================================
// 7. DISPLAY CART
// =====================================

function displayCart() {

    const cartItems = document.getElementById("cartItems");

    const cartTotal = document.getElementById("cartTotal");

    cartItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <i class="fa-solid fa-cart-shopping fa-3x"></i>

                <h3>Your cart is empty!</h3>

                <p>Add some products to start shopping.</p>

            </div>

        `;

    }

    cart.forEach(item => {

        const product = products.find(p => p.id === item.id);

        if (!product) return;

        total += product.price * item.quantity;

        cartItems.innerHTML += `

            <div class="cart-item">

                <img src="${product.image}" alt="${product.name}">

                <div class="cart-item-details">

                    <h4>${product.name}</h4>

                    <p>₹${product.price.toLocaleString("en-IN")}</p>

                    <div class="quantity-controls">

                        <button onclick="changeQuantity(${product.id}, -1)">
                            -
                        </button>

                        <span>${item.quantity}</span>

                        <button onclick="changeQuantity(${product.id}, 1)">
                            +
                        </button>

                    </div>

                    <button class="remove-btn"
                        onclick="removeFromCart(${product.id})">

                        Remove

                    </button>

                </div>

            </div>

        `;

    });

    cartTotal.textContent = "₹" + total.toLocaleString("en-IN");

}


// =====================================
// 8. CHANGE QUANTITY
// =====================================

function changeQuantity(id, amount) {

    const item = cart.find(product => product.id === id);

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {

        cart = cart.filter(product => product.id !== id);

    }

    saveCart();

}


// =====================================
// 9. REMOVE FROM CART
// =====================================

function removeFromCart(id) {

    cart = cart.filter(item => item.id !== id);

    saveCart();

}


// =====================================
// 10. OPEN / CLOSE CART
// =====================================

function toggleCart() {

    document.getElementById("cartSidebar")
        .classList.toggle("active");

    document.getElementById("cartOverlay")
        .classList.toggle("active");

    displayCart();

}


// =====================================
// 11. SEARCH PRODUCTS
// =====================================

function searchProducts() {

    const query = document.getElementById("searchInput")
        .value.toLowerCase().trim();

    const category = document.getElementById("categorySelect").value;

    currentProducts = products.filter(product => {

        const matchesSearch =
            product.name.toLowerCase().includes(query);

        const matchesCategory =
            category === "all" || product.category === category;

        return matchesSearch && matchesCategory;

    });

    document.getElementById("sortSelect").value = "default";

    displayProducts(currentProducts);

    scrollToProducts();

}


// =====================================
// 12. CATEGORY FILTER
// =====================================

function filterCategory(category) {

    document.getElementById("categorySelect").value = category;

    document.getElementById("searchInput").value = "";

    currentProducts = products.filter(
        product => product.category === category
    );

    displayProducts(currentProducts);

    document.getElementById("sortSelect").value = "default";

    scrollToProducts();

}


// =====================================
// 13. SHOW ALL PRODUCTS
// =====================================

function showAllProducts() {

    currentProducts = [...products];

    document.getElementById("searchInput").value = "";

    document.getElementById("categorySelect").value = "all";

    document.getElementById("sortSelect").value = "default";

    displayProducts(currentProducts);

}


// =====================================
// 14. SORT PRODUCTS
// =====================================

function sortProducts() {

    const sortValue = document.getElementById("sortSelect").value;

    let sortedProducts = [...currentProducts];

    if (sortValue === "low") {

        sortedProducts.sort((a, b) => a.price - b.price);

    }

    else if (sortValue === "high") {

        sortedProducts.sort((a, b) => b.price - a.price);

    }

    displayProducts(sortedProducts);

}


// =====================================
// 15. SCROLL TO PRODUCTS
// =====================================

function scrollToProducts() {

    document.getElementById("products")
        .scrollIntoView({

            behavior: "smooth"

        });

}


// =====================================
// 16. CHECKOUT
// =====================================

function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;

    }

    alert(
        "Thank you for shopping! Checkout is a demo feature."
    );

}


// =====================================
// 17. INITIALIZE WEBSITE
// =====================================

displayProducts(products);

updateCartCount();

displayCart();


// Press Enter to search

document.getElementById("searchInput")
    .addEventListener("keydown", function(event) {

        if (event.key === "Enter") {

            searchProducts();

        }

    });


// Close cart with Escape key

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        document.getElementById("cartSidebar")
            .classList.remove("active");

        document.getElementById("cartOverlay")
            .classList.remove("active");

    }

});
