/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import grid from "../../assets/images/grid-view.svg";
import column from "../../assets/images/spred-view.svg";
import useApiInfiniteQuery from "../../hooks/useApiInfiniteQuery";
import A11yHidden from "../common/a11yHidden/A11yHidden";
import ColumnView from "../View/ColumnView";
import GridView from "../View/GridView";

import { ProfileFeedWrap, ViewBtn, FeedView } from "./profileFeed.style";

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
                          <GridView key={item.id} item={item} />
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
