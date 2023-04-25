import React, { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./NavbarMain.css";
import { db } from "../../config/firebase";
import { getDoc, doc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useLocation } from "react-router";


export default function NavbarMain() {
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const auth = getAuth();
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [navbarItems, setNavbarItems] = useState(
    localStorage.getItem("navbarItems")
      ? JSON.parse(localStorage.getItem("navbarItems"))
      : ["Events", "Search", "Contact", "Calendars", "Players", "ShowEvents"]
  );

  const [ProfileModalShow, setProfileModalShow] = useState(false);
  const [pathChanged, setPathChanged] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const docRef = doc(db, "Users", user.uid);
      getDoc(docRef).then((docSnap) => {
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
        }
      });
    });
  }, [ProfileModalShow]);

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
              setNavbarItems([...navbarItems, "AddVenue", "AddEvent"]);
              localStorage.setItem(
                "navbarItems",
                JSON.stringify([...navbarItems, "AddVenue", "AddEvent"])
              );
            }
          } else {
            if (navbarItems.includes("AddVenue")) {
              const updatedNavbarItems = navbarItems.filter(
                (item) => item !== "AddVenue" && item !== "AddEvent"
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
    <>
      <div>
        <Navbar className="NavbarContainer" collapseOnSelect expand="lg">
          <Navbar.Brand href="/Dashboard">
            <p className="NavbarHeading pt-3">Eventia</p>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              {navbarItems.map((element, index) => (
                <Nav.Link
                  key={index}
                  href={"/" + element}
                  style={{ color: "white" }}
                >
                  {element}
                </Nav.Link>
              ))}
              {auth.currentUser && (
                <Dropdown>
                  <Dropdown.Toggle
                    variant="link"
                    className="mt-1"
                    style={{
                      textDecoration: "none",
                      color: "white",
                      fontSize: "0.8em",
                    }}
                  >
                    {username}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setProfileModalShow(true)}>
                      Profile
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
      {ProfileModalShow ? (
        <Modal
          show={ProfileModalShow}
          onHide={() => setProfileModalShow(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>User Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <p>
                <strong>Name:</strong> {userDetails.firstName}{" "}
                {userDetails.lastName}
              </p>
              <p>
                <strong>Email:</strong> {userDetails.email}
              </p>
              <p>
                <strong>Role:</strong> {userDetails.role}
              </p>
              <p>
                <strong>Username:</strong> {userDetails.username}
              </p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setProfileModalShow(false)}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      ) : (
        <>
        </>
      )}
    </>
  );
}
