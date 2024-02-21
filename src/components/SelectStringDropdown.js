import { useContext, useRef, useState, useEffect } from 'react';

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
import Popup from 'reactjs-popup';
import { useForm } from 'react-hook-form';
import {
  AddIcon,
  SearchIcon,
  ChevronDownIcon,
  SmallCloseIcon,
} from '@chakra-ui/icons';
import { BarrierContext } from '../context/BarrierContext';

export default function SelectStringDropdown() {
  const {
    handleSaveString,
    searchString,
    setSearchString,
    filteredStrings,
    selectedString,
    setSelectedString,
  } = useContext(BarrierContext);

  const [showDropdown, setShowDropdown] = useState(true);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    setValue('searchString', selectedString);
  }, [selectedString]);

  return (
    <form>
      <Popup
        trigger={
          <Flex mt='100px' w='full'>
            <InputGroup
              size='sm'
              borderRadius='5px'
              onClick={() => setShowDropdown(true)}
            >
              <Input
                placeholder='Select string'
                borderRadius='5px'
                {...register('searchString', {
                  onChange: (e) => setSearchString(e.target.value),
                })}
              />
              <InputRightElement w='3rem'>
                <SmallCloseIcon
                  onClick={() => {
                    setSearchString('');
                    setSelectedString('');
                  }}
                />
                <ChevronDownIcon ml={2} />
              </InputRightElement>
            </InputGroup>
          </Flex>
        }
      >
        {showDropdown ? (
          <div className='flex flex-col bg-white border w-[203px] h-[160px] overflow-y-auto scrollbar-hide rounded-md '>
            {filteredStrings?.map((item) => (
              <div
                key={item.id}
                className='hover:bg-[#EDF2F7] px-3 py-1 cursor-pointer'
                onClick={() => {
                  setSelectedString(item?.name);
                  setShowDropdown(false);
                }}
              >
                {item.name}
              </div>
            ))}
          </div>
        ) : null}
      </Popup>
      <Flex w='full' justify='end' mt={3}>
        <Button
          variant='solid'
          colorScheme='blue'
          size='sm'
          w='70px'
          onClick={handleSaveString}
        >
          Update
        </Button>
      </Flex>
    </form>
  );
}
