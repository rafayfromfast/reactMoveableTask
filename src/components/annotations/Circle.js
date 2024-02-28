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
import { transform } from 'lodash';

export default function Circle({ item }) {
  console.log('item :', item);
  const { currentAnno, setCurrentAnno } = useContext(BarrierContext);
  console.log('currentAnno :', currentAnno);
  const targetRef = useRef(null);
  const moveableRef = useRef(null);
  console.log('valsToTransformString circle :', valsToTransformString(item));

  if (targetRef.current) {
    console.log('targetRef.current.style :', targetRef.current.style);
    if (targetRef.current.style) {
      targetRef.current.transform = valsToTransformString(item);
    }
  }

  return (
    <>
      {item.id === currentAnno?.id ? (
        <>
          <div
            // className={`${valsToTransformString(currentAnno)}`}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: item?.size?.width,
              height: item?.size?.height,
              // transformOrigin: valsToTransformString(item),
              // transform: `translate(0px,0px)`,
              transform: valsToTransformString(currentAnno),
              // transformStyle: valsToTransformString(item),
              backgroundColor: item?.background?.color,
              borderWidth: `${item?.border?.width}px`,
              borderColor: `${item?.border?.color}`,
              borderTopLeftRadius: `${
                item?.border?.radius
                  ? `${item?.border?.radius}`
                  : `${item?.border?.topLeftRadius}px`
              }`,
              borderTopRightRadius: `${
                item?.border?.radius
                  ? `${item?.border?.radius}`
                  : `${item?.border?.topRightRadius}px`
              }`,
              borderBottomRightRadius: `${
                item?.border?.radius
                  ? `${item?.border?.radius}`
                  : `${item?.border?.bottomRightRadius}px`
              }`,
              borderBottomLeftRadius: `${
                item?.border?.radius
                  ? `${item?.border?.radius}`
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
            // transformOrigin={valsToTransformString(item)}
            transform={valsToTransformString(currentAnno)}
            ref={moveableRef}
            target={targetRef}
            draggable={true}
            roundable={true}
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
            rotatable={true}
            throttleResize={1}
            renderDirections={['nw', 'n', 'ne', 'w', 'e', 'sw', 's', 'se']}
            throttleRotate={0}
            rotationPosition={'top'}
            snapRotationDegrees={[0, 45, 90, 135, 180, 225, 270, 315]}
            // onDrag={(e) => {
            //   e.target.style.transform = e.transform;
            // }}
            // onResize={(e) => {
            //   e.target.style.width = `${e.width}px`;
            //   e.target.style.height = `${e.height}px`;
            //   e.target.style.transform = e.drag.transform;
            // }}
            // onRotate={(e) => {
            //   e.target.style.transform = e.drag.transform;
            // }}
            onRender={(e) => {
              console.log('e.cssText :', e.cssText);
              e.target.style.cssText += e.cssText;
            }}
            // onRound={(e) => {
            //   console.log('ROUND', e.borderRadius);
            //   e.target.style.borderRadius = e.borderRadius;
            // }}
            onRoundEnd={(e) => {
              setCurrentAnno({
                ...currentAnno,
                border: {
                  ...currentAnno?.border,
                  radius: e.target.style.borderRadius,
                },
              });
              console.log('e.borderRadius :', e.target.style.borderRadius);
            }}
            onDragEnd={(e) => {
              const position = handleDragEnd(e);
              console.log('position :', position);
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
          />
        </>
      ) : (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            // top: item.position.y,
            // left: item.position.x,
            width: item?.size?.width,
            height: item?.size?.height,
            transform: `${valsToTransformString(item)}`,
            backgroundColor: item?.background?.color,
            borderWidth: `${item?.border?.width}px`,
            borderColor: `${item?.border?.color}`,
            borderTopLeftRadius: `${
              item?.border?.radius
                ? `${item?.border?.radius}`
                : `${item?.border?.topLeftRadius}px`
            }`,
            borderTopRightRadius: `${
              item?.border?.radius
                ? `${item?.border?.radius}`
                : `${item?.border?.topRightRadius}px`
            }`,
            borderBottomRightRadius: `${
              item?.border?.radius
                ? `${item?.border?.radius}`
                : `${item?.border?.bottomRightRadius}px`
            }`,
            borderBottomLeftRadius: `${
              item?.border?.radius
                ? `${item?.border?.radius}`
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
