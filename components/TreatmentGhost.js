import React from 'react';
import { getFieldsForSize } from '../utils/getFieldsForSize';

export default function TreatmentGhost({ fieldData }) {
  const adSize = fieldData[0].size.split('x');

  return (
    <div
      style={{
        width: `${adSize[0]}px`,
        height: `${adSize[1]}px`,
        position: 'absolute',
        border: '1px solid green',
      }}
    >
      {fieldData.map((field) => {
        console.log('FIELD YO', field.size);
        return (
          <div
            className={field.field}
            style={{
              ...field.dims,
              border: '1px solid red',
              pointerEvents: 'none',
              position: 'absolute',
            }}
          />
        );
      })}
    </div>
  );
}
