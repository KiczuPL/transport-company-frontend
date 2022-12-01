import React from 'react'
import { useState, useEffect } from 'react'
import TopNavbar from '../../components/navbar'
import OrderList from './OrderList'
import orderService from '../../services/order.service'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup';

export default function ClosedOrders() {
    const [orders, setOrders] = useState([])
    const [orderType, setOrderType] = useState('PLACED')
    const [isLoading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(0)
    const [totalPages, setTotalPages] = useState(0)



    return (
        <div>
            <TopNavbar />
            <ButtonGroup aria-label="Basic example">
                <Button variant="primary" onClick={!isLoading ? () => { console.log("PLACED clicked"); setLoading(true); setOrderType('PLACED'); } : null}>Placed</Button>
                <Button variant="primary" onClick={!isLoading ? () => { console.log("IN_REALIZATION clicked"); setLoading(true); setOrderType('IN_REALIZATION'); } : null}>In realization</Button>
            </ButtonGroup>
            <h1>Active orders</h1>
            <OrderList orders={orders} currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} setLoading={setLoading} />
        </div>
    )
}