import Box from '@components/core/Box';
import Button from '@components/core/Button';
import Title from '@components/core/Title';
import { ChartBarIcon, LinkIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import VoteOption from './VoteOption';
const VoteForm = ({}) => {
  const [selectedId, setSelectedId] = useState(1);
  const options = [
    {
      id: 1,
      coverUrl:
        'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx143270-iZOJX2DMUFMC.jpg',
      title: {
        english: 'Lycoris Recoil',
        romaji: 'Lycoris Recoil',
        native: 'リコリス・リコイル',
      },
    },
    {
      id: 2,
      coverUrl:
        'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx140439-gHiXDaZl9zzI.png',
      title: {
        english: 'Mob Psycho 100 III ',
        romaji: 'Mob Psycho 100 III ',
        native: 'モブサイコ100 Ⅲ',
      },
    },
    {
      id: 3,
      coverUrl:
        'https://s4.anilist.co/file/anilistcdn/character/large/b27-wkkwJe2mWz9t.jpg',
      name: {
        first: 'Killua',
        last: 'Zoldyck',
        native: 'キルア=ゾルディック',
      },
    },
    {
      id: 4,
      coverUrl:
        'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx113415-bbBWj4pEFseh.jpg',
      title: {
        english: 'Jujutsu Kaisen',
        romaji: 'Jujutsu Kaisen',
        native: '呪術廻戦',
      },
    },
  ];

  const onChangeSelectedHandler = (selectedId: number) => {
    setSelectedId(selectedId);
  };

  const renderOptions = () =>
    options.map((option) => {
      const isSelected = selectedId === option.id;
      return (
        <VoteOption
          key={option.id}
          coverUrl={option.coverUrl}
          title={option.title}
          name={option.name}
          selected={isSelected}
          onClick={() => onChangeSelectedHandler(option.id)}
        />
      );
    });

  return (
    <Box className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <Title>What anime should i start watching next week?</Title>
        <div>
          <Button color="white">
            <span>Results</span>
            <ChartBarIcon className="w-5" />
          </Button>
          <Button color="white">
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
