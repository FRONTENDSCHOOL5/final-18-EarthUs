/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */
import React from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { v4 as uuidv4 } from "uuid";

import Blank from "../../components/blank/Blank";
import A11yHidden from "../../components/common/a11yHidden/A11yHidden";
import BreakLine from "../../components/common/breakLine/BreakLine";
import Card from "../../components/common/card/Card";
import TabBar from "../../components/common/tabBar/TabBar";
import useApiInfiniteQuery from "../../hooks/useApiInfiniteQuery";
import useApiQuery from "../../hooks/useApiQuery";
import earthusDataAtom from "../../recoil/earthusDataAtom";
import userDataAtom from "../../recoil/userDataAtom";
import { SEARCH } from "../../utils/config";

import FeedWrap from "./feed.style";

export default function Feed() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const earthusData = useRecoilValue(earthusDataAtom);
  const userData = useRecoilValue(userDataAtom);

  const isNewsletterPage = pathname === "/newsletter";

  const {
    data: home,
    hasNextPage: homeHasNextPage,
    fetchNextPage: homeFetchNextPage,
  } = useApiInfiniteQuery("/post/feed", "posts");
  console.log(home);
  const { data: isFollowing } = useApiQuery(
    `/profile/${userData.accountname}/following`,
    "get",
  );

  const {
    data: newsletterData,
    hasNextPage: newsletterHasNextPage,
    fetchNextPage: newsletterFetchNextPage,
  } = useApiInfiniteQuery(`/post/${earthusData.accountname}/userpost`, "post");

  return (
    <section>
      <h3>
        <A11yHidden>
          {isNewsletterPage ? "뉴스레터 피드 게시글" : "홈 피드 게시글"}
        </A11yHidden>
      </h3>
      {/* NewsLetter */}
      {isNewsletterPage && newsletterData && (
        <InfiniteScroll
          hasMore={newsletterHasNextPage}
          loadMore={() => newsletterFetchNextPage()}
        >
          <FeedWrap>
            {newsletterData.pages.map(page => {
              return (
                <React.Fragment key={uuidv4()}>
                  {page.post.map(v => {
                    return (
                      <Card
                        key={v.id}
                        accountname={v.author.accountname}
                        profileImage={v.author.image}
                        username={v.author.username}
                        id={v.author.accountname}
                        postImage={v.image}
                        heartCount={v.heartCount}
                        commentCount={v.commentCount}
                        time={`${v.createdAt.slice(0, 10).split("-")[0]}년 
                        ${v.createdAt.slice(0, 10).split("-")[1]}월 
                        ${v.createdAt.slice(0, 10).split("-")[2]}일`}
                        postId={v.id}
                        hearted={v.hearted}
                      >
                        <BreakLine content={v.content} />
                      </Card>
                    );
                  })}
                </React.Fragment>
              );
            })}
          </FeedWrap>
        </InfiniteScroll>
      )}

      {/* Home */}
      {/* 팔로잉 없을 경우 */}
      {!isNewsletterPage && isFollowing && isFollowing.length === 0 && (
        <Blank btn="유저 검색하기" onClick={() => navigate(SEARCH)}>
          유저를 검색해 팔로우 해보세요!
        </Blank>
      )}
      {/* 팔로잉은 있지만 올린 게시글이 없는 경우 */}
      {!isNewsletterPage && home && home.pages[0].posts.length === 0 && (
        <Blank btn="유저 검색하기" onClick={() => navigate(SEARCH)}>
          유저를 검색해 팔로우 해보세요!
        </Blank>
      )}
      {/* 팔로잉이 있고 올린 게시글이 있는 경우 */}
      {!isNewsletterPage && home && (
        <InfiniteScroll
          hasMore={homeHasNextPage}
          loadMore={() => homeFetchNextPage()}
        >
          <FeedWrap>
            {home.pages.map(page => {
              return (
                <React.Fragment key={uuidv4()}>
                  {page.posts
                    .filter(v => v.author._id !== earthusData.id)
                    .map(v => {
                      return (
                        <React.Fragment key={uuidv4()}>
                          <Card
                            key={v.id}
                            accountname={v.author.accountname}
                            profileImage={v.author.image}
                            username={v.author.username}
                            id={v.author.accountname}
                            postImage={v.image}
                            heartCount={v.heartCount}
                            commentCount={v.commentCount}
                            time={`${v.createdAt.slice(0, 10).split("-")[0]}년 
                            ${v.createdAt.slice(0, 10).split("-")[1]}월 
                              ${v.createdAt.slice(0, 10).split("-")[2]}일`}
                            postId={v.id}
                            hearted={v.hearted}
                          >
                            <BreakLine content={v.content} />
                          </Card>
                          <TabBar />
                        </React.Fragment>
                      );
                    })}
                </React.Fragment>
              );
            })}
          </FeedWrap>
        </InfiniteScroll>
      )}
    </section>
  );
}
