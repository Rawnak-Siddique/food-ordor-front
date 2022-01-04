import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import './Cart.css'
import { useSelector } from 'react-redux'
import { getCartItems, getCartTotal } from '../../store/foodSlice';
import ListItem from '../listItem/ListItem';
import apiClient from '../axios/apiClient';
import Avatar from '../avatar/Avatar';

const Cart = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const products = useSelector(getCartItems);
  const CartTotal = useSelector(getCartTotal);
  const restaurantId = id;
  const [result, setResult] = useState({});
  const userId = '';
  const country = result[0]?.country;
  const city = result[0]?.city;
  const address = result[0]?.address;
  const [area, setArea] = useState("");
  const [order, setOrder] = useState({
    restaurantId: '',
    userId: '',
    restaurantCountry: '',
    restaurantCity: '',
    restaurantAddress: '',
    userCountry: '',
    userCity: '',
    userAddress: '',
    total: 0,
    listItems: [],
  });

  useEffect(() => {
    
    async function fetchRestaurants() {
      try {
        const res = await apiClient.get(`/get-restaurant/${restaurantId}`);
        setResult(res.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    
    fetchRestaurants();
  }, [restaurantId]);

  useEffect(() => {
    setOrder({
      ...order,
      restaurantId: restaurantId,
      userId: userId,
      restaurantCountry: country,
      restaurantCity: city,
      restaurantAddress: address,
      userCountry: country,
      userCity: city,
      userAddress: area,
      total: CartTotal,
      listItems: products,
    });
  }, [area]);

  const setCart = async (e) => {
    e.preventDefault();
    try {
      const create = await apiClient.post("/create-order", order);
      const id = create.data
      console.log("response is",id);
      if (id) {
        /*navigate(`/payment/${id}`);*/
      }
    } catch (error) {
      console.log(error.messages);
    }
  };

  return (
    <div className='cart' >
      <div className="cart_Header">
        <Avatar/>
        <div className="cart_HeaderTotal">
          <h2>Your Cart has {products.length} items</h2>
          <h4>Total price: taka {CartTotal}</h4>
          <h5>Restaurant Country: {country}</h5>
          <h5>Restaurant City: {city}</h5>
          <h5>Restaurant Address: {address}</h5>
          <button onClick={setCart} >Proceed to payment</button>
        </div>
        <div className="cart_HeaderAddress">
          <input type="text" placeholder='Enter your address' onChange={(e) => (setArea(e.target.value.toLowerCase()))} />
        </div>
      </div>
      <div className="cart_Body">
        <div className="cart_BodyProducts">
          {
            products.map((product) =>{
              return (
                <div key={products.indexOf(product)} >
                  <ListItem id={products.indexOf(product)} img={product.img} name={product.name} price={product.price} />    
                </div>
              )
            })
          }
        </div>
        <div className="cart_BodyMap">
          <p>Map placeholder</p>
        </div>
      </div>
    </div>
  );
}

export default Cart;
