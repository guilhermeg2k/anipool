import pollService from '@backend/service/pollService';
import pollVoteService from '@backend/service/pollVoteService';
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

const areVotesValid = async (pollId: any, userId: any, pollVotes: any) => {
  const typesValidator = z.object({
    pollId: z.string(),
    userId: z.string(),
    pollVotes: z.array(
      z.object({
        anilistId: z.number(),
        type: z.string(),
      })
    ),
  });

  const { success: areTypesValid } = typesValidator.safeParse({
    pollId,
    userId,
    pollVotes,
  });

  if (!areTypesValid) {
    return false;
  }

  const poll = await pollService.get(String(pollId));

  const areMultipleVotesValid = poll.multiOptions || pollVotes.length <= 1;
  if (!areMultipleVotesValid) {
    return false;
  }

  const pollEndDate = new Date(poll.endDate);
  const now = new Date();
  const isVoteDateValid = pollEndDate > now;
  if (!isVoteDateValid) {
    return false;
  }

  const userVotes = await pollVoteService.getUserVotesOnpoll(
    String(userId),
    String(pollId)
  );
  const userHasAlreadyVoted = userVotes && userVotes.length > 0;

  if (userHasAlreadyVoted) {
    return false;
  }

  return true;
};

const create = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { pollId } = req.query;
    const { id: userId } = req.cookies;
    const { pollVotes } = req.body;

    const areUserVotesValid = await areVotesValid(pollId, userId, pollVotes);
    if (!areUserVotesValid) {
      return res.status(400).send('Invalid votes');
    }

    await pollVoteService.create(
      String(userId),
      String(pollId),
      pollVotes as Array<PollOption>
    );

    return res.status(200).send('Votes created');
  } catch (error) {
    console.log(error);
    return res.status(500).send('');
  }
};

const getUserVotesOnpoll = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { pollId } = req.query;
  const { id: userId } = req.cookies;

  try {
    if (pollId && userId) {
      const userpollVotes = await pollVoteService.getUserVotesOnpoll(
        String(userId),
        String(pollId)
      );

      return res.status(200).send(userpollVotes);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send('');
  }
};

const getpollResults = async (req: NextApiRequest, res: NextApiResponse) => {
  const { pollId } = req.query;

  try {
    if (pollId) {
      const pollOptionsResult = await pollVoteService.getpollResults(
        String(pollId)
      );
      return res.status(200).send(pollOptionsResult);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send('');
  }
};

const pollVoteController = {
  getpollResults,
  getUserVotesOnpoll,
  create,
};

export default pollVoteController;
