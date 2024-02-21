import { useContext } from 'react';
import { BarrierContext } from '../context/BarrierContext';
import AnnotationItem from './AnnotationItem';

export default function AnnotationList() {
  const { annotations } = useContext(BarrierContext);

  return (
    <>
      {annotations?.map((item) => {
        return <AnnotationItem item={item} key={item?.id} />;
      })}
    </>
  );
}
