import { nanoid } from 'nanoid';

export const getTextArea = (x = 0, y = 0) => {
  return {
    id: nanoid(),
    type: 'text',
    position: {
      x: x,
      y: y,
    },
    rotation: 0,
    background: {
      color: 'transparent',
    },
    border: {
      color: 'black',
    },
    fontSize: 14,
    fontFamily: 'arial',
    fontWeight: 'normal',
    content: '',
  };
};

export const getEllipse = (x = 0, y = 0) => {
  return {
    id: nanoid(),
    type: 'ellipse',
    position: {
      x,
      y,
    },
    rotation: 0,
    size: {
      width: '60px',
      height: '60px',
    },
    background: {
      color: 'red',
    },
    border: {
      color: 'black',
      width: '1',
      radius: '30px',
    },
    isLocked: true,
    constrainProportions: true,
  };
};

export const getRectangle = (x = 0, y = 0) => {
  return {
    id: nanoid(),
    type: 'rectangle',
    position: {
      x,
      y,
    },
    rotation: 0,
    size: {
      width: '60px',
      height: '60px',
    },
    background: {
      color: 'none',
    },
    border: {
      color: 'black',
      width: '1',
      // radius: '10% 30% 50% 70%',
    },
    isLocked: true,
    constrainProportions: true,
  };
};

export const getLine = (x = 0, y = 80) => {
  return {
    id: nanoid(),
    type: 'line',
    position: {
      x,
      y,
    },
    rotation: 0,
    size: {
      width: 60,
      height: 10,
    },
    background: {
      color: 'black',
    },
    border: {
      color: 'black',
      width: '1',
      // radius: '10% 30% 50% 70%',
    },
    pattern: 'solid',
    isLocked: true,
    constrainProportions: true,
    lineWidth: 1,
  };
};

export const getArrow = (x = 0, y = 80) => {
  return {
    id: nanoid(),
    type: 'arrow',
    position: {
      x,
      y,
    },
    rotation: 0,
    size: {
      width: 60,
      height: 10,
    },
    background: {
      color: 'black',
    },
    border: {
      color: 'black',
      width: '1',
      // radius: '10% 30% 50% 70%',
    },
    pattern: 'solid',
    isLocked: true,
    constrainProportions: true,
    lineWidth: 1,
    leftArrowStyle: 'line',
    rightArrowStyle: 'rightArrowFilled',
  };
};

const getters = {
  text: getTextArea,
  ellipse: getEllipse,
  rectangle: getRectangle,
  line: getLine,
  arrow: getArrow,
};

export const getRelevantAnnotation = (type, x, y) => {
  console.log('type :', type);
  console.log('getters :', getters);
  console.log(' getters[type] :', getters[type]);
  return getters[type](x, y);
};
