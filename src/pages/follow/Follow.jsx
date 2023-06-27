/* eslint-disable react/no-array-index-key */
/* eslint-disable no-shadow */
/* eslint-disable no-console */
import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import Blank from "../../components/blank/Blank";
import A11yHidden from "../../components/common/a11yHidden/A11yHidden";
import Button from "../../components/common/button/Button";
import TabBar from "../../components/common/tabBar/TabBar";
import UserInfo from "../../components/userInfo/UserInfo";
import useApiInfiniteQuery from "../../hooks/useApiInfiniteQuery";
import useApiMutation from "../../hooks/useApiMutation";
import { SEARCH } from "../../utils/config";

import Follows from "./follow.style";

export default function Follow() {
  const { pathname } = useLocation();
  const { account } = useParams();
  const navigate = useNavigate();

  const followPage =
    pathname === `/profile/${account}/following` ? "following" : "follower";

  const queryClient = useQueryClient();

  const [followUrl, setFollowUrl] = useState(null);
  const [unfollowUrl, setUnfollowUrl] = useState(null);

  const { data, hasNextPage, fetchNextPage } = useApiInfiniteQuery(
    `/profile/${account}/${followPage}`,
  );
  console.log(data);
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
    <section>
      <h3>
        <A11yHidden>
          {followPage === "follower" ? "팔로워 목록" : "팔로잉 목록"}
        </A11yHidden>
      </h3>
      {data && data.pages && data.pages[0].length === 0 && (
        <Blank btn="유저 검색하기" onClick={() => navigate(SEARCH)}>
          유저를 검색해 팔로우 해보세요!
        </Blank>
      )}
      {data && (
        <InfiniteScroll hasMore={hasNextPage} loadMore={() => fetchNextPage()}>
          <Follows>
            {data.pages &&
              data.pages.map((page, i) => {
                return (
                  <React.Fragment key={i}>
                    {page.map(v => {
                      const {
                        _id,
                        accountname,
                        image,
                        username,
                        intro,
                        isfollow,
                      } = v;
                      return (
                        <>
                          <UserInfo
                            key={_id}
                            account={accountname}
                            profileImg={image}
                            userName={username}
                            intro={intro}
                            more
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
                          <TabBar />
                        </>
                      );
                    })}
                  </React.Fragment>
                );
              })}
          </Follows>
        </InfiniteScroll>
      )}
    </section>
  );
}
