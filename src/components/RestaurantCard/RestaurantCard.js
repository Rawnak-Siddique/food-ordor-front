import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { setCounter, setCity, setArea } from '../../store/foodSlice';
import "./RestaurantCard.css"

const RestaurantCard = ({ id, url, title, description, country, city, address }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [counter, setCountry] = useState("");
    const [cities, setCities] = useState("");
    const [area, setAddress] = useState("");
    const openStore = () => {
        /*setCountry(country);
        setCities(city)
        setAddress(address);
        dispatch(setCounter(counter));
        dispatch(setCity(cities));
        dispatch(setArea(area));*/
        navigate(`/store/${title}/${id}`);
    }
    return (
        <div className="restaurantCard" onClick={openStore} >
            <div className="restaurantCard_Top">
                <img src={url} alt="" />
                <h1>{title}</h1>
            </div>
            <div className="restaurantCard_Bottom">
                <p>{description}</p>
            </div>
        </div>
    )
}

export default RestaurantCard
