import React from 'react'
import "./Items.css"

const Items = ({ id, img, name, price, description, list }) => {
    return (
        <div className="items" >
            <div className="items_Left">
                <img src={img} alt="" />
            </div>
            <div className="items_Center">
                <h1>{name}</h1>
                <h4>price: taka {price}</h4>
            </div>
            <div className="items_Right">
                <h5>Description : {description}</h5>
                <p>Ingredient List: {list}</p>
            </div>
        </div>
    )
}

export default Items
