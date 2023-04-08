// import React, { useState } from "react";
// import Datetime from "react-datetime";
// import "react-datetime/css/react-datetime.css";
// import { Button } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import { Card } from "react-bootstrap";

// function Bookingpage() {
//   const [selectedDate, setSelectedDate] = useState("");
//   console.log("Date", selectedDate);

//   const handleDateChange = (date) => {
//     setSelectedDate(date.format("YYYY-MM-DD HH:mm:ss"));
//   };

//   return (
//     <div className="Car">
//       <Card style={{ width: "18rem" }}>
//         <Card.Img variant="top" src="holder.js/100px180" />
//         <Card.Body>
//           <Card.Title>Card Title</Card.Title>
//           <Card.Text>
//             Some quick example text to build on the card title and make up the
//             bulk of the card's content.
//           </Card.Text>
//           <Button variant="primary">Go somewhere</Button>
//         </Card.Body>
//       </Card>
//       <h1>Select date and time</h1>
//       <Datetime onChange={handleDateChange} />
//       <h1>Slot booked on {selectedDate}</h1>
//       <Button className="mx-5" type="submit" color="white">
//         <Link to="/thankyou">BOOK SLOT</Link>
//       </Button>
//     </div>
//   );
// }

// export default Bookingpage;

import React, { useState } from "react";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { Button, Card, Container, Row, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./Bookingpage.module.css";
import imagefile from "../../assets/Bookingnow.webp"

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
          <Card className={styles.card}>
            <Card.Img variant="top" src={imagefile} className={styles.cardImg} />
            <Card.Body className={styles.cardBody}>
              <Card.Title className={styles.cardTitle}>Slot Booking</Card.Title>
              <Card.Text className={styles.cardText}>Select a date and time to book a slot.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <h1 className={styles.heading}>Select date and time</h1>
          <Form onSubmit={handleSubmit}>
            <Datetime onChange={handleDateChange} className={styles.datetime} />
            <Form.Control.Feedback type="invalid" style={{ display: isInvalidDate ? "block" : "none" }} className={styles.feedback}>
              Please select a valid date and time.
            </Form.Control.Feedback>
            <div className={styles.buttonContainer}>
              <Button type="submit" variant="success" disabled={isInvalidDate} className={styles.bookBtn}>
                Book Slot
              </Button>
              <Link className={styles.link} to="/thankyou">
                <Button variant="danger" className={styles.cancelBtn}>Cancel</Button>
              </Link>
            </div>
          </Form>
          {isSlotBooked && <h2 className={styles.slotBooked}>Slot booked on {selectedDate}</h2>}
        </Col>
      </Row>
    </Container>
  );
}

export default BookingPage;
