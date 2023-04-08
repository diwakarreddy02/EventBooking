// import React from "react";
// import "./ContactUs.css";
// import { db } from "../../config/firebase";
// import { addDoc, collection } from "firebase/firestore";
// import { Form } from "react-bootstrap";

// const ContactForm = () => {
//   const [formStatus, setFormStatus] = React.useState("Send");
//   const onSubmit = (e) => {
//     e.preventDefault();
//     setFormStatus("Submitting...");
//     const { Name, Email, Message } = e.target.elements;
//     addDoc(collection(db, "Users"), {
//       Name: Name.value,
//       Email: Email.value,
//       Message: Message.value,
//     })
//       .then((res) => {
//         console.log(res);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
//   return (
//     <div className="body">
//       <div className="container mt-5">
//         <h2 className="mb-3">Contact IU Eventia</h2>
//         <Form onSubmit={onSubmit}>
//           <div className="mb-3">
//             <label className="form-label" htmlFor="name">
//               Name
//             </label>
//             <input className="form-control" type="text" id="name" required />
//           </div>
//           <div className="mb-3">
//             <label className="form-label" htmlFor="email">
//               Email
//             </label>
//             <input className="form-control" type="email" id="email" required />
//           </div>
//           <div className="mb-3">
//             <label className="form-label" htmlFor="message">
//               Message
//             </label>
//             <textarea className="form-control" id="message" required />
//           </div>
//           <button className="btn btn-danger" type="submit">
//             {formStatus}
//           </button>
//         </Form>
//       </div>
//     </div>
//   );
// };
// export default ContactForm;




// import React from "react";
// import styles from "./ContactUs.module.css";
// import { db } from "../../config/firebase";
// import { addDoc, collection } from "firebase/firestore";
// import { Form } from "react-bootstrap";

// const ContactForm = () => {
//   const [formStatus, setFormStatus] = React.useState("Send");
//   const onSubmit = (e) => {
//     e.preventDefault();
//     setFormStatus("Submitting...");
//     const { Name, Email, Message } = e.target.elements;
//     addDoc(collection(db, "Users"), {
//       Name: Name.value,
//       Email: Email.value,
//       Message: Message.value,
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
//     <div className="body">
//       <div className="container mt-5">
//         <h2 className="mb-3">Contact IU Eventia</h2>
//         <Form onSubmit={onSubmit}>
//           <div className="mb-3">
//             <label className="form-label" htmlFor="name">
//               Name
//             </label>
//             <input className="form-control" type="text" id="name" required />
//           </div>
//           <div className="mb-3">
//             <label className="form-label" htmlFor="email">
//               Email
//             </label>
//             <input className="form-control" type="email" id="email" required />
//           </div>
//           <div className="mb-3">
//             <label className="form-label" htmlFor="message">
//               Message
//             </label>
//             <textarea className="form-control" id="message" required />
//           </div>
//           <button className="btn btn-danger" type="submit">
//             {formStatus}
//           </button>
//         </Form>
//         <div className="contact-info">
//         <h4>Contact Information</h4>
//         <p>
//           If you have any questions or enquiries, please feel free to contact
//           us using the information below.
//         </p>
//         <ul>
//           <li>
//             <strong>Phone:</strong> (123) 456-7890
//           </li>
//           <li>
//             <strong>Email:</strong> Indiana@iu.edu
//           </li>
//           <li>
//             <strong>Address:</strong> Indiana University, Bloomington
//           </li>
//         </ul>
//       </div>
//       </div>
//     </div>
//   );
// };
// export default ContactForm;


import React from "react";
import styles from "./ContactUs.module.css";

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
<div className="container mt-5">
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
<textarea className="form-control" id="message" rows="5" required />
</div>
<button className="btn btn-primary" type="submit">
{formStatus}
</button>
</form>
<div className="contact-info">
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

);
};


export default ContactForm;