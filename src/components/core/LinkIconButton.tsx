import Link from 'next/link';
import IconButton from './IconButton';
import { ButtonHTMLAttributes } from 'react';

export const LinkIconButton = ({
  children,
  title,
  disabled,
  href,
  ...rest
}: { href: string } & ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <Link href={href}>
      <a>
        <IconButton title={title} disabled={disabled} {...rest}>
          {children}
        </IconButton>
      </a>
    </Link>
  );
};
