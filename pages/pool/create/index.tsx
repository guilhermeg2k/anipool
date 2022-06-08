import { NextPage } from 'next';
import { useState } from 'react';
import Box from '../../../components/Box';
import Page from '../../../components/Page';
import SelectInput from '../../../components/SelectInput';
import SmallLogo from '../../../components/SmallLogo';

const people = ['ANIME', 'CHARACTER', 'MANGA'];

const CreatePool: NextPage = () => {
  const [poolTitle, setPoolTitle] = useState('');

  return (
    <Page bgImage="/images/bg-create-pool.jpg">
      <div className="mx-auto max-w-3xl">
        <SmallLogo />
        <Box>
          <div className="m-2">
            <SelectInput
              value={poolTitle}
              label="Pool Title"
              onChange={(value: string | number) => setPoolTitle(value)}
              options={people}
            />
          </div>
        </Box>
      </div>
    </Page>
  );
};

export default CreatePool;
