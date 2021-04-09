import Box from '@material-ui/core/Box';
import { makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useTheme } from '@material-ui/core/styles';
import GetStarted from './GetStarted';

export default function Footer({ video }) {
  // console.log('Theme', video);
  const theme = useTheme();
  const useStyles = makeStyles(() => ({
    root: {},
    clip: {
      backgroundColor: theme.palette.secondary.light,
      opacity: '1',
      position: 'absolute',
      top: 0,
      zIndex: -1,
      left: '0',
      width: '2000px',
      height: '2000px',
      clipPath: 'polygon(0 0, 0% 30%,100% 0%, 30% 100%)',
    },
    clip2: {
      backgroundColor: theme.palette.secondary.dark,
      opacity: '.3',
      position: 'absolute',
      top: 0,
      zIndex: -1,
      left: 10,
      width: '2000px',
      height: '2000px',
      clipPath: 'polygon(0 0, 0% 100%,100% 100%, 0% 30%)',
    },
    wrapper: {
      position: 'relative',
      overflow: 'hidden',
    },
    footer: {
      backgroundColor: theme.palette.primary.main,
      color: 'white',
    },
    card: {
      margin: '0 20px',
    },
  }));

  const classes = useStyles();

  const CheckVideo = () => {
    if (video) {
      return <></>;
    }
    return (
      <Box className={classes.wrapper}>
        <Box className={classes.clip} />
        <Box className={classes.clip2} />
        <Box m={1} p={20}>
          <Typography variant="h4" component="h2" gutterBottom align="center">
            Getting Started
          </Typography>
          <GetStarted theme={theme} />
        </Box>
      </Box>
    );
  };
  return (
    <Box
      display="flex"
      justifyContent="center"
      p={6}
      className={classes.footer}
    >
      <p>Footer Content Here</p>
    </Box>
  );
}

Footer.propTypes = {
  video: PropTypes.any,
};
