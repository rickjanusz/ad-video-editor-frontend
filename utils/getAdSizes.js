const getAdSizes = (dataObj) => {
  const sizes = [];
  const dims = dataObj.map((data) => {
    if (data.name === 'logo_img') {
      sizes.push(`${data.sizeX}x${data.sizeY}`);
      //   console.log(data);
    }
  });
  return sizes;
};

export default getAdSizes;
