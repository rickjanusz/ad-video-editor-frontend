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
        <Link color="inherit" href="https://material-ui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  return (
    <FooterStyles>
      <Box mt={8}>
        <Copyright />
      </Box>
    </FooterStyles>
  );
}
