/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useRecoilState } from "recoil";

import Avatar from "../../../components/common/avatar/Avatar";
import Button from "../../../components/common/button/Button";
import Card from "../../../components/common/card/Card";
import Comment from "../../../components/common/comment/Comment";
import useApiMutation from "../../../hooks/useApiMutation";
import useApiQuery from "../../../hooks/useApiQuery";
import userDataAtom from "../../../recoil/userDataAtom";

import { CommentInput, CommentList, Line } from "./postDetail.style";

export default function PostDetail() {
  const [userData] = useRecoilState(userDataAtom);

  const { postId } = useParams();

  const { data: postData } = useApiQuery(`/post/${postId}`, "get");
  const time = postData && postData.post.createdAt.slice(0, 10).split("-");

  const { data: commentData } = useApiQuery(
    `/post/${postId}/comments/?limit=nolimit`,
    "get",
  );

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
        queryClient.invalidateQueries(`/post/${postId}`);
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
        () =>
          scrollRef.current.scrollIntoView({
            behavior: "smooth",
            block: "end",
          }),
        1000,
      ); // 댓글 작성 시 스크롤 제일 아래로 이동
    }
    return () => setSend(false);
  }, [send]);

  const handlePostComment = e => {
    e.preventDefault();

    postComment.mutate();
    setSend(true);
  };

  return (
    <>
      {postData && (
        <Card
          accountname={postData.post.author.accountname}
          profileImage={postData.post.author.image}
          username={postData.post.author.username}
          id={postData.post.author.accountname}
          postImage={postData.post.image}
          content={postData.post.content}
          heartCount={postData.post.heartCount}
          commentCount={postData.post.commentCount}
          time={`${time[0]}년 ${time[1]}월 ${time[2]}일`}
          postID={postData.post.id}
          hearted={postData.post.hearted}
        />
      )}
      <Line />
      <CommentList ref={scrollRef}>
        {commentData &&
          commentData.comments
            .map(v => {
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
            })
            .reverse()}
      </CommentList>
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
    </>
  );
}
