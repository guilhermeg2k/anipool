import poolService from '@backend/service/poolService';
import poolVoteService from '@backend/service/poolVoteService';
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

const areVotesValid = async (poolId: any, userId: any, poolVotes: any) => {
  const typesValidator = z.object({
    poolId: z.string(),
    userId: z.string(),
    poolVotes: z.array(
      z.object({
        anilistId: z.number(),
        type: z.string(),
      })
    ),
  });

  const { success: areTypesValid } = typesValidator.safeParse({
    poolId,
    userId,
    poolVotes,
  });

  if (!areTypesValid) {
    return false;
  }

  const pool = await poolService.get(String(poolId));

  const areMultipleVotesValid = pool.multiOptions || poolVotes.length <= 1;
  if (!areMultipleVotesValid) {
    return false;
  }

  const poolEndDate = new Date(pool.endDate);
  const now = new Date();
  const isVoteDateValid = poolEndDate > now;
  if (!isVoteDateValid) {
    return false;
  }

  const userVotes = await poolVoteService.getUserVotesOnPool(
    String(userId),
    String(poolId)
  );
  const userHasAlreadyVoted = userVotes && userVotes.length > 0;

  if (userHasAlreadyVoted) {
    return false;
  }

  return true;
};

const create = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { poolId } = req.query;
    const { id: userId } = req.cookies;
    const { poolVotes } = req.body;

    const areUserVotesValid = await areVotesValid(poolId, userId, poolVotes);
    if (!areUserVotesValid) {
      return res.status(400).send('Invalid votes');
    }

    await poolVoteService.create(
      String(userId),
      String(poolId),
      poolVotes as Array<PoolOption>
    );

    return res.status(200).send('Votes created');
  } catch (error) {
    console.log(error);
    return res.status(500).send('');
  }
};

const getUserVotesOnPool = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { poolId } = req.query;
  const { id: userId } = req.cookies;

  try {
    if (poolId && userId) {
      const userPoolVotes = await poolVoteService.getUserVotesOnPool(
        String(userId),
        String(poolId)
      );

      return res.status(200).send(userPoolVotes);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send('');
  }
};

const poolVoteController = {
  getUserVotesOnPool,
  create,
};

export default poolVoteController;
