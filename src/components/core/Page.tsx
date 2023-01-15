import Head from 'next/head';
import Background from './Background';
import PageHeader from './PageHeader';

interface PageProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  className?: string;
  backgroundURL?: string;
}

const Page = ({
  title = '',
  backgroundURL = '/images/background.jpg',
  className,
  children,
  ...rest
}: PageProps) => {
  return (
    <Background imageURL={backgroundURL}>
      <Head>
        <title>{title}</title>
      </Head>
      <div
        className="mx-auto mt-10 flex max-w-4xl flex-col gap-6 pb-4 sm:mt-20"
        {...rest}
      >
        <PageHeader />
        <main className={className}>{children}</main>
      </div>
    </Background>
  );
};

export default Page;
