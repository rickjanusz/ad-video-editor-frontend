const getPosition = (props, ref) => {
  const { scale } = props;
  const { vidRef, dragParent, dragRef } = ref;

  function makeEven(num) {
    if (num % 2 !== 0) {
      return Math.floor(num + 1);
    }
    return Math.floor(num);
  }

  const childDims = dragRef.current.getBoundingClientRect();
  const parentPos = dragParent.current.getBoundingClientRect();
  const vidPos = vidRef.current.getBoundingClientRect();
  const childOffset = {
    top: parseInt((childDims.top - parentPos.top) / scale),
    left: parseInt((childDims.left - parentPos.left) / scale),
    width: makeEven(parseInt(childDims.width / scale)),
    height: makeEven(parseInt(childDims.height / scale)),
    vidWidth: makeEven(parseInt(vidPos.width / scale)),
    vidHeight: makeEven(parseInt(vidPos.height / scale)),
  };
  // console.log(childDims);
  return childOffset;
};

export default getPosition;
