/*import React from "react";
import Menu from "./Menu";
import Cart from "./Cart";
import Order from "./Order";
import SinLin from "./SinLin";
import ShowMenu from "./ShowMenu";
import ShowCart from "./ShowCart";
import ShowOrder from "./ShowOrder";
import ShowMainPage from "./ShowMainPage";
import ShowSinLin from "./ShowSinLin";

class FoodOrderApp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            st: "mainpage",
            countOfOrders: 2,
            meals: [
                {
                    id: 1,
                    name: "Лазанья",
                    price: 100,
                    description: "Традиційна італійська страва",
                    img: "./img/Страва_1.png",
                    type: "Гарячі страви"
                },
                {
                    id: 2,
                    name: "Карбонара",
                    price: 150,
                    description: "Спагеті з соусом з яєць та пармезану",
                    img: "./img/Страва_2.png",
                    type: "Гарячі страви"
                },
                {
                    id: 3,
                    name: "Салат Цезар",
                    price: 200,
                    description: "Салат з крутонами та пармезаном",
                    img: "./img/Страва_3.png",
                    type: "Салати"
                },
                {
                    id: 4,
                    name: "Піца",
                    price: 250,
                    description: "Національне італійське блюдо",
                    img: "./img/Страва_4.png",
                    type: "Піци"
                },
                {
                    id: 5,
                    name: "Кава",
                    price: 70,
                    description: "Американо",
                    img: "./img/Страва_5.png",
                    type: "Напої"
                },
                {
                    id: 6,
                    name: "Сік",
                    price: 70,
                    description: "Ананасовий сік",
                    img: "./img/Страва_6.png",
                    type: "Напої"
                }
            ],
            cart: [

            ],
            order: [
                
            ]
        }
    }
    handleChangeSt = (newState) => {
        this.setState({ st: newState });
    }
    addToCart = (meal) => {
        this.setState((prevState) => ({
            cart: [...prevState.cart, meal]
        }), () => {
            console.log("Cart now:", this.state.cart);
        });
    }
    placeOrder = () => {
        if (this.state.cart.length === 0) return;
    
        this.setState((prevState) => ({
            order: [...prevState.order, [...prevState.cart]], // додає нове замовлення
            cart: [], // очищає кошик
            countOfOrders: prevState.countOfOrders + 1
        }), () => {
            console.log("Order placed:", this.state.order);
        });
    }
    removeFromCart = (id) => {
        this.setState((prevState) => ({
            cart: prevState.cart.filter(item => item.id !== id)
        }));
    }                   
    render() {
        return(<div>
            <header className="header">
                <button className="button" onClick={() => {this.handleChangeSt("mainpage")}}>Ам ням ням</button>
                <SinLin onSinLinClick={() => {this.handleChangeSt("sinlin")}}/>
                <Menu onMenuClick={() => {this.handleChangeSt("menu")}}/>
                <Cart onCartClick={() => {this.handleChangeSt("cart")}}/>
                <Order onOrderClick={() => {this.handleChangeSt("order")}}/>
            </header>
            <main className="main">
                {this.state.st === "mainpage" && <ShowMainPage/>}
                {this.state.st === "sinlin" && <ShowSinLin/>}
                {this.state.st === "menu" && <ShowMenu meals={this.state.meals} onAddToCart={this.addToCart}/>}
                {this.state.st === "cart" && <ShowCart cart={this.state.cart} onPlaceOrder={this.placeOrder} onRemove={this.removeFromCart}/>}
                {this.state.st === "order" && <ShowOrder order={this.state.order} count={this.state.countOfOrders}/>}
            </main>
        </div>
        )
    }
}

export default FoodOrderApp*/
import React from "react";
import Menu from "./Menu";
import Cart from "./Cart";
import Order from "./Order";
import SinLin from "./SinLin";
import ShowMenu from "./ShowMenu";
import ShowCart from "./ShowCart";
import ShowOrder from "./ShowOrder";
import ShowMainPage from "./ShowMainPage";
import ShowSinLin from "./ShowSinLin";
import { auth, db } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp } from "firebase/firestore";

class FoodOrderApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      st: "sinlin",
      meals: [ {
                    id: 1,
                    name: "Лазанья",
                    price: 100,
                    description: "Традиційна італійська страва",
                    img: "./img/Страва_1.png",
                    type: "Гарячі страви"
                },
                {
                    id: 2,
                    name: "Карбонара",
                    price: 150,
                    description: "Спагеті з соусом з яєць та пармезану",
                    img: "./img/Страва_2.png",
                    type: "Гарячі страви"
                },
                {
                    id: 3,
                    name: "Салат Цезар",
                    price: 200,
                    description: "Салат з крутонами та пармезаном",
                    img: "./img/Страва_3.png",
                    type: "Салати"
                },
                {
                    id: 4,
                    name: "Піца",
                    price: 250,
                    description: "Національне італійське блюдо",
                    img: "./img/Страва_4.png",
                    type: "Піци"
                },
                {
                    id: 5,
                    name: "Кава",
                    price: 70,
                    description: "Американо",
                    img: "./img/Страва_5.png",
                    type: "Напої"
                },
                {
                    id: 6,
                    name: "Сік",
                    price: 70,
                    description: "Ананасовий сік",
                    img: "./img/Страва_6.png",
                    type: "Напої"
                } ],
      cart: [],
      order: [],
      user: null,
    };
  }

  handleAuthSuccess = () => {
    this.setState({ st: "mainpage" });
  };

  componentDidMount() {
    this.authUnsub = onAuthStateChanged(auth, async (user) => {
      this.setState({ user });
      if (user) {
        await this.loadOrderHistory(user.uid);
        this.setState({ st: "mainpage" });
      } else {
        this.setState({ order: [] });
      }
    });
  }

  componentWillUnmount() {
    if (this.authUnsub) this.authUnsub();
  }

  loadOrderHistory = async (uid) => {
    try {
      const ordersRef = collection(db, "users", uid, "orders");
      const q = query(ordersRef, orderBy("createdAt", "asc"));
      const snapshot = await getDocs(q);
      const history = snapshot.docs.map((doc) => doc.data().items);
      this.setState({ order: history });
    } catch (e) {
      console.error("Error loading history:", e);
    }
  };

  handleChangeSt = (st) => {
    if (!this.state.user && st !== "sinlin") {
      alert("Будь ласка, зареєструйтесь або увійдіть.");
      return;
    }
    this.setState({ st });
  };

  addToCart = (meal) => {
    if (!this.state.user) {
      alert("Будь ласка, зареєструйтесь або увійдіть.");
      return;
    }
    this.setState((prev) => ({ cart: [...prev.cart, meal] }));
  };

  placeOrder = async () => {
    if (!this.state.user) {
      alert("Будь ласка, зареєструйтесь або увійдіть.");
      return;
    }
    const { cart, user } = this.state;
    if (!cart.length) return;
    try {
      await addDoc(collection(db, "users", user.uid, "orders"), {
        items: cart,
        createdAt: serverTimestamp(),
      });
      await this.loadOrderHistory(user.uid);
    } catch (e) {
      console.error("Error saving order:", e);
    }
    this.setState({ cart: [] });
  };

  handleLogout = async () => {
    await signOut(auth);
    this.setState({ user: null, st: "sinlin", cart: [], order: [] });
  };

  removeFromCart = (id) => {
    this.setState((prev) => ({ cart: prev.cart.filter((item) => item.id !== id) }));
  };

  render() {
    const { st, meals, cart, order, user } = this.state;
    return (
      <div>
        <header className="header" style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="nav-buttons">
            <button className="button" onClick={() => this.handleChangeSt("mainpage")}>Ам ням ням</button>
            <SinLin onSinLinClick={() => {this.handleChangeSt("sinlin")}}/>
            <Menu onMenuClick={() => {this.handleChangeSt("menu")}}/>
            <Cart onCartClick={() => {this.handleChangeSt("cart")}}/>
            <Order onOrderClick={() => {this.handleChangeSt("order")}}/>
          </div>
          <div className="user-info">
            {user ? (
              <>
                <span style={{ marginRight: "1rem" }}>{user.email}</span>
                <button className="button" onClick={this.handleLogout}>Вийти</button>
              </>
            ) : (
              <span>Увійдіть будь ласка</span>
            )}
          </div>
        </header>
        <main className="main">
          {st === "mainpage" && <ShowMainPage />}
          {st === "sinlin" && <ShowSinLin onAuthSuccess={this.handleAuthSuccess} />}
          {st === "menu" && <ShowMenu meals={meals} onAddToCart={this.addToCart} />}
          {st === "cart" && <ShowCart cart={cart} onPlaceOrder={this.placeOrder} onRemove={this.removeFromCart} />}
          {st === "order" && <ShowOrder order={order} />}
        </main>
      </div>
    );
  }
}

export default FoodOrderApp;