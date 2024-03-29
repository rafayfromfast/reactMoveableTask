import { useContext, useRef, useEffect } from 'react';
import { BarrierContext } from '../../context/BarrierContext';
import Moveable from 'react-moveable';
import { useClickAway } from '@uidotdev/usehooks';
import {
  handleDragEnd,
  handleResizeEnd,
  handleRotateEnd,
  valsToTransformString,
} from './utils';

export default function Rectangle({ item }) {
  const { currentAnno, setCurrentAnno } = useContext(BarrierContext);
  const targetRef = useRef(null);
  const moveableRef = useRef(null);
  console.log('item :', item);

  console.log('current anno', currentAnno);

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
              backgroundColor: item?.background?.color,
              borderWidth: `${item?.border?.width}px`,
              borderColor: `${item?.border?.color}`,
              borderTopLeftRadius: `${
                item?.border?.radius > 0
                  ? `${item?.border?.radius}px`
                  : `${item?.border?.topLeftRadius}px`
              }`,
              borderTopRightRadius: `${
                item?.border?.radius > 0
                  ? `${item?.border?.radius}px`
                  : `${item?.border?.topRightRadius}px`
              }`,
              borderBottomRightRadius: `${
                item?.border?.radius > 0
                  ? `${item?.border?.radius}px`
                  : `${item?.border?.bottomRightRadius}px`
              }`,
              borderBottomLeftRadius: `${
                item?.border?.radius > 0
                  ? `${item?.border?.radius}px`
                  : `${item?.border?.bottomLeftRadius}px`
              }`,
              overflow: 'hidden',
            }}
            ref={targetRef}
          >
            {currentAnno?.pattern === 'crossedLines' && (
              <svg
                width={item.size.width}
                height={item.size.height}
                xmlns='http://www.w3.org/2000/svg'
              >
                <defs>
                  <pattern
                    id={`${item.id}-diagonalHatch`}
                    width={item.patternSpacing}
                    height={item.patternSpacing}
                    patternTransform={`rotate(${item?.patternAngle || 0} 0 0)`}
                    patternUnits='userSpaceOnUse'
                  >
                    <line
                      x1='0'
                      y1='0'
                      x2='0'
                      y2={item.patternSpacing}
                      stroke={item?.patternColor || 'black'}
                      strokeWidth='1'
                    />
                  </pattern>
                </defs>
                <rect
                  width={item.size.width}
                  height={item.size.height}
                  fill={`url(#${`${item.id}-diagonalHatch`})`}
                />
              </svg>
            )}
          </div>
          <Moveable
            transform={valsToTransformString(item)}
            ref={moveableRef}
            target={targetRef}
            draggable={true}
            resizable={true}
            rotatable={true}
            onRender={(e) => {
              console.log('e.cssText :', e.cssText);
              e.target.style.cssText += e.cssText;
            }}
            onDragEnd={(e) => {
              const position = handleDragEnd(e);
              position && setCurrentAnno({ ...currentAnno, position });
            }}
            onResizeEnd={(e) => {
              const size = handleResizeEnd(e);
              console.log('size :', size);
              setCurrentAnno({ ...currentAnno, size });
            }}
            onRotateEnd={(e) => {
              const rotation = handleRotateEnd(e);
              setCurrentAnno({ ...currentAnno, rotation });
            }}
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
            throttleResize={1}
            renderDirections={['nw', 'n', 'ne', 'w', 'e', 'sw', 's', 'se']}
            throttleRotate={0}
            rotationPosition={'top'}
            snapRotationDegrees={[0, 45, 90, 135, 180, 225, 270, 315]}
          />
        </>
      ) : (
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            transform: valsToTransformString(item),
            width: item?.size?.width,
            height: item?.size?.height,
            // transform: `rotate(${item?.rotation}deg)`,
            backgroundColor: item?.background?.color,
            borderWidth: `${item?.border?.width}px`,
            borderColor: `${item?.border?.color}`,
            borderTopLeftRadius: `${
              item?.border?.radius > 0
                ? `${item?.border?.radius}px`
                : `${item?.border?.topLeftRadius}px`
            }`,
            borderTopRightRadius: `${
              item?.border?.radius > 0
                ? `${item?.border?.radius}px`
                : `${item?.border?.topRightRadius}px`
            }`,
            borderBottomRightRadius: `${
              item?.border?.radius > 0
                ? `${item?.border?.radius}px`
                : `${item?.border?.bottomRightRadius}px`
            }`,
            borderBottomLeftRadius: `${
              item?.border?.radius > 0
                ? `${item?.border?.radius}px`
                : `${item?.border?.bottomLeftRadius}px`
            }`,
            overflow: 'hidden',
          }}
        >
          {item?.pattern === 'crossedLines' && (
            <svg
              width={item.size.width}
              height={item.size.height}
              xmlns='http://www.w3.org/2000/svg'
            >
              <defs>
                <pattern
                  id={`${item.id}-diagonalHatch`}
                  width={item.patternSpacing}
                  height={item.patternSpacing}
                  patternTransform={`rotate(${item?.patternAngle || 0} 0 0)`}
                  patternUnits='userSpaceOnUse'
                >
                  <line
                    x1='0'
                    y1='0'
                    x2='0'
                    y2={item.patternSpacing}
                    stroke={item?.patternColor || 'black'}
                    strokeWidth='1'
                  />
                </pattern>
              </defs>
              <rect
                width={item.size.width}
                height={item.size.height}
                fill={`url(#${`${item.id}-diagonalHatch`})`}
              />
            </svg>
          )}
        </div>
      )}
    </>
  );
}
