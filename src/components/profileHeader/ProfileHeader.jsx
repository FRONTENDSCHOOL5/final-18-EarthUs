/* eslint-disable no-console */
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useRecoilState, useSetRecoilState } from "recoil";

import useApiMutation from "../../hooks/useApiMutation";
import useApiQuery from "../../hooks/useApiQuery";
import modalConfigState from "../../recoil/modalConfigAtom";
import modalState from "../../recoil/modalStateAtom";
import userDataAtom from "../../recoil/userDataAtom";
import {
  getProfileEditPath,
  getProfileDetailPath,
  getFollowingPath,
  getFollowerPath,
  CHAT_LIST,
  PRODUCT_UPLOAD,
} from "../../utils/config";
import A11yHidden from "../common/a11yHidden/A11yHidden";
import Avatar from "../common/avatar/Avatar";
import Button from "../common/button/Button";

import { ProfileHeaderWrap, ProfileButtonArea } from "./profileHeader.style";

export default function ProfileHeader() {
  const { account } = useParams();
  const navigate = useNavigate();
  const PROFILE_EDIT = getProfileEditPath(account);
  const PROFILE_DETAIL = getProfileDetailPath(account);
  const PROFILE_FOLLOWING = getFollowingPath(account);
  const PROFILE_FOLLOWER = getFollowerPath(account);

  // * 커스텀 훅을 통한 API 호출으로 유저 정보 표시
  const { data } = useApiQuery(`/profile/${account}`, "get");

  // * 유저데이터를 가져오기 위한 userDataAtom 사용
  const [userData] = useRecoilState(userDataAtom);
  const myName = userData ? userData.accountname.trim().toLowerCase() : "";
  const queryClient = useQueryClient();

  // * 유저 언팔로우
  const getUnfollow = useApiMutation(
    `/profile/${account}/unfollow`,
    "DELETE",
    { data },
    {
      onSuccess: () => {
        console.log("요청에 성공했습니다.");
        queryClient.invalidateQueries(PROFILE_DETAIL);
      },
    },
  );

  // * 유저 팔로우
  const getFollow = useApiMutation(
    `/profile/${account}/follow`,
    "POST",
    { data },
    {
      onSuccess: () => {
        console.log("요청에 성공했습니다.");
        queryClient.invalidateQueries(PROFILE_DETAIL);
      },
      onError: () => {
        console.log("요청에 실패했습니다.");
      },
    },
  );

  // * 전역 상태 관리를 위한 Recoil State
  const setModalOpen = useSetRecoilState(modalState);
  const setModalConfig = useSetRecoilState(modalConfigState);

  // * 공유하기 모달 데이터
  const setShareConfirm = () => {
    // 이벤트 사용하면 'e' 인자 추가. 아니면 생략
    setModalConfig({
      type: "confirm",
      title: "공유하기",
      body: "준비중",
      buttons: [
        {
          label: "닫기",
          onClick: () => setModalOpen(false),
        },
      ],
    });
    setModalOpen(true);
  };

  // data가 없으면 null 반환
  if (!data) return null;
  const {
    image,
    username,
    isfollow,
    accountname,
    intro,
    followingCount,
    followerCount,
  } = data.profile;

  return (
    <ProfileHeaderWrap>
      <h2>
        <A11yHidden>회원 정보</A11yHidden>
      </h2>
      <Avatar profileImg={image} size={64} />
      <ul>
        <li className="share">
          <h3>
            <span>@{accountname}</span>
            {username}
          </h3>
          <button type="button" onClick={setShareConfirm}>
            <A11yHidden>공유하기</A11yHidden>
          </button>
        </li>
        <li className="intro">{intro}</li>
        <li className="follow">
          <Link to={PROFILE_FOLLOWER}>
            팔로워
            <strong>
              {new Intl.NumberFormat("ko", { currency: "KRW" }).format(
                followerCount,
              )}
            </strong>
          </Link>
          <Link to={PROFILE_FOLLOWING}>
            팔로잉
            <strong>
              {new Intl.NumberFormat("ko", { currency: "KRW" }).format(
                followingCount,
              )}
            </strong>
          </Link>
        </li>
      </ul>

      <ProfileButtonArea>
        {/* account와 accountname이 동일하지 않다면 실행 () */}
        {account.trim().toLowerCase() !== myName ? (
          <>
            {/* isfollow 여부에 따라 버튼 조건부 노출 */}
            <Button
              size="sm"
              variant={isfollow ? "white" : "primary"}
              onClick={() =>
                isfollow ? getUnfollow.mutate() : getFollow.mutate()
              }
            >
              {isfollow ? "언팔로우" : "팔로우"}
            </Button>
            <Button
              size="sm"
              variant="primary"
              type="button"
              onClick={() => navigate(CHAT_LIST)}
            >
              메시지
            </Button>
          </>
        ) : (
          <>
            <Button
              size="sm"
              variant="white"
              type="button"
              onClick={() => navigate(PROFILE_EDIT)}
            >
              프로필 수정
            </Button>
            <Button
              size="sm"
              variant="white"
              type="button"
              onClick={() => navigate(PRODUCT_UPLOAD)}
            >
              상품 업로드
            </Button>
          </>
        )}
      </ProfileButtonArea>
    </ProfileHeaderWrap>
  );
}
