import PageLayout from '@components/core/PageLayout';
import CreatePollForm from '@components/poll/create/CreatePollForm';
import { NextPage } from 'next';

const CreatePoll: NextPage = () => {
  return (
    <PageLayout title="Create Poll">
      <CreatePollForm />
    </PageLayout>
  );
};

export default CreatePoll;
