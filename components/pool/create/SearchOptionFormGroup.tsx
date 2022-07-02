import Button from '@components/core/Button';
import FormGroup from '@components/core/FormGroup';
import Select from '@components/core/Select';
import TextField from '@components/core/TextField';

const POOL_OPTION_TYPES = [
  { id: 1, label: 'ANIME', value: 'ANIME' },
  { id: 2, label: 'MANGA', value: 'MANGA' },
  { id: 3, label: 'CHARACTER', value: 'CHARACTER' },
  { id: 4, label: 'TEXT', value: 'TEXT' },
];

const SearchOptionFormGroup = () => {
  return (
    <FormGroup
      className="w-full flex-col sm:flex-row"
      id="new-option"
      label="New option"
    >
      <Select className="w-full sm:w-[220px]" options={POOL_OPTION_TYPES} />
      <div className="flex w-full gap-2">
        <TextField
          id="new-option-search-text"
          placeHolder="Search text"
          className="w-full"
        />
        <Button className="bg-indigo-900 hover:bg-indigo-800 active:bg-indigo-900">
          Search
        </Button>
      </div>
    </FormGroup>
  );
};

export default SearchOptionFormGroup;
