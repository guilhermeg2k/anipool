import Button from '@components/core/Button';
import DataDisplay from '@components/core/DataDisplay';
import Modal from '@components/core/Modal';
import Select from '@components/core/Select';
import TextField from '@components/core/TextField';
import { toastError } from '@libs/toastify';
import Image from 'next/image';
import { useState } from 'react';

const POOL_OPTION_TYPES = [
  { id: 1, label: MediaTypes.Anime, value: MediaTypes.Anime },
  { id: 2, label: MediaTypes.Manga, value: MediaTypes.Manga },
  { id: 3, label: MediaTypes.Character, value: MediaTypes.Character },
];

interface SearchOptionModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (option: PoolOption) => void;
}

const SearchOptionModal = ({
  open,
  onClose,
  onAdd,
}: SearchOptionModalProps) => {
  const [type, setType] = useState(POOL_OPTION_TYPES[0].value);
  const [text, setText] = useState('');

  const searchOptions = () => {
    try {
    } catch (error) {
      toastError('Failed to search options');
    }
  };

  return (
    <Modal
      title="Add new option"
      disableBackdropClick
      open={open}
      onClose={onClose}
    >
      <div className="flex flex-col gap-2 pt-2">
        <div className="flex w-full flex-col gap-2 sm:flex-row">
          <Select
            className="w-full sm:w-[220px]"
            options={POOL_OPTION_TYPES}
            value={type}
            onChange={(type) => setType(type)}
          />
          <div className="flex w-full gap-2">
            <TextField
              id="search-option-text"
              placeHolder="Hunter x Hunter"
              value={text}
              className="w-full"
              onChange={(text) => setText(text)}
            />
            <Button onClick={() => searchOptions()}>Search</Button>
          </div>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <DataDisplay className="w-full">
            <ul>
              <li>SHINGEKI NO KYOJIN</li>
              <li>SHINGEKI NO KYOJIN</li>
              <li>SHINGEKI NO KYOJIN</li>
            </ul>
          </DataDisplay>
          <DataDisplay className="flex w-full flex-col items-center gap-2 py-3 sm:w-[400px]">
            <h1 className="font-medium text-neutral-800">SHINGEKI NO KYOJIN</h1>
            <div className="h-[155px] w-[112px]">
              <Image
                src="https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx16498-C6FPmWm59CyP.jpg"
                alt="Selected option cover"
                width="112px"
                height="155px"
                layout="responsive"
              />
            </div>
            <div className="flex flex-col items-center text-neutral-600">
              <span>Attack on Titan</span>
              <span>進撃の巨人</span>
              <span className="text-xs">TV - 22 EPISODES</span>
            </div>
            <div>
              <Button color="green">
                <span className="px-9">ADD</span>
              </Button>
            </div>
          </DataDisplay>
        </div>
      </div>
    </Modal>
  );
};

export default SearchOptionModal;
