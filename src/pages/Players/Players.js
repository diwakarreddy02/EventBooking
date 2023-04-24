import React, { useEffect, useState } from "react";
import NavbarPlayerSearch from "../../components/NavbarPlayerSearch/NavbarPlayerSearch.js";
import NavbarMain from "../../components/NavbarMain/NavbarMain";
import { fetchAllPLayers } from "../../services/SportService";
import "./Players.module.css";
import { Button, ListGroup, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
export default function SearchEvents() {
  const [allPlayers, setPlayerData] = useState([]);
  const [tempData, setTempData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [displayDetailsonModal, setDisplayDetailsOnModal] = useState({});
  const [ageRange, setAgeRange] = useState({ min: "", max: "" });

  //   docRef
  //     .get()
  //     .then((doc) => {
  //       if (doc.exists) {
  //         const ageData = doc.data().age; // Replace "myField" with your own field name
  //         console.log(ageData);
  //       } else {
  //         console.log("No such document!");
  //       }
  //     })
  //     .catch((error) => {
  //       console.log("Error getting document:", error);
  //     });
  //   const filteredData = filterByAgeRange(data);

  //   const filterByAgeRange = (data) => {
  //     return data.filter((item) => {
  //       return item.age >= ageRange.min && item.age <= ageRange.max;
  //     });
  //   };
  useEffect(() => {
    fetchAllPLayers()
      .then((res) => {
        setPlayerData(res);
        setTempData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {}, [allPlayers, tempData]);

  const showDetails = (element) => {
    setDisplayDetailsOnModal(element);
    setShowModal(true);
  };

  return (
    <>
      <div>
        <NavbarMain />
        <NavbarPlayerSearch tempData={tempData} setPlayerData={setPlayerData} />
        <div className="justify-content-around d-flex">
          <ListGroup className="sportsContainer" style={{ width: "70%" }}>
            {/* <div>
              <input
                type="number"
                value={ageRange.min}
                onChange={(e) =>
                  setAgeRange({ ...ageRange, min: e.target.value })
                }
              />
              <input
                type="number"
                value={ageRange.max}
                onChange={(e) =>
                  setAgeRange({ ...ageRange, max: e.target.value })
                }
              />
              {filteredData.map((item) => (
                <div key={item.id}>
                  <p>{item.name}</p>
                  <p>{item.age}</p>
                </div>
              ))}
            </div> */}
            {allPlayers.length ? (
              allPlayers.map((element, index) => (
                <ListGroup.Item
                  className="my-3 d-flex flex-row justify-content-between"
                  key={index}
                >
                  <div>
                    <h4>{element.username}</h4>
                    <p>{element.firstName}</p>
                    <p>{element.lastName}</p>
                    <p>{element.Description}</p>
                    <p>{element.age}</p>
                  </div>
                  <div className="d-flex flex-column justify-content-around">
                    {" "}
                    <Button
                      style={{ backgroundColor: "black" }}
                      variant="success"
                      onClick={() => showDetails(element)}
                    >
                      View Details
                    </Button>
                  </div>
                </ListGroup.Item>
              ))
            ) : (
              <h3 className="text-center mt-5">No Players found!</h3>
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
                <Button style={{ backgroundColor: "black", border: "black" }}>
                  Book Event
                </Button>
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
