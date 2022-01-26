import React from "react";
import ReactDOM from "react-dom";
import LoginPage from "./components/LoginPage";
import UserData from "./components/UserData";

const TOKEN_KEY = "user-token";
const USER_DATA_KEY = "user-data";

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.removeItem(USER_DATA_KEY);
};

const handleTokenAndRefresh = (token) => {
  setToken(token);
  const params = new URLSearchParams(window.location.search);
  params.delete("token");
  if (!params.toString()) {
    // No more params
    const href = window.location.href;
    window.location.href = href.substring(0, href.indexOf("?"));
  } else {
    // Still some remaining params
    window.location.search = params.toString();
  }
};

const renderUserData = () => {
  const userUrl = window.ihandout_config.auth["user-url"];
  const nav = document.getElementsByClassName("md-header__inner")?.[0];
  const containerClass = "user__container";
  if (!nav || nav.getElementsByClassName(containerClass).length || !userUrl)
    return;

  const root = document.createElement("div");
  ReactDOM.render(<UserData userUrl={userUrl} />, root);
  root.classList.add(containerClass);

  nav.appendChild(root);
};

{
  const authConfig = window.ihandout_config.auth;
  if (authConfig && authConfig.url) {
    renderUserData();

    const wathUrlPattern = authConfig["watch-urls"];

    const pathnameRegex = new RegExp(wathUrlPattern);
    const hasAuth = !!window.location.pathname.match(pathnameRegex);

    if (hasAuth) {
      const params = new URLSearchParams(window.location.search);
      let token = params.get("token");
      if (token) {
        handleTokenAndRefresh(token);
      } else if (!getToken()) {
        const authUrl = `${authConfig.url}?redirectTo=${window.location.href}`;
        window.location.href = authUrl;
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
