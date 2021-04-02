import Box from '@material-ui/core/Box';
import { makeStyles, Typography } from '@material-ui/core';
import GetStarted from './GetStarted';

export default function Footer(theme) {
  // console.log('Theme', theme);
  const useStyles = makeStyles(() => ({
    root: {},
    clip: {
      backgroundColor: '#e5e5e5',
      opacity: '.6',
      position: 'absolute',
      top: 0,
      zIndex: -1,
      left: '0',
      width: '100%',
      height: '100%',
      clipPath: 'polygon(0 0, 70% 0%, 100% 100%, 30% 100%)',
    },
    clip2: {
      backgroundColor: '#DDD',
      opacity: '1',
      position: 'absolute',
      top: 0,
      zIndex: -1,
      left: '0',
      left: 1020,
      width: '100%',
      height: '100%',
      clipPath: 'polygon(0 0, 70% 0%, 100% 100%, 30% 100%)',
    },
    wrapper: {
      position: 'relative',
      // padding: theme.spacing(8),
      overflow: 'hidden',
    },
    card: {
      margin: '0 20px',
    },
  }));

  const classes = useStyles();
  return (
    <Box className={classes.wrapper}>
      <Box className={classes.clip} />
      <Box className={classes.clip2} />
      <Box m={1} p={20}>
        <Typography
          // className={classes.previewHeader}
          variant="h4"
          component="h2"
          gutterBottom
          align="center"
        >
          Getting Started
        </Typography>
        <GetStarted theme={theme} />
      </Box>
    </Box>
  );
}
