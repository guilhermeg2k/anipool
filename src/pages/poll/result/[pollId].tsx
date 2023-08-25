import Box from '@components/core/Box';
import Button from '@components/core/Button/Button';
import DateDisplay from '@components/core/DateDisplay';
import { LinkButton } from '@components/core/LinkButton';
import LoadingPage from '@components/core/LoadingPage';
import Page from '@components/core/Page';
import Title from '@components/core/Title';
import CharacterResultCard from '@components/poll/results/CharacterResultCard';
import MediaResultCard from '@components/poll/results/MediaResultCard';
import {
  ArrowPathIcon,
  ArrowTopRightOnSquareIcon,
  LinkIcon,
} from '@heroicons/react/24/outline';
import { toastError, toastSuccess } from '@libs/toastify';
import anilistService from '@services/anilistService';
import pollService from '@services/pollService';
import useUserStore from '@store/userStore';
import { isAfter } from 'date-fns';
import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { OptionType } from 'src/enums';

type CharacterResult = Anilist.Character & PollResult;
type MediaResult = Anilist.Media & PollResult;

const CountDownItem = ({ label, value }: { label: string; value: number }) => {
  return (
    <div className="flex flex-col items-center">
      <span>{value}</span>
      <span className="text-sm">{label}</span>
    </div>
  );
};

const getCountdownValues = (deadline: Date) => {
  const now = new Date().getTime();
  const t = deadline.getTime() - now;
  const days = Math.floor(t / (1000 * 60 * 60 * 24));
  const hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((t % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
};

const buildCharactersResults = (
  characters: Array<Anilist.Character>,
  results: Array<PollResult>
) => {
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

const buildMediasResults = (
  medias: Array<Anilist.Media>,
  results: Array<PollResult>
) => {
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

const PollResult: NextPage = () => {
  const user = useUserStore();
  const [isLoadingPollAndResults, setIsLoadingPollAndResults] = useState(true);
  const [poll, setPoll] = useState<PollWithCreator>();
  const [results, setResults] = useState(Array<PollResult>());
  const [countdown, setCountdown] = useState(getCountdownValues(new Date()));

  const router = useRouter();
  const { pollId } = router.query;
  const totalVotes = results.reduce(
    (totalVotes, option) => totalVotes + option.votes,
    0
  );

  const resultsOnlyVisibleForOwner =
    poll?.resultsVisibility === 'AFTER_END' &&
    poll?.userId === user.id &&
    isAfter(new Date(poll?.endDate), new Date());

  const resultsIsNotVisible =
    poll?.resultsVisibility === 'AFTER_END' &&
    poll?.userId !== user.id &&
    isAfter(new Date(poll?.endDate), new Date());

  const loadCharactersResults = async (results: Array<PollResult>) => {
    const characterOptionIds = results
      .filter((option) => option.type === OptionType.Character)
      .map((option) => option.anilistId);

    const characters = await anilistService.getCharactersByIds(
      characterOptionIds
    );

    const charactersResults = buildCharactersResults(characters, results);

    return charactersResults;
  };

  const loadMediaResults = async (results: Array<PollResult>) => {
    const mediasOptionIds = results
      .filter(
        (option) =>
          option.type === OptionType.Manga || option.type === OptionType.Anime
      )
      .map((option) => option.anilistId);

    const medias = await anilistService.getMediasByIds(mediasOptionIds);
    const mediasWithVotes = buildMediasResults(medias, results);

    return mediasWithVotes;
  };

  const loadPollAndResult = async () => {
    setIsLoadingPollAndResults(true);
    try {
      if (pollId) {
        const [poll, pollOptionsResult] = await Promise.all([
          pollService.get(String(pollId)),
          pollService.getResult(String(pollId)),
        ]);

        const [characterResults, mediaResults] = await Promise.all([
          loadCharactersResults(pollOptionsResult),
          loadMediaResults(pollOptionsResult),
        ]);

        const results = [...characterResults, ...mediaResults].sort(
          (resultA, resultB) => (resultA.votes > resultB.votes ? -1 : 1)
        );

        setResults(results);
        setPoll(poll);
      }
    } catch (error) {
      toastError('Failed to load poll and results');
    } finally {
      setIsLoadingPollAndResults(false);
    }
  };

  const onCopyLinkHandler = () => {
    navigator.clipboard.writeText(window.location.href);
    toastSuccess('Results link copied to clipboard');
  };

  useEffect(() => {
    if (resultsIsNotVisible) {
      const timeout = setInterval(() => {
        const countdown = getCountdownValues(new Date(poll?.endDate || 0));
        setCountdown(countdown);
      }, 1000);
      return () => clearInterval(timeout);
    }
  }, [poll]);

  useEffect(() => {
    loadPollAndResult();
  }, [pollId]);

  if (isLoadingPollAndResults) {
    return (
      <LoadingPage
        text="Loading results..."
        title={poll?.title ? `Results of ${poll?.title}` : 'Results'}
      />
    );
  }

  return (
    <Page title={`Results of ${poll?.title}`}>
      <Box className="flex flex-col gap-3">
        <div className="grid grid-cols-1 items-center gap-1 sm:grid-cols-2">
          <div className="col-span-1 flex flex-col">
            <Title className="max-h-28 overflow-auto">{poll?.title}</Title>
            <h2 className="text-xs">
              <div className="flex items-center gap-1">
                <span className="font-semibold">Author:</span>
                <span>{poll?.creator.nickname}</span>
                <Image
                  className="rounded-full"
                  src={poll?.creator.avatarUrl || ''}
                  alt="Profile picture"
                  layout="fixed"
                  width={25}
                  height={25}
                />
              </div>
              <div className="flex gap-1">
                <span className="font-semibold">Ends at:</span>
                <DateDisplay date={poll?.endDate} />
              </div>
            </h2>
          </div>
          <div className="flex w-full flex-wrap items-center justify-around md:justify-end self-center ">
            <Button
              color="white"
              title="Refresh results"
              name="Refresh results"
              onClick={() => loadPollAndResult()}
            >
              <span>Refresh</span>
              <ArrowPathIcon className="w-5" />
            </Button>
            <Button
              color="white"
              name="Copy results link"
              title="Copy results link"
              onClick={onCopyLinkHandler}
            >
              <span>Copy link</span>
              <LinkIcon className="w-5" />
            </Button>
            <LinkButton
              color="white"
              name="Open vote page"
              title="Open vote page"
              href={`/poll/vote/${pollId}`}
            >
              <span>Vote</span>
              <ArrowTopRightOnSquareIcon className="w-5" />
            </LinkButton>
          </div>
        </div>
        {resultsOnlyVisibleForOwner && (
          <div className="uppercase font-bold text-red-400 flex items-center justify-center">
            Results are only visible for you
          </div>
        )}
        {resultsIsNotVisible && (
          <div className="text-4xl uppercase font-bold flex gap-10 w-full justify-center flex-col sm:flex-row">
            <CountDownItem label="Days" value={countdown.days} />
            <CountDownItem label="Hours" value={countdown.hours} />
            <CountDownItem label="Minutes" value={countdown.minutes} />
            <CountDownItem label="Seconds" value={countdown.seconds} />
          </div>
        )}
        <div className="flex max-h-[400px] flex-wrap justify-center gap-3 overflow-auto">
          {results.map((result) => {
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
            } else {
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
            }
          })}
        </div>
      </Box>
    </Page>
  );
};

export default PollResult;
