import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';

interface MenuDropdownProps {
  items: Array<React.ReactNode>;
  children: React.ReactNode;
}

const MenuDropdown = ({ items, children }: MenuDropdownProps) => {
  return (
    <Menu>
      <Menu.Button>{children}</Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute z-50 mt-[120px] ml-[120px] flex w-[140px] origin-top-right flex-col rounded-sm bg-white text-sm uppercase shadow-md">
          {items}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default MenuDropdown;
