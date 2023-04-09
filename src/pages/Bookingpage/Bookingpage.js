import React, { useState, useEffect } from "react";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./Bookingpage.module.css";
import { fetchAllVenues } from "../../services/SportService";

function BookingPage() {
  const [selectedDate, setSelectedDate] = useState("");
  const [isSlotBooked, setIsSlotBooked] = useState(false);
  const [isInvalidDate, setIsInvalidDate] = useState(false);
  const [allSportsData, setAllSportsData] = useState({});

  useEffect(() => {
    fetchAllVenues()
      .then((res) => {
        setAllSportsData(
          res.filter(
            (element) =>
              element.Venue_Name ===
              window.location.href.split("?")[1].replace(/%20/g, " ")
          )[0]
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(allSportsData);
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
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
    <Container className="text-center">
      <h2>{allSportsData.Venue_Name}</h2>
      <h3 className={styles.heading}>Select date and time</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Control
          type="date"
          min={new Date().toISOString().split("T")[0]}
          onChange={handleDateChange}
        />
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
    </Container>
  );
}

export default BookingPage;
