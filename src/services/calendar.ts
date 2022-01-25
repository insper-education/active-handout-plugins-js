import React, { useEffect, useState } from "react";
import yaml from "js-yaml";

const MOUNT_POINT = window.ihandout_config["mount-point"];
const CALENDAR_PATH = MOUNT_POINT + "calendar.yml";

export interface IColor {
  default: string;
  hover: string;
}

export interface IDType {
  title: string;
  color: IColor;
  textColor: string;
}

export interface ICalendarBadge {
  label: string;
  dtype: string;
  uri?: string;
  date?: string;
}

export interface IDayEntry {
  badges?: ICalendarBadge[];
  disabled?: boolean;
  comment?: string;
}

export interface ICalendarData {
  start: Date | string;
  end: Date | string;
  classDays: number[];
  dtypes: Map<string, IDType>;
  calendar: Map<string, IDayEntry>;
}

export function parseDate(dateStr: string): Date {
  const parts = dateStr.split("/");
  const [day, month, year] = parts.map((s) => parseInt(s));
  return new Date(year, month - 1, day);
}

function prepareData(data: ICalendarData): ICalendarData {
  data.start = parseDate(data.start as string);
  data.end = parseDate(data.end as string);
  return data;
}

export function useCalendarData(): ICalendarData | null {
  const [data, setData] = useState<ICalendarData | null>(null);

  useEffect(() => {
    fetch(CALENDAR_PATH)
      .then((res) => res.text())
      .then((text) => {
        setData(prepareData(yaml.load(text) as ICalendarData));
      });
  }, []);

  return data;
}
