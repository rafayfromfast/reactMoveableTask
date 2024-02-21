import React, {
  useContext,
  forwardRef,
  useState,
  useEffect,
  useRef,
} from 'react';
import Popup from 'reactjs-popup';
import { Flex, IconButton, Input, Button } from '@chakra-ui/react';
import { SmallCloseIcon } from '@chakra-ui/icons';
import { BarrierContext } from '../context/BarrierContext';
import { nanoid } from 'nanoid';
import { useDrop, useDrag } from 'react-dnd';

import AnnotationList from './AnnotationList';
import { useForm, useFieldArray } from 'react-hook-form';
import _ from 'lodash';
import { useMouse } from '@uidotdev/usehooks';
import Line from './annotations/Line';

const defaultElements = [
  {
    id: nanoid(),
    element: 'crown valve',
    barrier: 'none',
    quantity: 0,
  },
  {
    id: nanoid(),
    element: 'surface safety valve',
    barrier: 'none',
    quantity: 0,
  },
  {
    id: nanoid(),
    element: 'safety valve landing nipple control line',
    barrier: 'none',
    quantity: 0,
  },
  {
    id: nanoid(),
    element: 'wing valve',
    barrier: 'none',
    quantity: 0,
  },
  {
    id: nanoid(),
    element: 'lower master valve',
    barrier: 'none',
    quantity: 0,
  },
  {
    id: nanoid(),
    element: 'kill wing valve',
    barrier: 'none',
    quantity: 0,
  },
  {
    id: nanoid(),
    element: 'conductor casing',
    barrier: 'none',
    quantity: 0,
  },
  {
    id: nanoid(),
    element: 'cement ( conductor casing )',
    barrier: 'none',
    quantity: 0,
  },
  {
    id: nanoid(),
    element: 'surface casing',
    barrier: 'none',
    quantity: 0,
  },
  {
    id: nanoid(),
    element: 'cement ( surface casing )',
    barrier: 'none',
    quantity: 0,
  },
  {
    id: nanoid(),
    element: 'intermediate casing',
    barrier: 'none',
    quantity: 0,
  },
  {
    id: nanoid(),
    element: 'cement ( intermediate casing )',
    barrier: 'none',
    quantity: 0,
  },

  {
    id: nanoid(),
    element: 'production casing',
    barrier: 'none',
    quantity: 0,
  },
  {
    id: nanoid(),
    element: 'cement ( production casing )',
    barrier: 'none',
    quantity: 0,
  },

  {
    id: nanoid(),
    element: 'wellhead annulus valve ( conductor casing )',
    barrier: 'none',
    quantity: 0,
  },
  {
    id: nanoid(),
    element: 'wellhead annulus valve ( surface casing )',
    barrier: 'none',
    quantity: 0,
  },
  {
    id: nanoid(),
    element: 'wellhead annulus valve ( intermediate casing )',
    barrier: 'none',
    quantity: 0,
  },
  {
    id: nanoid(),
    element: 'wellhead annulus valve ( production casing )',
    barrier: 'none',
    quantity: 0,
  },
  {
    id: nanoid(),
    element: 'casing hanger',
    barrier: 'none',
    quantity: 0,
  },
  {
    id: nanoid(),
    element: 'tubing hanger',
    barrier: 'none',
    quantity: 0,
  },
  {
    id: nanoid(),
    element: 'production tubing',
    barrier: 'none',
    quantity: 0,
  },

  {
    id: nanoid(),
    element: 'downhole safety valve',
    barrier: 'none',
    quantity: 0,
  },
  {
    id: nanoid(),
    element: 'downhole safety valve control line',
    barrier: 'none',
    quantity: 0,
  },
  {
    id: nanoid(),
    element: 'safety valve landing nipple',
    barrier: 'none',
    quantity: 0,
  },
  {
    id: nanoid(),
    element: 'gas lift mandrel',
    barrier: 'none',
    quantity: 0,
  },
  {
    id: nanoid(),
    element: 'sliding side door',
    barrier: 'none',
    quantity: 0,
  },
  {
    id: nanoid(),
    element: 'production packer',
    barrier: 'none',
    quantity: 0,
  },

  {
    id: nanoid(),
    element: 'caprock',
    barrier: 'none',
    quantity: 0,
  },
  {
    id: nanoid(),
    element: 'void area',
    barrier: 'none',
    quantity: 0,
  },
  {
    id: nanoid(),
    element: 'tubing plug',
    barrier: 'none',
    quantity: 0,
  },
  {
    id: nanoid(),
    element: 'VR plug',
    barrier: 'none',
    quantity: 0,
  },
  {
    id: nanoid(),
    element: 'BPV / TWCV',
    barrier: 'none',
    quantity: 0,
  },
  {
    id: nanoid(),
    element: 'in-situ formation',
    barrier: 'none',
    quantity: 0,
  },
];

const Diagram = forwardRef((props, printRef) => {
  // const [mouse, containerRef] = useMouse();

  const {
    currentData,
    setCurrentData,
    handleCreateTemplate,
    setShowDiagram,
    isCurrent,
    setIsCurrent,
  } = useContext(BarrierContext);

  // const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });

  // console.log('mouse coords', mouseCoords);

  // const handleMouseMove = (event) => {
  //   setMouseCoords({
  //     x: event.clientX - event.target.offsetLeft,
  //     y: event.clientY - event.target.offsetTop,
  //   });
  // };

  const { register, handleSubmit, control, watch, setValue } = useForm({
    defaultValues: {
      name: isCurrent ? currentData?.name : '',
      elements: isCurrent ? currentData?.elements : defaultElements,
    },
  });

  const popupRef = useRef();
  const closePopup = () => popupRef.current.close();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'elements',
  });

  const setColor = (element) => {
    let current = currentData?.elements?.find(
      (item) => item.element === element
    );

    if (current) {
      if (current.barrier === 'primary') {
        return '#2C5282';
      } else if (current.barrier === 'secondary') {
        return '#C53030';
      } else {
        return 'none';
      }
    }
  };

  const capitalizeFirst = (str) => {
    const words = str.split(' ');

    const capWords = words
      .map((word) => {
        return word[0].toUpperCase() + word.substring(1);
      })
      .join(' ');

    return capWords;
  };

  const elements = watch('elements');

  useEffect(() => {
    if (isCurrent) {
      setValue('name', currentData?.name);
      setValue('elements', currentData?.elements);
    }
  }, [isCurrent, currentData]);

  return (
    <form
      id='diagramForm'
      onSubmit={handleSubmit(handleCreateTemplate)}
      autoComplete='off'
    >
      <Flex w='640px' flexDir='column'>
        <Flex w='640px' justify='space-between' overflowY zIndex={40} mb={3}>
          <Button
            variant='solid'
            colorScheme='blue'
            size='sm'
            type='submit'
            form='diagramForm'
          >
            Save Diagram
          </Button>
          <IconButton
            variant='outline'
            size='xs'
            aria-label='Close diagram'
            icon={<SmallCloseIcon />}
            onClick={() => {
              setCurrentData(null);
              setShowDiagram(false);
              setIsCurrent(false);
            }}
          />
        </Flex>
      </Flex>
      <div ref={printRef} id='diagram'>
        <div
          // ref={drop}
          className='flex flex-col w-full h-[1040px] border overflow-y-auto scrollbar-hide'
        >
          <div className='p-2 border-b'>
            <Input
              placeholder='Diagram Name'
              variant='unstyled'
              textAlign='center'
              className='font-bold'
              {...register('name', {
                required: true,
              })}
            />
          </div>
          <div
            className='grid grid-cols-12 w-full h-full'
            onContextMenu={(e) => {
              e.preventDefault();
            }}
          >
            <div
              // ref={containerRef}
              className={`relative border m-3 p-0 col-span-6 snapContainer  
                cursor-crosshair' : 'cursor-pointer'
              }`}
              // onMouseMove={handleMouseMove}
            >
              <AnnotationList />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
});

export default Diagram;
