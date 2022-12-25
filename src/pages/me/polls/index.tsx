import Box from '@components/core/Box';
import IconButton from '@components/core/IconButton';
import InternalLink from '@components/core/InternalLink';
import LoadingPage from '@components/core/LoadingPage';
import Page from '@components/core/Page';
import PageHeader from '@components/core/PageHeader';
import Title from '@components/core/Title';
import {
  ArrowTopRightOnSquareIcon,
  LinkIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';
import { toastError, toastSuccess } from '@libs/toastify';
import pollService from '@services/pollService';
import useUserStore from '@store/userStore';
import dayjs from 'dayjs';
import { NextPage } from 'next';
import Head from 'next/head';
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
    <Page bgImage="/images/background.jpg">
      <Head>
        <title>My polls</title>
      </Head>
      <div className="mx-auto mt-20 flex max-w-3xl flex-col gap-6">
        <PageHeader />
        <Box className="flex flex-col gap-5 pb-7">
          <Title>MY POLLS</Title>
          <div className="flex flex-col gap-2">
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
                  className="flex justify-between hover:bg-slate-100 p-2 items-center"
                >
                  <span className="w-[200px]">{title}</span>
                  <span className="hidden md:inline" title="End date">
                    {dayjs(endDate).toString()}
                  </span>
                  <div className="flex gap-2">
                    <IconButton
                      onClick={() => copyPollVoteLink(id!)}
                      title="Copy poll vote link"
                    >
                      <LinkIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => openPollResultsPage(id!)}
                      title="Open poll results page"
                    >
                      <ChartBarIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => openPollVotePage(id!)}
                      title="Open poll vote page"
                    >
                      <ArrowTopRightOnSquareIcon />
                    </IconButton>
                  </div>
                </div>
              ))
            )}
          </div>
        </Box>
      </div>
    </Page>
  );
};

export default MyPolls;
