import React from "react";
import "./Eventinfo.css";
import Eventinfodata from "./Eventinfodata";

const Eventinfo = () => {
  return (
    <div className="event">
      <h1>Popular Venues</h1>
      {/* <h3>IU Recreational Sports Center</h3> */}
      <Eventinfodata
        heading="IU Recreational Sports Center"
        text="The Indiana Recreational Sports Center, commonly referred to as the IU Rec Center, is a state-of-the-art fitness facility located 
                    on the campus of Indiana University in Bloomington, Indiana. The center offers a wide range of fitness and recreational activities for 
                    students, faculty, and the community. The facility spans over 500,000 square feet and boasts an impressive array of amenities. The main 
                    fitness center is equipped with top-of-the-line cardio and weightlifting equipment, as well as a variety of functional training areas. 
                    There is also a six-lane indoor track, multiple basketball and volleyball courts, racquetball and squash courts, and an indoor climbing wall.
                    The IU Rec Center also offers a variety of group fitness classes, including yoga, cycling, Pilates, and dance. In addition, the center has 
                    a large aquatic center, which includes an Olympic-sized swimming pool, a diving well, and a leisure pool with water slides and a lazy river."
        img1={
          "https://images.unsplash.com/photo-1570498839593-e565b39455fc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Zm9vdGJhbGwlMjB0b3VybmFtZW50fGVufDB8MXwwfHw%3D&auto=format&fit=crop&w=500&q=60"
        }
        img2={
          "https://images.unsplash.com/photo-1509077613385-f89402467146?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGZvb3RiYWxsJTIwdG91cm5hbWVudHxlbnwwfDF8MHx8&auto=format&fit=crop&w=500&q=60"
        }
      />
    </div>
  );
};

export default Eventinfo;
