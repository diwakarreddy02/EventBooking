import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarMain from "../../components/NavbarMain/NavbarMain";
import "./Dashboard.css";
import Form from "react-bootstrap/Form";

export default function Dashboard() {
  const [search, SetSearch] = useState("");
  console.log(search);
  const navigate = useNavigate();
  return (
    <>
      <div style={{ height: "100vh" }} className="BackgroundImg">
        <NavbarMain />
        <div className="dashBoardContent">
          <h2>Make Your Dream Come True</h2>
          <h2>Meet your favorite artists, sport teams and parties</h2>
        </div>
        <div className="d-flex justify-content-around">
          <Form className="col-3">
            <Form.Control
              type="search"
              onChange={(e) => SetSearch(e.target.value)}
              placeholder="Search"
              className="me-2 "
              aria-label="Search"
            />
          </Form>
        </div>
      </div>
    </>
  );
}
