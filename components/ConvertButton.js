import PropTypes from 'prop-types';

export default function ConvertButton(props) {
  const { exportFormat, length, setType, type } = props;
  console.log(setType.name);
  let mimType = `image/${type}`;
  if (type === 'mp4') {
    mimType = `video/${type}`;
  }

  return (
    <button
      type="button"
      onClick={() => {
        exportFormat(mimType, length, setType, `${type}`);
      }}
    >
      Export {type}
    </button>
  );
}

ConvertButton.propTypes = {
  exportFormat: PropTypes.any,
  length: PropTypes.any,
  setType: PropTypes.any,
  type: PropTypes.any,
};
