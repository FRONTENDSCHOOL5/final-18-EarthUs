/* eslint-disable no-unused-vars */
import React from "react";
import { useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";

import grid from "../../assets/images/grid-view.svg";
import layer from "../../assets/images/layer-image.svg";
import column from "../../assets/images/spred-view.svg";
import useApiQuery from "../../hooks/useApiQuery";
import modalConfigState from "../../recoil/modalConfigAtom";
import modalState from "../../recoil/modalStateAtom";
import A11yHidden from "../common/a11yHidden/A11yHidden";
import Card from "../common/card/Card";

import { ProfileFeedWrap, ViewBtn } from "./profileFeed.style";

function GridView({ item }) {
  const { id, image } = item;
  const apiImg = image ? image.split(",") : [];

  return (
    image && (
      <div key={id}>
        <img key={id} src={apiImg} alt="게시물 이미지" />
        {apiImg.length > 1 && (
          <span>
            <img src={layer} alt={`${apiImg.length}장의 게시물 이미지`} />
          </span>
        )}
      </div>
    )
  );
}

function ColumnView({ item }) {
  const { id, image, content, author, heartCount, commentCount, createdAt } =
    item;
  const time = createdAt.slice(0, 10).split("-");

  // 전역 상태 관리를 위한 Recoil State 가져오기
  const setModalOpen = useSetRecoilState(modalState);
  const setModalConfig = useSetRecoilState(modalConfigState);

  // 모달 데이터 사용
  const editCardModalData = () => {
    setModalConfig({
      type: "bottomSheet",
      title: "파일을 수정하시겠어요?",
      buttons: [
        {
          label: "삭제",
          onClick: () => setModalOpen(false),
        },
        {
          label: "수정",
          onClick: () => setModalOpen(false),
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
      handleModal={editCardModalData}
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
          <main className={view}>
            {data.post.map(item =>
              view === "grid" ? (
                <GridView key={item.id} item={item} layer={layer} />
              ) : (
                <ColumnView key={item.id} item={item} />
              ),
            )}
          </main>
        </>
      )}
    </ProfileFeedWrap>
  );
}
