import React, { useEffect, useState } from "react";
import NavbarSportSearch from "../../components/NavbarSportSearch/NavbarSportSearch";
import { fetchAllEvents } from "../../services/SportService";
import Card from "react-bootstrap/Card";
import { alignPropType } from "react-bootstrap/esm/types";

export default function EventSearch() {
  const [Eventdata, setEventdata] = useState([]);
  useEffect(() => {
    fetchAllEvents()
      .then((res) => {
        setEventdata(res);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(Eventdata);
  }, []);
  return (
    <div>
      <NavbarSportSearch />
      <div>
        {Eventdata.map((element, index) => (
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title></Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {element.Capacity}
              </Card.Subtitle>
              <Card.Text>{element.city}</Card.Text>
              <Card.Text>{element.sport}</Card.Text>
              <Card.Text>{element.venue}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}
