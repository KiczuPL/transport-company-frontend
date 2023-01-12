import { useState, useContext, useEffect } from "react";
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
import { UserContext } from "../../context/UserContext";
import VehicleFormModal from "./VehicleFormModal";
import vehicleService from "../../services/vehicle.service";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import ConfirmModal from "../../components/ConfirmModal";
import PaginationBlock from "../../components/PaginationBlock";
import Vehicle from "./Vehicle";

export default function VehicleList() {
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [vehicleIdentifier, setVehicleIdentifier] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [openCreateVehicleModal, setOpenCreateVehicleModal] = useState(false);
  const [openEditVehicleModal, setOpenEditVehicleModal] = useState(false);
  const [openDeleteVehicleModal, setOpenDeleteVehicleModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState({});
  const { isAdmin } = useContext(UserContext);

  const fetchVehicles = async () => {
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
      fetchVehicles().then(() => {
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
              <Button
                variant="success"
                onClick={() => {
                  setOpenCreateVehicleModal(true);
                }}
              >
                Create new
              </Button>{" "}
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
                    setOpenEditVehicleModal(true);
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
      <VehicleFormModal
        show={openEditVehicleModal}
        mode="edit"
        header="Edit vehicle"
        handleClose={() => {
          setLoading(true);
          setOpenEditVehicleModal(false);
        }}
        handleConfirm={() => {
          setLoading(true);
          setOpenEditVehicleModal(false);
        }}
        data={selectedVehicle}
      />
      <VehicleFormModal
        show={openCreateVehicleModal}
        mode="create"
        header="Create vehicle"
        handleClose={() => {
          setLoading(true);
          setOpenCreateVehicleModal(false);
        }}
        handleConfirm={() => {
          setLoading(true);
          setOpenCreateVehicleModal(false);
        }}
        data={{}}
      />
    </>
  );
}
