import PropTypes from 'prop-types';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    /* html {
      box-sizing: border-box;
      font-size: 10px;
    }
    *, *:before, *:after {
      box-sizing: inherit;
    } */
  `;

const InnerStyles = styled.div`
  /* width: 90vw;
  margin: 10px 5vw; */
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
