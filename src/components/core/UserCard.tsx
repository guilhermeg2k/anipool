import { Menu } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import useUserStore from '@store/userStore';
import { openAnilistAuthUrl } from '@utils/utils';
import Image from 'next/image';
import Link from 'next/link';
import Button from './Button';
import MenuDropdown from './MenuDropdown';

const MENU_LINKS = [
  { id: 1, label: 'About', path: '/about' },
  { id: 2, label: 'Sign out', path: '/auth/sign-out' },
];

const UserCard = () => {
  const { avatarUrl, nickname } = useUserStore();
  const isLogged = Boolean(nickname);

  const menuItems = MENU_LINKS.map((link) => (
    <Menu.Item as={Link} key={link.id} href={link.path}>
      <span className="cursor-pointer rounded-sm p-2 hover:bg-indigo-500 hover:text-white">
        {link.label}
      </span>
    </Menu.Item>
  ));

  return (
    <div className="flex w-full items-center justify-between self-end rounded-sm bg-white p-3 sm:w-[225px]">
      {isLogged ? (
        <>
          <div className="flex gap-2">
            <Image
              className="rounded-sm"
              src={avatarUrl}
              alt="Profile picture"
              layout="fixed"
              width={44}
              height={44}
            />
            <div className="font-robot flex flex-col justify-center ">
              <span className="text-sm leading-none text-neutral-800">
                Logged as
              </span>
              <span className="text-base font-semibold text-indigo-900">
                {nickname}
              </span>
            </div>
          </div>

          <MenuDropdown items={menuItems} className="h-[20px]">
            <div>
              <ChevronDownIcon className="h-5 w-5 hover:text-indigo-700" />
            </div>
          </MenuDropdown>
        </>
      ) : (
        <div className="flex justify-center w-full">
          <Button onClick={openAnilistAuthUrl}>Sign in</Button>
        </div>
      )}
    </div>
  );
};

export default UserCard;
