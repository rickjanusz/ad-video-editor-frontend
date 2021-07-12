import Box from '@material-ui/core/Box';
import { makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useTheme } from '@material-ui/core/styles';
// import GetStarted from './GetStarted';
import useFooterStyles from './styles/useFooterStyles';

export default function Footer({ video }) {
  // console.log('Theme', video);

  const theme = useTheme();
  const classes = useFooterStyles(theme);

  // const CheckVideo = () => {
  //   if (video) {
  //     return <></>;
  //   }
  //   // return (
  //   //   <Box className={classes.wrapper}>
  //   //     <Box className={classes.clip} />
  //   //     <Box className={classes.clip2} />
  //   //     <Box m={1} p={20}>
  //   //       <Typography variant="h4" component="h2" gutterBottom align="center">
  //   //         Getting Started
  //   //       </Typography>
  //   //       {/* <GetStarted theme={theme} /> */}
  //   //     </Box>
  //   //   </Box>
  //   // );
  // };
  return (
    <Box
      display="flex"
      justifyContent="center"
      p={6}
      className={classes.footer}
    >
      <p>&copy; {new Date().getFullYear()} Rick Janusz</p>
    </Box>
  );
}

Footer.propTypes = {
  video: PropTypes.any,
};
