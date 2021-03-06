const getAdSizes = (dataObj) => {
  const sizes = [];
  dataObj.forEach((data) => {
    if (data.name === 'logo_img') {
      sizes.push({
        size: `${data.sizeX}x${data.sizeY}`,
        props: {
          width: `${data.sizeX}px`,
          height: `${data.sizeY}px`,
        },
        dims: {
          width: `${data.sizeX}`,
          height: `${data.sizeY}`,
        },
      });
      //   console.log(data);
    }
  });
  return sizes;
};

export default getAdSizes;
