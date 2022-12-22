import AutoAnimate from '@components/core/AutoAnimate';
import Box from '@components/core/Box';
import Button from '@components/core/Button';
import CheckBox from '@components/core/CheckBox';
import DataDisplay from '@components/core/DataDisplay';
import DateTimePicker from '@components/core/DateTimePicker/DateTimePicker';
import FormGroup from '@components/core/FormGroup';
import TextField from '@components/core/TextField';
import { TrashIcon } from '@heroicons/react/outline';
import { toastPromise } from '@libs/toastify';
import pollService from '@services/pollService';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useState } from 'react';
import SearchOptionModal from './SearchOptionModal';

interface PollFormOptionProps {
  id: string;
  type: string;
  text: string;
  onRemove: () => void;
}

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
  const [options, setOptions] = useState(new Array<PollOption>());
  const [shouldEnableMultipleSelection, setShouldEnableMultipleSelection] =
    useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isCreatingpoll, setIsCreatingpoll] = useState(false);
  const router = useRouter();
  const shouldCreateButtonBeEnabled =
    title && dayjs(endDate) > dayjs() && options.length > 1;

  const onAddOptionHandler = (option: PollOption) => {
    const newOptions = [...options, option];
    setOptions(newOptions);
  };

  const onRemoveOptionHandler = (optionToRemove: PollOption) => {
    const newOptions = options.filter(
      (option) => option.anilistId !== optionToRemove.anilistId
    );
    setOptions(newOptions);
  };

  const onSubmitHandler = async () => {
    try {
      setIsCreatingpoll(true);
      const poll = {
        title,
        endDate: endDate.toISOString(),
        options,
        multiOptions: shouldEnableMultipleSelection,
      };

      const pollId = await toastPromise(pollService.create(poll), {
        pending: 'Creating poll',
        success: 'Poll created',
        error: 'Failed to create poll',
      });
      router.push(`/poll/vote/${pollId}`);
    } finally {
      setIsCreatingpoll(false);
    }
  };

  return (
    <Box>
      {isSearchModalOpen && (
        <SearchOptionModal
          open={isSearchModalOpen}
          onAdd={onAddOptionHandler}
          onClose={() => setIsSearchModalOpen(false)}
        />
      )}

      <TextField
        value={title}
        id="poll-title"
        label="Poll title"
        placeHolder="What anime should i watch next?"
        className="w-full"
        onChange={(title) => setTitle(title)}
      />
      <FormGroup label="Options">
        <DataDisplay className="flex w-full flex-col">
          <AutoAnimate
            as="ul"
            className={`flex w-full flex-col mb-2 ${
              options.length > 0 && 'overflow-y-scroll max-h-[400px] pr-1'
            }`}
          >
            {options.length > 0 ? (
              options.map((option, index) => (
                <PollFormOption
                  key={option.anilistId}
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
          <Button
            className="self-end w-full"
            color="green"
            onClick={() => setIsSearchModalOpen(true)}
          >
            ADD OPTIONS
          </Button>
        </DataDisplay>
      </FormGroup>
      <FormGroup
        id="form-end-date"
        label="End Date"
        className="flex-col items-start justify-between self-end sm:flex-row sm:items-center"
      >
        <DateTimePicker
          value={endDate}
          className="w-full sm:w-auto"
          onChange={(date) => setEndDate(date)}
        />
        <CheckBox
          value={shouldEnableMultipleSelection}
          onChange={(shouldEnable) =>
            setShouldEnableMultipleSelection(shouldEnable)
          }
        >
          Enable multiple selection
        </CheckBox>
        <Button
          disabled={!shouldCreateButtonBeEnabled || isCreatingpoll}
          size="large"
          color="green"
          className="w-full sm:w-auto"
          onClick={onSubmitHandler}
        >
          Create poll
        </Button>
      </FormGroup>
    </Box>
  );
};

export default CreatePollForm;
