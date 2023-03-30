import React, { useState } from "react";
import NavbarMain from "../../components/NavbarMain/NavbarMain";
import "./Dashboard.css";
import Form from "react-bootstrap/Form";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const auth = getAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login", { replace: true });
    console.log(search);
  };
  return (
    <>
      <div style={{ height: "100vh" }}>
        <NavbarMain />
        <div className="dashBoardContent">
          <h2>Make Your Dream Come True</h2>
          <h2>Meet your favorite artists, sport teams and parties</h2>
        </div>
        <div className="d-flex justify-content-around">
          <Form className="col-3">
            <Form.Control
              type="search"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              className="me-2 "
              aria-label="Search"
            />
          </Form>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </>
  );
}
