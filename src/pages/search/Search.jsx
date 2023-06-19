import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import Button from "../../components/common/button/Button";
import UserInfo from "../../components/userInfo/UserInfo";
import useApiMutation from "../../hooks/useApiMutation";
import useApiQuery from "../../hooks/useApiQuery";

export default function Search() {
  const location = useLocation();
  const { account } = useParams();

  const searchParams = new URLSearchParams(location.search);
  const searchKeyword = searchParams.get("keyword") || "";

  // 검색 API 호출
  const { data } = useApiQuery(
    searchKeyword ? `/user/searchuser/?keyword=${searchKeyword}` : null,
    "get",
  );
  const queryClient = useQueryClient();

  const [followUrl, setFollowUrl] = useState(null);
  const [unfollowUrl, setUnfollowUrl] = useState(null);

  // * 유저 팔로우
  // 클릭한 user의 accountname을 가져와서 해당 유저 팔로우
  const makeFollow = useApiMutation(
    followUrl,
    "POST",
    {},
    {
      onSuccess: () => {
        console.log("팔로우");
        queryClient.invalidateQueries(`/profile/${account}/follow`);
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
        queryClient.invalidateQueries(`/profile/${account}/unfollow`);
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

  if (data === undefined) {
    console.log("검색에 실패했습니다.");
  }

  // 검색 결과 최대 10개까지 출력
  const limitedData = data && data.slice(0, 10);

  return (
    <div>
      {limitedData &&
        limitedData.map(v => (
          <UserInfo
            key={v.accountname}
            account={v.accountname}
            profileImg={v.image}
            userName={v.username}
            id={v.accountname}
            searchKeyword={searchKeyword}
          >
            <Button
              size="sm"
              variant={v.isfollow ? "white" : "primary"}
              onClick={() =>
                v.isfollow
                  ? handleUnfollow(v.accountname)
                  : handleFollow(v.accountname)
              }
            >
              {v.isfollow ? "팔로잉" : "팔로우"}
            </Button>
          </UserInfo>
        ))}
    </div>
  );
}
