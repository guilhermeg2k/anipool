import { NextPage } from 'next';
import { useState } from 'react';
import Box from '../../../components/Box';
import DatePicker from '../../../components/DateTimePicker';
import Page from '../../../components/Page';
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
          <DatePicker />
        </Box>
      </div>
    </Page>
  );
};

export default CreatePool;
