import Head from 'next/head';
import { ReactNode } from 'react';
import Background from './Background';
import Box from './Box';
import PageHeader from './PageHeader';
import Title from './Title';

interface PageLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  headTitle?: string;
  description?: ReactNode | ReactNode[];
  backgroundURL?: string;
  actions?: ReactNode | ReactNode[];
}

const PageLayout = ({
  title = '',
  headTitle = title,
  backgroundURL = '/images/background.jpg',
  className = '',
  description,
  actions,
  children,
}: PageLayoutProps) => {
  return (
    <Background imageURL={backgroundURL}>
      <Head>
        <title>{headTitle}</title>
      </Head>
      <div className="mx-auto mt-10 flex max-w-4xl flex-col gap-6 sm:mt-20">
        <PageHeader />
        <Box className="flex flex-col gap-3">
          <div className="grid grid-cols-1 items-center gap-1 sm:grid-cols-3">
            <div className="col-span-1 flex flex-col sm:col-span-2">
              <Title className="max-h-28 overflow-auto">{title}</Title>
              <h2>{description}</h2>
            </div>
            <div className="sm:justify-self-end">{actions}</div>
          </div>
          <main className={className}>{children}</main>
        </Box>
      </div>
    </Background>
  );
};

export default PageLayout;
