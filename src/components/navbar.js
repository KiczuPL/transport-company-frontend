import React from 'react'
import { Container } from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function TopNavbar() {
    return (
        <Navbar bg="dark" variant="dark" sticky="bottom">
            <Container>
                <Navbar.Brand href="/home">Navbar</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/orders/create">New order</Nav.Link>
                    <Nav.Link href="/orders/active">Active orders</Nav.Link>
                    <Nav.Link href="/orders/finished">Finished orders</Nav.Link>
                    <Nav.Link href="/home/company">My company</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}