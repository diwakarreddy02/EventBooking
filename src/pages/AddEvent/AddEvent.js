import React, { useState } from "react";
import { db } from "../../config/firebase";
import { setDoc, doc } from "firebase/firestore";
import { Form, Button, Row, Col } from "react-bootstrap";
import styles from "./AddEvent.module.css";
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

export default function AddEvent() {
  const [EventName, setEventname] = useState("");
  const [EventOwner, setEventOwner] = useState("");
  const [Owner_Mail, setOwner_Mail] = useState("");
  const [Cost, setCost] = useState("");
  const [City, setEventLocation] = useState("");
  const [Date, setDate] = useState("");
  const [Capacity, setCapacity] = useState("");
  const [Description, setDescription] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await setDoc(doc(db, "Events", EventName), {
        EventName,
        EventOwner,
        City,
        Cost,
        Capacity,
        Description,
        Owner_Mail,
        Date,
        Cancelled: false,
      }).then((res) => setShowAlert(true));
    } catch (error) {
      console.error("Error adding Event: ", error);
    }
  };
  document.body.className = styles.body;
  return (
    <div className={styles.container}>
      <h1>Add a Event</h1>
      <Form className={styles.formContainer} onSubmit={handleSubmit}>
        <Row>
          <Col md={6} className="mb-3">
            <Form.Control
              type="text"
              placeholder="Event Name"
              onChange={(e) => setEventname(e.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid name.
            </Form.Control.Feedback>
          </Col>
          <Col md={6} className="mb-3">
            <Form.Control
              type="text"
              placeholder="Event Owner"
              onChange={(e) => setEventOwner(e.target.value)}
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
              type="email"
              placeholder="Event Email Address"
              onChange={(e) => setOwner_Mail(e.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid emailaddress.
            </Form.Control.Feedback>
          </Col>
          <Col md={6} className="mb-3">
            <Form.Control
              type="number"
              placeholder="Event participation Cost"
              onChange={(e) => setCost(parseInt(e.target.value))}
              min={0}
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
              placeholder="Event City Name"
              onChange={(e) => setEventLocation(e.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid city name.
            </Form.Control.Feedback>
          </Col>
          <Col md={6} className="mb-3">
            <Form.Control
              type="text"
              placeholder="Event Description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </Col>
        </Row>
        <Row>
          <Col md={6} className="mb-3">
            <Form.Control
              type="date"
              placeholder="Date of Event"
              onChange={(e) => setDate(e.target.value)}
              min={1}
            />
          </Col>
          <Col md={6} className="mb-3">
            <Form.Control
              type="number"
              placeholder="Capacity"
              onChange={(e) => setCapacity(parseInt(e.target.value))}
              min={1}
            />
          </Col>
        </Row>
        <Button
          variant="primary"
          type="submit"
          style={{ backgroundColor: "black", border: "black" }}
        >
          Add Event
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
