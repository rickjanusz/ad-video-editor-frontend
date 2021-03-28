import React from 'react';
import NProgress from 'nprogress';
import PropTypes from 'prop-types';

const DragAndDrop = (props) => {
  const { data, dispatch, setVideo, convertVideoToMp4, setFilename } = props;
  // console.log(props);
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

    reader.addEventListener('loadstart', () => {
      NProgress.start();
    });
    reader.addEventListener('loadend', () => {
      NProgress.done();
    });

    function renameFile(file) {
      const fn = file.name.split('.');
      const name = fn[0];
      // console.log({ outName });
      setFilename(name);
      localStorage.setItem('filename', name);
    }

    reader.addEventListener('load', (event) => {
      const { result } = event.target;
      // console.log('event');
      setVideo(result);
      // TODO: MOV throws filesize error...
      // TODO: need to implement a DB
      localStorage.setItem('video', result);
    });

    reader.readAsDataURL(files[0]);
    renameFile(files[0]);

    // ::::::::::::::::::::::::::::::::::::::::::::::::::: //
    // :::::::::::::::::::: BEGIN Custom Helper Functions  //
    // ::::::::::::::::::::::::::::::::::::::::::::::::::: //

    // function checkFileSize(file) {
    //   let filesize;
    //   let sizeWt;
    //   if (file.size < 1000000) {
    //     filesize = file.size / 1000;
    //     sizeWt = `${filesize.toFixed(0)}kb`;
    //   } else {
    //     filesize = file.size / 1000000;
    //     sizeWt = `${filesize.toFixed(1)}mb`;
    //   }
    //   return sizeWt;
    // }

    function checkFileName(file) {
      return file.name;
    }

    function returnExtension(file) {
      const fn = checkFileName(file);
      const ext = fn.split('.');
      return ext[1];
    }

    if (returnExtension(files[0]) !== 'mp4') {
      // console.log()
      // console.log('NAME:', checkFileName(files[0]));
      convertVideoToMp4(files[0]);
    }

    // console.log('FILESIZE:', checkFileSize(files[0]));

    // ::::::::::::::::::::::::::::::::::::::::::::::::: //
    // :::::::::::::::::::: END Custom Helper Functions  //
    // ::::::::::::::::::::::::::::::::::::::::::::::::: //

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
  convertVideoToMp4: PropTypes.any,
  setFilename: PropTypes.any,
};
