import { Listbox, Transition } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/24/outline';
import { Fragment } from 'react';

interface SelectOption<T> {
  id: number;
  label: React.ReactNode;
  value: T;
}

interface SelectProps<T> {
  id?: string;
  value: T;
  label?: React.ReactNode;
  className?: string;
  options: Array<SelectOption<T>>;
  onChange: (value: T) => void;
}

const Select = <T extends unknown>({
  id = '',
  value,
  className = '',
  label = '',
  options,
  onChange = () => {},
}: SelectProps<T>) => {
  const selectedOption = options.find((option) => option.value === value);

  const selectButton = (
    <div id={id} className="flex items-center justify-between">
      <span>{selectedOption ? selectedOption.label : label}</span>
      <ChevronUpDownIcon
        className="h-5 w-5 text-neutral-500"
        aria-hidden="true"
      />
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
                  text-center outline-none
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
          className={`absolute min-w-[125px] rounded-b bg-white shadow-md z-20`}
        >
          {selectItems}
        </Listbox.Options>
      </Transition>
    </Listbox>
  );
};

export default Select;
