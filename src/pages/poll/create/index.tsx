import Page from '@components/core/Page';
import PageHeader from '@components/core/PageHeader';
import PoolCreateForm from '@components/poll/create/CreatePoolForm';
import { NextPage } from 'next';
import Head from 'next/head';

const CreatePool: NextPage = () => {
  return (
    <Page bgImage="/images/bg-create-pool.jpg">
      <Head>
        <title>create poll</title>
      </Head>
      <div className="mx-auto mt-20 flex max-w-3xl flex-col gap-6">
        <PageHeader />
        <PoolCreateForm />
      </div>
    </Page>
  );
};

export default CreatePool;
