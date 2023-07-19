/* eslint-disable no-shadow */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
import React from "react";
import { Link, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useRecoilState, useSetRecoilState } from "recoil";

import iconDots from "../../../assets/images/dots.svg";
import useApiMutation from "../../../hooks/useApiMutation";
import modalConfigState from "../../../recoil/modalConfigAtom";
import modalState from "../../../recoil/modalStateAtom";
import userDataAtom from "../../../recoil/userDataAtom";
import { getProfileDetailPath } from "../../../utils/config";
import Avatar from "../avatar/Avatar";

import Comments from "./comment.style";

export default function Comment({
  commentId,
  profileImg,
  userName,
  comment,
  time,
  authorId,
  accountName,
}) {
  // const navigate = useNavigate();
  const PROFILE_DETAIL = getProfileDetailPath(accountName);

  // 댓글 작성 시간
  const commentTime = Math.round((new Date() - Date.parse(time)) / 1000);

  const getTime = () => {
    let createdTime;

    if (commentTime < 2) {
      createdTime = "지금";
    } else if (commentTime < 60) {
      createdTime = `${commentTime}초`;
    } else if (commentTime < 60 * 60) {
      createdTime = `${Math.round(commentTime / 60)}분`;
    } else if (commentTime < 60 * 60 * 24) {
      createdTime = `${Math.round(commentTime / (60 * 60))}시간`;
    } else if (commentTime < 60 * 60 * 24 * 7) {
      createdTime = `${Math.round(commentTime / (60 * 60 * 24))}일`;
    } else {
      createdTime = `${Math.round(commentTime / (60 * 60 * 24 * 7))}주`;
    }

    return createdTime;
  };

  const { postId } = useParams();

  const queryClient = useQueryClient();

  // 댓글 삭제 API 호출
  const deleteComment = useApiMutation(
    `/post/${postId}/comments/${commentId}`,
    "delete",
    {},
    {
      onSuccess: () => {
        console.log("요청에 성공했습니다");
        queryClient.invalidateQueries(`/post/${postId}`);
      },
    },
  );
  const handleDeleteComment = () => {
    deleteComment.mutate();
  };

  // 댓글 신고 API 호출
  const reportComment = useApiMutation(
    `/post/${postId}/comments/${commentId}/report`,
    "post",
    {},
    {
      onSuccess: () => {
        console.log("요청에 성공했습니다");
      },
    },
  );
  const handleReportComment = () => {
    reportComment.mutate();
  };

  const [userData] = useRecoilState(userDataAtom);
  const IsCommentAuthorMe = userData && userData._id === authorId;

  const setModalOpen = useSetRecoilState(modalState);
  const setModalConfig = useSetRecoilState(modalConfigState);

  // 댓글 삭제 모달
  const deleteConfirm = e => {
    e.stopPropagation();
    setModalConfig({
      type: "confirm",
      title: "댓글을 삭제할까요?",
      buttons: [
        {
          label: "취소",
          onClick: e => {
            e.stopPropagation();
            setModalOpen(false); // close modal
          },
        },
        {
          label: "삭제",
          onClick: () => handleDeleteComment(),
        },
      ],
    });
    setModalOpen(true);
  };

  // 댓글 신고 모달
  const reportConfirm = e => {
    e.stopPropagation();
    setModalConfig({
      type: "confirm",
      title: "댓글을 신고할까요?",
      buttons: [
        {
          label: "취소",
          onClick: e => {
            e.stopPropagation();
            setModalOpen(false); // close modal
          },
        },
        {
          label: "신고",
          onClick: () => handleReportComment(),
        },
      ],
    });
    setModalOpen(true);
  };

  return (
    <Comments key={commentId}>
      <Link to={PROFILE_DETAIL}>
        <Avatar
          profileImg={profileImg}
          size={40}
          // onClick={() => navigate(PROFILE_DETAIL)}
        />
      </Link>
      <div>
        <Link to={PROFILE_DETAIL}>
          <strong>{userName}</strong>
        </Link>
        <span>{getTime()}</span>
        <p>{comment}</p>
      </div>
      <button
        type="button"
        onClick={e => (IsCommentAuthorMe ? deleteConfirm(e) : reportConfirm(e))}
      >
        <img src={iconDots} alt="더 보기" />
      </button>
    </Comments>
  );
}

// ✅ Usage
// comments 배열 map 함수 안에서 사용
// <Comment
//   key={v.id}										// key값: 코멘트 id
//   profileImg={v.author.image}
//   userName={v.author.username}
//   comment={v.content}
//   time={v.createdAt}
//   authorId={v.author._id}
//   commentId={v.id}
// />;
