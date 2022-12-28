import React, { useContext } from "react";
import TopNavbar from "../../components/TopNavbar";
import { UserContext } from "../../context/UserContext";

export default function Home() {
  const { user } = useContext(UserContext);
  return (
    <>
      <TopNavbar />
      <h1>Hello {user.firstName}!</h1>
    </>
  );
}
