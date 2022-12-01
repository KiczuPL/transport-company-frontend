import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import './CreateOrder.css'
import TopNavbar from "../../components/navbar";
import orderService from "../../services/order.service";

export default function CreateOrder() {
    const [addressFrom, setAddressFrom] = useState('')
    const [addressTo, setaddressTo] = useState('')
    const [pickUpDate, setpickUpDate] = useState('')
    const [vehicleType, setvehicleType] = useState('')

    async function handleSubmit(event) {
        event.preventDefault();
        const form = {
            addressFrom: addressFrom,
            addressTo: addressTo,
            companyId: JSON.parse(localStorage.getItem('user')).company.id,
            pickUpDate: pickUpDate,
            vehicleType: vehicleType
        }
        console.log(form)
        orderService.saveOrder(form)
    }

    function validateForm() {
        console.log(pickUpDate)
        const d1 = new Date(pickUpDate)
        const d2 = new Date()
        return addressFrom.length > 0 && addressTo.length > 0 && d1 > d2;
    }

    return (
        <div>
            <TopNavbar />
            <div className="CreateOrder">
                <h2 className="CreateOrderHeader">
                    Create new order
                </h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group size="lg" controlId="addressFrom">
                        <Form.Label>From</Form.Label>
                        <Form.Control
                            autoFocus
                            value={addressFrom}
                            onChange={(e) => setAddressFrom(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId="addressTo">
                        <Form.Label>To</Form.Label>
                        <Form.Control
                            autoFocus
                            value={addressTo}
                            onChange={(e) => setaddressTo(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId="pickUpDate">
                        <Form.Label>Pick up date</Form.Label>
                        <Form.Control
                            autoFocus
                            type="date"
                            value={pickUpDate}
                            onChange={(e) => setpickUpDate(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Label>Vehicle type</Form.Label>
                    <Form.Group size="lg" controlId="vehicleType">
                        <Form.Select
                            onChange={(e) => setvehicleType(e.target.value)}>
                            <option value="DELIVERY_TRUCK">Delivery truck</option>
                            <option value="SEMI_TRUCK">Semi truck</option>
                            <option value="TANK_TRUCK">Tank truck</option>
                        </Form.Select>
                    </Form.Group>
                    <Button block="true" size="lg" type="submit" disabled={!validateForm()}>
                        Create
                    </Button>
                </Form>
            </div>
        </div>
    )
}