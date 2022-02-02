import React from "react";
import ReactDOM from "react-dom";
import UserData from "./components/UserData";
import { cache } from "../services/auth";
import { redirectTo } from "../services/request";
import { renderAuthPage } from "./auth-page";

const renderUserData = () => {
  const nav = document.getElementsByClassName("md-header__inner")?.[0];
  const containerClass = "user__container";
  if (!nav || nav.getElementsByClassName(containerClass).length) return;

  const root = document.createElement("div");
  ReactDOM.render(<UserData />, root);
  root.classList.add(containerClass);

  nav.appendChild(root);
};

const redirectIfNotSignedIn = (watchUrlPattern: string) => {
  const pathnameRegex = new RegExp(watchUrlPattern);
  const hasAuth = !!window.location.pathname.match(pathnameRegex);

  if (hasAuth) {
    if (!cache.getToken()) {
      const mountPoint = window.ihandout_config["mount-point"] || "";
      redirectTo(`${mountPoint}login/?redirectTo=${window.location.href}`);
    }
  }
};

{
  const watchUrlPattern = window.ihandout_config.auth?.["watch-urls"];
  if (watchUrlPattern) {
    renderUserData();
    redirectIfNotSignedIn(watchUrlPattern);
  }

  renderAuthPage();
}
