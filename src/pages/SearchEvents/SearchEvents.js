import React, { useEffect, useState } from "react";
import NavbarEventSearch from "../../components/NavbarEventSearch/NavbarEventSearch.js";
import NavbarMain from "../../components/NavbarMain/NavbarMain";
import { fetchAllEvents } from "../../services/SportService";
import "./SearchEvents.css";
import { Button, ListGroup, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
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
        <div className="justify-content-around d-flex" >
          <ListGroup className="sportsContainer" style={{width:"70%"}}>
            {allEventData.length ? (
              allEventData.map((element, index) => (
                <ListGroup.Item
                  className="my-3 d-flex flex-row justify-content-between"
                  key={index}
                >
                  <div>
                    <h4>{element.EventName}</h4>
                    <p>{element.City}</p>
                    <p>$ {element.Cost}</p>
                    <p>{element.Description}</p>
                  </div>
                  <div className="d-flex flex-column justify-content-around">
                    {" "}
                    <Button style={{backgroundColor:"black"}}
                      variant="success"
                      onClick={() => showDetails(element)}
                    >
                      View Details
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
              <p style={{ color: "grey" }}>{displayDetailsonModal.City}</p>
              <p>{displayDetailsonModal.Description}</p>
              <p>Cost per individual: {displayDetailsonModal.Cost}</p>
              <Link to={"/Booking?" + displayDetailsonModal.EventName}>
                <Button style={{backgroundColor:"black",border:"black"}}>Book Event</Button>
              </Link>
            </Modal.Body>
          </Modal>
        ) : (
          <></>
        )}
      </div>
      <Footer />
    </>
  );
}
