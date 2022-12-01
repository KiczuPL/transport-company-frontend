import CompanyInfo from "../../components/CompanyInfo";
import TopNavbar from "../../components/navbar";


export default function UserCompany() {
    return (
        <div>
            <TopNavbar />
            <CompanyInfo company={JSON.parse(localStorage.getItem('user')).company} />
        </div>
    )
}