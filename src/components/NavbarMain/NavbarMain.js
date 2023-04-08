import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./NavbarMain.css";

export default function NavbarMain() {
  const navbarItems = ["Events", "Search", "Contact", "Booking", "AddVenue"];
  return (
    <div>
      <Navbar className="NavbarContainer" collapseOnSelect expand="lg">
        <Navbar.Brand href="/HomePage">
          <p className="NavbarHeading pt-3">IU Eventia</p>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            {navbarItems.map((element, index) => (
              <Nav.Link key={index} href={"/" + element}>
                {element}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <hr style={{ marginInline: "20%" }} />
    </div>
  );
}
