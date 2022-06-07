import type { NextPage } from 'next';
import Image from 'next/image';
import Button from '../components/general/Button';
import Logo from '../components/general/Logo';
import Page from '../components/general/Page';

const Home: NextPage = () => {
  return (
    <Page bgImage="images/bg-home.jpg">
      <div className="w-full h-full flex flex-col lg:flex-row justify-center items-center">
        <div className="flex flex-col gap-y-4 items-center lg:items-start w-full lg:w-auto">
          <Logo />
          <span className="text-white text-xl lg:text-2xl max-w-md">
            Create anime quiz pools integrated with anilist.co
          </span>
          <Button
            className="bg-indigo-900 hover:bg-indigo-800 active:bg-indigo-900"
            fullscreen
          >
            Login with anilist
          </Button>
        </div>
        <div className="hidden lg:block self-end w-[550px]">
          <Image
            src="/images/killuarender.png"
            alt="Killua"
            layout='responsive'
            width={712}
            height={1122}
          />
        </div>
      </div>
    </Page>
  );
};

export default Home;
