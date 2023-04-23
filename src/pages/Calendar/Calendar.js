import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "./Calendar.css";

const Calendar = () => {
  return (
    <div className="calendar__container" style={{ paddingInline: "5rem" }}>
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

export default Calendar;
