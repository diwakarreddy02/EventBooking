import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import GoogleButton from "react-google-button";
import styles from "./Login.module.css";
import app from "../../config/firebase";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider(app);

export default function Login() {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordReset, setPasswordReset] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (passwordReset) {
        await sendPasswordResetEmail(auth, email);
        console.log("Password reset email sent");
        setPasswordReset(false);
      } else {
        const res = await signInWithEmailAndPassword(auth, email, password);
        if (res.user.emailVerified) {
          localStorage.setItem("email", email);
          navigate("/");
        } else {
          console.log("Please verify your email.");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const singInwithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = auth.currentUser;
        localStorage.setItem("email", user.email);
        localStorage.setItem("userToken", token);
        navigate("/dashboard");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  document.body.className = styles.body;
  return (
    <>
      <Navbar />

      <div className={styles.header} style={{height: "20vh"}}></div>
      <div className={`d-flex justify-content-around ${styles.formContainer}`}>
        <Form className={styles.form} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              className={styles.input}
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          {!passwordReset && (
            <Form.Group controlId="formBasicPassword">
              <Form.Control
                className={styles.input}
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
          )}
          <div className={styles.buttonContainer}>
            <Button className={styles.button} variant="primary" type="submit">
              {passwordReset ? "Send Link" : "Login"}
            </Button>
          </div>
          {!passwordReset && (
            <div className={styles.forgotPasswordContainer}>
              <p
                style={{ cursor: "pointer" }}
                className={styles.forgotPasswordLink}
                onClick={() => setPasswordReset(true)}
              >
                Forgot Password?
              </p>
            </div>
          )}
          <div className={styles.registerContainer}>
            <p
              style={{ cursor: "pointer" }}
              className={styles.registerLink}
              onClick={() => navigate("/Register")}
            >
              Don't have an account? Register
            </p>
          </div>
          {!passwordReset && (
            <div className={styles.googleButtonContainer}>
              <GoogleButton
                style={{ backgroundColor: "black" }}
                className={styles.googleButton}
                onClick={() => singInwithGoogle()}
              />
            </div>
          )}
        </Form>
      </div>
    </>
  );
}
