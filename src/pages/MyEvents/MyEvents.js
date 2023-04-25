import React, { useEffect, useState } from "react";
import { fetchAllEvents } from "../../services/SportService";
import "./MyEvents.css";
import { Button, ListGroup } from "react-bootstrap";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase.js";
export default function ShowEvents() {
  const [allEventData, setAllEventData] = useState([]);
  const [tempData, setTempData] = useState([]);
  const userEmail = localStorage.getItem("email");

  const cancelEvents = (EventName) => {
    const setTrue = doc(db, "Events", EventName);
    updateDoc(setTrue, {
      Cancelled: true,
    });
    fetchAllEvents()
      .then((res) => {
        setAllEventData(res.filter((e) => e.Owner_Mail === userEmail));
        setTempData(res.filter((e) => e.Owner_Mail === userEmail));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchAllEvents()
      .then((res) => {
        setAllEventData(res.filter((e) => e.Owner_Mail === userEmail));
        setTempData(res.filter((e) => e.Owner_Mail === userEmail));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {}, [allEventData, tempData]);

  return (
    <>
      <div style={{ height: "80vh", paddingTop: "150px" }}>
        <h1>My Events</h1>
        <hr />
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
                      onClick={() => cancelEvents(element.EventName)}
                      variant="success"
                      disabled={element.Cancelled}
                    >
                      {element.Cancelled ? "Event is Cancelled" : "Cancel"}
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
    </>
  );
}
