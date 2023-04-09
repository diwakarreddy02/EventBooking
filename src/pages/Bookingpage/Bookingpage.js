import React, { useState } from "react";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./Bookingpage.module.css";

function BookingPage() {
  const [selectedDate, setSelectedDate] = useState("");
  const [isSlotBooked, setIsSlotBooked] = useState(false);
  const [isInvalidDate, setIsInvalidDate] = useState(false);

  const handleDateChange = (date) => {
    const currentDate = new Date();
    if (date < currentDate) {
      setIsInvalidDate(true);
      setSelectedDate("");
    } else {
      setIsInvalidDate(false);
      setSelectedDate(date.format("YYYY-MM-DD HH:mm:ss"));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedDate === "") {
      setIsInvalidDate(true);
    } else {
      const confirmation = `Are you sure you want to book this slot on ${selectedDate}?`;
      if (window.confirm(confirmation)) {
        setIsSlotBooked(true);
        // Add code to book the slot here
      }
    }
  };
  document.body.className = styles.body;
  return (
    <Container className={styles.container}>
      <Row>
        <Col>
          <h1 className={styles.heading}>Select date and time</h1>
          <Form onSubmit={handleSubmit}>
            <Datetime onChange={handleDateChange} className={styles.datetime} />
            <Form.Control.Feedback
              type="invalid"
              style={{ display: isInvalidDate ? "block" : "none" }}
              className={styles.feedback}
            >
              Please select a valid date and time.
            </Form.Control.Feedback>
            <div className={styles.buttonContainer}>
              <Button
                type="submit"
                variant="success"
                disabled={isInvalidDate}
                className={styles.bookBtn}
              >
                Book Slot
              </Button>
              <Link className={styles.link} to="/thankyou">
                <Button variant="danger" className={styles.cancelBtn}>
                  Cancel
                </Button>
              </Link>
            </div>
          </Form>
          {isSlotBooked && (
            <h2 className={styles.slotBooked}>Slot booked on {selectedDate}</h2>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default BookingPage;
