import React, { useState, useEffect } from "react"; // import React, { useState, imagetgif from "react";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

const ffmpeg = createFFmpeg({ log: true });

export default function FFMPEG() {
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

  return <div></div>;
}
