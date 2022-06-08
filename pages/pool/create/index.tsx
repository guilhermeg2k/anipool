import { NextPage } from 'next';
import { useState } from 'react';
import Box from '../../../components/Box';
import CheckBox from '../../../components/CheckBox';
import Page from '../../../components/Page';
import Select from '../../../components/Select';
import SmallLogo from '../../../components/SmallLogo';

const people = [
  { label: 'ANIME', value: 'ANIME' },
  { label: 'CHARACTER', value: 'CHARACTER' },
  { label: 'MANGA', value: 'MANGA' },
];

const CreatePool: NextPage = () => {
  const [poolTitle, setPoolTitle] = useState({});
  const [checked, setChecked] = useState(false);

  return (
    <Page bgImage="/images/bg-create-pool.jpg">
      <div className="mx-auto max-w-3xl">
        <SmallLogo />
        <Box>
          <div className="m-2">
            <Select
              value={poolTitle}
              label="Pool Title"
              onChange={(value: any) => setPoolTitle(value)}
              options={people}
            />
            <CheckBox onChange={setChecked} value={checked}>
              <span>Vai mamar?</span>
            </CheckBox>
          </div>
        </Box>
      </div>
    </Page>
  );
};

export default CreatePool;
