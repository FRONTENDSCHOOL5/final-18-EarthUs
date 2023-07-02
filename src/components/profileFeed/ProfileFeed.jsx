/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { Link, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import grid from "../../assets/images/grid-view.svg";
import layer from "../../assets/images/layer-image.svg";
import Nodata from "../../assets/images/no-data.svg";
import column from "../../assets/images/spred-view.svg";
import useApiInfiniteQuery from "../../hooks/useApiInfiniteQuery";
import A11yHidden from "../common/a11yHidden/A11yHidden";
import BreakLine from "../common/breakLine/BreakLine";
import Card from "../common/card/Card";

import { ProfileFeedWrap, ViewBtn, FeedView, Img } from "./profileFeed.style";

export default function ProfileFeed() {
  const { account } = useParams();
  const [currentMode, setCurrentMode] = useState("column");

  const {
    data: feedData,
    hasNextPage: feedHasNextPage,
    fetchNextPage: feedFetchNextPage,
  } = useApiInfiniteQuery(`/post/${account}/userpost`, "post");

  const handleViewMode = view => {
    setCurrentMode(view);
  };
  const viewModes = [
    { icon: column, label: "1열 보기", mode: "column" },
    { icon: grid, label: "3열 보기", mode: "grid" },
  ];

  return (
    <InfiniteScroll
      hasMore={feedHasNextPage}
      loadMore={() => feedFetchNextPage()}
    >
      <ProfileFeedWrap>
        {feedData &&
          feedData.pages &&
          feedData.pages.some(page =>
            page.post ? page.post.length !== 0 : false,
          ) && (
            <>
              <header>
                <h2>
                  <A11yHidden>피드</A11yHidden>
                </h2>
                {viewModes.map(({ icon, label, mode }) => (
                  <ViewBtn
                    key={mode}
                    type="button"
                    icon={icon}
                    active={currentMode === mode}
                    onClick={() => handleViewMode(mode)}
                  >
                    <A11yHidden>{label}</A11yHidden>
                  </ViewBtn>
                ))}
              </header>

              {/* view 값에 따라 1열 또는 3열로 표기 */}
              <FeedView currentMode={currentMode}>
                {feedData.pages.map(page => {
                  return (
                    <React.Fragment key={uuidv4()}>
                      {page.post.map(item =>
                        currentMode === "grid" ? (
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
  // * 이미지가 로드되지 않았을 때 onError 이벤트 핸들러 실행
  const [hasImageError, setHasImageError] = useState(false);
  const handleImgError = e => {
    e.target.onerror = null;
    e.target.src = Nodata;
    setHasImageError(true);
  };

  const { id, image } = item;
  // * 등록된 이미지가 1개 이상이라면 배열로 변환
  const multipartImages =
    typeof image === "string"
      ? image.trim().replace(/\s+/g, "").split(",")
      : [image];

  return (
    image && (
      <Link to={`/post/${id}/`} key={id}>
        <Img
          key={id}
          src={multipartImages[0]}
          alt=""
          onError={handleImgError}
          hasError={hasImageError}
        />
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
      postId={id}
    >
      <BreakLine content={content} />
    </Card>
  );
}
