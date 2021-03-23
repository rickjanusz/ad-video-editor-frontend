/* eslint-disable jsx-a11y/media-has-caption */
import PropTypes from 'prop-types';
import AdSizes from '../components/AdSizes';

export default function Crop(props) {
  const { video } = props;
  return (
    <>
      <video controls width="728" id="player" src={video} />
      <AdSizes props={props} />
    </>
  );
}

Crop.propTypes = {
  video: PropTypes.string,
};
