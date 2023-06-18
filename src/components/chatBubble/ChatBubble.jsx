import React from "react";

import Avatar from "../common/avatar/Avatar";

import {
  BringArticle,
  BringMessage,
  SendMessage,
  SendArticle,
  MessageTime,
} from "./chatBubble.style";

export default function ChatBubble({
  profileImg,
  isReceived,
  sentMessage,
  uploadedImage,
  currentTime,
}) {
  return isReceived ? (
    <BringArticle>
      <Avatar profileImg={profileImg} size={42} />
      <BringMessage>네 말씀하세요</BringMessage>
      <MessageTime>{currentTime}</MessageTime>
    </BringArticle>
  ) : (
    <SendArticle>
      <MessageTime>{currentTime}</MessageTime>
      <SendMessage>
        {sentMessage ||
          (uploadedImage && <img src={uploadedImage} alt="전송된 이미지" />)}
      </SendMessage>
    </SendArticle>
  );
}
