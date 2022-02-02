import React, { ReactElement, ReactNode } from "react";
import ReactDOM from "react-dom";
import LoginPage from "./components/LoginPage";
import PasswordLostPage from "./components/PasswordLostPage";
import PasswordResetPage from "./components/PasswordResetPage";

const renderAuthPage = () => {
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
};

const getTitle = (authPage: Element) => {
  return (
    authPage
      .getElementsByClassName("admonition-title")?.[0]
      ?.textContent?.trim() || ""
  );
};

const getLogo = (authPage: Element) => {
  return authPage.querySelector<HTMLImageElement>("img[alt='logo']")?.src;
};

const renderPage = (authPage: Element, component: ReactElement) => {
  const root = document.createElement("div");
  ReactDOM.render(component, root);
  authPage.parentElement?.replaceChild(root, authPage);
};

const renderLoginPage = (authPage: Element) => {
  const lostPasswordUrl = [...authPage.getElementsByTagName("a")].filter(
    (a) => a.textContent?.trim() === "lost-password"
  )[0]?.href;
  const title = getTitle(authPage);
  const logo = getLogo(authPage);

  renderPage(
    authPage,
    <LoginPage title={title} logo={logo} lostPasswordUrl={lostPasswordUrl} />
  );
};

const renderLostPasswordPage = (authPage: Element) => {
  const title = getTitle(authPage);
  const logo = getLogo(authPage);

  renderPage(authPage, <PasswordLostPage title={title} logo={logo} />);
};

const renderPasswordResetPage = (authPage: Element) => {
  const title = getTitle(authPage);
  const logo = getLogo(authPage);

  renderPage(authPage, <PasswordResetPage title={title} logo={logo} />);
};

export { renderAuthPage };
