import Button from '@components/core/Button';
import DataDisplay from '@components/core/DataDisplay';
import Modal from '@components/core/Modal';
import Image from 'next/image';
import SearchOptionField from './SearchOptionField';
import { PoolOption } from './types';

interface SearchOptionModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (option: PoolOption) => void;
}

const SearchOptionModal = ({
  open,
  onClose,
  onAdd,
}: SearchOptionModalProps) => {
  return (
    <Modal
      title="Add new option"
      disableBackdropClick
      open={open}
      onClose={onClose}
    >
      <div className="flex flex-col gap-2 pt-2">
        <SearchOptionField />
        <div className="flex flex-col gap-2 sm:flex-row">
          <DataDisplay className="w-full">
            <ul>
              <li>SHINGEKI NO KYOJIN</li>
              <li>SHINGEKI NO KYOJIN</li>
              <li>SHINGEKI NO KYOJIN</li>
            </ul>
          </DataDisplay>
          <DataDisplay className="flex w-full flex-col items-center gap-2 py-3 sm:w-[400px]">
            <h1 className="font-medium text-neutral-800">SHINGEKI NO KYOJIN</h1>
            <div className="h-[155px] w-[112px]">
              <Image
                src="https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx16498-C6FPmWm59CyP.jpg"
                alt="Selected option cover"
                width="112px"
                height="155px"
                layout="responsive"
              />
            </div>
            <div className="flex flex-col items-center text-neutral-600">
              <span>Attack on Titan</span>
              <span>進撃の巨人</span>
              <span className="text-xs">TV - 22 EPISODES</span>
            </div>
            <div>
              <Button className="bg-green-500 hover:bg-green-400 active:bg-green-500">
                <span className="px-9">ADD</span>
              </Button>
            </div>
          </DataDisplay>
        </div>
      </div>
    </Modal>
  );
};

export default SearchOptionModal;
