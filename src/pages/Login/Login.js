// import React, { useState } from "react";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { useNavigate } from "react-router-dom";
// import GoogleButton from "react-google-button";
// import styles from "./Login.module.css";
// import app from "../../config/firebase";
// import Alert from "react-bootstrap";

// import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// const provider = new GoogleAuthProvider(app);

// export default function Login() {
//   (function () {
//     let forms = document.querySelectorAll(".needs-validation");
//     Array.prototype.slice.call(forms).forEach(function (form) {
//       form.addEventListener(
//         "submit",
//         function (event) {
//           if (!form.checkValidity()) {
//             event.preventDefault();
//             event.stopPropagation();
//           }
//           form.classList.add("was-validated");
//         },
//         false
//       );
//     });
//   })();
//   const auth = getAuth();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [passwordReset, setPasswordReset] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const response = await signInWithEmailAndPassword(auth, email, password)
//       .then((res) => {
//         if (res.user.emailVerified) {
//           navigate("/dashboard");
//         } else {
//           console.log("please verify email");
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });

//     return response;
//   };

//   const singInwithGoogle = () => {
//     console.log("7");
//     signInWithPopup(auth, provider)
//       .then((result) => {
//         const credential = GoogleAuthProvider.credentialFromResult(result);
//         const token = credential.accessToken;
//         const user = result.user;
//         localStorage.setItem("userToken", token);
//         navigate("/dashboard");
//       })
//       .catch((error) => {
//         // Handle Errors here.
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         // The email of the user's account used.
//         const email = error.customData.email;
//         // The AuthCredential type that was used.
//         const credential = GoogleAuthProvider.credentialFromError(error);
//         // ...
//       });
//   };
//   document.body.className = styles.body;
//   return (
//     <>
//       <div className="header">
//         <h1>IU Eventia</h1>
//       </div>
//       <div
//         style={{ marginTop: "11%" }}
//         className="col-12 d-flex justify-content-around"
//       >
//         <Form className="formContainer" onSubmit={handleSubmit}>
//           <Form.Group className=" mb-3" controlId="formBasicEmail">
//             <Form.Label>Email address</Form.Label>
//             <Form.Control
//               type="email"
//               placeholder="Enter email"
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </Form.Group>
//           {!passwordReset ? (
//             <Form.Group className="mb-3" controlId="formBasicPassword">
//               <Form.Label>Password</Form.Label>
//               <Form.Control
//                 type="password"
//                 placeholder="Password"
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </Form.Group>
//           ) : (
//             <></>
//           )}
//           <div className="mx-5 mt-2 row-2">
//             <Button className="col-12 p-2" variant="primary" type="submit">
//               {passwordReset ? "Send Link" : "Login"}
//             </Button>
//           </div>
//           {!passwordReset ? (
//             <div className="d-flex justify-content-around mt-3">
//               <a
//                 style={{
//                   textDecoration: "none",
//                   color: "blue",
//                   cursor: "pointer",
//                 }}
//                 onClick={() => setPasswordReset(true)}
//               >
//                 Forgot Password ?
//               </a>
//             </div>
//           ) : (
//             <></>
//           )}
//           <div className="d-flex justify-content-around mt-3">
//             <a
//               style={{
//                 textDecoration: "none",
//                 color: "blue",
//                 cursor: "pointer",
//               }}
//               onClick={() => navigate("/registration")}
//             >
//               Do not have an account? Register
//             </a>
//           </div>
//           {!passwordReset ? (
//             <div className=" d-flex justify-content-around mt-4">
//               {" "}
//               <GoogleButton onClick={() => singInwithGoogle()} />
//             </div>
//           ) : (
//             <></>
//           )}
//         </Form>
//       </div>
//     </>
//   );
// }




import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import GoogleButton from "react-google-button";
import styles from "./Login.module.css";
import app from "../../config/firebase";
import Alert from "react-bootstrap";

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
      const res = await signInWithEmailAndPassword(auth, email, password);
      if (res.user.emailVerified) {
        navigate("/dashboard");
      } else {
        console.log("Please verify your email.");
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
        const user = result.user;
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
      <div className={styles.header}>
        <h1 className={styles.heading}>IU Eventia</h1>
        <h2 className={styles.subHeading}>
          Events and Venue booking made easy
        </h2>
      </div>
      <div className={`d-flex justify-content-around ${styles.formContainer}`}>
        <Form className={styles.form} onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label className={styles.label}>Email address</Form.Label>
            <Form.Control
              className={styles.input}
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          {!passwordReset && (
            <Form.Group controlId="formBasicPassword">
              <Form.Label className={styles.label}>Password</Form.Label>
              <Form.Control
                className={styles.input}
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
          )}
          <div className={styles.buttonContainer}>
            <Button
              className={styles.button}
              variant="primary"
              type="submit"
            >
              {passwordReset ? "Send Link" : "Login"}
            </Button>
          </div>
          {!passwordReset && (
            <div className={styles.forgotPasswordContainer}>
              <a
                className={styles.forgotPasswordLink}
                onClick={() => setPasswordReset(true)}
              >
                Forgot Password?
              </a>
            </div>
          )}
          <div className={styles.registerContainer}>
            <a
              className={styles.registerLink}
              onClick={() => navigate("/registration")}
            >
              Don't have an account? Register
            </a>
          </div>
          {!passwordReset && (
            <div className={styles.googleButtonContainer}>
              <GoogleButton
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