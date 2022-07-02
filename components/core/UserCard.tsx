import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';

const MENU_OPTIONS = [
  { label: 'About', path: '/about' },
  { label: 'Sign out', path: 'signout' },
];

const UserCard = () => {
  const userInfos = (
    <div className="flex gap-2">
      <Image
        className="rounded-sm"
        src="https://s4.anilist.co/file/anilistcdn/user/avatar/large/b982680-ufSby6V7RirG.jpg"
        alt="Profile picture"
        layout="fixed"
        width={44}
        height={44}
      />
      <div className="flex flex-col justify-center font-roboto">
        <span className="text-sm text-neutral-800">Logged as</span>
        <span className="text-base font-semibold text-indigo-900">
          guilhermeg2k
        </span>
      </div>
    </div>
  );

  const menuItems = MENU_OPTIONS.map((option) => (
    <Menu.Item as="div" key={option.label}>
      <Link href={option.path}>{option.label}</Link>
    </Menu.Item>
  ));

  const menu = (
    <Menu>
      <Menu.Button>
        <ChevronDownIcon className="h-5 w-5 hover:text-indigo-800" />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute z-50 mt-[120px] ml-[120px] w-[140px] origin-top-right rounded-sm bg-white p-4 text-sm uppercase shadow-md">
          {menuItems}
        </Menu.Items>
      </Transition>
    </Menu>
  );

  return (
    <div className="flex w-[225px] items-center justify-between self-end rounded-sm bg-white p-3">
      {userInfos}
      {menu}
    </div>
  );
};

export default UserCard;
