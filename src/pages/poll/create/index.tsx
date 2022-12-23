import Page from '@components/core/Page';
import PageHeader from '@components/core/PageHeader';
import CreatePollForm from '@components/poll/create/CreatePollForm';
import { NextPage } from 'next';
import Head from 'next/head';

const CreatePoll: NextPage = () => {
  return (
    <Page bgImage="/images/background.jpg">
      <Head>
        <title>Create Poll</title>
      </Head>
      <div className="mx-auto mt-20 flex max-w-3xl flex-col gap-6">
        <PageHeader />
        <CreatePollForm />
      </div>
    </Page>
  );
};

export default CreatePoll;
