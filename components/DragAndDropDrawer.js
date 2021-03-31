import React from 'react';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import DragAndDrop from './DragAndDrop';

export default function DragAndDropDrawer(props) {
  const { data, dispatch, setVideo, convertVideoToMP4, setFilename } = props;

  const [state, setState] = React.useState({
    top: false,
  });

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
    <Box display="flex" justifyContent="flex-end">
      {['top'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            color="primary"
            onClick={toggleDrawer(anchor, true)}
            startIcon={<CloudUploadIcon />}
          >
            Upload Video 5mb max
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
