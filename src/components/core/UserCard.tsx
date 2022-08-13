import { Menu } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import useUserStore from '@store/userStore';
import Image from 'next/image';
import Link from 'next/link';
import MenuDropdown from './MenuDropdown';

const MENU_LINKS = [
  { id: 1, label: 'About', path: '/about' },
  { id: 2, label: 'Sign out', path: 'signout' },
];

const UserCard = () => {
  const { user } = useUserStore();

  const userInfos = (
    <div className="flex gap-2">
      <Image
        className="rounded-sm"
        src={user.avatarUrl}
        alt="Profile picture"
        layout="fixed"
        width={44}
        height={44}
      />
      <div className="font-robot flex flex-col justify-center ">
        <span className="text-sm leading-none text-neutral-800">Logged as</span>
        <span className="text-base font-semibold text-indigo-900">
          {user.nickname}
        </span>
      </div>
    </div>
  );

  const menuItems = MENU_LINKS.map((link) => (
    <Menu.Item as={Link} key={link.id} href={link.path}>
      <span className="cursor-pointer rounded-sm p-2 hover:bg-indigo-500 hover:text-white">
        {link.label}
      </span>
    </Menu.Item>
  ));

  return (
    <div className="flex w-full items-center justify-between self-end rounded-sm bg-white p-3 sm:w-[225px]">
      {userInfos}
      <MenuDropdown items={menuItems} className="h-[20px]">
        <div>
          <ChevronDownIcon className="h-5 w-5 hover:text-indigo-700" />
        </div>
      </MenuDropdown>
    </div>
  );
};

export default UserCard;
