import React, { useEffect, useState } from "react";
import NavbarSportSearch from "../../components/NavbarSportSearch/NavbarSportSearch";
import { fetchAllVenues } from "../../services/SportService";
import "./SportSearch.css";
import { Button, ListGroup, ListGroupItem } from "react-bootstrap";

export default function SportSearch() {
  const [allSportsData, setAllSportsData] = useState([]);
  useEffect(() => {
    fetchAllVenues()
      .then((res) => {
        console.log(res);
        setAllSportsData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <NavbarSportSearch />
      <div className="justify-content-around d-flex ">
        <ListGroup className="sportsConatiner">
          {allSportsData.map((element, index) => (
            <ListGroup.Item
              className="my-3 d-flex flex-row justify-content-between"
              key={index}
            >
              <div>
                <h4>{element.Venue_Name}</h4>
                <p style={{ color: "grey" }}>{element.City}</p>
                <p>{element.Description.substring(0, 70) + "..."}</p>
              </div>
              <div className="d-flex flex-column justify-content-around">
                {" "}
                <Button
                  variant="success"
                  className="sportsConatinerDetailsButton"
                >
                  View Details
                </Button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </div>
  );
}
