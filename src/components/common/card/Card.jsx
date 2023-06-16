import React from "react";

import iconComment from "../../../assets/images/comment.svg";
import iconHeartEmpty from "../../../assets/images/heart-empty.svg";
import UserInfo from "../../userInfo/UserInfo";

import { Cards, Content, ImgWrap, Reaction, Time } from "./card.style";

export default function Card({
  accountname,
  profileImage,
  username,
  postImage,
  content,
  heartCount,
  commentCount,
  time,
}) {
  return (
    <Cards>
      <UserInfo
        key={accountname}
        account={accountname}
        profileImg={profileImage}
        userName={username}
        id={accountname}
        more
      />
      <ImgWrap>
        <img src={postImage} alt="게시물 이미지" />
      </ImgWrap>
      <Content>{content}</Content>
      <Reaction>
        <div>
          <button type="submit">
            <img src={iconHeartEmpty} alt="좋아요 빈 하트 아이콘" />
          </button>
          <span>{heartCount}</span>
        </div>
        <div>
          <img src={iconComment} alt="댓글 아이콘" />
          <span>{commentCount}</span>
        </div>
      </Reaction>
      <Time>{time}</Time>
    </Cards>
  );
}
