import getAdSizes from './getAdSizes';
import getDimensions from './getDimensions';
// import tmData from '../data/treatmentData_sonic';

export function getFieldData(data) {
  const sizeData = getAdSizes(data);
  const adData = [];
  const lsImg = getDimensions('lifestyle_img', data);
  const shTxt = getDimensions('subhead_text', data);
  const hlTxt = getDimensions('headline_text', data);

  sizeData.forEach((size) => {
    let tempLs = {};
    let tempSh = {};
    let tempHl = {};
    // console.log(size);
    lsImg.forEach((img) => {
      if (size.size === img.size) {
        tempLs = img;
      }
    });
    shTxt.forEach((sh) => {
      if (size.size === sh.size) {
        tempSh = sh;
      }
    });
    hlTxt.forEach((hl) => {
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
