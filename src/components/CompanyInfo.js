

export default function CompanyInfo({ company }) {
    return (
        <div>
            <h1>{company.name}</h1>
            <p>Address: {company.address}</p>
            <p>Tax ID number: {company.taxIdNumber}</p>
        </div>
    )
}