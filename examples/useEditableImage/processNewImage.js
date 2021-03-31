async function processNewImage({ file, imageSize, fileType }) {
  const newImageUrl = await uploader(file, fileType);

  let processedImageUrl = newImageUrl;
  const focalPoint = DEFAULT_FOCAL_POINT;
  const zoom = DEFAULT_ZOOM;

  const processedImage = await processImage({
    url: newImageUrl,
    focalPoint,
    dimensions,
    fileType,
    zoom,
  });

  processedImageUrl = await uploader(processedImage, fileType);

  onChange(newValue);
}