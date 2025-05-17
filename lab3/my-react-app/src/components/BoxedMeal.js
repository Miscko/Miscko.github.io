import React from "react";

class BoxedMeal extends React.Component {
    render() {
        return (
            <div className="mealbox">
                <img src={this.props.carts.img}></img>
                <h3>{this.props.carts.name}</h3>
                <p>{this.props.carts.description}</p>
                <p>Ціна: {this.props.carts.price} грн</p>
            </div>    
        );
    }
}

export default BoxedMeal;
