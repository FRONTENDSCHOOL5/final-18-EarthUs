import React from "react";

import iconDots from "../../../assets/images/dots.svg";
import Avatar from "../avatar/Avatar";

import Comments from "./comment.style";

export default function Comment({
  commentID,
  profileImg,
  userName,
  comment,
  time,
}) {
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

  return (
    <Comments key={commentID}>
      <Avatar profileImg={profileImg} size={40} />
      <div>
        <strong>{userName}</strong>
        <span>{getTime()}</span>
        <p>{comment}</p>
      </div>
      <button type="button">
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
// />;
