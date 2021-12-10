import "./FindRestaurant.css"
import { useParams } from "react-router-dom"
import RestaurantCard from "../RestaurantCard/RestaurantCard";
import data from "../restruants.json";

const FindRestaurant = () => {
    const param = useParams();
    console.log(param.country);
    console.log(param.city);
    return (
        <div className="findRestaurant" >
            <div className="findRestaurant_Search">
                <input type="text" placeholder="Enter Country" />
                <input type="text" placeholder="Enter City" />
                <button>Find me Restaurant</button>
            </div>
            <div className="findRestaurant_Results">
                <div className="findRestaurant_ResultsCard">
                    {data.map((rest) => {
                        return(
                            <dir key={rest.id} >
                                <RestaurantCard id={rest.id} url={rest.url} title={rest.title} description={rest.description} />
                            </dir>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default FindRestaurant
