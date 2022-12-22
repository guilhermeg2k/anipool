import DataDisplay from '@components/core/DataDisplay';
import Image from 'next/image';

interface MediaVoteOptionProps {
  coverUrl: string;
  title: {
    native: string;
    romaji: string;
    english: string;
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
      className="w-full pr-4 md:w-auto md:pr-0"
      onClick={onClick}
      title={title.romaji}
    >
      <DataDisplay
        className={`${activeClass} flex  gap-2 p-2 hover:border-indigo-500 md:h-[340px] md:w-[200px] md:flex-col md:p-5`}
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
        <div className="flex flex-col items-start gap-1">
          <h2 className="font-semibold truncate w-full">{title.romaji}</h2>
          <h3 className="text-xs truncate w-full">{title.english}</h3>
          <h3 className="text-xs truncate w-full">{title.native}</h3>
        </div>
      </DataDisplay>
    </button>
  );
};

export default MediaVoteOption;
