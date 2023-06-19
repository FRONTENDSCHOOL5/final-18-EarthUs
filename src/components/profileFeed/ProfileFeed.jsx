/* eslint-disable no-unused-vars */
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

  const handleDeleteFeed = feedId => {
    const url = `/post/${feedId}`;
    setDeleteFeed(url);
    deleteFeedMutation.mutate();
  };

  // * 신고하기
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

  const handleReport = feedId => {
    const url = `/post/${feedId}`;
    setReports(url);
    setReportMutation.mutate();
  };

  // * 신고하기 모달
  const setReport = (e, prodId) => {
    e.stopPropagation();
    setModalConfig({
      type: "confirm",
      title: "게시물을 신고하시겠어요?",
      buttons: [
        {
          label: "취소",
          onClick: eventInner => {
            eventInner.stopPropagation();
            setModalOpen(false);
          },
        },
        {
          label: "신고하기",
          onClick: () => handleReport(prodId),
        },
      ],
    });
    setModalOpen(true);
  };

  // * 프로필 모달 데이터
  const setDeleteItem = e => {
    e.stopPropagation();
    setModalConfig({
      type: "confirm",
      title: "파일을 삭제하시겠어요?",
      buttons: [
        {
          label: "취소",
          onClick: eventInner => {
            eventInner.stopPropagation();
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
  const setCardModal = e => {
    e.stopPropagation();
    setModalConfig({
      type: "bottomSheet",
      buttons: [
        {
          label: "삭제",
          onClick: eventInner => setDeleteItem(eventInner),
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
      content={content}
      postImage={image}
      heartCount={heartCount}
      commentCount={commentCount}
      id={id}
      time={`${time[0]}년 ${time[1]}월 ${time[2]}일`}
      handleModal={
        author.accountname.trim().toLowerCase() === myName
          ? e => setCardModal(e)
          : e => setReport(e)
      }
    />
  );
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
