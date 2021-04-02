import React, { useEffect, useRef } from 'react'; // import React, { useState, imagetgif from "react";
import { fetchFile } from '@ffmpeg/ffmpeg';
import Draggable from 'react-draggable';
import NProgress from 'nprogress';
import PropTypes from 'prop-types';
import { debounce } from 'debounce';
import {
  Button,
  Box,
  makeStyles,
  Container,
  Typography,
} from '@material-ui/core';

import LaunchIcon from '@material-ui/icons/Launch';
import Divider from '@material-ui/core/Divider';
import ControlPanel from './ControlPanel';
import DragAndDropDrawer from './DragAndDropDrawer';
import CropPreview from './CropPreview';
import Preview from './Preview';

export default function FFMPEG({ props }) {
  const {
    // Drag&Drop state
    data,
    dispatch,
    // FFMPEG state
    ready,
    video,
    setVideo,
    crop,
    setCrop,
    gif,
    setGif,
    jpg,
    setJpg,
    time,
    setTime,
    ffmpeg,
    filename,
    setFilename,
    cropHeight,
    setCropHeight,
    cropWidth,
    setCropWidth,
    length,
    setLength,
    scale,
    setScale,
    theme,
  } = props;

  const useStyles = makeStyles(() => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        // width: '25ch',
      },
    },
    paper: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    preview: {
      background: theme.palette.primary.mainGradient,
      padding: '1em 0 8em 0',
    },
    previewHeader: {
      marginTop: '30px',
      color: theme.palette.secondary.light,
      // '&:before': {
      //   // content: ' // ',
      // },
    },
    time: {
      backgroundColor: theme.palette.secondary.light,
      padding: '10px',
      borderRadius: '0 0 5px 5px',
    },
    videoContainer: {
      maxWidth: '1920px',
      maxHeight: '1080px',
      position: 'relative',
      resize: 'both',
      overflow: 'auto',
    },
    videoPolaroid: {
      backgroundColor: theme.palette.background.paper,
      border: `15px solid ${theme.palette.background.paper}`,
      marginBottom: '40px;',
    },
    draggableParent: {
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      position: 'absolute',
      zIndex: 2,
      top: 0,
      pointerEvents: 'none',
    },
    draggy: {
      width: '150px',
      height: '150px',
      resize: 'both',
      overflow: 'auto',
      border: '3px dotted rgba(255, 255, 255, 0.5)',
      boxShadow: '0 0 0px 2000px rgba(0, 0, 0, 0.7)',
    },
    handle: {
      height: '100%',
      pointerEvents: 'auto',
    },
    clip: {
      backgroundColor: theme.palette.secondary.light,
      opacity: '.5',
      position: 'absolute',
      top: 0,
      zIndex: -1,
      left: '0',
      width: '2000px',
      height: '2000px',
      clipPath: 'polygon(21% 0%, 100% 10%,10% 100%, 0% 15%)',
    },
    clip2: {
      backgroundColor: theme.palette.secondary.dark,
      opacity: '.1',
      position: 'absolute',
      top: 0,
      zIndex: -1,
      left: 0,
      width: '2000px',
      height: '2000px',
      clipPath: 'polygon(0% 0%, 0% 10%,100% 30%, 50% 100%)',
    },
    wrapper: {
      position: 'relative',
      padding: theme.spacing(8),
      overflow: 'hidden',
    },
  }));

  const obj = useRef();
  const objParent = useRef();
  const vidRef = useRef();
  const timeRef = useRef();
  const classes = useStyles();

  function makeEven(num) {
    if (num % 2 !== 0) {
      return Math.floor(num + 1);
    }
    return Math.floor(num);
  }
  // ////////////////////
  // GET POSITION OF CROPPER:
  // ////////////////////

  function getPosition() {
    const childDims = obj.current.getBoundingClientRect();
    const parentPos = objParent.current.getBoundingClientRect();
    const childOffset = {
      top: childDims.top - parentPos.top,
      left: childDims.left - parentPos.left,
      width: makeEven(childDims.width),
      height: makeEven(childDims.height),
    };
    console.log(childOffset);
    return childOffset;
  }

  function getVideoSize() {
    const dims = vidRef.current.getBoundingClientRect();
    console.log(dims.height);
    vidRef.current.style.height = `${dims.height * scale}px`;
  }

  // Drag & Drop callback
  function handleStop() {
    getPosition();
  }

  function saveFrame() {
    vidRef.current.addEventListener('seeked', (event) => {
      const num = event.srcElement.currentTime;
      timeRef.current.innerHTML = num.toFixed(2);
      debounce(setTime(num.toFixed(2)), 2000);
    });
  }

  useEffect(() => {
    if (video) {
      // getVideoSize();
      // videoLoaded();
      saveFrame();
    }
  });

  const convertVideoToMP4 = async (vid, ext) => {
    ffmpeg.FS('writeFile', `input.${ext}`, await fetchFile(vid));

    await ffmpeg.setProgress(({ ratio }) => {
      NProgress.set(ratio);
      if (ratio === 1) {
        NProgress.done();
      }
    });
    // Video
    await ffmpeg.run(
      '-i',
      `input.${ext}`,
      // TODO: Figure out 265 codec...
      // TODO: for enhanced optimization
      // "-vcodec",
      // "libx265",
      // "-crf",
      // "28",
      'output.mp4'
    );
    const fileBlob = ffmpeg.FS('readFile', 'output.mp4');
    const url = URL.createObjectURL(
      new Blob([fileBlob.buffer], {
        type: 'video/mp4',
      })
    );
    setVideo(url);
    // localStorage.setItem('video', data);
  };

  async function exportFormat(mimType, mylength, stateFunc) {
    const ext = mimType.split('/').pop();
    ffmpeg.FS('writeFile', 'test.mp4', await fetchFile(video));
    const dims = getPosition();

    await ffmpeg.setProgress(({ ratio }) => {
      NProgress.set(ratio);
      if (ratio === 1) {
        NProgress.done();
      }
    });

    // Run the FFMpeg command
    await ffmpeg.run(
      '-i',
      'test.mp4',
      '-t',
      `${mylength}`,
      '-ss',
      `${time}`,
      '-vf', // Square pixels
      `scale='trunc(ih*dar/2)*2:trunc(ih/2)*2',setsar=1/1,crop=${dims.width}:${dims.height}:${dims.left}:${dims.top}:exact=1`,
      '-c:a',
      'copy',
      `out.${ext}`
    );

    const fileBlob = ffmpeg.FS('readFile', `out.${ext}`);

    // Create a URL
    const url = URL.createObjectURL(
      new Blob([fileBlob.buffer], { type: `${mimType}`, autoRevoke: false })
    );

    // localStorage.setItem(ext, url);
    stateFunc(url);
  }

  return ready ? (
    <>
      <div>
        <DragAndDropDrawer
          data={data}
          dispatch={dispatch}
          setVideo={setVideo}
          convertVideoToMP4={convertVideoToMP4}
          setFilename={setFilename}
          theme={theme}
        />
        <ControlPanel
          props={props}
          cropWidth={cropWidth}
          setCropWidth={setCropWidth}
          cropHeight={cropHeight}
          setCropHeight={setCropHeight}
          length={length}
          setLength={setLength}
          scale={scale}
          setScale={setScale}
          theme={theme}
        />
      </div>
      {video && (
        <Box className={classes.wrapper}>
          <Box className={classes.clip} />
          <Box className={classes.clip2} />
          <Box display="flex" justifyContent="center">
            <div className="videoCropper">
              <Box
                className={classes.videoPolaroid}
                boxShadow={7}
                border={15}
                borderColor={theme.palette.background.paper}
              >
                <Box className={classes.videoContainer}>
                  <video controls ref={vidRef} id="video" muted src={video} />
                  <div className={classes.draggableParent} ref={objParent}>
                    <Draggable
                      axis="both"
                      handle=".handle"
                      bounds="parent"
                      defaultPosition={{ x: 0, y: 0 }}
                      grid={[1, 1]}
                      scale={1}
                      // onStart={handleStart}
                      // onDrag={handleDrag}
                      onStop={handleStop}
                    >
                      <div
                        className={classes.draggy}
                        ref={obj}
                        style={{
                          height: `${cropHeight * scale}px`,
                          width: `${cropWidth * scale}px`,
                        }}
                      >
                        <div className={`${classes.handle} handle`} />
                      </div>
                    </Draggable>
                  </div>
                </Box>
                <Box className={classes.time}>
                  Current Time:{' '}
                  <span id="current" ref={timeRef}>
                    0.00
                  </span>
                </Box>
              </Box>
              <div>
                <Box display="flex" justifyContent="center">
                  <Button
                    variant="outlined"
                    size="large"
                    color="primary"
                    type="button"
                    endIcon={<LaunchIcon />}
                    onClick={() => {
                      exportFormat('image/gif', length, setGif, 'gif');
                    }}
                  >
                    Export GIF
                  </Button>

                  <Button
                    variant="outlined"
                    size="large"
                    color="primary"
                    type="button"
                    style={{ margin: '0 10px' }}
                    endIcon={<LaunchIcon />}
                    onClick={() => {
                      exportFormat('image/jpg', length, setJpg, 'jpg');
                    }}
                  >
                    Export Jpg
                  </Button>

                  <Button
                    variant="outlined"
                    size="large"
                    color="primary"
                    type="button"
                    endIcon={<LaunchIcon />}
                    onClick={() => {
                      exportFormat('video/mp4', length, setCrop, 'crop');
                    }}
                  >
                    Export MP4
                  </Button>
                </Box>
              </div>
            </div>
          </Box>
        </Box>
      )}

      <Divider />
      <Preview {...props} />
    </>
  ) : (
    <p>Loading...</p>
  );
}

FFMPEG.propTypes = {
  data: PropTypes.any,
  dispatch: PropTypes.any,
  ready: PropTypes.any,
  video: PropTypes.any,
  setVideo: PropTypes.any,
  crop: PropTypes.any,
  setCrop: PropTypes.any,
  gif: PropTypes.any,
  setGif: PropTypes.any,
  jpg: PropTypes.any,
  setJpg: PropTypes.any,
  time: PropTypes.any,
  setTime: PropTypes.any,
  ffmpeg: PropTypes.any,
  filename: PropTypes.any,
  setFilename: PropTypes.any,
  cropHeight: PropTypes.any,
  setCropHeight: PropTypes.any,
  cropWidth: PropTypes.any,
  setCropWidth: PropTypes.any,
  length: PropTypes.any,
  setLength: PropTypes.any,
  scale: PropTypes.any,
  setScale: PropTypes.any,
  theme: PropTypes.any,
  props: PropTypes.any,
};
