import React from "react";
import { Link } from "react-router-dom";

import A11yHidden from "../common/a11yHidden/A11yHidden";
import Avatar from "../common/avatar/Avatar";

import {
  Article,
  Section,
  BlueRound,
  Div,
  Strong,
  P,
  Time,
} from "./chatPreview.style";

export default function ChatPreview({
  chatUserName,
  chatUserMessage,
  profileImg,
  showBlueRound,
}) {
  const chatCurrentTime = new Date().toLocaleDateString("ko-KR");
  return (
    <Link to="/chat/room">
      <Article>
        <A11yHidden>
          <h2>대화 목록</h2>
        </A11yHidden>
        <Section>
          {showBlueRound && <BlueRound className="blue-round" />}
          <Avatar profileImg={profileImg} size={40} />
          <Div>
            <Strong>{chatUserName}</Strong>
            <P>{chatUserMessage}</P>
          </Div>
          <Time>{chatCurrentTime}</Time>
        </Section>
      </Article>
    </Link>
  );
}
