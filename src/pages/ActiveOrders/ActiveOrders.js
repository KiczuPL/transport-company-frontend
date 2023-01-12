import React from "react";

import TopNavbar from "../ManageVehicles/TopNavbar";
import OrderList from "../../components/OrderList";

export default function ActiveOrders(props) {
  return (
    <>
      <TopNavbar />
      <OrderList
        orderTypes={["PLACED", "IN_REALIZATION"]}
        label="Active orders"
      />
    </>
  );
}
