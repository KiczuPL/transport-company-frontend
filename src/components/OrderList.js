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

export default function OrderList(props) {
  const [orders, setOrders] = useState([]);
  const [orderType, setOrderType] = useState(props.orderTypes[0]);
  const [isLoading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [openEditOrderModal, setOpenEditOrderModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState();
  const { isAdmin } = useContext(UserContext);
  const navigate = useNavigate();

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

  useEffect(() => {
    if (isLoading) {
      fetchOrders().then(() => {
        setLoading(false);
      });
    }
  }, [orderType, orders, isLoading]);

  return (
    <>
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
      <ListGroup>
        {!orders.length ? <h5>Empty</h5> : null}
        {orders.map((s) => (
          <ListGroup.Item>
            <Order data={s} />
            {isAdmin && (
              <Button
                onClick={() => {
                  setSelectedOrder(s);
                  setOpenEditOrderModal(true);
                }}
              >
                Edit
              </Button>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <EditOrderModal
        showModal={openEditOrderModal}
        closeModal={() => setOpenEditOrderModal(false)}
        data={selectedOrder ? selectedOrder : {}}
      />
    </>
  );
}
