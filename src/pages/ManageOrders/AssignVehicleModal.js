import { type } from "@testing-library/user-event/dist/type";
import { useEffect, useState } from "react";
import { Button, Dropdown, Form, Modal } from "react-bootstrap";
import orderService from "../../services/order.service";
import vehicleService from "../../services/vehicle.service";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";

export default function AssignVehicleModal({ data, show, handleClose }) {
  const [searchedVehicleIdentifier, setSearchedVehicleIdentifier] =
    useState("");
  const [selectedVehicle, setSelectedVehicle] = useState({});
  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setLoading] = useState(true);

  async function sendAssignRequest(event) {
    event.preventDefault();
    await orderService.assignVehicle(data.id, selectedVehicle.id);
    handleClose();
  }

  const fetchVehicles = async () => {
    const results = await vehicleService.getVehicles(
      "",
      searchedVehicleIdentifier,
      data.vehicleType,
      0
    );

    setVehicles(results.vehicles);
  };

  useEffect(() => {
    if (isLoading) {
      fetchVehicles().then(() => {
        setLoading(false);
      });
    }
  }, [isLoading, selectedVehicle]);

  useEffect(() => {
    if (data.assignedVehicle) {
      setSelectedVehicle(data.assignVehicle);
      setSearchedVehicleIdentifier(data.assignedVehicle.vehicleIdentifier);
    } else {
      setSearchedVehicleIdentifier("");
      setLoading(true);
    }
  }, [show]);

  return (
    <Modal show={show}>
      <Modal.Header>
        <h2>Assign vehicle to order</h2>
      </Modal.Header>
      <Modal.Body>
        <Form
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          {" "}
          <Form.Group>
            <Dropdown>
              {" "}
              <Form.Label>Vehicle identifier:</Form.Label>
              <Dropdown.Toggle
                as={Form.Control}
                value={
                  searchedVehicleIdentifier
                    ? searchedVehicleIdentifier
                    : data.searchedVehicleIdentifier
                    ? data.searchedVehicleIdentifier.vehicleIdentifier
                    : ""
                }
                onChange={(e) => {
                  setSearchedVehicleIdentifier(e.target.value);
                  setLoading(true);
                }}
              />
              <Dropdown.Menu>
                {vehicles.map((vehicle) => (
                  <Dropdown.Item
                    onClick={() => {
                      setSelectedVehicle(vehicle);
                      setSearchedVehicleIdentifier(vehicle.vehicleIdentifier);
                    }}
                  >
                    {`${vehicle.vehicleIdentifier} - ${
                      vehicle.registrationNumber
                    } - ${capitalizeFirstLetter(vehicle.type)}`}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="success" onClick={sendAssignRequest}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
