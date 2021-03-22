import { useRef } from 'react';

import tmData from '../data/treatmentData';
import AdSize from './AdSize';

export default function AdSizes() {
  const sizesCont = useRef();

  const getAdSizes = (dataObj) => {
    const sizes = [];
    const dims = dataObj.map((data) => {
      if (data.name === 'logo_img') {
        sizes.push(`${data.sizeX}x${data.sizeY}`);
      }
    });
    return sizes;
  };

  function getDimensions(field, data) {
    const dims = data.map((data) => {
      if (data.name === field) {
        return {
          size: `${data.sizeX}x${data.sizeY}`,
          top: data.top,
          left: data.left,
          width: data.width,
          height: data.height,
        };
        // return console.table(field, newObj);
      }
    });
  }

  // getDimensions('lifestyle_img', tmData[0]);
  // getDimensions('subhead_text', tmData[0]);
  // getDimensions('headline_text', tmData[0]);
  return (
    <div className="sizes" ref={sizesCont}>
      {getAdSizes(tmData[0]).map((sizeData) => (
        <AdSize sizeData={sizeData} />
      ))}
    </div>
  );
}
