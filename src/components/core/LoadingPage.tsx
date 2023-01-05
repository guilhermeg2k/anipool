import Background from '@components/core/Background';
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
    <Background
      imageURL="/images/background.jpg"
      className="flex flex-col items-center justify-center gap-4 text-white"
    >
      <Head>
        <title>{title}</title>
      </Head>
      <SpinnerGon />
      <span className="text-sm font-semibold">{text}</span>
    </Background>
  );
};

export default LoadingPage;
