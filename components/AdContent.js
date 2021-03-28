import PropTypes from 'prop-types';
import styled from 'styled-components';

const ContentStyles = styled.div`
  position: absolute;
  border: 1px solid rgba(255, 0, 0, 0.5);
`;

const ImgStyles = styled.div`
  position: absolute;
  border: 10px dotted orchid;
  overflow: hidden;
`;

export default function AdContent({ sizeData }) {
  return (
    <div className="adContent" key={`adContent${sizeData.ad.size}`}>
      <ImgStyles
        className="lifestyle_img"
        data-size={sizeData.ad.size}
        style={sizeData.ad.lifestyle.dims}
      />

      <ContentStyles style={sizeData.ad.headline.dims} />

      <ContentStyles style={sizeData.ad.subhead.dims} />
    </div>
  );
}

AdContent.propTypes = {
  sizeData: PropTypes.any,
};
