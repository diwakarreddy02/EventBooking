import React from "react";
import "./Eventcard.css";
import Eventcarddata from "./Eventcarddata";

function Eventcard() {
  return (
    <div className="eventcard">
      <h1>Other Events</h1>

      <div className="eventcardinfo">
        <Eventcarddata
          image={
            "https://images.unsplash.com/photo-1529316464151-695eb09f22a0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8dGFibGUlMjB0ZW5uaXN8ZW58MHwxfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
          }
          heading="Table Tennis"
          text="Book your slot to play Table Tennis now"
        />
        <Eventcarddata
          image={
            "https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8c3dpbW1pbmclMjBwb29sfGVufDB8MXwwfHw%3D&auto=format&fit=crop&w=500&q=60"
          }
          heading="Swimming"
          text="Book your slot to swim now"
        />
        <Eventcarddata
          image={
            "https://images.unsplash.com/photo-1544070928-135893793bdc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fEJpbGxpYXJkc3xlbnwwfDF8MHx8&auto=format&fit=crop&w=500&q=60"
          }
          heading="Billiards"
          text="Book your slot to play Billiards now"
        />
      </div>
    </div>
  );
}

export default Eventcard;
