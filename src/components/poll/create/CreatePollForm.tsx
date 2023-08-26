import AutoAnimate from '@components/core/AutoAnimate';
import Button from '@components/core/Button/Button';
import CheckBox from '@components/core/CheckBox';
import DataDisplay from '@components/core/DataDisplay';
import DateTimePicker from '@components/core/DateTimePicker/DateTimePicker';
import FormGroup from '@components/core/FormGroup';
import Label from '@components/core/Label';
import Select from '@components/core/Select';
import TextField from '@components/core/TextField';
import { TrashIcon } from '@heroicons/react/24/outline';
import { toastPromise } from '@libs/toastify';
import pollService from '@services/pollService';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useState } from 'react';
import ImportOptionsModal from './ImportOptionsModal';
import SearchOptionModal from './SearchOptionModal';
import Tooltip from '@components/core/Tooltip';

interface PollFormOptionProps {
  id: string;
  type: string;
  text: string;
  onRemove: () => void;
}

type ResultsVisibilityOption = {
  id: number;
  value: ResultsVisibility;
  label: string;
};

const RESULTS_VISIBILITY_OPTIONS: ResultsVisibilityOption[] = [
  {
    id: 1,
    value: 'ALWAYS_VISIBLE',
    label: 'Always visible',
  },
  {
    id: 2,
    value: 'AFTER_END',
    label: 'Only visible after end',
  },
];

const PollFormOption = ({ id, type, text, onRemove }: PollFormOptionProps) => {
  return (
    <FormGroup
      id={id}
      className="flex flex-col sm:flex-row"
      label={`#${id} Option`}
    >
      <DataDisplay className="flex w-full items-center justify-center sm:w-[180px]">
        {type}
      </DataDisplay>
      <DataDisplay className="flex w-full items-center justify-between uppercase">
        <span>{text}</span>
        <button onClick={onRemove}>
          <TrashIcon className="h-5 w-5 text-red-600" />
        </button>
      </DataDisplay>
    </FormGroup>
  );
};

const CreatePollForm = () => {
  const [title, setTitle] = useState('');
  const [endDate, setEndDate] = useState(new Date());
  const [options, setOptions] = useState<PollOption[]>([]);
  const [resultsVisibility, setResultsVisibility] = useState(
    'ALWAYS_VISIBLE' as ResultsVisibility
  );
  const [shouldEnableMultipleSelection, setShouldEnableMultipleSelection] =
    useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isCreatingPoll, setIsCreatingPoll] = useState(false);
  const router = useRouter();
  const shouldCreateButtonBeEnabled =
    title &&
    dayjs(endDate).isAfter(dayjs()) &&
    options.length > 1 &&
    resultsVisibility;

  const removeAlreadyAddedOptions = (
    options: PollOption[],
    alreadyAddedOptions: PollOption[]
  ) => {
    const cleanOptions = options.filter((optionToAdd) => {
      const wasNotAdded = !alreadyAddedOptions.some(
        (option) =>
          option.anilistId === optionToAdd.anilistId &&
          option.type === optionToAdd.type
      );
      return wasNotAdded;
    });
    return cleanOptions;
  };

  const onAddOptionHandler = (optionsToAdd: PollOption[]) => {
    const cleanOptionsToAdd = removeAlreadyAddedOptions(optionsToAdd, options);
    const newOptions = [...options, ...cleanOptionsToAdd];
    setOptions(newOptions);
  };

  const onRemoveOptionHandler = (optionToRemove: PollOption) => {
    const newOptions = options.filter(
      (option) =>
        option.anilistId !== optionToRemove.anilistId ||
        option.type !== optionToRemove.type
    );
    setOptions(newOptions);
  };

  const onSubmitHandler = async () => {
    try {
      setIsCreatingPoll(true);
      const poll = {
        title,
        endDate: new Date(endDate).toISOString(),
        options,
        multiOptions: shouldEnableMultipleSelection,
        resultsVisibility,
      };

      const pollId = await toastPromise(pollService.create(poll), {
        pending: 'Creating poll',
        success: 'Poll created',
        error: 'Failed to create poll',
      });
      router.push(`/poll/vote/${pollId}`);
    } finally {
      setIsCreatingPoll(false);
    }
  };

  return (
    <>
      {isSearchModalOpen && (
        <SearchOptionModal
          open={isSearchModalOpen}
          onAdd={onAddOptionHandler}
          onClose={() => setIsSearchModalOpen(false)}
        />
      )}
      {isImportModalOpen && (
        <ImportOptionsModal
          open={isImportModalOpen}
          onAdd={onAddOptionHandler}
          onClose={() => setIsImportModalOpen(false)}
        />
      )}

      <TextField
        value={title}
        id="poll-title"
        label="Poll title"
        placeHolder="What was the best anime of the year?"
        className="w-full"
        onChange={(title) => setTitle(title)}
      />
      <div className="flex flex-col sm:flex-row w-full gap-4">
        <div className="w-full">
          <Label htmlFor="results-visibility">Results visibility</Label>
          <Select
            id="results-visibility"
            label="Results visibility"
            value={resultsVisibility}
            options={RESULTS_VISIBILITY_OPTIONS}
            onChange={(value) => setResultsVisibility(value)}
          />
        </div>
        <div className="w-full">
          <Label htmlFor="results-visibility">End date</Label>
          <DateTimePicker
            value={endDate}
            className="w-full sm:w-auto"
            onChange={(date) => setEndDate(date)}
          />
        </div>
      </div>

      <FormGroup label="Options">
        <DataDisplay className="flex w-full flex-col">
          <AutoAnimate
            as="ul"
            className={`mb-2 flex w-full flex-col ${
              options.length > 0 &&
              'max-h-[200px] md:max-h-[370px] overflow-y-scroll pr-1'
            }`}
          >
            {options.length > 0 ? (
              options.map((option, index) => (
                <PollFormOption
                  key={`${option.type}-${option.anilistId}`}
                  id={(index + 1).toString()}
                  type={option.type}
                  text={option.text!}
                  onRemove={() => onRemoveOptionHandler(option)}
                />
              ))
            ) : (
              <li className="self-center text-sm uppercase">
                Add options to visualize here
              </li>
            )}
          </AutoAnimate>
          <div className="flex flex-grow flex-col gap-2 md:flex-row w-full">
            <Button
              className="w-full self-end"
              color="green"
              onClick={() => setIsSearchModalOpen(true)}
              name="Open add options modal"
            >
              SEARCH OPTIONS
            </Button>
            <Button
              className="w-full self-end"
              color="green"
              onClick={() => setIsImportModalOpen(true)}
              name="Open add options modal"
            >
              IMPORT FROM MY POLLS
            </Button>
          </div>
        </DataDisplay>
      </FormGroup>
      <div className="flex w-full justify-between">
        <Tooltip title="If enabled, users will be able to select multiple options when voting.">
          <CheckBox
            id="enable-multiple-selection"
            checked={shouldEnableMultipleSelection}
            onChange={(event) =>
              setShouldEnableMultipleSelection(event.target.checked)
            }
          >
            Enable multiple selection
          </CheckBox>
        </Tooltip>
        <Button
          disabled={!shouldCreateButtonBeEnabled || isCreatingPoll}
          size="large"
          color="green"
          name="Create poll"
          className="w-full sm:w-auto"
          onClick={onSubmitHandler}
        >
          Create poll
        </Button>
      </div>
    </>
  );
};

export default CreatePollForm;
