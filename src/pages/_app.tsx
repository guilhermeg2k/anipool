import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import userService from '@services/userService';
import useUserStore from '@store/userStore';

function MyApp({ Component, pageProps }: AppProps) {
  const { setUser } = useUserStore();

  const loadUser = async () => {
    const user = await userService.getCurrentUser();
    setUser(user);
  };

  useEffect(() => {
    loadUser();
  }, []);
  return <Component {...pageProps} />;
}

export default MyApp;
