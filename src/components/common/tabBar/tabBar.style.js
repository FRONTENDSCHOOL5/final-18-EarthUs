import { NavLink } from "react-router-dom";
import styled, { keyframes } from "styled-components";

const Nav = styled.nav`
  position: fixed;
  z-index: 1000;
  bottom: 0;
  max-width: var(--size-max-width);
  width: 100%;
  margin-left: calc(-1 * var(--size-gap));
  background-color: var(--color-white);
  border-top: 1px solid var(--color-light);
`;

const MenuList = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: var(--size-tabBar);
  background-image: url(../../asset/icon/icon-chatList-active.svg);
`;

const TabMenu = styled.li`
  width: calc((100% - 60px) / 5);
  height: 100%;
  cursor: pointer;
`;

const bounceAnimation = keyframes`
  0% {
    transform: scaleX(1) scaleY(1);
  }
  19% {
    transform: scaleX(1.1) scaleY(1.1);
  }
  48% {
    transform: scaleX(.95) scaleY(.95);
  }
  100% {
    transform: scaleX(1) scaleY(1);
  }
`;

const Links = styled(NavLink)`
  display: block;
  text-align: center;
  font-size: var(--font-size-xs);
  color: var(--color-gray-76);
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  img {
    display: block;
    margin: 0 auto;
    width: 18px;
    height: 18px;
    margin-bottom: 6px;
    transition: transform 0.1s ease;

    filter: invert(75%) sepia(43%) saturate(5%) hue-rotate(100deg)
      brightness(89%) contrast(88%);
  }

  &.active {
    color: var(--color-primary);
    font-weight: 700;

    img {
      filter: invert(36%) sepia(93%) saturate(1033%) hue-rotate(183deg)
        brightness(88%) contrast(89%);
    }

    img:not(:active) {
      will-change: transform;
      animation: ${bounceAnimation} 0.7s ease;
      transform-origin: 50% 50%;
    }

    &::before {
      content: "";
      width: 100%;
      height: 4px;
      background-color: var(--color-primary);
      position: absolute;
      top: -1px;
      left: 0;
    }
  }
`;

export { Nav, MenuList, TabMenu, Links };
