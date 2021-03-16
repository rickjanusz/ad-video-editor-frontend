import React from "react";
import NProgress from "nprogress";

const DragAndDrop = (props) => {
  const { data, dispatch, setVideo } = props;

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch({ type: "SET_DROP_DEPTH", dropDepth: data.dropDepth + 1 });
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch({ type: "SET_DROP_DEPTH", dropDepth: data.dropDepth - 1 });
    if (data.dropDepth > 0) return;
    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: false });
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();

    e.dataTransfer.dropEffect = "copy";
    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: true });
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    let files = [...e.dataTransfer.files];
    const reader = new FileReader();

    reader.addEventListener("loadstart", (event) => {
      NProgress.start();
    });
    reader.addEventListener("loadend", (event) => {
      // console.log("FILEEEEEEEEREEEEEEADER: ", event);
      NProgress.done();
    });

    // reader.addEventListener("progress", (event) => {
    //   // console.log("FILEEEEEEEEREEEEEEADER: ", event);
    //   // NProgress.set(event.);
    // });

    reader.addEventListener("load", (event) => {
      const result = event.target.result;
      setVideo(result);

      // TODO: MOV throws filesize error...
      // TODO: need to implement a DB
      // localStorage.clear();
      // localStorage.setItem("video", result);
    });
    console.log(files);

    reader.readAsDataURL(files[0]);

    if (files && files.length > 0) {
      const existingFiles = data.fileList.map((f) => f.name);
      files = files.filter((f) => !existingFiles.includes(f.name));

      dispatch({ type: "ADD_FILE_TO_LIST", files });
      e.dataTransfer.clearData();
      dispatch({ type: "SET_DROP_DEPTH", dropDepth: 0 });
      dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: false });
    }
  };
  return (
    <div
      className={
        data.inDropZone ? "drag-drop-zone inside-drag-area" : "drag-drop-zone"
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
