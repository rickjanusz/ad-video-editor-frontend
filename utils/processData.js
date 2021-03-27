import getAdSizes from './getAdSizes';
import getDimensions from './getDimensions';
import tmData from '../data/treatmentData_sonic';

const sizeData = getAdSizes(tmData[0]);

export function getFieldData() {
  const adData = [];
  const lsImg = getDimensions('lifestyle_img', tmData[0]);
  const shTxt = getDimensions('subhead_text', tmData[0]);
  const hlTxt = getDimensions('headline_text', tmData[0]);

  sizeData.map((size, i) => {
    let tempLs = {};
    let tempSh = {};
    let tempHl = {};
    // console.log(size);
    lsImg.map((img) => {
      if (size.size === img.size) {
        tempLs = img;
      }
    });
    shTxt.map((sh) => {
      if (size.size === sh.size) {
        tempSh = sh;
      }
    });
    hlTxt.map((hl) => {
      if (size.size === hl.size) {
        tempHl = hl;
      }
    });
    adData.push({
      ad: {
        size: `${size.dims.width}x${size.dims.height}`,
        props: {
          width: size.props.width,
          height: size.props.height,
        },
        numX: size.dims.width,
        numY: size.dims.height,
        headline: tempHl,
        lifestyle: tempLs,
        subhead: tempSh,
      },
    });
  });

  return adData;
}
