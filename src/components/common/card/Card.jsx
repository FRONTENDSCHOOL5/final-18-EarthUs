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

// ✅ Usage
// <Card
//   accountname={data.post.author.accountname}     // <UserInfo />에 들어감
//   profileImage={data.post.author.image}          // <UserInfo />에 들어감
//   username={data.post.author.username}           // <UserInfo />에 들어감
//   postImage={data.post.image}                    // post 이미지
//   content={data.post.content}                    // post 글
//   heartCount={data.post.heartCount}              // 좋아요 수
//   commentCount={data.post.commentCount}          // 댓글 수
//   time={`${time[0]}년 ${time[1]}월 ${time[2]}일`}  // post 작성일, const time = data && data.post.createdAt.slice(0, 10).split("-");으로 연월일 분리
// />

// <UserInfo
//   key={accountname}
//   account={accountname}
//   profileImg={profileImage}
//   userName={username}
//   id={accountname}         // 아이디가 들어가야 함
//   more
// />
