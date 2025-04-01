import React from "react";
import ReactDOM from "react-dom/client"; 
import { useState } from "react";
import "./css/style.css";

const menuItems = [
  { name: "Лазанья", price: 150, image: "Страва 1.png", description: "Традиційна італійська страва з шарами тіста." },
  { name: "Карбонара", price: 120, image: "Страва 2.png", description: "Спагеті з соусом з яєць та пармезану." },
  { name: "Салат Цезар", price: 180, image: "Страва 3.png", description: "Салат з крутонами та пармезаном." }
];


function FoodOrderApp() {
    const [section, setSection] = useState("menu");
    const [cart, setCart] = useState([]);
    const [orders, setOrders] = useState([]);
    const [orderCount, setOrderCount] = useState(0);
    
    const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

    const addToCart = (item) => {
        setCart([...cart, item]);
    };

    const removeFromCart = (index) => {
        setCart(cart.filter((_, i) => i !== index));
    };

    const placeOrder = () => {
        if (cart.length === 0) return;
        setOrderCount(orderCount + 1);
        setOrders([...orders, { id: orderCount + 1, items: cart, total: cartTotal }]);
        setCart([]);
    };

    return (
        <div>
            <nav>
                <button onClick={() => setSection("menu")}>Меню</button>
                <button onClick={() => setSection("cart")}>Кошик</button>
                <button onClick={() => setSection("orders")}>Замовлення</button>
            </nav>

            {section === "menu" && (
                <div className="menu">
                    {menuItems.map((item, index) => (
                        <div key={index} className="item">
                            <img src={item.image} alt={item.name} />
                            <h3>{item.name}</h3>
                            <p>{item.description}</p>
                            <p>Ціна: {item.price} грн</p>
                            <button onClick={() => addToCart(item)}>Додати в кошик</button>
                        </div>
                    ))}
                </div>
            )}

            {section === "cart" && (
                <div className="cart">
                    <h2>Кошик</h2>
                    {cart.length === 0 ? <p>Кошик порожній</p> : cart.map((item, index) => (
                        <div key={index} className="item">
                            <h3>{item.name}</h3>
                            <p>Ціна: {item.price} грн</p>
                            <button onClick={() => removeFromCart(index)}>Видалити</button>
                        </div>
                    ))}
                    <h3>Загальна сума: {cartTotal} грн</h3>
                    <button onClick={placeOrder} disabled={cart.length === 0}>Оформити замовлення</button>
                </div>
            )}

            {section === "orders" && (
                <div className="orders">
                    <h2>Історія замовлень</h2>
                    {orders.length === 0 ? <p>Немає історії замовлень</p> : orders.map(order => (
                        <div key={order.id} className="order-item">
                            <h3>Замовлення №{order.id}</h3>
                            <p><strong>Сума: {order.total} грн</strong></p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<FoodOrderApp />);
