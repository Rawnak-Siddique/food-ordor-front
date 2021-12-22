import "./FindRestaurant.css"
import { useParams } from "react-router-dom"
import RestaurantCard from "../RestaurantCard/RestaurantCard";
import apiClient from '../axios/apiClient';
import { useEffect, useState } from "react";
import btn from '../image/Capture.PNG';

const FindRestaurant = () => {
    const { country, city } = useParams();
    const [result, setResult] = useState([]);
    const [getCountry, setCountry] = useState("");
    const [getCity, setCity] = useState("")
    
    
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
        /*(async () => {
        try {
            const res = await apiClient.get("/find-all-restaurant/");
            setResult(res.data);
        } catch (error) {
            console.log(error.message);
        }
        })()*/
       
    }, []);
    
    async function getAllData() {
        
        try {
            const res = await apiClient.get("/find-all-restaurant/");
            setResult(res.data);
        } catch (error) {
            console.log(error.message);
        }
       
    };
    console.log(getCountry);
    console.log(getCity);
    console.log(result);
    return (
        <div className="findRestaurant" >
            <div className="findRestaurant_Search">
                <input type="text" placeholder="Enter Country" />
                <input type="text" placeholder="Enter City" />
                <img src={btn} alt="Search" />
            </div>
            <div className="findRestaurant_Results">
                <div className="findRestaurant_ResultsCard">
                    {/*{data?.map((rest) => {
                        return(
                            <div key={rest.id} >
                                <RestaurantCard id={rest.id} url={rest.url} title={rest.title} description={rest.description} />
                            </div>
                        )
                    })}*/}
                    {result?.map((res) => {
                        return(
                            <div key={res._id}>
                                <RestaurantCard id={res._id} url={res.img} title={res.title} description={res.description}/>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default FindRestaurant
