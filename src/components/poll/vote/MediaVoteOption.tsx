import DataDisplay from '@components/core/DataDisplay';
import { getMediaName } from '@utils/mediaUtils';
import Image from 'next/image';

interface MediaVoteOptionProps {
  coverUrl: string;
  title: {
    native?: string;
    romaji?: string;
    english?: string;
  };
  selected?: boolean;
  onClick: () => void;
}

const MediaVoteOption = ({
  title,
  coverUrl,
  selected = false,
  onClick,
}: MediaVoteOptionProps) => {
  const activeClass = selected && 'border-indigo-500 border-2';

  return (
    <button
      className="w-full md:w-auto"
      title={`Select ${getMediaName({ title })} to vote`}
      name={`Select ${getMediaName({ title })} to vote`}
      onClick={onClick}
    >
      <DataDisplay
        className={`${activeClass} flex gap-2 p-2 hover:border-indigo-500 md:h-[340px] md:w-[200px] md:flex-col md:p-5`}
      >
        <div className="min-w-[50px] w-[50px] md:w-auto">
          <Image
            src={coverUrl}
            className="rounded-sm"
            alt="Option image"
            layout="responsive"
            width={187}
            height={255}
          />
        </div>
        <div className="flex flex-col items-start gap-1 overflow-hidden w-full">
          <h2 className="font-semibold truncate w-full">{title.romaji}</h2>
          <h3 className="text-xs truncate w-full">{title.english}</h3>
          <h3 className="text-xs truncate w-full">{title.native}</h3>
        </div>
      </DataDisplay>
    </button>
  );
};

export default MediaVoteOption;
