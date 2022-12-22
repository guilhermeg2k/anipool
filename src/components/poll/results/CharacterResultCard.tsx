import DataDisplay from '@components/core/DataDisplay';
import Image from 'next/image';

interface CharacterResultCardProps {
  coverUrl: string;
  name: {
    full: string;
    native: string;
  };
  totalVotes: number;
  votes: number;
}

const CharacterResultCard = ({
  name,
  coverUrl,
  totalVotes,
  votes,
}: CharacterResultCardProps) => {
  const votesPercentage = (100 * votes) / totalVotes || 0;

  return (
    <DataDisplay
      className={`flex w-full gap-2 md:h-[370px] md:w-[200px] md:flex-col md:p-5`}
    >
      <div className="w-[50px] md:w-auto">
        <Image
          src={coverUrl}
          className="rounded-sm"
          alt="Option image"
          layout="responsive"
          width={187}
          height={255}
        />
      </div>
      <div className="flex flex-grow flex-col items-start gap-1 overflow-hidden">
        <h2 className="font-semibold text-sm truncate w-full">{`${name.full}`}</h2>
        <h3 className="text-xs truncate w-full">{name.native}</h3>
      </div>
      <div className="flex flex-col items-center self-center font-roboto">
        <span className="font-semibold">
          {votes === 1 ? `${votes} vote` : `${votes} votes`}
        </span>
        <span className="text-sm">{votesPercentage.toFixed(0)}%</span>
      </div>
    </DataDisplay>
  );
};

export default CharacterResultCard;
