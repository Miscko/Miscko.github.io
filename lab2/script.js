let orderCount = 0;
let cartTotal = 0;
const menuItems = [
    { name: "Лазанья", price: 150, image: "Страва 1.png", description: "Традиційна італійська страва з шарами тіста." },
    { name: "Карбонара", price: 120, image: "Страва 2.png", description: "Спагеті з соусом з яєць та пармезану." },
    { name: "Салат Цезар", price: 180, image: "Страва 3.png", description: "Салат з крутонами та пармезаном." }
];

function showSection(section) {
    document.getElementById('menu').style.display = section === 'menu' ? 'grid' : 'none';
    document.getElementById('cart').style.display = section === 'cart' ? 'block' : 'none';
    document.getElementById('orders').style.display = section === 'orders' ? 'block' : 'none';
}

const menuContainer = document.getElementById('menu');
for (let i = 0; i < menuItems.length; i++) {
    const item = document.createElement('div');
    item.classList.add('item');
    item.innerHTML = `
        <img src="${menuItems[i].image}" alt="${menuItems[i].name}">
        <h3>${menuItems[i].name}</h3>
        <p>${menuItems[i].description}</p>
        <p>Ціна: ${menuItems[i].price} грн</p>
        <button onclick="addToCart(this, '${menuItems[i].name}', ${menuItems[i].price})">Додати в кошик</button>
    `;
    menuContainer.appendChild(item);
}

function addToCart(button, name, price) {
    button.classList.add('added');
    const originalText = button.textContent;
    button.textContent = "Додано!";
    button.disabled = true; 

    setTimeout(() => {
        button.classList.remove('added');
        button.textContent = originalText;
        button.disabled = false;
    }, 3000);

    const cart = document.getElementById('cart-items');
    if (cart.innerHTML.includes('Кошик порожній')) {
        cart.innerHTML = '';
    }

    const item = document.createElement('div');
    item.classList.add('item');
    item.innerHTML = `
        <h3>${name}</h3>
        <p>Ціна: ${price} грн</p>
        <button onclick="removeFromCart(this, ${price})">Видалити</button>
    `;

    cart.appendChild(item);
    cartTotal += price;
    updateCartTotal();
}

function removeFromCart(button, price) {
    button.parentElement.remove();
    cartTotal -= price;
    updateCartTotal();

    const cart = document.getElementById('cart-items');
    if (cart.innerHTML.trim() === '') {
        cart.innerHTML = '<p>Кошик порожній</p>';
    }
}

function updateCartTotal() {
    document.getElementById('cart-total').textContent = `Загальна сума: ${cartTotal} грн`;
}

function placeOrder() {
    const cart = document.getElementById('cart-items');
    const orders = document.getElementById('order-items');

    if (cart.innerHTML.trim() !== '' && !cart.innerHTML.includes('Кошик порожній')) {
        if (orders.innerHTML.includes('Немає історії замовлень')) {
            orders.innerHTML = ''; 
        }

        orderCount++;
        const orderWrapper = document.createElement('div');
        orderWrapper.classList.add('order-item');

        orderWrapper.innerHTML = `
            <h3>Замовлення №${orderCount}</h3>
            <p><strong>Сума замовлення: ${cartTotal} грн</strong></p>
        `;

        // Додаємо страви до замовлення
        let i = 0;
        while (i < cart.children.length) {
            if (cart.children[i].classList.contains('item')) {
                orderWrapper.appendChild(cart.children[i].cloneNode(true));
            }
            i++;
        }

        orders.appendChild(orderWrapper);
        startDeliveryTimer(orderWrapper); // Запускаємо таймер

        // Очищуємо кошик
        cart.innerHTML = '<p>Кошик порожній</p>';
        cartTotal = 0;
        updateCartTotal();
    }
}

// Функція для таймера доставки
function startDeliveryTimer(order) {
    const timer = document.createElement('p');
    let timeLeft = 10; // Час у секундах
    timer.textContent = `Очікуйте доставку: ${timeLeft} сек`;
    order.appendChild(timer);

    const interval = setInterval(() => {
        timeLeft--;
        timer.textContent = `Очікуйте доставку: ${timeLeft} сек`;
        if (timeLeft === 0) {
            clearInterval(interval);
            timer.textContent = "✅ Замовлення доставлено!";
        }
    }, 1000);
}

