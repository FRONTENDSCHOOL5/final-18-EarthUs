/* eslint-disable no-console */
import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import Button from "../../components/common/button/Button";
import UserInfo from "../../components/userInfo/UserInfo";
import useApiMutation from "../../hooks/useApiMutation";
import useApiQuery from "../../hooks/useApiQuery";

import Follows from "./follow.style";

export default function Follow() {
  const { pathname } = useLocation();
  const { account } = useParams();

  const followPage =
    pathname === `/profile/${account}/following` ? "following" : "follower";

  const queryClient = useQueryClient();

  const [followUrl, setFollowUrl] = useState(null);
  const [unfollowUrl, setUnfollowUrl] = useState(null);

  const { data } = useApiQuery(`/profile/${account}/${followPage}`, "get");

  // * 유저 팔로우
  // 클릭한 user의 accountname을 가져와서 해당 유저 팔로우
  const makeFollow = useApiMutation(
    followUrl,
    "POST",
    {},
    {
      onSuccess: () => {
        console.log("팔로우");
        queryClient.invalidateQueries(`/profile/${account}/${followPage}`);
      },
      onError: () => {
        console.log("요청에 실패했습니다.");
      },
    },
  );

  // * 유저 언팔로우
  // 클릭한 user의 accountname을 가져와서 해당 유저 언팔로우
  const makeUnfollow = useApiMutation(
    unfollowUrl,
    "DELETE",
    {},
    {
      onSuccess: () => {
        console.log("팔로잉");
        queryClient.invalidateQueries(`/profile/${account}/${followPage}`);
      },
      onError: () => {
        console.log("요청에 실패했습니다.");
      },
    },
  );

  const handleFollow = accountName => {
    const url = `/profile/${accountName}/follow`;
    setFollowUrl(url);
    makeFollow.mutate();
  };

  const handleUnfollow = accountName => {
    const url = `/profile/${accountName}/unfollow`;
    setUnfollowUrl(url);
    makeUnfollow.mutate();
  };

  return (
    <Follows>
      {data &&
        data.map(v => {
          const { _id, accountname, image, username, intro, isfollow } = v;

          return (
            <UserInfo
              key={_id}
              account={accountname}
              profileImg={image}
              userName={username}
              intro={intro}
            >
              <Button
                size="sm"
                variant={isfollow ? "white" : "primary"}
                onClick={() =>
                  isfollow
                    ? handleUnfollow(accountname)
                    : handleFollow(accountname)
                }
              >
                {isfollow ? "팔로잉" : "팔로우"}
              </Button>
            </UserInfo>
          );
        })}
    </Follows>
  );
}
