import React, { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./NavbarMain.css";
import { db } from "../../config/firebase";
import { getDoc, doc } from "firebase/firestore";
import { getScrollGridClassNames } from "@fullcalendar/core/internal";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";
import Dropdown from "react-bootstrap/Dropdown";
import { useLocation } from "react-router-dom";
import { faWindowMaximize } from "@fortawesome/free-solid-svg-icons";

export default function NavbarMain() {
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const auth = getAuth();
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [navbarItems, setNavbarItems] = useState(
    localStorage.getItem("navbarItems")
      ? JSON.parse(localStorage.getItem("navbarItems"))
      : ["Events", "Search", "Contact", "AddEvent"]
  );

  const [pathChanged, setPathChanged] = useState(false);

  useEffect(() => {
    setPathChanged(!pathChanged);
  }, [location.pathname]);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const docRef = doc(db, "Users", user.uid);
      getDoc(docRef).then((docSnap) => {
        if (docSnap.exists()) {
          setUsername(docSnap.data().username);
        }
      });
    }
  });

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
  }, [auth.currentUser, pathChanged, navbarItems]);
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUsername("");
        localStorage.removeItem("navbarItems");
        forceUpdate();
        window.history.replaceState(null, "", "/login");
        window.location.reload();
      })
      .catch((error) => {
        console.log("Error signing out:", error);
      });
  };

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
            {username && (
      <Dropdown>
        <Dropdown.Toggle variant="link" id="dropdown-basic">
          {username}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="/UserDetails">Profile</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
              )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {/* <hr style={{ marginInline: "10%" }} /> */}
    </div>
  );
}
