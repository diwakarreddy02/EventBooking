import React, { useEffect, useState } from "react";
import NavbarSportSearch from "../../components/NavbarSportSearch/NavbarSportSearch";
import { fetchAllVenues } from "../../services/SportService";
import Card from "react-bootstrap/Card";

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
      <div>
        {allSportsData.map((element, index) => (
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title></Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {element.Capacity}
              </Card.Subtitle>
              <Card.Text>{element.Description}</Card.Text>
              <Card.Link href="#">Card Link</Card.Link>
              <Card.Link href="#">Another Link</Card.Link>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}
