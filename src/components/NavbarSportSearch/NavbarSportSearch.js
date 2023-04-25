import React from "react";
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
  const selectCostSearch = (costValue) => {
    if (costValue === "none") {
      setAllSportsData(tempData);
    } else if (costValue === "Free") {
      setAllSportsData(tempData.filter((element) => element.Cost === 0));
    } else {
      setAllSportsData(tempData.filter((element) => element.Cost !== 0));
    }
  };
  return (
    <>
      <div style={{ marginTop: "10%" }}>
        <Navbar
          bg="dark"
          className="mx-5"
          expand="lg"
          style={{ padding: "1rem", borderRadius: "10px" }}
        >
          <Container>
            <Nav>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search sports..."
                  className="pe-5"
                  style={{ width: "26rem", marginLeft: "0rem" }}
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
