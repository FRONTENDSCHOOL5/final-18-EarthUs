import { createGlobalStyle } from "styled-components";
import normalize from "styled-normalize";

const GlobalStyle = createGlobalStyle`
  ${normalize}

  :root {
  /* Primary */
  --color-primary: #1C79CD;
  --color-secondary: #607A8D;
  --color-tertiary: #F2F7FA;

  /* Semantic Color */
  --color-success: #33D486;
  --color-warn: #FFC73C;
  --color-error: #FF5B45;

  /* Black & White */
  --color-black: #000;
  --color-white: #fff;

  /* Text Color */
  --color-gray-2: #222;
  --color-gray-46: #464646;
  --color-gray-76: #767676;

  /* Border & Background Color */
  --color-dark: #b1b1b1;
  --color-light: #D5D5D5;
  --color-bg: #efefef;

  /* font-size */
  --font-size-micro: clamp(10px, 1vw, 12px);
  --font-size-xs: clamp(12px, 1.5vw, 14px);
  --font-size-sm: clamp(14px, 2vw, 16px);
  --font-size-md: clamp(15px, 2vw, 17px);
  --font-size-lg: clamp(16px, 2vw, 18px);
  --font-size-xl: clamp(18px, 3vw, 20px);
  --font-size-xxl: clamp(22px, 4vw, 24px);
  --font-size-title: clamp(32px, 5vw, 36px);

  /* size */
  --size-header: 64px;
  --size-tabBar: 80px;
  --size-max-width: 520px;
  --size-gap : 16px;
  }


  * {
    box-sizing: border-box;
  }

  body {
    width: min(100%, var(--size-max-width));
    margin: auto;
    line-height:1.5;
    letter-spacing: -0.02rem;
    background-color: var(--color-bg);
    font-family: "LINESeedKR", sans-serif;
    font-weight: 400;
    overflow-y: scroll;
    #root {
      background-color: #fff;
      min-height: 100vh;
      padding: calc(var(--size-header) + 1.5rem) var(--size-gap) calc(var(--size-tabBar) + 1.5rem);
      position: relative;
    }
  }

  a {
  color: inherit;
  text-decoration: none;
  }

  h1,
  h2,
  h3,
  p,
  input,
  button,
  fieldset,
  input,
  ul,
  figure {
    margin: 0;
    padding: 0;
  }

  input, textarea, button {
    background-color: transparent;
    letter-spacing: inherit;
    border: none;
    outline: none;
    font: inherit;
    padding: 0;
    margin: 0;
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    border-radius: 0;
    -webkit-border-radius: 0;
    -moz-border-radius: 0;
  }

  a, button {
  cursor: pointer;
  font:inherit;
  color: inherit;
  }

  button:focus-visible{
	outline: #000 solid 2px;
}

  textarea {
    font-family: inherit;
    padding: 0;
    margin: 0;
  }

  ::placeholder {
    font-family: inherit;
  }

  label {
    display: block;
  }

  ol, ul, li {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  img{
    max-width:100%;
    height:auto;
    vertical-align: top;
  }

  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 30px #fff inset ;
    -webkit-text-fill-color: #000;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
  }

  .a11y-hidden {
    clip: rect(1px, 1px, 1px, 1px);
    clip-path: inset(50%);
    width: 1px;
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
  }
`;

export default GlobalStyle;
