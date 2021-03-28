import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import AdSize from './AdSize';

const AdGrid = styled.div``;

export default function AdSizes({ props, forwardedRef }) {
  const { fieldData } = props;
  // initialize ref array
  const ctxArr = [];
  const canvasRefs = useRef([]);

  // OFF SCREEN RENDERING
  // Loop through ad sizes and for each create a dynamic ref
  canvasRefs.current = fieldData.map((sizeData, i) => {
    if (Object.keys(sizeData.ad.lifestyle).length !== 0) {
      // console.log('Adding ref to: ', sizeData.ad.size);
      // console.log(canvasRefs.current[i]);
      return canvasRefs.current[i] ?? React.createRef();
    }
  });
  // console.log(canvasRefs.current);
  // const vratio = (c.height / v.videoHeight) * v.videoWidth;
  // const hratio = (c.width / v.videoWidth) * v.videoHeight;

  useEffect(() => {
    const imgArr = document.querySelectorAll('.lifestyle_img');
    imgArr.forEach((img, i) => {
      // console.log(img);
      const canvas = React.createElement('canvas', {
        width: 728,
        height: 400,
        ref: canvasRefs.current[i],
      });
      ReactDOM.render(canvas, img);
    });
    const vid = forwardedRef.current;

    // Loop through all refs (1 per canvas) and create video context
    function drawCtxImage() {
      canvasRefs.current.forEach((canvas, i) => {
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // console.log(canvas, i);
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        if (canvas !== undefined) {
          ctxArr[i] = canvas.current?.getContext('2d', { alpha: false });
          ctxArr[i]?.drawImage(
            vid,
            0, // crop left
            0, // crop top
            728, // crop width
            420 // crop height
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
  });

  return (
    <AdGrid>
      <div id="global" />
      {fieldData.map((sizeData, i) => (
        <AdSize sizeData={sizeData} key={`grid${sizeData.size}${i}`} />
      ))}
    </AdGrid>
  );
}

AdSizes.propTypes = {
  props: PropTypes.any,
  forwardedRef: PropTypes.object,
  fieldData: PropTypes.object,
};
