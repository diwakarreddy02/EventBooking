import { useState, useEffect } from "react";
import "react-datetime/css/react-datetime.css";
import { Modal, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styles from "./Bookingpage.module.css";
import { fetchAllVenues } from "../../services/SportService";
import {
  updateDoc,
  query,
  getDocs,
  where,
  collection,
  doc,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import Alert from "react-bootstrap/Alert";
import CardDetails from "../../components/Paymentcard";
import React from "react";

function BookingPage() {
  const [selectedStartEndDate, setSelectedStartEndDate] = useState(["", ""]);
  const [ProfileModalShow, setProfileModalShow] = useState(false);
  const [isInvalidDate, setIsInvalidDate] = useState(false);
  const [allSportsData, setAllSportsData] = useState({});
  const [dateBooking, setDateBooking] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const userEmail = localStorage.getItem("email");
  useEffect(() => {
    setIsInvalidDate(false);
  }, [dateBooking, selectedStartEndDate]);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(8);
    if (!selectedStartEndDate[0].length && !selectedStartEndDate[1].length) {
      setIsInvalidDate(true);
    } else {
      console.log(7);
      const userRef = await query(
        collection(db, "Users"),
        where("email", "==", userEmail)
      );
      const querySnapshot = await getDocs(userRef);
      querySnapshot.forEach(async (userDoc) => {
        const tempDoc = doc(db, "Users", userDoc.id);
        await updateDoc(tempDoc, {
          reservation: [
            allSportsData.Venue_Name,
            dateBooking,
            ...selectedStartEndDate,
          ],
        })
          .then((res) => setShowAlert(true))
          .catch((err) => console.log(err));
      });
    }
  };
  document.body.className = styles.body;
  return (
    <div className="d-flex flex-column text-center">
      <div>
        <h2>{allSportsData.Venue_Name}</h2>

        <h5>{allSportsData.City}</h5>
      </div>

      <Form className={styles.formBookingSlot} onSubmit={handleSubmit}>
        <h3 className="mt-5">Book your desired slot</h3>
        <div className="d-flex flex-column px-5 my-5">
          <Form.Group className="d-flex flex-row">
            <p className="h4 mt-1 col-4">Date:</p>
            <Form.Control
              type="date"
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setDateBooking(e.target.value)}
            />
          </Form.Group>
          <div className="my-3 d-flex flex-row">
            <p className="h5 my-2 px-3 col-4">Start Time:</p>
            <Form.Control
              type="time"
              onChange={(e) =>
                setSelectedStartEndDate([
                  e.target.value,
                  selectedStartEndDate[1],
                ])
              }
              min="00:00"
              max="23:59"
            />
          </div>
          <div className="d-flex flex-row">
            <p className="h5 my-2 px-3 col-4">End Time:</p>
            <Form.Control
              onChange={(e) =>
                setSelectedStartEndDate([
                  selectedStartEndDate[0],
                  e.target.value,
                ])
              }
              type="time"
              min="00:00"
              max="23:59"
            />
          </div>
        </div>

        <Form.Control.Feedback
          type="invalid"
          style={{ display: isInvalidDate ? "block" : "none" }}
          className={styles.feedback}
        >
          Please select a valid date and time.
        </Form.Control.Feedback>
        <div className={styles.buttonContainer}>
          <Button
            onClick={() => setProfileModalShow(true)}
            ltype="submit"
            variant="primary"
            className={styles.bookBtn}
          >
            Book Slot
          </Button>
        </div>
      </Form>
      {showAlert ? (
        <Alert
          className="m-5"
          dismissible
          onClose={() => navigate("/PaymentForm")}
          variant="success"
        >
          Redirecting to Payments page....!
        </Alert>
      ) : (
        <></>
      )}
      <Modal show={ProfileModalShow} onHide={() => setProfileModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CardDetails />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default BookingPage;
