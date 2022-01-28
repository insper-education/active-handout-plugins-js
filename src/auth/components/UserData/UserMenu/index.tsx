import React, { useMemo } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import theme from "../../../../commons/theme";
import { getSomeName, IUser } from "../../../../models/user";
import useClickOutside from "../../../../hooks/useClickOutside";
import { api } from "../../../../services/auth";

interface IMenuContainerProps {
  visible: boolean;
}

const MenuContainer = styled.div<IMenuContainerProps>`
  position: absolute;
  right: 0;
  display: ${({ visible }) => (visible ? "flex" : "none")};
  flex-direction: column;
  margin-top: ${theme.margin.rem(2)};
  padding: ${theme.padding.rem(4)} ${theme.padding.rem(6)};
  background-color: white;
  border-radius: ${theme.borderRadius.rounded};
  box-shadow: ${theme.boxShadow.default};
  color: #3c3c3c;
`;

const UserName = styled.span`
  ${theme.text.lg};
`;

const UserEmail = styled.span`
  ${theme.text.sm};
  color: #c3c3c3;
  margin-top: -${theme.margin.rem(1)};
`;

const LogoutButton = styled.button`
  width: 100%;
  margin-top: ${theme.margin.rem(4)};
  border-top: ${theme.border.base} solid #d3d3d3;
  padding: ${theme.padding.rem(4)} 0 ${theme.padding.rem(2)};
  text-align: left;
  color: var(--md-primary-fg-color);
  cursor: pointer;
`;

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
