/* eslint-disable no-unused-vars */
import React from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";

import IconCherovonL from "../../../assets/images/chevron-left.svg";
import IconDots from "../../../assets/images/dots.svg";
import IconSearch from "../../../assets/images/search.svg";
import modalConfigState from "../../../recoil/modalConfigAtom";
import modalState from "../../../recoil/modalStateAtom";
import privateDataAtom from "../../../recoil/privateDataAtom";
import userDataAtom from "../../../recoil/userDataAtom";

import { Headers, SearchInput } from "./header.style";

export default function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { account } = useParams();

  // * 유저데이터를 가져오기 위한 userDataAtom 사용
  const [userData, setUserData] = useRecoilState(userDataAtom);
  const [privateData, setPrivateData] = useRecoilState(privateDataAtom);

  // * 로그아웃
  const handleSignOut = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("privateData");
    setUserData(userDataAtom.default);
    setPrivateData(privateDataAtom.default);
    navigate("/signin");
  };

  // * 전역 상태 관리를 위한 Recoil State 가져오기
  const setModalOpen = useSetRecoilState(modalState);
  const setModalConfig = useSetRecoilState(modalConfigState);

  // * 프로필 모달 데이터
  const setLogout = e => {
    e.stopPropagation();
    setModalConfig({
      type: "confirm",
      title: "로그아웃하시겠어요?",
      buttons: [
        {
          label: "취소",
          onClick: eventInner => {
            eventInner.stopPropagation();
            setModalOpen(false); // close modal
          },
        },
        {
          label: "로그아웃",
          onClick: () => handleSignOut(),
        },
      ],
    });
    setModalOpen(true);
  };
  const setProfileModal = e => {
    e.stopPropagation();
    setModalConfig({
      type: "bottomSheet", // "confirm" or "bottomSheet"
      buttons: [
        {
          label: "설정 및 개인정보",
          onClick: eventInner => {
            eventInner.stopPropagation();
            setModalOpen(false); // close modal
          },
        },
        {
          label: "로그아웃",
          onClick: eventInner => setLogout(eventInner),
        },
      ],
    });
    setModalOpen(true);
  };

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
          <button type="button" onClick={e => setProfileModal(e)}>
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
