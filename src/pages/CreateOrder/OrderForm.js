import { Button, Form } from "react-bootstrap";

export default function OrderForm(props) {
  function validateForm() {
    console.log(props.pickUpDate);
    const d1 = new Date(props.pickUpDate);
    const d2 = new Date();
    return (
      props.addressFrom.length > 0 && props.addressTo.length > 0 && d1 > d2
    );
  }
  return (
    <Form onSubmit={props.handleSubmit}>
      <Form.Group size="lg" controlId="props.addressFrom">
        <Form.Label>From</Form.Label>
        <Form.Control
          autoFocus
          value={props.addressFrom}
          type="text"
          onChange={(e) => props.setAddressFrom(e.target.value)}
        />
      </Form.Group>
      <Form.Group size="lg" controlId="props.addressTo">
        <Form.Label>To</Form.Label>
        <Form.Control
          autoFocus
          value={props.addressTo}
          type="text"
          onChange={(e) => props.setaddressTo(e.target.value)}
        />
      </Form.Group>
      <Form.Group size="lg" controlId="props.pickUpDate">
        <Form.Label>Pick up date</Form.Label>
        <Form.Control
          autoFocus
          type="date"
          value={props.pickUpDate}
          onChange={(e) => props.setpickUpDate(e.target.value)}
        />
      </Form.Group>
      <Form.Label>Vehicle type</Form.Label>
      <Form.Group size="lg" controlId="vehicleType">
        <Form.Select onChange={(e) => props.setvehicleType(e.target.value)}>
          <option value="DELIVERY_TRUCK">Delivery truck</option>
          <option value="SEMI_TRUCK">Semi truck</option>
          <option value="TANK_TRUCK">Tank truck</option>
        </Form.Select>
      </Form.Group>
      <Button block="true" size="lg" type="submit" disabled={!validateForm()}>
        Save
      </Button>
    </Form>
  );
}
