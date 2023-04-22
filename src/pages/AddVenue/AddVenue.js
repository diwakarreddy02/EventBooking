import React, { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { setDoc, doc, collection } from "firebase/firestore";
import { Form, Button, Row, Col } from "react-bootstrap";
import styles from "./AddVenue.module.css";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import InputGroup from "react-bootstrap/InputGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Alert } from "react-bootstrap";

const sport = [
  "Baseball",
  "Soccer",
  "Basketball",
  "Hockey",
  "Tennis",
  "Swimming",
  "Badminton",
  "Pickleball",
  "Cricket",
  "Volleyball",
];

export default function AddVenue() {
  const [Venue_Name, setVenueName] = useState("");
  const [Cost, setCost] = useState("");
  const [City, setVenueLocation] = useState("");
  const [Capacity, setCapacity] = useState("");
  const [Description, setDescription] = useState("");
  const [typeofsport, setSport] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  console.log(typeofsport);

  useEffect(() => {}, [typeofsport]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await setDoc(doc(db, "Venues", Venue_Name), {
        Venue_Name,
        City,
        Cost,
        Capacity,
        Description,
        typeofsport,
      }).then((res) => setShowAlert(true));
    } catch (error) {
      console.error("Error adding venue: ", error);
    }
  };
  document.body.className = styles.body;
  return (
    <div className={styles.container}>
      <h1>Add Venue</h1>
      <Form className={styles.formContainer} onSubmit={handleSubmit}>
        <Row>
          <Col className="mb-3">
            <Form.Control
              type="text"
              placeholder="Venue Name"
              onChange={(e) => setVenueName(e.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid name.
            </Form.Control.Feedback>
          </Col>
        </Row>
        <Row>
          <Col md={6} className="mb-3">
            <Form.Control
              type="number"
              placeholder="Cost"
              min={0}
              onChange={(e) => setCost(e.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid name.
            </Form.Control.Feedback>
          </Col>
          <Col md={6} className="mb-3">
            <Form.Control
              type="text"
              placeholder="Venue City Name"
              onChange={(e) => setVenueLocation(e.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid city name.
            </Form.Control.Feedback>
          </Col>
        </Row>
        <Row>
          <Col md={6} className="mb-3">
            <Form.Control
              type="text"
              placeholder="Venue Description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </Col>
          <Col md={6} className="mb-3">
            <Form.Control
              type="number"
              placeholder="Capacity"
              min={1}
              onChange={(e) => setCapacity(e.target.value)}
            />
          </Col>
        </Row>
        <Row>
          <Col className="mb-3">
            <InputGroup className="mb-3">
              <Form.Control disabled value={typeofsport.toString()} />
              <DropdownButton
                variant="outline-secondary"
                title="Select Sport to Add"
                align="end"
              >
                {sport.map((sport, index) =>
                  typeofsport.indexOf(sport) === -1 ? (
                    <Dropdown.Item
                      key={index}
                      onClick={() => setSport([...typeofsport, sport])}
                      value={sport}
                    >
                      {sport}
                    </Dropdown.Item>
                  ) : (
                    <></>
                  )
                )}
              </DropdownButton>
              {typeofsport.length ? (
                <Button>
                  <FontAwesomeIcon
                    onClick={() => setSport(typeofsport.slice(0, -1))}
                    icon={faTrash}
                  />
                </Button>
              ) : (
                <></>
              )}
            </InputGroup>
          </Col>
        </Row>
        <Button variant="primary" type="submit" style={{ backgroundColor:"black",border:"black"}}>
          Add Venue
        </Button>
      </Form>
      {showAlert ? (
        <Alert className="m-5" variant="success">
          Event Added Successfully !!!
        </Alert>
      ) : (
        <></>
      )}
    </div>
  );
}
