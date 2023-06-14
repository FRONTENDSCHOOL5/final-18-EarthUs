import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  position: fixed;
  bottom: 0;
  max-width: var(--size-max-width);
  width: 100%;
  margin-left: -16px;
  background-color: var(--color-white);
`;

const MenuList = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  background-image: url(../../asset/icon/icon-chatList-active.svg);
`;

const TabMenu = styled.li`
  width: calc((100% - 60px) / 5);
  cursor: pointer;
`;

const Links = styled(NavLink)`
  display: block;
  text-align: center;

  img {
    width: 18px;
    height: 18px;
    margin-bottom: 6px;
    filter: invert(75%) sepia(43%) saturate(5%) hue-rotate(100deg)
      brightness(89%) contrast(88%);
  }
  div {
    font-size: var(--font-size-xs);
    color: var(--color-gray-76);
  }

  &.active {
    img {
      filter: invert(62%) sepia(98%) saturate(1363%) hue-rotate(176deg)
        brightness(89%) contrast(91%);
    }
    div {
      color: var(--color-primary);
    }
  }
`;

export { Nav, MenuList, TabMenu, Links };
