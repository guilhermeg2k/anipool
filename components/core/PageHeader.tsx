import SmallLogo from './SmallLogo';
import UserCard from './UserCard';

const PageHeader = () => {
  return (
    <div className="flex flex-col items-center sm:flex-row sm:justify-between">
      <div className="mb-6 sm:mb-0">
        <SmallLogo />
      </div>
      <UserCard />
    </div>
  );
};

export default PageHeader;
