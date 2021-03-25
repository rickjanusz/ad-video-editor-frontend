import PropTypes from 'prop-types';
import styled from 'styled-components';
import React, { useEffect, useRef } from 'react';
import AdSize from './AdSize';
import getAdSizes from '../utils/getAdSizes';
import tmData from '../data/treatmentData';

const AdGrid = styled.div``;

export default function AdSizes({ props, forwardedRef }) {
  const ref0 = useRef();
  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const ref4 = useRef();
  const ref5 = useRef();
  const ref6 = useRef();
  const ref7 = useRef();
  const ref8 = useRef();
  const ref9 = useRef();
  const ref10 = useRef();
  const ref11 = useRef();
  const ref12 = useRef();
  const ref13 = useRef();
  const refArr = [
    ref0,
    ref1,
    ref2,
    ref3,
    ref4,
    ref5,
    ref6,
    ref7,
    ref8,
    ref9,
    ref10,
    ref11,
    ref12,
    ref13,
  ];
  getAdSizes(tmData[0]).map((sizeData, i) => {
    console.log(sizeData.size);
    refArr.push((sizeData.size = React.createRef()));
  });
  console.log(refArr);

  useEffect(() => {
    const vid = forwardedRef.current;
    const ctx0 = ref0.current.getContext('2d');
    const ctx1 = ref1.current.getContext('2d');
    const ctx2 = ref2.current.getContext('2d');
    function step() {
      ctx0.drawImage(vid, 0, 0, ref0.current.width, ref0.current.height);
      ctx1.drawImage(vid, 0, 0, ref1.current.width, ref0.current.height);
      ctx2.drawImage(vid, 0, 0, ref2.current.width, ref0.current.height);
      requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
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
          <canvas ref={refArr[i]} width="720" height="400" />
        </AdSize>
      ))}
    </AdGrid>
  );
}

AdSizes.propTypes = {
  forwardedRef: PropTypes.object,
  props: PropTypes.any,
};
