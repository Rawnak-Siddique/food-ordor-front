import React, { useState } from 'react';
import './UserPanel.css'
import { Link, useNavigate } from 'react-router-dom';
import logo from '../image/logo.png';
import btn from '../image/Capture.PNG';
import apiClient from '../axios/apiClient'

const UserPanel = () => {
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
    <div className="UserPanel" >
            <div className="UserPanel_Nav">
                <Link to="/createRestaurant" className="UserPanel_NavLink" >User Sign Up</Link>
                <button className="UserPanel_NavLink btn" onClick={popUp} >User Sign In</button>
            </div>
            <div className="UserPanel_PopUp">
                <div className={sidebar ? "UserPanel_NavSide active" : "UserPanel_NavSide"}>
                    <input type="text" placeholder="Enter email" onChange={(e) => (setEmail(e.target.value))} />
                    <input type="text" placeholder="Enter password" onChange={(e) => (setPassword(e.target.value))} />
                    <button onClick={logIn} >Login</button>
                </div>
            </div>
            <div className="UserPanel_FindFood">
                <img src={logo} alt="" />
                <h1>Foodo Ordo User</h1>
                <div className="UserPanel_FindFoodShop">
                    <input type="text" placeholder="Enter Country" onChange={(e) => (setCounters(e.target.value))} />
                    <input type="text" placeholder="Enter City" onChange={(e) => (setCity(e.target.value))}/>
                    <img onClick={findRestaurant} src={btn} alt="" />
                </div>
            </div>
        </div>
  );
}

export default UserPanel;
