import { useState } from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ContactForm from "./pages/ContactUs/ContactUs";
import { Route, Routes } from "react-router-dom";
import SportSearch from "./pages/SportSearch/SportSearch";
import MyEvents from "./pages/MyEvents/MyEvents";
import BookingPage from "./pages/Bookingpage/Bookingpage";
import AddVenue from "./pages/AddVenue/AddVenue";
import AddEvent from "./pages/AddEvent/AddEvent";
import HomePage from "./pages/HomePage/HomePage";
import AboutUs from "./pages/AboutUs/AboutUs";
import Calendars from "./pages/Calendars/Calendars";
import Players from "./pages/Players/Players";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer";
import SearchEvents from "./pages/SearchEvents/SearchEvents";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/Register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Search" element={<SportSearch />} />
        <Route path="/ContactUs" element={<ContactForm />} />
        <Route path="/Contact" element={<ContactForm />} />
        <Route path="/Calendars" element={<Calendars />} />
        <Route path="/Events" element={<SearchEvents />} />
        <Route path="/BookingPage" element={<BookingPage />} />
        <Route path="/Booking" element={<BookingPage />} />
        <Route path="/AddVenue" element={<AddVenue />} />
        <Route path="/AddEvent" element={<AddEvent />} />
        <Route path="/MyEvents" element={<MyEvents />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/Players" element={<Players />} />
        <Route path="/SportSearch" element={<SportSearch />} />\{" "}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
