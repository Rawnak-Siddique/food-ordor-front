import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./RestaurantCard.css"

const RestaurantCard = ({ id, url, title, description}) => {
    const navigate = useNavigate();
    const openStore = () => {
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
