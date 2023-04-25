import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../../config/firebase";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import styles from "./Register.module.css";
import { db } from "../../config/firebase";
import { setDoc, doc } from "firebase/firestore";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

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
export default function Register() {
  const [validated, setValidated] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [typeofsport, setSport] = useState([]);
  const [role, setRole] = useState("Owner");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  console.log(typeofsport);

  useEffect(() => {}, [typeofsport]);
  // Function to post data to Firestore
  const registerSubmit = async (e) => {
    e.preventDefault();
    setValidated(true);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      await sendEmailVerification(user);
      const docRef = await setDoc(doc(db, "Users", user.uid), {
        firstName: firstName,
        lastName: lastName,
        email: email,
        age: age,
        role: role,
        username: username,
        typeofsport: typeofsport,
        reservation: [],
      });
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  document.body.className = styles.body;

  return (
    <>
      <div className={styles.header} style={{height: "20vh"}}>
        {/* <h1 className={styles.title}>Welcome to Eventia</h1>
        <h2 className={styles.subtitle}>Sign Up</h2> */}
      </div>
      <div
        style={({ marginTop: "2%" }, { backgroundColor: "whitesmoke" })}
        className="col-12 d-flex justify-content-around"
      >
        <Form
          className={styles.formContainerReg}
          noValidate
          validated={validated}
          onSubmit={registerSubmit}
        >
          <Row className={styles.mb_3}>
            <Form.Group className="col-12 mb-3">
              <Form.Select
                className={styles.select}
                name="submissiontType"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="Owner">Owner</option>
                <option value="Player">Player</option>
              </Form.Select>
            </Form.Group>
            <div className="d-flex flex-row justify-content-between">
              {" "}
              <Form.Group className="mb-3" controlId="validationCustom01">
                <Form.Control
                  className=" pe-5"
                  required
                  type="text"
                  placeholder="Enter your first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid first name
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="validationCustom02">
                <Form.Control
                  className="pe-5"
                  required
                  type="text"
                  placeholder="Enter your last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid last name
                </Form.Control.Feedback>
              </Form.Group>
            </div>

            <Form.Group controlId="validationCustomUsername">
              <InputGroup hasValidation>
                <InputGroup.Text
                  className={styles.input}
                  id="inputGroupPrepend"
                >
                  @
                </InputGroup.Text>
                <Form.Control
                  className={styles.input}
                  type="text"
                  placeholder="Enter your username"
                  aria-describedby="inputGroupPrepend"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please choose a username.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="number"
                placeholder="Enter your Age"
                required
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please enter your age.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="validationCustomEmail">
              <Form.Control
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid email.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              className={styles.col12}
              controlId="validationCustomPassword"
            >
              <Form.Control
                className={styles.input}
                type="password"
                placeholder="Enter your password"
                required
                value={password}
                minLength={8}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid password.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group Col className="mb-3">
              <InputGroup className="mb-3">
                <Form.Control disabled value={typeofsport.toString()} />
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
            </Form.Group>
            <Button className={styles.button} type="submit">
              Register
            </Button>
          </Row>
          <p className="text-center">
            Already have an account?{" "}
            <Link to="/login" className={styles.link}>
              Log in here
            </Link>
          </p>
        </Form>
      </div>
    </>
  );
}
