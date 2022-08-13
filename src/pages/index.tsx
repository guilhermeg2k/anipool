import Button from '@components/core/Button';
import Logo from '@components/core/Logo';
import Page from '@components/core/Page';
import useUserStore from '@store/userStore';
import type { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const { id } = useUserStore();
  const router = useRouter();
  const isLogged = Boolean(id);
  const anilistClientId = process.env.NEXT_PUBLIC_ANILIST_CLIENT_ID;
  const anilistAuthURL = `https://anilist.co/api/v2/oauth/authorize?client_id=${anilistClientId}&response_type=token`;

  return (
    <Page bgImage="/images/bg-home.jpg">
      <div className="flex h-full w-full flex-col items-center justify-center lg:flex-row">
        <div className="flex w-full flex-col items-center gap-y-4 lg:w-auto lg:items-start">
          <Logo className="text-7xl lg:text-8xl" />
          <span className="max-w-md text-xl text-white lg:text-2xl">
            Create anime quiz pools integrated with anilist.co
          </span>
          {isLogged ? (
            <Button
              className="min-w-[250px]"
              size="large"
              onClick={() => router.push('/pool/create')}
            >
              Create Pool
            </Button>
          ) : (
            <Button
              size="large"
              onClick={() => window.open(anilistAuthURL, '_self')}
            >
              Login with anilist
            </Button>
          )}
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
