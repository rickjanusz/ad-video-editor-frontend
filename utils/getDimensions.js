const getDimensions = (field, data) => {
  const fieldData = [];
  const dims = data.map((data) => {
    if (data.name === field) {
      fieldData.push({
        field,
        size: `${data.sizeX}x${data.sizeY}`,
        props: {
          top: `${data.top}px`,
          left: `${data.left}px`,
          width: `${data.width}px`,
          height: `${data.height}px`,
        },
        dims: {
          top: data.top,
          left: data.left,
          width: data.width,
          height: data.height,
        },
      });
      // return console.table(field, newObj);
    }
  });
  // console.log({ fieldData });
  return fieldData;
};

export default getDimensions;
