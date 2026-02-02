let cart = [];
let cartCount = 0;

const cartCountEl = document.querySelector(".cart-count");
const addButtons = document.querySelectorAll(".add-btn");

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
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    cartCount++;
    updateCartUI();
    console.log(cart);
}

function updateCartUI() {
    cartCountEl.textContent = cartCount;
}

document.addEventListener("DOMContentLoaded", () => {

    let cart = [];
    let cartCount = 0;

    const cartCountEl = document.querySelector(".cart-count");
    const addButtons = document.querySelectorAll(".add-btn");
    const cartModal = document.getElementById("cartModal");
    const closeBtn = cartModal.querySelector(".close-btn");
    const cartItemsEl = cartModal.querySelector(".cart-items");
    const cartTotalEl = cartModal.querySelector(".cart-total");
    const cartIcon = document.querySelector(".cart-icon");

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
        cartCount++;
        updateCartUI();
        console.log(cart);
    }

    function updateCartUI() {
        cartCountEl.textContent = cartCount;
    }

    cartIcon.addEventListener("click", () => {
        renderCart();
        cartModal.style.display = "block";
    });

    closeBtn.addEventListener("click", () => {
        cartModal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
        if (e.target == cartModal) {
            cartModal.style.display = "none";
        }
    });

    function renderCart() {
        cartItemsEl.innerHTML = "";
        let total = 0;
        cart.forEach(item => {
            const li = document.createElement("li");
            li.textContent = `${item.name} x${item.quantity} - ₱${item.price * item.quantity}`;
            cartItemsEl.appendChild(li);
            total += item.price * item.quantity;
        });
        cartTotalEl.textContent = `Total: ₱${total.toFixed(2)}`;
    }

});