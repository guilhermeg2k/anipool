import type { NextPage } from 'next';
import Image from 'next/image';
import Button from '@components/core/Button';
import Logo from '@components/core/Logo';
import Page from '@components/core/Page';

const Home: NextPage = () => {
  return (
    <Page bgImage="/images/bg-home.jpg">
      <div className="flex h-full w-full flex-col items-center justify-center lg:flex-row">
        <div className="flex w-full flex-col items-center gap-y-4 lg:w-auto lg:items-start">
          <Logo />
          <span className="max-w-md text-xl text-white lg:text-2xl">
            Create anime quiz pools integrated with anilist.co
          </span>
          <Button size="large">Login with anilist</Button>
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
