/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import React, { useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useRecoilState, useSetRecoilState } from "recoil";

import grid from "../../assets/images/grid-view.svg";
import layer from "../../assets/images/layer-image.svg";
import column from "../../assets/images/spred-view.svg";
import useApiMutation from "../../hooks/useApiMutation";
import useApiQuery from "../../hooks/useApiQuery";
import modalConfigState from "../../recoil/modalConfigAtom";
import modalState from "../../recoil/modalStateAtom";
import userDataAtom from "../../recoil/userDataAtom";
import A11yHidden from "../common/a11yHidden/A11yHidden";
import Card from "../common/card/Card";

import { ProfileFeedWrap, ViewBtn, FeedView } from "./profileFeed.style";

function GridView({ item }) {
  const { id, image } = item;
  const apiImg = image ? image.split(",") : [];

  return (
    image && (
      <Link to={`/post/${id}/`} key={id}>
        <img key={id} src={apiImg} alt="게시물 이미지" />
        {apiImg.length > 1 && (
          <span>
            <img src={layer} alt={`${apiImg.length}장의 게시물 이미지`} />
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
    account,
    commentCount,
    createdAt,
    hearted,
  } = item;
  const time = createdAt.slice(0, 10).split("-");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // * 전역 상태 관리를 위한 Recoil State 가져오기
  const setModalOpen = useSetRecoilState(modalState);
  const setModalConfig = useSetRecoilState(modalConfigState);

  const [deleteFeed, setDeleteFeed] = useState(null);
  const [userData] = useRecoilState(userDataAtom);
  const myName = userData ? userData.accountname.trim().toLowerCase() : "";

  // * 피드아이템 삭제
  // eslint-disable-next-line no-unused-vars
  const deleteFeedMutation = useApiMutation(
    deleteFeed,
    "DELETE",
    {},
    {
      onSuccess: () => {
        // eslint-disable-next-line no-console
        console.log("게시물이 삭제되었습니다.");
        queryClient.invalidateQueries(`/profile/${account}`);
      },
    },
  );

  const handleDeleteFeed = postId => {
    const url = `/post/${postId}`;
    setDeleteFeed(url);
    deleteFeedMutation.mutate();
  };

  // * 신고하기 API 호출
  const [reports, setReports] = useState(null);
  const setReportMutation = useApiMutation(
    reports,
    "POST",
    {},
    {
      onSuccess: () => {
        // eslint-disable-next-line no-console
        console.log("신고되었습니다.");
      },
    },
  );

  const handleReport = postId => {
    const url = `/post/${postId}/report`;
    setReports(url);
    setReportMutation.mutate();
  };

  // * 신고하기 모달
  const reportConfirm = e => {
    e.stopPropagation();
    setModalConfig({
      type: "confirm",
      title: "게시물을 신고하시겠어요?",
      buttons: [
        {
          label: "취소",
          onClick: e => {
            e.stopPropagation();
            setModalOpen(false);
          },
        },
        {
          label: "신고하기",
          onClick: () => handleReport(id),
        },
      ],
    });
    setModalOpen(true);
  };

  // * 수정/삭제 모달
  const deleteConfirm = e => {
    e.stopPropagation();
    setModalConfig({
      type: "confirm",
      title: "파일을 삭제하시겠어요?",
      buttons: [
        {
          label: "취소",
          onClick: e => {
            e.stopPropagation();
            setModalOpen(false);
          },
        },
        {
          label: "삭제",
          onClick: () => handleDeleteFeed(id),
        },
      ],
    });
    setModalOpen(true);
  };
  const deleteCardModal = e => {
    e.stopPropagation();
    setModalConfig({
      type: "bottomSheet",
      buttons: [
        {
          label: "삭제",
          onClick: e => deleteConfirm(e),
        },
        {
          label: "수정",
          onClick: () => navigate(`/post/${id}/edit`),
        },
      ],
    });
    setModalOpen(true);
  };

  return (
    <Card
      key={id}
      accountname={author.accountname}
      profileImage={author.image}
      username={author.username}
      postImage={image}
      heartCount={heartCount}
      commentCount={commentCount}
      id={id}
      time={`${time[0]}년 ${time[1]}월 ${time[2]}일`}
      handleModal={
        author.accountname.trim().toLowerCase() === myName
          ? e => deleteCardModal(e)
          : e => reportConfirm(e)
      }
    >
      <DisplayPost content={content} />
    </Card>
  );
}

// 줄바꿈 인식해서 Formatting
function DisplayPost({ content }) {
  const formattedContent = content.split("\n").map((line, index) => (
    // eslint-disable-next-line react/no-array-index-key
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ));

  return <span>{formattedContent}</span>;
}

export default function ProfileFeed() {
  const { account, view } = useParams();
  const { data } = useApiQuery(`/post/${account}/userpost`, "get");

  return (
    <ProfileFeedWrap>
      {data && (
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
            {data.post.map(item =>
              view === "grid" ? (
                <GridView key={item.id} item={item} layer={layer} />
              ) : (
                <ColumnView key={item.id} item={item} />
              ),
            )}
          </FeedView>
        </>
      )}
    </ProfileFeedWrap>
  );
}
