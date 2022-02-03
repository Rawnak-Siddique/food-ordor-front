import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import AdminPanel from './components/adminPanel/AdminPanel';
import Cart from './components/cartPanel/Cart';
import CreateRestaurant from './components/createRestaurant/CreateRestaurant';
import CreateUser from './components/createUser/CreateUser';
import Delivery from './components/delivery/Delivery';
import FindRestaurant from './components/findRestaurant/FindRestaurant';
import Home from './components/home/Home';
import Map from './components/map/Map';
import MyRestaurant from './components/myRestaurant/MyRestaurant';
import Payment from './components/paymentPanel/Payment';
import Store from './components/store/Store';
import UserPanel from './components/userPanel/UserPanel';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/user" element={<UserPanel />} />
          <Route path="/createRestaurant" element={<CreateRestaurant />} />
          <Route path="/myRestaurant/:restaurantId" element={<MyRestaurant />} />
          <Route path="/findRestaurant/:country/:city" element={<FindRestaurant />} />
          <Route path="/store/:name/:id" element={<Store />} />
          <Route path="/cart/:id" element={<Cart />} />
          <Route path="/payment/:id" element={<Payment />} />
          <Route path="/createUser" element={<CreateUser />} />
          <Route path="/map" element={<Map />} />
          <Route path="/delivery" element={<Delivery />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
