import * as React from "react";
import { Global, css, Interpolation } from "@emotion/core";

// USE DESIRED FONT
const globalStyles = css`
  @import url("https://fonts.googleapis.com/css?family=Roboto+Condensed:300,400,700&subset=latin-ext");

  * {
    box-sizing: border-box;

    user-select: none;
    outline: none;

    &:focus {
      outline: none;
      box-shadow: none;
    }

    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;

    -webkit-tap-highlight-color: transparent;
  }

  html {
    max-height: 100%;
  }

  body {
    font-family: "Roboto Condensed", sans-serif;
    font-size: 1rem;
    line-height: 1.5;
    text-align: left;
    margin: 0;
  }

  button {
    font-family: "Roboto Condensed", sans-serif;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    margin: 0;
  }
`;

export const GlobalStyles: React.SFC<{
  children: React.ReactNode;
}> = (props: { children: React.ReactNode }) => {
  return (
    <React.Fragment>
      <Global styles={globalStyles} />
      {props.children}
    </React.Fragment>
  );
};

type CSSArgs = [TemplateStringsArray, ...Interpolation[]];

export const media = {
  sm: (...args: CSSArgs) => css`
    @media (max-width: 576px) {
      ${css(...args)};
    }
  `,
  md: (...args: CSSArgs) => css`
    @media (max-width: 768px) {
      ${css(...args)};
    }
  `,
  lg: (...args: CSSArgs) => css`
    @media (max-width: 992px) {
      ${css(...args)};
    }
  `,
  xl: (...args: CSSArgs) => css`
    @media (max-width: 1200px) {
      ${css(...args)};
    }
  `
};

export const whereHoverAvailable = (...args: CSSArgs) => css`
  @media (hover: none) {
    ${css(...args)};
  }
`;
