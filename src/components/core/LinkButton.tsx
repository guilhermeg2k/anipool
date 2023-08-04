import Link from 'next/link';
import Button, { ButtonProps } from './Button/Button';

export const LinkButton = ({
  children,
  href,
  ...rest
}: { href: string } & ButtonProps) => {
  return (
    <Link href={href}>
      <a>
        <Button {...rest}>{children}</Button>
      </a>
    </Link>
  );
};
