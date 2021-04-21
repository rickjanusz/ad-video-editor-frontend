import React from 'react';

export default function TreatmentGhost({ fieldData }) {
  const adSize = fieldData[0].size.split('x');

  let offsetLeft = '';
  let offsetTop = '';
  function getLifestylePos() {
    fieldData.map((field) => {
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
            border: `2px solid rgba(255, 100, 0, .2)`,
            pointerEvents: 'none',
            position: 'absolute',
          }}
        />
      ))}
    </div>
  );
}
