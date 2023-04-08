import React from "react";
import "./ContactUs.css";
import { db } from "../../config/firebase";
import { addDoc, collection } from "firebase/firestore";
import { Form } from "react-bootstrap";

const ContactForm = () => {
  const [formStatus, setFormStatus] = React.useState("Send");
  const onSubmit = (e) => {
    e.preventDefault();
    setFormStatus("Submitting...");
    const { Name, Email, Message } = e.target.elements;
    addDoc(collection(db, "Users"), {
      Name: Name.value,
      Email: Email.value,
      Message: Message.value,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="body">
      <div className="container mt-5">
        <h2 className="mb-3">Contact IU Eventia</h2>
        <Form onSubmit={onSubmit}>
          <div className="mb-3">
            <label className="form-label" htmlFor="name">
              Name
            </label>
            <input className="form-control" type="text" id="name" required />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input className="form-control" type="email" id="email" required />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="message">
              Message
            </label>
            <textarea className="form-control" id="message" required />
          </div>
          <button className="btn btn-danger" type="submit">
            {formStatus}
          </button>
        </Form>
      </div>
    </div>
  );
};
export default ContactForm;
