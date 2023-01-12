import CompanyInfo from "../../components/CompanyInfo";
import TopNavbar from "../ManageVehicles/TopNavbar";

export default function UserCompany() {
  return (
    <>
      <TopNavbar />
      <CompanyInfo company={JSON.parse(localStorage.getItem("user")).company} />
    </>
  );
}
