import axios from "axios";
import { IUser } from "../models/user";

const fetchUser = (token: string): Promise<IUser | null> => {
  const userUrl = window.ihandout_config.auth?.["user-url"];
  if (!token) {
    return Promise.reject("token is not set");
  } else if (!userUrl) {
    return Promise.reject("user-url is not set in ihandout_config.auth");
  }

  return axios
    .get(userUrl, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((res) => res.data)
    .then((userData) => {
      return {
        pk: userData.pk,
        username: userData.username,
        email: userData.email,
        firstName: userData.first_name,
        lastName: userData.last_name,
        isStaff: userData.is_staff,
        token,
      };
    })
    .catch(() => null);
};

const api = {
  fetchUser,
  login: (username: string, password: string): Promise<IUser | null> => {
    const loginUrl = window.ihandout_config.auth?.["login-url"];
    const userUrl = window.ihandout_config.auth?.["user-url"];

    if (!loginUrl || !userUrl) {
      return Promise.reject(
        "login-url or user-url is not set in ihandout_config.auth"
      );
    }

    return axios
      .post(loginUrl, { username, password })
      .then((res) => res.data.key)
      .then(async (token) => {
        cache.setToken(token);
        return fetchUser(token);
      })
      .catch(() => null);
  },
  logout: () => {
    localStorage.clear();
    location.reload();
  },
  resetPassword: (
    uid: string,
    token: string,
    password1: string,
    password2: string
  ) => {
    const resetPasswordUrl =
      window.ihandout_config.auth?.["reset-password-url"];
    if (!resetPasswordUrl) {
      return Promise.reject(
        "reset-password-url is not set in ihandout_config.auth"
      );
    }

    return axios
      .post(resetPasswordUrl, {
        uid,
        token,
        new_password1: password1,
        new_password2: password2,
      })
      .then(() => true)
      .catch(() => false);
  },
  sendPasswordResetEmail: (email: string) => {
    const emailPasswordUrl =
      window.ihandout_config.auth?.["email-password-url"];
    if (!emailPasswordUrl) {
      return Promise.reject(
        "email-password-url is not set in ihandout_config.auth"
      );
    }

    return axios.post(emailPasswordUrl, {
      email,
    });
  },
};

const TOKEN_KEY = "user-token";
const USER_DATA_KEY = "user-data";

const cache = {
  getToken: () => {
    return localStorage.getItem(TOKEN_KEY);
  },
  setToken: (token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.removeItem(USER_DATA_KEY);
  },
  getUser: (): IUser | null => {
    const dataString = localStorage.getItem("user-data");
    if (dataString) {
      try {
        return JSON.parse(dataString);
      } catch {
        console.error(`Could not parse JSON string ${dataString}`);
      }
    }
    return null;
  },
  setUser: (user: IUser) => {
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(user));
  },
};

export { api, cache };
