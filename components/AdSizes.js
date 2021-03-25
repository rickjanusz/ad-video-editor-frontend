import PropTypes from 'prop-types';
import styled from 'styled-components';
import React, { useEffect, useRef } from 'react';
import AdSize from './AdSize';
import getAdSizes from '../utils/getAdSizes';
import tmData from '../data/treatmentData';

const AdGrid = styled.div``;

export default function AdSizes({ props, forwardedRef }) {
  // initialize ref array
  const canvasRefs = useRef([]);
  // Loop through ad sizes and for each create a dynamic ref
  canvasRefs.current = getAdSizes(tmData[0]).map(
    (sizeData, i) => canvasRefs.current[i] ?? React.createRef()
  );

  //  console.log(canvasRefs);

  useEffect(() => {
    const vid = forwardedRef.current;
    const ctxArr = [];
    function drawCtxImage() {
      canvasRefs.current.map((canvas, i) => {
        // console.log(canvas.current);
        ctxArr[i] = canvas.current.getContext('2d');
        ctxArr[i].drawImage(
          vid,
          0,
          0,
          canvas.current.width,
          canvas.current.height
        );
      });
    }

    function step() {
      drawCtxImage();
      requestAnimationFrame(step);
      // ctx0.drawImage(vid, 0, 0, ref0.current.width, ref0.current.height);
      // ctx1.drawImage(vid, 0, 0, ref1.current.width, ref0.current.height);
      // ctx2.drawImage(vid, 0, 0, ref2.current.width, ref0.current.height);
    }
    // requestAnimationFrame(step);
    vid.addEventListener('play', () => {
      requestAnimationFrame(step);
    });
  }, []);

  // console.log('FORRRWARRDDED!!!! ', forwardedRef.current);
  return (
    <AdGrid>
      {getAdSizes(tmData[0]).map((sizeData, i) => (
        <AdSize
          tmData={tmData}
          sizeData={sizeData}
          key={sizeData.size}
          props={props}
        >
          <canvas ref={canvasRefs.current[i]} width="720" height="400" />
        </AdSize>
      ))}
    </AdGrid>
  );
}

AdSizes.propTypes = {
  forwardedRef: PropTypes.object,
  props: PropTypes.any,
};
