/* eslint-disable no-undef */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useRecoilState } from "recoil";

import iconDots from "../../assets/images/dots.svg";
import useApiMutation from "../../hooks/useApiMutation";
import useModal from "../../hooks/useModal";
import userDataAtom from "../../recoil/userDataAtom";
import {
  getPostDetailPath,
  getPostEditPath,
  getPostReportPath,
  getFollowingPath,
  getFollowerPath,
  getProfileDetailPath,
} from "../../utils/config";
import Avatar from "../common/avatar/Avatar";

import {
  reportConfirm,
  deleteConfirm,
  deleteCardModal,
  notificationsModal,
} from "./userInfo.modal";
import { Users, UserHeader } from "./userInfo.style";

export default function UserInfo({
  account,
  profileImg,
  userName,
  intro,
  id,
  more,
  children,
  searchKeyword,
  postId,
}) {
  const { setModal, setModalOpen } = useModal();
  const { accountParam } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [userData] = useRecoilState(userDataAtom);
  const myName =
    userData && userData.accountname
      ? userData.accountname.trim().toLowerCase()
      : "";

  const PROFILE_DETAIL = getProfileDetailPath(account);
  const POST_EDIT = getPostEditPath(postId);
  const POST_DETAIL = getPostDetailPath(postId);
  const POST_REPORT = getPostReportPath(postId);

  const currentUser = account.trim().toLowerCase() === myName;
  const lastSegment = pathname.split("/").pop();
  const SEARCH = pathname.includes("search");
  const followSegment =
    (more && lastSegment === "follower") || lastSegment === "following";

  // * 피드아이템 삭제
  const [deleteFeed, setDeleteFeed] = useState(null);
  const deleteFeedMutation = useApiMutation(
    deleteFeed,
    "DELETE",
    {},
    {
      onSuccess: () => {
        console.log("게시물이 삭제되었습니다.");
        queryClient.invalidateQueries(PROFILE_DETAIL);
      },
    },
  );

  const handleDeleteFeed = postId => {
    const url = POST_DETAIL;
    setDeleteFeed(url);
    deleteFeedMutation.mutate();
  };

  // * 신고하기 API 호출
  const [reports, setReports] = useState(null);
  const setReportMutation = useApiMutation(
    reports,
    "POST",
    {},
    {
      onSuccess: () => {
        console.log("신고되었습니다.");
      },
    },
  );

  const handleReport = postId => {
    const url = POST_REPORT;
    setReports(url);
    setReportMutation.mutate();
  };

  // Link 랜더링 조건부 출력
  function renderLinkContent() {
    // Search 페이지 하이라이트 관련
    if (SEARCH) {
      const regex = new RegExp(searchKeyword, "gi");
      const userNameWithHighlight = userName.replace(
        regex,
        match => `<mark class="highlight">${match}</mark>`,
      );

      return (
        <>
          <Avatar profileImg={profileImg} size={40} />
          <div>
            <strong
              dangerouslySetInnerHTML={{ __html: userNameWithHighlight }}
            />
            {id ? <p>@{account}</p> : ""}
          </div>
        </>
      );
    }

    return (
      <>
        <Avatar profileImg={profileImg} size={40} />
        <div>
          <strong>{userName}</strong>
          {intro ? <p>{intro}</p> : ""}
          {id ? <p>@{account}</p> : ""}
        </div>
      </>
    );
  }

  return (
    <Users isSearch={pathname === "/search"}>
      {!currentUser ? (
        <UserHeader to={PROFILE_DETAIL}>{renderLinkContent()}</UserHeader>
      ) : (
        <UserHeader to="#" disabled>
          {renderLinkContent()}
        </UserHeader>
      )}

      {currentUser ? null : children}

      {!followSegment && !SEARCH ? (
        // 기존 피드 게시물에서 수정/삭제/신고 모달
        <button
          type="button"
          onClick={e =>
            currentUser
              ? deleteCardModal(
                  e,
                  navigate,
                  postId,
                  deleteConfirm,
                  setModal,
                  setModalOpen,
                  handleDeleteFeed,
                  POST_EDIT,
                )
              : reportConfirm(e, handleReport, postId, setModal, setModalOpen)
          }
        >
          <img src={iconDots} alt="More" />
        </button>
      ) : !currentUser && !SEARCH ? (
        // 팔로우페이지에서 알림설정 모달
        <button
          type="button"
          onClick={e => notificationsModal(e, account, setModal, setModalOpen)}
        >
          <img src={iconDots} alt="More" />
        </button>
      ) : null}
    </Users>
  );
}

// ✅ Usage
// <UserInfo
// key={v.accountname}			// key값: 아이디
// account={v.accountname}
// profileImg={v.image}
// userName={v.username}
// intro={v.intro}					// 소개가 들어갈 때
// id={v.accountname}				// 아이디가 들어갈 때
// more 										// 더 보기 버튼 있을 때
// >
// {children}								// 팔로우/취소 버튼, 날짜 들어갈 수 있습니다.
// </UserInfo>
