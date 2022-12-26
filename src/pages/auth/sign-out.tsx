import LoadingPage from '@components/core/LoadingPage';
import useUserStore, { EMPTY_USER } from '@store/userStore';
import Cookies from 'js-cookie';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const SignOut: NextPage = () => {
  const { setUser } = useUserStore();
  const router = useRouter();

  const signOut = async () => {
    setUser(EMPTY_USER);
    Cookies.remove('userToken');
    await router.push('/');
  };

  useEffect(() => {
    signOut();
  }, []);

  return <LoadingPage text="Signing out" title="Signing out" />;
};

export default SignOut;
