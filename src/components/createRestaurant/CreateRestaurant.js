import { useNavigate } from "react-router-dom";
import './CreateRestaurant.css'

const CreateRestaurant = () => {
    const navigate = useNavigate();
    const createRestaurant = (e) => {
        e.preventDefault();
        /* code to create data */
        navigate("/myRestaurant/abc");
    };
    return (
        <div className="createRestaurant">
            <div className="createRestaurant_Form">
                <form>
                    <h1>Restaurant</h1>
                    <input type="text" placeholder="Name of Restaurant" />
                    <input type="text" placeholder="Country" />
                    <input type="text" placeholder="City" />
                    <input type="text" placeholder="Address" />
                    <input type="text" placeholder="Your email" />
                    <input className="description" type="text" placeholder="Description about your Restaurant" />
                    <button onClick={createRestaurant} >Create Restaurant</button>
                </form>
            </div>
        </div>
    )
}

export default CreateRestaurant
