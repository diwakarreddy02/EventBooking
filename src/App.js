import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ContactForm from "./pages/ContactUs/ContactUs";
import { Route, Routes } from "react-router-dom";
import SportSearch from "./pages/SportSearch/SportSearch";
import SearchEvents from "./pages/SearchEvents/SearchEvents";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/registration" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Search" element={<SportSearch />} />
        <Route path="/Contact" element={<ContactForm />} />
        <Route path="/Event" element={<SearchEvents />} />
      </Routes>
    </div>
  );
}

export default App;
