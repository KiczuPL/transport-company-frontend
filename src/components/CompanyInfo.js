import { Container, ListGroup } from "react-bootstrap";

export default function CompanyInfo({ company }) {
  return (
    <Container>
      <ListGroup>
        <ListGroup.Item>
          {" "}
          <h1>{company.name}</h1>
          <p>Address: {company.address}</p>
          <p>Tax ID number: {company.taxIdNumber}</p>
        </ListGroup.Item>
      </ListGroup>
    </Container>
  );
}
