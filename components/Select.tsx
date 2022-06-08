import { Listbox, Transition } from '@headlessui/react';
import { SelectorIcon } from '@heroicons/react/outline';
import { Fragment, useMemo } from 'react';

interface SelectOption {
  label: React.ReactNode;
  value: any;
}

interface SelectProps {
  value: any;
  label?: string;
  fullWidth?: boolean;
  options: Array<SelectOption>;
  onChange: (value: any) => void;
}

const Select = ({
  value,
  label = '',
  fullWidth = false,
  options,
  onChange = () => {},
}: SelectProps) => {
  const selectButton = useMemo(() => {
    const selectedOption = options.find((option) => option.value === value);
    return (
      <div className="flex justify-between items-center">
        <span>{selectedOption ? selectedOption.label : label}</span>
        <SelectorIcon className="h-5 w-5 text-neutral-500" aria-hidden="true" />
      </div>
    );
  }, [label, value, options]);

  const selectItems = useMemo(() => {
    return options.map((option, index) => (
      <Listbox.Option
        key={index}
        value={option.value}
        className="hover:bg-indigo-500 cursor-pointer p-2 text-neutral-600 
                  hover:text-white last:rounded-b"
      >
        {option.label}
      </Listbox.Option>
    ));
  }, [options]);

  const size = useMemo(() => (fullWidth ? 'w-full' : 'w-[270px]'), [fullWidth]);

  return (
    <Listbox value={value} onChange={onChange}>
      <Listbox.Button
        className={`group text-left p-2 rounded-sm border text-neutral-600 
                  border-neutral-300 focus:border-indigo-600 
                  hover:border-indigo-900 ${size}`}
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
        <Listbox.Options className={`absolute bg-white rounded-b ${size}`}>
          {selectItems}
        </Listbox.Options>
      </Transition>
    </Listbox>
  );
};

export default Select;
