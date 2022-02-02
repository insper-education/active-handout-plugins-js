import styled from "styled-components";
import theme from "../../../../commons/theme";

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

export { MenuContainer, UserName, UserEmail, LogoutButton };
