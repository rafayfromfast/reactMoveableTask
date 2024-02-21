import { createContext, useState, useEffect, useMemo } from 'react';
import { useToast } from '@chakra-ui/react';
import { nanoid } from 'nanoid';

export const BarrierContext = createContext();

export const BarrierProvider = ({ children }) => {
  const timestamp = Date.now();
  // const templatesURL = 'http://localhost:3001/templates';
  // const stringsURL = 'http://localhost:3001/strings';

  const templatesURL = 'https://mock-server-ytzw.onrender.com/templates';
  const stringsURL = 'https://mock-server-ytzw.onrender.com/strings';
  const toast = useToast();
  const [templates, setTemplates] = useState([]);
  const [isCurrent, setIsCurrent] = useState(false);
  const [showDiagram, setShowDiagram] = useState(false);
  const [currentData, setCurrentData] = useState(null);
  const [selectedString, setSelectedString] = useState('');
  const [searchString, setSearchString] = useState('');
  const [strings, setStrings] = useState([
    {
      id: nanoid(),
      name: 'Resak A1U',
    },
    {
      id: nanoid(),
      name: 'Resak A2U',
    },
    {
      id: nanoid(),
      name: 'Resak A3U',
    },
    {
      id: nanoid(),
      name: 'Resak A4U',
    },
    {
      id: nanoid(),
      name: 'Resak A5U',
    },
    {
      id: nanoid(),
      name: 'Resak A6U',
    },
    {
      id: nanoid(),
      name: 'Resak A7U',
    },
  ]);
  const [bgColor, setBgColor] = useState('#000000');
  const [strokeColor, setStrokeColor] = useState('#000000');
  const [annotations, setAnnotations] = useState([
    // {
    //   id: 1,
    //   type: 'text',
    //   position: {
    //     x: 0,
    //     y: 0,
    //   },
    //   rotation: 0,
    //   background: {
    //     color: '#000000',
    //   },
    //   fontSize: 14,
    //   fontFamily: 'arial',
    //   fontWeight: 'normal',
    //   content:
    //     'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
    // },
    {
      id: 2,
      type: 'rectangle',
      position: {
        x: 10,
        y: 10,
      },
      rotation: 0,
      size: {
        width: 60,
        height: 60,
      },
      background: {
        color: '#ddd',
      },
      border: {
        color: '#000000',
        width: 1,
        radius: 5,
        topLeftRadius: 0,
        topRightRadius: 0,
        bottomRightRadius: 0,
        bottomLeftRadius: 0,
      },
      isLocked: true,
    },
  ]);
  const [currentAnno, setCurrentAnno] = useState(null);

  useEffect(() => {
    setAnnotations(
      annotations?.map((item) =>
        item.id === currentAnno?.id
          ? {
              ...currentAnno,
            }
          : item
      )
    );
  }, [currentAnno]);

  const filteredStrings = useMemo(() => {
    if (!searchString) return strings;

    return strings.filter((item) => {
      return item.name.toLowerCase().includes(searchString.toLowerCase());
    });
  }, [strings, searchString]);

  return (
    <BarrierContext.Provider
      value={{
        templates,
        setTemplates,
        currentData,
        setCurrentData,
        showDiagram,
        setShowDiagram,
        isCurrent,
        setIsCurrent,
        selectedString,
        setSelectedString,
        strings,
        annotations,
        setAnnotations,
        currentAnno,
        setCurrentAnno,
        bgColor,
        setBgColor,
        strokeColor,
        setStrokeColor,
        filteredStrings,
        searchString,
        setSearchString,
      }}
    >
      {children}
    </BarrierContext.Provider>
  );
};
