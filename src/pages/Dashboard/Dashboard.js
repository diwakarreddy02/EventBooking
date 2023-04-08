// import React, { useState } from "react";
// import NavbarMain from "../../components/NavbarMain/NavbarMain";
// import styles from "./Dashboard.module.css";
// import Form from "react-bootstrap/Form";
// import { getAuth, signOut } from "firebase/auth";
// import { useNavigate } from "react-router-dom";
// import Carousel from "react-bootstrap/Carousel";

// export default function Dashboard() {
//   const [search, setSearch] = useState("");
//   const auth = getAuth();
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     await signOut(auth);
//     navigate("/login", { replace: true });
//     console.log(search);
//   };
//   document.body.className = styles.body;
//   return (
//     <>
//       <NavbarMain />
//       <div className="dashBoardContent">
//         <h2>Make Your Dream Come True</h2>
//         <h2>Meet your favorite artists, sport teams and parties</h2>
//       </div>
//       <div className="d-flex justify-content-around">
//         <Form className="col-3">
//           <Form.Control
//             type="search"
//             onChange={(e) => setSearch(e.target.value)}
//             placeholder="Search"
//             className="me-2 "
//             aria-label="Search"
//           />
//         </Form>
//       </div>
//       <div>
//         <Carousel>
//           <Carousel.Item interval={1000}>
//             <img
//               className="d-block w-100"
//               src="holder.js/800x400?text=First slide&bg=373940"
//               alt="First slide"
//             />
//             <Carousel.Caption>
//               <h3>First slide label</h3>
//               <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
//             </Carousel.Caption>
//           </Carousel.Item>
//           <Carousel.Item interval={500}>
//             <img
//               className="d-block w-100"
//               src="holder.js/800x400?text=Second slide&bg=282c34"
//               alt="Second slide"
//             />
//             <Carousel.Caption>
//               <h3>Second slide label</h3>
//               <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
//             </Carousel.Caption>
//           </Carousel.Item>
//           <Carousel.Item>
//             <img
//               className="d-block w-100"
//               src="holder.js/800x400?text=Third slide&bg=20232a"
//               alt="Third slide"
//             />
//             <Carousel.Caption>
//               <h3>Third slide label</h3>
//               <p>
//                 Praesent commodo cursus magna, vel scelerisque nisl consectetur.
//               </p>
//             </Carousel.Caption>
//           </Carousel.Item>
//         </Carousel>
//       </div>
//       <div style={{ height: "100vh" }}>
//         <button onClick={handleLogout}>Logout</button>
//       </div>
//     </>
//   );
// }


import React, { useState } from "react";
import NavbarMain from "../../components/NavbarMain/NavbarMain";
import styles from "./Dashboard.module.css";
import Form from "react-bootstrap/Form";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import "holderjs";
import imagefile from "../../assets/cricket.jpg"
import imagefile2 from "../../assets/soccer.jpg"
import imagefile3 from "../../assets/basketball.jpg"

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const auth = getAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login", { replace: true });
  };

  document.body.className = styles.body;

  return (
    <>
      <NavbarMain />
      <div className={styles.dashboardContent}>
        <h2 className={styles.heading}>
          Make Your Dreams Come True - Meet Your Favorite Artists, Sports Teams, and Parties
        </h2>
      </div>
      <div className="d-flex justify-content-around">
        <Form className="col-3">
          <Form.Control
            type="search"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            className={`${styles.searchInput} me-2`}
            aria-label="Search"
          />
        </Form>
      </div>
      <div className={styles.carouselContainer}>
        <Carousel>
          <Carousel.Item interval={1000}>
            <img
              className={`${styles.carouselImage} d-block w-100`}
              src={imagefile}
              alt="First slide"
            />
            <Carousel.Caption>
              <h3 className={styles.carouselCaptionHeading}>Cricket</h3>
              <p className={styles.carouselCaptionText}>
                Cricket a game enjoyed by millions
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={500}>
            <img
              className={`${styles.carouselImage} d-block w-100`}
              src={imagefile2}
              alt="Second slide"
            />
            <Carousel.Caption>
              <h3 className={styles.carouselCaptionHeading}>Soccer</h3>
              <p className={styles.carouselCaptionText}>
                No caption need as it's the most popular sport.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className={`${styles.carouselImage} d-block w-100`}
              src={imagefile3}
              alt="Third slide"
            />
            <Carousel.Caption>
              <h3 className={styles.carouselCaptionHeading}>Basketball</h3>
              <p className={styles.carouselCaptionText}>
                This is where legends are made.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
      <div className={styles.logoutButtonContainer}>
        <button className={styles.logoutButton} onClick={handleLogout}>Logout</button>
      </div>
    </>
  );
}
