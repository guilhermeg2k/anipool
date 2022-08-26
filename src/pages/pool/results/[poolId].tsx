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

type CharacterResult = Anilist.Character & PoolOptionResult;
type MediaResult = Anilist.Media & PoolOptionResult;

const PoolResult: NextPage = () => {
  const [isLoadingPoolAndResult, setIsLoadingPoolAndResult] = useState(false);
  const [isLoadingCharactersResult, setIsLoadingCharacterResult] =
    useState(false);
  const [isLoadingMediaResult, setIsLoadingMediaResult] = useState(false);
  const [totalVotes, setTotalVotes] = useState(0);
  const [pool, setPool] = useState<Pool>();
  const [poolOptionsResult, setPoolOptionsResult] = useState(
    Array<PoolOptionResult>()
  );
  const [charactersResult, setCharactersResult] = useState(
    Array<CharacterResult>()
  );
  const [mediasResult, setMediasResult] = useState(Array<MediaResult>());
  const router = useRouter();

  const results = [...charactersResult, ...mediasResult].sort(
    (resultA, resultB) => (resultA.votes > resultB.votes ? -1 : 1)
  );

  const loadPoolAndResult = async () => {
    setIsLoadingPoolAndResult(true);
    try {
      const { poolId } = router.query;
      if (poolId) {
        const poolPromise = poolService.get(String(poolId));
        const poolResultsPromise = poolService.getResult(String(poolId));

        const [pool, poolOptionsResult] = await Promise.all([
          poolPromise,
          poolResultsPromise,
        ]);

        setPool(pool);
        setPoolOptionsResult(poolOptionsResult);
      }
    } catch (error) {
      console.log(error);
      toastError('Failed to load pool and results');
    } finally {
      setIsLoadingPoolAndResult(false);
    }
  };

  const loadCharactersResult = async () => {
    try {
      setIsLoadingCharacterResult(true);
      const characterOptionsResult = poolOptionsResult.filter(
        (option) => option.type === OptionType.Character
      );

      const charactersResult = Array<CharacterResult>();

      for (const characterOption of characterOptionsResult) {
        const character = await anilistService.getCharacterById(
          parseInt(String(characterOption.anilistId))
        );

        charactersResult.push({
          ...character,
          ...characterOption,
        });
      }

      setCharactersResult(charactersResult);
    } catch (error) {
      toastError('Failed to load results for character options');
    } finally {
      setIsLoadingCharacterResult(false);
    }
  };

  const loadMediasResult = async () => {
    try {
      setIsLoadingMediaResult(true);
      const mediaOptionsResult = poolOptionsResult.filter(
        (option) =>
          option.type === OptionType.Manga || option.type === OptionType.Anime
      );

      const mediasResult = Array<MediaResult>();

      for (const mediaOption of mediaOptionsResult) {
        const character = await anilistService.getMediaById(
          parseInt(String(mediaOption.anilistId))
        );

        mediasResult.push({
          ...character,
          ...mediaOption,
        });
      }

      setMediasResult(mediasResult);
    } catch (error) {
      toastError('Failed to load results for media options');
    } finally {
      setIsLoadingMediaResult(false);
    }
  };

  const calculateTotalVotes = () => {
    let totalVotes = 0;
    for (const result of results) {
      totalVotes += result.votes;
    }
    setTotalVotes(totalVotes);
  };

  const onShareHandler = () => {
    navigator.clipboard.writeText(
      window.location.href.replace('results', 'vote')
    );
    toastSuccess('Share link copied to clipboard');
  };

  useEffect(() => {
    loadPoolAndResult();
  }, []);

  useEffect(() => {
    if (poolOptionsResult.length > 0) {
      loadCharactersResult();
      loadMediasResult();
    }
  }, [poolOptionsResult]);

  useEffect(() => {
    calculateTotalVotes();
  }, [charactersResult, mediasResult]);

  if (
    isLoadingPoolAndResult ||
    isLoadingCharactersResult ||
    isLoadingMediaResult
  ) {
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
                const characterResult = result as CharacterResult;
                return (
                  <CharacterResultCard
                    coverUrl={characterResult.image.large}
                    name={characterResult.name}
                    totalVotes={totalVotes}
                    votes={characterResult.votes}
                    key={characterResult.id}
                  />
                );
              } else {
                const mediaResult = result as MediaResult;
                console.log(mediaResult, 'mr');
                return (
                  <MediaResultCard
                    coverUrl={mediaResult.coverImage.extraLarge}
                    title={mediaResult.title}
                    totalVotes={totalVotes}
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
