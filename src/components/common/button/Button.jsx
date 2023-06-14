/* eslint-disable no-nested-ternary */
import React from "react";
import styled, { css } from "styled-components";

const SIZES = {
  sm: css`
    --button-font-size: var(--font-size-sm);
    --button-padding: 0 1rem;
    --button-height: 2.5rem;
  `,
  md: css`
    --button-font-size: var(--font-size-md);
    --button-padding: 0 4rem;
    --button-height: 3rem;
  `,
  lg: css`
    --button-font-size: var(--font-size-lg);
    --button-padding: 0 6rem;
    --button-height: 4rem;
  `,
  cta: css`
    --button-font-size: var(--font-size-xl);
    --button-padding: 0 1rem;
    --button-height: 4rem;
    position: fixed;
    bottom: 1rem;
    width: min(calc(100% - 2rem), calc(var(--size-max-width) - 2rem));
    border-radius: 0;
    align-items: center;
    justify-content: center;
  `,
};

const VARIANTS = {
  primary: css`
    --button-color: var(--color-white);
    --button-background: var(--color-primary);
    --button-border: 1px solid var(--color-primary);
    &::before {
      filter: invert(1);
    }
  `,
  white: css`
    --button-color: var(--color-black);
    --button-background: var(--color-white);
    --button-border: 1px solid var(--color-light);
    &::before {
      filter: invert(62%) sepia(98%) saturate(1363%) hue-rotate(176deg)
        brightness(89%) contrast(91%);
    }
  `,
  disabled: css`
    --button-color: var(--color-gray-76);
    --button-background: var(--color-bg);
    --button-border: 1px solid var(--color-bg);
    cursor: not-allowed;
    pointer-events: none;
    &::before {
      filter: invert(0.6);
    }
  `,
};

export default function Button({ size, variant, children, icon, ...props }) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <StyledButton icon={icon} size={size} variant={variant} {...props}>
      <span>{children}</span>
    </StyledButton>
  );
}

const StyledButton = styled.button`
  ${({ size }) => SIZES[size]}
  ${({ variant }) => VARIANTS[variant]}

  font:inherit;
  cursor: pointer;
  margin: 0;
  background: var(--button-background);
  border: var(--button-border);
  color: var(--button-color);
  padding: var(--button-padding);
  height: var(--button-height);
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease-in-out;

  &:active,
  &:hover,
  &:focus {
    opacity: 0.9;
  }

  // icon이 있는 경우
  ${({ icon }) =>
    icon &&
    css`
      &::before {
        content: "";
        display: inline-block;
        width: 1.5rem;
        height: 1.5rem;
        background: url(${props => props.icon}) no-repeat center/1.5rem;
`}
`;

// ✅ Usage
// {/* cta */ }
// <Button size="cta" variant="primary">
//   cta-btn
// </Button>
// {/* lg */ }
// <Button icon={alert} size="lg" variant="primary">
//   lg-btn
// </Button>
// <Button icon={alert} size="lg" variant="white">
//   lg-btn
// </Button>
// <Button icon={alert} size="lg" variant="disabled">
//   lg-btn
// </Button>
// {/* md */ }
// <Button size="md" variant="primary">
//   md-btn
// </Button>
// <Button size="md" variant="white">
//   md-btn
// </Button>
// <Button size="md" variant="disabled">
//   md-btn
// </Button>
// {/* sm */ }
// <Button size="sm" variant="primary">
//   sm-btn
// </Button>
// <Button size="sm" variant="white">
//   sm-btn
// </Button>
// <Button size="sm" variant="disabled">
//   sm-btn
// </Button>
