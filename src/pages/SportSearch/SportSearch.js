import React, { useEffect, useState } from "react";
import NavbarSportSearch from "../../components/NavbarSportSearch/NavbarSportSearch";
import NavbarMain from "../../components/NavbarMain/NavbarMain";
import { fetchAllVenues } from "../../services/SportService";
import "./SportSearch.css";
import { Button, ListGroup, Modal } from "react-bootstrap";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

export default function SportSearch() {
  const [allSportsData, setAllSportsData] = useState([]);
  const [tempData, setTempData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [displayDetailsonModal, setDisplayDetailsOnModal] = useState({});
  useEffect(() => {
    fetchAllVenues()
      .then((res) => {
        setAllSportsData(res);
        setTempData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {}, [allSportsData, tempData]);

  const showDetails = (element) => {
    setDisplayDetailsOnModal(element);
    setShowModal(true);
  };

  return (
    <>
      <div>
        <Navbar />
        <NavbarSportSearch
          tempData={tempData}
          setAllSportsData={setAllSportsData}
        />
        <div className="justify-content-around d-flex ">
          <ListGroup className="sportsConatiner">
            {allSportsData.length ? (
              allSportsData.map((element, index) => (
                <ListGroup.Item
                  className="my-3 d-flex flex-row justify-content-between"
                  key={index}
                >
                  <div>
                    <h4>{element.Venue_Name}</h4>
                    <p style={{ color: "grey" }}>{element.City}</p>
                    <p>{element.Description.substring(0, 70) + "..."}</p>
                  </div>
                  <div className="d-flex flex-column justify-content-around">
                    {" "}
                    <Button
                      variant="success"
                      className="sportsConatinerDetailsButton"
                      onClick={() => showDetails(element)}
                    >
                      View Details
                    </Button>
                  </div>
                </ListGroup.Item>
              ))
            ) : (
              <h3 className="text-center mt-5">No Venues found!</h3>
            )}
          </ListGroup>
        </div>
        {showModal ? (
          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title id="example-custom-modal-styling-title">
                {displayDetailsonModal.Venue_Name}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p style={{ color: "grey" }}>{displayDetailsonModal.City}</p>
              <p>{displayDetailsonModal.Description}</p>
              <p>Cost per individual: {displayDetailsonModal.Cost}</p>
              <img src={displayDetailsonModal.archiImage} />
              <Modal.Footer>
                <Link to={"/Booking?" + displayDetailsonModal.Venue_Name}>
                  <Button style={{ backgroundColor: "black", border: "black" }}>
                    Book Venue
                  </Button>
                </Link>
              </Modal.Footer>
            </Modal.Body>
          </Modal>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
