import React from "react";
import "./Navbar.css";
import { Component } from "react";   
import { Link } from "react-router-dom"; 
import { MenuItems } from "./NavbarMenuItems";



class Navbar extends Component{
  state = {clicked: false};
  handleClick = () => {
    this.setState({clicked: !this.state.clicked})
  }
  render() {
    return(
      <nav className="NavbarItems">
        <h1 className="navbar-logo">Eventia</h1>

        <div className="menu-icons" onClick={this.handleClick}>
          <i className={this.state.clicked ? "fas fa-times"  : "fas fa-bars"}></i>
          {/* <i className="fas fa-times"></i> */}
        </div>

        <ul className={this.state.clicked ? "nav-menu active" : "nav-menu"}>
          {MenuItems.map((item, index) => {
            return (
              <li key={index}>
            <Link className={item.cName} to={item.url}>
              <i className={item.icon}></i>
              {item.title} 
            </Link  >
          </li>
            );
          })
          }
          <button>
            <Link to="/Register">Sign Up</Link>
          </button>
        </ul>
      </nav>
    );
  }
} 


export default Navbar;















// export default function NavbarMain() {
//   const navbarItems = ["Events", "Search", "Contact"];
//   return (
//     <div>
//       <Navbar className="NavbarContainer" collapseOnSelect expand="lg">
//         <Navbar.Brand href="/HomePage">
//           <p className="NavbarHeading pt-3">IU Eventia</p>
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls="responsive-navbar-nav" />
//         <Navbar.Collapse id="responsive-navbar-nav">
//           <Nav className="me-auto"></Nav>
//           <Nav>
//             {navbarItems.map((element, index) => (
//               <Nav.Link key={index} href={"/" + element}>
//                 {element}
//               </Nav.Link>
//             ))}
//           </Nav>
//         </Navbar.Collapse>
//       </Navbar>
//       <hr style={{ marginInline: "20%" }} />
//     </div>
//   );
// }
