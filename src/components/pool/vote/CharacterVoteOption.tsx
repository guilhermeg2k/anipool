import DataDisplay from '@components/core/DataDisplay';
import Image from 'next/image';

interface CharacterProps {
  coverUrl: string;
  name: {
    full: string;
    native: string;
  };
  selected?: boolean;
  onClick: () => void;
}

const CharacterVoteOption = ({
  name,
  coverUrl,
  selected = false,
  onClick,
}: CharacterProps) => {
  const activeClass = selected && 'border-indigo-500 border-2';

  return (
    <button
      className="w-full pr-4 md:w-auto md:pr-0"
      onClick={onClick}
      title={name.full}
    >
      <DataDisplay
        className={`flex ${activeClass} gap-2 p-2 hover:border-indigo-500 md:h-[340px] md:w-[200px] md:flex-col md:p-5`}
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
          <h2 className="font-semibold truncate w-ful">{name.full}</h2>
          <h3 className="text-xs truncate w-ful">{name.native}</h3>
        </div>
      </DataDisplay>
    </button>
  );
};

export default CharacterVoteOption;
