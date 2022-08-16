import AutoAnimate from '@components/core/AutoAnimate';
import Button from '@components/core/Button';
import DataDisplay from '@components/core/DataDisplay';
import Modal from '@components/core/Modal';
import Select from '@components/core/Select';
import Spinner from '@components/core/Spinner';
import TextField from '@components/core/TextField';
import { toastError } from '@libs/toastify';
import anilistService from '@services/anilistService';
import Image from 'next/image';
import { useState } from 'react';
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
  const [selectedOption, setSelectedOption] = useState<Anilist.Media | null>(
    null
  );
  const [isLoadingOptions, setIsLoadingOptions] = useState(false);

  const searchOptions = async (searchText: string, type: MediaTypes) => {
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
          <form
            className="flex w-full gap-2"
            onSubmit={(event) => {
              event.preventDefault();
              searchOptions(searchText, type);
            }}
          >
            <TextField
              id="search-option-text"
              placeHolder="Hunter x Hunter"
              value={searchText}
              className="w-full"
              onChange={(text) => setSearchText(text)}
            />
            <Button type="submit">Search</Button>
          </form>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <DataDisplay className="w-full">
            <AutoAnimate as="ul" className="h-full">
              {isLoadingOptions ? (
                <div className="flex flex-col w-full h-full items-center justify-center">
                  <Spinner className="text-indigo-900" />
                </div>
              ) : options.length === 0 ? (
                <span className="text-xs uppercase font-semibold">
                  Search for options to display
                </span>
              ) : (
                options.map((option) => (
                  <li
                    key={option.id}
                    className="cursor-pointer"
                    onClick={() => setSelectedOption(option)}
                  >
                    {option.title.english}
                  </li>
                ))
              )}
            </AutoAnimate>
          </DataDisplay>

          <DataDisplay className="flex w-full flex-col items-center gap-2 py-3 sm:w-[400px] min-h-[250px]">
            {selectedOption ? (
              <>
                <h1 className="font-medium text-neutral-800 text-center">
                  {selectedOption.title.romaji}
                </h1>
                <div className="h-[155px] w-[112px]">
                  <Image
                    src={selectedOption.coverImage.extraLarge}
                    alt="Selected option cover"
                    width="112px"
                    height="155px"
                    layout="responsive"
                  />
                </div>
                <div className="flex flex-col items-center text-neutral-600">
                  <span className="text-sm text-center">
                    {selectedOption.title.english}
                  </span>
                  <span className="text-sm text-center">
                    {selectedOption.title.native}
                  </span>
                  <span className="text-xs">
                    {selectedOption.format}
                    {selectedOption.episodes
                      ? ` - ${selectedOption.episodes} EPISODES`
                      : ``}
                  </span>
                </div>
                <div>
                  <Button color="green">
                    <span className="px-9">ADD</span>
                  </Button>
                </div>
              </>
            ) : (
              <span className="text-xs uppercase font-semibold">
                Select a option to display
              </span>
            )}
          </DataDisplay>
        </div>
      </div>
    </Modal>
  );
};

export default SearchOptionModal;
