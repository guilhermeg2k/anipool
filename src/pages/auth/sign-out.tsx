import LoadingPage from '@components/core/LoadingPage';
import useUserStore, { EMPTY_USER } from '@store/userStore';
import Cookies from 'js-cookie';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const SignOut: NextPage = () => {
  const { setUser } = useUserStore();
  const router = useRouter();

  const signOut = () => {
    setUser(EMPTY_USER);
    Cookies.remove('userToken');
    router.push('/');
  };

  useEffect(() => {
    signOut();
  }, []);

  return <LoadingPage text="Signing out" />;
};

export default SignOut;
