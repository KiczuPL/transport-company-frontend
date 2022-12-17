import React from "react";
import { Route, Routes } from "react-router-dom";
import TopNavbar from "../../components/navbar";
import ActiveOrders from "../ActiveOrders/ActiveOrders";
import CreateOrder from "../CreateOrder/CreateOrder";
import UserCompany from "./UserCompany";

export default function Home() {
  return (
    <div>
      <TopNavbar />
    </div>
  );
}
