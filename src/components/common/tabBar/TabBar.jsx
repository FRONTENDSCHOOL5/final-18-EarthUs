import React from "react";
import { Outlet } from "react-router-dom";

import iconChat from "../../../assets/images/chat.svg";
import iconEdit from "../../../assets/images/edit.svg";
import iconHome from "../../../assets/images/home.svg";
import iconNewsletter from "../../../assets/images/newsletter.svg";
import iconUser from "../../../assets/images/user.svg";

import { Links, TabMenu, MenuList, Nav } from "./tabBar.style";

export default function TabBar() {
  return (
    <>
      <Nav>
        <MenuList>
          <TabMenu>
            <Links to="/home">
              <img src={iconHome} alt="홈" />
              <div>홈</div>
            </Links>
          </TabMenu>
          <TabMenu>
            <Links to="/chat/list">
              <img src={iconChat} alt="채팅" />
              <div>채팅</div>
            </Links>
          </TabMenu>
          <TabMenu>
            <Links to="/newsletter">
              <img src={iconNewsletter} alt="뉴스레터" />
              <div>뉴스레터</div>
            </Links>
          </TabMenu>
          <TabMenu>
            <Links to="post/upload">
              <img src={iconEdit} alt="게시물 작성" />
              <div>게시물 작성</div>
            </Links>
          </TabMenu>
          <TabMenu>
            <Links to="profile/">
              <img src={iconUser} alt="프로필" />
              <div>프로필</div>
            </Links>
          </TabMenu>
        </MenuList>
      </Nav>
      <Outlet />
    </>
  );
}
