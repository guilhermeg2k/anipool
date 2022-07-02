import Button from '@components/core/Button';
import DataDisplay from '@components/core/DataDisplay';
import Image from 'next/image';

const SearchOptionsModal = () => {
  return (
    <div className="flex flex-col gap-2 pt-2">
      <div className="flex flex-col gap-2 sm:flex-row">
        <DataDisplay className="w-full">
          <ul>
            <li>SHINGEKI NO KYOJIN</li>
            <li>SHINGEKI NO KYOJIN</li>
            <li>SHINGEKI NO KYOJIN</li>
          </ul>
        </DataDisplay>
        <DataDisplay className="flex w-full flex-col items-center sm:w-[400px]">
          <h1>SHINGEKI NO KYOJIN</h1>
          <div className="h-[140px] w-[100px]">
            <Image
              src="https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx16498-C6FPmWm59CyP.jpg"
              alt="Selected option cover"
              width="100px"
              height="140px"
              layout="responsive"
            />
          </div>
          <span>Attack on Titan</span>
          <span>進撃の巨人</span>
          <span>TV - 22 EPISODES</span>
        </DataDisplay>
      </div>
      <Button
        className="bg-indigo-900 hover:bg-indigo-800 active:bg-indigo-900"
        size="large"
      >
        ADD OPTION
      </Button>
    </div>
  );
};
