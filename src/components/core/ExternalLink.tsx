import { AnchorHTMLAttributes } from 'react';

const ExternalLink = ({
  children,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement>) => {
  return (
    <a className="text-blue-700" {...rest} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
};

export default ExternalLink;
