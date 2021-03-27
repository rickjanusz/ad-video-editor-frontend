import PropTypes from 'prop-types';
import styled from 'styled-components';
import React, { useEffect, useRef } from 'react';
import AdSize from './AdSize';

const AdGrid = styled.div``;

export default function AdSizes({ props, forwardedRef }) {
  // initialize ref array
  const canvasRefs = useRef([]);
  const { fieldData } = props;

  // OFF SCREEN RENDERING
  // const osRef = useRef();
  // Loop through ad sizes and for each create a dynamic ref
  canvasRefs.current = fieldData.map((sizeData, i) => {
    if (Object.keys(sizeData.ad.lifestyle).length !== 0) {
      return canvasRefs.current[i] ?? React.createRef();
    }
  });

  const ctxArr = [];

  useEffect(() => {
    const vid = forwardedRef.current;

    // TODO: :::::::::::::::::::::::::::::::::::::  PRERENDER FUNCTION
    // TODO -- Canvas is hooked up to video SEE osRef canvas in return
    // TODO -- Need to figure out how to render off screen and copy...
    // TODO -- instance to other canvases, this should be a huge...
    // TODO -- performance win
    // TODO: :::::::::::::::::::::::::::::::::::::  PRERENDER FUNCTION

    // function prerenderVideo() {
    //   const ctx = osRef.current.getContext('2d');
    //   ctx.drawImage(
    //     vid,
    //     0, //  left
    //     0, //  top
    //     720, //  width
    //     400 //  height
    //   );
    // }

    // function step() {
    //   prerenderVideo();
    //   requestAnimationFrame(step);
    // }

    // <canvas ref={osRef} width="720" height="400" />
    // TODO: :::::::::::::::::::::::::::::::::::::  END PRERENDER FUNCTION
    // TODO: :::::::::::::::::::::::::::::::::::::  END PRERENDER FUNCTION

    // Loop through all refs (1 per canvas) and create video context
    function drawCtxImage() {
      canvasRefs.current.forEach((canvas, i) => {
        // console.log(canvas);
        // console.log('ADDDDDDDDD: ', fieldData[i].ad.lifestyle.dims);
        if (canvas !== undefined) {
          const { width, height, left, top } = fieldData[i].ad.lifestyle.dims;
          ctxArr[i] = canvas.current?.getContext('2d');
          ctxArr[i]?.drawImage(
            vid,
            0, // crop left
            0, // crop top
            width, // crop width
            height, // crop height
            left, // left
            top, // top
            width, // width
            height // height
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
  }, []);

  return (
    <AdGrid>
      {fieldData.map((sizeData, i) => (
        <AdSize sizeData={sizeData} key={sizeData.size}>
          <canvas
            className=""
            ref={canvasRefs.current[i]}
            width={sizeData.ad.numX}
            height={sizeData.ad.numY}
          />
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
