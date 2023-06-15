import React from "react";
import { Link } from "react-router-dom";

import iconDots from "../../assets/images/dots.svg";
import Avatar from "../common/avatar/Avatar";

import Users from "./userInfo.style";

export default function UserInfo({
  account,
  profileImg,
  userName,
  intro,
  id,
  more,
  children,
}) {
  return (
    <Users>
      <Link to={`/profile/${account}`}>
        <Avatar profileImg={profileImg} size={40} />
        <div>
          <strong>{userName}</strong>
          {intro ? <p>{intro}</p> : ""}
          {id ? <p>@{account}</p> : ""}
        </div>
      </Link>
      {children}
      {more ? (
        <button type="button">
          <img src={iconDots} alt="더 보기" />
        </button>
      ) : (
        ""
      )}
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
