import { useContext, useRef, useState, forwardRef } from 'react';
import Navbar from './components/Navbar';
import {
  Flex,
  IconButton,
  HStack,
  Button,
  Input,
  InputGroup,
  useColorModeValue,
  InputRightElement,
  Stack,
  Image,
} from '@chakra-ui/react';
import {
  exportComponentAsJPEG,
  exportComponentAsPNG,
} from 'react-component-export-image';

import { AddIcon, SearchIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { BsPrinterFill } from 'react-icons/bs';
import ReactToPrint from 'react-to-print';
import Diagram from './components/Diagram';
import { BarrierContext } from './context/BarrierContext';
import DiagramList from './components/DiagramList';
import { RiEdit2Fill } from 'react-icons/ri';
import { nanoid } from 'nanoid';
import _ from 'lodash';
import { PiFileJpgFill, PiFilePngFill } from 'react-icons/pi';
import { PiTextTFill } from 'react-icons/pi';
import { MdEdit } from 'react-icons/md';
import DesignPanel from './components/DesignPanel';
import Popup from 'reactjs-popup';
import DiagramItem from './components/DiagramItem';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import { useForm } from 'react-hook-form';
import SelectStringDropdown from './components/SelectStringDropdown';

function App() {
  const {
    showDiagram,
    setShowDiagram,
    currentData,
    setCurrentData,
    setIsNewAnno,
    selectedOption,
    setSelectedOption,
  } = useContext(BarrierContext);

  const annotationMenu = [
    {
      id: nanoid(),
      type: 'line',
      label: 'Line',
      shortcut: 'l',
      imageURL: './icons/solid-line.svg',
    },

    {
      id: nanoid(),
      type: 'arrow',
      label: 'Arrow',
      shortcut: 'a',
      imageURL: './icons/arrow.svg',
    },

    {
      id: nanoid(),
      type: 'rectangle',
      label: 'Rectangle',
      shortcut: 'r',
      imageURL: './icons/rectangle.svg',
    },
    {
      id: nanoid(),
      type: 'ellipse',
      label: 'Ellipse',
      shortcut: 'o',
      imageURL: './icons/ellipse.svg',
    },
  ];

  const printRef = useRef();

  const buttonsBg = useColorModeValue('white', 'gray.800');
  return (
    <Flex w='100vw' h='100vh'>
      <Navbar />
      {/* buttons start */}
      <Flex
        pos='absolute'
        top={12}
        left='0'
        w='full'
        borderBottomWidth='1px'
        h={12}
        align='center'
        zIndex={998}
        bg={buttonsBg}
        justify='space-between'
      >
        <Flex justify='space-between' align='center'>
          <Flex w='360px'>
            <Flex w='full' align='center' justify='space-between'>
              <HStack spacing='16px' ml={2}>
                <IconButton
                  mr={6}
                  variant='outline'
                  colorScheme='blue'
                  size='sm'
                  icon={<AddIcon />}
                  onClick={() => {
                    setCurrentData({ id: nanoid(), ...currentData });
                    setShowDiagram(true);
                  }}
                />

                <IconButton
                  variant={selectedOption === 'text' ? 'solid' : 'outline'}
                  colorScheme='blue'
                  size='sm'
                  icon={<PiTextTFill />}
                  onClick={() => {
                    setSelectedOption('text');
                    // setCurrentData({ id: nanoid(), ...currentData });
                    setShowDiagram(true);
                  }}
                />

                <Popup
                  trigger={
                    <IconButton
                      variant={
                        ['line', 'arrow', 'ellipse', 'rectangle'].includes(
                          selectedOption
                        )
                          ? 'solid'
                          : 'outline'
                      }
                      colorScheme='blue'
                      size='sm'
                      icon={<MdEdit />}
                    />
                  }
                >
                  <div className='w-36 border-r bg-white border rounded-md'>
                    {annotationMenu?.map((item) => (
                      <div
                        key={item.id}
                        className='hover:bg-[#EDF2F7] w-full flex items-center justify-start text-xs px-3 py-1 '
                        onClick={() => {
                          setSelectedOption(item.type);
                          // setCurrentData({ id: nanoid(), ...currentData });
                          setShowDiagram(true);
                        }}
                      >
                        <div>
                          <Image src={item.imageURL} boxSize={4} mr={3} />
                        </div>
                        <div>
                          <p>{item.label}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Popup>

                <IconButton
                  variant='outline'
                  colorScheme='blue'
                  size='sm'
                  icon={<PiFilePngFill />}
                  onClick={() => {
                    exportComponentAsPNG(printRef);
                  }}
                />
                <IconButton
                  variant='outline'
                  colorScheme='blue'
                  size='sm'
                  icon={<PiFileJpgFill />}
                  onClick={() => {
                    exportComponentAsJPEG(printRef);
                  }}
                />

                <ReactToPrint
                  trigger={() => (
                    <IconButton
                      variant='outline'
                      colorScheme='blue'
                      size='sm'
                      icon={<BsPrinterFill />}
                    />
                  )}
                  content={() => printRef.current}
                />
              </HStack>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      {/* buttons end */}

      {/* main start */}
      <Flex w='full' justify='space-between'>
        {/* left sidebar start */}

        <Flex
          minW='220px'
          h='100vh'
          borderRightWidth='1px'
          overflowY
          p={2}
          flexDir='column'
        >
          {/* dropdown here */}
          <SelectStringDropdown />

          <div className='overflow-y-auto w-full scrollbar-hide mt-3 mb-3'>
            <DiagramList />
          </div>
        </Flex>
        {/* left sidebar end */}
        <Flex w='640px' h='100vh' overflowY>
          <div className='overflow-y-auto w-full scrollbar-hide mt-[108px] mb-3'>
            {showDiagram ? <Diagram ref={printRef} /> : null}
          </div>
        </Flex>

        {/* right sidebar start */}
        <Flex
          minW='220px'
          h='100vh'
          borderLeftWidth='1px'
          overflowY
          p={2}
          flexDir='column'
        >
          <DesignPanel />
        </Flex>
        {/* right sidebar end */}
      </Flex>

      {/* main end */}
    </Flex>
  );
}

export default App;
