import Page from '@components/core/Page';
import SpinnerGon from '@components/core/SpinnerGon';
import { toastError } from '@libs/toastify';
import userService from '@services/userService';
import useUserStore from '@store/userStore';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { setUser } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);

  const loadUser = async () => {
    try {
      setIsLoading(true);
      const user = await userService.getCurrentUser();
      setUser(user);
      setIsLoading(false);
    } catch (error) {
      toastError('Failed to load user data');
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <>
      {isLoading ? (
        <Page
          bgImage="/images/bg-home.jpg"
          className="flex flex-col items-center justify-center text-white gap-4"
        >
          <SpinnerGon />
          <span className="text-sm font-semibold">Loading</span>
        </Page>
      ) : (
        <Component {...pageProps} />
      )}
      <ToastContainer />
    </>
  );
};

export default MyApp;
