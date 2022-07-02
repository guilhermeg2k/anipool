import SmallLogo from './SmallLogo';
import UserCard from './UserCard';

const PageHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <SmallLogo />
      <UserCard />
    </div>
  );
};

export default PageHeader;
