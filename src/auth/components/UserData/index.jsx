import React, { useEffect, useState } from "react";

export default function UserData({ userUrl }) {
  const token = localStorage.getItem("user-token");
  const dataString = localStorage.getItem("user-data");
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!userUrl || !token || dataString) return;

    fetch(userUrl, {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => res.json())
      .then((userData) => {
        localStorage.setItem("user-data", JSON.stringify(userData));
        setData(userData);
      })
      .catch((err) => console.error(err));
  }, [userUrl, dataString, token]);

  useEffect(() => {
    if (!dataString && data) setData(null);
    else if (dataString) {
      const parsedData = JSON.parse(dataString);
      if (parsedData != data) setData(parsedData);
    }
  }, [dataString, data]);

  if (data) {
    const names = [data.first_name, data.last_name].filter((n) => !!n);
    const name = !!names.length ? names.join(" ") : data.username;
    return <div>{name}</div>;
  } else {
    return null;
  }
}
