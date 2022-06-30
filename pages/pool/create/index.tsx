import Box from '@components/core/Box';
import DateTimePicker from '@components/core/DateTimePicker/DateTimePicker';
import Page from '@components/core/Page';
import SmallLogo from '@components/core/SmallLogo';
import { NextPage } from 'next';
import { useState } from 'react';

const people = [
  { label: 'ANIME', value: 'ANIME' },
  { label: 'CHARACTER', value: 'CHARACTER' },
  { label: 'MANGA', value: 'MANGA' },
];

const CreatePool: NextPage = () => {
  const [poolTitle, setPoolTitle] = useState({});
  const [checked, setChecked] = useState(false);
  const [date, setDate] = useState(new Date());

  return (
    <Page bgImage="/images/bg-create-pool.jpg">
      <div className="mx-auto max-w-3xl">
        <SmallLogo />
        <Box>
          <DateTimePicker value={date} onChange={setDate} />
        </Box>
      </div>
    </Page>
  );
};

export default CreatePool;
