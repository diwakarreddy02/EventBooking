import React, { useEffect, useState } from "react";
import NavbarEventSearch from "../../components/NavbarEventSearch/NavbarEventSearch.js";
import NavbarMain from "../../components/NavbarMain/NavbarMain";
import { fetchAllEvents } from "../../services/SportService";
import "./ShowEvents.css";
import { Button, ListGroup, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar.js";
import Footer from "../../components/Footer";
export default function ShowEvents() {
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

  const [updatedData, setUpdatedData] = useState("");

  return (
    <>
      <div>
        <h1>Display and Cancel Events</h1>
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
                    <p>$ {element.Cost}</p>
                    <p>{element.Description}</p>
                  </div>
                  <div className="d-flex flex-column justify-content-around">
                    {" "}
                    <Button
                      style={{ backgroundColor: "black" }}
                      variant="success"
                      onClick={() => showDetails(element)}
                    >
                      Cancel Event
                    </Button>
                  </div>
                </ListGroup.Item>
              ))
            ) : (
              <h3 className="text-center mt-5">No Events found!</h3>
            )}
          </ListGroup>
        </div>
      </div>
      <Footer />
    </>
  );
}
