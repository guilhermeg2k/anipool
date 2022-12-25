import Button from '@components/core/Button';
import IconButton from '@components/core/IconButton';
import Modal from '@components/core/Modal';
import Spinner from '@components/core/Spinner';
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import { toastError, toastSuccess } from '@libs/toastify';
import pollService from '@services/pollService';
import useUserStore from '@store/userStore';
import { useEffect, useState } from 'react';

interface OptionsListModalProps {
  open: boolean;
  options: PollOption[];
  onClose: () => void;
  onImport: (pollOption: PollOption[]) => void;
}

const OptionsListModal = ({
  open,
  options,
  onClose,
  onImport,
}: OptionsListModalProps) => {
  return (
    <Modal
      title="Import options"
      open={open}
      disableBackdropClick
      onClose={onClose}
    >
      <div className="flex flex-col gap-2">
        <div className="flex flex-col">
          <h1 className="font-semibold uppercase">
            The following options will be imported:
          </h1>
          <div className="overflow-y-auto max-h-[400px]">
            {options.map((option) => (
              <div key={`${option.type}-${option.anilistId}`}>
                {option.text}
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-2 justify-end">
          <Button color="gray" name="Cancel import" onClick={onClose}>
            Cancel
          </Button>
          <Button
            color="green"
            name="Confirm import"
            onClick={() => onImport(options)}
          >
            Confirm
          </Button>
        </div>
      </div>
    </Modal>
  );
};

interface ImportOptionsModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (pollOption: PollOption[]) => void;
}

const ImportOptionsModal = ({
  open,
  onClose,
  onAdd,
}: ImportOptionsModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOptionsListOpen, setIsOptionsListOpen] = useState(false);
  const [selectedPoll, setSelectedPoll] = useState<Poll>();
  const [polls, setPolls] = useState(Array<Poll>());
  const { id } = useUserStore();

  const loadPolls = async () => {
    try {
      setIsLoading(true);
      const polls = await pollService.listByUserId(id!);
      setPolls(polls);
    } catch (error) {
      toastError('Failed to load user polls');
    } finally {
      setIsLoading(false);
    }
  };

  const importPoll = (poll: Poll) => {
    setSelectedPoll(poll);
    setIsOptionsListOpen(true);
  };

  const onAddOptionsHandler = (options: PollOption[]) => {
    onAdd(options);
    toastSuccess(`Options imported from ${selectedPoll!.title}`);
    onClose();
  };

  useEffect(() => {
    if (id) {
      loadPolls();
    }
  }, [id]);

  return (
    <Modal
      title="Import options from my polls"
      disableBackdropClick
      open={open}
      onClose={onClose}
    >
      {isOptionsListOpen && (
        <OptionsListModal
          open={isOptionsListOpen}
          onClose={() => setIsOptionsListOpen(false)}
          options={selectedPoll!.options}
          onImport={onAddOptionsHandler}
        />
      )}
      {isLoading ? (
        <div className="flex flex-col w-full h-[200px] items-center justify-center">
          <Spinner />
        </div>
      ) : polls.length === 0 ? (
        <div className="flex flex-col h-[200px] items-center justify-center uppercase">
          <span>You don&apos;t have any poll to import from</span>
        </div>
      ) : (
        <div className="overflow-y-auto max-h-[400px]">
          {polls.map((poll) => (
            <div
              key={poll.id}
              className="flex justify-between hover:bg-slate-100 p-2 items-center cursor-pointer"
              onClick={() => importPoll(poll)}
            >
              <span className="w-[200px]">{poll.title}</span>
              <div className="flex gap-2">
                <IconButton
                  title="Import options from this poll"
                  onClick={() => importPoll(poll)}
                >
                  <ArrowUpTrayIcon />
                </IconButton>
              </div>
            </div>
          ))}
        </div>
      )}
    </Modal>
  );
};

export default ImportOptionsModal;
