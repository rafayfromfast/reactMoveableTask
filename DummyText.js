import { useContext } from 'react';
import { BarrierContext } from '../../context/BarrierContext';

export default function DummyText({ item }) {
  const { currentAnno, setCurrentAnno } = useContext(BarrierContext);
  // console.log(currentAnno);

  return (
    <div
      style={{
        position: 'absolute',
        left: '50px',
        top: '100px',
        fontFamily: `${currentAnno?.fontFamily}`,
        fontSize: currentAnno?.fontSize,
        fontStyle: `${currentAnno?.fontWeight}`,
        fontWeight: `${currentAnno?.fontWeight}`,
        color: `${currentAnno?.background?.color}`,
        transform: `rotate(${currentAnno.rotation}deg)`,
      }}
    >
      Text
    </div>
  );
}
