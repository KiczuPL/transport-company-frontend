import { useState } from "react";
import { Button, ButtonGroup, Form, Modal } from "react-bootstrap";
import orderService from "../../services/order.service";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";

export default function EditOrderModal({ data, closeModal, showModal }) {
  const [addressFrom, setAddressFrom] = useState("");
  const [addressTo, setAddressTo] = useState("");
  const [pickUpDate, setPickUpDate] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [status, setStatus] = useState("");

  function validateForm() {
    //console.log(data);
    //console.log(pickUpDate);
    const d1 = new Date(pickUpDate);
    const d2 = new Date();
    return (
      (addressFrom && addressFrom !== data.addressFrom) ||
      (addressTo && addressTo !== data.addressTo) ||
      (status && status !== data.status) ||
      (vehicleType && vehicleType !== data.vehicleType) ||
      (d1 && d1 > d2)
    );
  }
  async function handleSubmit(event) {
    event.preventDefault();
    const order = {
      id: data.id,
      company: data.company,
      addressFrom: addressFrom ? addressFrom : data.addressFrom,
      addressTo: addressTo ? addressTo : data.addressTo,
      pickUpDate: pickUpDate ? pickUpDate : data.pickUpDate,
      vehicleType: vehicleType ? vehicleType : data.vehicleType,
      creationDateTime: data.creationDateTime,
      assignedVehicle: data.assignedVehicle,
      status: status ? status : data.status,
    };
    await orderService.updateOrder(order);
    closeModal();
  }
  return (
    <Modal show={showModal} onHide={closeModal}>
      <Modal.Header>
        <h2>Edit Order</h2>
      </Modal.Header>
      <Form>
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
          <Form.Group>
            <Form.Label>Status</Form.Label>
            <Form.Group />
            <ButtonGroup aria-label="Basic example">
              {["PLACED", "IN_REALIZATION", "CANCELLED", "FINISHED"].map(
                (type) => (
                  <Button
                    variant={type === status ? "primary" : "outline-primary"}
                    active={type === status}
                    onClick={() => {
                      setStatus(type);
                    }}
                  >
                    {capitalizeFirstLetter(type)}
                  </Button>
                )
              )}
            </ButtonGroup>
          </Form.Group>
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
            onClick={handleSubmit}
          >
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
