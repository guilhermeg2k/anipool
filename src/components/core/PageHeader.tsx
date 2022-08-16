import Link from 'next/link';
import Logo from './Logo';
import UserCard from './UserCard';

const PageHeader = () => {
  return (
    <div className="flex flex-col items-center sm:flex-row sm:justify-between">
      <div className="mb-6 sm:mb-0">
        <Link href="/">
          <a>
            <Logo className="text-6xl sm:text-7xl" />
          </a>
        </Link>
      </div>
      <UserCard />
    </div>
  );
};

export default PageHeader;
