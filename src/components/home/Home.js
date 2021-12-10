import React, { useState } from 'react';
import './Home.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../image/14.PNG';

const Home = () => {
    const [sidebar, setSidebar] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [counters, setCounters] = useState("");
    const [city, setCity] = useState("");
    const navigate = useNavigate();
    console.log(email);
    console.log(password);
    console.log(counters);
    console.log(city);
    const popUp = () => {
        setSidebar(!sidebar);
    };
    const logIn = () => {
        if (email === "abc" && password === "abc") {
            navigate(`/myRestaurant/1`);
        }
    };
    const findRestaurant = (e) => {
        e.preventDefault();
        navigate(`/findRestaurant/${counters}/${city}`);
    };
    return (
        <div className="home" >
            <div className="home_Nav">
                <Link to="/createRestaurant" className="home_NavLink" >Create Restaurant</Link>
                <button className="home_NavLink btn" onClick={popUp} >Sign In</button>
            </div>
            <div className="home_PopUp">
                <div className={sidebar ? "home_NavSide active" : "home_NavSide"}>
                    <input type="text" placeholder="Enter email" onChange={(e) => (setEmail(e.target.value))} />
                    <input type="text" placeholder="Enter password" onChange={(e) => (setPassword(e.target.value))} />
                    <button onClick={logIn} >Login</button>
                </div>
            </div>
            <div className="home_FindFood">
                <img src={logo} alt="" />
                <h1>Welcome to Foodo Ordo</h1>
                <div className="home_FindFoodShop">
                    <input type="text" placeholder="Enter Country" onChange={(e) => (setCounters(e.target.value))} />
                    <input type="text" placeholder="Enter City" onChange={(e) => (setCity(e.target.value))}/>
                    <button onClick={findRestaurant} >Find Restaurant</button>
                </div>
            </div>
        </div>
    )
}

export default Home
