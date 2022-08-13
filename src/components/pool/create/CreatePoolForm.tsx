import Box from '@components/core/Box';
import Button from '@components/core/Button';
import CheckBox from '@components/core/CheckBox';
import DataDisplay from '@components/core/DataDisplay';
import DateTimePicker from '@components/core/DateTimePicker/DateTimePicker';
import FormGroup from '@components/core/FormGroup';
import TextField from '@components/core/TextField';
import { TrashIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import SearchOptionModal from './SearchOptionModal';
import { PoolOption } from './types';

const DATE_TIME_NOW = new Date();

interface PoolFormOptionProps {
  id: string;
  type: string;
  text: string;
}

const PoolFormOption = ({ id, type, text }: PoolFormOptionProps) => {
  return (
    <FormGroup id={id} className="flex flex-col sm:flex-row" label="#1 Option">
      <DataDisplay className="flex w-full items-center justify-center sm:w-[180px]">
        {type}
      </DataDisplay>
      <DataDisplay className="flex w-full items-center justify-between uppercase">
        <span>{text}</span>
        <button>
          <TrashIcon className="h-5 w-5 text-red-600" />
        </button>
      </DataDisplay>
    </FormGroup>
  );
};

const CreatePoolForm = () => {
  const [title, setTitle] = useState('');
  const [endDate, setEndDate] = useState(DATE_TIME_NOW);
  const [options, setOptions] = useState(new Array<PoolOption>());
  const [shouldEnableMultipleSelection, setShouldEnableMultipleSelection] =
    useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const shouldCreateButtonBeEnabled =
    title && endDate !== DATE_TIME_NOW && options.length > 1;

  const onAddOptionHandler = (option: PoolOption) => {
    const newOptions = [...options];
    newOptions.push(option);
    setOptions(newOptions);
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
        id="pool-title"
        label="Pool title"
        placeHolder="What anime should i watch next?"
        className="w-full"
        onChange={(title) => setTitle(title)}
      />
      <FormGroup label="Options">
        <DataDisplay className="flex w-full flex-col">
          <Button
            className="self-end"
            color="green"
            onClick={() => setIsSearchModalOpen(true)}
          >
            <span className="px-9">ADD</span>
          </Button>
          {options.length > 0 ? (
            options.map(({ id, type, text }) => (
              <PoolFormOption
                key={id}
                id={id.toString()}
                type={type}
                text={text}
              />
            ))
          ) : (
            <span className="self-center text-sm uppercase">
              Add options to visualize here
            </span>
          )}
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
          disabled={!shouldCreateButtonBeEnabled}
          size="large"
          color="green"
          className="w-full sm:w-auto"
        >
          Create pool
        </Button>
      </FormGroup>
    </Box>
  );
};

export default CreatePoolForm;
