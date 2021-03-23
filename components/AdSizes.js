import styled from 'styled-components';
import AdSize from './AdSize';
import getAdSizes from '../utils/getAdSizes';
import tmData from '../data/treatmentData';

const AdGrid = styled.div`
  display: grid;
  max-width: 1200px;
  gap: 3px;
  position: relative;
  grid-template-columns: repeat(40, 1fr);
  grid-auto-flow: dense;
`;

export default function AdSizes({ props }) {
  return (
    <AdGrid>
      {getAdSizes(tmData[0]).map((sizeData, i) => (
        // console.log(sizeData);
        <AdSize
          tmData={tmData}
          sizeData={sizeData}
          key={`${sizeData.size}_${i}`}
          props={props}
        />
      ))}
    </AdGrid>
  );
}
