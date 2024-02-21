import { useContext } from 'react';
import { BarrierContext } from '../../context/BarrierContext';

export default function DummyRect({ item }) {
  const { currentAnno, setCurrentAnno } = useContext(BarrierContext);

  return (
    <div
      style={{
        width: `${currentAnno?.size?.width}px`,
        height: `${currentAnno?.size?.height}px`,
        backgroundColor: `${currentAnno?.background?.color}`,
        borderWidth: `${currentAnno?.border?.width}px`,
        borderColor: `${currentAnno?.border?.color}`,
        position: 'absolute',
        left: `${currentAnno?.position?.x}px`,
        top: `${currentAnno?.position?.y}px`,
        transform: `rotate(${currentAnno.rotation}deg)`,
        borderTopLeftRadius: `${
          currentAnno?.border?.radius > 0
            ? `${currentAnno?.border?.radius}px`
            : `${currentAnno?.border?.topLeftRadius}px`
        }`,
        borderTopRightRadius: `${
          currentAnno?.border?.radius > 0
            ? `${currentAnno?.border?.radius}px`
            : `${currentAnno?.border?.topRightRadius}px`
        }`,
        borderBottomRightRadius: `${
          currentAnno?.border?.radius > 0
            ? `${currentAnno?.border?.radius}px`
            : `${currentAnno?.border?.bottomRightRadius}px`
        }`,
        borderBottomLeftRadius: `${
          currentAnno?.border?.radius > 0
            ? `${currentAnno?.border?.radius}px`
            : `${currentAnno?.border?.bottomLeftRadius}px`
        }`,
      }}
    ></div>
  );
}
