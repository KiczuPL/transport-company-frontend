import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import vehicleService from "../../services/vehicle.service";

export default function VehicleFormModal({
  show,
  mode,
  handleClose,
  handleConfirm,
  header,
  data,
}) {
  const [vehicleIdentifier, setVehicleIdentifier] = useState("");
  const [registrationNumber, setRegistrationNUmber] = useState("");
  const [type, setType] = useState("");

  function validateForm() {
    return (
      (vehicleIdentifier && vehicleIdentifier !== data.vehicleIdentifier) ||
      (registrationNumber && registrationNumber !== data.registrationNumber) ||
      (type && type !== data.type)
    );
  }
  const handleEdit = async () => {
    const vehicle = {
      id: data.id,
      vehicleIdentifier: vehicleIdentifier
        ? vehicleIdentifier
        : data.vehicleIdentifier,
      registrationNumber: registrationNumber
        ? registrationNumber
        : data.registrationNumber,
      type: type ? type : data.type,
    };
    console.log(vehicle);
    //console.log("POPRAWIANIE", company);
    await vehicleService.updateVehicle(vehicle);
  };
  const handleCreate = async () => {
    const vehicle = {
      vehicleIdentifier: vehicleIdentifier,
      registrationNumber: registrationNumber,
      type: type,
    };
    await vehicleService.saveVehicle(vehicle);
  };
  function handleSubmit(event) {
    event.preventDefault();

    if (mode === "create") {
      handleCreate();
    } else if (mode === "edit") {
      handleEdit();
    }
    handleConfirm();
  }

  useEffect(() => {}, []);

  return (
    <Modal show={show}>
      <Modal.Header>
        <h2>{header}</h2>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group size="lg" controlId="name">
            <Form.Label>Vehicle identifier:</Form.Label>
            <Form.Control
              autoFocus
              defaultValue={data.vehicleIdentifier}
              type="text"
              onChange={(e) => setVehicleIdentifier(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="taxId">
            <Form.Label>Registration number:</Form.Label>
            <Form.Control
              autoFocus
              defaultValue={data.registrationNumber}
              type="text"
              onChange={(e) => setRegistrationNUmber(e.target.value)}
            />
          </Form.Group>
          <Form.Label>Vehicle type:</Form.Label>
          <Form.Group size="lg" controlId="vehicleType">
            <Form.Select
              onChange={(e) => setType(e.target.value)}
              defaultValue={data.type}
            >
              <option value="DELIVERY_TRUCK">Delivery truck</option>
              <option value="SEMI_TRUCK">Semi truck</option>
              <option value="TANK_TRUCK">Tank truck</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" type="submit" disabled={!validateForm()}>
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
