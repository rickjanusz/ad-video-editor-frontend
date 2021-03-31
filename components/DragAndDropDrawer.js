import React from 'react';
import PropTypes from 'prop-types';
import { Button, Drawer, Box, makeStyles } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import DragAndDrop from './DragAndDrop';
// import theme from './theme';

export default function DragAndDropDrawer(props) {
  const {
    data,
    dispatch,
    setVideo,
    convertVideoToMP4,
    setFilename,
    theme,
  } = props;

  const [state, setState] = React.useState({
    top: false,
  });

  const useStyles = makeStyles(() => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        // width: '25ch',
      },
    },
    upload: {
      color: theme.palette.secondary.light,
    },
    preview: {
      background: theme.palette.primary.mainGradient,
      padding: '1em 0 8em 0',
    },
    previewHeader: {
      marginTop: '30px',
      color: theme.palette.secondary.light,
      '&:before': {
        content: ' // ',
      },
    },
    videoPolaroid: {
      backgroundColor: theme.palette.background.paper,
      border: `15px solid ${theme.palette.background.paper}`,
      marginBottom: '40px;',
    },
  }));
  const classes = useStyles();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setState({ state, [anchor]: open });
  };

  return (
    <Box
      display="flex"
      justifyContent="flex-end"
      style={{ background: theme.palette.primary.mainGradient }}
    >
      {['top'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            className={classes.upload}
            onClick={toggleDrawer(anchor, true)}
            startIcon={<CloudUploadIcon />}
          >
            Upload Video
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <DragAndDrop
              data={data}
              dispatch={dispatch}
              setVideo={setVideo}
              convertVideoToMp4={convertVideoToMP4}
              setFilename={setFilename}
            />
          </Drawer>
        </React.Fragment>
      ))}
    </Box>
  );
}

DragAndDropDrawer.propTypes = {
  data: PropTypes.any,
  dispatch: PropTypes.any,
  setVideo: PropTypes.any,
  convertVideoToMP4: PropTypes.any,
  setFilename: PropTypes.any,
  theme: PropTypes.any,
};
