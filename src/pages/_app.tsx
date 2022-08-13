import LoadingPage from '@components/core/LoadingPage';
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
      {isLoading ? <LoadingPage /> : <Component {...pageProps} />}
      <ToastContainer />
    </>
  );
};

export default MyApp;
