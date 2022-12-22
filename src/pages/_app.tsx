import LoadingPage from '@components/core/LoadingPage';
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
  const [isLoading, setIsLoading] = useState(true);

  const loadUser = async () => {
    try {
      setIsLoading(true);
      const user = await userService.getCurrentUser();
      setUser(user);
    } catch (error) {
      toastError('Failed to load user data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <>
      <Component {...pageProps} />
      <ToastContainer />
    </>
  );
};

export default MyApp;
