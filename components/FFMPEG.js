import React, { useEffect, useRef } from 'react'; // import React, { useState, imagetgif from "react";
import { fetchFile } from '@ffmpeg/ffmpeg';
import Draggable from 'react-draggable';
import NProgress from 'nprogress';
import PropTypes from 'prop-types';
import { debounce } from 'debounce';
import { Button, Box, makeStyles, useTheme, Divider } from '@material-ui/core';
import LaunchIcon from '@material-ui/icons/Launch';

import DragAndDrop from './DragAndDrop';
import Preview from './Preview';
import GetStarted from './GetStarted';

export default function FFMPEG({ props }) {
  const {
    // FFMPEG state
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
    cropWidth,
    length,
    scale,
  } = props;

  const reducer = (state, action) => {
    switch (action.type) {
      case 'SET_DROP_DEPTH':
        return { ...state, dropDepth: action.dropDepth };
      case 'SET_IN_DROP_ZONE':
        return { ...state, inDropZone: action.inDropZone };
      case 'ADD_FILE_TO_LIST':
        return { ...state, fileList: state.fileList.concat(action.files) };
      default:
        return state;
    }
  };

  const [data, dispatch] = React.useReducer(reducer, {
    dropDepth: 0,
    inDropZone: false,
    fileList: [],
  });

  const theme = useTheme();
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
      backgroundColor: theme.palette.secondary.dark,
      opacity: '.1',
      position: 'absolute',
      top: 0,
      zIndex: -2,
      left: '0',
      width: '2000px',
      height: '2000px',
      clipPath: 'polygon(21% 0%, 100% 10%,10% 100%, 0% 15%)',
      pointerEvents: 'none',
    },
    clip2: {
      backgroundColor: theme.palette.secondary.dark,
      opacity: '.5',
      position: 'absolute',
      top: 0,
      zIndex: -2,
      left: 0,
      width: '2000px',
      height: '2000px',
      clipPath: 'polygon(0% 0%, 0% 10%,100% 30%, 50% 100%)',
      pointerEvents: 'none',
    },
    wrapper: {
      position: 'relative',
      padding: theme.spacing(25),
      overflow: 'hidden',
      minHeight: '800px',
    },
    dropHere: {
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 1,
      height: '100%',
      width: '100%',
      pointerEvents: 'auto',
    },
    videoBox: {
      position: 'relative',
      zIndex: 2,
      pointerEvents: 'none',
    },
    buttonStyle: {
      pointerEvents: 'auto',
      color: theme.palette.common.white,
      borderColor: theme.palette.common.white,
    },
  }));

  const obj = useRef();
  const objParent = useRef();
  const vidRef = useRef();
  const timeRef = useRef();
  const classes = useStyles();

  function makeEven(num) {
    if (num % 2 !== 0) {
      console.log('NOT EVEN', num, Math.floor(num + 1));
      return Math.floor(num + 1);
    }
    console.log('EVEN', num);
    return Math.floor(num);
  }
  // ////////////////////
  // GET POSITION OF CROPPER:
  // ////////////////////

  // function getVideoSize() {
  function getPosition() {
    const childDims = obj.current.getBoundingClientRect();
    const parentPos = objParent.current.getBoundingClientRect();
    const vidPos = vidRef.current.getBoundingClientRect();
    console.log(vidPos);
    const childOffset = {
      top: parseInt((childDims.top - parentPos.top) / scale),
      left: parseInt((childDims.left - parentPos.left) / scale),
      width: makeEven(parseInt(childDims.width / scale)),
      height: makeEven(parseInt(childDims.height / scale)),
      vidWidth: makeEven(parseInt(vidPos.width / scale)),
      vidHeight: makeEven(parseInt(vidPos.height / scale)),
    };

    console.log('OFFSET', childOffset);
    return childOffset;
  }
  //   const dims = vidRef.current.getBoundingClientRect();
  //   console.log(dims.height);
  //   vidRef.current.style.height = `${dims.height * scale}px`;
  // }

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

    console.log(`DIMSSSSS: ${dims.width}:${dims.height}`);

    const vH = makeEven(parseInt(dims.vidHeight / scale));
    const vW = makeEven(parseInt(dims.vidWidth / scale));
    console.log('VHHHHH: ', vH, vW);
    // Run the FFMpeg command

    await ffmpeg.run(
      '-i',
      'test.mp4',
      '-t',
      `${mylength}`,
      '-ss',
      `${time}`,
      '-vf',
      `scale='trunc((ih/${scale})*dar/2)*2:trunc((ih/${scale})/2)*2',setsar=1/1,crop='${dims.width}:${dims.height}:${dims.left}:${dims.top}':exact=1`,
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

  return (
    <>
      <Box className={classes.wrapper}>
        {video && (
          <Box
            display="flex"
            justifyContent="center"
            className={classes.videoBox}
          >
            <div className="videoCropper">
              <Box
                className={classes.videoPolaroid}
                boxShadow={7}
                border={15}
                borderColor={theme.palette.background.paper}
              >
                <Box className={classes.videoContainer}>
                  <video
                    controls
                    ref={vidRef}
                    id="video"
                    muted
                    src={video}
                    style={{ pointerEvents: 'auto' }}
                  />
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
                          height: `${Math.floor(cropHeight * scale)}px`,
                          width: `${Math.floor(cropWidth * scale)}px`,
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
                    className={classes.buttonStyle}
                    variant="outlined"
                    size="large"
                    type="button"
                    endIcon={<LaunchIcon />}
                    onClick={() => {
                      exportFormat('image/gif', length, setGif, 'gif');
                    }}
                  >
                    Export GIF
                  </Button>

                  <Button
                    className={classes.buttonStyle}
                    variant="outlined"
                    size="large"
                    type="button"
                    endIcon={<LaunchIcon />}
                    onClick={() => {
                      exportFormat('image/jpg', length, setJpg, 'jpg');
                    }}
                  >
                    Export Jpg
                  </Button>

                  <Button
                    className={classes.buttonStyle}
                    variant="outlined"
                    size="large"
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
        )}
        <Box className={classes.dropHere}>
          <DragAndDrop
            data={data}
            dispatch={dispatch}
            setVideo={setVideo}
            convertVideoToMP4={convertVideoToMP4}
            setFilename={setFilename}
          />
        </Box>
        <Box className={classes.clip} />
        <Box className={classes.clip2} />
      </Box>

      <Divider />
      <Preview
        crop={crop}
        gif={gif}
        jpg={jpg}
        filename={filename}
        cropHeight={cropHeight}
        cropWidth={cropWidth}
      />
      <GetStarted video={video} />
    </>
  );
}
