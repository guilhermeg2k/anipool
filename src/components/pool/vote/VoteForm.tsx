import Box from '@components/core/Box';
import Button from '@components/core/Button';
import Title from '@components/core/Title';
import { ChartBarIcon, LinkIcon } from '@heroicons/react/outline';
import { toastSuccess } from '@libs/toastify';
import { useRouter } from 'next/router';
import { useState } from 'react';
import VoteOption from './VoteOption';

interface VoteFormProps {
  pool: Pool;
  options: Array<Anilist.Media & Anilist.Character>;
}

const VoteForm: React.FC<VoteFormProps> = ({ pool, options }) => {
  const [selectedIds, setSelectedIds] = useState<Array<number>>([]);
  const router = useRouter();
  const { id } = router.query;

  const onSelectedHandler = (selectedId: number) => {
    if (pool.multiOptions) {
      const isAlreadyAdded = selectedIds.find((id) => id === selectedId);
      if (isAlreadyAdded) {
        setSelectedIds(selectedIds.filter((id) => id !== selectedId));
      } else {
        setSelectedIds([...selectedIds, selectedId]);
      }
    } else {
      setSelectedIds([selectedId]);
    }
  };

  const renderOptions = () =>
    options.map((option) => {
      const isSelected = selectedIds.includes(option.id);
      return (
        <VoteOption
          key={option.id}
          coverUrl={
            option.coverImage
              ? option.coverImage.extraLarge
              : option.image.large
          }
          title={option.title}
          name={option.name}
          selected={isSelected}
          onClick={() => onSelectedHandler(option.id)}
        />
      );
    });

  const onShareHandler = () => {
    navigator.clipboard.writeText(window.location.href);
    toastSuccess('Share link copied to clipboard');
  };

  return (
    <Box className="flex flex-col gap-5">
      <div className="flex flex-col items-center justify-between md:flex-row">
        <div>
          <Title>{pool.title}</Title>
          <h2 className="text-xs uppercase">
            Ends in: {new Date(pool.endDate!).toLocaleString()}
          </h2>
        </div>
        <div>
          <Button
            color="white"
            onClick={() => router.push(`/pool/results/${id}`)}
          >
            <span>Results</span>
            <ChartBarIcon className="w-5" />
          </Button>
          <Button color="white" onClick={onShareHandler}>
            <span>Share</span>
            <LinkIcon className="w-5" />
          </Button>
        </div>
      </div>
      <div className="flex max-h-[400px] flex-wrap justify-center gap-3 overflow-auto">
        {renderOptions()}
      </div>
      <div className="self-end">
        <Button color="green">vote</Button>
      </div>
    </Box>
  );
};

export default VoteForm;
