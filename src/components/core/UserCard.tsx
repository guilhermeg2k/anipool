import { Menu } from '@headlessui/react';
import {
  ArrowRightOnRectangleIcon,
  Bars3Icon,
} from '@heroicons/react/24/outline';
import useUserStore from '@store/userStore';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Button from './Button/Button';
import MenuDropdown from './MenuDropdown';
import SignInModal from './SignInModal';

const MENU_LINKS = [
  { id: 1, label: 'My Polls', path: '/me/polls' },
  { id: 2, label: 'Create new poll', path: '/poll/create' },
  { id: 3, label: 'About', path: '/about' },
  { id: 4, label: 'Sign out', path: '/auth/sign-out' },
];

const UserCard = () => {
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const { avatarUrl, nickname, isLogged } = useUserStore();
  const isUserLogged = isLogged();
  const router = useRouter();
  const isOnVotePage = router.asPath.includes('/vote/');

  const menuItems = MENU_LINKS.map((link) => (
    <Menu.Item as={Link} key={link.id} href={link.path}>
      <a className="cursor-pointer rounded-sm p-2 hover:bg-indigo-500 hover:text-white">
        {link.label}
      </a>
    </Menu.Item>
  ));

  useEffect(() => {
    if (!isUserLogged && isOnVotePage) {
      setIsSignInModalOpen(true);
    }
  }, []);

  return (
    <div className="flex w-full items-center justify-between self-end rounded-sm bg-white p-3 sm:w-[225px]">
      {isSignInModalOpen && (
        <SignInModal
          open={isSignInModalOpen}
          onClose={() => setIsSignInModalOpen(false)}
        />
      )}
      {isUserLogged ? (
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

          <MenuDropdown items={menuItems} className="h-[20px]" name="Menu">
            <Bars3Icon className="h-5 w-5 hover:text-indigo-700" />
          </MenuDropdown>
        </>
      ) : (
        <div className="flex items-center w-full">
          <Button
            onClick={() => setIsSignInModalOpen(true)}
            color="white"
            className="w-full"
            name="Sign in"
          >
            Sign in
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserCard;
