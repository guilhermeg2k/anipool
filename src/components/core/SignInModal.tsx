import { openAnilistAuthUrl } from '@utils/utils';
import { useState } from 'react';
import Button from './Button';
import Modal from './Modal';

const SignInModal = () => {
  const [open, setOpen] = useState(true);
  return (
    <Modal
      open={open}
      title="You need to sign in to be able to vote"
      disableBackdropClick
      onClose={() => setOpen(false)}
    >
      <div className="flex items-center w-full justify-center">
        <Button
          size="large"
          onClick={openAnilistAuthUrl}
          name="Login with anilist"
        >
          Login with anilist
        </Button>
      </div>
    </Modal>
  );
};

export default SignInModal;
