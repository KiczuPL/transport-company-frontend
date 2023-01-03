import { useEffect, useState } from "react";
import {
  Button,
  Container,
  Form,
  FormGroup,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import companyService from "../../services/company.service";
import Company from "../../components/Company";
import CompanyFormModal from "./CompanyFormModal";
import ConfirmModal from "../../components/ConfirmModal";
import PaginationBlock from "../../components/PaginationBlock";

export default function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [companyTaxId, setCompanyTaxId] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [selectedCompany, setSelectedCompany] = useState({});
  const [showDeleteCompanyModal, setShowDeleteCompanyModal] = useState(false);
  const [showEditCompanyModal, setShowEditCompanyModal] = useState(false);
  const [showCreateCompanyModal, setShowCreateCompanyModal] = useState(false);

  const handleDelete = async () => {
    await companyService.deleteCompany(selectedCompany.id);
    setShowDeleteCompanyModal(false);
    setLoading(true);
  };

  const fetchCompanies = async () => {
    const data = await companyService.getCompanies(
      companyName,
      companyTaxId,
      companyAddress,
      currentPage
    );

    setTotalPages(data.totalPages);
    setCompanies(data.companies);
  };

  useEffect(() => {
    if (isLoading) {
      fetchCompanies().then(() => {
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
                  <FormGroup>
                    <Form.Label>Company name:</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => setCompanyName(e.target.value)}
                    />
                  </FormGroup>
                </Row>
                <Row xs={2}>
                  <FormGroup>
                    <Form.Label>Company address:</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => setCompanyAddress(e.target.value)}
                    />
                  </FormGroup>
                </Row>
                <Row xs={2}>
                  <FormGroup>
                    <Form.Label>Company tax id:</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => setCompanyTaxId(e.target.value)}
                    />
                  </FormGroup>
                </Row>
                <Row xs={2}>
                  <Form.Label />
                </Row>
                <Row md={2}>
                  <Button type="submit">Filter</Button>
                </Row>{" "}
                <Row xs={2}>
                  <Form.Label />
                </Row>
              </Form>{" "}
            </Container>
            <PaginationBlock
              setLoading={setLoading}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              totalPages={totalPages}
            />{" "}
            <Button
              variant="success"
              onClick={() => {
                setShowCreateCompanyModal(true);
              }}
            >
              Create new
            </Button>{" "}
          </ListGroup.Item>
        </ListGroup>

        <ListGroup>
          {!companies.length ? <h5>Empty</h5> : null}
          {companies.map((company) => (
            <>
              <ListGroup.Item>
                <ListGroup.Item>
                  <Company data={company} />
                  <Button
                    variant="danger"
                    onClick={() => {
                      setSelectedCompany(company);
                      setShowDeleteCompanyModal(true);
                    }}
                  >
                    Delete
                  </Button>{" "}
                  <Button
                    variant="primary"
                    onClick={() => {
                      setSelectedCompany(company);
                      setShowEditCompanyModal(true);
                    }}
                  >
                    Edit
                  </Button>
                </ListGroup.Item>
              </ListGroup.Item>
            </>
          ))}
        </ListGroup>
        <ConfirmModal
          dangerousAction={true}
          show={showDeleteCompanyModal}
          handleClose={() => setShowDeleteCompanyModal(false)}
          handleConfirm={handleDelete}
          header="Delete company"
          body={
            "Are you sure you want to delete company " +
            selectedCompany.name +
            " and all orders and users associated with it?"
          }
        />
        <CompanyFormModal
          show={showEditCompanyModal}
          handleClose={() => setShowEditCompanyModal(false)}
          handleConfirm={() => {
            setShowEditCompanyModal(false);
            setLoading(true);
          }}
          mode="edit"
          header="Edit company data"
          data={selectedCompany}
        />
        <CompanyFormModal
          show={showCreateCompanyModal}
          handleClose={() => setShowCreateCompanyModal(false)}
          handleConfirm={() => {
            setShowCreateCompanyModal(false);
            setLoading(true);
          }}
          mode="create"
          header="Create new company"
          data={selectedCompany}
        />
      </Container>
    </>
  );
}
