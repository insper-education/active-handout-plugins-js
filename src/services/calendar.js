import React, { useEffect, useState } from "react";
import yaml from "js-yaml";

const MOUNT_POINT = window.ihandout_config["mount-point"];
const CALENDAR_PATH = MOUNT_POINT + "calendar.yml";

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
