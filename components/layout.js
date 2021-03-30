import PropTypes from 'prop-types';
import styled from 'styled-components';

import Container from '@material-ui/core/Container';

export default function Layout({ children }) {
  return <Container maxWidth="lg">{children}</Container>;
}

Layout.propTypes = {
  children: PropTypes.any,
};
