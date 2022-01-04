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
    const [orders, setOrders] = useState([]);
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [url, setUrl] = useState("https://szabul.edu.pk/dataUpload/863noimage.png");
    const [data, setData] = useState([]);
    useEffect(() => {
      getData();
      getOrderedData();
    }, [restaurantId]);
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
            
            setData(result.data);
        } catch (error) {
            console.log(error.messages);
        }
    };
    const getOrderedData = async () => {
        try {
            const res = await apiClient.get(`/get-restaurant-order/${restaurantId}`);
            console.log(res.data);
            setOrders(res.data);
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
                    {data?.map((food) => {
                        return(
                            <div className="myRestaurant_ItemsListItem" key={food._id}>
                                <div className="myRestaurant_ItemsListItemTop">
                                    <div className="myRestaurant_ItemsListItemTopImg">
                                        <img src={food.img ? food.img :"https://p.kindpng.com/picc/s/79-798754_hoteles-y-centros-vacacionales-dish-placeholder-hd-png.png"} alt="" />
                                    </div>
                                    <div className="myRestaurant_ItemsListItemTopDate">
                                        <h4>Item id: {food._id}</h4>
                                        <h4>Item Name: {food.title}</h4>
                                        <h4>Item Price: {food.price} Taka</h4>
                                        <h4>Item description: {food.description}</h4>
                                        <h4>Item ingredients list:  {food.ingredients}</h4>
                                    </div>
                                </div>
                            </div> 
                        )
                    })}
                </div>
            </div>
            <div className="myRestaurant_Order">
                <h1>Order list</h1>
                {orders?.map((order) => {
                    return(
                        <div className="myRestaurant_OrderItem" key={order._id}>
                            <h4>Order Number: {order._id}</h4>
                            <h4>User address: {order.userAddress}</h4>
                            <h4>User city: {order.userCity}</h4>
                            <h4>User Total: {order.total} taka</h4>
                            {order?.listItems.map((item) => {
                                return(
                                    <div className="myRestaurant_OrderItemList" key={item._id}>
                                        <div className="myRestaurant_OrderItemListImg">
                                            <img src={item.img? item.img :"https://p.kindpng.com/picc/s/79-798754_hoteles-y-centros-vacacionales-dish-placeholder-hd-png.png"} alt="" />
                                        </div>
                                        <div className="myRestaurant_OrderItemListText">
                                            <h4>Item Id: {item.id}</h4>
                                            <h4>Item Name: {item.name}</h4>
                                            <h4>Item Price: {item.price} taka</h4>
                                        </div>
                                    </div>  
                                )
                            })}
                        </div>  
                    )
                })}
            </div>
        </div>
    )
}

export default MyRestaurant;
