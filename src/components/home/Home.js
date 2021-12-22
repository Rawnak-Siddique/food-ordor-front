import React, { useState } from 'react';
import './Home.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../image/logo.png';
import btn from '../image/Capture.PNG';
import apiClient from '../axios/apiClient'

const Home = () => {
    const [sidebar, setSidebar] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [counters, setCounters] = useState("all");
    const [city, setCity] = useState("all");
    const navigate = useNavigate();
    const popUp = () => {
        setSidebar(!sidebar);
    };
    const logIn = async () => {
        const id = await apiClient.get(`/log-in-restaurant/${email}/${password}`)
        const user =id.data[0]._id;
        navigate(`/myRestaurant/${user}`);
    };
    const findRestaurant = (e) => {
        e.preventDefault();
        navigate(`/findRestaurant/${counters}/${city}`);
    };
    return (
        <div className="home" >
            <div className="home_Nav">
                <Link to="/createRestaurant" className="home_NavLink" >Admin Sign Up</Link>
                <button className="home_NavLink btn" onClick={popUp} >Admin Sign In</button>
            </div>
            <div className="home_PopUp">
                <div className={sidebar ? "home_NavSide active" : "home_NavSide"}>
                    <input type="text" placeholder="Enter email" onChange={(e) => (setEmail(e.target.value.toLowerCase()))} />
                    <input type="text" placeholder="Enter password" onChange={(e) => (setPassword(e.target.value.toLowerCase()))} />
                    <button onClick={logIn} >Login</button>
                </div>
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
