import React from "react";

class ShowMainPage extends React.Component {
     render() {
        return (
            <div>
                <h1>Ам ням ням</h1>
                <img 
                    src={"./img/Споруда.png"} 
                    style={{
                    maxWidth: "100%",
                    height: "auto",
                    display: "block",
                    objectFit: "cover", // опційно
                }}></img>
                <h3>Адмін Фродька</h3>
                <img 
                    src={"./img/Фродька.jpg"} 
                    style={{
                    maxWidth: "100%",
                    height: "auto",
                    display: "block",
                    objectFit: "cover", // опційно
                }}></img>
                <h3>
                    Контакти: +380673837203
                </h3>
                <h3>    
                    Адреса: Україна, Львівська область, Львів, вулиця Степана Бандери 28А
                </h3>
            </div>
        );
    }
}

export default ShowMainPage