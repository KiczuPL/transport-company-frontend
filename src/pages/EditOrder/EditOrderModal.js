import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";

export default function EditOrderModal({ data, closeModal, showModal }) {
  const [addressFrom, setAddressFrom] = useState(data.addressFrom);
  const [addressTo, setAddressTo] = useState(data.addressTo);
  const [pickUpDate, setPickUpDate] = useState(data.pickUpDate);
  const [vehicleType, setVehicleType] = useState(data.vehicleType);
  const [status, setStatus] = useState(data.status);

  function validateForm() {
    console.log(data);
    console.log(pickUpDate);
    const d1 = new Date(pickUpDate);
    const d2 = new Date();
    return (
      addressFrom != null &&
      addressTo != null &&
      addressFrom.length > 0 &&
      addressTo.length > 0 &&
      d1 > d2
    );
  }
  function handleSubmit(event) {
    event.preventDefault();
    //TODO: obsługa update'u, trzeba dodać zabezpieczenie w API
  }
  return (
    <Modal show={showModal} onHide={closeModal}>
      <Modal.Header>
        <h2>Edit Order</h2>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group size="lg" controlId=" addressFrom">
            <Form.Label>From</Form.Label>
            <Form.Control
              autoFocus
              defaultValue={data.addressFrom}
              type="text"
              onChange={(e) => setAddressFrom(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId=" addressTo">
            <Form.Label>To</Form.Label>
            <Form.Control
              autoFocus
              defaultValue={data.addressTo}
              type="text"
              onChange={(e) => setAddressTo(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId=" pickUpDate">
            <Form.Label>Pick up date</Form.Label>
            <Form.Control
              autoFocus
              type="date"
              defaultValue={data.pickUpDate}
              onChange={(e) => setPickUpDate(e.target.value)}
            />
          </Form.Group>
          <Form.Label>Vehicle type</Form.Label>
          <Form.Group size="lg" controlId="vehicleType">
            <Form.Select onChange={(e) => setVehicleType(e.target.value)}>
              <option value="DELIVERY_TRUCK">Delivery truck</option>
              <option value="SEMI_TRUCK">Semi truck</option>
              <option value="TANK_TRUCK">Tank truck</option>
            </Form.Select>
          </Form.Group>
          {["PLACED", "IN_REALIZATION", "CANCELLED", "FINISHED"].map(
            (statusName) => (
              <Button
                variant={statusName === status ? "primary" : "outline-primary"}
                active={statusName === data.status}
                onClick={() => setStatus(statusName)}
              >
                {capitalizeFirstLetter(statusName)}
              </Button>
            )
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button block="true" variant="danger" size="lg" onClick={closeModal}>
            Cancel
          </Button>
          <Button
            block="true"
            size="lg"
            type="submit"
            variant="success"
            disabled={!validateForm()}
          >
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
