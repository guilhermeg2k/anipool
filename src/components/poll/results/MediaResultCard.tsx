import DataDisplay from '@components/core/DataDisplay';
import { getMediaName } from '@utils/mediaUtils';
import Image from 'next/image';

interface MediaResultCardProps {
  coverUrl: string;
  title: {
    native?: string;
    romaji?: string;
    english?: string;
  };
  votes: number;
  totalVotes: number;
}

const MediaResultCard: React.FC<MediaResultCardProps> = ({
  title,
  coverUrl,
  totalVotes,
  votes,
}) => {
  const votesPercentage = (100 * votes) / totalVotes || 0;

  return (
    <DataDisplay
      className={`flex w-full gap-2 md:h-[370px] md:w-[200px] md:flex-col md:p-5`}
      title={getMediaName({ title })}
    >
      <div className="min-w-[50px] w-auto">
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
        <h2 className="font-semibold text-sm truncate w-full">
          {title.romaji}
        </h2>
        <h3 className="text-xs truncate w-full">{title.english}</h3>
        <h3 className="text-xs truncate w-full">{title.native}</h3>
      </div>
      <div className="flex flex-col items-center self-center font-roboto min-w-[50px]">
        <span className="font-semibold text-center">
          {votes === 1 ? `${votes} vote` : `${votes} votes`}
        </span>
        <span className="text-sm">{votesPercentage.toFixed(0)}%</span>
      </div>
    </DataDisplay>
  );
};

export default MediaResultCard;
