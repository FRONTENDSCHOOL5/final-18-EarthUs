/* eslint-disable prettier/prettier */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";

import IconCherovonL from "../../../assets/images/chevron-left.svg";
import IconDots from "../../../assets/images/dots.svg";
import IconSearch from "../../../assets/images/search.svg";
import useModal from "../../../hooks/useModal";
import privateDataAtom from "../../../recoil/privateDataAtom";
import userDataAtom from "../../../recoil/userDataAtom";
import {
  getProductDetailPath,
  getProfileEditPath,
  getFollowingPath,
  getFollowerPath,
  getProductEditPath,
  PRODUCT_UPLOAD,
  CHAT_LIST,
  CHAT_ROOM,
  HOME,
  SEARCH,
  NEWS_LETTER,
  POST_UPLOAD,
} from "../../../utils/config";

import { setChatRoom, setProfileModal } from "./header.modal";
import {
  Headers,
  SearchInput,
  SearchInputDiv,
  SearchInputSpan,
} from "./header.style";

export default function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { account, productId } = useParams();
  const { setModal, setModalOpen } = useModal();

  const PRODUCT_DETAIL = getProductDetailPath(account);
  const PROFILE_EDIT = getProfileEditPath(account);
  const PROFILE_FOLLOWING = getFollowingPath(account);
  const PROFILE_FOLLOWER = getFollowerPath(account);
  const PRODUCT_EDIT = getProductEditPath(productId);
  // * 검색 이벤트
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleSearchKeywordChange = e => {
    const newSearchKeyword = e.target.value;
    setSearchKeyword(newSearchKeyword);
    navigate({ search: `?keyword=${newSearchKeyword}` });
  };

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

  return (
    <>
      <Headers>
        {/* 뒤로 가기 버튼 */}
        <button type="button" onClick={() => navigate(-1)}>
          <img src={IconCherovonL} alt="뒤로 가기" />
        </button>

        {/* 홈 */}
        {pathname === HOME && (
          <>
            <h2>Home</h2>
            <button type="button" onClick={() => navigate(SEARCH)}>
              <img src={IconSearch} alt="계정 검색" />
            </button>
          </>
        )}

        {/* 뉴스레터 */}
        {pathname === NEWS_LETTER && <h2>뉴스레터</h2>}

        {/* 게시물 작성 */}
        {pathname === POST_UPLOAD && <h2>피드 업로드</h2>}

        {/* 프로필 */}
        {/* 정규표현식으로 profile url 체크 */}
        {pathname.match(new RegExp(`^/profile/${myName}(/?)?$`)) && (
          <button
            type="button"
            onClick={e =>
              setProfileModal(
                e,
                navigate,
                handleSignOut,
                setModal,
                setModalOpen,
                PRODUCT_DETAIL,
                PROFILE_EDIT,
              )
            }
          >
            <img src={IconDots} alt="설정" />
          </button>
        )}

        {/* 검색 */}
        {pathname === SEARCH && (
          <SearchInputDiv>
            <SearchInput
              type="search"
              name="q"
              placeholder="계정 검색"
              value={searchKeyword}
              onChange={handleSearchKeywordChange}
            />
            <SearchInputSpan />
          </SearchInputDiv>
        )}

        {/* 팔로워/팔로잉 */}
        {pathname === PROFILE_FOLLOWING && <h2>Following</h2>}
        {pathname === PROFILE_FOLLOWER && <h2>Followers</h2>}

        {/* 상품 작성 */}
        {(pathname === PRODUCT_UPLOAD || pathname === PRODUCT_EDIT) && (
          <h2>상품 업로드</h2>
        )}

        {/* 채팅방 */}
        {pathname === CHAT_ROOM && (
          <>
            <h2>디어얼스</h2>
            <button
              type="button"
              onClick={e => setChatRoom(e, CHAT_LIST, setModal, setModalOpen)}
            >
              <img src={IconDots} alt="설정" />
            </button>
          </>
        )}
      </Headers>
      <Outlet />
    </>
  );
}
