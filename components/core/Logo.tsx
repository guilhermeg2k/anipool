import { twMerge } from 'tailwind-merge';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <h1
      className={twMerge(
        `text-white text-lg font-cursive uppercase`,
        className
      )}
    >
      Anipool
    </h1>
  );
};

export default Logo;
