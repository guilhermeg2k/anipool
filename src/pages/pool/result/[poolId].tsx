import Box from '@components/core/Box';
import Button from '@components/core/Button';
import LoadingPage from '@components/core/LoadingPage';
import Page from '@components/core/Page';
import PageHeader from '@components/core/PageHeader';
import Title from '@components/core/Title';
import CharacterResultCard from '@components/pool/results/CharacterResultCard';
import MediaResultCard from '@components/pool/results/MediaResultCard';
import { LinkIcon, PlusIcon, RefreshIcon } from '@heroicons/react/outline';
import { toastError, toastSuccess } from '@libs/toastify';
import anilistService from '@services/anilistService';
import poolService from '@services/poolService';
import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { OptionType } from 'src/enums';

type CharacterResult = Anilist.Character & PoolResult;
type MediaResult = Anilist.Media & PoolResult;

const PoolResult: NextPage = () => {
  const [isLoadingPoolAndResults, setIsLoadingPoolAndResults] = useState(true);
  const [isLoadingCharacters, setIsLoadingCharacters] = useState(true);
  const [isLoadingMedias, setIsLoadingMedias] = useState(true);

  const [pool, setPool] = useState<PoolWithCreator>();
  const [results, setResults] = useState(Array<PoolResult>());
  const [charactersResults, setCharactersResults] = useState(
    Array<CharacterResult>()
  );
  const [mediaResults, setMediaResults] = useState(Array<MediaResult>());

  const router = useRouter();

  const { poolId } = router.query;

  const resultsSorted = [...charactersResults, ...mediaResults].sort(
    (resultA, resultB) => (resultA.votes > resultB.votes ? -1 : 1)
  );

  const totalVotes = results.reduce(
    (totalVotes, option) => totalVotes + option.votes,
    0
  );

  const buildCharactersResults = (characters: Array<Anilist.Character>) => {
    const charactersResults = characters.map((character) => {
      const result = results.find(
        ({ anilistId, type }) =>
          anilistId === character.id && type === OptionType.Character
      );

      return {
        ...character,
        ...result,
      } as CharacterResult;
    });

    return charactersResults;
  };

  const buildMediasResults = (medias: Array<Anilist.Media>) => {
    const mediasWithVotes = medias.map((media) => {
      const result = results.find(
        ({ anilistId, type }) =>
          anilistId === media.id &&
          (type === OptionType.Manga || type === OptionType.Anime)
      );

      return {
        ...media,
        ...result,
      } as MediaResult;
    });

    return mediasWithVotes;
  };

  const loadPoolAndResult = async () => {
    setIsLoadingPoolAndResults(true);
    try {
      if (poolId) {
        const poolPromise = poolService.get(String(poolId));
        const poolResultsPromise = poolService.getResult(String(poolId));

        const [pool, poolOptionsResult] = await Promise.all([
          poolPromise,
          poolResultsPromise,
        ]);

        setPool(pool);
        setResults(poolOptionsResult);
      }
    } catch (error) {
      toastError('Failed to load pool and results');
    } finally {
      setIsLoadingPoolAndResults(false);
    }
  };

  const loadCharactersResults = async () => {
    try {
      setIsLoadingCharacters(true);
      const characterOptionIds = results
        .filter((option) => option.type === OptionType.Character)
        .map((option) => option.anilistId);

      const characters = await anilistService.getCharactersByIds(
        characterOptionIds
      );

      const charactersWithVotes = buildCharactersResults(characters);

      setCharactersResults(charactersWithVotes);
    } catch (error) {
      toastError('Failed to load results for character options');
    } finally {
      setIsLoadingCharacters(false);
    }
  };

  const loadMediaResults = async () => {
    try {
      setIsLoadingMedias(true);
      const mediasOptionIds = results
        .filter(
          (option) =>
            option.type === OptionType.Manga || option.type === OptionType.Anime
        )
        .map((option) => option.anilistId);

      const medias = await anilistService.getMediasByIds(mediasOptionIds);
      const mediasWithVotes = buildMediasResults(medias);

      setMediaResults(mediasWithVotes);
    } catch (error) {
      toastError('Failed to load results for media options');
    } finally {
      setIsLoadingMedias(false);
    }
  };

  const onShareHandler = () => {
    navigator.clipboard.writeText(
      window.location.href.replace('results', 'vote')
    );
    toastSuccess('Share link copied to clipboard');
  };

  const renderResultsCards = () =>
    resultsSorted.map((result) => {
      if (result.type === OptionType.Character) {
        const characterResult = result as CharacterResult;
        return (
          <CharacterResultCard
            key={characterResult.id}
            coverUrl={characterResult.image.large}
            name={characterResult.name}
            totalVotes={totalVotes}
            votes={characterResult.votes}
          />
        );
      }

      const mediaResult = result as MediaResult;
      return (
        <MediaResultCard
          key={mediaResult.id}
          coverUrl={mediaResult.coverImage.extraLarge}
          title={mediaResult.title}
          totalVotes={totalVotes}
          votes={mediaResult.votes}
        />
      );
    });

  useEffect(() => {
    loadPoolAndResult();
  }, [poolId]);

  useEffect(() => {
    if (results.length > 0) {
      loadCharactersResults();
      loadMediaResults();
    }
  }, [results]);

  if (isLoadingPoolAndResults || isLoadingCharacters || isLoadingMedias) {
    return <LoadingPage text="Loading results..." />;
  }

  return (
    <Page bgImage="/images/bg-pool-results.jpg">
      <Head>
        <title>Results: {pool?.title}</title>
      </Head>
      <div className="mx-auto mt-20 flex max-w-4xl flex-col gap-6 ">
        <PageHeader />
        <Box className="flex flex-col gap-5 pb-7">
          <div className="flex flex-col justify-between md:flex-row md:items-center">
            <div>
              <Title>{pool?.title}</Title>
              <h2 className="text-xs">
                <div className="flex items-center  gap-1">
                  <span className="font-semibold">Author:</span>
                  <span>{pool!.creator.nickname}</span>
                  <Image
                    className="rounded-full"
                    src={pool!.creator.avatarUrl}
                    alt="Profile picture"
                    layout="fixed"
                    width={25}
                    height={25}
                  />
                </div>
                <span className="font-semibold">Ends at:</span>{' '}
                {new Date(pool?.endDate!).toLocaleString()}
              </h2>
            </div>
            <div className="self-center">
              <Button color="white" onClick={() => loadPoolAndResult()}>
                <span>Refresh</span>
                <RefreshIcon className="w-5" />
              </Button>
              <Button color="white" onClick={onShareHandler}>
                <span>Share</span>
                <LinkIcon className="w-5" />
              </Button>
              <Button color="white" onClick={() => router.push('/pool/create')}>
                <span>Create New</span>
                <PlusIcon className="w-5" />
              </Button>
            </div>
          </div>
          <div className="flex max-h-[400px] flex-wrap justify-center gap-3 overflow-auto">
            {renderResultsCards()}
          </div>
        </Box>
      </div>
    </Page>
  );
};

export default PoolResult;
