import React, { useEffect, useState } from "react";
import NavbarEventSearch from "../../components/NavbarEventSearch/NavbarEventSearch.js";
import NavbarMain from "../../components/NavbarMain/NavbarMain.js";
import { fetchAllEvents } from "../../services/SportService.js";
import "./SearchEvents.css";
import { Button, ListGroup, Modal } from "react-bootstrap";
import Footer from "../../components/Footer.js";
import CardDetails from "../../components/Paymentcard.js";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase.js";
import Form from "react-bootstrap/Form";
export default function SearchEvents() {
  const [allEventData, setAllEventData] = useState([]);
  const [tempData, setTempData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [displayDetailsonModal, setDisplayDetailsOnModal] = useState({});
  const [numberofTkts, setNumberoftkts] = useState(1);
  const userEmailId = localStorage.getItem("email");

  const handlePaymentOfEvent = (EventName, Capacity, UsersBooked) => {
    const numberoftickets = doc(db, "Events", EventName);
    updateDoc(numberoftickets, {
      Capacity: Capacity - numberofTkts,
      UsersBooked: [...UsersBooked, userEmailId],
    });

    setShowModal(false);
  };
  useEffect(() => {
    fetchAllEvents()
      .then((res) => {
        setAllEventData(res);
        setTempData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [showModal]);

  useEffect(() => {}, [allEventData, tempData]);

  const showDetails = (element) => {
    setDisplayDetailsOnModal(element);
    setShowModal(true);
  };

  return (
    <>
      <div>
        <NavbarEventSearch
          tempData={tempData}
          setAllEventData={setAllEventData}
        />
        <div className="justify-content-around d-flex">
          <ListGroup className="sportsContainer" style={{ width: "70%" }}>
            {allEventData.length ? (
              allEventData.map((element, index) => (
                <ListGroup.Item
                  className="my-3 d-flex flex-row justify-content-between"
                  key={index}
                >
                  <div>
                    <h4>{element.EventName}</h4>
                    <p>{element.City}</p>
                    <p>{element.Description}</p>
                    <p>Cost : {element.Cost}</p>

                    <p>
                      Seats Available :{" "}
                      {element.Cancelled ? "N/A" : element.Capacity}{" "}
                    </p>
                  </div>
                  <div className="d-flex flex-column justify-content-around">
                    {" "}
                    <Button
                      disabled={
                        !element.Capacity ||
                        element.UsersBooked.indexOf(userEmailId) !== -1 ||
                        element.Cancelled
                      }
                      style={{
                        backgroundColor: element.Cancelled
                          ? "darkred"
                          : "black",
                      }}
                      variant="success"
                      onClick={() => showDetails(element)}
                    >
                      {element.Capacity === 0
                        ? "Sold Out!"
                        : element.UsersBooked.indexOf(userEmailId) !== -1
                        ? "Event Already Booked"
                        : element.Cancelled
                        ? "Event Cancelled"
                        : "Book Event"}
                    </Button>
                    {element.Cancelled &&
                    element.UsersBooked.indexOf(userEmailId) !== -1 ? (
                      <h5 className="text-center" style={{ color: "red" }}>
                        Event is Cancelled!!
                      </h5>
                    ) : (
                      <></>
                    )}
                  </div>
                </ListGroup.Item>
              ))
            ) : (
              <h3 className="text-center mt-5">No Events found!</h3>
            )}
          </ListGroup>
        </div>
        {showModal ? (
          <Modal 
            
            show={showModal}
            onHide={() => {
              setNumberoftkts(1);
              setShowModal(false);
            }}
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-custom-modal-styling-title">
                {displayDetailsonModal.EventName}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <CardDetails />
              <div className="d-flex flex-column mt-3">
                <p className="col-4">Number of Tickets:</p>

                <Form.Select onChange={(e) => setNumberoftkts(e.target.value)}>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </Form.Select>
              </div>
            </Modal.Body>

            <Modal.Footer>
              <p className="mx-5">
                Total Amount : {displayDetailsonModal.Cost * numberofTkts}
              </p>
              <Button
                className="px-5"
                disabled={displayDetailsonModal.Capacity < numberofTkts}
                onClick={() =>
                  handlePaymentOfEvent(
                    displayDetailsonModal.EventName,
                    displayDetailsonModal.Capacity,
                    displayDetailsonModal.UsersBooked
                  )
                }
                style={{ backgroundColor: "black", border: "black" }}
              >
                {displayDetailsonModal.Capacity < numberofTkts
                  ? "Not enough tickets"
                  : "Pay"}
              </Button>
            </Modal.Footer>
          </Modal>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
