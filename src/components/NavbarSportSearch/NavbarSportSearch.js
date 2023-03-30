import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
export default function NavbarSportSearch() {
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Nav>
            <Navbar.Brand href="/HomePage"> IU Eventia </Navbar.Brand>
          </Nav>

          <Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Nav>

          <Nav>
            <Form.Select style={{ paddingRight: "7rem" }}>
              <option>Open this select menu</option>
              <option value="1">Bloomington</option>
              <option value="2">Indianapolis</option>
              <option value="3">Martinsville</option>
            </Form.Select>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}
