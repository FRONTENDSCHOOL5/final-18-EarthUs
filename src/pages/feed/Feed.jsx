/* eslint-disable no-underscore-dangle */
import React from "react";
import { useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";

import Blank from "../../components/blank/Blank";
import Card from "../../components/common/card/Card";
import TabBar from "../../components/common/tabBar/TabBar";
import useApiQuery from "../../hooks/useApiQuery";
import earthusDataAtom from "../../recoil/earthusDataAtom";
import userDataAtom from "../../recoil/userDataAtom";

import FeedWrap from "./feed.style";

export default function Feed() {
  const { pathname } = useLocation();

  const earthusData = useRecoilValue(earthusDataAtom);
  const userData = useRecoilValue(userDataAtom);

  const isNewsletterPage = pathname === "/newsletter";

  const { data: home } = useApiQuery("/post/feed", "get");

  const { data: isFollowing } = useApiQuery(
    `/profile/${userData.accountname}/following`,
    "get",
  );

  const { data: newsletter } = useApiQuery(
    `/post/${earthusData.accountname}/userpost`,
    "get",
  );

  return (
    <FeedWrap>
      {/* NewsLetter */}
      {isNewsletterPage &&
        newsletter &&
        newsletter.post.map(v => {
          return (
            <Card
              key={v.id}
              accountname={v.author.accountname}
              profileImage={v.author.image}
              username={v.author.username}
              id={v.author.accountname}
              postImage={v.image}
              content={v.content}
              heartCount={v.heartCount}
              commentCount={v.commentCount}
              time={`${v.createdAt.slice(0, 10).split("-")[0]}년 ${
                v.createdAt.slice(0, 10).split("-")[1]
              }월 ${v.createdAt.slice(0, 10).split("-")[2]}일`}
              postID={v.id}
              hearted={v.hearted}
            />
          );
        })}

      {/* Home */}
      {!isNewsletterPage && isFollowing && isFollowing.length === 0 && (
        <Blank btn="유저 검색하기">유저를 검색해 팔로우 해보세요!</Blank>
      )}
      {!isNewsletterPage &&
        home &&
        home.posts
          .filter(v => v.author._id !== earthusData.id)
          .map(v => {
            return (
              <>
                <Card
                  key={v.id}
                  accountname={v.author.accountname}
                  profileImage={v.author.image}
                  username={v.author.username}
                  id={v.author.accountname}
                  postImage={v.image}
                  content={v.content}
                  heartCount={v.heartCount}
                  commentCount={v.commentCount}
                  time={`${v.createdAt.slice(0, 10).split("-")[0]}년 ${
                    v.createdAt.slice(0, 10).split("-")[1]
                  }월 ${v.createdAt.slice(0, 10).split("-")[2]}일`}
                  postID={v.id}
                  hearted={v.hearted}
                />
                <TabBar />
              </>
            );
          })}
    </FeedWrap>
  );
}
