const annotations = [
  {
    id: nanoid(),
    type: 'rectangle',
    position: {
      x: '300px',
      y: '100px',
    },
    rotation: '90deg',
    size: {
      width: '60px',
      height: '60px',
    },
    background: {
      color: 'none',
    },
    border: {
      color: 'black',
      width: '1px',
      radius: '10% 30% 50% 70%',
    },
    isLocked: true,
    constrainProportions: true,
  },
];
