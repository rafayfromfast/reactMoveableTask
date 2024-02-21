import { useContext } from 'react';
import { BarrierContext } from '../context/BarrierContext';
import DiagramItem from './DiagramItem';

export default function DiagramList() {
  const { templates } = useContext(BarrierContext);

  return (
    <>
      {templates?.map((template) => (
        <DiagramItem template={template} key={template?.id} />
      ))}
    </>
  );
}
