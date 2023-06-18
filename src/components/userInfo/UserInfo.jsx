import React from "react";
import { useRecoilState } from "recoil";

import iconDots from "../../assets/images/dots.svg";
import userDataAtom from "../../recoil/userDataAtom";
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
  handleModal,
}) {
  // * 유저데이터를 가져오기 위한 userDataAtom 사용
  const [userData] = useRecoilState(userDataAtom);
  // eslint-disable-next-line no-underscore-dangle
  // const myName = userData ? userData.accountname.trim().toLowerCase() : "";
  const myName =
    userData && userData.accountname
      ? userData.accountname.trim().toLowerCase()
      : "";

  // Link 랜더링 조건부 출력
  function renderLinkContent() {
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
    <Users>
      {account.trim().toLowerCase() !== myName ? (
        <UserHeader to={`/profile/${account}`}>
          {renderLinkContent()}
        </UserHeader>
      ) : (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <UserHeader to="#" disabled>
          {renderLinkContent()}
        </UserHeader>
      )}
      {children}
      {more ? (
        <button type="button" onClick={handleModal}>
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
