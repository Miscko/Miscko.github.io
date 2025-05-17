import React from "react";
import BoxedMeal from "./BoxedMeal";

class ShowCart extends React.Component {
    render() {
        var total = this.props.cart.reduce((sum, item) => sum + item.price, 0);
        return(
            <div className="cart-list">
                <h3>Кошик</h3>
                <h3>Вартість: {total}</h3>
                <button className="buttoncart" onClick={this.props.onPlaceOrder}>Замовити</button>
                {this.props.cart.map((el, index) => (
                    <div key={el.id}>
                        <BoxedMeal cart={this.props.cart} key={index} carts={el} />
                        <button className="buttoncart" onClick={() => this.props.onRemove(el.id)}>
                            Видалити
                        </button>
                    </div>
                ))}
            </div>
        )
    }
}

export default ShowCart