export default function User({ data }) {
  return (
    <>
      <h5>{data.username}</h5>
      <p>
        Name: {data.firstName} {data.lastName}
      </p>
      <p>Email: {data.email}</p>
      <p>Company: {data.company.name}</p>
    </>
  );
}
