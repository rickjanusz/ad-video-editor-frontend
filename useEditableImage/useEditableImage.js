export function useEditableImage({ ... }) {
   /**
   * Whenever a user attaches an image to an input, this function:
   * 1. Validates the new image size is the minimum size.
   * 2. Uploads the image to s3 for storage. We need to refer to this full-size,
   *    original version to make cropped assets in the future.
   * 3. Processes the image in-browser to resize it for our needs. This ensures a gigantic
   *    original image doesn't end up in the ad.
   * 4. Uploads the processed image to s3 for storage, and for use by ads.
   * 5. Emits the change to the consumer of the hook.
   *
   * @param {SyntheticEvent} event onChange event from a file input
   */
  async function handleNewImage(event) {
    const file = event.target.files[0];
    setError(null);

    const imageSize = await getImageSize(file);
    
    if (!validateImageSize(imageSize)) {
      return;
    }
    
    const fileType = file.type;
    
    if (!validateImageMimeType(fileType)) {
      setError('File format not supported!');
      return;
    }

    return processNewImage({ file, imageSize, fileType });
  }
  
  return { 
    handleNewImage
  };
}