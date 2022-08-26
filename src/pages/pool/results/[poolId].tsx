import Box from '@components/core/Box';
import Button from '@components/core/Button';
import LoadingPage from '@components/core/LoadingPage';
import Page from '@components/core/Page';
import PageHeader from '@components/core/PageHeader';
import Title from '@components/core/Title';
import CharacterResultCard from '@components/pool/results/CharacterResultCard';
import MediaResultCard from '@components/pool/results/MediaResultCard';
import { LinkIcon, PlusIcon } from '@heroicons/react/outline';
import { toastError, toastSuccess } from '@libs/toastify';
import anilistService from '@services/anilistService';
import poolService from '@services/poolService';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { OptionType } from 'src/enums';

const getCharacterWithVotes = async (
  characterId: number,
  poolOptionsWithVotes: Array<PoolOptionWithVotes>
) => {
  const character = await anilistService.getCharacterById(
    parseInt(String(characterId))
  );

  const characterPoolOptionWithVotes = poolOptionsWithVotes.find(
    (option) =>
      option.anilistId === character.id && option.type === OptionType.Character
  );

  const characterWithVotes = {
    ...character,
    ...characterPoolOptionWithVotes!,
    votes: characterPoolOptionWithVotes
      ? characterPoolOptionWithVotes!.votes
      : 0,
  };

  console.log(characterWithVotes, 'characterWithVotes');
  return characterWithVotes;
};

const getMediaWithVotes = async (
  mediaId: number,
  poolOptionsWithVotes: Array<PoolOptionWithVotes>
) => {
  const media = await anilistService.getMediaById(parseInt(String(mediaId)));

  const mediaPoolOptionWithVotes = poolOptionsWithVotes.find(
    (option) =>
      option.anilistId === media.id &&
      (option.type === OptionType.Anime || option.type === OptionType.Manga)
  );

  console.log(mediaPoolOptionWithVotes, 'mediaPoolOptionWithVotes');

  const mediaWithVotes = {
    ...media,
    ...mediaPoolOptionWithVotes!,
    votes: mediaPoolOptionWithVotes ? mediaPoolOptionWithVotes!.votes : 0,
  };

  return mediaWithVotes;
};

const PoolResult: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [pool, setPool] = useState<Pool>();
  const [mediaResults, setMediaResults] = useState(
    Array<Anilist.Media & PoolOptionWithVotes>
  );
  const [characterResults, setCharacterResults] = useState(
    Array<Anilist.Character & PoolOptionWithVotes>
  );

  const router = useRouter();

  const results = [...mediaResults, ...characterResults].sort(
    (resultA, resultB) => (resultA.votes > resultB.votes ? 1 : -1)
  );

  const loadPoolAndResults = async () => {
    setIsLoading(true);
    try {
      const { poolId } = router.query;
      if (poolId) {
        const poolPromise = poolService.get(String(poolId));
        const poolResultsPromise = poolService.getPoolResults(String(poolId));

        const mediaResults = Array<Anilist.Media & PoolOptionWithVotes>();
        const characterResults = Array<
          Anilist.Character & PoolOptionWithVotes
        >();

        const [pool, poolOptionsWithVotes] = await Promise.all([
          poolPromise,
          poolResultsPromise,
        ]);

        for (const option of pool.options) {
          if (option.type === OptionType.Character) {
            const characterWithVotes = await getCharacterWithVotes(
              option.anilistId,
              poolOptionsWithVotes
            );

            characterResults.push(characterWithVotes);
          } else {
            const mediaWithVotes = await getMediaWithVotes(
              option.anilistId,
              poolOptionsWithVotes
            );
            mediaResults.push(mediaWithVotes);
          }
        }

        setMediaResults(mediaResults);
        setCharacterResults(characterResults);
        setPool(pool);
      }
    } catch (error) {
      console.log(error);
      toastError('Filed to load pool results');
    } finally {
      setIsLoading(false);
    }
  };

  const calculateTotalVotes = () => {
    let totalVotes = 0;
    console.log(results);
    for (const result of results) {
      totalVotes += result.votes;
    }
    console.log(totalVotes, 'tv');
    return totalVotes;
  };

  const onShareHandler = () => {
    navigator.clipboard.writeText(
      window.location.href.replace('results', 'vote')
    );
    toastSuccess('Share link copied to clipboard');
  };

  useEffect(() => {
    loadPoolAndResults();
  }, []);

  if (isLoading) {
    return <LoadingPage text="Loading results..." />;
  }

  return (
    <Page bgImage="/images/bg-pool-results.jpg">
      <div className="mx-auto mt-20 flex max-w-4xl flex-col gap-6 ">
        <PageHeader />
        <Box className="flex flex-col gap-5 pb-7">
          <div className="flex flex-col justify-between md:flex-row md:items-center">
            <div>
              <Title>{pool?.title}</Title>
              <h2 className="semi text-xs">
                Pool ends in: {new Date(pool?.endDate!).toLocaleString()}
              </h2>
            </div>
            <div className="self-center">
              <Button color="white" onClick={onShareHandler}>
                <span>Share</span>
                <LinkIcon className="w-5" />
              </Button>
              <Button color="white">
                <span>Create New</span>
                <PlusIcon className="w-5" />
              </Button>
            </div>
          </div>
          <div className="flex max-h-[400px] flex-wrap justify-center gap-3 overflow-auto">
            {results.map((result) => {
              console.log(result.type, 'type');
              if (result.type === OptionType.Character) {
                const characterResult = result as Anilist.Character &
                  PoolOptionWithVotes;
                return (
                  <CharacterResultCard
                    coverUrl={characterResult.image.large}
                    name={characterResult.name}
                    totalVotes={calculateTotalVotes()}
                    votes={characterResult.votes}
                    key={characterResult.id}
                  />
                );
              } else {
                const mediaResult = result as Anilist.Media &
                  PoolOptionWithVotes;
                console.log(mediaResult, 'mr');
                return (
                  <MediaResultCard
                    coverUrl={mediaResult.coverImage.extraLarge}
                    title={mediaResult.title}
                    totalVotes={calculateTotalVotes()}
                    votes={mediaResult.votes}
                  />
                );
              }
            })}
          </div>
        </Box>
      </div>
    </Page>
  );
};

export default PoolResult;
