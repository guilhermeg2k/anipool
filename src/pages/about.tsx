import Box from '@components/core/Box';
import ExternalLink from '@components/core/ExternalLink';
import Page from '@components/core/Page';
import Title from '@components/core/Title';
import { NextPage } from 'next';
import PackageJSON from '../../package.json';

const VERSION = `${PackageJSON.version}-beta (${PackageJSON.versionName})`;

const About: NextPage = () => {
  return (
    <Page title="About">
      <Box className="flex flex-col gap-3">
        <Title>ABOUT</Title>
        <section className="flex flex-col">
          <span>
            Anipool is an&nbsp;
            <ExternalLink href="https://github.com/guilhermeg2k/anipool">
              open source
            </ExternalLink>
            &nbsp;platform to create anime related quizzes and polls. It
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
            &nbsp;and on my&nbsp;
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
    </Page>
  );
};

export default About;
