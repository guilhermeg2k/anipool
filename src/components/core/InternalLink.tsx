import Link from 'next/link';

interface InternalLinkProps {
  children: React.ReactNode;
  href: string;
}

const InternalLink = ({ children, href }: InternalLinkProps) => {
  return (
    <Link href={href}>
      <a className="text-blue-700">{children}</a>
    </Link>
  );
};

export default InternalLink;
