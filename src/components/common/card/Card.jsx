/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Link } from "react-router-dom";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";

import iconComment from "../../../assets/images/comment.svg";
import iconHeartEmpty from "../../../assets/images/heart-empty.svg";
import Nodata from "../../../assets/images/no-data.svg";
import UserInfo from "../../userInfo/UserInfo";

import { Cards, Content, Img, Imgs, Reaction, Time } from "./card.style";

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
}) {
  // * 등록된 이미지가 1개 이상이라면 배열로 변환
  const multipartImages =
    typeof postImage === "string"
      ? postImage.trim().replace(/\s+/g, "").split(",")
      : [postImage];

  // * 이미지가 로드되지 않았을 때 onError 이벤트 핸들러 실행
  const handleImgError = e => {
    e.target.onerror = null;
    e.target.src = Nodata;
  };

  return (
    <Cards onClick={onClick}>
      {!prod && (
        <UserInfo
          key={accountname}
          account={accountname}
          profileImg={profileImage}
          userName={username}
          id={id}
          handleModal={handleModal}
          more
        />
      )}

      {/* Feed & Product 동시 사용 영역 */}
      {multipartImages.length > 1 ? (
        // 유저가 등록한 이미지가 1개 이상이라면 Swiper 리턴
        <Swiper
          className="imgWrap"
          spaceBetween={0}
          slidesPerView={1}
          modules={[Navigation, Pagination]}
        >
          {multipartImages.map(img => (
            // eslint-disable-next-line react/no-array-index-key
            <SwiperSlide key={img}>
              <Imgs src={img} alt="게시물 이미지" onError={handleImgError} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        // postImage가 1개라면 기존의 figure 리턴
        postImage && (
          <figure className="imgWrap">
            <figcaption>{content}</figcaption>
            <Img src={postImage} alt="게시물 이미지" onError={handleImgError} />
          </figure>
        )
      )}
      <Content>
        <span>{content}</span>
        {children}
      </Content>

      {!prod && (
        <>
          <Reaction>
            <div>
              <button type="submit">
                <img src={iconHeartEmpty} alt="좋아요하기" />
              </button>
              <span>{heartCount}</span>
            </div>
            <Link to={`/post/${id}`}>
              <img src={iconComment} alt="댓글달기" />
              <span>{commentCount}</span>
            </Link>
          </Reaction>
          <Time>{time}</Time>
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
