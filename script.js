

document.addEventListener("DOMContentLoaded", () => {

    let cart = [];
    let cartCount = 0;

    const cartCountElement = document.querySelector(".cart-count");
    const addButtons = document.querySelectorAll(".add-btn");
    const cartModal = document.getElementById("cartModal");
    const closeBtn = cartModal.querySelector(".close-btn");
    const cartItemsElement = cartModal.querySelector(".cart-items");
    const cartTotalElement = cartModal.querySelector(".cart-total");
    const cartIcon = document.querySelector(".cart-icon");
    const clearCartBtn = cartModal.querySelector(".clear-cart-btn");
    const categoryButtons = document.querySelectorAll(".category-btn");
    const productCards = document.querySelectorAll(".product-card");

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

    function removeFromCart(name) {
        
        const itemIndex = cart.findIndex(item => item.name === name);

        if (itemIndex !== -1) {
            if (cart[itemIndex].quantity > 1) {
                cart[itemIndex].quantity--;
                cartCount--;
            }
            else {
                cartCount--;
                cart.splice(itemIndex, 1);
            }
        }

        updateCartUI();
        renderCart();
    }

    function updateCartUI() {
        cartCountElement.textContent = cartCount;
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

    clearCartBtn.addEventListener("click", () => {
        cart = [];
        cartCount = 0;

        updateCartUI();
        renderCart();
    });

    categoryButtons.forEach(button => {
        button.addEventListener("click", () => {
            
            const category = button.dataset.category;

            productCards.forEach(card => {
                if (category === "All" || card.dataset.category === category) {
                    card.style.display = "";
                }
                else {
                    card.style.display = "none";
                }
            });
        });
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

});