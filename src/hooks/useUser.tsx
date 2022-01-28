import React, { useEffect, useState } from "react";
import { IUser } from "../models/user";
import { api, cache } from "../services/auth";
import { redirectTo } from "../services/request";

export default function useUser(
  redirectToLoginIfNoUser: boolean = false
): IUser | null {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const cachedUser = cache.getUser();
    setUser(cachedUser);

    if (!cachedUser) {
      const token = cache.getToken();

      if (token) {
        api.fetchUser(token).then((user) => {
          if (user) {
            cache.setUser(user);
          }
          setUser(user);
        });
      } else if (redirectToLoginIfNoUser) {
        const mountPoint = window.ihandout_config["mount-point"] || "";
        redirectTo(`${mountPoint}login/?redirectTo=${window.location.href}`);
      }
    }
  }, []);

  return user;
}
