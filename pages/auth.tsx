import Page from '@components/core/Page';
import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';

const getAccessTokenFromUrl = (url: string) => {
  /* Anilist OAuth appends access token in a fragment (#), the url will looks like:
      http://localhost:3000/auth#access_token={token}&token_type=Bearer&expires_in={expires_in}
  */
  const urlFragment = url.split('#')[1];
  if (urlFragment) {
    const fragmentParameters = urlFragment.split('&')[0];
    if (fragmentParameters) {
      const accessTokenValue = fragmentParameters.split('=')[1];
      return accessTokenValue;
    }
  }
  return null;
};

const Auth: NextPage = () => {
  const router = useRouter();
  const accessToken = getAccessTokenFromUrl(router.asPath);
  console.log(accessToken);

  return (
    <Page
      bgImage="/images/bg-vote-pool.jpg"
      className="flex flex-col items-center justify-center text-white gap-4"
    >
      <div className="w-[50px]">
        <Image
          src="/images/gon-head.png"
          alt="gon head spinning"
          layout="responsive"
          width={643}
          height={630}
          className="animate-spin"
        />
      </div>
      <span className="text-sm font-semibold">Authenticating</span>
    </Page>
  );
};

export default Auth;
