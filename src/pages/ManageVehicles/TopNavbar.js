import React, { useContext } from "react";
import { Button, Container } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, redirect, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import authService from "../../services/auth.service";
import userService from "../../services/user.service";

export default function TopNavbar() {
  const { setToken, setUser, setIsAuthenticated, isAdmin } =
    useContext(UserContext);

  return (
    <Navbar bg="dark" variant="dark" sticky="bottom">
      <Container>
        <Navbar.Brand as={Link} to="/home">
          Navbar
        </Navbar.Brand>
        <Nav className="me-auto">
          {isAdmin ? (
            <>
              <Nav.Link as={Link} to="/home/manage/orders">
                Orders
              </Nav.Link>
              <Nav.Link as={Link} to="/home/manage/companies">
                Companies
              </Nav.Link>
              <Nav.Link as={Link} to="/home/manage/users">
                Users
              </Nav.Link>
              <Nav.Link as={Link} to="/home/manage/vehicles">
                Vehicles
              </Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link as={Link} to="/home/orders/create">
                New order
              </Nav.Link>
              <Nav.Link as={Link} to="/home/orders/active">
                Active orders
              </Nav.Link>
              <Nav.Link as={Link} to="/home/orders/closed">
                Closed orders
              </Nav.Link>
              <Nav.Link as={Link} to="/home/company">
                My company
              </Nav.Link>
            </>
          )}
          <Nav.Item>
            <Button
              onClick={() => {
                authService.logout();
                setToken("");
                setIsAuthenticated(false);
              }}
            >
              Logout
            </Button>
          </Nav.Item>
        </Nav>
      </Container>
    </Navbar>
  );
}
