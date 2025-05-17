import React from "react";
import BoxedMeal from "./BoxedMeal";

class ShowOrder extends React.Component {
        render() {
            const { order } = this.props;
        
            if (!order || order.length === 0) {
                return <div><h3>Замовлення відсутні</h3></div>;
            }
        
            return (
                <div>
                    <h3>Мої замовлення</h3>
                    <div className="divv">
                        {order.map((group, i) => {
                            const total = group.reduce((sum, item) => sum + item.price, 0);
                            return (
                                <div key={i} style={{ marginBottom: '20px' }}>
                                    <h2>Замовлення №{i + 1}</h2>
                                    {group.map((el, index) => (
                                        <BoxedMeal cart={group} key={`${el.id}-${index}`} carts={el} />
                                    ))}
                                    <h3>Вартість: {total}</h3>
                                </div>
                            );
                        })}
                    </div>
                </div>
            );
        }
        
      
}

export default ShowOrder