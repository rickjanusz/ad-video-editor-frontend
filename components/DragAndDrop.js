import React, { useEffect, useRef } from 'react';
import NProgress from 'nprogress';
import PropTypes from 'prop-types';
import {
  Box,
  CircularProgress,
  makeStyles,
  Typography,
  useTheme,
} from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import GetStarted from './GetStarted';

const DragAndDrop = (props) => {
  const {
    data,
    dispatch,
    setVideo,
    convertVideoToMP4,
    setFilename,
    setJson,
  } = props;

  const loadRef = useRef();
  const dropZoneRef = useRef();
  const theme = useTheme();
  const useStyles = makeStyles(() => ({
    getStarted: {
      fontSize: 40,
      textAlign: 'center',
      width: '350px',
    },
    loader: {
      display: 'none',
      position: 'absolute',
      zIndex: '20000',
      top: 0,
      left: 0,
      opacity: 1,
    },
  }));

  const classes = useStyles();
  useEffect(() => {}, []);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch({ type: 'SET_DROP_DEPTH', dropDepth: data.dropDepth + 1 });
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch({ type: 'SET_DROP_DEPTH', dropDepth: data.dropDepth - 1 });
    if (data.dropDepth > 0) return;
    dispatch({ type: 'SET_IN_DROP_ZONE', inDropZone: false });
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();

    e.dataTransfer.dropEffect = 'copy';
    dispatch({ type: 'SET_IN_DROP_ZONE', inDropZone: true });
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    let files = [...e.dataTransfer.files];
    if (files && files.length > 0) {
      const existingFiles = data.fileList.map((f) => f.name);
      files = files.filter((f) => !existingFiles.includes(f.name));

      dispatch({ type: 'ADD_FILE_TO_LIST', files });
      e.dataTransfer.clearData();
      dispatch({ type: 'SET_DROP_DEPTH', dropDepth: 0 });
      dispatch({ type: 'SET_IN_DROP_ZONE', inDropZone: false });
    }

    NProgress.start();
    loadRef.current.style.display = 'block';
    const reader = new FileReader();

    reader.addEventListener('loadstart', () => {});
    reader.addEventListener('progress', (evt) => {
      if (evt.lengthComputable) {
        const percentage = Math.round((evt.loaded * 100) / evt.total);

        NProgress.set(percentage);
      }
    });
    reader.addEventListener('loadend', () => {
      NProgress.done();
      loadRef.current.style.display = 'none';
    });

    function renameFile(file) {
      const fn = file.name.split('.');
      const name = fn[0];
      setFilename(name);
      localStorage.setItem('filename', name);
    }
    function checkFileSize(file) {
      let filesize;
      let sizeWt;
      if (file.size < 1000000) {
        filesize = file.size / 1000;
        sizeWt = `${filesize.toFixed(0)}kb`;
      } else {
        filesize = file.size / 1000000;
        sizeWt = `${filesize.toFixed(1)}mb`;
      }
      return sizeWt;
    }
    function checkFileName(file) {
      return file.name;
    }

    function returnExtension(file) {
      const fn = checkFileName(file);
      const ext = fn.split('.');
      return ext[1];
    }

    const fileType = returnExtension(files[0]);

    if (files[0].size > 5000000) {
      console.log('CHECHECHECHECHECKIIIIIINGGGG:');
      // return;
    }

    reader.addEventListener('load', (event) => {
      const { result } = event.target;
      // NEW ::::::::::::::::::::::::::::::::::::::::::::::::::::
      // NEW ::::::::::::::::::::::::::::::::::::::::::::::::::::

      if (fileType === 'json') {
        const res = JSON.parse(result);
        setJson(res);
        localStorage.setItem('json', result);
        // console.log(res);
      } else {
        setVideo(result);
        // localStorage.setItem('video', result);
      }

      // NEW ::::::::::::::::::::::::::::::::::::::::::::::::::::
      // NEW ::::::::::::::::::::::::::::::::::::::::::::::::::::
      // console.log(result);
      // TODO ::::::::::::::::::::::::::::::::::::::::::::::::::::
      // TODO ::::::::::::::::::::::::::::::::::::::::::::::::::::
      // TODO UNCOMMENT THIS AFTER TESTING NEW FUNC
      // setVideo(result);
      // localStorage.setItem('video', result);
      // TODO ::::::::::::::::::::::::::::::::::::::::::::::::::::
      // TODO ::::::::::::::::::::::::::::::::::::::::::::::::::::
      // TODO: MOV throws filesize error...
      // TODO: need to implement a DB
    });

    // TODO ::::::::::::::::::::::::::::::::::::::::::::::::::::
    // TODO ::::::::::::::::::::::::::::::::::::::::::::::::::::
    // TODO UNCOMMENT THIS - AFTER TESTING NEW FUNC
    // TODO ::::::::::::::::::::::::::::::::::::::::::::::::::::
    // TODO ::::::::::::::::::::::::::::::::::::::::::::::::::::
    // reader.readAsDataURL(files[0]);
    // renameFile(files[0]);
    // TODO ::::::::::::::::::::::::::::::::::::::::::::::::::::
    // TODO ::::::::::::::::::::::::::::::::::::::::::::::::::::
    // TODO UNCOMMENT THIS - AFTER TESTING NEW FUNC
    // TODO ::::::::::::::::::::::::::::::::::::::::::::::::::::
    // TODO ::::::::::::::::::::::::::::::::::::::::::::::::::::

    // ::::::::::::::::::::::::::::::::::::::::::::::::::: //
    // :::::::::::::::::::: BEGIN Custom Helper Functions  //
    // ::::::::::::::::::::::::::::::::::::::::::::::::::: //

    console.log('FILETPYE: ', fileType);

    if (fileType === 'mp4') {
      // console.log('ITS NOT MP4', files[0]);
      reader.readAsDataURL(files[0]);
      renameFile(files[0]);
      // NEW ::::::::::::::::::::::::::::::::::::::::::::::::::::
      // NEW ::::::::::::::::::::::::::::::::::::::::::::::::::::
    } else if (fileType === 'json') {
      // console.log('ITS JSON FILETPYE: ', fileType);
      reader.readAsText(files[0]);
    } else {
      //   // TODO MAY WANT TO MAKE A SWITCH/CASE
      reader.readAsDataURL(files[0]);
      renameFile(files[0]);
      convertVideoToMP4(files[0]);
    }

    // NEW ::::::::::::::::::::::::::::::::::::::::::::::::::::
    // NEW ::::::::::::::::::::::::::::::::::::::::::::::::::::
    // TODO ::::::::::::::::::::::::::::::::::::::::::::::::::::
    // TODO ::::::::::::::::::::::::::::::::::::::::::::::::::::
    // TODO UNCOMMENT THIS - AFTER TESTING NEW FUNC
    // TODO ::::::::::::::::::::::::::::::::::::::::::::::::::::
    // TODO ::::::::::::::::::::::::::::::::::::::::::::::::::::
    // convertVideoToMP4(files[0]);
    // TODO ::::::::::::::::::::::::::::::::::::::::::::::::::::
    // TODO ::::::::::::::::::::::::::::::::::::::::::::::::::::
    // TODO UNCOMMENT THIS - AFTER TESTING NEW FUNC
    // TODO ::::::::::::::::::::::::::::::::::::::::::::::::::::
    // TODO ::::::::::::::::::::::::::::::::::::::::::::::::::::

    // console.log('FILESIZE:', checkFileSize(files[0]));

    // ::::::::::::::::::::::::::::::::::::::::::::::::: //
    // :::::::::::::::::::: END Custom Helper Functions  //
    // ::::::::::::::::::::::::::::::::::::::::::::::::: //
  };
  return (
    <div
      ref={dropZoneRef}
      className={
        data.inDropZone ? 'drag-drop-zone inside-drag-area' : 'drag-drop-zone'
      }
      onDrop={(e) => handleDrop(e)}
      onDragOver={(e) => handleDragOver(e)}
      onDragEnter={(e) => handleDragEnter(e)}
      onDragLeave={(e) => handleDragLeave(e)}
      id="uploader"
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        height="100%"
      >
        <Box>
          {/* <GetStarted /> */}
          <Typography className={classes.getStarted} component="p">
            Drag &amp; drop files here to get started
            <CloudUploadIcon style={{ width: '100px', height: '100px' }} />
          </Typography>
        </Box>
        <CircularProgress
          ref={loadRef}
          size={100}
          thickness={5}
          className={classes.loader}
        />
      </Box>
    </div>
  );
};
export default DragAndDrop;

DragAndDrop.propTypes = {
  setVideo: PropTypes.any,
  data: PropTypes.any,
  dispatch: PropTypes.any,
  convertVideoToMP4: PropTypes.any,
  setFilename: PropTypes.any,
  setJson: PropTypes.any,
};
