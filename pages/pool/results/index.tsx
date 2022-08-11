import Box from '@components/core/Box';
import Button from '@components/core/Button';
import Page from '@components/core/Page';
import PageHeader from '@components/core/PageHeader';
import Title from '@components/core/Title';
import ResultCard from '@components/pool/results/ResultCard';
import { LinkIcon, PlusIcon } from '@heroicons/react/outline';
import { NextPage } from 'next';

const PoolResult: NextPage = () => {
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
      votes: 10,
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
      votes: 9,
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
      votes: 5,
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
      votes: 3,
    },
  ];

  const calculateTotalVotes = () => {
    let totalVotes = 0;
    options.forEach((option) => (totalVotes += option.votes));
    return totalVotes;
  };

  return (
    <Page bgImage="/images/bg-pool-results.jpg">
      <div className="mx-auto mt-20 flex max-w-4xl flex-col gap-6 ">
        <PageHeader />
        <Box className="flex flex-col gap-5 pb-7">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div>
              <Title>What anime should i start watching next week?</Title>
              <h2 className="semi text-xs">Created by guilhermeg2k</h2>
            </div>
            <div>
              <Button color="white">
                <span>Share</span>
                <LinkIcon className="w-5" />
              </Button>
              <Button color="white">
                <span>Create New</span>
                <PlusIcon className="w-5" />
              </Button>
            </div>
          </div>
          <div className="flex max-h-[400px] flex-wrap justify-center gap-3 overflow-auto">
            {options.map((option) => (
              <ResultCard
                key={option.id}
                coverUrl={option.coverUrl}
                title={option.title}
                name={option.name}
                totalVotes={calculateTotalVotes()}
                votes={option.votes}
              />
            ))}
          </div>
        </Box>
      </div>
    </Page>
  );
};

export default PoolResult;
