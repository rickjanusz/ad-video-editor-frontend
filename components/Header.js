import PropTypes from 'prop-types';
import ControlPanel from './ControlPanel';

export default function Header(props) {
  const {
    cropWidth,
    setCropWidth,
    cropHeight,
    setCropHeight,
    length,
    setLength,
    scale,
    setScale,
    json,
  } = props;
  return (
    <div>
      <ControlPanel
        // props={props}
        cropWidth={cropWidth}
        setCropWidth={setCropWidth}
        cropHeight={cropHeight}
        setCropHeight={setCropHeight}
        length={length}
        setLength={setLength}
        scale={scale}
        setScale={setScale}
        json={json}
      />
    </div>
  );
}

Header.propTypes = {
  cropHeight: PropTypes.any,
  setCropHeight: PropTypes.any,
  cropWidth: PropTypes.any,
  setCropWidth: PropTypes.any,
  length: PropTypes.any,
  setLength: PropTypes.any,
  scale: PropTypes.any,
  setScale: PropTypes.any,
  json: PropTypes.any,
};
