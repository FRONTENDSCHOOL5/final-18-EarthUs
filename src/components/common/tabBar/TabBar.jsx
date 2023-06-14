import React from "react";

import iconChat from "../../../assets/images/chat.svg";
import iconEdit from "../../../assets/images/edit.svg";
import iconHome from "../../../assets/images/home.svg";
import iconNewsletter from "../../../assets/images/newsletter.svg";
import iconUser from "../../../assets/images/user.svg";

import { Links, TabMenu, MenuList, Nav } from "./tabBar.style";

export default function TabBar() {
  return (
    <Nav>
      <MenuList>
        <TabMenu>
          <Links to="/home">
            <img src={iconHome} alt="" />
            <div>홈</div>
          </Links>
        </TabMenu>
        <TabMenu>
          <Links to="/chat/list">
            <img src={iconChat} alt="" />
            <div>채팅</div>
          </Links>
        </TabMenu>
        <TabMenu>
          <Links to="/newsletter">
            <img src={iconNewsletter} alt="" />
            <div>뉴스레터</div>
          </Links>
        </TabMenu>
        <TabMenu>
          <Links to="post/upload">
            <img src={iconEdit} alt="" />
            <div>게시물 작성</div>
          </Links>
        </TabMenu>
        <TabMenu>
          <Links to="profile/">
            <img src={iconUser} alt="" />
            <div>프로필</div>
          </Links>
        </TabMenu>
      </MenuList>
    </Nav>
  );
}
