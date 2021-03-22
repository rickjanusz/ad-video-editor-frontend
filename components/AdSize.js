import { useRef } from 'react';
import styled from 'styled-components';
import AdContent from './AdContent';

const AdStyle = styled.div`
  border: 1px solid black;
`;

export default function AdSize({ sizeData }) {
  const wh = sizeData.split('x');
  const dimensions = {
    width: `${wh[0]}px`,
    height: `${wh[1]}px`,
  };

  return (
    <AdStyle className={`size_${sizeData}`} style={dimensions}>
      I'm a {sizeData}
      <AdContent />
    </AdStyle>
  );
}
