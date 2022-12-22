import Box from '@components/core/Box';
import Button from '@components/core/Button';
import LoadingPage from '@components/core/LoadingPage';
import Page from '@components/core/Page';
import PageHeader from '@components/core/PageHeader';
import Title from '@components/core/Title';
import CharacterVoteOption from '@components/pool/vote/CharacterVoteOption';
import MediaVoteOption from '@components/pool/vote/MediaVoteOption';
import { ChartBarIcon, LinkIcon } from '@heroicons/react/outline';
import { toastError, toastSuccess, toastWarning } from '@libs/toastify';
import anilistService from '@services/anilistService';
import poolService from '@services/poolService';
import dayjs from 'dayjs';
import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { OptionType } from 'src/enums';

type CharacterOption = Anilist.Character & PoolOption;
type MediaOption = Anilist.Media & PoolOption;

const Vote: NextPage = () => {
  const [isLoadingPool, setIsLoadingPool] = useState(true);
  const [isLoadingCharacters, setIsLoadingCharacters] = useState(true);
  const [isLoadingMedias, setIsLoadingMedias] = useState(true);
  const [isVoting, setIsVoting] = useState(false);
  const [pool, setPool] = useState<PoolWithCreator>();
  console.log('🚀 ~ file: [poolId].tsx:28 ~ pool', pool);
  const [characters, setCharacters] = useState<Array<Anilist.Character>>([]);
  const [medias, setMedias] = useState<Array<Anilist.Media>>([]);
  const [votes, setVotes] = useState<Array<PoolOption>>([]);
  const router = useRouter();
  const { poolId } = router.query;
  const options = pool?.options.map((option) => {
    if (option.type === OptionType.Character) {
      const character = characters.find(({ id }) => option.anilistId === id);
      return {
        ...character,
        ...option,
      };
    }

    const media = medias.find(({ id }) => option.anilistId === id);
    return {
      ...option,
      ...media,
    };
  });
  const canSubmit = votes.length > 0;

  const goToResults = () => router.push(`/pool/result/${poolId}`);

  const hasUserAlreadyVoted = async () => {
    if (poolId) {
      const userVotes = await poolService.getUserVotes(String(poolId));
      return userVotes && userVotes.length > 0;
    }
  };

  const loadPoolIfUserDoesNotHasVoted = async () => {
    if (await hasUserAlreadyVoted()) {
      toastWarning('You already has voted on this pool');
      goToResults();
    } else {
      await loadPool();
    }
  };

  const loadPool = async () => {
    try {
      setIsLoadingPool(true);
      if (poolId) {
        const pool = await poolService.get(String(poolId));
        setPool(pool);
      }
    } catch (error) {
      toastError('Failed  to load pool');
    } finally {
      setIsLoadingPool(false);
    }
  };

  const loadMedias = async () => {
    try {
      setIsLoadingMedias(true);
      const optionsThatAreMediaIds = pool?.options
        .filter(
          ({ type }) => type === OptionType.Manga || type === OptionType.Anime
        )
        .map(({ anilistId }) => anilistId);

      if (optionsThatAreMediaIds) {
        const medias = await anilistService.getMediasByIds(
          optionsThatAreMediaIds
        );
        setMedias(medias);
      }
    } catch (error) {
      toastError('Failed to load pool media options');
    } finally {
      setIsLoadingMedias(false);
    }
  };

  const loadCharacters = async () => {
    try {
      setIsLoadingCharacters(true);
      const optionsThatAreCharacters = pool?.options
        .filter(({ type }) => type === OptionType.Character)
        .map(({ anilistId }) => anilistId);

      if (optionsThatAreCharacters) {
        const characters = await anilistService.getCharactersByIds(
          optionsThatAreCharacters
        );
        setCharacters(characters);
      }
    } catch (error) {
      toastError('Failed to load pool character options');
    } finally {
      setIsLoadingCharacters(false);
    }
  };

  const onSelectedHandler = (selectedOption: PoolOption) => {
    if (pool!.multiOptions) {
      const isAlreadyAdded = votes.find(
        (vote) => vote.anilistId === selectedOption.anilistId
      );
      if (isAlreadyAdded) {
        setVotes(
          votes.filter((vote) => vote.anilistId !== selectedOption.anilistId)
        );
      } else {
        setVotes([
          ...votes,
          { anilistId: selectedOption.anilistId, type: selectedOption.type },
        ]);
      }
    } else {
      setVotes([
        { anilistId: selectedOption.anilistId, type: selectedOption.type },
      ]);
    }
  };

  const onShareHandler = () => {
    navigator.clipboard.writeText(window.location.href);
    toastSuccess('Share link copied to clipboard');
  };

  const submitVotes = async (poolVotes: Array<PoolOption>) => {
    try {
      setIsVoting(true);
      await poolService.vote(String(poolId), poolVotes);
      toastSuccess('Your vote was registered');
      goToResults();
    } catch (error) {
      toastError('Error while registering your vote');
    } finally {
      setIsVoting(false);
    }
  };

  const buildCharacterVoteOption = (characterOption: CharacterOption) => {
    const isSelected = Boolean(
      votes.find(
        (vote) =>
          vote.anilistId === characterOption.id &&
          vote.type === OptionType.Character
      )
    );

    return (
      <CharacterVoteOption
        key={`character-${characterOption.id}`}
        onClick={() => onSelectedHandler(characterOption)}
        coverUrl={characterOption.image.large}
        name={characterOption.name}
        selected={isSelected}
      />
    );
  };

  const buildMediaVoteOption = (mediaOption: MediaOption) => {
    const isSelected = Boolean(
      votes.find(
        (vote) =>
          vote.anilistId === mediaOption.id &&
          (vote.type === OptionType.Manga || vote.type === OptionType.Anime)
      )
    );

    return (
      <MediaVoteOption
        key={`media-${mediaOption.id}`}
        onClick={() => onSelectedHandler(mediaOption)}
        coverUrl={mediaOption.coverImage.extraLarge}
        title={mediaOption.title}
        selected={isSelected}
      />
    );
  };

  const renderOptions = () =>
    options?.map((option) => {
      if (option.type === OptionType.Character) {
        const characterOption = option as CharacterOption;
        return buildCharacterVoteOption(characterOption);
      }
      const mediaOption = option as MediaOption;
      return buildMediaVoteOption(mediaOption);
    });

  useEffect(() => {
    loadPoolIfUserDoesNotHasVoted();
  }, []);

  useEffect(() => {
    if (pool) {
      const poolEndDate = dayjs(pool.endDate);

      if (poolEndDate < dayjs()) {
        goToResults();
        return;
      }

      loadMedias();
      loadCharacters();
    }
  }, [pool]);

  if (isLoadingPool || isLoadingCharacters || isLoadingMedias) {
    return <LoadingPage />;
  }

  if (isVoting) {
    return <LoadingPage text="Voting..." />;
  }

  return (
    <Page bgImage="/images/bg-vote-pool.jpg">
      <Head>
        <title>Pool: {pool?.title}</title>
      </Head>
      <div className="mx-auto mt-20 flex max-w-4xl flex-col gap-6">
        <PageHeader />
        <Box className="flex flex-col gap-5">
          <div className="flex flex-col items-center justify-between md:flex-row">
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
            <div>
              <Button
                color="white"
                onClick={() => router.push(`/pool/result/${poolId}`)}
              >
                <span>Results</span>
                <ChartBarIcon className="w-5" />
              </Button>
              <Button color="white" onClick={onShareHandler}>
                <span>Share</span>
                <LinkIcon className="w-5" />
              </Button>
            </div>
          </div>
          <div className="flex max-h-[400px] flex-wrap justify-center gap-3 overflow-auto">
            {renderOptions()}
          </div>
          <div className="self-end">
            <Button
              color="green"
              disabled={!canSubmit}
              onClick={() => submitVotes(votes)}
            >
              vote
            </Button>
          </div>
        </Box>
      </div>
    </Page>
  );
};

export default Vote;
