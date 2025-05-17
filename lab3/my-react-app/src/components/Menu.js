import React from "react";

class Menu extends React.Component {
    render() {
        return(
            <button className="button" onClick={this.props.onMenuClick}>Меню</button>
        )
    }
}

export default Menu