import Box from '@components/core/Box';
import Button from '@components/core/Button';
import CheckBox from '@components/core/CheckBox';
import DataDisplay from '@components/core/DataDisplay';
import DateTimePicker from '@components/core/DateTimePicker/DateTimePicker';
import FormGroup from '@components/core/FormGroup';
import TextField from '@components/core/TextField';
import { useState } from 'react';
import PoolFormOption from './PoolFormOption';
import SearchOptionModal from './SearchOptionModal';
import { PoolOption } from './types';

const DATE_TIME_NOW = new Date();

const CreatePoolForm = () => {
  const [title, setTitle] = useState('');
  const [endDate, setEndDate] = useState(DATE_TIME_NOW);
  const [optionsList, setOptionsList] = useState(new Array<PoolOption>());
  const [shouldEnableMultipleSelection, setShouldEnableMultipleSelection] =
    useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(true);

  const onChangeTitleHandler = (title: string) => {
    setTitle(title);
  };

  const onChangeEndDateHandler = (date: Date) => {
    setEndDate(date);
  };

  const onChangeShouldEnableMultipleSelectionHandler = (
    shouldEnable: boolean
  ) => {
    setShouldEnableMultipleSelection(shouldEnable);
  };

  const onOpenSearchModalHandler = () => {
    setIsSearchModalOpen(true);
  };

  const onCloseSearchModalHandler = () => {
    setIsSearchModalOpen(false);
  };

  const onAddOptionHandler = (option: PoolOption) => {
    const newOptions = [...optionsList];
    newOptions.push(option);
    setOptionsList(newOptions);
  };

  const options = optionsList.map(({ id, type, text }) => (
    <PoolFormOption key={id} id={id.toString()} type={type} text={text} />
  ));

  const shouldCreateButtonBeEnabled =
    title && endDate !== DATE_TIME_NOW && optionsList.length > 1;

  return (
    <Box>
      <SearchOptionModal
        open={isSearchModalOpen}
        onAddOption={onAddOptionHandler}
        onClose={onCloseSearchModalHandler}
      />

      <TextField
        value={title}
        id="pool-title"
        label="Pool title"
        placeHolder="What anime should i watch next?"
        className="w-full"
        onChange={onChangeTitleHandler}
      />
      <FormGroup label="Options">
        <DataDisplay className="flex w-full flex-col">
          <Button
            className="self-end"
            color="green"
            onClick={onOpenSearchModalHandler}
          >
            <span className="px-9">ADD</span>
          </Button>
          {options.length > 0 ? (
            options
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
          onChange={onChangeEndDateHandler}
        />
        <CheckBox
          value={shouldEnableMultipleSelection}
          onChange={onChangeShouldEnableMultipleSelectionHandler}
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
