import { useContext } from 'react';
import Popup from 'reactjs-popup';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { EditIcon, DeleteIcon, CopyIcon } from '@chakra-ui/icons';
import { nanoid } from 'nanoid';

const menu = [
  {
    id: nanoid(),
    name: 'View & Edit',
    icon: <EditIcon />,
  },
  {
    id: nanoid(),
    name: 'Duplicate',
    icon: <CopyIcon />,
  },
  {
    id: nanoid(),
    name: 'Delete',
    icon: <DeleteIcon />,
  },
];

export default function DiagramItem() {
  return (
    <div className='w-full h-24 border rounded flex justify-between p-1 space-x-1'>
      <div className='w-full h-full bg-gray-50'>1</div>
      <div className='w-full h-full bg-gray-50'>2</div>
      <div className='h-full justify-start'>
        <Popup
          trigger={
            <div className='p-1 cursor-pointer'>
              <BsThreeDotsVertical />
            </div>
          }
        >
          <div className=' bg-white border rounded-md cursor-pointer'>
            {menu?.map((item) => (
              <div
                key={item.id}
                className='flex w-full items-center hover:bg-[#EDF2F7] px-3 py-1'
              >
                {item.icon}
                <div className='ml-2 text-sm'>{item.name}</div>
              </div>
            ))}
          </div>
        </Popup>
      </div>
    </div>
  );
}
