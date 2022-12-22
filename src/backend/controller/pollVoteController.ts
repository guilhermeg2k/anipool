import pollService from '@backend/service/pollService';
import pollVoteService from '@backend/service/pollVoteService';
import { getTokenPayload } from '@utils/authUtils';
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

  const userVotes = await pollVoteService.getUserVotesOnPoll(
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
    const { userToken } = req.cookies;
    const { id: userId } = await getTokenPayload(String(userToken));
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

const getUserVotesOnPoll = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { pollId } = req.query;
  const { userToken } = req.cookies;
  const { id: userId } = await getTokenPayload(String(userToken));

  try {
    if (pollId && userId) {
      const userPollVotes = await pollVoteService.getUserVotesOnPoll(
        String(userId),
        String(pollId)
      );

      return res.status(200).send(userPollVotes);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send('');
  }
};

const getPollResults = async (req: NextApiRequest, res: NextApiResponse) => {
  const { pollId } = req.query;

  try {
    if (pollId) {
      const pollOptionsResult = await pollVoteService.getPollVotes(
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
  getPollResults,
  getUserVotesOnPoll,
  create,
};

export default pollVoteController;
