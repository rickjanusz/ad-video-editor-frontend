const getDimensions = (field, data) => {
  const fieldData = [];
  data.map((dataBits) => {
    if (dataBits.name === field) {
      fieldData.push({
        field,
        size: `${dataBits.sizeX}x${dataBits.sizeY}`,
        props: {
          top: `${dataBits.top}px`,
          left: `${dataBits.left}px`,
          width: `${dataBits.width}px`,
          height: `${dataBits.height}px`,
        },
        dims: {
          top: dataBits.top,
          left: dataBits.left,
          width: dataBits.width,
          height: dataBits.height,
        },
      });
    }
  });
  return fieldData;
};

export default getDimensions;
