import React from "react";
import ReactDOM from "react-dom";
import LoginPage from "./components/LoginPage";
import UserData from "./components/UserData";
import { cache } from "../services/auth";
import { redirectTo } from "../services/request";
import PasswordLostPage from "./components/PasswordLostPage";
import PasswordResetPage from "./components/PasswordResetPage";

const renderUserData = () => {
  const nav = document.getElementsByClassName("md-header__inner")?.[0];
  const containerClass = "user__container";
  if (!nav || nav.getElementsByClassName(containerClass).length) return;

  const root = document.createElement("div");
  ReactDOM.render(<UserData />, root);
  root.classList.add(containerClass);

  nav.appendChild(root);
};

const getTitle = (authPage) => {
  return authPage
    .getElementsByClassName("admonition-title")[0]
    ?.textContent.trim();
};

const getLogo = (authPage) => {
  return authPage.querySelector("img[alt='logo']")?.src;
};

const renderAuthPage = (authPage, component) => {
  const root = document.createElement("div");
  ReactDOM.render(component, root);
  authPage.parentElement.replaceChild(root, authPage);
};

const renderLoginPage = (authPage) => {
  const lostPasswordUrl = [...authPage.getElementsByTagName("a")].filter(
    (a) => a.textContent.trim() === "lost-password"
  )[0];
  const title = getTitle(authPage);
  const logo = getLogo(authPage);

  renderAuthPage(
    authPage,
    <LoginPage title={title} logo={logo} lostPasswordUrl={lostPasswordUrl} />
  );
};

const renderLostPasswordPage = (authPage) => {
  const title = getTitle(authPage);
  const logo = getLogo(authPage);

  renderAuthPage(authPage, <PasswordLostPage title={title} logo={logo} />);
};

const renderPasswordResetPage = (authPage) => {
  const title = getTitle(authPage);
  const logo = getLogo(authPage);

  renderAuthPage(authPage, <PasswordResetPage title={title} logo={logo} />);
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
    if (authPage.classList.contains("login")) {
      renderLoginPage(authPage);
    } else if (authPage.classList.contains("lost-password")) {
      renderLostPasswordPage(authPage);
    } else if (authPage.classList.contains("password-reset")) {
      renderPasswordResetPage(authPage);
    }
  }
}
