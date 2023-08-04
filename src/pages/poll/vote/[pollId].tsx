import Box from '@components/core/Box';
import Button from '@components/core/Button/Button';
import DateDisplay from '@components/core/DateDisplay';
import { LinkButton } from '@components/core/LinkButton';
import LoadingPage from '@components/core/LoadingPage';
import Page from '@components/core/Page';
import Title from '@components/core/Title';
import CharacterVoteOption from '@components/poll/vote/CharacterVoteOption';
import MediaVoteOption from '@components/poll/vote/MediaVoteOption';
import { ChartBarIcon, LinkIcon } from '@heroicons/react/24/outline';
import { toastError, toastSuccess, toastWarning } from '@libs/toastify';
import anilistService from '@services/anilistService';
import pollService from '@services/pollService';
import useUserStore from '@store/userStore';
import dayjs from 'dayjs';
import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { OptionType } from 'src/enums';

type CharacterOption = Anilist.Character & PollOption;
type MediaOption = Anilist.Media & PollOption;

const Vote: NextPage = () => {
  const [isLoadingPoll, setIsLoadingPoll] = useState(true);
  const [isVoting, setIsVoting] = useState(false);
  const [poll, setPoll] = useState<PollWithCreator>();
  const [options, setOptions] = useState<Array<PollOption>>([]);
  const [votes, setVotes] = useState<Array<PollOption>>([]);
  const router = useRouter();
  const { pollId } = router.query;
  const { isLogged } = useUserStore();
  const isUserLogged = isLogged();
  const canSubmit = votes.length > 0 && isUserLogged;

  const goToResults = () => router.push(`/poll/result/${pollId}`);

  const hasUserAlreadyVoted = async () => {
    if (pollId) {
      const userVotes = await pollService.getUserVotes(String(pollId));
      return userVotes && userVotes.length > 0;
    }
  };

  const buildOptions = (
    options: PollOption[],
    characterOptions: Anilist.Character[],
    mediaOptions: Anilist.Media[]
  ) =>
    options.map((option) => {
      if (option.type === OptionType.Character) {
        const character = characterOptions.find(
          ({ id }) => option.anilistId === id
        );
        return {
          ...character,
          ...option,
        };
      }

      const media = mediaOptions.find(({ id }) => option.anilistId === id);
      return {
        ...option,
        ...media,
      };
    });

  const loadMediasFromOptions = async (options: Array<PollOption>) => {
    const optionsThatAreMediaIds = options
      .filter(
        ({ type }) => type === OptionType.Manga || type === OptionType.Anime
      )
      .map(({ anilistId }) => anilistId);

    if (optionsThatAreMediaIds.length > 0) {
      const medias = await anilistService.getMediasByIds(
        optionsThatAreMediaIds
      );
      return medias;
    }
    return [];
  };

  const loadCharactersFromOptions = async (options: Array<PollOption>) => {
    const optionsThatAreCharacters = options
      .filter(({ type }) => type === OptionType.Character)
      .map(({ anilistId }) => anilistId);

    if (optionsThatAreCharacters.length > 0) {
      const characters = await anilistService.getCharactersByIds(
        optionsThatAreCharacters
      );
      return characters;
    }
    return [];
  };

  const loadPoll = async () => {
    try {
      setIsLoadingPoll(true);
      if (pollId) {
        const poll = await pollService.get(String(pollId));

        const [characterOptions, mediaOptions] = await Promise.all([
          loadCharactersFromOptions(poll.options),
          loadMediasFromOptions(poll.options),
        ]);

        const options = buildOptions(
          poll.options,
          characterOptions,
          mediaOptions
        );

        setPoll(poll);
        setOptions(options);
      }
    } catch (error) {
      toastError('Failed  to load poll');
    } finally {
      setIsLoadingPoll(false);
    }
  };

  const loadPollOrRedirectToResultsIfUserHasAlreadyVoted = async () => {
    if (isUserLogged && (await hasUserAlreadyVoted())) {
      toastWarning('You already has voted on this poll');
      await goToResults();
    } else {
      await loadPoll();
    }
  };

  const submitVotes = async (pollVotes: Array<PollOption>) => {
    try {
      setIsVoting(true);
      await pollService.vote(String(pollId), pollVotes);
      toastSuccess('Your vote was registered');
      await goToResults();
    } catch (error) {
      toastError('Error while registering your vote');
    } finally {
      setIsVoting(false);
    }
  };

  const redirectToResultsIfPollHasEnded = () => {
    if (poll && dayjs().isAfter(dayjs(poll.endDate))) {
      toastWarning('This poll has ended');
      goToResults();
    }
  };

  const onSelectedHandler = (selectedOption: PollOption) => {
    if (poll!.multiOptions) {
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

  const onCopyVoteLinkHandler = () => {
    navigator.clipboard.writeText(window.location.href);
    toastSuccess('Vote link copied to clipboard');
  };

  const renderCharacterVoteOption = (characterOption: CharacterOption) => {
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

  const renderMediaVoteOption = (mediaOption: MediaOption) => {
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
        return renderCharacterVoteOption(characterOption);
      }
      const mediaOption = option as MediaOption;
      return renderMediaVoteOption(mediaOption);
    });

  useEffect(() => {
    loadPollOrRedirectToResultsIfUserHasAlreadyVoted();
  }, [pollId]);

  useEffect(redirectToResultsIfPollHasEnded, [poll]);

  if (isLoadingPoll) {
    return (
      <LoadingPage title={poll?.title ? `Vote on ${poll?.title}` : 'Vote'} />
    );
  }

  if (isVoting) {
    return <LoadingPage text="Voting..." title={`Voting on ${poll?.title}`} />;
  }

  return (
    <Page title={`Vote on ${poll?.title}`}>
      <Box className="flex flex-col gap-2 md:gap-5">
        <div className="grid grid-cols-1 items-center gap-1 sm:grid-cols-2">
          <div className="col-span-1 flex flex-col">
            <Title>{poll?.title}</Title>
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
          <div className="mt-2 flex w-full justify-around md:justify-end">
            <Button
              color="white"
              onClick={onCopyVoteLinkHandler}
              name="Copy vote"
              title="Copy vote link"
            >
              <span>Copy link</span>
              <LinkIcon className="w-5" />
            </Button>
            <LinkButton
              color="white"
              href={`/poll/result/${pollId}`}
              name="Go to results"
              title="Go to results"
            >
              <span>Results</span>
              <ChartBarIcon className="w-5" />
            </LinkButton>
          </div>
        </div>
        <div className="flex max-h-[400px] flex-wrap justify-center gap-3 overflow-auto">
          {renderOptions()}
        </div>
        <div className="self-end">
          <Button
            color="green"
            disabled={!canSubmit}
            name="vote"
            onClick={() => submitVotes(votes)}
          >
            vote
          </Button>
        </div>
      </Box>
    </Page>
  );
};

export default Vote;
