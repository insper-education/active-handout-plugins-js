import React, { MouseEvent, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import theme from "../../../commons/theme";
import useUser from "../../../hooks/useUser";
import { getSomeName } from "../../../models/user";
import UserMenu from "./UserMenu";

const Container = styled.div`
  position: relative;
`;

const UserButton = styled.button`
  color: var(--md-primary-bg-color);
  cursor: pointer;
  padding: ${theme.padding.rem(1)} ${theme.padding.rem(2)};

  :after {
    content: "▾";
    margin-left: ${theme.margin.rem(2)};
  }
`;

export default function UserData() {
  const user = useUser();
  const [menuVisible, setMenuVisible] = useState<boolean>(false);

  const showMenu = useMemo(() => () => setMenuVisible(true), [setMenuVisible]);
  const hideMenu = useMemo(() => () => setMenuVisible(false), [setMenuVisible]);

  if (user) {
    const name = getSomeName(user);
    return (
      <Container>
        <UserButton onClick={showMenu}>{name}</UserButton>
        <UserMenu user={user} visible={menuVisible} hide={hideMenu} />
      </Container>
    );
  } else {
    return null;
  }
}
