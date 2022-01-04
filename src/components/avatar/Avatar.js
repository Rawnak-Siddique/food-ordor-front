import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, logOutUser } from '../../store/userSlice';
import './Avatar.css'

const Avatar = () => {
    const dispatch = useDispatch();
    const logOut = () => {
        dispatch(logOutUser());
    };
    const user = useSelector(getUser);
    console.log(user);
  return (
    <div className="avatar">
      <img src="https://bestprofilepictures.com/wp-content/uploads/2021/04/Cool-Profile-Picture-986x1024.jpg" alt="" />
      <div className="avatar_data">
          <p>name: { user ? user[0]?.name : "name"}</p>
          <p>email: { user ? user[0]?.email : "email"}</p>
          <button onClick={logOut} >log out</button>
      </div>
    </div>
  );
}

export default Avatar;
