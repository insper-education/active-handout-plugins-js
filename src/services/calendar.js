import React, { useEffect, useState } from "react";

let currentDocument = window.location.href;
let lastSlash = currentDocument.lastIndexOf("/");

let CALENDAR_PATH = "";
if (lastSlash == currentDocument.length - 1) {
  CALENDAR_PATH = currentDocument + "calendar.yml";
} else {
  CALENDAR_PATH = currentDocument.substring(0, lastSlash) + "calendar.yml";
}

function parseDate(dateStr) {
  const parts = dateStr.split("/");
  const [day, month, year] = parts.map((s) => parseInt(s));
  return new Date(year, month - 1, day);
}

function prepareData(data) {
  data.start = parseDate(data.start);
  data.end = parseDate(data.end);
  return data;
}

export function useCalendarData() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(CALENDAR_PATH)
      .then((res) => res.text())
      .then((text) => {
        setData(prepareData(yaml.load(text)));
      });
  }, []);

  return data;
}
