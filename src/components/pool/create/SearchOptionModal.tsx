import AutoAnimate from '@components/core/AutoAnimate';
import Button from '@components/core/Button';
import DataDisplay from '@components/core/DataDisplay';
import Modal from '@components/core/Modal';
import Select from '@components/core/Select';
import Spinner from '@components/core/Spinner';
import SpinnerGon from '@components/core/SpinnerGon';
import TextField from '@components/core/TextField';
import { toastError } from '@libs/toastify';
import anilistService from '@services/anilistService';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { MediaTypes } from 'src/enums';

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
  const [searchText, setSearchText] = useState('');
  const [type, setType] = useState(POOL_OPTION_TYPES[0].value);
  const [options, setOptions] = useState(Array<Anilist.Media>());
  const [isLoadingOptions, setIsLoadingOptions] = useState(false);

  const searchOptions = async () => {
    try {
      setIsLoadingOptions(true);
      const options = await anilistService.listMediaBySearchAndType(
        searchText,
        type
      );
      setOptions(options);
    } catch (error) {
      toastError('Failed to search options');
    } finally {
      setIsLoadingOptions(false);
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
              value={searchText}
              className="w-full"
              onChange={(text) => setSearchText(text)}
            />
            <Button onClick={() => searchOptions()}>Search</Button>
          </div>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <DataDisplay className="w-full">
            <AutoAnimate as="ul" className="h-full">
              {isLoadingOptions ? (
                <div className="flex flex-col w-full h-full items-center justify-center">
                  <Spinner className="text-indigo-900" />
                </div>
              ) : (
                options.map((option) => (
                  <li key={option.id}>{option.title.english}</li>
                ))
              )}
            </AutoAnimate>
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
