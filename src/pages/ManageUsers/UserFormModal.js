import { useEffect, useState } from "react";
import { Button, Dropdown, Form, Modal } from "react-bootstrap";
import { useAsyncError } from "react-router-dom";
import companyService from "../../services/company.service";
import userService from "../../services/user.service";

export default function UserFormModal({
  show,
  mode,
  handleClose,
  handleConfirm,
  header,
  data,
}) {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState({});
  const [searchedCompanyName, setSearchedCompanyName] = useState("");
  const [companies, setCompanies] = useState([]);
  const [isLoading, setLoading] = useState(true);
  function validateForm() {
    return (
      (username && username !== data.username) ||
      (firstName && firstName !== data.firstName) ||
      (lastName && lastName !== data.lastName) ||
      (email && email !== data.email) ||
      (searchedCompanyName && searchedCompanyName !== data.company.name)
    );
  }
  const handleEdit = async () => {
    const user = {
      id: data.id,
      username: username ? username : data.username,
      firstName: firstName ? firstName : data.firstName,
      lastName: lastName ? lastName : data.lastName,
      email: email ? email : data.email,
      companyId: company.id ? company.id : data.company.id,
    };
    await userService.updateUser(user);
  };
  const handleCreate = async () => {
    const user = {
      username: username ? username : data.username,
      email: email ? email : data.email,
      firstName: firstName ? firstName : data.firstName,
      lastName: lastName ? lastName : data.lastName,
      companyId: company.id ? company.id : data.company.id,
    };
    await userService.saveUser(user);
  };
  function handleSubmit(event) {
    event.preventDefault();

    if (mode === "create") {
      handleCreate();
    } else if (mode === "edit") {
      handleEdit();
    }
    handleConfirm();
  }

  const fetchCompanies = async () => {
    const data = await companyService.getCompanies(
      searchedCompanyName,
      "",
      "",
      0
    );
    setCompanies(data.companies);
  };
  useEffect(() => {
    if (isLoading) {
      fetchCompanies().then(() => {
        setLoading(false);
      });
    }
  }, [isLoading]);
  useEffect(() => {
    if (data.company) setSearchedCompanyName(data.company.name);
  }, [show]);

  return (
    <Modal show={show}>
      <Modal.Header>
        <h2>{header}</h2>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group size="lg" controlId="name">
            <Form.Label>Username</Form.Label>
            <Form.Control
              autoFocus
              defaultValue={data.username}
              type="text"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="firstName">
            <Form.Label>First name:</Form.Label>
            <Form.Control
              autoFocus
              defaultValue={data.firstName}
              type="text"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="lastName">
            <Form.Label>Last name:</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              defaultValue={data.lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="email">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              autoFocus
              type="email"
              defaultValue={data.email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Dropdown>
              {" "}
              <Form.Label>Company:</Form.Label>
              <Dropdown.Toggle
                as={Form.Control}
                value={
                  searchedCompanyName
                    ? searchedCompanyName
                    : data.company
                    ? data.company.name
                    : ""
                }
                onChange={(e) => {
                  setSearchedCompanyName(e.target.value);
                  setLoading(true);
                }}
              />
              <Dropdown.Menu>
                {companies.map((company) => (
                  <Dropdown.Item
                    onClick={() => {
                      setCompany(company);
                      setSearchedCompanyName(company.name);
                    }}
                  >
                    {company.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" type="submit" disabled={!validateForm()}>
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
