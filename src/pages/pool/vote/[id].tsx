import LoadingPage from '@components/core/LoadingPage';
import Page from '@components/core/Page';
import PageHeader from '@components/core/PageHeader';
import VoteForm from '@components/pool/vote/VoteForm';
import { toastError, toastSuccess } from '@libs/toastify';
import anilistService from '@services/anilistService';
import poolService from '@services/poolService';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { OptionType } from 'src/enums';

type VoteOptions = Anilist.Media & Anilist.Character;

const CreatePool: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isVoting, setIsVoting] = useState(false);
  const [pool, setPool] = useState<Pool>();
  const [options, setOptions] = useState<Array<VoteOptions>>([]);

  const router = useRouter();

  const loadOptions = async () => {
    try {
      setIsLoading(true);
      const { id } = router.query;
      if (id) {
        const pool = await poolService.get(String(id));
        const options = Array<VoteOptions>();

        for (const option of pool.options) {
          if (option.type === OptionType.Character) {
            const character = await anilistService.getCharacterById(
              parseInt(String(option.anilistId))
            );

            options.push({
              ...character,
              type: OptionType.Character,
            } as VoteOptions);
          } else {
            const media = await anilistService.getMediaById(
              parseInt(String(option.anilistId))
            );
            options.push(media as VoteOptions);
          }
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

  const onSubmitHandler = async (poolVotes: Array<PoolOption>) => {
    try {
      setIsVoting(true);
      const { id } = router.query;
      await poolService.vote(String(id), poolVotes);
      router.push(`/pool/results/${id}`);
      toastSuccess('Your vote was registered');
    } catch (error) {
      toastError('Error while registering your vote');
    } finally {
      setIsVoting(false);
    }
  };

  useEffect(() => {
    loadOptions();
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isVoting) {
    return <LoadingPage text="Voting..." />;
  }

  return (
    <Page bgImage="/images/bg-vote-pool.jpg">
      <div className="mx-auto mt-20 flex max-w-4xl flex-col gap-6">
        <PageHeader />
        <VoteForm pool={pool} options={options} onSubmit={onSubmitHandler} />
      </div>
    </Page>
  );
};

export default CreatePool;
