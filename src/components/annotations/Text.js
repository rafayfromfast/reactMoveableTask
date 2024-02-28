import { useContext, useEffect, useRef } from 'react';
import { BarrierContext } from '../../context/BarrierContext';
import TextareaAutosize from 'react-textarea-autosize';
import Moveable from 'react-moveable';
import {
  handleDragEnd,
  handleResizeEnd,
  handleRotateEnd,
  valsToTransformString,
} from './utils';

export default function Text({ item }) {
  const { currentAnno, setCurrentAnno } = useContext(BarrierContext);
  console.log('currentAnno :', currentAnno);

  const targetRef = useRef(null);
  const moveableRef = useRef(null);
  console.log('item :', item);

  const textareaRef = useRef(null); // Create a ref for the textarea

  useEffect(() => {
    // Focus the textarea when the component mounts
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []); // Run this effect only once, when the component mounts

  return (
    <>
      {item.id === currentAnno?.id ? (
        <>
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: item?.size?.width,
              height: item?.size?.height,
              transform: valsToTransformString(item),
              fontSize: item?.fontSize,
              fontWeight: item?.fontWeight,
              fontFamily: item?.fontFamily,
            }}
            ref={targetRef}
          >
            {/* <textarea
              className="h-full w-full"
              onClick={(e) => {
                e.stopPropagation();
              }}
            /> */}
            <TextareaAutosize
              ref={textareaRef} // Assign the ref to the textarea
              placeholder='Text'
              autoFocus={true}
              onClick={() => {
                textareaRef.current.focus();
              }}
              value={currentAnno.content}
              // autoFocus={true}
              className='resize-none overflow-y-auto scrollbar-hide min-h-[100%] w-[100%] max-h-[100%]'
              onChange={(e) => {
                setCurrentAnno({ ...currentAnno, content: e.target.value });
              }}
              style={{
                background: item.background.color || 'transparent',
                color: item.border.color || 'black',
              }}
            />
          </div>
          <Moveable
            transformOrigin={valsToTransformString(item)}
            transform={valsToTransformString(item)}
            className='bg-[#ddd]'
            ref={moveableRef}
            target={targetRef}
            draggable={true}
            throttleDrag={1}
            edgeDraggable={false}
            startDragRotate={0}
            throttleDragRotate={0}
            snappable={true}
            snapContainer={'.snapContainer'}
            snapDirections={{
              top: true,
              left: true,
              bottom: true,
              right: true,
              center: true,
              middle: true,
            }}
            elementSnapDirections={{
              top: true,
              left: true,
              bottom: true,
              right: true,
              center: true,
              middle: true,
            }}
            elementGuidelines={[
              {
                element: '.snapContainer',
                className: 'red',
              },
            ]}
            bounds={{ left: 0, top: 0, right: 0, bottom: 0, position: 'css' }}
            resizable={true}
            throttleResize={1}
            renderDirections={['nw', 'n', 'ne', 'w', 'e', 'sw', 's', 'se']}
            rotatable={true}
            throttleRotate={0}
            rotationPosition={'top'}
            snapRotationDegrees={[0, 45, 90, 135, 180, 225, 270, 315]}
            onRender={(e) => {
              console.log('e.cssText :', e.cssText);
              e.target.style.cssText += e.cssText;
            }}
            onDragEnd={(e) => {
              const data = handleDragEnd(e);
              console.log('data :', data);
              data && setCurrentAnno({ ...currentAnno, position: data });
            }}
            onResizeEnd={(e) => {
              const size = handleResizeEnd(e);
              setCurrentAnno({ ...currentAnno, size });
            }}
            onRotateEnd={(e) => {
              const rotation = handleRotateEnd(e);
              setCurrentAnno({ ...currentAnno, rotation });
            }}
          />
        </>
      ) : (
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: item?.size?.width,
            height: item?.size?.height,
            transform: valsToTransformString(item),
            fontSize: item?.fontSize,
            fontWeight: item?.fontWeight,
            fontFamily: item?.fontFamily,
            overflow: 'hidden',
          }}
        >
          <TextareaAutosize
            className='resize-none overflow-y-auto scrollbar-hide text-wrap'
            placeholder='Text'
            value={item?.content}
            style={{
              background: item.background?.color || 'transparent',
              color: item.border?.color || 'black',
            }}
          />
        </div>
      )}
    </>
  );
}
