import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import apiClient from '../axios/apiClient'
import Items from '../items/Items'
import IconButton from '@material-ui/core/IconButton';
import cart from '../image/cart.jpg';
import "./Store.css"
import { useSelector } from 'react-redux';
import { getCartLength } from '../../store/foodSlice';
import Avatar from '../avatar/Avatar';

const Store = () => {
    const { name, id } = useParams();
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const cartLength = useSelector(getCartLength);
    useEffect(() => {
      getData();
    }, []);
    const getData = async () => {
        try {
            const result = await apiClient.get(`/get-item/${id}`);
            console.log(result.data);
            setData(result.data);
        } catch (error) {
            console.log(error.messages);
        }
    };
    const goToCart = (e) => {
        e.preventDefault();
        navigate(`/cart/${id}`);
    };
    return (
        <div className="store" >
            <div className="store_Header">
                <div className="store_HeaderProfile">
                    <Avatar/>
                </div>
                <h1>{name}</h1>
                <div className="store_HeaderCart">
                    <IconButton onClick={goToCart} >
                        <img className="store_HeaderCartImg" src={cart} alt="" />
                        <span className="store_HeaderCartLength" >{cartLength}</span>
                    </IconButton>
                </div>
            </div>
            <div className="store_Items">
                {data.map((food) => {
                    return(
                        <div key={food._id}>
                            <Items id={food._id} img={food.img} name={food.title} price={food.price} description={food.description} list={food.ingredients} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Store
