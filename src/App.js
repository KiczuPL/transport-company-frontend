import { useState, useEffect } from "react";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import "./css/bootstrap.min.css";
import "./css/bootstrap.min.css.map";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import ActiveOrders from "./pages/ActiveOrders/ActiveOrders";
import UserCompany from "./pages/Home/UserCompany";
import CreateOrder from "./pages/CreateOrder/CreateOrder";
import ClosedOrders from "./pages/ClosedOrders/ClosedOrders";
import { UserContext } from "./context/UserContext";
import ManageOrders from "./pages/ManageOrders/ManageOrders";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("accessToken"));
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [isAdmin, setIsAdmin] = useState(false);

  if (!token) {
    return (
      <Login setToken={setToken} setUser={setUser} setIsAdmin={setIsAdmin} />
    );
  }

  return (
    <UserContext.Provider
      value={{ token, setToken, user, setUser, isAdmin, setIsAdmin }}
    >
      <Routes>
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route
          exact
          path="/login"
          element={token ? <Navigate replace to="/home" /> : <Login />}
        />
        <Route path="/home" element={<Home />} />
        <Route exact path="/home/company" element={<UserCompany />} />
        <Route exact path="/home/orders/active" element={<ActiveOrders />} />
        <Route exact path="/home/orders/create" element={<CreateOrder />} />
        <Route exact path="/home/orders/closed" element={<ClosedOrders />} />
        <Route exact path="/home/orders/manage" element={<ManageOrders />} />
      </Routes>
    </UserContext.Provider>
  );
}
