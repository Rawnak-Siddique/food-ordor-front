import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './CreateRestaurant.css'
import apiClient from "../axios/apiClient";
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from "../firebase"
 
const CreateRestaurant = () => {
    const navigate = useNavigate();
    const [restaurant, setRestaurant] = useState({
        title: '',
        img: '',
        country: '',
        city: '',
        address: '',
        email: '',
        password: '',
        description: ''
    });
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [url, setUrl] = useState("https://szabul.edu.pk/dataUpload/863noimage.png");

    const handleSingleImage = (e) => {
        e.preventDefault();

        if (e.target.files[0]){
            setImage(e.target.files[0]);
        }
    };

    const handleSingleUpload = () => {
        if(!image) return;

        const storageRef = ref(storage, `/restaurant/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on("state_changed", (snapshot) => {
            const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProgress(prog);
        }, (err) => {
            console.log(err.message);
        }, () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                console.log(url);
                setImage(null);
                setUrl(url);
                setRestaurant({
                    ...restaurant,
                    img: url
                });
            })
        });
    };

    const createRestaurant = async (e) => {
        e.preventDefault();

        try {
            const create = await apiClient.post("/create-restaurant", restaurant);
            const id = create.data._id
            console.log(id);
            navigate(`/myRestaurant/${id}`);
        } catch (error) {
            console.log(error.messages);
        }
    };
    return (
        <div className="createRestaurant">
            <div className="createRestaurant_Form">
                    <h1>Restaurant</h1>
                    <div className="createRestaurant_FormImage">
                        <img src={!image ? url : image} alt="" />
                        <input type="file" onChange={handleSingleImage} />
                        <button onClick={handleSingleUpload} >Add Image</button>
                        <h3>Upload {progress} %</h3>
                    </div>
                <form>
                    <input type="text" placeholder="Name of Restaurant" value={restaurant.title} onChange={e => setRestaurant({ ...restaurant, title: e.target.value.toLowerCase() })} />
                    <input type="text" placeholder="Restaurant Website" />
                    <input type="text" placeholder="Country" value={restaurant.country} onChange={e => setRestaurant({ ...restaurant, country: e.target.value.toLowerCase() })} />
                    <input type="text" placeholder="City" value={restaurant.city} onChange={e => setRestaurant({ ...restaurant, city: e.target.value.toLowerCase() })} />
                    <input type="text" placeholder="Address" value={restaurant.address} onChange={e => setRestaurant({ ...restaurant, address: e.target.value.toLowerCase() })} />
                    <input type="text" placeholder="Your email" value={restaurant.email} onChange={e => setRestaurant({ ...restaurant, email: e.target.value.toLowerCase() })} />
                    <input type="text" placeholder="Your password" value={restaurant.password} onChange={e => setRestaurant({ ...restaurant, password: e.target.value.toLowerCase() })} />
                    <input className="description" type="text" placeholder="Description about your Restaurant" value={restaurant.description} onChange={e => setRestaurant({ ...restaurant, description: e.target.value.toLowerCase() })} />
                    <button onClick={createRestaurant} >Sign In</button>
                </form>
            </div>
        </div>
    )
}

export default CreateRestaurant
