import React, { useEffect, useRef } from 'react'; // import React, { useState, imagetgif from "react";
import { fetchFile } from '@ffmpeg/ffmpeg';
import Draggable from 'react-draggable';
import NProgress from 'nprogress';
import PropTypes from 'prop-types';
import { debounce } from 'debounce';
import styled from 'styled-components';
import { Button, Grid } from '@material-ui/core';

import DragAndDrop from './DragAndDrop';
import ControlPanel from './ControlPanel';

const Wrapper = styled.div`
  display: flex;
  flex: wrap;
  label {
    display: block;
    margin: 10px;
  }
  .draggy {
    width: 150px;
    height: 150px;
    resize: both;
    overflow: auto;
    /* background-color: rgba(255, 255, 255, 0.1); */
    border: 3px dotted rgba(10, 50, 125, 0.3);
    box-shadow: 0 0 0px 2000px rgba(0, 0, 0, 0.5);
  }

  .handle {
    height: 100%;
    /* cursor: move; */
    pointer-events: auto;
  }
  .videoContainer {
    width: auto;
    position: relative;
    resize: both;
    overflow: auto;
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
  } = props;

  const obj = useRef();
  const objParent = useRef();
  const vidRef = useRef();
  const timeRef = useRef();
  // ////////////////////
  // GET POSITION OF CROPPER:
  // TODO: Move this into utils
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
      <DragAndDrop
        data={data}
        dispatch={dispatch}
        setVideo={setVideo}
        convertVideoToMp4={convertVideoToMP4}
        setFilename={setFilename}
      />
      <Grid container direction="row" justify="center" alignItems="flex-start">
        {video && (
          <Wrapper>
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
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  type="button"
                  onClick={() => {
                    exportFormat('image/gif', length, setGif, 'gif');
                  }}
                >
                  Export GIF
                </Button>
                &nbsp;
                <Button
                  variant="contained"
                  color="primary"
                  type="button"
                  onClick={() => {
                    exportFormat('image/jpg', length, setJpg, 'jpg');
                  }}
                >
                  Export Jpg
                </Button>
                &nbsp;
                <Button
                  variant="contained"
                  color="primary"
                  type="button"
                  onClick={() => {
                    exportFormat('video/mp4', length, setCrop, 'crop');
                  }}
                >
                  Export MP4
                </Button>
              </div>
            </div>
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
              />

              <div>
                Current Time:{' '}
                <span id="current" ref={timeRef}>
                  0.00
                </span>
              </div>
            </div>
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
        <Grid className="ex-preview">
          <h2>Preview &amp; Download</h2>

          {gif && (
            <div>
              <img className="preview gif" src={gif} alt="" />
              <br />
              <a
                className="download"
                title={`Download ${filename}`}
                download={`${filename}_${cropWidth}x${cropHeight}.gif`}
                href={gif}
              >
                Download gif
              </a>
            </div>
          )}
          {jpg && (
            <div>
              <img className="preview jpg" src={jpg} alt="" />
              <br />
              <a
                className="download"
                title={`Download ${filename}`}
                download={`${filename}_${cropWidth}x${cropHeight}.jpg`}
                href={jpg}
              >
                Download Jpg
              </a>
            </div>
          )}
          {crop && (
            <div>
              <video
                className="preview mp4"
                controls
                id="playerCrop"
                muted
                src={crop}
              />
              <br />
              <a
                className="download"
                title={`Download ${filename}`}
                download={`${filename}_${cropWidth}x${cropHeight}.mp4`}
                href={crop}
              >
                Download Video
              </a>
            </div>
          )}
        </Grid>
      </Grid>
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
};
