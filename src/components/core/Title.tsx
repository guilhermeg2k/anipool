import { HTMLAttributes } from 'react';

const Title = ({
  children,
  className = '',
  ...rest
}: HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <h1
      className={`font-roboto text-base font-semibold uppercase text-indigo-800 md:text-xl ${className}`}
      {...rest}
    >
      {children}
    </h1>
  );
};

export default Title;
