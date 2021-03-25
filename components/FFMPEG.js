import React, { useEffect, useRef } from 'react'; // import React, { useState, imagetgif from "react";
import { fetchFile } from '@ffmpeg/ffmpeg';
import Draggable from 'react-draggable';
import NProgress from 'nprogress';
import PropTypes from 'prop-types';
import DragAndDrop from './DragAndDrop';

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
  } = props;

  const obj = useRef();
  const objParent = useRef();

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

  // Drag & Drop callback
  function handleStop() {
    getPosition();
  }

  // ////////////////////
  // GET/SET VIDEO TIME
  // TODO: Move this into utils
  // ////////////////////
  // const blah = URL.createObjectURL(new Blob(video, { type: 'video/mp4' }));
  // console.log(blah);

  function saveFrame() {
    const vid = document.querySelector('#player');
    const cur = document.querySelector('#current');

    vid.addEventListener('timeupdate', (event) => {
      cur.innerHTML = event.srcElement.currentTime;
      setTime(event.srcElement.currentTime);
    });
  }

  useEffect(() => {
    if (video) {
      saveFrame();
    }
  });

  const convertVideoToMP4 = async () => {
    ffmpeg.FS('writeFile', 'test.mp4', await fetchFile(video));

    await ffmpeg.setProgress(({ ratio }) => {
      NProgress.set(ratio);
      // console.log({ ratio });
      if (ratio === 1) {
        NProgress.done();
      }
    });
    // Video
    await ffmpeg.run(
      '-i',
      'test.mp4',
      // TODO: Figure out 265 codec...
      // TODO: for enhanced optimization
      // "-vcodec",
      // "libx265",
      // "-crf",
      // "28",
      'output.mp4'
    );
    const data = ffmpeg.FS('readFile', 'output.mp4');
    const url = URL.createObjectURL(
      new Blob([data.buffer], {
        type: 'video/mp4',
      })
    );
    setVideo(url);
  };

  // ////////////////////
  // CAPTURE CROP/GIF/JPG
  // TODO: Move this into utils
  // ////////////////////

  async function exportFormat(mimType, length, stateFunc) {
    const ext = mimType.split('/').pop();
    ffmpeg.FS('writeFile', 'test.mp4', await fetchFile(video));
    const dims = getPosition();

    await ffmpeg.setProgress(({ ratio }) => {
      NProgress.set(ratio);
      // console.log({ ratio });
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
      `crop=${dims.width}:${dims.height}:${dims.left}:${dims.top}`,
      `out.${ext}`
    );
    //   // Read the result
    console.log(`out.${ext}!!!!`);
    const data = ffmpeg.FS('readFile', `out.${ext}`);

    // Create a URL
    const url = URL.createObjectURL(
      new Blob([data.buffer], { type: `${mimType}` })
    );
    stateFunc(url);
  }

  return ready ? (
    <>
      {video && (
        <>
          <div className="parent">
            <video controls width="728" id="player" muted src={video} />
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
                <div className="draggy" ref={obj}>
                  <div className="handle" />
                </div>
              </Draggable>
            </div>
          </div>
          <div id="current">0:00</div>
        </>
      )}
      <DragAndDrop data={data} dispatch={dispatch} setVideo={setVideo} />
      <h2>GIF Preview</h2>
      &nbsp;
      <button
        type="button"
        onClick={() => {
          exportFormat('image/gif', '1', setGif, 'gif');
        }}
      >
        Export GIF
      </button>
      <button
        type="button"
        onClick={() => {
          exportFormat('image/jpg', '5', setJpg, 'jpg');
        }}
      >
        Convert to Jpg
      </button>
      &nbsp;
      <button
        type="button"
        onClick={() => {
          exportFormat('video/mp4', '15', setCrop, 'crop');
        }}
      >
        Crop MP4
      </button>
      <button type="button" onClick={convertVideoToMP4}>
        Convert To MP4
      </button>
      {gif && <img src={gif} alt="" />}
      {jpg && <img src={jpg} alt="" />}
      {crop && (
        <>
          <div className="parent">
            <video controls id="playerCrop" muted src={crop} />
          </div>
        </>
      )}
    </>
  ) : (
    <p>Loading...</p>
  );
}

FFMPEG.propTypes = {
  data: PropTypes.object,
  dispatch: PropTypes.object,
  ready: PropTypes.string,
  video: PropTypes.string,
  setVideo: PropTypes.string,
  crop: PropTypes.string,
  setCrop: PropTypes.string,
  gif: PropTypes.string,
  setGif: PropTypes.string,
  jpg: PropTypes.string,
  setJpg: PropTypes.string,
  time: PropTypes.string,
  setTime: PropTypes.string,
  ffmpeg: PropTypes.string,
};
