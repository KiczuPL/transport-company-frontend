import ListGroup from "react-bootstrap/ListGroup";

export default function Order(props) {
  return (
    <>
      <h5>Order id: {props.data.id}</h5>
      <p>Address from: {props.data.addressFrom}</p>
      <p>Address to: {props.data.addressTo}</p>
      <p>Pick up date: {props.data.pickUpDate}</p>
      <p>Vehicle type: {props.data.vehicleType}</p>
    </>
  );
}
