import React from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export default function NavbarPlayerSearch({ tempData, setPlayerData }) {
  const setdataSearch = (searchValue) => {
    const agerange = searchValue.split(" ");
    if (searchValue === "none") {
      setPlayerData(tempData);
    } else {
      setPlayerData(
        tempData.filter(
          (element) =>
            element.age >= parseInt(agerange[0]) &&
            element.age <= parseInt(agerange[1])
        )
      );
    }
  };

  const selectSportSearch = (Sportname) => {
    if (Sportname === "none") {
      setPlayerData(tempData);
    } else {
      setPlayerData(
        tempData.filter(
          (element) => element.typeofsport.indexOf(Sportname) > -1
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
              <Form.Select
                onChange={(e) => setdataSearch(e.target.value)}
                style={{ paddingRight: "20rem" }}
              >
                <option value="none">Select Age...</option>
                <option value="0 10">0-10</option>
                <option value="11 20">11-20</option>
                <option value="21 30">21-30</option>
                <option value="31 40">31-40</option>
                <option value="41 50">41-50</option>
                <option value="51">{"51<"}</option>
              </Form.Select>
            </Nav>
            <Nav>
              <Form.Select
                onChange={(e) => selectSportSearch(e.target.value)}
                style={{ paddingRight: "7rem" }}
              >
                <option value="none">Select Sports...</option>
                <option value="Cricket">Cricket</option>
                <option value="Handball">Handball</option>
                <option value="Baseball">Baseball</option>
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
