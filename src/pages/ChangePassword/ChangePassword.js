import React, { useContext, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./ChangePassword.css";
import authService from "../../services/auth.service";
import userService from "../../services/user.service";
import TopNavbar from "../../components/TopNavbar";
import { redirect, useNavigate } from "react-router-dom";

export default function ChangePassword() {
  const [password, setPassword] = useState("");
  const [retypedPassword, setRetypedPassword] = useState("");
  const [isChangeSuccessful, setIsChangeSuccessful] = useState(false);
  const [isResponseReceived, setIsResponseReceived] = useState(false);
  const navigate = useNavigate();
  function validateForm() {
    return (
      password.length > 0 &&
      retypedPassword.length > 0 &&
      password === retypedPassword
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const responseCode = authService.changePassword(password);
    setIsResponseReceived(true);
    if (responseCode == 200) {
      setIsChangeSuccessful(true);
    }
    navigate("/home");
  }

  useEffect(() => {
    setIsChangeSuccessful(false);
    setIsResponseReceived(false);
  }, []);

  return (
    <>
      <TopNavbar />
      <div className="Login">
        <h3 className="LoginHeader">Change password</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group size="lg" controlId="password">
            <Form.Label>Type new password</Form.Label>
            <Form.Control
              autoFocus
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="retypedPassword">
            <Form.Label>Retype new password</Form.Label>
            <Form.Control
              type="password"
              value={retypedPassword}
              onChange={(e) => setRetypedPassword(e.target.value)}
            />
          </Form.Group>

          <Button
            block="true"
            size="lg"
            type="submit"
            disabled={!validateForm()}
          >
            Submit
          </Button>
          {password !== retypedPassword && (
            <text>Field contents are not identical!</text>
          )}
        </Form>
      </div>
    </>
  );
}
