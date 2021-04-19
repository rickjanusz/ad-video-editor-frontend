const getPosition = (props, ref) => {
  const { shrink, scale } = props;
  const { vidRef, dragParent, dragRef } = ref;

  function makeEven(num) {
    if (num % 2 !== 0) {
      return Math.floor(num + 1);
    }
    return Math.floor(num);
  }

  let shrinkVal = 1;
  if (shrink) {
    shrinkVal = 0.4;
  } else {
    shrinkVal = 1;
  }

  const childDims = dragRef.current.getBoundingClientRect();
  const parentPos = dragParent.current.getBoundingClientRect();
  const vidPos = vidRef.current.getBoundingClientRect();
  const childOffset = {
    top: parseInt((childDims.top - parentPos.top) / scale / shrinkVal),
    left: parseInt((childDims.left - parentPos.left) / scale / shrinkVal),
    width: makeEven(parseInt(childDims.width / scale) / shrinkVal),
    height: makeEven(parseInt(childDims.height / scale) / shrinkVal),
    vidWidth: makeEven(parseInt(vidPos.width / scale) / shrinkVal),
    vidHeight: makeEven(parseInt(vidPos.height / scale) / shrinkVal),
  };
  // console.log(childDims);
  return childOffset;
};

export default getPosition;
