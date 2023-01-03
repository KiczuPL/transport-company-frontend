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
import { Container } from "react-bootstrap";
import ConfirmModal from "./ConfirmModal";

export default function OrderList(props) {
  const [orders, setOrders] = useState([]);
  const [orderType, setOrderType] = useState(props.orderTypes[0]);
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
        null,
        null,
        null,
        null,
        null,
        null,
        orderType,
        currentPage
      );
    } else {
      response = await orderService.getCompanyOrdersByStatus(
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
            <ButtonGroup aria-label="Basic example">
              {props.orderTypes.map((type) => (
                <Button
                  variant={orderType === type ? "primary" : "outline-primary"}
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

            <PaginationBlock
              setLoading={setLoading}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              totalPages={totalPages}
            />
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
        closeModal={() => setOpenEditOrderModal(false)}
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
