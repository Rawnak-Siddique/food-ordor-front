import "./MyRestaurant.css"
import Items from '../items/Items'
import apiClient from "../axios/apiClient";
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from "../firebase";

const MyRestaurant = () => {
    const { restaurantId } = useParams();
    const [item, setItem] = useState({
        title: '',
        restaurantId: '',
        img: '',
        price: '',
        description: '',
        ingredients: ''
    });
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [url, setUrl] = useState("https://szabul.edu.pk/dataUpload/863noimage.png");
    const [data, setData] = useState([]);
    useEffect(() => {
      getData();
    }, []);
    const handleSingleImage = (e) => {
        e.preventDefault();

        if (e.target.files[0]){
            setImage(e.target.files[0]);
        }

        setItem({
            ...item,
            restaurantId: restaurantId
        });
    };
    const handleSingleUpload = () => {
        if(!image) return;

        const storageRef = ref(storage, `/items/${image.name}`);
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
                setItem({
                    ...item,
                    img: url
                });
            })
        });
    };
    const handleCreateItem = async (e) => {
        e.preventDefault();
        try {
            const create = await apiClient.post("/create-item", item);
            console.log(create.data);
            setItem({
                ...item,
                title: '',
                restaurantId: '',
                img: '',
                price: '',
                description: '',
                ingredients: ''
            });
            setUrl("");
            setProgress("");
            setImage("");
            getData();
        } catch (error) {
            console.log(error.messages);
        }
    };
    const getData = async () => {
        try {
            const result = await apiClient.get(`/get-item/${restaurantId}`);
            console.log(result.data);
            setData(result.data);
        } catch (error) {
            console.log(error.messages);
        }
    };
    return (
        <div className="myRestaurant" >
            <div className="myRestaurant_Items">
                <div className="myRestaurant_ItemsCreate">
                    <h1>restaurant items</h1>
                    <div className="myRestaurant_ItemsCreateInput">
                        <div className="myRestaurant_ItemsCreateInputPic">
                            <img src={!image ? url : image} alt="" />
                            <input type="file" onChange={handleSingleImage} />
                            <button onClick={handleSingleUpload} >Add Image</button>
                            <h3>Upload {progress} %</h3>
                        </div>
                        <div className="myRestaurant_ItemsCreateInputData">
                            <input type="text" placeholder="Name of item" value={item.title} onChange={e => setItem({ ...item, title: e.target.value.toLowerCase() })} />
                            <input type="text" placeholder="Price" value={item.price} onChange={e => setItem({ ...item, price: e.target.value.toLowerCase() })} />
                            <input type="text" placeholder="Description" value={item.description} onChange={e => setItem({ ...item, description: e.target.value.toLowerCase() })} />
                            <input type="text" placeholder="Ingredients List" value={item.ingredients} onChange={e => setItem({ ...item, ingredients: e.target.value.toLowerCase() })} />
                            <button onClick={handleCreateItem} >Create item</button>
                        </div>
                    </div>
                </div>
                <div className="myRestaurant_ItemsList">
                    {data.map((food) => {
                        return(
                            <div key={food._id} >
                                <Items id={food._id} img={food.img} name={food.title} price={food.price} description={food.description} list={food.ingredients} />
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="myRestaurant_Order">
                <h1>order</h1>

            </div>
        </div>
    )
}

export default MyRestaurant;
