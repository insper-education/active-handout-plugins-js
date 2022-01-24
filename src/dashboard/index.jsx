import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import UserProgress from "./components/UserProgress";

const queryClient = new QueryClient();

function Dashboard() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProgress />
    </QueryClientProvider>
  );
}

{
  const dashboards = document.getElementsByClassName("dashboard");
  const user = JSON.parse(localStorage.getItem("user-data"));

  if (dashboards.length > 0) {
    const dashboard = dashboards[0];

    if (user) {
      const newTitle = `Olá, ${user.first_name || user.username}!`;
      document.getElementsByTagName("h1")[0].innerHTML = newTitle;
    }

    const root = document.createElement("div");
    ReactDOM.render(<Dashboard user={user} />, root);
    dashboard.parentElement.replaceChild(root, dashboard);
  }
}
