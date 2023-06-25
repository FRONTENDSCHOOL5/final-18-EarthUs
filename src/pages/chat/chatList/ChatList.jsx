import React from "react";

import ChatPreview from "../../../components/chatPreview/ChatPreview";

export default function ChatList() {
  return (
    <div>
      <ChatPreview
        chatUserName="고양이"
        chatUserMessage="야옹"
        profileImg=""
        showBlueRound
      />
      <ChatPreview
        chatUserName="강아지"
        chatUserMessage="멍멍"
        profileImg=""
        showBlueRound
      />
      <ChatPreview
        chatUserName="말"
        chatUserMessage="다그닥다그닥"
        profileImg=""
        showBlueRound={false}
      />
    </div>
  );
}
