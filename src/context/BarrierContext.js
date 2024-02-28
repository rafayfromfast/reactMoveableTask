import { createContext, useState, useEffect, useMemo } from 'react';
import { useToast } from '@chakra-ui/react';
import { nanoid } from 'nanoid';
import { fetchDiagrams } from '../api/controllers';

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
  const [diagrams, setDiagrams] = useState([]);
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
    // {
    //   id: 2,
    //   type: "rectangle",
    //   position: {
    //     x: 10,
    //     y: 10,
    //   },
    //   rotation: 0,
    //   size: {
    //     width: 60,
    //     height: 60,
    //   },
    //   background: {
    //     color: "#ddd",
    //   },
    //   border: {
    //     color: "#000000",
    //     width: 1,
    //     radius: 5,
    //     topLeftRadius: 0,
    //     topRightRadius: 0,
    //     bottomRightRadius: 0,
    //     bottomLeftRadius: 0,
    //   },
    //   isLocked: true,
    // },
  ]);
  const [currentAnno, setCurrentAnno] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    console.log('currentAnno effect:', currentAnno);
    console.log('annotations :', annotations);
    setAnnotations(
      annotations?.map((item) =>
        item.id === currentAnno?.id
          ? {
              ...currentAnno,
            }
          : item
      )
    );
  }, [JSON.stringify(currentAnno)]);

  // const deleteAnnotation = (id) => {
  //   setAnnotations(prev )
  // }

  const filteredStrings = useMemo(() => {
    if (!searchString) return strings;

    return strings.filter((item) => {
      return item.name.toLowerCase().includes(searchString.toLowerCase());
    });
  }, [strings, searchString]);

  const handleDeleteKey = () => {
    if (currentAnno) {
      setAnnotations((prev) =>
        prev.filter((anno) => anno.id != currentAnno.id)
      );
      setCurrentAnno(null);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Delete' || event.keyCode === 46) {
        handleDeleteKey();
      }
    };
    document.body.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentAnno]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchDiagrams();
      setDiagrams(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    currentData?.annotations?.length &&
      setAnnotations(currentData?.annotations);
  }, [currentData]);

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
        selectedOption,
        setSelectedOption,
        diagrams,
        setDiagrams,
      }}
    >
      {children}
    </BarrierContext.Provider>
  );
};
