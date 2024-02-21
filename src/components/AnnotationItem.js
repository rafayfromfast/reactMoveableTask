import { useContext, useEffect, useState, useRef } from 'react';
import { BarrierContext } from '../context/BarrierContext';
import Rectangle from './annotations/Rectangle';
import Text from './annotations/Text';
import { useClickAway } from '@uidotdev/usehooks';

export default function AnnotationItem({ item }) {
  const { setCurrentAnno } = useContext(BarrierContext);

  // const targetRef = useClickAway(() => {
  //   setCurrentAnno(null);
  // });

  const renderAnno = (type) => {
    switch (type) {
      case 'text':
        return <Text item={item} />;
        break;
      case 'rectangle':
        return <Rectangle item={item} />;
        break;
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
    <div onClick={() => setCurrentAnno(item)}>{renderAnno(item.type)}</div>
  );
}
