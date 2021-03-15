/**
 * Get viewBox coordinates suitable for rendering an image inside an SVG.
 * In many ways, the viewBox approach is the inverse of the transformCoordinates approach:
 * The SVG viewBox acts as a frame: `left top width height`. You change the coordinates the
 * frame for which you want to focus on an image. To handle zoom, you simply shrink the frame
 * and adjust its coordinates.
 */
export function getViewBoxCoordinates({ inputDimensions, outputDimensions, focalPoint, zoom }) {
  // Find out, in natural pixels, the desired visual center of the original image
  const idealCenter = {
    x: inputDimensions.width * (focalPoint.x / 100),
    y: inputDimensions.height * (focalPoint.y / 100),
  };

  // Determine how much we need to scale the ouput image to fit the input constraints.
  const scale = Math.min(
    inputDimensions.width / outputDimensions.width,
    inputDimensions.height / outputDimensions.height
  );

  // Factor in both `scale` and `zoom` to find out how large our "frame" needs to be
  const width = (outputDimensions.width * scale) / zoom;
  const height = (outputDimensions.height * scale) / zoom;

  // Get the ideal top and left coordinates, and then turn them into realistic
  // coordinates so we don't run out of "image" to show.
  const idealTop = idealCenter.y - height / 2;
  const idealLeft = idealCenter.x - width / 2;

  const maxTop = inputDimensions.height - height;
  const maxLeft = inputDimensions.width - width;

  const top = clamp(idealTop, 0, maxTop);
  const left = clamp(idealLeft, 0, maxLeft);

  return {
    top: Math.floor(top),
    left: Math.floor(left),
    width: Math.floor(width),
    height: Math.floor(height),
  };
}
