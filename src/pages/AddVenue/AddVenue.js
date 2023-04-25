import React, { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { setDoc, doc } from "firebase/firestore";
import { Form, Button, Row, Col } from "react-bootstrap";
import styles from "./AddVenue.module.css";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import InputGroup from "react-bootstrap/InputGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Alert } from "react-bootstrap";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "@firebase/storage";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer";

const sport = [
  "Baseball",
  "Soccer",
  "Basketball",
  "Hockey",
  "Tennis",
  "Swimming",
  "Badminton",
  "Pickleball",
  "Cricket",
  "Volleyball",
];

export default function AddVenue() {
  const storage = getStorage();
  const [Venue_Name, setVenueName] = useState("");
  const [UploadFiles, setUploadFiles] = useState([]);
  const [Cost, setCost] = useState("");
  const [City, setVenueLocation] = useState("");
  const [Capacity, setCapacity] = useState("");
  const [Description, setDescription] = useState("");
  const [typeofsport, setSport] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  console.log(typeofsport);

  useEffect(() => {}, [typeofsport]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      ref(storage, Venue_Name + "/" + UploadFiles[0].name);
      const localStorageRef = ref(
        storage,
        Venue_Name + "/" + UploadFiles[0].name
      );
      uploadBytes(localStorageRef, UploadFiles[0]).then(() => {
        getDownloadURL(
          ref(storage, Venue_Name + "/" + UploadFiles[0].name)
        ).then((url) => {
          setDoc(doc(db, "Venues", Venue_Name), {
            Venue_Name,
            City,
            Cost,
            Capacity,
            Description,
            typeofsport,
            archiImage: url,
          }).then((res) => setShowAlert(true));
        });
      });
    } catch (error) {
      console.error("Error adding venue: ", error);
    }
  };

  document.body.className = styles.body;
  return (
    <div className={styles.container} style={{ paddingTop: "150px" }}>
      <h1>Add Venue</h1>
      <Form className="bg-white p-5 mb-5" style={{borderRadius: "20px"}} onSubmit={handleSubmit}>
        <Row>
          <Col className="mb-3">
            <Form.Control
              type="text"
              placeholder="Venue Name"
              onChange={(e) => setVenueName(e.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid name.
            </Form.Control.Feedback>
          </Col>
        </Row>
        <Row>
          <Col md={6} className="mb-3">
            <Form.Control
              type="number"
              placeholder="Cost"
              min={0}
              onChange={(e) => setCost(e.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid name.
            </Form.Control.Feedback>
          </Col>
          <Col md={6} className="mb-3">
            <Form.Control
              type="text"
              placeholder="Venue City Name"
              onChange={(e) => setVenueLocation(e.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid city name.
            </Form.Control.Feedback>
          </Col>
        </Row>

        <Row>
          <Col md={6} className="mb-3">
            <Form.Control
              type="text"
              placeholder="Venue Description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </Col>
          <Col md={6} className="mb-3">
            <Form.Control
              type="number"
              placeholder="Capacity"
              min={1}
              onChange={(e) => setCapacity(e.target.value)}
            />
          </Col>
        </Row>
        <Row>
          <Col className="">
            <InputGroup className="mb-3">
              <Form.Control
                disabled
                placeholder="Please choose the sport from dropdown"
                value={typeofsport.toString()}
              />
              <DropdownButton
                variant="outline-secondary"
                title="Select Sport to Add"
                align="end"
              >
                {sport.map((sport, index) =>
                  typeofsport.indexOf(sport) === -1 ? (
                    <Dropdown.Item
                      key={index}
                      onClick={() => setSport([...typeofsport, sport])}
                      value={sport}
                    >
                      {sport}
                    </Dropdown.Item>
                  ) : (
                    <></>
                  )
                )}
              </DropdownButton>
              {typeofsport.length ? (
                <Button>
                  <FontAwesomeIcon
                    onClick={() => setSport(typeofsport.slice(0, -1))}
                    icon={faTrash}
                  />
                </Button>
              ) : (
                <></>
              )}
            </InputGroup>
          </Col>
        </Row>
        <Row className=" d-flex flex-row">
          <Col className="col-3">
            {" "}
            <p className="mt-2 text-center"> Upload Images:</p>
          </Col>
          <Col>
            <Form.Control
              type="file"
              placeholder="input file"
              onChange={(e) => setUploadFiles(e.target.files)}
              accept=".png, .jpeg, .jpg"
              required
            />
          </Col>
        </Row>
        <Row className="d-flex justify-content-around mt-4">
          <Button
            variant="primary"
            type="submit"
            style={{
              backgroundColor: "black",
              border: "black",
              width: "280px",
            }}
          >
            Add Venue
          </Button>
        </Row>
      </Form>
      {showAlert ? (
        <Alert className="m-5" variant="success">
          Event Added Successfully !!!
        </Alert>
      ) : (
        <></>
      )}
    </div>
  );
}
