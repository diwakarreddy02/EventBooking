import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import GoogleButton from "react-google-button";
import "./Login.css";
import app from "../../config/firebase";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider(app);

export default function Login() {
  (function () {
    let forms = document.querySelectorAll(".needs-validation");
    Array.prototype.slice.call(forms).forEach(function (form) {
      form.addEventListener(
        "submit",
        function (event) {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add("was-validated");
        },
        false
      );
    });
  })();
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordReset, setPasswordReset] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        if (res.user.emailVerified) {
          navigate("/dashboard");
        } else {
          console.log("please verify email");
        }
      })
      .catch((err) => {
        console.log(err);
      });

    return response;
  };

  const singInwithGoogle = () => {
    console.log("7");
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        localStorage.setItem("userToken", token);
        navigate("/dashboard");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <>
	  <div className="header">
        <h1>IU Eventia</h1>
      </div>
      <div
        style={{ marginTop: "11%" }}
        className="col-12 d-flex justify-content-around"
      >
        <Form className="formContainer" onSubmit={handleSubmit}>
          <Form.Group className=" mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          {!passwordReset ? (
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
          ) : (
            <></>
          )}
          <div className="mx-5 mt-2 row-2">
            <Button className="col-12 p-2" variant="primary" type="submit">
              {passwordReset ? "Send Link" : "Login"}
            </Button>
          </div>
          {!passwordReset ? (
            <div className="d-flex justify-content-around mt-3">
              <a
                style={{
                  textDecoration: "none",
                  color: "grey",
                  cursor: "pointer",
                }}
                onClick={() => setPasswordReset(true)}
              >
                Forgot Password ?
              </a>
            </div>
          ) : (
            <></>
          )}
          {!passwordReset ? (
            <div className=" d-flex justify-content-around mt-4">
              {" "}
              <GoogleButton onClick={() => singInwithGoogle()} />
            </div>
          ) : (
            <></>
          )}
        </Form>
      </div>
    </>
  );
}
