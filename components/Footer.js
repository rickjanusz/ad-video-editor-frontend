import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import { Link, Typography } from '@material-ui/core';

const FooterStyles = styled.footer`
  height: 100px;
`;

export default function Footer() {
  function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://www.fullstackbootstrap.com">
          Fullstack Bootstrap
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  return (
    <FooterStyles>
      <Box m={12} p={18}>
        <Copyright />
      </Box>
    </FooterStyles>
  );
}
