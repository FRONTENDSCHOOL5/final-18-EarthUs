/* eslint-disable react/no-array-index-key */
/* eslint-disable no-shadow */
/* eslint-disable no-console */
import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useLocation, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";

import Button from "../../components/common/button/Button";
import UserInfo from "../../components/userInfo/UserInfo";
import useApiInfiniteQuery from "../../hooks/useApiInfiniteQuery";
import useApiMutation from "../../hooks/useApiMutation";
import modalConfigState from "../../recoil/modalConfigAtom";
import modalState from "../../recoil/modalStateAtom";

import Follows from "./follow.style";

export default function Follow() {
  const { pathname } = useLocation();
  const { account } = useParams();

  const followPage =
    pathname === `/profile/${account}/following` ? "following" : "follower";

  const queryClient = useQueryClient();

  const [followUrl, setFollowUrl] = useState(null);
  const [unfollowUrl, setUnfollowUrl] = useState(null);

  const { data, hasNextPage, fetchNextPage } = useApiInfiniteQuery(
    `/profile/${account}/${followPage}`,
  );
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

  const setModalOpen = useSetRecoilState(modalState);
  const setModalConfig = useSetRecoilState(modalConfigState);

  // 알림설정 모달
  const manageNotifications = e => {
    e.stopPropagation();
    setModalConfig({
      type: "confirm",
      title: "알림을 설정할까요?",
      buttons: [
        {
          label: "해제",
          onClick: e => {
            e.stopPropagation();
            setModalOpen(false); // close modal
          },
        },
        {
          label: "설정",
          onClick: e => {
            e.stopPropagation();
            setModalOpen(false); // close modal
          },
        },
      ],
    });
    setModalOpen(true);
  };
  const manageNotificationsModal = (e, accountname) => {
    e.stopPropagation();
    setModalConfig({
      type: "bottomSheet",
      title: `@${accountname}`,
      buttons: [
        {
          label: "알림 관리",
          onClick: e => manageNotifications(e),
        },
      ],
    });
    setModalOpen(true);
  };

  return (
    <section>
      {data && (
        <InfiniteScroll hasMore={hasNextPage} loadMore={() => fetchNextPage()}>
          <Follows>
            {data.pages.map((page, i) => {
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
                      <UserInfo
                        key={_id}
                        account={accountname}
                        profileImg={image}
                        userName={username}
                        intro={intro}
                        more
                        handleModal={e =>
                          manageNotificationsModal(e, accountname)
                        }
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
                </React.Fragment>
              );
            })}
          </Follows>
        </InfiniteScroll>
      )}
    </section>
  );
}
