export const transformArrToVals = (translateArr, rotation) => {
  const [x, y, scale] = translateArr;

  return {
    position: {
      x,
      y,
    },
    rotation,
    scale,
  };
};

export const valsToTransformString = ({ position, rotation }) => {
  return `translate(${position.x}px, ${position.y}px) rotate(${
    rotation || 0
  }deg)`;
};

export const handleDragEnd = (e) => {
  console.log('e :', e);

  try {
    const {
      lastEvent: { translate },
    } = e;
    const [x, y] = translate;

    return { x, y };
  } catch (err) {
    return false;
  }

  // console.log('translate :', translate);
  // // Calculate the final x and y coordinates relative to the target element
  // const x = e.moveable.state.left;
  // const y = e.moveable.state.top;
  // // Update the state with the final coordinates
  // return { x: x + 'px', y: y + 'px' };
};

export const handleResizeEnd = (e) => {
  console.log('e :', e);
  const { width, height } = e.moveable.state;
  console.log('height :', height);
  console.log('width :', width);
  // Extract the width and height from the event object
  //   const { width, height } = e.rect;
  // Update the state with the final width and height
  //   return { width: width + 'px', height: height + 'px' };
  return { width, height };
};

export const handleRotateEnd = (e) => {
  console.log('e :', e);
  // Extract the rotation angle from the event object
  // const rotation = e.beforeRotate;

  // Update the state with the final rotation angle
  // return rotation + 'deg';
  return e.lastEvent.rotation;
};
