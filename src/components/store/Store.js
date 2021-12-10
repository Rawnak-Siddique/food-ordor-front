import React from 'react'
import { useParams } from 'react-router-dom'
import Items from '../items/Items'
import "./Store.css"
import data from "../items.json"

const Store = () => {
    const param = useParams();
    return (
        <div className="store" >
            <div className="store_Header">
                <h1>{param.name}</h1>
            </div>
            <div className="store_Items">
                {data.map((food) => {
                    return(
                        <div key={food.id}>
                            <Items id={food.id} img={food.img} name={food.food} price={food.price} description={food.description} list={food.ingredients} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Store
