import React from "react";
import ReactDOM from "react-dom";
import LoginPage from "./components/LoginPage";
import UserData from "./components/UserData";
import { cache } from "../services/auth";
import { redirectTo } from "../services/request";

const renderUserData = () => {
  const nav = document.getElementsByClassName("md-header__inner")?.[0];
  const containerClass = "user__container";
  if (!nav || nav.getElementsByClassName(containerClass).length) return;

  const root = document.createElement("div");
  ReactDOM.render(<UserData />, root);
  root.classList.add(containerClass);

  nav.appendChild(root);
};

{
  const wathUrlPattern = window.ihandout_config.auth?.["watch-urls"];
  if (wathUrlPattern) {
    renderUserData();

    const pathnameRegex = new RegExp(wathUrlPattern);
    const hasAuth = !!window.location.pathname.match(pathnameRegex);

    if (hasAuth) {
      if (!cache.getToken()) {
        const mountPoint = window.ihandout_config["mount-point"] || "";
        redirectTo(`${mountPoint}login/?redirectTo=${window.location.href}`);
      }
    }
  }

  // Render auth page
  const authPages = document.getElementsByClassName("admonition auth");

  if (authPages.length > 0) {
    const authPage = authPages[0];
    const title = authPage
      .getElementsByClassName("admonition-title")[0]
      ?.textContent.trim();
    const logo = authPage.querySelector("img[alt='logo']")?.src;

    if (authPage.classList.contains("login")) {
      const lostPasswordUrl = [...authPage.getElementsByTagName("a")].filter(
        (a) => a.textContent.trim() === "lost-password"
      )[0];

      const root = document.createElement("div");
      ReactDOM.render(
        <LoginPage
          title={title}
          logo={logo}
          lostPasswordUrl={lostPasswordUrl}
        />,
        root
      );
      authPage.parentElement.replaceChild(root, authPage);
    }
  }
}
