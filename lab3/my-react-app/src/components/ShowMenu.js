import React from "react";
import Meal from "./Meal";

class ShowMenu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedType: "" // тип їжі, який обрано
        }
    }

    handleChangeType = (newType) => {
        this.setState({ selectedType: newType });
    }

    render() {
        const filteredMeals = this.state.selectedType
            ? this.props.meals.filter((meal) => meal.type.toLowerCase() === this.state.selectedType.toLowerCase())
            : this.props.meals;

        return(
            <div>
                <h3>Меню</h3>
                <button className="buttoncart" onClick={() => this.handleChangeType("Сніданки")}>Сніданки</button>
                <button className="buttoncart" onClick={() => this.handleChangeType("Обіди")}>Обіди</button>
                <button className="buttoncart" onClick={() => this.handleChangeType("Вечері")}>Вечері</button>
                <button className="buttoncart" onClick={() => this.handleChangeType("Гарячі страви")}>Гарячі страви</button>
                <button className="buttoncart" onClick={() => this.handleChangeType("Салати")}>Салати</button>
                <button className="buttoncart" onClick={() => this.handleChangeType("Піци")}>Піци</button>
                <button className="buttoncart" onClick={() => this.handleChangeType("Закуски")}>Закуски</button>
                <button className="buttoncart" onClick={() => this.handleChangeType("Напої")}>Напої</button>
                <button className="buttoncart" onClick={() => this.handleChangeType("")}>Показати всі</button>

                <div className="divv">
                    {filteredMeals.map((el) => (
                        <Meal
                            meals={this.props.meals}
                            key={el.id}
                            meal={el}
                            onAddToCart={this.props.onAddToCart}
                        />
                    ))}
                </div>
            </div>
        )
    }
}

export default ShowMenu;
