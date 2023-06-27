import React from "react";
import { Outlet } from "react-router-dom";
import { useRecoilState } from "recoil";

import iconChat from "../../../assets/images/chat.svg";
import iconEdit from "../../../assets/images/edit.svg";
import iconHome from "../../../assets/images/home.svg";
import iconNewsletter from "../../../assets/images/newsletter.svg";
import iconUser from "../../../assets/images/user.svg";
import useScrollToTop from "../../../hooks/useScrollTop";
import userDataAtom from "../../../recoil/userDataAtom";

import { Links, TabMenu, MenuList, Nav } from "./tabBar.style";

export default function TabBar() {
  // * 유저데이터를 가져오기 위한 userDataAtom 사용
  const [userData] = useRecoilState(userDataAtom);
  const myName = userData && userData.accountname ? userData.accountname : "";

  useScrollToTop();

  return (
    <>
      <Nav>
        <MenuList>
          <TabMenu>
            <Links to="/home">
              <img src={iconHome} alt="" />홈
            </Links>
          </TabMenu>
          <TabMenu>
            <Links to="/chat/list">
              <img src={iconChat} alt="" />
              채팅
            </Links>
          </TabMenu>
          <TabMenu>
            <Links to="/newsletter">
              <img src={iconNewsletter} alt="" />
              뉴스레터
            </Links>
          </TabMenu>
          <TabMenu>
            <Links to="/post/upload">
              <img src={iconEdit} alt="" />
              게시물 작성
            </Links>
          </TabMenu>
          <TabMenu>
            <Links to={`/profile/${myName}`}>
              <img src={iconUser} alt="" />
              프로필
            </Links>
          </TabMenu>
        </MenuList>
      </Nav>
      <Outlet />
    </>
  );
}
