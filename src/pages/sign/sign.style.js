import { Link } from "react-router-dom";
import styled from "styled-components";

const H2 = styled.h2`
  font-size: var(--font-size-title);
  text-align: center;
  margin-bottom: 48px;
`;

const SignUpLink = styled(Link)`
  position: fixed;
  bottom: 100px;
  width: min(100%, var(--size-max-width));
  margin-left: -16px;
  text-align: center;
  font-size: var(--font-size-sm);
  color: var(--color-gray-46);
`;

export { H2, SignUpLink };
