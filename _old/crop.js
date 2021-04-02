/* eslint-disable jsx-a11y/media-has-caption */
import PropTypes from 'prop-types';
import { useRef } from 'react';
import AdSizes from '../components/AdSizes';

export default function Crop(props) {
  const { video } = props;
  const ref = useRef();

  return (
    <>
      <video controls width="728" id="player" muted ref={ref} src={video} />
      <AdSizes props={props} forwardedRef={ref} />
    </>
  );
}

Crop.propTypes = {
  video: PropTypes.string,
};
