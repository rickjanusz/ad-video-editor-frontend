import React from 'react';
import PropTypes from 'prop-types';

export default function TreatmentGhost({ fieldData, retina }) {
  const adSize = fieldData[0].size.split('x');

  let offsetLeft = '';
  let offsetTop = '';

  console.log('adSize[0]', adSize[0], 'retina', retina);
  function getLifestylePos() {
    fieldData.forEach((field) => {
      if (field.field === 'lifestyle_img') {
        offsetLeft = Math.floor(field.dims.left);
        offsetTop = Math.floor(field.dims.top);
        console.log('Ghost: ', offsetLeft, offsetTop);
      }
    });
  }
  getLifestylePos();

  return (
    <div
      className="ghost"
      data-top={offsetTop}
      data-left={offsetLeft}
      data-width={adSize[0]}
      data-height={adSize[1]}
      style={{
        width: `${adSize[0]}px`,
        height: `${adSize[1]}px`,
        left: `${offsetLeft}px`,
        top: `${offsetTop}px`,
        position: 'absolute',
        zIndex: 1000,
      }}
    >
      {fieldData.map((field) => (
        <div
          className={field.field}
          style={{
            ...field.dims,
            border: `1px solid rgba(255, 0, 255, .5)`,
            pointerEvents: 'none',
            position: 'absolute',
          }}
          key={field.field}
        />
      ))}
    </div>
  );
}

TreatmentGhost.propTypes = {
  fieldData: PropTypes.any,
  retina: PropTypes.any,
};
