/*let orderCount = 0;
        
function showSection(section) {
    document.getElementById('menu').style.display = section === 'menu' ? 'grid' : 'none';
    document.getElementById('cart').style.display = section === 'cart' ? 'block' : 'none';
    document.getElementById('orders').style.display = section === 'orders' ? 'block' : 'none';
}

function addToCart(name, price) {
    const cart = document.getElementById('cart-items');
    if (cart.innerHTML.includes('Кошик порожній')) {
        cart.innerHTML = '';
    }
    const item = document.createElement('div');
    item.classList.add('item');
    item.innerHTML = `<h3>${name}</h3><p>Ціна: ${price} грн</p>`;
    cart.appendChild(item);
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
        orderWrapper.innerHTML = `<h3>Замовлення №${orderCount}</h3>` + cart.innerHTML;
        orders.appendChild(orderWrapper);
        cart.innerHTML = '<p>Кошик порожній</p>';
    }
}*/
let orderCount = 0;
let cartTotal = 0;

function showSection(section) {
    document.getElementById('menu').style.display = section === 'menu' ? 'grid' : 'none';
    document.getElementById('cart').style.display = section === 'cart' ? 'block' : 'none';
    document.getElementById('orders').style.display = section === 'orders' ? 'block' : 'none';
}

function addToCart(name, price) {
    const cart = document.getElementById('cart-items');
    if (cart.innerHTML.includes('Кошик порожній')) {
        cart.innerHTML = ''; // Очистити текст "Кошик порожній"
    }

    // Створюємо контейнер для елемента кошика
    const item = document.createElement('div');
    item.classList.add('item');

    // Додаємо текст і кнопку "Видалити"
    item.innerHTML = `
        <h3>${name}</h3>
        <p>Ціна: ${price} грн</p>
        <button onclick="removeFromCart(this, ${price})">Видалити</button>
    `;

    cart.appendChild(item);

    // Оновлюємо загальну суму
    cartTotal += price;
    updateCartTotal();
}

function removeFromCart(button, price) {
    button.parentElement.remove(); // Видаляє батьківський div (тобто всю страву)
    cartTotal -= price;
    updateCartTotal();

    // Якщо кошик став порожнім, додаємо повідомлення
    const cart = document.getElementById('cart-items');
    if (cart.innerHTML.trim() === '') {
        cart.innerHTML = '<p>Кошик порожній</p>';
    }
}

function updateCartTotal() {
    const totalElement = document.getElementById('cart-total');
    totalElement.textContent = `Загальна сума: ${cartTotal} грн`;
}

function placeOrder() {
    const cart = document.getElementById('cart-items');
    const orders = document.getElementById('order-items');

    if (cart.innerHTML.trim() !== '' && !cart.innerHTML.includes('Кошик порожній')) {
        if (orders.innerHTML.includes('Немає історії замовлень')) {
            orders.innerHTML = ''; // Очистити старий текст
        }

        orderCount++;
        const orderWrapper = document.createElement('div');
        orderWrapper.classList.add('order-item');

        // Додаємо заголовок замовлення та суму
        orderWrapper.innerHTML = `
            <h3>Замовлення №${orderCount}</h3>
            <p><strong>Сума замовлення: ${cartTotal} грн</strong></p>
        `;

        // Додаємо всі страви з кошика, але без кнопки "Видалити"
        cart.querySelectorAll('.item').forEach(cartItem => {
            const orderItem = document.createElement('div');
            orderItem.classList.add('item');
            orderItem.innerHTML = `
                <h3>${cartItem.querySelector('h3').textContent}</h3>
                <p>${cartItem.querySelector('p').textContent}</p>
            `;
            orderWrapper.appendChild(orderItem);
        });

        orders.appendChild(orderWrapper);

        // Очистити кошик
        cart.innerHTML = '<p>Кошик порожній</p>';
        cartTotal = 0;
        updateCartTotal();
    }
}


