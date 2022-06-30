import { NextPage } from 'next';
import { useState } from 'react';
import Box from '@components/core/Box';
import DatePicker, { MonthYearSelector } from '@components/core/DateTimePicker';
import Page from '@components/core/Page';
import SmallLogo from '@components/core/SmallLogo';

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
