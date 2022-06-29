import { Listbox, Transition } from '@headlessui/react';
import { SelectorIcon } from '@heroicons/react/outline';
import { Fragment, useMemo } from 'react';

interface SelectOption {
  label: React.ReactNode;
  value: any;
}

interface SelectProps {
  value: any;
  label?: React.ReactNode;
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
  const size = fullWidth ? 'w-full' : 'w-[270px]';
  const selectedOption = options.find((option) => option.value === value);

  const selectButton = (
    <div className="flex items-center justify-between">
      <span>{selectedOption ? selectedOption.label : label}</span>
      <SelectorIcon className="h-5 w-5 text-neutral-500" aria-hidden="true" />
    </div>
  );

  const selectItems = (
    <>
      {options.map((option, index) => (
        <Listbox.Option
          key={index}
          value={option.value}
          className="cursor-pointer p-2 text-neutral-600 last:rounded-b 
                    hover:bg-indigo-500 hover:text-white"
        >
          {option.label}
        </Listbox.Option>
      ))}
    </>
  );

  return (
    <Listbox value={value} onChange={onChange}>
      <Listbox.Button
        className={`group rounded-sm border border-neutral-300 p-2 text-left 
                  text-neutral-600 hover:border-indigo-900 
                  focus:border-indigo-600 ${size}`}
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
        <Listbox.Options className={`absolute rounded-b bg-white ${size}`}>
          {selectItems}
        </Listbox.Options>
      </Transition>
    </Listbox>
  );
};

export default Select;
