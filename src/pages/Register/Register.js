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
import { addDoc, collection } from "firebase/firestore";

export default function FormExample() {
  const [validated, setValidated] = useState(false);
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Username, setuser] = useState("");
  const [Email, setEmail] = useState("");
  const [Role, setRole] = useState("Owner");
  const [Password, setPassword] = useState("");
  // Function to post data to Firestore
  console.log(Role);
  const Registersubmit = async (e) => {
    e.preventDefault();
    setValidated(true);
    await createUserWithEmailAndPassword(auth, Email, Password)
      .then(async (res) => {
        const euser = auth.currentUser;
        sendEmailVerification(euser);
        console.log(res);
        await addDoc(collection(db, "Users"), {
          FirstName: FirstName,
          LastName: LastName,
          Email: Email,
          Role: Role,
          UserName: Username,
        })
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
          className="formContainerReg p-5"
          noValidate
          validated={validated}
          onSubmit={Registersubmit}
        >
          <Row className="mb-3">
            <Form.Group className="col-12 mb-3">
              <Form.Select
                name="submissiontType"
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="Owner">Owner</option>
                <option value="Player">Player</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="col-6" controlId="validationCustom01">
              <Form.Control
                required
                type="text"
                placeholder="First name"
                onChange={(e) => setFirstName(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please enter valid First Name
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="col-6" controlId="validationCustom02">
              <Form.Control
                required
                type="text"
                placeholder="Last Name"
                onChange={(e) => setLastName(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please enter valid Last Name
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group className="col-6" controlId="validationCustomUsername">
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

            <Form.Group className="col-6">
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
              <Form.Control
                type="password"
                placeholder="Re-enter password"
                required
                minLength={8}
                pattern={Password}
              />
              <Form.Control.Feedback type="invalid">
                Password donot match
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <div className="mt-4 d-flex  flex-column ">
            <Button className="mx-5" type="submit">
              Register
            </Button>

            <Link
              to="/Login"
              className="mt-4 "
              style={{ textDecoration: "none" }}
            >
              Already having account? Login Here
            </Link>
          </div>
        </Form>
      </div>
    </>
  );
}
