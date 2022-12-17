import React from "react";
import TopNavbar from "../../components/navbar";
import OrderList from "../../components/OrderList";

export default function ClosedOrders() {
  return (
    <div>
      <TopNavbar />
      <OrderList orderTypes={["FINISHED", "CANCELLED"]} label="Closed orders" />
    </div>
  );
}
