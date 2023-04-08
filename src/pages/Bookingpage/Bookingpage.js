import React, { useState } from "react";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

function Bookingpage() {
  const [selectedDate, setSelectedDate] = useState("");
  console.log("Date", selectedDate);

  const handleDateChange = (date) => {
    setSelectedDate(date.format("YYYY-MM-DD HH:mm:ss"));
  };

  return (
    <div className="Car">
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
      <h1>Select date and time</h1>
      <Datetime onChange={handleDateChange} />
      <h1>Slot booked on {selectedDate}</h1>
      <Button className="mx-5" type="submit" color="white">
        <Link to="/thankyou">BOOK SLOT</Link>
      </Button>
    </div>
  );
}

export default Bookingpage;
