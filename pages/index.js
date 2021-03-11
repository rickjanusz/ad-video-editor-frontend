import React, { useState, useEffect } from "react"; // import React, { useState, imagetgif from "react";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import DragAndDrop from "../components/DragAndDrop";
import Head from "next/head";
// import Link from "next/link";
import styles from "../styles/Home.module.css";

const ffmpeg = createFFmpeg({ log: true });

export default function Home() {
  const [ready, setReady] = useState("false");
  const [video, setVideo] = useState();
  const [gif, setGif] = useState();
  const [jpg, setJpg] = useState();

  const load = async () => {
    await ffmpeg.load();
    setReady(true);
  };

  useEffect(() => {
    load();
  }, []);

  let currentFrameTime = "";
  const saveFrame = () => {
    const vid = document.querySelector("#player");
    const cur = document.querySelector("#current");

    vid.addEventListener("timeupdate", (event) => {
      cur.innerHTML = event.srcElement.currentTime;
      currentFrameTime = event.srcElement.currentTime;
      console.log(currentFrameTime);
    });
  };

  const convertToJpg = async () => {
    // Write the file to memory

    ffmpeg.FS("writeFile", "test.mp4", await fetchFile(video));

    // Run the FFMpeg command
    await ffmpeg.run("-i", "test.mp4", "-ss", `${currentFrameTime}`, "out.jpg");

    // Read the result
    const data = ffmpeg.FS("readFile", "out.jpg");

    // Create a URL
    const url = URL.createObjectURL(
      new Blob([data.buffer], { type: "image/jpg" })
    );
    setJpg(url);
  };

  const convertToGif = async (props) => {
    // Write the file to memory
    const [gif, setGif] = useState();
    ffmpeg.FS("writeFile", "test.mp4", await fetchFile(video));

    // Run the FFMpeg command
    await ffmpeg.run(
      "-i",
      "test.mp4",
      "-t",
      "2.5",
      "-ss",
      "2.0",
      "-f",
      "gif",
      "out.gif"
    );

    // Read the result
    const data = ffmpeg.FS("readFile", "out.gif");

    // Create a URL
    const url = URL.createObjectURL(
      new Blob([data.buffer], { type: "image/gif" })
    );
    setGif(url);
  };

  const convertVideo = async () => {
    // const { name } = files;
    // await ffmpeg.load();
    ffmpeg.FS("writeFile", "test.mp4", await fetchFile(video));

    // Video
    await ffmpeg.run("-i", "test.mp4", "output.mp4");
    const data = ffmpeg.FS("readFile", "output.mp4");
    //     const data = ffmpeg.FS("readFile", "out.gif");
    //     console.log(data);

    // NEED
    // const video = document.getElementById("output-video");

    //NEED
    const url = URL.createObjectURL(
      new Blob([data.buffer], {
        type: "video/mp4",
      })
    );
    setVideo(url);
  };

  //   /**
  // Memory management
  // Each time you call createObjectURL(), a new object URL is created, even if you've already created one for the same object. Each of these must be released by calling URL.revokeObjectURL() when you no longer need them.
  //    */

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

  return ready ? (
    <div className="App">
      <Head>
        <title>Ad Video Editor</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {video && (
        <>
          <video controls width="600" id="player" src={video}></video>
          <div id="current">0:00</div>
        </>
      )}
      <DragAndDrop data={data} dispatch={dispatch} setVideo={setVideo} />
      <h2>GIF Preview</h2>
      <button onClick={convertToGif}>Convert to GIF</button>&nbsp;
      <button onClick={convertToJpg}>Convert to Jpg</button>&nbsp;
      <button onClick={saveFrame}>Frame?</button>&nbsp;
      <button onClick={convertVideo}>Convert To MP4</button>
      {gif && <img src={gif} width="250" alt="" />}
      {jpg && <img src={jpg} width="250" alt="" />}
    </div>
  ) : (
    <p>Loading...</p>
  );
}
