import { useState, useEffect } from 'react'
import Login from './pages/Login/Login'
import Home from './pages/Home/Home'
import './css/bootstrap.min.css'
import './css/bootstrap.min.css.map'
import { Routes, Route } from "react-router-dom";
import ActiveOrders from './pages/ActiveOrders/ActiveOrders';
import UserCompany from './pages/Home/UserCompany';
import CreateOrder from './pages/CreateOrder/CreateOrder'
import ClosedOrders from './pages/ClosedOrders/ClosedOrders'


export default function App() {

  const [token, setToken] = useState(localStorage.getItem('accessToken'))
  console.log(token)
  if (!token) {
    return (<Login setToken={setToken} />)
  }

  return (
    <div className="wrapper">
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/company" element={<UserCompany />} />
        <Route path="/orders/active" element={<ActiveOrders />} />
        <Route path="/orders/create" element={<CreateOrder />} />
        <Route path="/orders/closed" element={<ClosedOrders />} />
      </Routes>
    </div>
  );
}
