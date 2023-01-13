import React, { useContext } from "react";
import { Container, ListGroup } from "react-bootstrap";
import TopNavbar from "../../components/TopNavbar";
import { UserContext } from "../../context/UserContext";

export default function Home() {
  const { user } = useContext(UserContext);
  return (
    <>
      <TopNavbar />
      <Container>
        <h1>Hello {user.firstName}!</h1>
      </Container>
    </>
  );
}
