import { Listbox, Transition } from '@headlessui/react';
import { SelectorIcon } from '@heroicons/react/outline';
import { Fragment } from 'react';

interface SelectOption {
  id: number;
  label: React.ReactNode;
  value: any;
}

interface SelectProps {
  value: any;
  label?: React.ReactNode;
  className: string;
  options: Array<SelectOption>;
  onChange: (value: any) => void;
}

const Select = ({
  value,
  className = '',
  label = '',
  options,
  onChange = () => {},
}: SelectProps) => {
  const selectedOption = options.find((option) => option.value === value);

  const selectButton = (
    <div className="flex items-center justify-between">
      <span>{selectedOption ? selectedOption.label : label}</span>
      <SelectorIcon className="h-5 w-5 text-neutral-500" aria-hidden="true" />
    </div>
  );

  const selectItems = options.map((option) => (
    <Listbox.Option
      key={option.id}
      value={option.value}
      className="cursor-pointer p-2 last:rounded-b  
                    hover:bg-indigo-500 hover:text-white"
    >
      {option.label}
    </Listbox.Option>
  ));

  return (
    <Listbox
      as="div"
      value={value}
      className={`flex ${className} min-w-[125px]`}
      onChange={onChange}
    >
      <Listbox.Button
        className={`group w-full rounded-sm border border-neutral-300 p-2 
                   text-left 
                  hover:border-indigo-900 focus:border-indigo-600`}
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
        <Listbox.Options
          className={`absolute min-w-[125px] rounded-b bg-white shadow-md`}
        >
          {selectItems}
        </Listbox.Options>
      </Transition>
    </Listbox>
  );
};

export default Select;
