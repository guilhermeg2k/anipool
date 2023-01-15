import Box from '@components/core/Box';
import ExternalLink from '@components/core/ExternalLink';
import Page from '@components/core/Page';
import { NextPage } from 'next';
import PackageJSON from '../../package.json';

const VERSION = `${PackageJSON.version}-beta (${PackageJSON.versionName})`;

const About: NextPage = () => {
  return (
    <Page title="About">
      <Box title="About" className="flex flex-col gap-3">
        <section className="flex flex-col">
          <h2 className="font-semibold">Description</h2>
          <span>
            Anipool is an&nbsp;
            <ExternalLink href="https://github.com/guilhermeg2k/anipool">
              open source
            </ExternalLink>
            &nbsp;platform to create anime related quizes and polls. It
            consumes&nbsp;
            <ExternalLink href="https://anilist.co/">Anilist</ExternalLink>
            &nbsp;API but it doesn&apos;t has any relation with Anilist or its
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
            &nbsp;and if you want to check check there&apos;s my&nbsp;
            <ExternalLink href="https://anilist.co/user/guilhermeg2k/">
              anilist profile
            </ExternalLink>
          </span>
        </section>
        <section className="flex flex-col">
          <h2 className="font-semibold">Terms and Privacy Policy</h2>
          <span>Coming soon</span>
        </section>
        <section className="flex flex-col">
          <h2 className="font-semibold">Version</h2>
          <span>
            Current version is {VERSION} and you can check its changes on&nbsp;
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
