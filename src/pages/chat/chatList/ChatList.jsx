import React from "react";

import ChatPreview from "../../../components/chatPreview/ChatPreview";

export default function ChatList() {
  return (
    <div>
      <ChatPreview
        chatUserName="디어얼스"
        chatUserMessage="문의 남겨주셔서 메세지 드려요! 원하는 물건이 있으실까요? :)"
        profileImg="https://api.mandarin.weniv.co.kr/1687740917238.jpg"
        showBlueRound
      />
      <ChatPreview
        chatUserName="지츄"
        chatUserMessage="네 ㅎㅎ 다음에 북카페도 가요~"
        profileImg=""
        showBlueRound
      />
      <ChatPreview
        chatUserName="지구조아"
        chatUserMessage="조아님 이번에 못난이 농산물 같이 구매하실래요?!"
        profileImg="https://api.mandarin.weniv.co.kr/1687738596290.jpg"
        showBlueRound={false}
      />
    </div>
  );
}
