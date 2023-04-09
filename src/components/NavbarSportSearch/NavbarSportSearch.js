import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
export default function NavbarSportSearch({ tempData, setAllSportsData }) {
  const setdataSearch = (searchValue) => {
    setAllSportsData(
      tempData.filter(
        (element) =>
          element.typeofsport.filter(
            (dataEach) =>
              dataEach.toLowerCase().indexOf(searchValue.toLowerCase()) > -1
          ).length
      )
    );
  };

  const selectCitySearch = (cityValue) => {
    if (cityValue === "none") {
      setAllSportsData(tempData);
    } else {
      setAllSportsData(
        tempData.filter(
          (element) => element.City.toLowerCase() === cityValue.toLowerCase()
        )
      );
    }
  };
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
                placeholder="Search sports..."
                className="ms-5 pe-5"
                style={{ width: "26rem" }}
                aria-label="Search"
                onChange={(e) => setdataSearch(e.target.value)}
              />
            </Form>
          </Nav>
          <Nav>
            <Form.Select
              onChange={(e) => selectCitySearch(e.target.value)}
              style={{ paddingRight: "7rem" }}
            >
              <option value="none">Select City...</option>
              <option value="Bloomington">Bloomington</option>
              <option value="Indianapolis">Indianapolis</option>
              <option value="Martinsville">Martinsville</option>
            </Form.Select>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}
