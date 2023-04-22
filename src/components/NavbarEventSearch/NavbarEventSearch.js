import React from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
export default function NavbarSportSearch({ tempData, setAllEventData }) {
  const setdataSearch = (searchValue) => {
    setAllEventData(
      tempData.filter(
        (element) =>
          element.EventName.filter(
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
          (element) => element.City.toLowerCase() === cityValue.toLowerCase()
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
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search Events..."
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