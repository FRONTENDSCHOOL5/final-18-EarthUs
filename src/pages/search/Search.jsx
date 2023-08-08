import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import A11yHidden from "../../components/common/a11yHidden/A11yHidden";
import Button from "../../components/common/button/Button";
import UserInfo from "../../components/userInfo/UserInfo";
import useApiMutation from "../../hooks/useApiMutation";
import useApiQuery from "../../hooks/useApiQuery";

import SearchResult from "./Search.style";

export default function Search() {
  const location = useLocation();
  const { account } = useParams();

  const searchParams = new URLSearchParams(location.search);
  const searchKeyword = searchParams.get("keyword") || "";

  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const [resultsToShow, setResultsToShow] = useState(12);
  const [timer, setTimer] = useState(null);

  // * 바운싱 현상 해결
  useEffect(() => {
    clearTimeout(timer); // 이전 타이머 클리어
    const newTimer = setTimeout(() => {
      setDebouncedKeyword(searchKeyword);
    }, 700);
    setTimer(newTimer);

    return () => {
      clearTimeout(newTimer); // 컴포넌트 언마운트 시 타이머 클리어
    };
  }, [searchKeyword]);

  // * 검색 API 호출
  const { data } = useApiQuery(
    debouncedKeyword && `/user/searchuser/?keyword=${debouncedKeyword}`,
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

  const handleLoadMore = () => {
    setResultsToShow(prevResults => prevResults + 12);
  };

  // * data 배열 정의
  let limitedData = [];
  if (Array.isArray(data)) {
    limitedData = data.slice(0, resultsToShow);
  } else {
    return null;
  }

  return (
    <section>
      <h2>
        <A11yHidden>검색 결과</A11yHidden>
      </h2>
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
              type="button"
            >
              {v.isfollow ? "팔로잉" : "팔로우"}
            </Button>
          </UserInfo>
        ))}
      {data && data.length > resultsToShow && (
        <SearchResult onClick={handleLoadMore} type="button">
          더 보기
        </SearchResult>
      )}
    </section>
  );
}
