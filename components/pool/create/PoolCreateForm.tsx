import Box from '@components/core/Box';
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

const PoolCreateForm = () => {
  return (
    <Box>
      <TextField id="pool-title" label="Pool title" className="w-full" />
      <FormGroup id="new-option" label="New option">
        <div className="flex gap-2">
          <Select className="w-[220px]" options={POOL_OPTION_TYPES} />
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
    </Box>
  );
};

export default PoolCreateForm;
