import { createContext, useState, useEffect, useMemo, useContext } from 'react';
import { useToast } from '@chakra-ui/react';

const handleSave = async () => {
  try {
    const current = await fetch(`${baseURL}`)
      .then((res) => res.json())
      .then((res) => res.find((item) => item.id === data?.id));

    if (current?.id) {
      await fetch(`${baseURL}/${current?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((res) => {
          if (res.ok) {
            toast({
              title: 'Saved',
              status: 'success',
              position: 'top-right',
              duration: 1500,
              isClosable: true,
            });
          }
          return res.json();
        })
        .then((res) => console.log(res));
    }

    if (!current?.id) {
      await fetch(`${baseURL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((res) => {
          if (res.ok) {
            toast({
              title: 'Saved',
              status: 'success',
              position: 'top-right',
              duration: 1500,
              isClosable: true,
            });
          }
          return res.json();
        })
        .then((res) => console.log(res));
    }
  } catch (e) {
    console.log(e);
  }
};

export const BarrierContext = createContext();

export const BarrierProvider = ({ children }) => {
  const timestamp = Date.now();
  const url = 'http://localhost:3001/wells';
  const toast = useToast();
  const [data, setData] = useState(null);
  const [currentData, setCurrentData] = useState(null);
  const [searchWell, setSearchWell] = useState('');
  const [showCurrentReport, setShowCurrentReport] = useState(false);
  const [showNewReport, setShowNewReport] = useState(false);
  const [rightClick, setRightClick] = useState(false);
  const [doubleClick, setDoubleClick] = useState(false);
  const [annotation, setAnnotation] = useState(null);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });
  const [statusMenuPosition, setStatusMenuPosition] = useState({
    x: 0,
    y: 0,
  });

  // console.log('allData', data);
  // console.log('currentData', currentData);

  useEffect(() => {
    if (data) {
      updateData();
    }
  }, [currentData]);

  const updateData = () => {
    if (data) {
      const newArr = [...data?.records];
      const updatedRecords = newArr.map((record) => {
        if (record.recordId === currentData?.recordId) {
          return currentData;
        }
        return record;
      });
      setData({ ...data, records: updatedRecords });
    }
  };

  const getData = async () => {
    try {
      await fetch(`${url}/${searchWell.toLowerCase()}`)
        .then((res) => {
          if (!res.ok) {
            toast({
              title: 'Not found',
              status: 'error',
              position: 'top-right',
              duration: 1500,
              isClosable: true,
            });
          }
          return res.json();
        })
        .then((res) => setData(res));
    } catch (e) {
      console.log(e);
    }
  };

  const deleteRecord = async (recordId) => {
    try {
      const records = data?.records?.filter(
        (item) => item.recordId !== recordId
      );
      setData({ ...data, records });
      await fetch(`${url}/${data?.id?.toLowerCase()}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, records }),
      });
    } catch (e) {
      console.log('error', e);
    }
  };

  const saveData = async () => {
    try {
      await fetch(`${url}/${data?.id?.toLowerCase()}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then((res) => {
        if (res.ok) {
          toast({
            title: 'Saved',
            status: 'success',
            position: 'top-right',
            duration: 1500,
            isClosable: true,
          });
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  const duplicateRecord = (id, record) => {
    try {
      setCurrentData({ wellName: id, ...record });
      const records = [{ ...record, recordId: timestamp }, ...data?.records];
      setData({ ...data, records });
    } catch (e) {
      console.log(e);
    }
  };

  const handleDuplicate = async (diagram) => {
    try {
      console.log(diagram);
      setCurrentData({ id: nanoid(), ...diagram });
      await fetch(`${baseURL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentData),
      });
    } catch (e) {
      console.log(e);
    }
  };

  app.post('/users', (req, res) => {
    const { email } = req.body;
    const userExists = users.find((u) => u.email === email);
    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }
    res.json(req.body);
  });

  return (
    <BarrierContext.Provider
      value={{
        data,
        setData,
        currentData,
        setCurrentData,
        getData,
        searchWell,
        setSearchWell,
        showCurrentReport,
        setShowCurrentReport,
        showNewReport,
        setShowNewReport,
        saveData,
        deleteRecord,
        duplicateRecord,
        rightClick,
        setRightClick,
        contextMenuPosition,
        setContextMenuPosition,
        statusMenuPosition,
        setStatusMenuPosition,
        annotation,
        setAnnotation,
        doubleClick,
        setDoubleClick,
      }}
    >
      {children}
    </BarrierContext.Provider>
  );
};

// diagram div start

<div
  ref={ref}
  style={{ cursor: crosshair ? 'crosshair' : 'default' }}
  onContextMenu={(e) => {
    e.preventDefault();
  }}
  onMouseMove={handleMouseMove}
>
  {/* ref={drop} */}

  <div
    ref={drop}
    className='overflow-y-auto scrollbar-hide border h-[1040px]'
    onContextMenu={(e) => {
      e.preventDefault();
      setShowAnnotationsMenu(true);
      setAnnotationsMenuPosition({
        x: e.pageX,
        y: e.pageY,
      });
    }}
    onClick={(e) => {
      setAnnotations([
        {
          ...selectedAnnotation,
          id: nanoid(),
          position: {
            left: mouseCoords?.left,
            top: mouseCoords?.top,
          },
        },
        ...annotations,
      ]);
      setCrosshair(false);
      setSelectedAnnotation(null);
    }}
  >
    <Flex
      w='full'
      h='60px'
      borderBottomWidth='1px'
      flexDir='row'
      align='center'
      justify='center'
      style={{ userSelect: 'none' }}
    >
      <Input
        style={{ userSelect: 'none' }}
        variant='unstyled'
        textAlign='center'
        autoFocus
        required
        value={name}
        onChange={(e) => setName((prev) => (prev = e.target.value))}
      />
    </Flex>
    {/* {showAnnotationsMenu ? <AnnotationsMenu /> : null} */}
    {showStatusMenu ? <StatusMenu /> : null}
    {showBarrierMenu ? <BarrierMenu /> : null}
    <AnnotationList />

    {/* render diagram here */}
    <Flex w='full' h='full' align='start' justify='start' ml='160px' mt='60px'>
      {renderDiagram(config)}
    </Flex>

    {/* <Flex
      justify='space-evenly'
      position='relative'
      className='snapContainer'
      w='100%'
      h='100%'
    ></Flex> */}
  </div>
</div>;




<Menu>
<MenuButton
  as={Button}
  variant='unstyled'
  maxWidth={96}
  mx={3}
  my={0}
>
  <svg
    width='96'
    height='16'
    viewBox='0 0 151 16'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M0.292893 7.29289C-0.0976311 7.68342 -0.0976311 8.31658 0.292893 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928932C7.68054 0.538408 7.04738 0.538408 6.65685 0.928932L0.292893 7.29289ZM1 9H151V7H1V9Z'
      fill='black'
    />
  </svg>
</MenuButton>
<MenuList>
  <MenuOptionGroup type='radio' defaultValue='arrow-left-line'>
    <MenuItemOption value='arrow-none'>
      <svg
        width='96'
        height='2'
        viewBox='0 0 150 2'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d='M0 1H150' stroke='black' strokeWidth='2' />
      </svg>
    </MenuItemOption>
    <MenuItemOption value='arrow-left-line'>
      <svg
        width='96'
        height='16'
        viewBox='0 0 151 16'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M0.292893 7.29289C-0.0976311 7.68342 -0.0976311 8.31658 0.292893 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928932C7.68054 0.538408 7.04738 0.538408 6.65685 0.928932L0.292893 7.29289ZM1 9H151V7H1V9Z'
          fill='black'
        />
      </svg>
    </MenuItemOption>
    <MenuItemOption value='arrow-left-triangle'>
      <svg
        width='96'
        height='12'
        viewBox='0 0 150 12'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M0 6L10 11.7735V0.226497L0 6ZM9 7H150V5H9V7Z'
          fill='black'
        />
      </svg>
    </MenuItemOption>
    <MenuItemOption value='arrow-left-circle'>
      <svg
        width='96'
        height='12'
        viewBox='0 0 156 12'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M0.666667 6C0.666667 8.94552 3.05448 11.3333 6 11.3333C8.94552 11.3333 11.3333 8.94552 11.3333 6C11.3333 3.05448 8.94552 0.666667 6 0.666667C3.05448 0.666667 0.666667 3.05448 0.666667 6ZM6 7H156V5H6V7Z'
          fill='black'
        />
      </svg>
    </MenuItemOption>
  </MenuOptionGroup>
</MenuList>
</Menu>
<Menu>
<MenuButton as={Button} variant='unstyled' maxWidth={96} mx={3}>
  <svg
    width='96'
    height='16'
    viewBox='0 0 151 16'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M150.707 8.70711C151.098 8.31658 151.098 7.68342 150.707 7.29289L144.343 0.928932C143.953 0.538408 143.319 0.538408 142.929 0.928932C142.538 1.31946 142.538 1.95262 142.929 2.34315L148.586 8L142.929 13.6569C142.538 14.0474 142.538 14.6805 142.929 15.0711C143.319 15.4616 143.953 15.4616 144.343 15.0711L150.707 8.70711ZM0 9H150V7H0V9Z'
      fill='black'
    />
  </svg>
</MenuButton>
<MenuList>
  <MenuOptionGroup type='radio' defaultValue='arrow-right-line'>
    <MenuItemOption value='arrow-none'>
      <svg
        width='96'
        height='2'
        viewBox='0 0 150 2'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d='M0 1H150' stroke='black' strokeWidth='2' />
      </svg>
    </MenuItemOption>
    <MenuItemOption value='arrow-right-line'>
      <svg
        width='96'
        height='16'
        viewBox='0 0 151 16'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M150.707 8.70711C151.098 8.31658 151.098 7.68342 150.707 7.29289L144.343 0.928932C143.953 0.538408 143.319 0.538408 142.929 0.928932C142.538 1.31946 142.538 1.95262 142.929 2.34315L148.586 8L142.929 13.6569C142.538 14.0474 142.538 14.6805 142.929 15.0711C143.319 15.4616 143.953 15.4616 144.343 15.0711L150.707 8.70711ZM0 9H150V7H0V9Z'
          fill='black'
        />
      </svg>
    </MenuItemOption>
    <MenuItemOption value='arrow-right-triangle'>
      <svg
        width='96'
        height='12'
        viewBox='0 0 150 12'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M150 6L140 0.226497V11.7735L150 6ZM0 7H141V5H0V7Z'
          fill='black'
        />
      </svg>
    </MenuItemOption>
    <MenuItemOption value='arrow-right-circle'>
      <svg
        width='96'
        height='12'
        viewBox='0 0 156 12'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M144.667 6C144.667 8.94552 147.054 11.3333 150 11.3333C152.946 11.3333 155.333 8.94552 155.333 6C155.333 3.05448 152.946 0.666667 150 0.666667C147.054 0.666667 144.667 3.05448 144.667 6ZM0 7H150V5H0V7Z'
          fill='black'
        />
      </svg>
    </MenuItemOption>
  </MenuOptionGroup>
</MenuList>
</Menu>