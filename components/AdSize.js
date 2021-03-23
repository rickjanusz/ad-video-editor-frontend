import PropTypes from 'prop-types';
import styled from 'styled-components';
import AdContent from './AdContent';

const AdStyle = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: relative;
  margin: 2px;
`;

export default function AdSize({ sizeData, props }) {
  return (
    <AdStyle style={sizeData.props}>
      <AdContent sizeData={sizeData.size} props={props} />
    </AdStyle>
  );
}

AdSize.propTypes = {
  sizeData: PropTypes.any,
  props: PropTypes.any,
};
