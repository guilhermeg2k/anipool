import Button from '@components/core/Button';
import FormGroup from '@components/core/FormGroup';
import Select from '@components/core/Select';
import TextField from '@components/core/TextField';
import { useState } from 'react';

const POOL_OPTION_TYPES = [
  { id: 1, label: 'ANIME', value: 'ANIME' },
  { id: 2, label: 'MANGA', value: 'MANGA' },
  { id: 3, label: 'CHARACTER', value: 'CHARACTER' },
];

interface SearchOptionFormGroupProps {
  onSearch: () => void;
}

const SearchOptionFormGroup = ({ onSearch }: SearchOptionFormGroupProps) => {
  const [type, setType] = useState(POOL_OPTION_TYPES[0].value);
  const [text, setText] = useState('');

  const onChangeTypeHandler = (type: string) => {
    setType(type);
  };

  const onChangeTextHandler = (text: string) => {
    setText(text);
  };

  return (
    <div className="flex w-full flex-col gap-2 sm:flex-row">
      <Select
        className="w-full sm:w-[220px]"
        options={POOL_OPTION_TYPES}
        value={type}
        onChange={onChangeTypeHandler}
      />
      <div className="flex w-full gap-2">
        <TextField
          id="search-option-text"
          placeHolder="Hunter x Hunter"
          value={text}
          className="w-full"
          onChange={onChangeTextHandler}
        />
        <Button
          className="bg-indigo-900 hover:bg-indigo-800 active:bg-indigo-900"
          onClick={onSearch}
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default SearchOptionFormGroup;
