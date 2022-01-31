import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { getSomeName, IUser } from "../../../../models/user";
import useClickOutside from "../../../../hooks/useClickOutside";
import { api } from "../../../../services/auth";
import { LogoutButton, MenuContainer, UserEmail, UserName } from "./styles";

interface IUserMenu {
  user: IUser;
  visible: boolean;
  hide: () => void;
}

export default function UserMenu({ user, visible, hide }: IUserMenu) {
  const { t } = useTranslation();
  const name = getSomeName(user);

  const handleClickOutside = useMemo(
    () => (event: MouseEvent) => {
      if (visible) {
        hide();
        event.stopPropagation();
      }
    },
    [visible, hide]
  );
  const ref = useClickOutside<HTMLDivElement>(handleClickOutside);

  return (
    <MenuContainer visible={visible} ref={ref}>
      <UserName>{name}</UserName>
      <UserEmail>{user.email}</UserEmail>
      <LogoutButton onClick={api.logout}>{t("Logout")}</LogoutButton>
    </MenuContainer>
  );
}
