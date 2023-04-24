import React, { useEffect, useState } from "react";
import NavbarEventSearch from "../../components/NavbarEventSearch/NavbarEventSearch.js";
import NavbarMain from "../../components/NavbarMain/NavbarMain";
import { fetchAllEvents } from "../../services/SportService";
import "./SearchEvents.css";
import { Button, ListGroup, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import CardDetails from "../../components/Paymentcard";

export default function SearchEvents() {
  const [allEventData, setAllEventData] = useState([]);
  const [tempData, setTempData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [displayDetailsonModal, setDisplayDetailsOnModal] = useState({});
  useEffect(() => {
    fetchAllEvents()
      .then((res) => {
        setAllEventData(res);
        setTempData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {}, [allEventData, tempData]);

  const showDetails = (element) => {
    setDisplayDetailsOnModal(element);
    setShowModal(true);
  };

  return (
    <>
      <div>
        <NavbarMain />
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

                    <p>Seats Available : {element.Capacity}</p>
                  </div>
                  <div className="d-flex flex-column justify-content-around">
                    {" "}
                    <Button
                      style={{ backgroundColor: "black" }}
                      variant="success"
                      onClick={() => showDetails(element)}
                    >
                      Book Event
                    </Button>
                  </div>
                </ListGroup.Item>
              ))
            ) : (
              <h3 className="text-center mt-5">No Events found!</h3>
            )}
          </ListGroup>
        </div>
        {showModal ? (
          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title id="example-custom-modal-styling-title">
                {displayDetailsonModal.EventName}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <CardDetails />
            </Modal.Body>
            <Modal.Footer>
              <Link to={"/Booking?" + displayDetailsonModal.EventName}>
                <Button style={{ backgroundColor: "black", border: "black" }}>
                  Pay
                </Button>
              </Link>
            </Modal.Footer>
          </Modal>
        ) : (
          <></>
        )}
      </div>
      <Footer />
    </>
  );
}
