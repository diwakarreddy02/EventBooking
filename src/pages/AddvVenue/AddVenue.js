// import React, { useState } from "react";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import Row from "react-bootstrap/Row";
// import { db } from "../../config/firebase";
// import { addDoc, collection } from "firebase/firestore";
// import styles from "./AddVenue.module.css";

// export default function AddVenue() {
//   const [VenueName, setVenuename] = useState("");
//   const [VenueOwner, setVenueOwner] = useState("");
//   const [VenueLocation, setVenueLocation] = useState("");
//   const [Capacity, SetCapacity] = useState("");
//   const [Description, SetDescription] = useState("");
//   const [Sport, setSport] = useState("Baseball");
//   // Function to post data to Firestore
//   const AddVenue = async (e) => {
//     e.preventDefault();
//     await addDoc(collection(db, "Venues"), {
//       VenueName: VenueName,
//       VenueOwner: VenueOwner,
//       Capacity: Capacity,
//       City: VenueLocation,
//       Description: Description,
//     })
//       .then((res) => {
//         console.log(res);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
//   document.body.className = styles.body;
//   return (
//     <>
//       <div className="header">
//         <h1>Add a Venue</h1>
//       </div>
//       <div
//         style={{ marginTop: "12%" }}
//         className="col-12 d-flex justify-content-around"
//       >
//         <Form className="formContainerReg p-5" onSubmit={AddVenue}>
//           <Row className="mb-3">
//             <Form.Group className="col-6">
//               <Form.Control
//                 required
//                 type="text"
//                 placeholder="Venue Owner Name"
//                 onChange={(e) => setVenueOwner(e.target.value)}
//               />
//               <Form.Control.Feedback type="invalid">
//                 Please enter valid First Name
//               </Form.Control.Feedback>
//             </Form.Group>
//             <Form.Group className="col-6">
//               <Form.Control
//                 required
//                 type="text"
//                 placeholder="Venue Name"
//                 onChange={(e) => setVenuename(e.target.value)}
//               />
//               <Form.Control.Feedback type="invalid">
//                 Please enter valid Last Name
//               </Form.Control.Feedback>
//             </Form.Group>
//           </Row>

//           <Row className="mb-3">
//             <Form.Group className="col-6">
//               <Form.Control
//                 type="text"
//                 placeholder="Venue City name"
//                 required
//                 onChange={(e) => setVenueLocation(e.target.value)}
//               />
//               <Form.Control.Feedback type="invalid">
//                 Please choose a username.
//               </Form.Control.Feedback>
//             </Form.Group>

//             <Form.Group className="col-6">
//               <Form.Control
//                 type="text"
//                 placeholder="Venue Description"
//                 onChange={(e) => SetDescription(e.target.value)}
//               />
//               <Form.Control.Feedback type="invalid">
//                 Enter valid Email address.
//               </Form.Control.Feedback>
//             </Form.Group>
//           </Row>
//           <Row className="mb-3">
//             <Form.Group className="col-6">
//               <Form.Control
//                 type="text"
//                 placeholder="Capacity"
//                 onChange={(e) => SetCapacity(e.target.value)}
//               />
//             </Form.Group>
//             <Form.Group className="col-6">
//               <Form.Select
//                 name="submissiontType"
//                 onChange={(e) => setSport(e.target.value)}
//               >
//                 <option value="Baseball">1. Baseball</option>
//                 <option value="Soccer">2. Soccer</option>
//                 <option value="Basketball">3. Basketball</option>
//                 <option value="Hockey">4. Hockey</option>
//                 <option value="Tennis">5. Tennis</option>
//                 <option value="Swimming">6. Swimming</option>
//                 <option value="Badminton">7. Badminton</option>
//                 <option value="Pickleball">8. Pickleball</option>
//                 <option value="Cricket">9. Cricket</option>
//                 <option value="Volleyball">10. Volleyball</option>
//               </Form.Select>
//             </Form.Group>
//           </Row>
//           <div className="mt-4 d-flex  flex-column ">
//             <Button className="mx-5" type="submit">
//               Add Venue
//             </Button>
//           </div>
//         </Form>
//       </div>
//     </>
//   );
// }



import React, { useState } from "react";
import { db } from "../../config/firebase";
import { addDoc, collection } from "firebase/firestore";
import { Form, Button, Row, Col } from "react-bootstrap";
import styles from "./AddVenue.module.css";

const sports = [
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
  const [venueName, setVenueName] = useState("");
  const [venueOwner, setVenueOwner] = useState("");
  const [venueLocation, setVenueLocation] = useState("");
  const [capacity, setCapacity] = useState("");
  const [description, setDescription] = useState("");
  const [sport, setSport] = useState(sports[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "venues"), {
        venueName,
        venueOwner,
        venueLocation,
        capacity,
        description,
        sport,
      });
      console.log("Venue added successfully!");
    } catch (error) {
      console.error("Error adding venue: ", error);
    }
  };
  document.body.className = styles.body;
  return (
    <div className={styles.container}>
      <h1>Add a Venue</h1>
      <Form className={styles.formContainer} onSubmit={handleSubmit}>
        <Row>
          <Col md={6} className="mb-3">
            <Form.Control
              type="text"
              placeholder="Venue Owner Name"
              value={venueOwner}
              onChange={(e) => setVenueOwner(e.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid name.
            </Form.Control.Feedback>
          </Col>
          <Col md={6} className="mb-3">
            <Form.Control
              type="text"
              placeholder="Venue Name"
              value={venueName}
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
              type="text"
              placeholder="Venue City Name"
              value={venueLocation}
              onChange={(e) => setVenueLocation(e.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid city name.
            </Form.Control.Feedback>
          </Col>
          <Col md={6} className="mb-3">
            <Form.Control
              type="text"
              placeholder="Venue Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Col>
        </Row>
        <Row>
          <Col md={6} className="mb-3">
            <Form.Control
              type="number"
              placeholder="Capacity"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
            />
          </Col>
          <Col md={6} className="mb-3">
            <Form.Select
              value={sport}
              onChange={(e) => setSport(e.target.value)}
            >
              {sports.map((sport) => (
                <option key={sport} value={sport}>
                  {sport}
                </option>
              ))}
            </Form.Select>
         
            </Col>
    </Row>
    <Button variant="primary" type="submit">
      Add Venue
    </Button>
  </Form>
</div>
  );
              }

