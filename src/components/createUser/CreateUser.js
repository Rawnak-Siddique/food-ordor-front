import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateUser.css'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from "../firebase"
import apiClient from '../axios/apiClient';
import { useDispatch } from 'react-redux';
import { logInUser } from '../../store/userSlice';

const CreateUser = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    img: '',
    email: '',
    password: '',
    country: '',
    city: '',
    address: ''
  });
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState("https://szabul.edu.pk/dataUpload/863noimage.png");
  const dispatch = useDispatch();
  const handleSingleImage = (e) => {
    e.preventDefault();

    if (e.target.files[0]){
        setImage(e.target.files[0]);
    }
};

  const handleSingleUpload = () => {
    if(!image) return;

    const storageRef = ref(storage, `/user/${image.name}`);
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
          setUser({
              ...user,
              img: url
            });
          })
      });
  };
  const createUser = async (e) => {
    e.preventDefault();
    try {
      const create = await apiClient.post("/create-profile", user);
      const id = create.data
      console.log("response is",id);
      dispatch(logInUser(id));
      navigate('/findRestaurant/all/all');
    } catch (error) {
      console.log(error.messages);
    }
  };
  return (
    <div className="createUser" >
      <div className="createUser_form">
        <h1>Create User form</h1>
        <div className="createUser_formImg">
          <img src={!image ? url : image} alt="" />
          <div className="createUser_formData">
            <input type="file" onChange={handleSingleImage} />
            <button onClick={handleSingleUpload} >Add Image</button>
            <h4>Adding {progress} %</h4>
          </div>
        </div>
        <input type="text" placeholder="Enter your user name" value={user.name} onChange={e => setUser({ ...user, name: e.target.value.toLowerCase() })} />
        <input type="text" placeholder="Enter your Country" value={user.country} onChange={e => setUser({ ...user, country: e.target.value.toLowerCase() })} />
        <input type="text" placeholder="Enter your City" value={user.city} onChange={e => setUser({ ...user, city: e.target.value.toLowerCase() })} />
        <input type="text" placeholder="Enter your Address" value={user.address} onChange={e => setUser({ ...user, address: e.target.value.toLowerCase() })} />
        <input type="email" placeholder="Enter your Email" value={user.email} onChange={e => setUser({ ...user, email: e.target.value.toLowerCase() })} />
        <input type="password" placeholder="Enter your password" value={user.password} onChange={e => setUser({ ...user, password: e.target.value.toLowerCase() })} />
        <button onClick={createUser} >Create account</button>
      </div>
    </div>
  );
}

export default CreateUser;
