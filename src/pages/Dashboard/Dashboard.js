import React, { useState } from "react";
import NavbarMain from "../../components/NavbarMain/NavbarMain";
import styles from "./Dashboard.module.css";
import Form from "react-bootstrap/Form";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import "holderjs";
import imagefile from "../../assets/cricket.jpg";
import imagefile2 from "../../assets/soccer.jpg";
import imagefile3 from "../../assets/basketball.jpg";
import Footer from "../../components/Footer";

export default function Dashboard() {
  const [search, setSearch] = useState("");
  console.log(search);
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
        <h2 className={styles.heading}>Welcome to IU Eventia !!!</h2>
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
      <Footer />
    </>
  );
}
