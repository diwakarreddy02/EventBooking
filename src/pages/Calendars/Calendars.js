import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "./Calendar.css";

const Calendars = () => {
  return (
    <div className="calendar__container" style={{ paddingInline: "5rem", padding: "80px" }}>
      <FullCalendar
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
      />{" "}
    </div>
  );
};

export default Calendars;
