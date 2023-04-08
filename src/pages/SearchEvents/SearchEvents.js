// import React, { useEffect, useState } from "react";
// import "./SearchEvents.css";
// import { db } from "../../config/firebase";

// export default function SearchEvents() {
//   const [query, setquery] = useState("");
//   const fetchAllEvents = async () => {
//     const response = db.collection("Events");
//     const data = await response.get();
//     data.docs.forEach((item) => {
//       setquery([...query, item.data()]);
//     });
//   };
//   useEffect(() => {
//     fetchAllEvents();
//   }, []);
//   return (
//     <div>
//       {query &&
//         query.map((element) => {
//           return (
//             <div className="container">
//               <h4>{element.venue}</h4>
//               <p>{element.city}</p>
//               <p>{element.sport}</p>
//             </div>
//           );
//         })}
//     </div>
//   );
// }

// import { useState, useEffect } from "react";
// import firebase from "firebase/app";
// import "firebase/firestore";

// export default function SearchEvents() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const db = firebase.firestore();
//     db.collection("Events").onSnapshot((snapshot) => {
//       const items = [];
//       snapshot.forEach((doc) => {
//         const data = doc.data();
//         items.push({ id: doc.id, ...data });
//       });
//       setData(items);
//     });
//   }, []);

//   return (
//     <div className="card-container">
//       {data.map((item) => (
//         <Card>
//           key={item.id}
//           srno={item.srno}
//           city={item.city}
//           sport={item.sport}
//           venue={item.venue}
//         </Card>
//       ))}
//     </div>
//   );
// }
