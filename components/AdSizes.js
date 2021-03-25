import PropTypes from 'prop-types';
import styled from 'styled-components';
import React, { useEffect, useRef } from 'react';
import AdSize from './AdSize';
import getAdSizes from '../utils/getAdSizes';
import tmData from '../data/treatmentData';

const AdGrid = styled.div``;

export default function AdSizes({ props, forwardedRef }) {
  const ref0 = useRef();

  useEffect(() => {
    const vid = forwardedRef.current;
    const ctx = ref0.current.getContext('2d');

    function step() {
      ctx.drawImage(vid, 0, 0, ref0.current.width, ref0.current.height);
      requestAnimationFrame(step);
    }
    requestAnimationFrame(step);

    vid.addEventListener('play', () => {
      requestAnimationFrame(step);
    });
  }, []);

  // console.log('FORRRWARRDDED!!!! ', forwardedRef.current);
  const vidPlayer = forwardedRef.current;
  return (
    <AdGrid>
      {getAdSizes(tmData[0]).map((sizeData, i) => (
        <AdSize
          tmData={tmData}
          sizeData={sizeData}
          key={`${sizeData.size}_${i}`}
          props={props}
          vidPlayer={vidPlayer}
        >
          <canvas ref={ref0} width="720" height="400" />
        </AdSize>
      ))}
    </AdGrid>
  );
}

AdSizes.propTypes = {
  forwardedRef: PropTypes.object,
  props: PropTypes.any,
};
