import Box from '@components/core/Box';
import DateTimePicker from '@components/core/DateTimePicker/DateTimePicker';
import Page from '@components/core/Page';
import PageHeader from '@components/core/PageHeader';
import SmallLogo from '@components/core/SmallLogo';
import TextField from '@components/core/TextField';
import UserCard from '@components/core/UserCard';
import PoolCreateForm from '@components/pool/create/PoolCreateForm';
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
      <div className="mx-auto mt-20 flex max-w-3xl flex-col gap-6">
        <PageHeader />
        <PoolCreateForm />
      </div>
    </Page>
  );
};

export default CreatePool;
