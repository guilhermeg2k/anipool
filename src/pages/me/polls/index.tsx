import Box from '@components/core/Box';
import DateDisplay from '@components/core/DateDisplay';
import IconButton from '@components/core/IconButton';
import InternalLink from '@components/core/InternalLink';
import { LinkIconButton } from '@components/core/LinkIconButton';
import LoadingPage from '@components/core/LoadingPage';
import { useAlert } from '@components/core/ModalAlert';
import Page from '@components/core/Page';
import Title from '@components/core/Title';
import {
  ArrowTopRightOnSquareIcon,
  ChartBarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  LinkIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { toastError, toastSuccess, toastPromise } from '@libs/toastify';
import pollService from '@services/pollService';
import useUserStore from '@store/userStore';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';

const getPollVoteLinkById = (id?: string) => `/poll/vote/${id}`;

const copyPollVoteLink = (id: string) => {
  let link = getPollVoteLinkById(id);
  link = window.location.origin + link;

  navigator.clipboard.writeText(link);
  toastSuccess('Vote link copied to clipboard');
};

const POLLS_PER_PAGE = 12;

const MyPolls: NextPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [polls, setPolls] = useState(Array<Poll>());
  const [page, setPage] = useState(0);
  const alert = useAlert();
  const { id } = useUserStore();

  const paginatedPolls = polls.slice(
    POLLS_PER_PAGE * page,
    POLLS_PER_PAGE * page + POLLS_PER_PAGE
  );
  const canGoNext = page < Math.floor(polls.length / POLLS_PER_PAGE);
  const canGoBack = page > 0;
  const hasPolls = paginatedPolls.length > 0;

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

  const nextPage = () => {
    if (canGoNext) {
      setPage(page + 1);
    }
  };

  const previousPage = () => {
    if (canGoBack) {
      setPage(page - 1);
    }
  };

  const onDeletePollHandler = async (title: string, id?: string) => {
    if (id != null) {
      alert.show({
        type: 'CONFIRMATION',
        content: `Are you sure that you wanna delete the poll "${title}?"`,
        options: {
          onConfirm: async () => {
            await toastPromise(pollService.deleteById(id), {
              pending: 'Deleting poll',
              success: 'Poll deleted',
              error: 'Failed to delete poll',
            });
            await loadPolls();
          },
        },
      });
    }
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
    <Page title="My polls" className="h-screen overflow-hidden">
      <Box className="flex h-full flex-col gap-2 overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="col-span-1 flex flex-col sm:col-span-2">
            <Title className="max-h-28 overflow-auto">My polls</Title>
          </div>

          {hasPolls && (
            <div>
              <div className="flex justify-end">
                <IconButton
                  name="Go to previous polls"
                  disabled={!canGoBack}
                  onClick={() => previousPage()}
                >
                  <ChevronLeftIcon />
                </IconButton>
                <IconButton
                  name="Go to next polls"
                  disabled={!canGoNext}
                  onClick={() => nextPage()}
                >
                  <ChevronRightIcon />
                </IconButton>
              </div>
            </div>
          )}
        </div>
        <div className="h-full overflow-auto">
          {paginatedPolls.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center uppercase">
              <span>You don&apos;t have any poll yet</span>
              <InternalLink href="/poll/create">
                Click here to create one
              </InternalLink>
            </div>
          ) : (
            paginatedPolls.map(({ id, title, endDate }) => (
              <div
                key={id}
                className="grid w-full max-w-full
                grid-cols-2 items-center justify-items-end  overflow-auto px-0 py-2 hover:bg-gray-100 sm:grid-cols-4 sm:px-2"
              >
                <span className="justify-self-start break-words sm:col-span-2">
                  {title}
                </span>
                <DateDisplay date={endDate} className="hidden sm:block" />
                <div className="flex gap-2 ">
                  <IconButton
                    onClick={() => copyPollVoteLink(id!)}
                    title="Copy poll vote link"
                  >
                    <LinkIcon />
                  </IconButton>
                  <LinkIconButton
                    href={`/poll/result/${id}`}
                    title="Open poll results"
                  >
                    <ChartBarIcon />
                  </LinkIconButton>
                  <LinkIconButton
                    title="Open poll vote"
                    href={getPollVoteLinkById(id)}
                  >
                    <ArrowTopRightOnSquareIcon />
                  </LinkIconButton>
                  <IconButton
                    title="Delete poll"
                    onClick={() => onDeletePollHandler(title, id)}
                  >
                    <TrashIcon />
                  </IconButton>
                </div>
              </div>
            ))
          )}
        </div>
      </Box>
    </Page>
  );
};

export default MyPolls;
