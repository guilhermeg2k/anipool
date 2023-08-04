import Background from '@components/core/Background';
import AnilistSignInButton from '@components/core/Button/AnilistSignInButton';
import DiscordSignInButton from '@components/core/Button/DiscordSignInButton';
import MyAnimeListSignInButton from '@components/core/Button/MyAnimeListSignInButton';
import LoadingPage from '@components/core/LoadingPage';
import Logo from '@components/core/Logo';
import useUserStore from '@store/userStore';
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
    <Background
      imageURL="/images/background.jpg"
      className="h-full w-full px-4"
    >
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
          <div className="flex flex-col justify-center gap-2 lg:w-full">
            <AnilistSignInButton />
            <MyAnimeListSignInButton />
            <DiscordSignInButton />
          </div>
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
    </Background>
  );
};

export default Home;
