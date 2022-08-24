import poolVotesRepository from '@backend/repository/poolVoteRepository';
import poolService from '@backend/service/poolService';
import poolVoteService from '@backend/service/poolVoteService';
import { NextApiRequest, NextApiResponse } from 'next';

const create = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { poolId } = req.query;
    const { poolVotes } = req.body;
    const { id: userId } = req.cookies;

    if (userId && poolId && poolVotes) {
      const pool = await poolService.get(String(poolId));

      if (!pool.multiOptions && poolVotes.length > 1) {
        return res.status(400).send('');
      }

      const userVotes = await poolVoteService.getUserVotesOnPool(
        userId,
        String(poolId)
      );

      if (userVotes && userVotes.length > 0) {
        return res.status(400).send('');
      }

      await poolVoteService.create(
        userId,
        String(poolId),
        poolVotes as Array<PoolOption>
      );

      return res.status(200).send('Votes created');
    }

    return res.status(400).send('');
  } catch (error) {
    console.log(error);
    return res.status(500).send('');
  }
};

const poolVoteController = {
  create,
};

export default poolVoteController;
