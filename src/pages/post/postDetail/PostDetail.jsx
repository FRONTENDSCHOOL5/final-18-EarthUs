/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import React, { useEffect, useState, useRef } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useParams } from "react-router-dom";
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

  const { postId } = useParams();

  const { data: postData } = useApiQuery(`/post/${postId}`, "get");
  const time = postData && postData.post.createdAt.slice(0, 10).split("-");

  const {
    data: commentData,
    hasNextPage: commentHasNextPage,
    fetchNextPage: commentFetchNextPage,
  } = useApiInfiniteQuery(`/post/${postId}/comments`, "comments");

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

  return (
    <section>
      <h2>
        <A11yHidden>게시물 상세 페이지</A11yHidden>
      </h2>
      {postData && (
        <Card
          accountname={postData.post.author.accountname}
          profileImage={postData.post.author.image}
          username={postData.post.author.username}
          id={postData.post.author.accountname}
          postImage={postData.post.image}
          heartCount={postData.post.heartCount}
          commentCount={postData.post.commentCount}
          time={`${time[0]}년 ${time[1]}월 ${time[2]}일`}
          postID={postData.post.id}
          hearted={postData.post.hearted}
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
                        commentID={v.id}
                        profileImg={v.author.image}
                        userName={v.author.username}
                        comment={v.content}
                        time={v.createdAt}
                        authorID={v.author._id}
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
        <input
          type="text"
          value={content}
          placeholder="댓글 입력하기"
          onChange={handleCommentInput}
        />
        <Button
          size="sm"
          variant={content ? "primary" : "disabled"}
          type="submit"
          onClick={handlePostComment}
        >
          입력
        </Button>
      </CommentInput>
    </section>
  );
}
