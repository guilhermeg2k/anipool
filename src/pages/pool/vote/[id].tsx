import LoadingPage from '@components/core/LoadingPage';
import Page from '@components/core/Page';
import PageHeader from '@components/core/PageHeader';
import VoteForm from '@components/pool/vote/VoteForm';
import { toastError } from '@libs/toastify';
import anilistService from '@services/anilistService';
import poolService from '@services/poolService';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

type PoolOption = Anilist.Media & Anilist.Character;

const CreatePool: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [pool, setPool] = useState<Pool>();
  const [options, setOptions] = useState(Array<PoolOption>);

  const router = useRouter();

  const loadOptions = async () => {
    try {
      setIsLoading(true);
      const { id } = router.query;
      if (id) {
        const pool = await poolService.get(String(id));
        const options = Array<PoolOption>();
        for (const option of pool.options) {
          const media = await anilistService.getMediaById(
            parseInt(String(option.anilistId))
          );
          options.push(media as PoolOption);
        }

        setPool(pool);
        setOptions(options);
      }
    } catch (error) {
      console.log(error);
      toastError('Failed  to load options');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadOptions();
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <Page bgImage="/images/bg-vote-pool.jpg">
      <div className="mx-auto mt-20 flex max-w-4xl flex-col gap-6">
        <PageHeader />
        <VoteForm pool={pool} options={options} />
      </div>
    </Page>
  );
};

export default CreatePool;
