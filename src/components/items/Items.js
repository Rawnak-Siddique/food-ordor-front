import React, { useState } from 'react';
import "./Items.css";
import { useDispatch } from "react-redux";
import { addToBasket } from '../../store/foodSlice';
import btn from '../image/11.PNG';

const Items = ({ id, img, name, price, description, list }) => {
    const dispatch = useDispatch();
    const [item, setItem] = useState({
        id, img, name, price
    });
    const addToCart = () => {
        setItem({
            id: id,
            img: img,
            name: name,
            price: parseInt(price),
        });
        dispatch(addToBasket(item));
    };
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
            <div className="items_Add">
                <img onClick={addToCart} src={btn} />
            </div>
        </div>
    )
}

export default Items
