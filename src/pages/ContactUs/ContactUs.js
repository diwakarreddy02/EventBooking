import React from "react";
import styles from "./ContactUs.module.css";
import NavbarMain from "../../components/NavbarMain/NavbarMain";
import Footer from "../../components/Footer";

const ContactForm = () => {
  const [formStatus, setFormStatus] = React.useState("Send");

  const onSubmit = (e) => {
    e.preventDefault();
    setFormStatus("Submitting...");
    const { name, email, message } = e.target.elements;
    let conFom = {
      name: name.value,
      email: email.value,
      message: message.value,
    };
    console.log(conFom);
    setFormStatus("Submitted");
  };
  document.body.className = styles.body;
  return (
    <>
      
      <div style={{padding: "10%"}} >
        <h2 className="mb-3">Contact Us</h2>
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label className="form-label" htmlFor="name">
              Name:
            </label>
            <input className="form-control" type="text" id="name" required />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="email">
              Email:
            </label>
            <input className="form-control" type="email" id="email" required />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="message">
              Message:
            </label>
            <textarea className="form-control" id="message" rows="3" required />
          </div>
          <button className="btn btn-primary" type="submit" style={{backgroundColor:"black",border:"black"}}>
            {formStatus}
          </button>
        </form>
        <div className="contact-info" style={{marginTop:"1rem"}}>
          <h4>Contact Information</h4>
          <p>
            If you have any questions or enquiries, please feel free to contact
            us using the information below.
          </p>
          <ul>
            <li>
              <strong>Phone:</strong> (123) 456-7890
            </li>
            <li>
              <strong>Email:</strong> Indiana@iu.edu
            </li>
            <li>
              <strong>Address:</strong> Indiana University, Bloomington
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default ContactForm;
