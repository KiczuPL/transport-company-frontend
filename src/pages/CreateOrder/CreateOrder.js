import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import "./CreateOrder.css";
import TopNavbar from "../ManageVehicles/TopNavbar";
import orderService from "../../services/order.service";
import OrderForm from "./OrderForm";
import { useNavigate } from "react-router-dom";

export default function CreateOrder() {
  const [addressFrom, setAddressFrom] = useState("");
  const [addressTo, setaddressTo] = useState("");
  const [pickUpDate, setpickUpDate] = useState("");
  const [vehicleType, setvehicleType] = useState("DELIVERY_TRUCK");
  const navigate = useNavigate();
  async function handleSubmit(event) {
    event.preventDefault();
    const form = {
      addressFrom: addressFrom,
      addressTo: addressTo,
      companyId: JSON.parse(localStorage.getItem("user")).company.id,
      pickUpDate: pickUpDate,
      vehicleType: vehicleType,
    };
    //console.log(form);
    orderService.saveOrder(form);
    navigate(-1);
  }

  return (
    <div>
      <TopNavbar />
      <div className="CreateOrder">
        <h2 className="CreateOrderHeader">Create new order</h2>
        <OrderForm
          addressFrom={addressFrom}
          addressTo={addressTo}
          pickUpDate={pickUpDate}
          vehicleType={vehicleType}
          setAddressFrom={setAddressFrom}
          setaddressTo={setaddressTo}
          setpickUpDate={setpickUpDate}
          setvehicleType={setvehicleType}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
