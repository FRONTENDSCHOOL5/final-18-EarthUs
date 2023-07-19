/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import React, { useEffect, useState, useRef } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import { v4 as uuidv4 } from "uuid";

import A11yHidden from "../../../components/common/a11yHidden/A11yHidden";
import Avatar from "../../../components/common/avatar/Avatar";
import BreakLine from "../../../components/common/breakLine/BreakLine";
import Button from "../../../components/common/button/Button";
import Card from "../../../components/common/card/Card";
import Comment from "../../../components/common/comment/Comment";
import useApiInfiniteQuery from "../../../hooks/useApiInfiniteQuery";
import useApiMutation from "../../../hooks/useApiMutation";
import useApiQuery from "../../../hooks/useApiQuery";
import userDataAtom from "../../../recoil/userDataAtom";

import { CommentInput, CommentList, Line } from "./postDetail.style";

export default function PostDetail() {
  const [userData] = useRecoilState(userDataAtom);

  const navigate = useNavigate();
  const { postId } = useParams();

  const { data: postData } = useApiQuery(`/post/${postId}`, "get");
  const time =
    postData &&
    postData.post &&
    postData.post.createdAt.slice(0, 10).split("-");

  const {
    data: commentData,
    hasNextPage: commentHasNextPage,
    fetchNextPage: commentFetchNextPage,
  } = useApiInfiniteQuery(`/post/${postId}/comments`, "comments");

  // 404 에러 처리
  useEffect(() => {
    if (postData && postData.response && postData.response.status === 404) {
      navigate("/error");
    }
  }, [postData, navigate]);

  const [content, setContent] = useState("");

  const queryClient = useQueryClient();

  const postComment = useApiMutation(
    `/post/${postId}/comments`,
    "post",
    {
      comment: { content },
    },
    {
      onSuccess: () => {
        console.log("요청에 성공했습니다");
        queryClient.invalidateQueries(`/post/${postId}/comments`);
      },
    },
  );

  const handleCommentInput = e => {
    setContent(e.target.value);
  };

  const scrollRef = useRef();
  const [send, setSend] = useState(false);

  useEffect(() => {
    if (send) {
      setContent(""); // 댓글 전송 시 댓글 입력창 비우기
      setTimeout(
        () => scrollRef.current.scrollIntoView({ behavior: "smooth" }),
        1000,
      ); // 댓글 작성 시 스크롤 작성한 댓글로 이동
    }
    return () => setSend(false);
  }, [send]);

  const handlePostComment = e => {
    e.preventDefault();

    postComment.mutate();
    setSend(true);
  };

  // data가 없으면 null 반환
  if (!postData || !postData.post) return null;
  const { author, image, heartCount, commentCount, id, hearted } =
    postData.post;

  return (
    <section>
      <h2>
        <A11yHidden>게시물 상세 페이지</A11yHidden>
      </h2>
      {postData && (
        <Card
          accountname={author.accountname}
          profileImage={author.image}
          username={author.username}
          id={author.accountname}
          postImage={image}
          heartCount={heartCount}
          commentCount={commentCount}
          time={`${time[0]}년 ${time[1]}월 ${time[2]}일`}
          postId={id}
          hearted={hearted}
        >
          <BreakLine content={postData.post.content} />
        </Card>
      )}
      <Line />
      {commentData && (
        <InfiniteScroll
          hasMore={commentHasNextPage}
          loadMore={() => commentFetchNextPage()}
        >
          <CommentList ref={scrollRef}>
            {commentData.pages.map(page => {
              return (
                <React.Fragment key={uuidv4()}>
                  {page.comments.map(v => {
                    return (
                      <Comment
                        key={v.id}
                        commentId={v.id}
                        profileImg={v.author.image}
                        userName={v.author.username}
                        comment={v.content}
                        time={v.createdAt}
                        authorId={v.author._id}
                        accountName={v.author.accountname}
                      />
                    );
                  })}
                </React.Fragment>
              );
            })}
          </CommentList>
        </InfiniteScroll>
      )}
      <CommentInput>
        <Avatar profileImg={userData && userData.image} size={40} />
        <form>
          <input
            type="text"
            value={content}
            placeholder="댓글 입력하기"
            onChange={handleCommentInput}
          />
          <Button
            size="sm"
            variant={content && "primary"}
            disabled={!content}
            type="submit"
            onClick={handlePostComment}
          >
            입력
          </Button>
        </form>
      </CommentInput>
    </section>
  );
}
