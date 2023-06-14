import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import IconCherovonL from "../../../assets/images/chevron-left.svg";
import IconDots from "../../../assets/images/dots.svg";
import IconSearch from "../../../assets/images/search.svg";

import { Headers, SearchInput } from "./header.style";

function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <Headers>
        <button type="button" onClick={() => navigate(-1)}>
          <img src={IconCherovonL} alt="뒤로 가기" />
        </button>
        {pathname === "/home" && (
          <>
            <p>Home</p>
            <button type="button" onClick={() => navigate("/search")}>
              <img src={IconSearch} alt="계정 검색" />
            </button>
          </>
        )}
        {pathname === "/newsletter" && <p>뉴스레터</p>}
        {pathname === "/post/upload" && <p>피드 업로드</p>}
        {pathname === "/search" && (
          <SearchInput type="text" placeholder="계정 검색" />
        )}
        {pathname === "/follow/following" && <p>Following</p>}
        {pathname === "/follow/follower" && <p>Followers</p>}
        {pathname === "/product/upload" && <p>상품 업로드</p>}
        {pathname === "/chat/room" && (
          <>
            <p>상대방 이름</p>
            <button type="button" onClick={() => navigate("/search")}>
              <img src={IconDots} alt="계정 검색" />
            </button>
          </>
        )}
      </Headers>
      <Outlet />
    </>
  );
}

function HeaderProfile() {
  const navigate = useNavigate();
  return (
    <>
      <Headers>
        <button type="button" onClick={() => navigate(-1)}>
          <img src={IconCherovonL} alt="뒤로 가기" />
        </button>
        <button type="button">
          <img src={IconDots} alt="설정" />
        </button>
      </Headers>
      <Outlet />
    </>
  );
}

export { Header, HeaderProfile };
