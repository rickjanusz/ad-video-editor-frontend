import React, { useEffect, useRef } from 'react'; // import React, { useState, imagetgif from "react";
import { fetchFile } from '@ffmpeg/ffmpeg';
import Draggable from 'react-draggable';
import NProgress from 'nprogress';
import PropTypes from 'prop-types';
import { debounce } from 'debounce';

import DragAndDrop from './DragAndDrop';

export default function FfMpeg({ props }) {
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

  function videoLoaded() {
    vidRef.current.addEventListener('onloadedmetadata', (e) => {
      console.log(vid.style.height);
    });
  }

  function saveFrame() {
    const vid = document.querySelector('#video');
    const cur = document.querySelector('#current');

    // vid.addEventListener('timeupdate', (event) => {
    //   cur.innerHTML = event.srcElement.currentTime;
    //   const time = event.srcElement.currentTime;

    //   // setTime(event.srcElement.currentTime);
    // });

    vidRef.current.addEventListener('seeked', (event) => {
      // console.log('seeking');
      timeRef.current.innerHTML = event.srcElement.currentTime;
      debounce(setTime(event.srcElement.currentTime), 2000);
    });
  }

  useEffect(() => {
    if (video) {
      // videoLoaded();
      saveFrame();
    }
  });

  const convertVideoToMP4 = async (video, ext) => {
    ffmpeg.FS('writeFile', `input.${ext}`, await fetchFile(video));

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
      `input.${ext}`,
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

    // localStorage.setItem('video', data);
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
    // console.log(`out.${ext}!!!!`);
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
                <div className="draggy" ref={obj}>
                  <div className="handle" />
                </div>
              </Draggable>
            </div>
          </div>
          <div id="current" ref={timeRef}>
            0:00
          </div>
        </>
      )}
      <DragAndDrop
        data={data}
        dispatch={dispatch}
        setVideo={setVideo}
        convertVideoToMp4={convertVideoToMP4}
        setFilename={setFilename}
      />
      <h2>GIF Preview</h2>
      &nbsp;
      <button
        type="button"
        onClick={() => {
          exportFormat('image/gif', '3', setGif, 'gif');
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
      <button
        type="button"
        onClick={() => {
          convertVideoToMP4(video);
        }}
      >
        Convert To MP4
      </button>
      <br />
      <div className="x-preview">
        {gif && (
          <div>
            <img className="preview gif" src={gif} alt="" />

            <br />
            <a
              className="download"
              title={`Download ${filename}`}
              download={`${filename}.gif`}
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
              download={`${filename}.jpg`}
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
              download={`${filename}.mp4`}
              href={crop}
            >
              Download Video
            </a>
          </div>
        )}
      </div>
    </>
  ) : (
    <p>Loading...</p>
  );
}

FfMpeg.propTypes = {
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
  filename: PropTypes.any,
  setFilename: PropTypes.any,
};
