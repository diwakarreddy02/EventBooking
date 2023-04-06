import React, { useEffect, useState } from "react";
import "./SearchEvents.css";
import { db } from "../../config/firebase";
import { query } from "express";
import { element } from "prop-types";

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
