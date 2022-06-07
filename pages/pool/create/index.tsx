import { NextPage } from 'next';
import { useState } from 'react';
import Box from '../../../components/Box';
import Page from '../../../components/Page';
import SmallLogo from '../../../components/SmallLogo';
import TextInput from '../../../components/TextInput';

const CreatePool: NextPage = () => {
  const [poolTitle, setPoolTitle] = useState('');

  return (
    <Page bgImage="/images/bg-create-pool.jpg">
      <div className="mx-auto max-w-3xl">
        <SmallLogo />
        <Box>
          <TextInput
            id="pool-title"
            value={poolTitle}
            label="Pool Title"
            fullWidth
            onChange={(value: string) => setPoolTitle(value)}
            maxLength={10}
          />
        </Box>
      </div>
    </Page>
  );
};

export default CreatePool;
