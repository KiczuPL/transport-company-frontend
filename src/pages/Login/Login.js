import React, { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
import authService from "../../services/auth.service";
import userService from "../../services/user.service";
import { UserContext } from "../../context/UserContext";

export default function Login({ setToken, setUser, setIsAdmin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const token = await authService.login(username, password);
    if (token) {
      //console.log(token);
      const loggedUser = await userService.getLoggedUserInfo();
      console.log(loggedUser);
      setUser(loggedUser);
      setIsAdmin(loggedUser.roles[0].name === "Admin");
      setToken(token);
    }
  }

  return (
    <div className="Login">
      <h2 className="LoginHeader">Transport-company</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="usernme">
          <Form.Label>Username</Form.Label>
          <Form.Control
            autoFocus
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button block="true" size="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>
      </Form>
    </div>
  );
}
