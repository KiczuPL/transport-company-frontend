import OrderList from "../../components/OrderList";
import TopNavbar from "../../components/TopNavbar";

export default function ManageOrders() {
  return (
    <>
      <TopNavbar />
      <OrderList
        orderTypes={["PLACED", "IN_REALIZATION", "FINISHED", "CANCELLED"]}
        label="Orders"
      />
    </>
  );
}
