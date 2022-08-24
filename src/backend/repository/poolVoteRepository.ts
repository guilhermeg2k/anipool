import dynamoDb from '@backend/database';
import { v4 as uuidv4 } from 'uuid';

const create = async (votes: Array<PoolVote>) => {
  const poolVotes = Array<{
    PutRequest: {
      Item: PoolVote;
    };
  }>();

  votes.forEach((vote) => {
    const id = uuidv4();
    poolVotes.push({
      PutRequest: {
        Item: {
          ...vote,
          id,
        },
      },
    });
  });

  let params = {
    RequestItems: {
      pool_votes: poolVotes,
    },
  };

  await dynamoDb.batchWrite(params).promise();
};

const poolVotesRepository = {
  create,
};

export default poolVotesRepository;
