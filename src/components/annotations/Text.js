import { useContext, useEffect, useRef } from 'react';
import { BarrierContext } from '../../context/BarrierContext';
import TextareaAutosize from 'react-textarea-autosize';
import Moveable from 'react-moveable';

export default function Text({ item }) {
  const { currentAnno, setCurrentAnno } = useContext(BarrierContext);

  const targetRef = useRef(null);
  const moveableRef = useRef(null);

  return (
    <>
      {item.id === currentAnno?.id ? (
        <>
          <div
            style={{
              position: 'absolute',
              left: item?.position?.x,
              top: item?.position?.y,
              width: item?.size?.width,
              height: item?.size?.height,
              transform: `rotate(${item?.rotation}deg)`,
              fontSize: item?.fontSize,
              fontWeight: item?.fontWeight,
              fontFamily: item?.fontFamily,
            }}
            ref={targetRef}
          >
            <TextareaAutosize
              placeholder='Text'
              className='resize-none overflow-y-auto scrollbar-hide'
            />
          </div>
          <Moveable
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
            onDrag={(e) => {
              e.target.style.transform = e.transform;
            }}
            onResize={(e) => {
              e.target.style.width = `${e.width}px`;
              e.target.style.height = `${e.height}px`;
              e.target.style.transform = e.drag.transform;
            }}
            onRotate={(e) => {
              e.target.style.transform = e.drag.transform;
            }}
          />
        </>
      ) : (
        <div
          style={{
            position: 'absolute',
            left: item?.position?.x,
            top: item?.position?.y,
            width: item?.size?.width,
            height: item?.size?.height,
            transform: `rotate(${item?.rotation}deg)`,
            fontSize: item?.fontSize,
            fontWeight: item?.fontWeight,
            fontFamily: item?.fontFamily,
          }}
        >
          <TextareaAutosize
            className='resize-none overflow-y-auto scrollbar-hide text-wrap'
            placeholder='Text'
            value={currentAnno?.content}
          />
        </div>
      )}
    </>
  );
}
