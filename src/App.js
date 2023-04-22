import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ContactForm from "./pages/ContactUs/ContactUs";
import { Route, Routes } from "react-router-dom";
import SportSearch from "./pages/SportSearch/SportSearch";
import SearchEvents from "./pages/SearchEvents/SearchEvents";
import BookingPage from "./pages/Bookingpage/Bookingpage";
import AddVenue from "./pages/AddVenue/AddVenue";
import AddEvent from "./pages/AddEvent/AddEvent";
import HomePage from "./pages/HomePage/HomePage";
import AboutUs from "./pages/AboutUs/AboutUs";
import UserDetails from "./pages/UserDetails/UserDetails";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/Register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Search" element={<SportSearch />} />
        <Route path="/ContactUs" element={<ContactForm />} />
        <Route path="/Contact" element={<ContactForm />} />
        <Route path="/Events" element={<SearchEvents />} />
        <Route path="/BookingPage" element={<BookingPage />} />
        <Route path="/Booking" element={<BookingPage />} />
        <Route path="/UserDetails" element={<UserDetails />} />
        <Route path="/AddVenue" element={<AddVenue />} />
        <Route path="/AddEvent" element={<AddEvent />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/SportSearch" element={<SportSearch />} />\{" "}
      </Routes>
    </div>
  );
}

export default App;
