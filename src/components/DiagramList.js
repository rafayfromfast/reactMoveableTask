import { useContext } from 'react';
import { BarrierContext } from '../context/BarrierContext';
import DiagramItem from './DiagramItem';
import { fetchDiagram } from '../api/controllers';

export default function DiagramList() {
  const {
    templates,
    diagrams,
    setCurrentData,
    currentData,
    setShowDiagram,
    setIsCurrent,
  } = useContext(BarrierContext);
  const handleLoadDiagram = async (id) => {
    const diagram = await fetchDiagram(id);
    setCurrentData({ ...currentData, ...diagram });
    setShowDiagram(true);
    setIsCurrent(true);
  };

  return (
    <>
      {diagrams.map((diagram) => (
        <div className='flex w-full justify-between'>
          {diagram.name}
          <button
            className='bg-blue-500 px-2 text-white rounded-md hover:scale-110 transition'
            onClick={() => handleLoadDiagram(diagram.id)}
          >
            Load
          </button>
        </div>
      ))}
      {/* {templates?.map((template) => (
        <DiagramItem template={template} key={template?.id} />
      ))} */}
    </>
  );
}
