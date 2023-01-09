import { useContext, useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Form,
  FormGroup,
  ListGroup,
  Row,
} from "react-bootstrap";
import { UserContext } from "../context/UserContext";
import vehicleService from "../services/vehicle.service";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";
import ConfirmModal from "./ConfirmModal";
import PaginationBlock from "./PaginationBlock";
import Vehicle from "./Vehicle";

export default function VehicleList() {
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [vehicleIdentifier, setVehicleIdentifier] = useState("");
  const [vehicleType, setVehicleType] = useState("SEMI_TRUCK");

  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [openEditVehicleModal, setOpenEditVehicleModal] = useState(false);
  const [openDeleteVehicleModal, setOpenDeleteVehicleModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState({});
  const { isAdmin } = useContext(UserContext);

  const fetchOrders = async () => {
    const data = await vehicleService.getVehicles(
      registrationNumber,
      vehicleIdentifier,
      vehicleType,
      currentPage
    );
    const vehicles = data.vehicles;
    console.log(vehicles);
    setVehicles(vehicles);
    setTotalPages(data.totalPages);
  };

  const handleDelete = async () => {
    await vehicleService.deleteVehicle(selectedVehicle.id);
    setOpenDeleteVehicleModal(false);
    setLoading(true);
  };

  useEffect(() => {
    if (isLoading) {
      fetchOrders().then(() => {
        setLoading(false);
      });
    }
  }, [vehicleType, vehicles, isLoading]);

  return (
    <>
      {" "}
      <Container>
        <ListGroup>
          <ListGroup.Item>
            <Container>
              {" "}
              <Form onSubmit={() => setLoading(true)}>
                {" "}
                <Row xs={2}>
                  <Col xs={4}>
                    <FormGroup>
                      <Form.Label>Registration number:</Form.Label>
                      <Form.Control
                        type="text"
                        onChange={(e) => setRegistrationNumber(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col xs={4}>
                    <FormGroup>
                      <Form.Label>Vehicle identifier:</Form.Label>
                      <Form.Control
                        type="text"
                        onChange={(e) => setVehicleIdentifier(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Form.Label>Order status:</Form.Label>
                <Row xs={2}>
                  <Col xs={8}>
                    {" "}
                    <ButtonGroup aria-label="Basic example">
                      {["SEMI_TRUCK", "DELIVERY_TRUCK", "TANK_TRUCK"].map(
                        (type) => (
                          <Button
                            variant={
                              type === vehicleType
                                ? "primary"
                                : "outline-primary"
                            }
                            active={type === vehicleType}
                            onClick={
                              !isLoading
                                ? () => {
                                    setLoading(true);
                                    setVehicleType(type);
                                  }
                                : null
                            }
                          >
                            {capitalizeFirstLetter(type)}
                          </Button>
                        )
                      )}
                    </ButtonGroup>
                  </Col>
                </Row>
              </Form>
              <Row xs={2}>
                <Form.Label />
              </Row>
              <Row xs={2}>
                <Col xs={1}>
                  <Button onClick={() => setLoading(true)}>Filter</Button>
                </Col>
              </Row>
              <Row xs={2}>
                <Form.Label />
              </Row>
              <Row xs={2}>
                <Col xs={4}>
                  <PaginationBlock
                    setLoading={setLoading}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                    totalPages={totalPages}
                  />
                </Col>
              </Row>
            </Container>
          </ListGroup.Item>
        </ListGroup>
        <ListGroup>
          {" "}
          {!vehicles.length ? <h5>Empty</h5> : null}
          {vehicles.map((s) => (
            <ListGroup.Item>
              <ListGroup.Item>
                <Vehicle data={s} />
                <Button
                  variant="danger"
                  onClick={() => {
                    setSelectedVehicle(s);
                    setOpenDeleteVehicleModal(true);
                  }}
                >
                  Delete
                </Button>{" "}
                <Button
                  onClick={() => {
                    setSelectedVehicle(s);
                    //setOpenEditOrderModal(true);
                  }}
                >
                  Edit
                </Button>
              </ListGroup.Item>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
      <ConfirmModal
        show={openDeleteVehicleModal}
        header="Delete vehicle"
        body={
          "Are you sure you want to delete vehicle: " +
          selectedVehicle.vehicleIdentifier
        }
        handleClose={() => setOpenDeleteVehicleModal(false)}
        handleConfirm={handleDelete}
        dangerousAction={true}
      />
    </>
  );
}
