// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   createUserWithEmailAndPassword,
//   sendEmailVerification,
// } from "firebase/auth";
// import { auth } from "../../config/firebase";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import InputGroup from "react-bootstrap/InputGroup";
// import Row from "react-bootstrap/Row";
// import "./Register.css";
// import { db } from "../../config/firebase";
// import { addDoc, collection } from "firebase/firestore";

// export default function FormExample() {
//   const [validated, setValidated] = useState(false);
//   const [FirstName, setFirstName] = useState("");
//   const [LastName, setLastName] = useState("");
//   const [Username, setuser] = useState("");
//   const [Email, setEmail] = useState("");
//   const [Role, setRole] = useState("Owner");
//   const [Password, setPassword] = useState("");
//   // Function to post data to Firestore
//   console.log(Role);
//   const Registersubmit = async (e) => {
//     e.preventDefault();
//     setValidated(true);
//     await createUserWithEmailAndPassword(auth, Email, Password)
//       .then(async (res) => {
//         const euser = auth.currentUser;
//         sendEmailVerification(euser);
//         console.log(res);
//         await addDoc(collection(db, "Users"), {
//           FirstName: FirstName,
//           LastName: LastName,
//           Email: Email,
//           Role: Role,
//           UserName: Username,
//         })
//           .then((res) => {
//             console.log(res);
//           })
//           .catch((err) => {
//             console.log(err);
//           });
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   return (
//     <>
//       <div className="header">
//         <h1>Registration</h1>
//       </div>
//       <div
//         style={{ marginTop: "12%" }}
//         className="col-12 d-flex justify-content-around"
//       >
//         <Form
//           className="formContainerReg p-5"
//           noValidate
//           validated={validated}
//           onSubmit={Registersubmit}
//         >
//           <Row className="mb-3">
//             <Form.Group className="col-12 mb-3">
//               <Form.Select
//                 name="submissiontType"
//                 onChange={(e) => setRole(e.target.value)}
//               >
//                 <option value="Owner">Owner</option>
//                 <option value="Player">Player</option>
//               </Form.Select>
//             </Form.Group>
//             <Form.Group className="col-6" controlId="validationCustom01">
//               <Form.Control
//                 required
//                 type="text"
//                 placeholder="First name"
//                 onChange={(e) => setFirstName(e.target.value)}
//               />
//               <Form.Control.Feedback type="invalid">
//                 Please enter valid First Name
//               </Form.Control.Feedback>
//             </Form.Group>
//             <Form.Group className="col-6" controlId="validationCustom02">
//               <Form.Control
//                 required
//                 type="text"
//                 placeholder="Last Name"
//                 onChange={(e) => setLastName(e.target.value)}
//               />
//               <Form.Control.Feedback type="invalid">
//                 Please enter valid Last Name
//               </Form.Control.Feedback>
//             </Form.Group>
//           </Row>

//           <Row className="mb-3">
//             <Form.Group className="col-6" controlId="validationCustomUsername">
//               <InputGroup hasValidation>
//                 <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
//                 <Form.Control
//                   type="text"
//                   placeholder="Username"
//                   aria-describedby="inputGroupPrepend"
//                   required
//                   onChange={(e) => setuser(e.target.value)}
//                 />
//                 <Form.Control.Feedback type="invalid">
//                   Please choose a username.
//                 </Form.Control.Feedback>
//               </InputGroup>
//             </Form.Group>

//             <Form.Group className="col-6">
//               <Form.Control
//                 type="email"
//                 placeholder="Email"
//                 required
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//               <Form.Control.Feedback type="invalid">
//                 Enter valid Email address.
//               </Form.Control.Feedback>
//             </Form.Group>
//           </Row>
//           <Row className="mx">
//             <Form.Group className="col-6" controlId="validationCustom03">
//               <Form.Control
//                 type="password"
//                 placeholder="Password"
//                 required
//                 minLength={8}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <Form.Control.Feedback type="invalid">
//                 Please enter valid password.
//               </Form.Control.Feedback>
//             </Form.Group>

//             <Form.Group className="col-6" controlId="validationCustom04">
//               <Form.Control
//                 type="password"
//                 placeholder="Re-enter password"
//                 required
//                 minLength={8}
//                 pattern={Password}
//               />
//               <Form.Control.Feedback type="invalid">
//                 Password donot match
//               </Form.Control.Feedback>
//             </Form.Group>
//           </Row>
//           <div className="mt-4 d-flex  flex-column ">
//             <Button className="mx-5" type="submit">
//               Register
//             </Button>

//             <Link
//               to="/Login"
//               className="mt-4 "
//               style={{ textDecoration: "none" }}
//             >
//               Already having account? Login Here
//             </Link>
//           </div>
//         </Form>
//       </div>
//     </>
//   );
// }




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
import styles from "./Register.module.css";
import { db } from "../../config/firebase";
import { setDoc, doc } from "firebase/firestore";

export default function Register() {
  const [validated, setValidated] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Owner");
  const [password, setPassword] = useState("");

  // Function to post data to Firestore
  console.log(role);
  const registerSubmit = async (e) => {
    e.preventDefault();
    setValidated(true);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      await sendEmailVerification(user);
      console.log(res);
      /*
      const docRef = await addDoc(collection(db, "Users"), {
        firstName: firstName,
        lastName: lastName,
        email: email,
        role: role,
        username: username,
      });
      */
      const docRef = await setDoc(doc(db, "Users", user.uid), {
        firstName: firstName,
        lastName: lastName,
        email: email,
        role: role,
        username: username,
      });
      console.log(docRef);
    } catch (err) {
      console.log(err);
    }
  };

  document.body.className = styles.body;

  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.title}>Welcome to IU Eventia</h1>
        <h2 className={styles.subtitle}>Registration</h2>
      </div>
      <div style={{ marginTop: "10%" }} className="col-12 d-flex justify-content-around">
        <Form
          className={styles.formContainerReg}
          noValidate
          validated={validated}
          onSubmit={registerSubmit}
        >
          <Row className={styles.mb_3}>
            <Form.Group className="col-12 mb-3">
              <Form.Label className={styles.label}>Role</Form.Label>
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
            <Form.Group className={styles.col6} controlId="validationCustom01">
              <Form.Label className={styles.label}>First name</Form.Label>
              <Form.Control
                className={styles.input}
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
            <Form.Group className={styles.col6} controlId="validationCustom02">
              <Form.Label className={styles.label}>Last name</Form.Label>
              <Form.Control
                className={styles.input}
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
            <Form.Group className={styles.col12} controlId="validationCustomUsername">
              <Form.Label className={styles.label}>Username</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text className={styles.input} id="inputGroupPrepend">@</InputGroup.Text>
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
            <Form.Group className={styles.col12} controlId="validationCustomEmail">
              <Form.Label className={styles.label}>Email</Form.Label>
              <Form.Control
                className={styles.input}
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
            <Form.Group className={styles.col12} controlId="validationCustomPassword">
              <Form.Label className={styles.label}>Password</Form.Label>
              <Form.Control
                className={styles.input}
                type="password"
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid password.
              </Form.Control.Feedback>
            </Form.Group>
            <Button className={styles.button} type="submit">
              Register
            </Button>
          </Row>
          <p className={styles.text}>
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
