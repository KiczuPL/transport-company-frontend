import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import companyService from "../../services/company.service";

export default function CompanyFormModal({
  show,
  mode,
  handleClose,
  handleConfirm,
  header,
  data,
}) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [taxId, setTaxId] = useState("");
  function validateForm() {
    return true;
  }
  const handleEdit = async () => {
    const company = {
      id: data.id,
      name: name ? name : data.name,
      address: address ? address : data.address,
      taxIdNumber: taxId ? taxId : data.taxIdNumber,
    };
    //console.log("POPRAWIANIE", company);
    await companyService.updateCompany(company);
  };
  const handleCreate = async () => {
    const company = {
      name: name ? name : data.name,
      address: address ? address : data.address,
      taxIdNumber: taxId ? taxId : data.taxIdNumber,
    };
    await companyService.saveCompany(company);
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

  return (
    <Modal show={show}>
      <Modal.Header>
        <h2>{header}</h2>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group size="lg" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              autoFocus
              defaultValue={data.name}
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="taxId">
            <Form.Label>Tax id</Form.Label>
            <Form.Control
              autoFocus
              defaultValue={data.taxIdNumber}
              type="text"
              onChange={(e) => setTaxId(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              defaultValue={data.address}
              onChange={(e) => setAddress(e.target.value)}
            />
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
