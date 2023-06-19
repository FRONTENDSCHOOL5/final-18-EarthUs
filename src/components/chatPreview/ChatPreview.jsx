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

export default function ChatPreview() {
  return (
    <Link to="/chat/room">
      <Article>
        <A11yHidden>
          <h2>대화 목록</h2>
        </A11yHidden>
        <Section>
          <BlueRound />
          <Avatar size={40} />
          <Div>
            <Strong>애월읍 위니브 감귤농장</Strong>
            <P>이번에 정정 언제하맨마씸?</P>
          </Div>
          <Time>2023.06.16</Time>
        </Section>
      </Article>
    </Link>
  );
}
