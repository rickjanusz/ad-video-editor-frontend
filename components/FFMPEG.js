import React, { useEffect, useRef } from "react"; // import React, { useState, imagetgif from "react";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import DragAndDrop from "../components/DragAndDrop";
import Draggable from "react-draggable";
import NProgress from "nprogress";
import getPosition from "../utils/getPosition";
// import CropVideo from "./CropVideo";

// TODO: This should init at App level
const ffmpeg = createFFmpeg({ log: true });

export default function FFMPEG({ props }) {
  const {
    data,
    dispatch,
    ready,
    setReady,
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
  } = props;

  // ////////////////////
  // STATE: FFMPEG READY
  // ////////////////////

  const load = async () => {
    await ffmpeg.load();
    setReady(true);
  };

  useEffect(() => {
    // TODO: HANDLE THIS!!!!
    // TODO: We load without checking- what is the right method?...
    // TODO: HANDLE THIS!!!! the currently commented out code is...
    // TODO: not right, not enough, whatever...
    // if (!ffmpeg.isLoaded) {
    load();
    // }
  }, []);

  // ////////////////////
  // GET POSITION OF CROPPER:
  // TODO: Move this into utils
  // ////////////////////

  const obj = useRef(null);
  const objParent = useRef(null);

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

  function handleStop() {
    getPosition();
  }

  // ////////////////////
  // GET/SET VIDEO TIME
  // TODO: Move this into utils
  // ////////////////////

  useEffect(() => {
    if (video) {
      saveFrame();
      // localStorage.setItem("video", video);
    }
  }, [video]);

  function saveFrame() {
    const vid = document.querySelector("#player");
    const cur = document.querySelector("#current");

    vid.addEventListener("timeupdate", (event) => {
      cur.innerHTML = event.srcElement.currentTime;
      setTime(event.srcElement.currentTime);
    });
  }

  const convertVideoToMP4 = async () => {
    ffmpeg.FS("writeFile", "test.mp4", await fetchFile(video));
    // Video
    await ffmpeg.run(
      "-i",
      "test.mp4",
      // TODO: Figure out 265 codec...
      // TODO: for enhanced optimization
      // "-vcodec",
      // "libx265",
      // "-crf",
      // "28",
      "output.mp4"
    );
    const data = ffmpeg.FS("readFile", "output.mp4");
    const url = URL.createObjectURL(
      new Blob([data.buffer], {
        type: "video/mp4",
      })
    );
    setVideo(url);
  };

  // ////////////////////
  // CAPTURE CROP/GIF/JPG
  // TODO: Move this into utils
  // ////////////////////

  async function exportFormat(mimType, length, stateFunc, localItem) {
    const ext = mimType.split("/").pop();
    ffmpeg.FS("writeFile", "test.mp4", await fetchFile(video));
    const dims = getPosition();

    await ffmpeg.setProgress(({ ratio }) => {
      NProgress.set(ratio);
      console.log({ ratio });
      if (ratio === 1) {
        NProgress.done();
      }
    });

    // Run the FFMpeg command
    await ffmpeg.run(
      "-i",
      "test.mp4",
      "-t",
      `${length}`,
      "-ss",
      `${time}`,
      "-filter:v",
      `crop=${dims.width}:${dims.height}:${dims.left}:${dims.top}`,
      `out.${ext}`
    );

    //   // Read the result
    const data = ffmpeg.FS("readFile", `out.${ext}`);
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
            <video controls width="728" id="player" src={video}></video>
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
                  <div className="handle"></div>
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
        gif={gif}
        onClick={() => {
          exportFormat("image/gif", "1", setGif, "gif");
        }}
      >
        Export GIF
      </button>
      <button
        onClick={() => {
          exportFormat("image/jpg", "5", setJpg, "jpg");
        }}
      >
        Convert to Jpg
      </button>
      &nbsp;
      <button
        onClick={() => {
          exportFormat("video/mp4", "15", setCrop, "crop");
        }}
      >
        Crop MP4
      </button>
      <button onClick={convertVideoToMP4}>Convert To MP4</button>
      {gif && <img src={gif} alt="" />}
      {jpg && <img src={jpg} alt="" />}
      {crop && (
        <>
          <div className="parent">
            <video controls id="playerCrop" src={crop}></video>
          </div>
        </>
      )}
    </>
  ) : (
    <p>Loading...</p>
  );
}
