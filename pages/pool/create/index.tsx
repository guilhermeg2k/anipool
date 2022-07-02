import Page from '@components/core/Page';
import PageHeader from '@components/core/PageHeader';
import PoolCreateForm from '@components/pool/create/CreatePoolForm';
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
