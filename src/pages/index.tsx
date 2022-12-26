import Button from '@components/core/Button';
import LoadingPage from '@components/core/LoadingPage';
import Logo from '@components/core/Logo';
import Page from '@components/core/Page';
import useUserStore from '@store/userStore';
import { openAnilistAuthUrl } from '@utils/utils';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Home: NextPage = () => {
  const { isLogged } = useUserStore();
  const router = useRouter();
  const isUserLogged = isLogged();

  const redirectToMyPollsIfLogged = () => {
    if (isUserLogged) {
      router.push(`me/polls`);
    }
  };

  useEffect(redirectToMyPollsIfLogged, [isLogged]);

  if (isUserLogged) {
    return <LoadingPage title="Anipool" />;
  }

  return (
    <Page bgImage="/images/background.jpg">
      <Head>
        <title>Anipool</title>
      </Head>
      <div className="flex h-full w-full flex-col items-center justify-center lg:flex-row">
        <div className="flex w-full flex-col items-center gap-y-4 lg:w-auto lg:items-start">
          <Logo className="text-7xl lg:text-8xl" />
          <span className="max-w-md text-xl text-white lg:text-2xl">
            Create anime related polls and quizes and share them with your
            friends
          </span>
          <Button
            size="large"
            onClick={openAnilistAuthUrl}
            name="Sign in with anilist"
          >
            Login with anilist
          </Button>

          <Button
            size="large"
            onClick={() =>
              window.open(
                'http://localhost:3000/auth/sign-in/by/discord',
                '_blank'
              )
            }
            name="Sign in with discord"
          >
            Login with discord
          </Button>

          <Button
            size="large"
            onClick={() =>
              window.open(
                'http://localhost:3000/auth/sign-in/by/twitter',
                '_blank'
              )
            }
            name="Sign in with twitter"
          >
            Login with twitter
          </Button>
        </div>
        <div className="hidden w-[550px] self-end lg:block">
          <Image
            src="/images/killuarender.png"
            alt="Killua"
            layout="responsive"
            width={712}
            height={1122}
          />
        </div>
      </div>
    </Page>
  );
};

export default Home;
