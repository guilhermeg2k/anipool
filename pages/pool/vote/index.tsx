import Page from '@components/core/Page';
import PageHeader from '@components/core/PageHeader';
import VoteForm from '@components/pool/vote/VoteForm';
import { NextPage } from 'next';

const CreatePool: NextPage = () => {
  return (
    <Page bgImage="/images/bg-vote-pool.jpg">
      <div className="mx-auto mt-20 flex max-w-4xl flex-col gap-6">
        <PageHeader />
        <VoteForm />
      </div>
    </Page>
  );
};

export default CreatePool;
