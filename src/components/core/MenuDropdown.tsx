import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';

interface MenuDropdownProps {
  name?: string;
  items: Array<React.ReactNode>;
  className?: string;
  children: React.ReactNode;
}

const MenuDropdown = ({
  items,
  className = '',
  name = '',
  children,
}: MenuDropdownProps) => {
  return (
    <Menu as="div" className={`${className} relative inline-block text-left`}>
      <Menu.Button name={name}>{children}</Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-50 flex w-[140px] origin-top-left flex-col rounded-sm bg-white text-sm uppercase shadow-md">
          {items}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default MenuDropdown;
