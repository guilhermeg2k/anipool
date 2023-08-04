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
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Background imageURL={backgroundURL} className="h-screen w-full">
        <div
          className={`mx-auto flex max-w-4xl flex-col gap-6 px-4 pt-10 pb-4 sm:pb-8 sm:pt-20 lg:px-0 ${className}`}
          {...rest}
        >
          <PageHeader />
          {children}
        </div>
      </Background>
    </>
  );
};

export default Page;
