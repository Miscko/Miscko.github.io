import React from "react";

class Cart extends React.Component {
    render() {
        return(
            <button className="button" onClick={this.props.onCartClick} >Кошик</button>
        )
    }
}

export default Cart