import Box from '@components/core/Box';
import Page from '@components/core/Page';
import CreatePollForm from '@components/poll/create/CreatePollForm';
import { NextPage } from 'next';

const CreatePoll: NextPage = () => {
  return (
    <Page title="Create Poll">
      <Box title="Create poll">
        <CreatePollForm />
      </Box>
    </Page>
  );
};

export default CreatePoll;
