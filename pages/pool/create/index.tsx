import { NextPage } from 'next';
import { useState } from 'react';
import Box from '../../../components/Box';
import DataDisplay from '../../../components/DataDisplay';
import Page from '../../../components/Page';
import SelectInput from '../../../components/SelectInput';
import SmallLogo from '../../../components/SmallLogo';

const people = [
  { label: 'ANIME', value: 'ANIME' },
  { label: 'CHARACTER', value: 'CHARACTER' },
  { label: 'MANGA', value: 'MANGA' },
];

const CreatePool: NextPage = () => {
  const [poolTitle, setPoolTitle] = useState({});

  return (
    <Page bgImage="/images/bg-create-pool.jpg">
      <div className="mx-auto max-w-3xl">
        <SmallLogo />
        <Box>
          <div className="m-2">
            <SelectInput
              value={poolTitle}
              label="Pool Title"
              onChange={(value: any) => setPoolTitle(value)}
              options={people}
            />
            <DataDisplay>
              <div className="w-[270px]">Mata otarios</div>
            </DataDisplay>
          </div>
        </Box>
      </div>
    </Page>
  );
};

export default CreatePool;
