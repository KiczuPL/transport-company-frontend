import Order from "./Order";
import ListGroup from "react-bootstrap/ListGroup";
import Pagination from "react-bootstrap/Pagination";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import orderService from "../services/order.service";
import { useState, useEffect, useContext } from "react";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";
import PaginationBlock from "./PaginationBlock";
import UserCompany from "../pages/Home/UserCompany";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import EditOrderModal from "../pages/EditOrder/EditOrderModal";
import { Col, Container, Form, FormGroup, Row } from "react-bootstrap";
import ConfirmModal from "./ConfirmModal";

export default function OrderList(props) {
  const [orders, setOrders] = useState([]);
  const [orderType, setOrderType] = useState(props.orderTypes[0]);
  const [companyName, setCompanyName] = useState("");
  const [addressFrom, setAddressFrom] = useState("");
  const [addressTo, setAddressTo] = useState("");
  const [pickUpDateFrom, setPickUpDateFrom] = useState("");
  const [pickUpDateTo, setPickUpDateTo] = useState("");

  const [isLoading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [openEditOrderModal, setOpenEditOrderModal] = useState(false);
  const [openDeleteOrderModal, setOpenDeleteOrderModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState({});
  const { isAdmin } = useContext(UserContext);

  const fetchOrders = async () => {
    var response;
    if (isAdmin) {
      response = await orderService.getOrders(
        companyName,
        addressFrom,
        addressTo,
        pickUpDateFrom,
        pickUpDateTo,
        orderType,
        currentPage
      );
    } else {
      response = await orderService.getCompanyOrdersByStatus(
        addressFrom,
        addressTo,
        pickUpDateFrom,
        pickUpDateTo,
        orderType,
        currentPage
      );
    }
    const data = response;
    const orders = data.orders;
    console.log(orders);
    setOrders(orders);
    setTotalPages(data.totalPages);
  };

  const handleDelete = async () => {
    await orderService.deleteOrder(selectedOrder.id);
    setOpenDeleteOrderModal(false);
    setLoading(true);
  };

  useEffect(() => {
    if (isLoading) {
      fetchOrders().then(() => {
        setLoading(false);
      });
    }
  }, [orderType, orders, isLoading]);

  return (
    <>
      <Container>
        <ListGroup>
          <ListGroup.Item>
            <Container>
              <Form onSubmit={() => setLoading(true)}>
                <Row xs={2}>
                  <Col xs={4}>
                    <FormGroup>
                      <Form.Label>Address from:</Form.Label>
                      <Form.Control
                        type="text"
                        onChange={(e) => setAddressFrom(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col xs={4}>
                    <FormGroup>
                      <Form.Label>Address from:</Form.Label>
                      <Form.Control
                        type="text"
                        onChange={(e) => setAddressTo(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row xs={2}>
                  <Col xs={4}>
                    <FormGroup>
                      <Form.Label>Pick up date from:</Form.Label>
                      <Form.Control
                        type="date"
                        onChange={(e) => setPickUpDateFrom(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col xs={4}>
                    <FormGroup>
                      <Form.Label>Pick up date to:</Form.Label>
                      <Form.Control
                        type="date"
                        onChange={(e) => setPickUpDateTo(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Form.Label>Order status:</Form.Label>
                <Row xs={2}>
                  <Col xs={8}>
                    {" "}
                    <ButtonGroup aria-label="Basic example">
                      {props.orderTypes.map((type) => (
                        <Button
                          variant={
                            orderType === type ? "primary" : "outline-primary"
                          }
                          active={orderType === type}
                          onClick={
                            !isLoading
                              ? () => {
                                  setLoading(true);
                                  setOrderType(type);
                                }
                              : null
                          }
                        >
                          {capitalizeFirstLetter(type)}
                        </Button>
                      ))}
                    </ButtonGroup>
                  </Col>
                </Row>
              </Form>
              <Row xs={2}>
                <Form.Label />
              </Row>
              {isAdmin && (
                <>
                  {" "}
                  <Row xs={2}>
                    <Col xs={4}>
                      <FormGroup>
                        <Form.Label>Company:</Form.Label>
                        <Form.Control
                          type="text"
                          onChange={(e) => setCompanyName(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row xs={2}>
                    <Form.Label />
                  </Row>
                </>
              )}
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
          {!orders.length ? <h5>Empty</h5> : null}
          {orders.map((s) => (
            <ListGroup.Item>
              <ListGroup.Item>
                <Order data={s} />
                {isAdmin && (
                  <>
                    {" "}
                    <Button
                      variant="danger"
                      onClick={() => {
                        setSelectedOrder(s);
                        setOpenDeleteOrderModal(true);
                      }}
                    >
                      Delete
                    </Button>{" "}
                    <Button
                      onClick={() => {
                        setSelectedOrder(s);
                        setOpenEditOrderModal(true);
                      }}
                    >
                      Edit
                    </Button>
                  </>
                )}
              </ListGroup.Item>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>

      <EditOrderModal
        showModal={openEditOrderModal}
        closeModal={() => {
          setOpenEditOrderModal(false);
          setLoading(true);
        }}
        data={selectedOrder ? selectedOrder : {}}
      />
      <ConfirmModal
        show={openDeleteOrderModal}
        header="Delete company"
        body={
          "Are you sure you want to delete order with id: " + selectedOrder.id
        }
        handleClose={() => setOpenDeleteOrderModal(false)}
        handleConfirm={handleDelete}
        dangerousAction={true}
      />
    </>
  );
}
