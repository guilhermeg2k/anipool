import Box from '@components/core/Box';
import Page from '@components/core/Page';
import PageHeader from '@components/core/PageHeader';
import { NextPage } from 'next';

const About: NextPage = () => {
  return (
    <Page bgImage="/images/bg-home.jpg">
      <div className="mx-auto mt-20 flex max-w-3xl flex-col gap-6">
        <PageHeader />
        <Box>
          <h1 className="text-2xl">About</h1>
          <span className="text-sm">
            Anipool is a platform to create anime related quizes.
            <br />
            It consumes&nbsp;
            <a
              href="https://anilist.co/"
              className="text-blue-700"
              target="_blank"
              rel="noreferrer"
            >
              Anilist
            </a>
            &nbsp;API but it doesn&apos;t has any relation with Anilist or its
            creators.
            <br />
            You can find my on&nbsp;
            <a
              href="https://github.com/guilhermeg2k"
              target="_blank"
              rel="noreferrer"
              className="text-blue-700"
            >
              GitHub
            </a>
            <br /> And if you want to check check, there&apos;s my &nbsp;
            <a
              href="https://anilist.co/user/guilhermeg2k/"
              target="_blank"
              rel="noreferrer"
              className="text-blue-700"
            >
              Anilist profile
            </a>
          </span>
        </Box>
      </div>
    </Page>
  );
};

export default About;
