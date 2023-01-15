import Box from '@components/core/Box';
import DateDisplay from '@components/core/DateDisplay';
import IconButton from '@components/core/IconButton';
import InternalLink from '@components/core/InternalLink';
import LoadingPage from '@components/core/LoadingPage';
import Page from '@components/core/Page';
import {
  ArrowTopRightOnSquareIcon,
  ChartBarIcon,
  LinkIcon,
} from '@heroicons/react/24/outline';
import { toastError, toastSuccess } from '@libs/toastify';
import pollService from '@services/pollService';
import useUserStore from '@store/userStore';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';

const MyPolls: NextPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [polls, setPolls] = useState(Array<Poll>());
  const { id } = useUserStore();

  const loadPolls = async () => {
    try {
      setIsLoading(true);
      const polls = await pollService.listByUserId(id!);
      setPolls(polls);
    } catch (error) {
      toastError('Failed to load user polls');
    } finally {
      setIsLoading(false);
    }
  };

  const getPollVoteLinkById = (id: string) => `/poll/vote/${id}`;

  const copyPollVoteLink = (id: string) => {
    let link = getPollVoteLinkById(id);
    link = window.location.origin + link;

    navigator.clipboard.writeText(link);
    toastSuccess('Vote link copied to clipboard');
  };

  const openPollVotePage = (id: string) => {
    const link = getPollVoteLinkById(id);
    window.open(link, '_blank');
  };

  const openPollResultsPage = (id: string) => {
    window.open(`/poll/result/${id}`, '_blank');
  };

  useEffect(() => {
    if (id) {
      loadPolls();
    }
  }, [id]);

  if (isLoading) {
    return <LoadingPage title="My polls" />;
  }

  return (
    <Page title="My polls">
      <Box title="My polls" className="flex flex-col gap-2">
        {polls.length === 0 ? (
          <div className="flex flex-col items-center justify-center uppercase">
            <span>You don&apos;t have any poll yet</span>
            <InternalLink href="/poll/create">
              Click here to create one
            </InternalLink>
          </div>
        ) : (
          polls.map(({ id, title, endDate }) => (
            <div
              key={id}
              className="grid w-full grid-cols-3 items-center justify-items-end px-0 py-2 hover:bg-gray-100 sm:grid-cols-4 sm:px-2"
            >
              <span className="col-span-2 justify-self-start break-words">
                {title}
              </span>
              <DateDisplay date={endDate} className="hidden sm:block" />
              <div className="flex gap-2">
                <IconButton
                  onClick={() => copyPollVoteLink(id!)}
                  title="Copy poll vote link"
                >
                  <LinkIcon />
                </IconButton>
                <IconButton
                  onClick={() => openPollResultsPage(id!)}
                  title="Open poll results in new tab"
                >
                  <ChartBarIcon />
                </IconButton>
                <IconButton
                  onClick={() => openPollVotePage(id!)}
                  title="Open poll vote page in new tab"
                >
                  <ArrowTopRightOnSquareIcon />
                </IconButton>
              </div>
            </div>
          ))
        )}
      </Box>
    </Page>
  );
};

export default MyPolls;
