import { useRef } from 'react';

import AdSize from './AdSize';
import getAdSizes from '../utils/getAdSizes';
import getDimensions from '../utils/getDimensions';
import tmData from '../data/treatmentData';

export default function AdSizes() {
  const sizesCont = useRef();

  const ls_img = getDimensions('lifestyle_img', tmData[0]);
  const sh_txt = getDimensions('subhead_text', tmData[0]);
  const hl_txt = getDimensions('headline_text', tmData[0]);

  const fieldData = [ls_img, sh_txt, hl_txt];

  return (
    <div className="sizes" ref={sizesCont}>
      {getAdSizes(tmData[0]).map((sizeData, i) => (
        // console.log(sizeData);
        <AdSize
          tmData={tmData}
          sizeData={sizeData}
          fieldData={fieldData}
          key={`${sizeData}_${i}`}
        />
      ))}
    </div>
  );
}
