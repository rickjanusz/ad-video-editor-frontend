import styled from 'styled-components';
import PropTypes from 'prop-types';

const ControlPanelStyles = styled.form``;

export default function ControlPanel(props) {
  const {
    cropHeight,
    setCropHeight,
    cropWidth,
    setCropWidth,
    length,
    setLength,
    scale,
    setScale,
  } = props;

  const options = [
    '300x1050',
    '300x250',
    '300x600',
    '320x480',
    '320x50',
    '320x100',
    '468x60',
    '728x90',
    '970x90',
    '970x250',
    '800x250',
    '336x280',
    '180x150',
  ];

  return (
    <ControlPanelStyles>
      <label htmlFor="cropWidth">
        {' '}
        Crop Width &nbsp;
        <input
          name="cropWidth"
          id="cropWidth"
          type="number"
          value={cropWidth}
          onChange={(e) => {
            setCropWidth(e.target.value);
            localStorage.setItem('cropWidth', e.target.value);
          }}
        />
      </label>
      <label htmlFor="cropHeight">
        {' '}
        Crop Height &nbsp;
        <input
          name="cropHeight"
          id="cropHeight"
          type="number"
          value={cropHeight}
          onChange={(e) => {
            setCropHeight(e.target.value);
            localStorage.setItem('cropHeight', e.target.value);
          }}
        />
      </label>
      <label htmlFor="length">
        {' '}
        Length &nbsp;
        <input
          name="length"
          id="length"
          type="number"
          value={length}
          onChange={(e) => {
            setLength(e.target.value);
            localStorage.setItem('length', e.target.value);
          }}
        />
      </label>
      <label htmlFor="scale">
        {' '}
        Crop Scale &nbsp;
        <input
          name="scale"
          id="scale"
          type="number"
          value={scale}
          onChange={(e) => {
            setScale(e.target.value);
            localStorage.setItem('scale', e.target.value);
          }}
        />
      </label>
      <label htmlFor="selectASize">
        {' '}
        Select a Size &nbsp;
        <select
          name="selectASize"
          id="selectASize"
          onChange={(e) => {
            const a = e.target.value;
            const b = a.split('x');
            setCropWidth(b[0]);
            setCropHeight(b[1]);
            console.log(e.target.value);
            // localStorage.setItem('scale', e.target.value);
          }}
        >
          {options.map((option) => (
            <option value={`${option}`} key={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
    </ControlPanelStyles>
  );
}

ControlPanel.propTypes = {
  cropHeight: PropTypes.any,
  setCropHeight: PropTypes.any,
  cropWidth: PropTypes.any,
  setCropWidth: PropTypes.any,
  length: PropTypes.any,
  setLength: PropTypes.any,
  scale: PropTypes.any,
  setScale: PropTypes.any,
};
