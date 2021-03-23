import React, { useRef } from 'react';

export default function CropVideo(ref = 'canvas1', height = 400, width = 720) {
  const canvas = useRef(ref);
  //   const video = document.querySelector("video");

  const ctx = canvas.getContext('2d');

  function step() {
    // ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    requestAnimationFrame(step);
  }

  video.addEventListener('play', () => {
    requestAnimationFrame(step);
  });
  return (
    <div>
      <canvas ref={canvas} className="canvas1" width={width} height={height} />
    </div>
  );
}
