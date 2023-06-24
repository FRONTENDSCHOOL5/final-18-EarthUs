import React from "react";

import Button from "../common/button/Button";

import BlankWrap from "./blank.style";

export default function Blank({ children, btn, onClick }) {
  return (
    <BlankWrap>
      <p>{children}</p>
      <Button size="cta" variant="primary" type="button" onClick={onClick}>
        {btn}
      </Button>
    </BlankWrap>
  );
}
