import DataDisplay from '@components/core/DataDisplay';
import Image from 'next/image';

interface ResultCardProps {
  coverUrl: string;
  title?: {
    native: string;
    romaji: string;
    english: string;
  };
  name?: {
    first: string;
    last: string;
    native: string;
  };
  totalVotes: number;
  votes: number;
}

const ResultCard = ({
  title,
  name,
  coverUrl,
  totalVotes,
  votes,
}: ResultCardProps) => {
  const characterNames = (
    <>
      <h2 className="font-semibold">{`${name?.first} ${name?.last}`}</h2>
      <h3 className="text-xs">{name?.native}</h3>
    </>
  );

  const mediaTitles = (
    <div>
      <h2 className="font-semibold">{title?.romaji}</h2>
      <h3 className="text-xs">{title?.english}</h3>
      <h3 className="text-xs">{title?.native}</h3>
    </div>
  );

  const votesPercentage = (100 * votes) / totalVotes;

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
      <div className="flex flex-grow flex-col items-start gap-1">
        {name && characterNames}
        {title && mediaTitles}
      </div>
      <div className="flex flex-col items-center self-center font-roboto">
        <span className="font-semibold">{votes} votes</span>
        <span className="text-sm">{votesPercentage.toFixed(0)}%</span>
      </div>
    </DataDisplay>
  );
};

export default ResultCard;
