import React, { MouseEvent, useEffect, useMemo, useState } from "react";
import useUser from "../../../hooks/useUser";
import { getSomeName } from "../../../models/user";
import { Container, UserButton } from "./styles";
import UserMenu from "./UserMenu";

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
