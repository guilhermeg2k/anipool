import Page from '@components/core/Page';
import SpinnerGon from '@components/core/SpinnerGon';
import Head from 'next/head';

interface LoadingPageProps {
  text?: string;
  title?: string;
}

const LoadingPage: React.FC<LoadingPageProps> = ({
  text = 'Loading...',
  title = text,
}) => {
  return (
    <Page
      bgImage="/images/background.jpg"
      className="flex flex-col items-center justify-center text-white gap-4"
    >
      <Head>
        <title>{title}</title>
      </Head>
      <SpinnerGon />
      <span className="text-sm font-semibold">{text}</span>
    </Page>
  );
};

export default LoadingPage;
