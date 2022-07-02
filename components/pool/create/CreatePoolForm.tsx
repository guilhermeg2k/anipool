import Box from '@components/core/Box';
import Button from '@components/core/Button';
import CheckBox from '@components/core/CheckBox';
import DateTimePicker from '@components/core/DateTimePicker/DateTimePicker';
import FormGroup from '@components/core/FormGroup';
import TextField from '@components/core/TextField';
import PoolFormOption from './PoolFormOption';
import SearchOptionFormGroup from './SearchOptionFormGroup';

const CreatePoolForm = () => {
  const createdOptions = (
    <PoolFormOption id="1-2" type="MANGA" text="Kimetsu no Yaiba" />
  );

  return (
    <Box>
      <TextField id="pool-title" label="Pool title" className="w-full" />
      <SearchOptionFormGroup />
      {createdOptions}
      <FormGroup
        id="form-end-date"
        label="End Date"
        className="flex-col items-start justify-between self-end sm:flex-row sm:items-center"
      >
        <DateTimePicker className="w-full sm:w-[200px]" />
        <CheckBox>Enable multiple selection</CheckBox>
        <Button
          size="large"
          className="w-full bg-green-500 hover:bg-green-400 active:bg-green-500 sm:w-auto"
        >
          Create pool
        </Button>
      </FormGroup>
    </Box>
  );
};

export default CreatePoolForm;
