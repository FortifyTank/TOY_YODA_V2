
// Resume checkout after login
const params = new URLSearchParams(window.location.search);
if (params.get("resumeCheckout") === "1") {
    setTimeout(() => {
        const cartIcon = document.querySelector(".cart-icon");
        if (cartIcon) cartIcon.click();
    }, 300);
}

function isLoggedIn() {
    return localStorage.getItem("toyYodaUser") !== null;
}


document.addEventListener("DOMContentLoaded", () => {

    let cart = [];
    let cartCount = 0;

    const cartCountElement = document.querySelector(".cart-count");
    const addButtons = document.querySelectorAll(".add-btn");
    const cartModal = document.getElementById("cartModal");
    const params = new URLSearchParams(window.location.search);
    const productCards = document.querySelectorAll(".product-card");
    const title = document.getElementById("categoryTitle");
    const checkoutBtn = cartModal.querySelector(".checkout-btn");
    const categoryButtons = document.querySelectorAll(".category-btn");
    const initialCategory = params.get("category") || "All";

    let closeBtn, cartItemsElement, cartTotalElement, cartIcon, clearCartBtn;

    // filters category by URL
    function filterCategory(category) {
        title.textContent = category === "All" ? "All Products" : category;

        productCards.forEach(card => {
            card.style.display = (category === "All" || card.dataset.category === category) ? "" : "none";
        });
    }

    filterCategory(initialCategory);

    if (cartModal) {
        closeBtn = cartModal.querySelector(".close-btn");
        cartItemsElement = cartModal.querySelector(".cart-items");
        cartTotalElement = cartModal.querySelector(".cart-total");
        cartIcon = document.querySelector(".cart-icon");
        clearCartBtn = cartModal.querySelector(".clear-cart-btn");
    }

    function saveCart() {
    localStorage.setItem("toyYodaCart", JSON.stringify(cart));
}

function loadCart() {
    const stored = localStorage.getItem("toyYodaCart");
    if (stored) {
        cart = JSON.parse(stored);
        cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    }
}

function isLoggedIn() {
    return localStorage.getItem("toyYodaUser") !== null;
}

loadCart();
updateCartUI();

if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {

        if (cart.length === 0) {
            alert("Your cart is empty.");
            return;
        }

        if (!isLoggedIn()) {
            localStorage.setItem("toyYodaPendingCheckout", "1");
            window.location.href = "login.html";
            return;
        }

        alert("Checkout successful! (Demo)");
        cart = [];
        cartCount = 0;
        saveCart();
        cartCountElement.textContent = cartCount;
        renderCart();
        cartModal.style.display = "none";
    });
}

    addButtons.forEach(button => {
        button.addEventListener("click", () => {
            const name = button.dataset.name;
            const price = parseFloat(button.dataset.price);
            
            addToCart(name, price);
        });
    });

    function addToCart(name, price) {
        
        const existingItem = cart.find(item => item.name === name);
       
        if (existingItem) {
            existingItem.quantity++;
        }
        else {
            cart.push({ name, price, quantity: 1 });
        }
        
        updateCartCount();
        updateCartUI();
        console.log(cart);

        saveCart();
    }

    function removeFromCart(name) {
        
        const itemIndex = cart.findIndex(item => item.name === name);

        if (itemIndex !== -1) {
            if (cart[itemIndex].quantity > 1) {
                cart[itemIndex].quantity--;
            }
            else {
                cartCount--;
                cart.splice(itemIndex, 1);
            }
        }

        updateCartCount();
        updateCartUI();
        saveCart();

        renderCart();
    }

    function updateCartCount() {
        cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        
        if (cartCountElement) cartCountElement.textContent = cartCount;
    }


    function updateCartUI() {
        if (cartCountElement)
            cartCountElement.textContent = cartCount;
    }

    cartIcon.addEventListener("click", () => {
        if (cartIcon) {
            cartIcon.addEventListener("click", () => {
                renderCart();
                cartModal.style.display = "block";
            });
        }
    });

    closeBtn.addEventListener("click", () => {
        cartModal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
        if (e.target == cartModal) {
            cartModal.style.display = "none";
        }
    });

    clearCartBtn.addEventListener("click", () => {
        cart = [];
        cartCount = 0;

        updateCartUI();
        renderCart();
        saveCart()
    });

    function renderCart() {
    
        cartItemsElement.innerHTML = "";
        let total = 0;

        cart.forEach(item => {

            const li = document.createElement("li");
            const itemText = document.createElement("span");
            const removeBtn = document.createElement("button");

            itemText.textContent = `${item.name} x${item.quantity} - ₱${(item.price * item.quantity).toFixed(2)}`;

            removeBtn.textContent = "Remove Item";
            removeBtn.style.marginLeft = "12px";

            removeBtn.addEventListener("click", () => {
                removeFromCart(item.name);
            });

            li.appendChild(itemText);
            li.appendChild(removeBtn);

            cartItemsElement.appendChild(li);

            total += item.price * item.quantity;

            });

            cartTotalElement.textContent = `Total: ₱${total.toFixed(2)}`;
    }

    // ===== LOGIN STATE UI =====
const profileIcon = document.querySelector(".profile-icon");

if (profileIcon) {
    const user = localStorage.getItem("toyYodaUser");

    if (user) {
        profileIcon.title = "Logout";

        profileIcon.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.removeItem("toyYodaUser");
            alert("Logged out");
            location.reload();
        });

    } else {
        profileIcon.addEventListener("click", () => {
            if (localStorage.getItem("toyYodaPendingCheckout")) {
                localStorage.removeItem("toyYodaPendingCheckout");
                window.location.href = "index.html?resumeCheckout=1";
            } else {
                window.location.href = "index.html";
            }

        });
    }
}

});

// ===== AUTH SYSTEM =====
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

function loadUsers() {
    return JSON.parse(localStorage.getItem("toyYodaUsers")) || [];
}

function saveUsers(users) {
    localStorage.setItem("toyYodaUsers", JSON.stringify(users));
}

// REGISTER
if (registerForm) {
    registerForm.addEventListener("submit", e => {
        e.preventDefault();

        const name = regName.value.trim();
        const email = regEmail.value.trim().toLowerCase();
        const pass = regPass.value;

        const users = loadUsers();
        if (users.find(u => u.email === email)) {
            alert("Email already registered");
            return;
        }

        users.push({ name, email, pass });
        saveUsers(users);

        alert("Registered successfully!");
        window.location.href = "login.html";
    });
}

// LOGIN
if (loginForm) {
    loginForm.addEventListener("submit", e => {
        e.preventDefault();

        const email = loginEmail.value.trim().toLowerCase();
        const pass = loginPass.value;

        const users = loadUsers();
        const user = users.find(u => u.email === email && u.pass === pass);

        if (!user) {
            alert("Invalid credentials");
            return;
        }

        localStorage.setItem("toyYodaUser", JSON.stringify(user));

        const pending = localStorage.getItem("toyYodaPendingCheckout");
        localStorage.removeItem("toyYodaPendingCheckout");

        window.location.href = "index.html";
    });
}
