import { useContext, useEffect, useState, useRef } from 'react';
import { BarrierContext } from '../context/BarrierContext';
import Rectangle from './annotations/Rectangle';
import Text from './annotations/Text';
import { useClickAway } from '@uidotdev/usehooks';
import Circle from './annotations/Circle';
import Line from './annotations/Line';
import Arrow from './annotations/Arrow';

export default function AnnotationItem({ item }) {
  console.log('item :', item);
  const { setCurrentAnno, currentAnno } = useContext(BarrierContext);

  const renderAnno = (type) => {
    console.log('type :', type);
    switch (type) {
      case 'text':
        return <Text item={item} />;
        break;
      case 'rectangle':
        return <Rectangle item={item} />;
        break;
      case 'ellipse':
        return <Circle item={item} />;
      case 'line':
        return <Line item={item} />;
      case 'arrow':
        return <Arrow item={item} />;
      default:
        return null;
    }
  };

  // const handleDeleteAnno = () => {
  //   let updated = currentData?.annotations.filter(
  //     (anno) => anno.id !== selectedAnno?.id
  //   );
  //   setCurrentData((prev) => ({
  //     ...prev,
  //     ...currentData,
  //     annotations: updated,
  //   }));
  // };

  // useEffect(() => {
  //   const onKeyDown = ({ key }) => {
  //     if (key === 'Backspace') {
  //       handleDeleteAnno();
  //       setSelectedAnno(null);
  //     }
  //   };

  //   document.addEventListener('keydown', onKeyDown);

  //   return () => {
  //     document.removeEventListener('keydown', onKeyDown);
  //   };
  // }, [selectedAnno]);

  // useEffect(() => {
  //   let handler = (e) => {
  //     if (targetRef.current && !targetRef.current.contains(e.target)) {
  //       setSelectedAnno(null);
  //     }
  //   };

  //   document.addEventListener('mousedown', handler);

  //   return () => {
  //     document.removeEventListener('mousedown', handler);
  //   };
  // });

  // ref={targetRef}

  return (
    <div
      onClick={(e) => {
        e.stopPropagation(); // this will stop the click event occuring in <Diagram> onclick,
        //and this will only trigger the diagram's onClick when the click is not on any annotation,
        // so we can take care of that as an outside click of any annotations
        if (currentAnno?.id === item.id) {
          return;
        }
        setCurrentAnno(item);
      }}
    >
      {renderAnno(item.type)}
    </div>
  );
}
