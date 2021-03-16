export default function getPosition(obj, objParent) {
  const childDims = obj.getBoundingClientRect();
  const parentPos = objParent.getBoundingClientRect();
  const childOffset = {
    top: childDims.top - parentPos.top,
    left: childDims.left - parentPos.left,
    width: childDims.width,
    height: childDims.height,
  };
  return childOffset;
}
