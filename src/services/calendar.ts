import React, { useEffect, useState } from "react";
import yaml from "js-yaml";

const CALENDAR_PATH = window.ihandout_config.calendar;

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
  url?: string;
  date?: string;
}

export interface IDayEntry {
  badges?: ICalendarBadge[];
  disabled?: boolean;
  comment?: string;
}

interface IDTypes {
  [key: string]: IDType;
}

interface IDayEntries {
  [key: string]: IDayEntry;
}

export interface ICalendarData {
  start: Date | string;
  end: Date | string;
  classDays: number[];
  dtypes: IDTypes;
  calendar: IDayEntries;
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
    if (!CALENDAR_PATH) return;
    fetch(CALENDAR_PATH)
      .then((res) => res.text())
      .then((text) => {
        setData(prepareData(yaml.load(text) as ICalendarData));
      });
  }, [CALENDAR_PATH]);

  return data;
}
