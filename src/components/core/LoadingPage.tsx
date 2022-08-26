import Page from '@components/core/Page';
import SpinnerGon from '@components/core/SpinnerGon';

interface LoadingPageProps {
  text?: string;
}

const LoadingPage: React.FC<LoadingPageProps> = ({ text = 'Loading...' }) => {
  return (
    <Page
      bgImage="/images/bg-home.jpg"
      className="flex flex-col items-center justify-center text-white gap-4"
    >
      <SpinnerGon />
      <span className="text-sm font-semibold">{text}</span>
    </Page>
  );
};

export default LoadingPage;
