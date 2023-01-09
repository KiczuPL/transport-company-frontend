import { useState, useEffect } from "react";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import "./css/bootstrap.min.css";
import "./css/bootstrap.min.css.map";
import { Routes, Route, Navigate } from "react-router-dom";
import ActiveOrders from "./pages/ActiveOrders/ActiveOrders";
import UserCompany from "./pages/Home/UserCompany";
import CreateOrder from "./pages/CreateOrder/CreateOrder";
import ClosedOrders from "./pages/ClosedOrders/ClosedOrders";
import { UserContext } from "./context/UserContext";
import ManageOrders from "./pages/ManageOrders/ManageOrders";
import ManageCompanies from "./pages/ManageCompanies/ManageCompanies";
import ManageUsers from "./pages/ManageUsers/ManageUsers";
import userService from "./services/user.service";

import axios from "axios";
import authHeader from "./services/auth-header";
import ManageVehicles from "./pages/ManageVehicles/ManageVehicles";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("accessToken"));
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const API_URL = "http://localhost:8080/api/";
    if (token) {
      console.log("wysyłam");
      axios
        .get(API_URL + "user/me", { headers: authHeader() })
        .then((response) => {
          console.log("jest odp");
          if (response.data) {
            console.log("WCZYTYWANIE");
            setIsAuthenticated(true);
            localStorage.setItem("user", JSON.stringify(response.data));
            setUser(response.data);
            setIsAdmin(response.data.roles[0].name === "Admin");
          }
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status) {
              console.log("STARY TOKEN");
              setToken("");
              setIsAuthenticated(false);
            }
          }
        });
    }
  }, []);

  if (!isAuthenticated) {
    console.log("nie ma autentykacji");
    if (token) return <>DUPA</>;
    console.log("NI MA TOKENA");
    return (
      <Login
        setToken={setToken}
        setUser={setUser}
        setIsAdmin={setIsAdmin}
        setIsAuthenticated={setIsAuthenticated}
      />
    );
  }

  return (
    <UserContext.Provider
      value={{
        token,
        setToken,
        user,
        setUser,
        isAdmin,
        setIsAdmin,
        setIsAuthenticated,
      }}
    >
      <Routes>
        <Route exact path="/" element={<Navigate replace to="/home" />} />
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
        <Route exact path="/home/manage/orders" element={<ManageOrders />} />
        <Route exact path="/home/manage/users" element={<ManageUsers />} />
        <Route
          exact
          path="/home/manage/vehicles"
          element={<ManageVehicles />}
        />
        <Route
          exact
          path="/home/manage/companies"
          element={<ManageCompanies />}
        />
      </Routes>
    </UserContext.Provider>
  );
}
