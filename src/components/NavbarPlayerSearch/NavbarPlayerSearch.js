import React from "react";
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
export default function NavbarPlayerSearch({ tempData, setPlayerData }) {
  const setdataSearch = (searchValue) => {
    setPlayerData(
      tempData.filter(
        (element) =>
          element.EventName.filter(
            (dataEach) =>
              dataEach.toLowerCase().indexOf(searchValue.toLowerCase()) > -1
          ).length
      )
    );
  };

  const selectPlayerSearch = (sports) => {
    if (cityValue === "none") {
      setPlayerData(tempData);
    } else {
      setPlayerData(
        tempData.filter(
          (element) => element.City.toLowerCase() === cityValue.toLowerCase()
        )
      );
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
                  placeholder="Search by Age..."
                  className="ms-5 pe-5"
                  style={{ width: "26rem" }}
                  aria-label="Search"
                  onChange={(e) => setdataSearch(e.target.value)}
                />
              </Form>
            </Nav>
            <Nav>
              <Form.Select
                onChange={(e) => selectPlayerSearch(e.target.value)}
                style={{ paddingRight: "7rem" }}
              >
                <option value="none">Select Sports...</option>
                <option value="Cricket">Cricket</option>
                <option value="Handball">Handball</option>
                <option value="Soccer">Cricket</option>
                <option value="Swimming">Swimming</option>
                <option value="Badminton">Badminton</option>
                <option value="PickleBall">PickleBall</option>
              </Form.Select>
            </Nav>
          </Container>
        </Navbar>
      </div>
    </>
  );
}
