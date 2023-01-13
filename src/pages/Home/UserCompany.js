import CompanyInfo from "../../components/CompanyInfo";
import TopNavbar from "../../components/TopNavbar";

export default function UserCompany() {
  return (
    <>
      <TopNavbar />
      <CompanyInfo company={JSON.parse(localStorage.getItem("user")).company} />
    </>
  );
}
