import DataDisplay from '@components/core/DataDisplay';
import Image from 'next/image';

interface VoteOptionProps {
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
  selected?: boolean;
  onClick: () => void;
}

const VoteOption = ({
  title,
  name,
  coverUrl,
  selected = false,
  onClick,
}: VoteOptionProps) => {
  const activeClass = selected && 'border-indigo-500 border-2';

  const characterNames = (
    <>
      <h2 className="font-semibold">{`${name?.first} ${name?.last}`}</h2>
      <h3 className="text-xs">{name?.native}</h3>
    </>
  );

  const mediaTitles = (
    <>
      <h2 className="font-semibold">{title?.romaji}</h2>
      <h3 className="text-xs">{title?.english}</h3>
      <h3 className="text-xs">{title?.native}</h3>
    </>
  );

  return (
    <button className="w-full pr-4 md:w-auto md:pr-0" onClick={onClick}>
      <DataDisplay
        className={`flex ${activeClass} gap-2 p-2 hover:border-indigo-500 md:h-[320px] md:w-[200px] md:flex-col md:p-5`}
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
          {name && characterNames}
          {title && mediaTitles}
        </div>
      </DataDisplay>
    </button>
  );
};

export default VoteOption;
