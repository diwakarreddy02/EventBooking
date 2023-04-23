import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { MenuItems } from "./NavbarMenuItems";
import { getAuth } from "firebase/auth";

const Navbar = () => {
  const [clicked, setClicked] = useState(false);

  const auth = getAuth();
  const isLoggedIn = localStorage.getItem("email");
  function handleLogout() {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("email");
        window.location.reload();
      })
      .catch((error) => {
        console.log("Error signing out:", error);
      });
  }

  return (
    <nav className="NavbarItems">
      <h1 className="navbar-logo">Eventia</h1>

      <div className="menu-icons" onClick={() => setClicked(!clicked)}>
        <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
      </div>

      <ul className={clicked ? "nav-menu active" : "nav-menu"}>
        {isLoggedIn &&
          MenuItems.map((item, index) => {
            return (
              <li key={index}>
                <Link className={item.cName} to={item.url}>
                  <i className={item.icon}></i>
                  {item.title}
                </Link>
              </li>
            );
          })}

        {!isLoggedIn ? (
          <>
            {" "}
            <Link to="/Login">
              <button> Login</button>
            </Link>
            <Link to="/Register">
              <button>Sign Up</button>
            </Link>
          </>
        ) : (
          <Link onClick={() => handleLogout()}>
            <button>LogOut</button>
          </Link>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
