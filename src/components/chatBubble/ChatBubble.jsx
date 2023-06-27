import React from "react";

import Avatar from "../common/avatar/Avatar";

import {
  BringArticle,
  BringMessage,
  BringMessageTime,
  SendMessage,
  SendArticle,
  MessageTime,
  StyledMessageTime,
} from "./chatBubble.style";

export default function ChatBubble({
  profileImg,
  isReceived,
  sentMessage,
  bringMessage,
  uploadedImage,
  currentTime,
}) {
  const getCurrentTime = () => {
    const date = new Date();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const bringCurrentTime = getCurrentTime();

  return isReceived ? (
    <BringArticle>
      <Avatar profileImg={profileImg} size={40} />
      <StyledMessageTime>
        <BringMessage>{bringMessage}</BringMessage>
        <BringMessageTime>{bringCurrentTime}</BringMessageTime>
      </StyledMessageTime>
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
