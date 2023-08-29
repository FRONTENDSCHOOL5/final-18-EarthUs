/* eslint-disable no-console */
import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useRecoilState } from "recoil";

import useApiMutation from "../../hooks/useApiMutation";
import useApiQuery from "../../hooks/useApiQuery";
import useModal from "../../hooks/useModal";
import useScript from "../../hooks/useScript";
import userDataAtom from "../../recoil/userDataAtom";
import {
  getProfileEditPath,
  getProfileDetailPath,
  getFollowingPath,
  getFollowerPath,
  CHAT_ROOM,
  PRODUCT_UPLOAD,
} from "../../utils/config";
import A11yHidden from "../common/a11yHidden/A11yHidden";
import Avatar from "../common/avatar/Avatar";
import Button from "../common/button/Button";

import setShareConfirm from "./profileHeader.modal";
import { ProfileHeaderWrap, ProfileButtonArea } from "./profileHeader.style";

export default function ProfileHeader() {
  const { account } = useParams();
  const navigate = useNavigate();
  const { setModal, setModalOpen } = useModal();
  const currentUrl = window.location.href;
  const status = useScript("https://developers.kakao.com/sdk/js/kakao.js");

  // kakao sdk 초기화하기
  // status가 변경될 때마다 실행되며, status가 ready일 때 초기화 시도.
  useEffect(() => {
    if (status === "ready" && window.Kakao) {
      // 중복 initialization 방지
      if (!window.Kakao.isInitialized()) {
        // javascript key를 이용하여 initialize
        window.Kakao.init("05b3a9097cbe6c981e32a37ca018e864");
      }
    }
  }, [status]);

  const handleKakaoButton = () => {
    window.Kakao.Link.sendScrap({
      requestUrl: currentUrl,
    });
  };

  const PROFILE_EDIT = getProfileEditPath(account);
  const PROFILE_DETAIL = getProfileDetailPath(account);
  const PROFILE_FOLLOWING = getFollowingPath(account);
  const PROFILE_FOLLOWER = getFollowerPath(account);

  // * 커스텀 훅을 통한 API 호출으로 유저 정보 표시
  const { data } = useApiQuery(`/profile/${account}`, "get");
  // 404 에러 처리
  useEffect(() => {
    if (data && data.response && data.response.status === 404) {
      navigate("/error");
    }
  }, [data, navigate]);

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

  // data가 없으면 null 반환
  if (!data || !data.profile) return null;
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
    data && (
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
            <button
              type="button"
              onClick={e => {
                setShareConfirm(e, setModal, setModalOpen, handleKakaoButton);
              }}
            >
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
                onClick={() => navigate(CHAT_ROOM)}
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
    )
  );
}
