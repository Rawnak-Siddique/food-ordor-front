import "./FindRestaurant.css"
import { useNavigate, useParams } from "react-router-dom"
import RestaurantCard from "../RestaurantCard/RestaurantCard";
import apiClient from '../axios/apiClient';
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import btn from '../image/Capture.PNG';
import { getCartLength } from "../../store/foodSlice";
import cart from '../image/cart.jpg';
import Avatar from "../avatar/Avatar";

const FindRestaurant = () => {
    const { country, city } = useParams();
    const navigate = useNavigate();
    const [result, setResult] = useState([]);
    const [getCountry, setCountry] = useState("");
    const [getCity, setCity] = useState("")
    const cartLength = useSelector(getCartLength);
    
    useEffect(() => {
        setCountry(country);
        setCity(city);

        if (getCountry === "all" && getCity === "all") {
            console.log("get all restaurant");
        } else if (getCountry === "all" && getCity !== "all") {
            console.log("get all restaurant in country");
        } else if (getCountry !== "all" && getCity === "all"){
            console.log("get all restaurant in city");
        } else {
            console.log("get specific restaurant ");
        }
        
        getAllData()
       
    }, []);
    
    async function getAllData() {
        try {
            const res = await apiClient.get("/find-all-restaurant/");
            setResult(res.data);
        } catch (error) {
            console.log(error.message);
        }
        console.log(result);
    };
    const goToCart = () => {
        navigate("/cart");
    };
    return (
        <div className="findRestaurant" >
            <div className="findRestaurant_Search">
                <Avatar/>
                <input type="text" placeholder="Enter Country" />
                <input type="text" placeholder="Enter City" />
                <img src={btn} alt="Search" />
                <div className="findRestaurant_SearchCart">
                    <div onClick={goToCart} >
                        <img className="findRestaurant_SearchCartImg" src={cart} alt="" />
                        <span className="findRestaurant_SearchCartLength" >{cartLength}</span>
                    </div>
                </div>
            </div>
            <div className="findRestaurant_Results">
                <div className="findRestaurant_ResultsCard">
                    {result?.map((res) => {
                        return(
                            <div key={res._id}>
                                <RestaurantCard id={res._id} url={res.img} title={res.title} description={res.description} country={res.country} city={res.city} address={res.address}/>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default FindRestaurant
