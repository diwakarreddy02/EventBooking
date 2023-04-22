import React, { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./NavbarMain.css";
import { db } from "../../config/firebase";
import { getDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getScrollGridClassNames } from "@fullcalendar/core/internal";

export default function NavbarMain() {
  const auth = getAuth();
  const [navbarItems, setNavbarItems] = useState(
    localStorage.getItem("navbarItems")
      ? JSON.parse(localStorage.getItem("navbarItems"))
      : ["Events", "Search", "Contact"]
  );

  useEffect(() => {
    if (auth.currentUser) {
      const docRef = doc(db, "Users", auth.currentUser.uid);
      getDoc(docRef).then((docSnap) => {
        if (docSnap.exists()) {
          if (docSnap.data().role === "Owner") {
            if (!navbarItems.includes("AddVenue")) {
              setNavbarItems([...navbarItems, "AddVenue"]);
              localStorage.setItem(
                "navbarItems",
                JSON.stringify([...navbarItems, "AddVenue"])
              );
            }
          } else {
            if (navbarItems.includes("AddVenue")) {
              const updatedNavbarItems = navbarItems.filter(
                (item) => item !== "AddVenue"
              );
              setNavbarItems(updatedNavbarItems);
              localStorage.setItem(
                "navbarItems",
                JSON.stringify(updatedNavbarItems)
              );
            }
          }
        }
      });
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.currentUser]);

  return (
    <div>
      <Navbar className="NavbarContainer" collapseOnSelect expand="lg">
        <Navbar.Brand href="/Dashboard" > 
          <p className="NavbarHeading pt-3" style={{}}>Eventia</p>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            {navbarItems.map((element, index) => (
              <Nav.Link key={index} href={"/" + element} style={{color:"white"}}>
                {element}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {/* <hr style={{ marginInline: "10%" }} /> */}
    </div>
  );
}
