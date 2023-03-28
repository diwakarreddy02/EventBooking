import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../../config/firebase";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import "./Register.css";
import { db } from "../../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { FirebaseApp } from "firebase/app";
import { initializeApp } from "firebase/app";
export default function FormExample() {
  const [validated, setValidated] = useState(false);

  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Username, setuser] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  // Function to post data to Firestore
  const Registersubmit = async (e) => {
    e.preventDefault();
    setValidated(true);
    await auth.createUserWithEmailAndPassword(Email, Password);
    const postData = async (collectionName, data) => {
      try {
        const docRef = await db.collection(collectionName).add(data);
        console.log("Document written with ID: ", docRef.id);
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    };

    postData("Users", {
      FirstName: setFirstName,
      LastName: setLastName,
      Email: setEmail,
    })
      .then((res) => {
        console.log(res);
        const euser = auth.currentUser;
        sendEmailVerification(euser)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="header">
        <h1>Registration</h1>
      </div>
      <div
        style={{ marginTop: "12%" }}
        className="col-12 d-flex justify-content-around"
      >
        <Form
          className="formContainerReg"
          noValidate
          validated={validated}
          onSubmit={Registersubmit}
        >
          <Row className="mb-3">
            <Form.Group className="col-6" controlId="validationCustom01">
              <Form.Label>First name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="First name"
                onChange={(e) => setFirstName(e.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please enter valid First Name
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="col-6" controlId="validationCustom02">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Last name"
                onChange={(e) => setLastName(e.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please enter valid Last Name
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group className="col-6" controlId="validationCustomUsername">
              <Form.Label>Username</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  aria-describedby="inputGroupPrepend"
                  required
                  onChange={(e) => setuser(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please choose a username.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group className="col-6" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Enter valid Email address.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mx">
            <Form.Group className="col-6" controlId="validationCustom03">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                required
                minLength={8}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please enter valid password.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="col-6" controlId="validationCustom04">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Re-enter password"
                required
                minLength={8}
                pattern={Password}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Password donot match
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <div className="mt-4 d-flex justify-content-around">
            <Button className="col-7" type="submit">
              Register
            </Button>
            <p className="mt-4 d-flex justify-content-around text-danger text-success ">
              <Link to="/Login" className="text-danger">
                Already having account? Login Here
              </Link>
            </p>
          </div>
        </Form>
      </div>
    </>
  );
}
