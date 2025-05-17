import React from "react";

class SinLin extends React.Component {
    render() {
        return(
            <button className="button" onClick={this.props.onSinLinClick} >Реєстрація / Вхід</button>
        )
    }
}

export default SinLin