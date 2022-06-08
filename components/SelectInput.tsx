import { Listbox, Transition } from '@headlessui/react';
import { SelectorIcon } from '@heroicons/react/outline';
import { Fragment, useMemo } from 'react';

interface SelectInputProps {
  value: any;
  label?: string;
  options: Array<String>;
  onChange: (value: string | number) => void;
}

const SelectInput = ({
  value,
  label = '',
  options,
  onChange = () => {},
}: SelectInputProps) => {
  const onChangeHandler = (value: any) => {
    onChange(value);
  };

  const selectButton = useMemo(() => {
    return (
      <div className="flex justify-between items-center">
        <span>{value ? value : label}</span>
        <SelectorIcon
          className="h-5 w-5 text-neutral-500 group-focus:text-indigo-600 group-hover:text-indigo-900"
          aria-hidden="true"
        />
      </div>
    );
  }, [label, value]);

  const selectItems = useMemo(() => {
    return options.map((option, index) => (
      <Listbox.Option
        key={index}
        value={option}
        className="hover:bg-indigo-500 cursor-pointer p-2 hover:text-white last:rounded-b"
      >
        {option}
      </Listbox.Option>
    ));
  }, [options]);

  return (
    <Listbox value={value} onChange={onChangeHandler}>
      <Listbox.Button
        className="group text-left p-2 rounded-sm border text-neutral-700
                    hover:text-indigo-900 border-neutral-300 focus:border-indigo-600 
                    hover:border-indigo-900 w-[270px]"
      >
        {selectButton}
      </Listbox.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Listbox.Options className="w-[270px] absolute bg-white rounded-b">
          {selectItems}
        </Listbox.Options>
      </Transition>
    </Listbox>
  );
};

export default SelectInput;
