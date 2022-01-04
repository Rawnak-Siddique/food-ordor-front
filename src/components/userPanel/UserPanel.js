import React, { useState } from 'react';
import './UserPanel.css'
import { Link, useNavigate } from 'react-router-dom';
import logo from '../image/logo.png';
import btn from '../image/Capture.PNG';
import apiClient from '../axios/apiClient'
import { useDispatch } from 'react-redux';
import { logInUser } from '../../store/userSlice';

const UserPanel = () => {
    const [sidebar, setSidebar] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [counters, setCounters] = useState("all");
    const [city, setCity] = useState("all");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const popUp = () => {
        setSidebar(!sidebar);
    };
    const logIn = async () => {
        const id = await apiClient.get(`/log-in-profile/${email}/${password}`)
        dispatch(logInUser(id.data));
        const user =id.data[0]._id;
        if (user) {
            navigate(`/findRestaurant/${id.data[0].counters}/${id.data[0].city}`);
        }
    };
    const findRestaurant = (e) => {
        e.preventDefault();
        navigate(`/findRestaurant/${counters}/${city}`);
    };
  return (
    <div className="UserPanel" >
            <div className="UserPanel_Nav">
                <Link to="/createUser" className="UserPanel_NavLink" >User Sign In</Link>
                <button className="UserPanel_NavLink btn" onClick={popUp} >User LigIn</button>
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
