/* eslint-disable no-undef */
/* eslint-disable no-shadow */
/* eslint-disable prettier/prettier */
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
  const { account, productId } = useParams();

  // * 유저데이터를 가져오기 위한 userDataAtom 사용
  const [userData, setUserData] = useRecoilState(userDataAtom);
  const [privateData, setPrivateData] = useRecoilState(privateDataAtom);

  const myName = userData && userData.accountname ? userData.accountname : "";

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
          onClick: e => {
            e.stopPropagation();
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
          label: "판매중인 상품 보기",
          onClick: () => navigate(`/product/${account}`),
        },
        {
          label: "프로필 수정",
          onClick: () => navigate(`/profile/${account}/edit`),
        },
        {
          label: "로그아웃",
          onClick: e => setLogout(e),
        },
      ],
    });
    setModalOpen(true);
  };

  // 채팅방 모달 데이터
  const setChatRoom = e => {
    e.stopPropagation();
    setModalConfig({
      type: "bottomSheet",
      buttons: [
        {
          label: "채팅방 나가기",
          onClick: () => navigate(`/chat/list`),
        },
      ],
    });
    setModalOpen(true);
  };

  return (
    <>
      <Headers>
        {/* 뒤로 가기 버튼 */}
        <button type="button" onClick={() => navigate(-1)}>
          <img src={IconCherovonL} alt="뒤로 가기" />
        </button>

        {/* 홈 */}
        {pathname === "/" && (
          <>
            <p>Home</p>
            <button type="button" onClick={() => navigate("/search")}>
              <img src={IconSearch} alt="계정 검색" />
            </button>
          </>
        )}

        {/* 뉴스레터 */}
        {pathname === "/newsletter" && <p>뉴스레터</p>}

        {/* 게시물 작성 */}
        {pathname === "/post/upload" && <p>피드 업로드</p>}

        {/* 프로필 */}
        {/* 정규표현식으로 profile url 체크 */}
        {pathname.match(
          new RegExp(`^/profile/${myName}(/|/column/?|/grid/?)?$`),
        ) && (
            <button type="button" onClick={e => setProfileModal(e)}>
              <img src={IconDots} alt="설정" />
            </button>
          )}

        {/* 검색 */}
        {pathname === "/search" && (
          <SearchInput
            type="text"
            placeholder="계정 검색"
            value={searchKeyword}
            onChange={handleSearchKeywordChange}
          />
        )}

        {/* 팔로워/팔로잉 */}
        {pathname === `/profile/${account}/following` && <p>Following</p>}
        {pathname === `/profile/${account}/follower` && <p>Followers</p>}

        {/* 상품 작성 */}
        {(pathname === "/product/upload" ||
          pathname === `/product/${productId}/edit`) && <p>상품 업로드</p>}

        {/* 채팅방 */}
        {pathname === "/chat/room" && (
          <>
            <p>상대방 이름</p>
            <button type="button" onClick={e => setChatRoom(e)}>
              <img src={IconDots} alt="설정" />
            </button>
          </>
        )}
      </Headers>
      <Outlet />
    </>
  );
}
