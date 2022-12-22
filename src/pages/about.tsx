import Box from '@components/core/Box';
import ExternalLink from '@components/core/ExternalLink';
import Page from '@components/core/Page';
import PageHeader from '@components/core/PageHeader';
import Title from '@components/core/Title';
import { NextPage } from 'next';
import Head from 'next/head';
import PackageJSON from '../../package.json';

const VERSION = `Version ${PackageJSON.version}-beta (${PackageJSON.versionName})`;

const About: NextPage = () => {
  return (
    <Page bgImage="/images/bg-home.jpg">
      <Head>
        <title>About</title>
      </Head>
      <div className="mx-auto mt-20 flex max-w-3xl flex-col gap-6">
        <PageHeader />
        <Box className="flex flex-col gap-3">
          <Title>ABOUT</Title>

          <div className="flex flex-col">
            <span>
              Anipool is an open source platform to create anime quizes and
              polls. It consumes&nbsp;
              <ExternalLink href="https://anilist.co/">Anilist</ExternalLink>
              &nbsp;API but it doesn&apos;t has any relation with Anilist or its
              creators.
            </span>
            <span>
              You can find my on&nbsp;
              <ExternalLink href="https://github.com/guilhermeg2k">
                GitHub
              </ExternalLink>
              &nbsp; and if you want to check check there&apos;s my&nbsp;
              <ExternalLink href="https://anilist.co/user/guilhermeg2k/">
                Anilist Profile
              </ExternalLink>
            </span>
          </div>

          <div className="text-xs font-semibold uppercase self-end flex flex-col items-end">
            <ExternalLink href="https://github.com/guilhermeg2k/anipool/blob/develop/CHANGELOG.md">
              Change Logs
            </ExternalLink>
            <span>{VERSION}</span>
          </div>
        </Box>
      </div>
    </Page>
  );
};

export default About;
