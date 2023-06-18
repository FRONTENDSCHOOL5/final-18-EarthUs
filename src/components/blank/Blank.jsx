import React from "react";
import { useNavigate } from "react-router-dom";

import Button from "../common/button/Button";

import BlankWrap from "./blank.style";

export default function Blank({ children, btn }) {
  const navigate = useNavigate();
  return (
    <BlankWrap>
      <p>{children}</p>
      <Button
        size="cta"
        variant="primary"
        type="button"
        onClick={() => navigate("/search")}
      >
        {btn}
      </Button>
    </BlankWrap>
  );
}
