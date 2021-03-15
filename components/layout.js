import PropTypes from "prop-types";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    html {
      --orange: #ea6d07;
      --red: #ff0000;
      --black: #393939;
      --grey: #3A3A3A;
      --gray: var(--grey);
      --lightGrey: #e1e1e1;
      --lightGray: var(---lightGray);
      --offWhite: #ededed;
      --maxWidth: 1000px;
      --bs: 0 12px 24px 0 rgba(0,0,0,0.09);
      box-sizing: border-box;
      font-size: 10px;
    }
    *, *:before, *:after {
      box-sizing: inherit;
    }
    body {
      font-family: --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      padding: 0;
      margin: 0;
      font-size: 1.5rem;
      line-height:2;
    }
    a {
      text-decoration: none;
      color: var(---black);
    }
    a:hover {
      text-decoration: underline;
    }
    button {
      font-family: --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
    }
  `;

const InnerStyles = styled.div`
  width: 90vw;
  margin: 10px 5vw;
`;

export default function Layout({ children }) {
  return (
    <>
      <GlobalStyles />
      <InnerStyles>{children}</InnerStyles>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.any,
};
