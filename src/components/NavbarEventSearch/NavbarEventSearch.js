import React from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
export default function NavbarEventSearch({ tempData, setAllEventData }) {
  const setdataSearch = (searchValue) => {
    setAllEventData(
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
      setAllEventData(tempData);
    } else {
      setAllEventData(
        tempData.filter(
          (element) => element.city.toLowerCase() === cityValue.toLowerCase()
        )
      );
    }
  };
  const selectCostSearch = (costValue) => {
    if (costValue === "none") {
      setAllEventData(tempData);
    } else if (costValue === "Free") {
      setAllEventData(tempData.filter((element) => element.Cost === 0));
    } else {
      setAllEventData(tempData.filter((element) => element.Cost !== 0));
    }
  };
  return (
    <>
      <div>
        <Navbar bg="light" expand="lg">
          <Container>
            <Nav>
              <Navbar.Brand href="/Dashboard"> IU Eventia </Navbar.Brand>
            </Nav>

            <Nav>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search Events/Activities..."
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
                <option value="Evansville">Evansville</option>
              </Form.Select>
            </Nav>
            <Nav>
              <Form.Select
                onChange={(e) => selectCostSearch(e.target.value)}
                style={{ paddingRight: "7rem" }}
              >
                <option value="none">Select Costing...</option>
                <option value="Free">Free</option>
                <option value="Chargeable">Chargeable</option>
              </Form.Select>
            </Nav>
          </Container>
        </Navbar>
      </div>
    </>
  );
}
