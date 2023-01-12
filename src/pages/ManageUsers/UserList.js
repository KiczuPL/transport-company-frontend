import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import ConfirmModal from "../../components/ConfirmModal";
import PaginationBlock from "../../components/PaginationBlock";
import userService from "../../services/user.service";
import User from "./User";
import UserFormModal from "./UserFormModal";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState({});
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);

  const fetchUsers = async () => {
    /*console.log({
      username,
      firstName,
      lastName,
      email,
      companyName,
      currentPage,
    });*/
    const data = await userService.getUsers(
      username,
      firstName,
      lastName,
      email,
      companyName,
      currentPage
    );
    setTotalPages(data.totalPages);
    setUsers(data.users);
  };

  const handleDelete = async () => {
    await userService.deleteUser(selectedUser.id);
    setShowDeleteUserModal(false);
    setLoading(true);
  };

  useEffect(() => {
    if (isLoading) {
      fetchUsers().then(() => {
        setLoading(false);
      });
    }
  }, [isLoading]);
  return (
    <>
      <Container>
        <ListGroup>
          <ListGroup.Item>
            <Container>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  setLoading(true);
                }}
              >
                <Row xs={2}>
                  <Col xs={4}>
                    <FormGroup>
                      <Form.Label>Username:</Form.Label>
                      <Form.Control
                        type="text"
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col xs={4}>
                    <FormGroup>
                      <Form.Label>Email:</Form.Label>
                      <Form.Control
                        type="text"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row xs={2}>
                  <Col xs={4}>
                    <FormGroup>
                      <Form.Label>First name:</Form.Label>
                      <Form.Control
                        type="text"
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col xs={4}>
                    <FormGroup>
                      <Form.Label>Last name:</Form.Label>
                      <Form.Control
                        type="text"
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row xs={2}></Row>
                <Row xs={2}>
                  <Col xs={4}>
                    {" "}
                    <FormGroup>
                      <Form.Label>Company name:</Form.Label>
                      <Form.Control
                        type="text"
                        onChange={(e) => setCompanyName(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                </Row>{" "}
                <Row xs={2}>
                  <Form.Label />
                </Row>
                <Row xs={2}>
                  <Col ys={1}>
                    {" "}
                    <Button type="submit">Filter</Button>{" "}
                  </Col>
                </Row>
              </Form>{" "}
              <Row xs={2}>
                <Form.Label />
              </Row>
              <PaginationBlock
                setLoading={setLoading}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                totalPages={totalPages}
              />{" "}
              <Button
                variant="success"
                onClick={() => {
                  setShowCreateUserModal(true);
                }}
              >
                Create new
              </Button>
            </Container>
          </ListGroup.Item>
        </ListGroup>
        <ListGroup>
          {!users.length ? <h5>Empty</h5> : null}
          {users.map((user) => (
            <>
              <ListGroup.Item>
                <ListGroup.Item>
                  <User data={user} />
                  <Button
                    variant="danger"
                    onClick={() => {
                      setSelectedUser(user);
                      setShowDeleteUserModal(true);
                    }}
                  >
                    Delete
                  </Button>{" "}
                  <Button
                    variant="primary"
                    onClick={() => {
                      setSelectedUser(user);
                      setShowEditUserModal(true);
                    }}
                  >
                    Edit
                  </Button>
                </ListGroup.Item>
              </ListGroup.Item>
            </>
          ))}
        </ListGroup>
      </Container>
      <ConfirmModal
        dangerousAction={true}
        show={showDeleteUserModal}
        handleClose={() => setShowDeleteUserModal(false)}
        handleConfirm={handleDelete}
        header="Delete user"
        body={"Are you sure you want to delete user " + selectedUser.username}
      />
      <UserFormModal
        show={showEditUserModal}
        handleClose={() => setShowEditUserModal(false)}
        handleConfirm={() => {
          setLoading(true);
          setShowEditUserModal(false);
        }}
        mode="edit"
        header="Edit user data"
        data={selectedUser}
      />
      <UserFormModal
        show={showCreateUserModal}
        handleClose={() => setShowCreateUserModal(false)}
        handleConfirm={() => {
          setLoading(true);
          setShowCreateUserModal(false);
        }}
        mode="create"
        header="Create new user"
        data={{}}
      />
    </>
  );
}
