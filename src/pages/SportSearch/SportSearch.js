import React, { useEffect, useState } from "react";
import NavbarSportSearch from "../../components/NavbarSportSearch/NavbarSportSearch";
import { fetchAllVenues } from "../../services/SportService";
import Card from "react-bootstrap/Card";
import { ListGroup, ListGroupItem } from "react-bootstrap";

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
    console.log(allSportsData);
  }, []);
  return (
    <div>
      <NavbarSportSearch />
      <div className="col-10">
        <ListGroup>
          {allSportsData.map((element, index) => (
            <ListGroup.Item>
              <p>{element.Venue_Name}</p>
              <p>{element.Description}</p>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </div>
  );
}
