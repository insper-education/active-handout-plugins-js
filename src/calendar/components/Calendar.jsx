import React, { useEffect, useState, useMemo } from "react";
import styled from "styled-components";
import ReactCalendar from "react-calendar";
import yaml from "js-yaml";
import ChevronLeft from "../../components/icons/ChevronLeft";
import ChevronRight from "../../components/icons/ChevronRight";

let currentDocument = window.location.href;
let lastSlash = currentDocument.lastIndexOf("/");

let CALENDAR_PATH = "";
if (lastSlash == currentDocument.length - 1) {
  CALENDAR_PATH = currentDocument + "calendar.yml";
} else {
  CALENDAR_PATH = currentDocument.substring(0, lastSlash) + "calendar.yml";
}

var getUrl = window.location;
var SITE_PATH =
  getUrl.protocol + "//" + getUrl.host + "/" + getUrl.pathname.split("/")[1];

const Comment = styled.span`
  && {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: auto;
    flex-grow: 1;
  }
`;

const BadgeList = styled.ul`
  && {
    width: 100%;
    margin-left: 0;
    list-style-type: none;
  }
`;

const badgeColors = {
  handoutPython: {
    default: "rgba(255, 242, 204, 1)",
    hover: "rgba(255, 242, 204, 0.8)",
  },
  handoutDesign: {
    default: "rgba(227, 240, 218, 1)",
    hover: "rgba(227, 240, 218, 0.8)",
  },
  handoutPygame: {
    default: "rgba(252, 228, 214, 1)",
    hover: "rgba(252, 228, 214, 0.8)",
  },
  handoutDjango: {
    default: "rgba(218, 225, 243, 1)",
    hover: "rgba(218, 225, 243, 0.8)",
  },
  shortAssignment: {
    default: "#F58220",
    hover: "#FAA61A",
  },
  assignment: {
    default: "#A62B4D",
    hover: "#C43150",
  },
  test: {
    default: "#414042",
    hover: "#414042",
  },
};
function badgeTextColor(badgeType) {
  if (badgeType.indexOf("handout") >= 0) {
    return "#252629";
  }
  return "#fafafa";
}
const translations = {
  handoutPython: "Handout Python",
  handoutDesign: "Handout Design/Liderança/Desenvolvimento ágil",
  handoutPygame: "Handout Pygame",
  handoutDjango: "Handout Django",
  shortAssignment: "Tarefa curta",
  assignment: "Tarefa longa",
  test: "Avaliação",
};
const legendData = Object.keys(badgeColors).map((name) => [
  translations[name],
  badgeColors[name].default,
]);

const Badge = styled.li`
  && {
    margin: 0 0 0.2rem;
    overflow: hidden;
    border-radius: 1rem;
    background-color: ${(props) => badgeColors[props.type]?.default};
    padding: 0.3rem 0.05rem;

    :hover {
      background-color: ${(props) => badgeColors[props.type]?.hover};
    }

    span,
    a {
      color: ${(props) => badgeTextColor(props.type)};
    }
  }
`;

const LegendContainer = styled.ul`
  && {
    margin: 0;
    padding: 0.2rem 0;
    list-style-type: none;
  }
`;

const LegendTitle = styled.label`
  display: block;
  font-size: 1.2rem;
  font-weight: bold;
  margin: 1rem 0 0.2rem;
`;

const LegendItem = styled.li`
  && {
    margin-left: 0;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    line-height: 1;
  }

  :before {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    content: "";
    background-color: ${(props) => props.color};
    margin-right: 0.1rem;
  }
`;

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

function formatDate(date) {
  return date.toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
}

function makeTileContent(data) {
  return function ({ date, view }) {
    if (view !== "month" || !data) {
      return "";
    }

    const dayData = data.calendar[formatDate(date)];

    if (!dayData) {
      return "";
    }
    const {
      handoutsPython,
      handoutsDesign,
      handoutsPygame,
      handoutsDjango,
      assignments,
      shortAssignments,
      tests,
      comment,
    } = dayData;
    let badges = [];
    if (handoutsPython) {
      badges = badges.concat(handoutsPython.map((h) => [h, "handoutPython"]));
    }
    if (handoutsDesign) {
      badges = badges.concat(handoutsDesign.map((h) => [h, "handoutDesign"]));
    }
    if (handoutsPygame) {
      badges = badges.concat(handoutsPygame.map((h) => [h, "handoutPygame"]));
    }
    if (handoutsDjango) {
      badges = badges.concat(handoutsDjango.map((h) => [h, "handoutDjango"]));
    }
    if (shortAssignments) {
      badges = badges.concat(
        shortAssignments.map((s) => [s, "shortAssignment"])
      );
    }
    if (assignments) {
      badges = badges.concat(assignments.map((a) => [a, "assignment"]));
    }
    if (tests) {
      badges = badges.concat(tests.map((t) => [{ [t]: null }, "test"]));
    }

    return (
      <>
        {!!badges.length && (
          <BadgeList>
            {badges.map(([entry, type]) => {
              const [name, link] = Object.entries(entry)[0];
              return (
                <Badge type={type} key={`badge__${name}`}>
                  {type === "test" && <span>{name}</span>}
                  {type !== "test" && (
                    <a href={SITE_PATH + `/${link}`}>{name}</a>
                  )}
                </Badge>
              );
            })}
          </BadgeList>
        )}
        {comment && <Comment>{comment}</Comment>}
      </>
    );
  };
}

function makeTileDisabled(data) {
  return function ({ activeStartDate, date, view }) {
    if (view !== "month" || !data) {
      return false;
    }

    const dayData = data.calendar[formatDate(date)];
    const isClassDay = data.classDays.indexOf(date.getDay()) >= 0;
    if (dayData) {
      return dayData.disabled;
    }
    return !isClassDay;
  };
}

function Legend({ label, color }) {
  return <LegendItem color={color}>{label}</LegendItem>;
}

export default function Calendar() {
  const [data, setData] = useState(null);
  const now = new Date();

  useEffect(() => {
    fetch(CALENDAR_PATH)
      .then((res) => res.text())
      .then((text) => {
        const data = yaml.load(text);
        setData(prepareData(data));
      });
  }, []);

  const tileContent = useMemo(() => {
    return makeTileContent(data);
  }, [data]);
  const tileDisabled = useMemo(() => {
    return makeTileDisabled(data);
  }, [data]);

  if (!data) {
    return null;
  }
  return (
    <div>
      <ReactCalendar
        defaultActiveStartDate={data.start}
        prevLabel={<ChevronLeft />}
        nextLabel={<ChevronRight />}
        prev2Label={null}
        next2Label={null}
        locale="pt-BR"
        formatMonthYear={(locale, date) => {
          const localized = date.toLocaleDateString("pt-BR", {
            year: "numeric",
            month: "long",
          });
          return localized.charAt(0).toUpperCase() + localized.slice(1);
        }}
        value={now}
        tileContent={tileContent}
        tileDisabled={tileDisabled}
        minDetail="month"
      />
      <LegendTitle>Legenda:</LegendTitle>
      <LegendContainer>
        {legendData.map(([label, color]) => (
          <Legend key={label} label={label} color={color} />
        ))}
      </LegendContainer>
    </div>
  );
}
