import React from 'react';
import NProgress from 'nprogress';
import PropTypes from 'prop-types';

const DragAndDrop = (props) => {
  const {
    data,
    dispatch,
    setVideo,
    convertVideoToMP4,
    setFilename,
    setJson,
  } = props;
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
    reader.addEventListener('progress', (evt) => {
      if (evt.lengthComputable) {
        const percentage = Math.round((evt.loaded * 100) / evt.total);

        NProgress.set(percentage);
      }
    });
    reader.addEventListener('loadend', () => {
      NProgress.done();
    });

    function renameFile(file) {
      const fn = file.name.split('.');
      const name = fn[0];
      setFilename(name);
      localStorage.setItem('filename', name);
    }
    function checkFileSize(file) {
      let filesize;
      let sizeWt;
      if (file.size < 1000000) {
        filesize = file.size / 1000;
        sizeWt = `${filesize.toFixed(0)}kb`;
      } else {
        filesize = file.size / 1000000;
        sizeWt = `${filesize.toFixed(1)}mb`;
      }
      return sizeWt;
    }
    function checkFileName(file) {
      return file.name;
    }

    function returnExtension(file) {
      const fn = checkFileName(file);
      const ext = fn.split('.');
      return ext[1];
    }

    if (files[0].size > 5000000) {
      // console.log('CHECHECHECHECHECKIIIIIINGGGG:');
      return;
    }

    const fileType = returnExtension(files[0]);
    reader.addEventListener('load', (event) => {
      const { result } = event.target;
      // NEW ::::::::::::::::::::::::::::::::::::::::::::::::::::
      // NEW ::::::::::::::::::::::::::::::::::::::::::::::::::::

      if (fileType === 'json') {
        const res = JSON.parse(result);
        setJson(res);
        // console.log(res);
      } else {
        setVideo(result);
        localStorage.setItem('video', result);
      }
      // NEW ::::::::::::::::::::::::::::::::::::::::::::::::::::
      // NEW ::::::::::::::::::::::::::::::::::::::::::::::::::::
      // console.log(result);
      // TODO ::::::::::::::::::::::::::::::::::::::::::::::::::::
      // TODO ::::::::::::::::::::::::::::::::::::::::::::::::::::
      // TODO UNCOMMENT THIS AFTER TESTING NEW FUNC
      // setVideo(result);
      // localStorage.setItem('video', result);
      // TODO ::::::::::::::::::::::::::::::::::::::::::::::::::::
      // TODO ::::::::::::::::::::::::::::::::::::::::::::::::::::
      // TODO: MOV throws filesize error...
      // TODO: need to implement a DB
    });

    // TODO ::::::::::::::::::::::::::::::::::::::::::::::::::::
    // TODO ::::::::::::::::::::::::::::::::::::::::::::::::::::
    // TODO UNCOMMENT THIS - AFTER TESTING NEW FUNC
    // TODO ::::::::::::::::::::::::::::::::::::::::::::::::::::
    // TODO ::::::::::::::::::::::::::::::::::::::::::::::::::::
    // reader.readAsDataURL(files[0]);
    // renameFile(files[0]);
    // TODO ::::::::::::::::::::::::::::::::::::::::::::::::::::
    // TODO ::::::::::::::::::::::::::::::::::::::::::::::::::::
    // TODO UNCOMMENT THIS - AFTER TESTING NEW FUNC
    // TODO ::::::::::::::::::::::::::::::::::::::::::::::::::::
    // TODO ::::::::::::::::::::::::::::::::::::::::::::::::::::

    // ::::::::::::::::::::::::::::::::::::::::::::::::::: //
    // :::::::::::::::::::: BEGIN Custom Helper Functions  //
    // ::::::::::::::::::::::::::::::::::::::::::::::::::: //

    console.log('FILETPYE: ', fileType);

    if (fileType === 'mp4') {
      // console.log('ITS NOT MP4', files[0]);
      reader.readAsDataURL(files[0]);
      renameFile(files[0]);
      // NEW ::::::::::::::::::::::::::::::::::::::::::::::::::::
      // NEW ::::::::::::::::::::::::::::::::::::::::::::::::::::
    } else if (fileType === 'json') {
      // console.log('ITS JSON FILETPYE: ', fileType);
      reader.readAsText(files[0]);
    } else {
      //   // TODO MAY WANT TO MAKE A SWITCH/CASE
      reader.readAsDataURL(files[0]);
      renameFile(files[0]);
      convertVideoToMP4(files[0]);
    }

    // NEW ::::::::::::::::::::::::::::::::::::::::::::::::::::
    // NEW ::::::::::::::::::::::::::::::::::::::::::::::::::::
    // TODO ::::::::::::::::::::::::::::::::::::::::::::::::::::
    // TODO ::::::::::::::::::::::::::::::::::::::::::::::::::::
    // TODO UNCOMMENT THIS - AFTER TESTING NEW FUNC
    // TODO ::::::::::::::::::::::::::::::::::::::::::::::::::::
    // TODO ::::::::::::::::::::::::::::::::::::::::::::::::::::
    // convertVideoToMP4(files[0]);
    // TODO ::::::::::::::::::::::::::::::::::::::::::::::::::::
    // TODO ::::::::::::::::::::::::::::::::::::::::::::::::::::
    // TODO UNCOMMENT THIS - AFTER TESTING NEW FUNC
    // TODO ::::::::::::::::::::::::::::::::::::::::::::::::::::
    // TODO ::::::::::::::::::::::::::::::::::::::::::::::::::::

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
      <p>Drag and Drop video here to get started!</p>
    </div>
  );
};
export default DragAndDrop;

DragAndDrop.propTypes = {
  setVideo: PropTypes.any,
  data: PropTypes.any,
  dispatch: PropTypes.any,
  convertVideoToMP4: PropTypes.any,
  setFilename: PropTypes.any,
  setJson: PropTypes.any,
};
