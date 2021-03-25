import React from 'react';
import NProgress from 'nprogress';
import PropTypes from 'prop-types';

const DragAndDrop = (props) => {
  const { data, dispatch, setVideo } = props;

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch({ type: 'SET_DROP_DEPTH', dropDepth: data.dropDepth + 1 });
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch({ type: 'SET_DROP_DEPTH', dropDepth: data.dropDepth - 1 });
    if (data.dropDepth > 0) return;
    dispatch({ type: 'SET_IN_DROP_ZONE', inDropZone: false });
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();

    e.dataTransfer.dropEffect = 'copy';
    dispatch({ type: 'SET_IN_DROP_ZONE', inDropZone: true });
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    let files = [...e.dataTransfer.files];
    const reader = new FileReader();

    reader.addEventListener('loadstart', (event) => {
      // console.log(event);
      NProgress.start();
    });
    reader.addEventListener('loadend', (event) => {
      NProgress.done();
      // console.log(event);
      // const trimResult = result.replace('data:video/mp4;base64,', '');

      // console.log(trimResult);
      // const blob = new Blob(trimResult, { type: 'video/mp4' });
    });

    reader.addEventListener('load', (event) => {
      const { result } = event.target;
      // console.log('event');
      setVideo(result);
      // TODO: MOV throws filesize error...
      // TODO: need to implement a DB
      localStorage.setItem('video', result);
    });

    reader.readAsDataURL(files[0]);

    if (files && files.length > 0) {
      const existingFiles = data.fileList.map((f) => f.name);
      files = files.filter((f) => !existingFiles.includes(f.name));

      dispatch({ type: 'ADD_FILE_TO_LIST', files });
      e.dataTransfer.clearData();
      dispatch({ type: 'SET_DROP_DEPTH', dropDepth: 0 });
      dispatch({ type: 'SET_IN_DROP_ZONE', inDropZone: false });
    }
  };
  return (
    <div
      className={
        data.inDropZone ? 'drag-drop-zone inside-drag-area' : 'drag-drop-zone'
      }
      onDrop={(e) => handleDrop(e)}
      onDragOver={(e) => handleDragOver(e)}
      onDragEnter={(e) => handleDragEnter(e)}
      onDragLeave={(e) => handleDragLeave(e)}
      id="uploader"
    >
      <p>Drag files here to upload</p>
    </div>
  );
};
export default DragAndDrop;

DragAndDrop.propTypes = {
  setVideo: PropTypes.any,
  data: PropTypes.any,
  dispatch: PropTypes.any,
};
