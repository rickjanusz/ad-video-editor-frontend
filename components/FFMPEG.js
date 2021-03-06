import React, { useCallback, useEffect, useRef, useState } from 'react'; // import React, { useState, imagetgif from "react";
import { fetchFile } from '@ffmpeg/ffmpeg';
import Draggable from 'react-draggable';
import NProgress from 'nprogress';
import PropTypes from 'prop-types';
import { Button, Box, useTheme, Divider } from '@material-ui/core';
import LaunchIcon from '@material-ui/icons/Launch';
import { debounce } from 'debounce';

import DragAndDrop from './DragAndDrop';
import Preview from './Preview';
import GetStarted from './GetStarted';
import useFFMPEGStyles from './styles/useFFMPEGStyles';
import TreatmentGhost from './TreatmentGhost';

// import { gsap } from 'gsap';
export default function FFMPEG({ props }) {
  const {
    ffmpeg,
    cropHeight,
    cropWidth,
    length,
    scale,
    json,
    setJson,
    video,
    setVideo,
    filename,
    setFilename,
    treatmentOverlay,
    fieldData,
    retina,
    currentAdSize,
    quality,
  } = props;

  const [crop, setCrop] = useState();
  const [gif, setGif] = useState();
  const [jpg, setJpg] = useState();
  const [time, setTime] = useState(0);

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
  const classes = useFFMPEGStyles(theme);

  const dragRef = useRef();
  const dragParent = useRef();
  const vidRef = useRef();
  const videoShrink = useRef();
  const timeRef = useRef();
  const widthRef = useRef();
  const heightRef = useRef();

  // ////////////////////
  // GET POSITION OF CROPPER:
  // ////////////////////

  function makeEven(num) {
    if (num % 2 !== 0) {
      return Math.floor(num + 1);
    }
    return Math.floor(num);
  }

  const getPositionCallback = useCallback(() => {
    const childDims = dragRef.current.getBoundingClientRect();
    const parentPos = dragParent.current.getBoundingClientRect();
    const vidPos = vidRef.current.getBoundingClientRect();
    const childOffset = {
      top: parseInt((childDims.top - parentPos.top) / scale),
      left: parseInt((childDims.left - parentPos.left) / scale),
      width: makeEven(parseInt(childDims.width / scale)),
      height: makeEven(parseInt(childDims.height / scale)),
      vidWidth: makeEven(parseInt(vidPos.width / scale)),
      vidHeight: makeEven(parseInt(vidPos.height / scale)),
    };
    // console.log(childDims);
    return childOffset;
  }, [scale]);

  function handleGhostOverlay() {
    if (fieldData) {
      const ghost = document.querySelector('.ghost');
      const pos = getPositionCallback();

      ghost.style.scale = scale * retina;
      ghost.style.transformOrigin = '0 0';
      ghost.style.transition = '.25s opacity';
      if (scale) {
        ghost.style.top = `${
          Math.floor(pos.top - ghost.dataset.top * retina) * scale
        }px`;
        ghost.style.left = `${
          Math.floor(pos.left - ghost.dataset.left * retina) * scale
        }px`;
      }

      if (treatmentOverlay) {
        ghost.style.opacity = 1;
      } else {
        ghost.style.opacity = 0;
      }
    }
  }

  // Drag & Drop callback
  function handleStop() {
    getPositionCallback();
    handleGhostOverlay();
  }

  function handleStart() {
    if (fieldData) {
      if (treatmentOverlay) {
        const ghost = document.querySelector('.ghost');
        ghost.style.opacity = 0;
      }
    }
    // console.log('starting drag');
  }

  function handleDrag() {
    // console.log('dragging');
  }
  const saveFrameCallback = useCallback(() => {
    vidRef.current.addEventListener('seeked', (event) => {
      const num = event.srcElement.currentTime;
      timeRef.current.innerHTML = num.toFixed(2);
      debounce(setTime(num.toFixed(2)), 3000);
    });
  }, [vidRef, timeRef]);

  useEffect(() => {
    if (video) {
      // eslint-disable-next-line no-unused-expressions
      saveFrameCallback();
      handleGhostOverlay();
      const ro = new ResizeObserver((entries) => {
        for (const entry of entries) {
          widthRef.current.innerHTML = Math.round(
            entry.borderBoxSize[0].inlineSize
          );
          heightRef.current.innerHTML = Math.round(
            entry.borderBoxSize[0].blockSize
          );
        }
      });

      ro.observe(dragRef.current);
    }
  }, [
    video,
    handleGhostOverlay,
    getPositionCallback,
    // saveFrameCallback,
  ]);

  const convertVideoToMP4 = async (vid, ext) => {
    ffmpeg.FS('writeFile', `input.${ext}`, await fetchFile(vid));

    await ffmpeg.setProgress(({ ratio }) => {
      NProgress.set(ratio);
      if (ratio === 1) {
        NProgress.done();
      }
    });
    // Video
    await ffmpeg.run('-i', `input.${ext}`, 'output.mp4');
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
    const dims = getPositionCallback();

    await ffmpeg.setProgress(({ ratio }) => {
      NProgress.set(ratio);
      if (ratio === 1) {
        NProgress.done();
      }
    });

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
      '-an',
      '-preset',
      'medium',
      '-crf',
      `${quality}`,
      `out.${ext}`
    );

    const fileBlob = ffmpeg.FS('readFile', `out.${ext}`);

    // Create a URL
    const url = URL.createObjectURL(
      new Blob([fileBlob.buffer], { type: `${mimType}`, autoRevoke: false })
    );

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
                ref={videoShrink}
                boxShadow={7}
                border={15}
                borderColor={theme.palette.background.paper}
              >
                {fieldData && (
                  <TreatmentGhost fieldData={fieldData} retina={retina} />
                )}
                <Box className={classes.videoContainer}>
                  <video
                    style="width:calc(50vw);height:calc(28vw + 125px);margin-top:calc(-70px)"
                    controls
                    ref={vidRef}
                    id="video"
                    muted
                    src={video}
                    style={{ pointerEvents: 'auto' }}
                  />
                  <div className={classes.draggableParent} ref={dragParent}>
                    <Draggable
                      axis="both"
                      handle=".handle"
                      bounds="parent"
                      defaultPosition={{ x: 0, y: 0 }}
                      grid={[1, 1]}
                      scale={1}
                      onStart={handleStart}
                      onDrag={handleDrag}
                      onStop={handleStop}
                    >
                      <div
                        className={classes.draggy}
                        ref={dragRef}
                        style={{
                          height: `${Math.floor(
                            cropHeight * retina * scale
                          )}px`,
                          width: `${Math.floor(cropWidth * retina * scale)}px`,
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
                  <span id="currentSize" className={classes.dimensions}>
                    Width:{' '}
                    <span className={classes.widthDim} ref={widthRef}>
                      300
                    </span>
                    Height: <span ref={heightRef}>600</span>
                  </span>
                </Box>
              </Box>
              <div className={classes.buttonGroup}>
                <Box display="flex" justifyContent="center">
                  <Button
                    className={classes.buttonStyle}
                    color="primary"
                    variant="contained"
                    size="large"
                    type="button"
                    endIcon={<LaunchIcon />}
                    onClick={() => {
                      exportFormat('image/gif', length, setGif, 'gif');
                    }}
                  >
                    Crop GIF
                  </Button>

                  <Button
                    className={classes.buttonStyle}
                    color="primary"
                    variant="contained"
                    size="large"
                    type="button"
                    endIcon={<LaunchIcon />}
                    onClick={() => {
                      exportFormat('image/jpg', length, setJpg, 'jpg');
                    }}
                  >
                    Crop Jpg
                  </Button>

                  <Button
                    className={classes.buttonStyle}
                    color="primary"
                    variant="contained"
                    size="large"
                    type="button"
                    endIcon={<LaunchIcon />}
                    onClick={() => {
                      exportFormat('video/mp4', length, setCrop, 'crop');
                    }}
                  >
                    Crop MP4
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
            json={json}
            setJson={setJson}
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
        currentAdSize={currentAdSize}
      />
      <GetStarted video={video} />
    </>
  );
}

FFMPEG.propTypes = {
  props: PropTypes.any,
  ffmpeg: PropTypes.any,
  cropHeight: PropTypes.any,
  cropWidth: PropTypes.any,
  length: PropTypes.any,
  scale: PropTypes.any,
  json: PropTypes.any,
  setJson: PropTypes.any,
  video: PropTypes.any,
  setVideo: PropTypes.any,
  filename: PropTypes.any,
  setFilename: PropTypes.any,
  treatmentOverlay: PropTypes.any,
  fieldData: PropTypes.any,
  retina: PropTypes.any,
  currentAdSize: PropTypes.any,
  quality: PropTypes.any,
};
