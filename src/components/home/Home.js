import React, { useState } from 'react';
import './Home.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../image/logo.png';
import btn from '../image/Capture.PNG';
import apiClient from '../axios/apiClient'

const Home = () => {
    const [sidebar, setSidebar] = useState(false);
    const [counters, setCounters] = useState("all");
    const [city, setCity] = useState("all");
    const navigate = useNavigate();
    const popUp = () => {
        setSidebar(!sidebar);
    };
    const findRestaurant = (e) => {
        e.preventDefault();
        navigate(`/findRestaurant/${counters}/${city}`);
    };
    return (
        <div className="home" >
            <div className="home_Nav">
                <Link to="/admin" className="home_NavLink" >Admin</Link>
                <Link to="/user" className="home_NavLink" >User</Link>
            </div>
            <div className="home_FindFood">
                <img src={logo} alt="" />
                <h1>Foodo Ordo</h1>

                <div className="home_FindFoodShop">
                    <input type="text" placeholder="Enter Country" onChange={(e) => (setCounters(e.target.value.toLowerCase()))} />
                    <input type="text" placeholder="Enter City" onChange={(e) => (setCity(e.target.value.toLowerCase()))}/>
                    <img onClick={findRestaurant} src={btn} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Home
