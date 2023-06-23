/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useRecoilState, useSetRecoilState } from "recoil";

import iconDots from "../../assets/images/dots.svg";
import useApiMutation from "../../hooks/useApiMutation";
import modalConfigState from "../../recoil/modalConfigAtom";
import modalState from "../../recoil/modalStateAtom";
import userDataAtom from "../../recoil/userDataAtom";
import { getFollowingPath, getFollowerPath } from "../../utils/config";
import Avatar from "../common/avatar/Avatar";

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
  postID,
}) {
  // * 전역 상태 관리를 위한 Recoil State 가져오기
  const { accountParam } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [userData] = useRecoilState(userDataAtom);
  const setModalOpen = useSetRecoilState(modalState);
  const setModalConfig = useSetRecoilState(modalConfigState);
  const myName =
    userData && userData.accountname
      ? userData.accountname.trim().toLowerCase()
      : "";

  const currentUser = account.trim().toLowerCase() === myName;
  const lastSegment = pathname.split("/").pop();
  const followSegment =
    (more && lastSegment === "followers") || lastSegment === "following";

  // * 피드아이템 삭제
  const [deleteFeed, setDeleteFeed] = useState(null);
  const deleteFeedMutation = useApiMutation(
    deleteFeed,
    "DELETE",
    {},
    {
      onSuccess: () => {
        console.log("게시물이 삭제되었습니다.");
        queryClient.invalidateQueries(`/profile/${account}`);
      },
    },
  );

  const handleDeleteFeed = postID => {
    const url = `/post/${postID}`;
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

  const handleReport = postID => {
    const url = `/post/${postID}/report`;
    setReports(url);
    setReportMutation.mutate();
  };

  // * 신고하기 모달
  const reportConfirm = e => {
    e.stopPropagation();
    setModalConfig({
      type: "confirm",
      title: "게시물을 신고하시겠어요?",
      buttons: [
        {
          label: "취소",
          onClick: e => {
            e.stopPropagation();
            setModalOpen(false);
          },
        },
        {
          label: "신고하기",
          onClick: () => handleReport(postID),
        },
      ],
    });
    setModalOpen(true);
  };

  // * 수정/삭제 모달
  const deleteConfirm = e => {
    e.stopPropagation();
    setModalConfig({
      type: "confirm",
      title: "파일을 삭제하시겠어요?",
      buttons: [
        {
          label: "취소",
          onClick: e => {
            e.stopPropagation();
            setModalOpen(false);
          },
        },
        {
          label: "삭제",
          onClick: () => handleDeleteFeed(postID),
        },
      ],
    });
    setModalOpen(true);
  };
  const deleteCardModal = e => {
    e.stopPropagation();
    setModalConfig({
      type: "bottomSheet",
      buttons: [
        {
          label: "삭제",
          onClick: e => deleteConfirm(e),
        },
        {
          label: "수정",
          onClick: () => navigate(`/post/${postID}/edit`),
        },
      ],
    });
    setModalOpen(true);
  };

  // * 알림설정 모달
  const manageNotifications = e => {
    e.stopPropagation();
    setModalConfig({
      type: "confirm",
      title: "알림을 설정할까요?",
      buttons: [
        {
          label: "해제",
          onClick: e => {
            e.stopPropagation();
            setModalOpen(false); // close modal
          },
        },
        {
          label: "설정",
          onClick: e => {
            e.stopPropagation();
            setModalOpen(false); // close modal
          },
        },
      ],
    });
    setModalOpen(true);
  };
  const manageNotificationsModal = (e, accountname) => {
    e.stopPropagation();
    setModalConfig({
      type: "bottomSheet",
      title: `@${accountname}`,
      buttons: [
        {
          label: "알림 관리",
          onClick: e => manageNotifications(e),
        },
      ],
    });
    setModalOpen(true);
  };

  // Link 랜더링 조건부 출력
  function renderLinkContent() {
    // Search 페이지 하이라이트 관련
    if (pathname === "/search") {
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
              // eslint-disable-next-line react/no-danger
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
        <UserHeader to={`/profile/${account}`}>
          {renderLinkContent()}
        </UserHeader>
      ) : (
        <UserHeader to="#" disabled>
          {renderLinkContent()}
        </UserHeader>
      )}

      {currentUser ? null : children}

      {!followSegment ? (
        // 기존 피드 게시물에서 수정/삭제/신고 모달
        <button
          type="button"
          onClick={currentUser ? deleteCardModal : reportConfirm}
        >
          <img src={iconDots} alt="More" />
        </button>
      ) : !currentUser ? (
        // 팔로우페이지에서 알림설정 모달
        <button
          type="button"
          onClick={e => manageNotificationsModal(e, account)}
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
