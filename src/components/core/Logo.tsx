import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <h1 className={twMerge(`text-white text-lg uppercase`, className)}>
      <span>anipool</span>
    </h1>
  );
};

export default Logo;
