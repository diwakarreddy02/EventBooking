import React, { useEffect, useState } from "react";
import NavbarSportSearch from "../../components/NavbarSportSearch/NavbarSportSearch";
import { fetchAllVenues } from "../../services/SportService";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function SportSearch() {
  const [allSportsData, setAllSportsData] = useState([]);
  useEffect(() => {
    fetchAllVenues()
      .then((res) => {
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
      <div className="card-grid">
        {allSportsData.map((element, index) => (
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Img variant="top" src="holder.js/100px180" />
              <Card.Title>{element.id}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {element.Capacity}
              </Card.Subtitle>
              <Card.Text>{element.Description}</Card.Text>

              <Link to="/Booking">
                <Button variant="primary">BOOK NOW</Button>
              </Link>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}
