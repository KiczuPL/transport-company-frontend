import Order from "./Order";
import ListGroup from 'react-bootstrap/ListGroup';
import Pagination from 'react-bootstrap/Pagination'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import orderService from '../services/order.service'
import { useState, useEffect } from 'react'
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";

export default function OrderList(props) {

    const [orders, setOrders] = useState([])
    const [orderType, setOrderType] = useState(props.orderTypes[0])
    const [isLoading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(0)
    const [totalPages, setTotalPages] = useState(0)


    const fetchOrders = async () => {
        const data = await orderService.getCompanyOrdersByStatus(orderType, currentPage);
        const orders = data.orders;
        console.log(orders)
        setOrders(orders);
        setTotalPages(data.totalPages)
    }

    useEffect(() => {
        if (isLoading) {
            fetchOrders()
                .then(() => {
                    setLoading(false)
                })
        }
    }, [orderType, orders, isLoading])


    return (
        <div>
            <ButtonGroup aria-label="Basic example">
                <Button variant="primary" onClick={!isLoading ? () => { setLoading(true); setOrderType(props.orderTypes[0]); } : null}>{capitalizeFirstLetter(props.orderTypes[0])}</Button>
                <Button variant="primary" onClick={!isLoading ? () => { setLoading(true); setOrderType(props.orderTypes[1]); } : null}>{capitalizeFirstLetter(props.orderTypes[1])}</Button>
            </ButtonGroup>


            <Pagination size='sm'>
                <Pagination.First
                    onClick={() => { setCurrentPage(0); setLoading(true) }}
                    disabled={currentPage === 0}
                />

                {currentPage > 1 ?
                    <Pagination.Item
                        disabled={currentPage === 0}
                        onClick={() => { setCurrentPage(currentPage - 2); setLoading(true) }}>
                        {currentPage - 1}
                    </Pagination.Item> : null}

                {currentPage > 0 ?
                    <Pagination.Item
                        disabled={currentPage === 0}
                        onClick={() => { setCurrentPage(currentPage - 1); setLoading(true) }}>
                        {currentPage}
                    </Pagination.Item> : null}

                <Pagination.Item
                    active activeLabel=''>{currentPage + 1}
                </Pagination.Item>

                {currentPage < totalPages - 1 ?
                    <Pagination.Item onClick={() => { setCurrentPage(currentPage + 1); setLoading(true) }}>
                        {currentPage + 2}
                    </Pagination.Item> : null}

                {currentPage < totalPages - 2 ?
                    <Pagination.Item
                        onClick={() => { setCurrentPage(currentPage + 2); setLoading(true) }}>
                        {currentPage + 3}
                    </Pagination.Item> : null}

                <Pagination.Last
                    disabled={currentPage === totalPages - 1 || totalPages === 0}
                    onClick={() => { setCurrentPage(totalPages - 1); setLoading(true); }}
                />
            </Pagination>
            <ListGroup>
                {!orders.length ? <h5>Empty</h5> : null}
                {orders.map(s => (<Order data={s} />))}
            </ListGroup>
        </div>

    )
}