import "./MyRestaurant.css"
import data from '../items.json'
import Items from '../items/Items'

const MyRestaurant = () => {
    return (
        <div className="myRestaurant" >
            <div className="myRestaurant_Items">
                <div className="myRestaurant_ItemsCreate">
                    <h1>create restaurant items</h1>
                </div>
                <div className="myRestaurant_ItemsList">
                    {data.map((food) => {
                        return(
                            <div key={food.id} >
                                <Items id={food.id} img={food.img} name={food.food} price={food.price} description={food.description} list={food.ingredients} />
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="myRestaurant_Order">
                <h1>order</h1>

            </div>
        </div>
    )
}

export default MyRestaurant;
