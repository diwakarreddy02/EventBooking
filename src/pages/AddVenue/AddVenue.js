import React, { useState } from "react";
import { db } from "../../config/firebase";
import { addDoc, collection } from "firebase/firestore";
import { Form, Button, Row, Col } from "react-bootstrap";
import styles from "./AddVenue.module.css";

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
  const [typeofsport, setSport] = useState(sport[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "Venues", Venue_Name), {
        Venue_Name,
        City,
        Cost,
        Capacity,
        Description,
        typeofsport,
      });
      console.log("Venue added successfully!");
    } catch (error) {
      console.error("Error adding venue: ", error);
    }
  };
  document.body.className = styles.body;
  return (
    <div className={styles.container}>
      <h1>Add a Venue</h1>
      <Form className={styles.formContainer} onSubmit={handleSubmit}>
        <Row>
          <Col md={6} className="mb-3">
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
          <Col md={6} className="mb-3">
            <Form.Control
              type="number"
              placeholder="Cost"
              onChange={(e) => setCost(e.target.value)}
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
              type="text"
              placeholder="Venue City Name"
              onChange={(e) => setVenueLocation(e.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid city name.
            </Form.Control.Feedback>
          </Col>
          <Col md={6} className="mb-3">
            <Form.Control
              type="text"
              placeholder="Venue Description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </Col>
        </Row>
        <Row>
          <Col md={6} className="mb-3">
            <Form.Control
              type="number"
              placeholder="Capacity"
              onChange={(e) => setCapacity(e.target.value)}
            />
          </Col>
          <Col md={6} className="mb-3">
            <Form.Select onChange={(e) => setSport(e.target.value)}>
              {sport.map((sport, index) => (
                <option key={index} value={sport}>
                  {sport}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Row>
        <Button variant="primary" type="submit">
          Add Venue
        </Button>
      </Form>
    </div>
  );
}
