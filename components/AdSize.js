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

const AdSize = ({ children, sizeData, props }) => (
  <AdStyle className={`size_${sizeData.size}`} style={sizeData.props}>
    {children}
    <AdContent sizeData={sizeData.size} props={props} />
  </AdStyle>
);

AdSize.propTypes = {
  sizeData: PropTypes.any,
  props: PropTypes.any,
  children: PropTypes.any,
};

export default AdSize;
