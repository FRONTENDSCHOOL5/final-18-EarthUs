import { createGlobalStyle } from "styled-components";
/* https://seed.line.me/index_kr.html */

import LineSeedBdOtf from "./LINESeedKR-Bd.otf";
import LineSeedBdWoff from "./LINESeedKR-Bd.woff";
import LineSeedBdWoff2 from "./LINESeedKR-Bd.woff2";
import LineSeedRgOtf from "./LINESeedKR-Rg.otf";
import LineSeedRgWoff from "./LINESeedKR-Rg.woff";
import LineSeedRgWoff2 from "./LINESeedKR-Rg.woff2";

export default createGlobalStyle`
  @font-face {
    font-family: "LINESeedKR";
    font-weight: 400;
    font-style: normal;
    font-display: swap;
    src: url(${LineSeedRgWoff2}) format("woff2"),
      url(${LineSeedRgWoff}) format("woff"),
      url(${LineSeedRgOtf}) format("opentype");
  }

  @font-face {
    font-family: "LINESeedKR";
    font-weight: 700;
    font-style: normal;
    font-display: swap;
    src: url(${LineSeedBdWoff2}) format("woff2"),
      url(${LineSeedBdWoff}) format("woff"),
      url(${LineSeedBdOtf}) format("opentype");
  }
`;
