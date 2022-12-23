import AutoAnimate from '@components/core/AutoAnimate';
import Button from '@components/core/Button';
import DataDisplay from '@components/core/DataDisplay';
import Modal from '@components/core/Modal';
import Select from '@components/core/Select';
import Spinner from '@components/core/Spinner';
import TextField from '@components/core/TextField';
import { toastError, toastSuccess } from '@libs/toastify';
import anilistService from '@services/anilistService';
import Image from 'next/image';
import { useState } from 'react';
import { OptionType } from 'src/enums';

const poll_OPTION_TYPES = [
  { id: 1, label: OptionType.Anime, value: OptionType.Anime },
  { id: 2, label: OptionType.Manga, value: OptionType.Manga },
  { id: 3, label: OptionType.Character, value: OptionType.Character },
];

const isMedia = (obj: any): obj is Anilist.Media => Boolean(obj && obj.title);
const isCharacter = (obj: any): obj is Anilist.Character =>
  Boolean(obj && obj.name);

const getMediaName = (media: Anilist.Media) => media.title.english ?? media.title.romaji ?? media.title.native;

interface MediaCardProps {
  media: Anilist.Media;
  onAdd: (media: Anilist.Media) => void;
}

const MediaCard: React.FC<MediaCardProps> = ({ media, onAdd }) => (
  <>
    <h1 className="font-medium text-neutral-800 text-center">
      {media.title.romaji ?? media.title.native}
    </h1>
    <div className="h-[155px] w-[112px]">
      <Image
        src={media.coverImage.extraLarge}
        alt="Selected option cover"
        width="112px"
        height="155px"
        layout="responsive"
      />
    </div>
    <div className="flex flex-col items-center text-neutral-600">
      <span className="text-sm text-center">{media.title.english}</span>
      <span className="text-sm text-center">{media.title.native}</span>
      <span className="text-xs">
        {media.format}
        {media.episodes ? ` - ${media.episodes} EPISODES` : ``}
      </span>
    </div>
    <div>
      <Button color="green" onClick={() => onAdd(media)}>
        <span className="px-9">ADD</span>
      </Button>
    </div>
  </>
);

interface CharacterCardProps {
  character: Anilist.Character;
  onAdd: (character: Anilist.Character) => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character, onAdd }) => (
  <>
    <h1 className="font-medium text-neutral-800 text-center">
      {character.name.full}
    </h1>
    <div className="h-[155px] w-[112px]">
      <Image
        src={character.image.large}
        alt="Selected option cover"
        width="112px"
        height="155px"
        layout="responsive"
      />
    </div>
    <div className="flex flex-col items-center text-neutral-600">
      <span className="text-sm text-center">{character.name.full}</span>
      <span className="text-sm text-center">{character.name.native}</span>
    </div>
    <div>
      <Button color="green" onClick={() => onAdd(character)}>
        <span className="px-9">ADD</span>
      </Button>
    </div>
  </>
);

interface SearchOptionModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (pollOption: PollOption) => void;
}

const SearchOptionModal = ({
  open,
  onClose,
  onAdd,
}: SearchOptionModalProps) => {
  const [searchText, setSearchText] = useState('');
  const [type, setType] = useState(poll_OPTION_TYPES[0].value);
  const [options, setOptions] = useState(
    Array<Anilist.Media | Anilist.Character>()
  );
  const [selectedOption, setSelectedOption] = useState<
    Anilist.Media | Anilist.Character | null
  >(null);
  const [isLoadingOptions, setIsLoadingOptions] = useState(false);

  const searchOptions = async (searchText: string, type: OptionType) => {
    try {
      setIsLoadingOptions(true);

      if (type === OptionType.Character) {
        const options = await anilistService.listCharacterBySearch(searchText);
        setOptions(options);
        return;
      }

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

  const addMediaHandler = (media: Anilist.Media) => {
    onAdd({
      anilistId: media.id,
      type: media.type,
      text: getMediaName(media),
    });
    toastSuccess(`${getMediaName(media)} added`);
  };

  const addCharacterHandler = (character: Anilist.Character) => {
    onAdd({
      anilistId: character.id,
      type: OptionType.Character,
      text: character.name.full,
    });
    toastSuccess(`${character.name.full} added`);
  };

  const renderSelectedOption = (
    selectedOption: Anilist.Media | Anilist.Character | null
  ) => {
    if (isMedia(selectedOption)) {
      return <MediaCard media={selectedOption} onAdd={addMediaHandler} />;
    }

    if (isCharacter(selectedOption)) {
      return (
        <CharacterCard character={selectedOption} onAdd={addCharacterHandler} />
      );
    }

    return (
      <span className="text-xs uppercase font-semibold">
        Select a option to display
      </span>
    );
  };

  const renderOption = (option: Anilist.Media | Anilist.Character) => {
    if (isMedia(option)) {
      return getMediaName(option);
    }

    if (isCharacter(option)) return option.name.full;
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
            options={poll_OPTION_TYPES}
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
                    {renderOption(option)}
                  </li>
                ))
              )}
            </AutoAnimate>
          </DataDisplay>

          <DataDisplay className="flex w-full flex-col items-center gap-2 py-3 sm:w-[400px] min-h-[250px]">
            {renderSelectedOption(selectedOption)}
          </DataDisplay>
        </div>
      </div>
    </Modal>
  );
};

export default SearchOptionModal;
