import React, { useEffect, useRef } from 'react'; // import React, { useState, imagetgif from "react";
import { fetchFile } from '@ffmpeg/ffmpeg';
import Draggable from 'react-draggable';
import NProgress from 'nprogress';
import PropTypes from 'prop-types';
import { debounce } from 'debounce';
import styled from 'styled-components';
import { Button, Box, makeStyles } from '@material-ui/core';
import LaunchIcon from '@material-ui/icons/Launch';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import Divider from '@material-ui/core/Divider';
import ControlPanel from './ControlPanel';

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 60px;
  .draggy {
    width: 150px;
    height: 150px;
    resize: both;
    overflow: auto;
    /* background-color: rgba(255, 255, 255, 0.1); */
    border: 3px dotted rgba(255, 255, 255, 0.5);
    box-shadow: 0 0 0px 2000px rgba(0, 0, 0, 0.7);
  }

  .handle {
    height: 100%;
    /* cursor: move; */
    pointer-events: auto;
  }
  .videoContainer {
    max-width: 1920px;
    max-height: 1080px;
    position: relative;
    resize: both;
    overflow: auto;
  }
  video {
    max-width: 1920px;
    max-height: 1080px;
  }
  .draggable-parent {
    /* background-color: green; */
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: absolute;
    z-index: 2;
    top: 0;
    pointer-events: none;
  }
  .ex-preview {
    display: flex;
    flex: wrap;
  }
`;

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
        width: '25ch',
      },
    },
    paper: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  }));

  const obj = useRef();
  const objParent = useRef();
  const vidRef = useRef();
  const timeRef = useRef();
  const classes = useStyles();

  // ////////////////////
  // GET POSITION OF CROPPER:
  // ////////////////////

  function getPosition() {
    const childDims = obj.current.getBoundingClientRect();
    const parentPos = objParent.current.getBoundingClientRect();
    const childOffset = {
      top: childDims.top - parentPos.top,
      left: childDims.left - parentPos.left,
      width: childDims.width,
      height: childDims.height,
    };
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

  async function exportFormat(mimType, length, stateFunc) {
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
      `${length}`,
      '-ss',
      `${time}`,
      '-filter:v',
      // `scale={728*${scale}}:-1`,
      // `-c:a`,
      `crop=${dims.width}:${dims.height}:${dims.left}:${dims.top}`,
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
        <Wrapper>
          <Box display="flex" justifyContent="center">
            <div className="video-cropper">
              <div className="videoContainer">
                <video controls ref={vidRef} id="video" muted src={video} />
                <div className="draggable-parent" ref={objParent}>
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
                      className="draggy"
                      ref={obj}
                      style={{
                        height: `${cropHeight * scale}px`,
                        width: `${cropWidth * scale}px`,
                      }}
                    >
                      <div className="handle" />
                    </div>
                  </Draggable>
                </div>
              </div>
              <div>
                <div>
                  Current Time:{' '}
                  <span id="current" ref={timeRef}>
                    0.00
                  </span>
                </div>
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
                  &nbsp;
                  <Button
                    variant="outlined"
                    size="large"
                    color="primary"
                    type="button"
                    endIcon={<LaunchIcon />}
                    onClick={() => {
                      exportFormat('image/jpg', length, setJpg, 'jpg');
                    }}
                  >
                    Export Jpg
                  </Button>
                  &nbsp;
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
        </Wrapper>
      )}
      {/* <button
        type="button"
        onClick={() => {
          convertVideoToMP4(video);
        }}
        >
        Convert To MP4
      </button> */}
      <Divider p={8} />

      <Box style={{ textAlign: 'center' }}>
        <h1>Preview &amp; Download</h1>
      </Box>

      <Box style={{ textAlign: 'center' }}>
        {gif && (
          <span style={{ display: 'inline-block' }}>
            <Box
              boxShadow={10}
              border={15}
              borderColor={theme.palette.background.paper}
              display="flex"
              justifyContent="center"
              className={classes.paper}
            >
              <img className="preview gif" src={gif} alt="" />
              <Button
                variant="contained"
                // color="secondary"
                fullWidth
                title={`Download ${filename}`}
                endIcon={<SystemUpdateAltIcon />}
                download={`${filename}_${cropWidth}x${cropHeight}.gif`}
                href={gif}
              >
                Download gif
              </Button>
            </Box>
          </span>
        )}
        {jpg && (
          <span style={{ display: 'inline-block' }}>
            <Box
              boxShadow={3}
              border={15}
              borderColor={theme.palette.background.paper}
              display="flex"
              justifyContent="center"
              className={classes.paper}
              m={2}
            >
              <img className="preview jpg" src={jpg} alt="" />
              <Button
                variant="contained"
                // color="secondary"
                fullWidth
                title={`Download ${filename}`}
                endIcon={<SystemUpdateAltIcon />}
                download={`${filename}_${cropWidth}x${cropHeight}.jpg`}
                href={jpg}
              >
                Download Jpg
              </Button>
            </Box>
          </span>
        )}
        {crop && (
          <span style={{ display: 'inline-block' }}>
            <Box
              boxShadow={7}
              border={15}
              borderColor={theme.palette.background.paper}
              display="flex"
              justifyContent="center"
              className={classes.paper}
            >
              <video
                className="preview mp4"
                controls
                id="playerCrop"
                muted
                src={crop}
              />
              <Button
                variant="contained"
                fullWidth
                // color="secondary"
                title={`Download ${filename}`}
                endIcon={<SystemUpdateAltIcon />}
                download={`${filename}_${cropWidth}x${cropHeight}.mp4`}
                href={crop}
              >
                Download MP4
              </Button>
            </Box>
          </span>
        )}
      </Box>
    </>
  ) : (
    <p>Loading...</p>
  );
}

FFMPEG.propTypes = {
  video: PropTypes.string,
  props: PropTypes.any,
  data: PropTypes.any,
  dispatch: PropTypes.any,
  ready: PropTypes.any,
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
};
