import PropTypes from 'prop-types';
import styled from 'styled-components';
import AdContent from './AdContent';

const AdStyle = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: relative;
  margin: 2px;
  float: left;
  overflow: hidden;
`;

const AdSize = ({ children, sizeData }) => {
  const { ad } = sizeData;
  return (
    <AdStyle
      className={`size_${ad.size}`}
      style={ad.props}
      key={`adsize_${ad.size}`}
    >
      {children}
      <AdContent sizeData={sizeData} />
    </AdStyle>
  );
};

AdSize.propTypes = {
  sizeData: PropTypes.any,
  children: PropTypes.any,
};

export default AdSize;
