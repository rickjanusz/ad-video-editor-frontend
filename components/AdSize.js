import PropTypes from 'prop-types';
import styled from 'styled-components';
import AdContent from './AdContent';

const AdStyle = styled.div`
  border: 1px solid black;
  position: relative;
`;

export default function AdSize({ sizeData, fieldData }) {
  // console.log({ fieldData });
  const wh = sizeData.split('x');
  const dimensions = {
    width: `${wh[0]}px`,
    height: `${wh[1]}px`,
  };

  return (
    <AdStyle className={`size_${sizeData}`} style={dimensions}>
      {/* I'm a {sizeData} */}
      <AdContent sizeData={sizeData} fieldData={fieldData} />
    </AdStyle>
  );
}

AdSize.propTypes = {
  sizeData: PropTypes.string,
  fieldData: PropTypes.array,
};
