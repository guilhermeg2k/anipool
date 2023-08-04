import Box from '@components/core/Box';
import ExternalLink from '@components/core/ExternalLink';
import Page from '@components/core/Page';
import PageHeader from '@components/core/PageHeader';
import Title from '@components/core/Title';
import { NextPage } from 'next';
import Head from 'next/head';
import PackageJSON from '../../package.json';

const VERSION = `${PackageJSON.version}-beta (${PackageJSON.versionName})`;

const About: NextPage = () => {
  return (
    <Page bgImage="/images/background.jpg">
      <Head>
        <title>About</title>
      </Head>
      <div className="mx-auto mt-10 sm:mt-20 flex max-w-3xl flex-col gap-6">
        <PageHeader />
        <Box className="flex flex-col gap-3">
          <Title>ABOUT</Title>
          <section className="flex flex-col">
            <h2 className="font-semibold">Description</h2>
            <span>
              Anipool is an&nbsp;
              <ExternalLink href="https://github.com/guilhermeg2k/anipool">
                open source
              </ExternalLink>
              &nbsp;platform that creates anime related quizzes and polls. It
              consumes&nbsp;
              <ExternalLink href="https://anilist.co/">Anilist</ExternalLink>
              &nbsp;API but doesn&apos;t have any relation with Anilist or its
              creators
            </span>
          </section>
          <section className="flex flex-col">
            <h2 className="font-semibold">Contact</h2>
            <span>
              You can find me on&nbsp;
              <ExternalLink href="https://github.com/guilhermeg2k">
                GitHub
              </ExternalLink>
              &nbsp;and if you want to check, there&apos;s my&nbsp;
              <ExternalLink href="https://anilist.co/user/guilhermeg2k/">
                anilist profile
              </ExternalLink>
            </span>
          </section>
          <section className="flex flex-col">
            <h2 className="font-semibold">Terms and Privacy Policy</h2>
            <span>Coming soon.</span>
          </section>
          <section className="flex flex-col">
            <h2 className="font-semibold">Version</h2>
            <span>
              The current version is {VERSION} and you can check its changes
              on&nbsp;
              <ExternalLink href="https://github.com/guilhermeg2k/anipool/releases">
                releases
              </ExternalLink>
            </span>
          </section>
        </Box>
      </div>
    </Page>
  );
};

export default About;
