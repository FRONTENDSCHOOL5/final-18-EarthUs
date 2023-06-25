/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import SwiperCore, { Pagination, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { v4 as uuidv4 } from "uuid";

import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/a11y/a11y.min.css";

import iconComment from "../../../assets/images/comment.svg";
import iconHeartEmpty from "../../../assets/images/heart-empty.svg";
import iconHeartFull from "../../../assets/images/heart-full.svg";
import layer from "../../../assets/images/layer-image.svg";
import Nodata from "../../../assets/images/no-data.svg";
import useApiMutation from "../../../hooks/useApiMutation";
import UserInfo from "../../userInfo/UserInfo";

import {
  Cards,
  Content,
  Img,
  Imgs,
  PostLink,
  Reaction,
  Time,
  LayerIcon,
} from "./card.style";

export default function Card({
  accountname,
  profileImage,
  username,
  postImage,
  content,
  heartCount,
  commentCount,
  time,
  id,
  prod = false, // 상품리스트에서  true로 설정
  children,
  handleModal,
  onClick = null,
  postId,
  hearted,
}) {
  // * Swiper 커스터마이징
  SwiperCore.use([Pagination, A11y]);

  // * 등록된 이미지가 1개 이상이라면 배열로 변환
  const multipartImages =
    typeof postImage === "string"
      ? postImage.trim().replace(/\s+/g, "").split(",")
      : [postImage];

  // * 이미지가 로드되지 않았을 때 onError 이벤트 핸들러 실행
  const handleImgError = e => {
    e.target.onerror = null;
    e.target.src = Nodata;
    e.target.style.width = "100px";
    e.target.style.height = "90px";
  };

  const queryClient = useQueryClient();

  // 좋아요
  const like = useApiMutation(
    `/post/${postId}/heart`,
    "post",
    {},
    {
      onSuccess: () => {
        console.log("좋아요");
        queryClient.invalidateQueries();
      },
    },
  );
  const handleLike = () => {
    like.mutate();
  };

  // 좋아요 취소
  const unlike = useApiMutation(
    `/post/${postId}/unheart`,
    "delete",
    {},
    {
      onSuccess: () => {
        console.log("좋아요 취소");
        queryClient.invalidateQueries();
      },
    },
  );
  const handleUnlike = () => {
    unlike.mutate();
  };

  return (
    <Cards onClick={onClick}>
      {!prod ? (
        <>
          <UserInfo
            key={accountname}
            account={accountname}
            profileImg={profileImage}
            userName={username}
            id={id}
            handleModal={handleModal}
            postId={postId}
            more
          />
          <PostLink to={`/post/${postId}`}>
            <>
              {/* Feed & Product 동시 사용 영역 */}
              {multipartImages.length > 1 ? (
                // 유저가 등록한 이미지가 1개 이상이라면 Swiper 리턴
                <>
                  <LayerIcon>
                    <img
                      src={layer}
                      alt={`${multipartImages.length}장의 게시물 이미지`}
                    />
                  </LayerIcon>
                  <Swiper
                    pagination={{
                      clickable: true,
                    }}
                    className="imgWrap"
                    spaceBetween={0}
                    slidesPerView={1}
                  >
                    {multipartImages.map(img => (
                      // eslint-disable-next-line react/no-array-index-key
                      <SwiperSlide key={uuidv4()}>
                        <Imgs
                          src={img}
                          alt="게시물 이미지"
                          onError={handleImgError}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </>
              ) : (
                // postImage가 1개라면 기존의 figure 리턴
                postImage && (
                  <figure className="imgWrap">
                    <figcaption>{content}</figcaption>
                    <Img
                      src={postImage}
                      alt="게시물 이미지"
                      onError={handleImgError}
                    />
                  </figure>
                )
              )}
            </>
            <Content>
              <span>{content}</span>
              {children}
            </Content>
          </PostLink>
          <Reaction>
            <div>
              <button
                type="submit"
                onClick={() => (hearted ? handleUnlike() : handleLike())}
              >
                <img
                  src={hearted ? iconHeartFull : iconHeartEmpty}
                  alt="좋아요하기"
                />
              </button>
              <span>{heartCount}</span>
            </div>
            <Link to={`/post/${postId}`}>
              <img src={iconComment} alt="댓글달기" />
              <span>{commentCount}</span>
            </Link>
          </Reaction>
          <Time>{time}</Time>
        </>
      ) : (
        <>
          {multipartImages.length > 1 ? (
            // 유저가 등록한 이미지가 1개 이상이라면 Swiper 리턴
            <Swiper
              className="imgWrap"
              spaceBetween={0}
              slidesPerView={1}
              pagination={{
                clickable: true,
              }}
            >
              {multipartImages.map(img => (
                // eslint-disable-next-line react/no-array-index-key
                <SwiperSlide key={uuidv4()}>
                  <Imgs
                    src={img}
                    alt="게시물 이미지"
                    onError={handleImgError}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            // postImage가 1개라면 기존의 figure 리턴
            postImage && (
              <figure className="imgWrap">
                <figcaption>{content}</figcaption>
                <Img
                  src={postImage}
                  alt="게시물 이미지"
                  onError={handleImgError}
                />
              </figure>
            )
          )}

          <Content>
            <span>{content}</span>
            {children}
          </Content>
        </>
      )}
    </Cards>
  );
}

// ✅ Usage
// <Card
//   accountname={data.post.author.accountname}     // <UserInfo />에 들어감
//   profileImage={data.post.author.image}          // <UserInfo />에 들어감
//   username={data.post.author.username}           // <UserInfo />에 들어감
//   postImage={data.post.image}                    // post 이미지
//   content={data.post.content}                    // post 글
//   heartCount={data.post.heartCount}              // 좋아요 수
//   commentCount={data.post.commentCount}          // 댓글 수
//   time={`${time[0]}년 ${time[1]}월 ${time[2]}일`}  // post 작성일, const time = data && data.post.createdAt.slice(0, 10).split("-");으로 연월일 분리
// />

// <UserInfo
//   key={accountname}
//   account={accountname}
//   profileImg={profileImage}
//   userName={username}
//   id={accountname}         // 아이디가 들어가야 함
//   more
// />
