import ListGroup from "react-bootstrap/ListGroup";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";

export default function Order(props) {
  return (
    <>
      <h5>Order id: {props.data.id}</h5>
      <p>Company: {props.data.company.name}</p>
      <p>Address from: {props.data.addressFrom}</p>
      <p>Address to: {props.data.addressTo}</p>
      <p>Pick up date: {props.data.pickUpDate}</p>
      <p>Vehicle type: {props.data.vehicleType}</p>
      <p>Status: {capitalizeFirstLetter(props.data.status)}</p>
    </>
  );
}
