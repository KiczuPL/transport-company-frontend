import ListGroup from "react-bootstrap/ListGroup";

export default function Company({ data }) {
  return (
    <>
      <h5>{data.name}</h5>
      <p>Id: {data.id}</p>
      <p>Address: {data.address}</p>
      <p>Tax id {data.taxIdNumber}</p>
    </>
  );
}
