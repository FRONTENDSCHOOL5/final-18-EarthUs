/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import React from "react";
import InfiniteScroll from "react-infinite-scroller";
import { Link, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import grid from "../../assets/images/grid-view.svg";
import layer from "../../assets/images/layer-image.svg";
import column from "../../assets/images/spred-view.svg";
import useApiInfiniteQuery from "../../hooks/useApiInfiniteQuery";
import A11yHidden from "../common/a11yHidden/A11yHidden";
import BreakLine from "../common/breakLine/BreakLine";
import Card from "../common/card/Card";

import { ProfileFeedWrap, ViewBtn, FeedView } from "./profileFeed.style";

export default function ProfileFeed() {
  const { account, view } = useParams();
  const {
    data: feedData,
    hasNextPage: feedHasNextPage,
    fetchNextPage: feedFetchNextPage,
  } = useApiInfiniteQuery(`/post/${account}/userpost`, "post");

  return (
    <InfiniteScroll
      hasMore={feedHasNextPage}
      loadMore={() => feedFetchNextPage()}
    >
      <ProfileFeedWrap>
        {/* {feedData && ( */}
        {feedData && feedData.pages.some(page => page.post.length !== 0) && (
          <>
            <header>
              <h2>
                <A11yHidden>피드</A11yHidden>
              </h2>
              <ViewBtn to={`/profile/${account}/column`} icon={column}>
                <A11yHidden>1열 보기</A11yHidden>
              </ViewBtn>
              <ViewBtn to={`/profile/${account}/grid`} icon={grid}>
                <A11yHidden>3열 보기</A11yHidden>
              </ViewBtn>
            </header>

            {/* view 값에 따라 1열 또는 3열로 표기 */}
            <FeedView view={view}>
              {feedData.pages.map(page => {
                return (
                  <React.Fragment key={uuidv4()}>
                    {page.post.map(item =>
                      view === "grid" ? (
                        <GridView key={item.id} item={item} layer={layer} />
                      ) : (
                        <ColumnView key={item.id} item={item} />
                      ),
                    )}
                  </React.Fragment>
                );
              })}
            </FeedView>
          </>
        )}
      </ProfileFeedWrap>
    </InfiniteScroll>
  );
}

function GridView({ item }) {
  const { id, image } = item;
  // * 등록된 이미지가 1개 이상이라면 배열로 변환
  const multipartImages =
    typeof image === "string"
      ? image.trim().replace(/\s+/g, "").split(",")
      : [image];

  return (
    image && (
      <Link to={`/post/${id}/`} key={id}>
        <img key={id} src={multipartImages[0]} alt="게시물 이미지" />
        {multipartImages.length > 1 && (
          <span>
            <img
              src={layer}
              alt={`${multipartImages.length}장의 게시물 이미지`}
            />
          </span>
        )}
      </Link>
    )
  );
}

function ColumnView({ item }) {
  const {
    id,
    image,
    content,
    author,
    heartCount,
    hearted,
    commentCount,
    createdAt,
  } = item;
  const time = createdAt.slice(0, 10).split("-");
  return (
    <Card
      key={id}
      id={id}
      accountname={author.accountname}
      profileImage={author.image}
      username={author.username}
      postImage={image}
      heartCount={heartCount}
      commentCount={commentCount}
      time={`${time[0]}년 ${time[1]}월 ${time[2]}일`}
      hearted={hearted}
      postID={id}
    >
      <BreakLine content={content} />
    </Card>
  );
}
