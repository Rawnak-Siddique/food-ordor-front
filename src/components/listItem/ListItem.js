import React from 'react';
import './ListItem.css';
import trash from '../image/pngtree-trash-bin-icon-png-image_1252303.jpg'
import { useDispatch } from 'react-redux'
import { removeFromBasket } from '../../store/foodSlice';

const ListItem = ({ id, img, name, price }) => {
  console.log(id);
  const dispatch = useDispatch();
  const removeFromCart = () => {
    dispatch(removeFromBasket(id));
  };
  return (
    <div className="listItem" >
      <div className="listItem_Img">
        <img src={img} alt="" />
      </div>
      <div className="listItem_Info">
        <h1>Name: {name}</h1>
        <h4>price: taka {price}</h4>
      </div>
      <div className="listItem_Remove" onClick={removeFromCart}>
        <img src={trash} alt="" />
      </div>
    </div>
  );
}

export default ListItem;
