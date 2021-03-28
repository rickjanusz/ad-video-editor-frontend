import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import AdSize from './AdSize';

const AdGrid = styled.div``;

export default function AdSizes({ props, forwardedRef }) {
  const ctxArr = [];
  const { fieldData } = props;
  // const {fieldData }= props
  const canvasRefs = useRef([]);
  console.log(fieldData);
  useEffect(() => {
    const imgArr = document.querySelectorAll('.lifestyle_img');
    imgArr.forEach((img, i) => {
      const canvas = React.createElement('canvas', {
        width: 728,
        height: 400,
        ref: canvasRefs.current[i],
      });
      ReactDOM.render(canvas, imgArr[i]);
    });
    const vid = forwardedRef.current;

    // Loop through all refs (1 per canvas) and create video context
    function drawCtxImage() {
      canvasRefs.current.forEach((canvas, i) => {
        // console.log(canvas);
        if (canvas !== undefined) {
          const { width, height, left, top } = fieldData[i].ad.lifestyle.dims;
          ctxArr[i] = canvas.current?.getContext('2d', { alpha: false });
          ctxArr[i]?.drawImage(
            vid,
            0, // crop left
            0, // crop top
            728, // crop width
            420 // crop height
            // Math.floor(left), // left
            // Math.floor(top), // top
            // Math.floor(width), // width
            // Math.floor(height) // height
          );
        }
      });
    }
    // Redraw video frames to canvas
    function step() {
      drawCtxImage();
      requestAnimationFrame(step);
    }
    // Populate videos right away
    requestAnimationFrame(step);
    // Listen for scrub or play
    vid.addEventListener('play', () => {
      requestAnimationFrame(step);
    });
    console.log('REFS', canvasRefs.current);
  });
  // initialize ref array

  // // OFF SCREEN RENDERING
  // // Loop through ad sizes and for each create a dynamic ref
  canvasRefs.current = fieldData.map((sizeData, i) => {
    if (Object.keys(sizeData.ad.lifestyle).length !== 0) {
      return canvasRefs.current[i] ?? React.createRef();
    }
  });

  // const vratio = (c.height / v.videoHeight) * v.videoWidth;
  // const hratio = (c.width / v.videoWidth) * v.videoHeight;

  // useEffect(() => {
  //   const vid = forwardedRef.current;

  //   // Loop through all refs (1 per canvas) and create video context
  //   function drawCtxImage() {
  //     canvasRefs.current.forEach((canvas, i) => {
  //       // console.log(canvas);
  //       if (canvas !== undefined) {
  //         const { width, height, left, top } = fieldData[i].ad.lifestyle.dims;
  //         ctxArr[i] = canvas.current?.getContext('2d', { alpha: false });
  //         ctxArr[i]?.drawImage(
  //           vid,
  //           0, // crop left
  //           0, // crop top
  //           width, // crop width
  //           height, // crop height
  //           Math.floor(left), // left
  //           Math.floor(top), // top
  //           Math.floor(width), // width
  //           Math.floor(height) // height
  //         );
  //       }
  //     });
  //   }
  //   // Redraw video frames to canvas
  //   function step() {
  //     drawCtxImage();
  //     requestAnimationFrame(step);
  //   }
  //   // Populate videos right away
  //   requestAnimationFrame(step);
  //   // Listen for scrub or play
  //   vid.addEventListener('play', () => {
  //     requestAnimationFrame(step);
  //   });
  // }, []);

  return (
    <AdGrid>
      <div id="global" />
      {fieldData.map((sizeData, i) => (
        <AdSize sizeData={sizeData} key={`grid${sizeData.size}${i}`}>
          {/* <canvas
            ref={canvasRefs.current[i]}
            width={sizeData.ad.numX}
            height={sizeData.ad.numY}
          /> */}
        </AdSize>
      ))}
    </AdGrid>
  );
}

AdSizes.propTypes = {
  props: PropTypes.any,
  forwardedRef: PropTypes.object,
  fieldData: PropTypes.object,
};
