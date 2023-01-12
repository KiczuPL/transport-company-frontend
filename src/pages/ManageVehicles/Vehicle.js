import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";

export default function Vehicle({ data }) {
  return (
    <>
      <h5>Vehicle: {data.vehicleIdentifier}</h5>
      <p>Registration number: {data.registrationNumber}</p>
      <p>Type: {capitalizeFirstLetter(data.type)}</p>
    </>
  );
}
