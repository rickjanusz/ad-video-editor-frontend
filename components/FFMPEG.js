import React, { useState, useEffect, useRef } from "react"; // import React, { useState, imagetgif from "react";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import DragAndDrop from "../components/DragAndDrop";
import Draggable from "react-draggable";
// import CropVideo from "./CropVideo";

const ffmpeg = createFFmpeg({ log: true });

export default function FFMPEG() {
  // ////////////////////
  // STATE: FFMPEG READY
  // ////////////////////

  const [ready, setReady] = useState("false");

  const [video, setVideo] = useState();
  const [crop, setCrop] = useState();
  const [gif, setGif] = useState();
  const [jpg, setJpg] = useState();

  const [time, setTime] = useState(0);

  const load = async () => {
    await ffmpeg.load();
    setReady(true);
  };

  useEffect(() => {
    load();
  }, []);

  // ////////////////////
  //  VIDEO
  // ////////////////////

  useEffect(() => {
    if (video) saveFrame();
  }, [video]);

  function saveFrame() {
    const vid = document.querySelector("#player");
    const cur = document.querySelector("#current");

    vid.addEventListener("timeupdate", (event) => {
      cur.innerHTML = event.srcElement.currentTime;
      setTime(event.srcElement.currentTime);
      // console.log(currentFrameTime);
    });
  }

  const convertVideo = async () => {
    ffmpeg.FS("writeFile", "test.mp4", await fetchFile(video));
    // Video
    await ffmpeg.run("-i", "test.mp4", "output.mp4");
    const data = ffmpeg.FS("readFile", "output.mp4");
    const url = URL.createObjectURL(
      new Blob([data.buffer], {
        type: "video/mp4",
      })
    );
    setVideo(url);
  };

  async function exportFormat(mimType, length, state) {
    const ext = mimType.split("/").pop();
    ffmpeg.FS("writeFile", "test.mp4", await fetchFile(video));
    const dims = getPosition();

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
    state(url);
  }

  // ////////////////////
  //  DROPZONE
  // ////////////////////

  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_DROP_DEPTH":
        return { ...state, dropDepth: action.dropDepth };
      case "SET_IN_DROP_ZONE":
        return { ...state, inDropZone: action.inDropZone };
      case "ADD_FILE_TO_LIST":
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

  const obj = useRef(null);
  const objParent = useRef(null);

  function handleStop() {
    getPosition();
    // const offset = obj.current.getBoundingClientRect();
    // console.log(offset);
  }
  function getPosition() {
    const childDims = obj.current.getBoundingClientRect();
    const parentPos = objParent.current.getBoundingClientRect();
    // return console.log(childPos);
    const childOffset = {
      top: childDims.top - parentPos.top,
      left: childDims.left - parentPos.left,
      width: childDims.width,
      height: childDims.height,
    };
    console.log({ childOffset });
    return childOffset;
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
        onClick={() => {
          exportFormat("image/gif", "1", setGif);
        }}
      >
        Export GIF
      </button>
      <button
        onClick={() => {
          exportFormat("image/jpg", "5", setJpg);
        }}
      >
        Convert to Jpg
      </button>
      &nbsp;
      <button
        onClick={() => {
          exportFormat("video/mp4", "15", setCrop);
        }}
      >
        Crop MP4
      </button>
      <button onClick={convertVideo}>Convert To MP4</button>
      {gif && (
        <>
          <img
            src={gif}
            width={() => {
              const dims = getPosition();
              dims.width;
            }}
            height={() => {
              const dims = getPosition();
              dims.height;
            }}
            alt=""
          />
        </>
      )}
      {jpg && (
        <img
          src={jpg}
          width={() => {
            const dims = getPosition();
            dims.width;
          }}
          height={() => {
            const dims = getPosition();
            dims.height;
          }}
          alt=""
        />
      )}
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
