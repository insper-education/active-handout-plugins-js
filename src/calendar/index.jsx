import React from "react";
import ReactDOM from "react-dom";
import Calendar from "./components/Calendar";

{
  const calendars = document.querySelectorAll(".admonition.calendar");

  calendars.forEach((calendar) => {
    let root = document.createElement("div");
    ReactDOM.render(<Calendar />, root);
    calendar.parentElement.replaceChild(root, calendar);
  });
}
