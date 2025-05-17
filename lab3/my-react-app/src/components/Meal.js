import React from "react";

class Meal extends React.Component {
    render() {
        return (
            <div className="mealbox">
                <img className="img" src={this.props.meal.img} alt={this.props.meal.name} />
                <h3>{this.props.meal.name}</h3>
                <p>{this.props.meal.description}</p>
                <p>Ціна: {this.props.meal.price} грн</p>
                <button className="buttonbox" onClick={() => this.props.onAddToCart(this.props.meal)}>
                    Додати в кошик
                </button>
            </div>    
        );
    }
}

export default Meal;

