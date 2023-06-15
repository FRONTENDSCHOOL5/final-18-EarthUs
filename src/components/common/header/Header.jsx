import React from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";

import IconCherovonL from "../../../assets/images/chevron-left.svg";
import IconDots from "../../../assets/images/dots.svg";
import IconSearch from "../../../assets/images/search.svg";

import { Headers, SearchInput } from "./header.style";

export default function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { account } = useParams();

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
        {pathname === "/product/upload" && <p>상품 업로드</p>}
        {pathname === "/chat/room" && (
          <>
            <p>상대방 이름</p>
            <button type="button" onClick={() => navigate("/search")}>
              <img src={IconDots} alt="계정 검색" />
            </button>
          </>
        )}
        {pathname === `/profile/${account}` && (
          <button type="button">
            <img src={IconDots} alt="설정" />
          </button>
        )}
        {pathname === `/profile/${account}/following` && <p>Following</p>}
        {pathname === `/profile/${account}/follower` && <p>Followers</p>}
      </Headers>
      <Outlet />
    </>
  );
}
