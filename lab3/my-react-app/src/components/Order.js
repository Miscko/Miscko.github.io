import React from "react";

class Order extends React.Component {
    render() {
        return(
            <button className="button" onClick={this.props.onOrderClick} >Мої замовлення</button>
        )
    }
}

export default Order