import Order from "./Order";
import ListGroup from "react-bootstrap/ListGroup";
import Pagination from "react-bootstrap/Pagination";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import orderService from "../services/order.service";
import { useState, useEffect } from "react";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";

export default function OrderList(props) {
  const [orders, setOrders] = useState([]);
  const [orderType, setOrderType] = useState(props.orderTypes[0]);
  const [isLoading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchOrders = async () => {
    const data = await orderService.getCompanyOrdersByStatus(
      orderType,
      currentPage
    );
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

      <Pagination size="sm">
        <Pagination.First
          onClick={() => {
            setCurrentPage(0);
            setLoading(true);
          }}
          disabled={currentPage === 0}
        />

        {currentPage - 3 > 0 ? (
          <Pagination.Item
            onClick={() => {
              setCurrentPage(currentPage - 4);
              setLoading(true);
            }}
          >
            {currentPage - 3}
          </Pagination.Item>
        ) : null}
        {currentPage - 2 > 0 ? (
          <Pagination.Item
            onClick={() => {
              setCurrentPage(currentPage - 3);
              setLoading(true);
            }}
          >
            {currentPage - 2}
          </Pagination.Item>
        ) : null}

        {currentPage - 1 > 0 ? (
          <Pagination.Item
            onClick={() => {
              setCurrentPage(currentPage - 2);
              setLoading(true);
            }}
          >
            {currentPage - 1}
          </Pagination.Item>
        ) : null}

        {currentPage > 0 ? (
          <Pagination.Item
            onClick={() => {
              setCurrentPage(currentPage - 1);
              setLoading(true);
            }}
          >
            {currentPage}
          </Pagination.Item>
        ) : null}

        <Pagination.Item active activeLabel="">
          {currentPage + 1}
        </Pagination.Item>

        {currentPage < totalPages - 1 ? (
          <Pagination.Item
            onClick={() => {
              setCurrentPage(currentPage + 1);
              setLoading(true);
            }}
          >
            {currentPage + 2}
          </Pagination.Item>
        ) : null}

        {currentPage < totalPages - 2 ? (
          <Pagination.Item
            onClick={() => {
              setCurrentPage(currentPage + 2);
              setLoading(true);
            }}
          >
            {currentPage + 3}
          </Pagination.Item>
        ) : null}

        {currentPage < totalPages - 3 ? (
          <Pagination.Item
            onClick={() => {
              setCurrentPage(currentPage + 3);
              setLoading(true);
            }}
          >
            {currentPage + 4}
          </Pagination.Item>
        ) : null}

        {currentPage < totalPages - 4 ? (
          <Pagination.Item
            onClick={() => {
              setCurrentPage(currentPage + 4);
              setLoading(true);
            }}
          >
            {currentPage + 5}
          </Pagination.Item>
        ) : null}

        <Pagination.Last
          disabled={currentPage === totalPages - 1 || totalPages === 0}
          onClick={() => {
            setCurrentPage(totalPages - 1);
            setLoading(true);
          }}
        />
      </Pagination>
      <ListGroup>
        {!orders.length ? <h5>Empty</h5> : null}
        {orders.map((s) => (
          <Order data={s} />
        ))}
      </ListGroup>
    </>
  );
}
