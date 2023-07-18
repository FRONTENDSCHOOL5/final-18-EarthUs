import React from "react";

import BreakLine from "../common/breakLine/BreakLine";
import Card from "../common/card/Card";

export default function ColumnView({ item }) {
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
