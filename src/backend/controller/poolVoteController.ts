import poolVotesRepository from '@backend/repository/poolVoteRepository';
import poolVoteService from '@backend/service/poolVoteService';
import { NextApiRequest, NextApiResponse } from 'next';

const create = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { poolId } = req.query;
    const { poolVotes } = req.body;
    const { id } = req.cookies;

    if (id && poolId && poolVotes) {
      await poolVoteService.create(
        id,
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
